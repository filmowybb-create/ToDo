/* Zadania – magazyn danych (IndexedDB) i łączenie zmian z innych urządzeń */
'use strict';

const Store = (() => {
  const DB = 'zadania', OS = 'kv';
  let db = null;
  const listeners = new Set();

  const DEFAULT_SETTINGS = {
    clientId: '842853255553-pocp3184gghftlifk37u9gahcnjf92f6.apps.googleusercontent.com', // OAuth Client ID z Google Cloud
    googleOn: false,
    showCalendars: ['primary'],
    taskCalendarId: '',      // kalendarz "Zadania" tworzony automatycznie
    pushToCalendar: true,
    removeDoneFromCalendar: false,
    defaultDuration: 30,
    defaultReminder: 15,
    defaultReminderAllDay: 900, // dzień wcześniej o 9:00
    weekStartHour: 7,
    notifications: false,
    theme: 'auto',
  };

  let state = {
    items: {},   // id → item (zadanie lub notatka)
    lists: {},   // id → lista
    settings: { ...DEFAULT_SETTINGS },
    local: { gcal: {}, notified: {}, driveFileId: '', lastSync: 0, dirty: false },
  };

  function open() {
    return new Promise((res, rej) => {
      if (!('indexedDB' in self)) return res(null);
      const r = indexedDB.open(DB, 1);
      r.onupgradeneeded = () => r.result.createObjectStore(OS);
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
  }
  function idbGet(key) {
    return new Promise((res, rej) => {
      const tx = db.transaction(OS, 'readonly');
      const q = tx.objectStore(OS).get(key);
      q.onsuccess = () => res(q.result); q.onerror = () => rej(q.error);
    });
  }
  function idbPut(key, val) {
    return new Promise((res, rej) => {
      const tx = db.transaction(OS, 'readwrite');
      tx.objectStore(OS).put(val, key);
      tx.oncomplete = () => res(); tx.onerror = () => rej(tx.error);
    });
  }

  async function load() {
    let saved = null;
    try { db = await open(); if (db) saved = await idbGet('state'); } catch (e) { console.warn('IndexedDB niedostępne', e); db = null; }
    if (!saved) { try { saved = JSON.parse(localStorage.getItem('zadania-state') || 'null'); } catch (e) { saved = null; } }
    if (saved) {
      state.items = saved.items || {};
      state.lists = saved.lists || {};
      state.settings = { ...DEFAULT_SETTINGS, ...(saved.settings || {}) };
      if (!state.settings.clientId) state.settings.clientId = DEFAULT_SETTINGS.clientId;
      state.local = { ...state.local, ...(saved.local || {}) };
    }
    if (!Object.values(state.lists).some(l => !l.deleted)) {
      const now = Date.now();
      state.lists.inbox = { id: 'inbox', name: 'Zadania', color: '#3b82f6', updatedAt: now };
    }
    purgeTombstones();
  }

  const persist = U.debounce(async () => {
    const data = JSON.parse(JSON.stringify(state));
    try { if (db) await idbPut('state', data); else localStorage.setItem('zadania-state', JSON.stringify(data)); }
    catch (e) { try { localStorage.setItem('zadania-state', JSON.stringify(data)); } catch (_) { console.error('Nie udało się zapisać', e); } }
  }, 250);

  function emit(kind) { persist(); for (const fn of listeners) fn(kind); }
  function touch() { state.local.dirty = true; }

  function purgeTombstones() {
    const limit = Date.now() - 60 * 86400000;
    for (const coll of [state.items, state.lists])
      for (const [id, x] of Object.entries(coll)) if (x.deleted && x.updatedAt < limit) delete coll[id];
  }

  /* ---------- Elementy ---------- */
  function newItem(data = {}) {
    const now = Date.now();
    const it = {
      id: U.uid(), type: 'task', title: '', body: '', listId: 'inbox',
      due: null, time: null, duration: null, reminder: null, recurrence: '',
      starred: false, done: false, doneAt: null, cal: false,
      createdAt: now, updatedAt: now, deleted: false, ...data,
    };
    if (!state.lists[it.listId] || state.lists[it.listId].deleted) it.listId = firstListId();
    if (it.due) it.cal = true;
    state.items[it.id] = it; touch(); emit('items');
    return it;
  }
  function update(id, patch) {
    const it = state.items[id]; if (!it) return;
    Object.assign(it, patch, { updatedAt: Date.now() });
    if (it.due) it.cal = true;
    touch(); emit('items');
    return it;
  }
  function remove(id) { update(id, { deleted: true }); }

  /** Odhacza zadanie; dla zadań cyklicznych tworzy kolejne wystąpienie. */
  function toggleDone(id) {
    const it = state.items[id]; if (!it) return;
    let created = null;
    if (!it.done && it.recurrence && it.due) {
      const next = U.nextDue(it.due, it.recurrence);
      const { id: _i, createdAt, updatedAt, doneAt, done, ...copy } = it;
      created = newItem({ ...copy, due: next, done: false }).id;
    }
    update(id, { done: !it.done, doneAt: !it.done ? Date.now() : null });
    return created;
  }

  const items = () => Object.values(state.items).filter(i => !i.deleted);
  const get = id => state.items[id];

  /* ---------- Listy ---------- */
  const lists = () => Object.values(state.lists).filter(l => !l.deleted).sort((a, b) => (a.order ?? a.updatedAt) - (b.order ?? b.updatedAt));
  const firstListId = () => (lists()[0] || {}).id || 'inbox';
  function addList(name, color = '#8b5cf6') {
    const l = { id: U.uid(), name, color, order: Date.now(), updatedAt: Date.now() };
    state.lists[l.id] = l; touch(); emit('lists'); return l;
  }
  function updateList(id, patch) { Object.assign(state.lists[id], patch, { updatedAt: Date.now() }); touch(); emit('lists'); }
  function removeList(id) {
    const target = lists().find(l => l.id !== id);
    if (!target) return false;
    for (const it of items()) if (it.listId === id) update(it.id, { listId: target.id });
    updateList(id, { deleted: true });
    return true;
  }

  /* ---------- Ustawienia (lokalne dla urządzenia) ---------- */
  function setSettings(patch) { Object.assign(state.settings, patch); emit('settings'); }

  /* ---------- Synchronizacja: łączenie ---------- */
  function exportData() { return { version: 1, exportedAt: Date.now(), items: state.items, lists: state.lists }; }
  /** Łączy dane zdalne z lokalnymi – wygrywa nowsza wersja każdego elementu. Zwraca true, jeśli coś się zmieniło lokalnie. */
  function merge(remote) {
    if (!remote) return false;
    let changed = false;
    for (const key of ['items', 'lists']) {
      const loc = state[key], rem = remote[key] || {};
      for (const [id, r] of Object.entries(rem)) {
        const l = loc[id];
        if (!l || (r.updatedAt || 0) > (l.updatedAt || 0)) { loc[id] = r; changed = true; }
      }
    }
    if (changed) { purgeTombstones(); emit('merge'); }
    return changed;
  }
  /** Czy dane lokalne mają coś, czego brakuje zdalnie (lub nowszego). */
  function differsFrom(remote) {
    for (const key of ['items', 'lists']) {
      const rem = (remote && remote[key]) || {};
      for (const [id, l] of Object.entries(state[key])) {
        const r = rem[id];
        if (!r || (l.updatedAt || 0) > (r.updatedAt || 0)) return true;
      }
    }
    return false;
  }
  function importData(data) { return merge(data); }

  function on(fn) { listeners.add(fn); return () => listeners.delete(fn); }
  function saveLocal() { persist(); }

  return {
    load, on, emit, saveLocal,
    get state() { return state; },
    get settings() { return state.settings; },
    get local() { return state.local; },
    items, get, newItem, update, remove, toggleDone,
    lists, addList, updateList, removeList, firstListId,
    setSettings, exportData, importData, merge, differsFrom,
  };
})();
