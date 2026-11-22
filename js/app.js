/* Zadania – interfejs */
'use strict';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = U.esc;

/* ---------- Ikony ---------- */
const P = {
  menu: 'M3 6h18M3 12h18M3 18h18',
  sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  upcoming: 'M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01',
  calendar: 'M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM16 2v4M8 2v4M3 10h18',
  star: 'M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z',
  list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  note: 'M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6M8 13h8M8 17h5',
  check: 'M20 6 9 17l-5-5',
  done: 'M22 11.1V12a10 10 0 1 1-5.9-9.1M22 4 12 14l-3-3',
  settings: 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6',
  plus: 'M12 5v14M5 12h14',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.3-4.3',
  sync: 'M21 12a9 9 0 0 1-15.5 6.2L3 16M3 12a9 9 0 0 1 15.5-6.2L21 8M21 3v5h-5M3 21v-5h5',
  trash: 'M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0',
  repeat: 'M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3',
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2',
  x: 'M18 6 6 18M6 6l12 12',
  left: 'm15 18-6-6 6-6', right: 'm9 18 6-6-6-6',
  dur: 'M6 2h12M6 22h12M6 2c0 5 6 6 6 10s-6 5-6 10M18 2c0 5-6 6-6 10s6 5 6 10',
  all: 'M22 12h-6l-2 3h-4l-2-3H2M5.5 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.1z',
  edit: 'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z',
  ext: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3',
  swap: 'M7 16V4M3 8l4-4 4 4M17 8v12M21 16l-4 4-4-4',
  chevd: 'm6 9 6 6 6-6',
  down: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3',
  up: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12',
  google: 'M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.5a4.7 4.7 0 0 1-2 3.1v2.5h3.3c1.9-1.8 3-4.4 3-7.5zM12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3v2.6A10 10 0 0 0 12 22zM6.4 14a6 6 0 0 1 0-3.9V7.4H3a10 10 0 0 0 0 9.1zM12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3 7.4l3.4 2.6C7.2 7.7 9.4 5.9 12 5.9z',
};
const ic = (n, cls = '') => `<svg class="i ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${P[n]}"/></svg>`;

/* ---------- Stan interfejsu ---------- */
const ui = {
  view: 'today', listId: null, sel: null, search: '', qaType: 'task',
  cal: { mode: 'week', date: U.todayStr() },
  ev: { key: '', at: 0, list: [], loading: false },
  sync: { status: 'off', msg: '' },
};
const isMobile = () => matchMedia('(max-width: 760px)').matches;

const VIEWS = {
  today: { title: 'Dziś', icon: 'sun' },
  upcoming: { title: 'Nadchodzące', icon: 'upcoming' },
  calendar: { title: 'Kalendarz', icon: 'calendar' },
  starred: { title: 'Ważne', icon: 'star' },
  all: { title: 'Wszystkie zadania', icon: 'all' },
  notes: { title: 'Notatki', icon: 'note' },
  done: { title: 'Ukończone', icon: 'done' },
};

/* ---------- Pomocnicze ---------- */
const tasks = () => Store.items().filter(i => i.type === 'task');
const notes = () => Store.items().filter(i => i.type === 'note');
function cmpTask(a, b) {
  if (a.done !== b.done) return a.done ? 1 : -1;
  if ((a.due || '9') !== (b.due || '9')) return (a.due || '9') < (b.due || '9') ? -1 : 1;
  if ((a.time || '') !== (b.time || '')) return (a.time || '') < (b.time || '') ? -1 : 1;
  if (a.starred !== b.starred) return a.starred ? -1 : 1;
  return a.createdAt - b.createdAt;
}
const listName = id => (Store.state.lists[id] || {}).name || '';
const listColor = id => (Store.state.lists[id] || {}).color || '#94a3b8';
function matches(it, q) { q = q.toLowerCase(); return (it.title || '').toLowerCase().includes(q) || (it.body || '').toLowerCase().includes(q); }

function toast(msg, action, fn, ms = 3500) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<span>${esc(msg)}</span>${action ? `<button>${esc(action)}</button>` : ''}`;
  if (action) t.querySelector('button').onclick = () => { fn(); t.remove(); };
  const box = $('#toasts');
  while (box.children.length >= 2) box.firstChild.remove();
  box.appendChild(t);
  setTimeout(() => t.remove(), ms);
}

/* ---------- Okna modalne ---------- */
function modal({ title, body, foot = '', onMount, wide }) {
  const w = document.createElement('div');
  w.className = 'modal-wrap';
  w.innerHTML = `<div class="modal" role="dialog" aria-modal="true" ${wide ? 'style="width:min(640px,100%)"' : ''}><header><h2>${esc(title)}</h2><button class="icon-btn" data-close aria-label="Zamknij">${ic('x')}</button></header><div class="m-body">${body}</div>${foot ? `<div class="m-foot">${foot}</div>` : ''}</div>`;
  const close = () => { w.remove(); document.removeEventListener('keydown', onKey); };
  const onKey = e => { if (e.key === 'Escape') close(); };
  w.addEventListener('click', e => { if (e.target === w || e.target.closest('[data-close]')) close(); });
  document.addEventListener('keydown', onKey);
  $('#modalRoot').appendChild(w);
  onMount && onMount(w, close);
  return close;
}
function askText(title, value = '', label = 'Nazwa') {
  return new Promise(res => {
    modal({
      title, body: `<div class="field"><label>${esc(label)}</label><input class="inp" id="askInp" value="${esc(value)}"></div>`,
      foot: `<button class="btn" data-close>Anuluj</button><button class="btn primary" id="askOk">Zapisz</button>`,
      onMount: (w, close) => {
        const inp = $('#askInp', w); inp.focus(); inp.select();
        const ok = () => { const v = inp.value.trim(); close(); res(v || null); };
        $('#askOk', w).onclick = ok;
        inp.onkeydown = e => { if (e.key === 'Enter') ok(); };
        w.addEventListener('click', e => { if (e.target.closest('[data-close]') || e.target === w) res(null); });
      },
    });
  });
}
function confirmBox(title, text, okLabel = 'Usuń') {
  return new Promise(res => {
    modal({
      title, body: `<p>${esc(text)}</p>`,
      foot: `<button class="btn" data-close>Anuluj</button><button class="btn primary" id="cfOk" style="background:var(--danger);border-color:var(--danger)">${esc(okLabel)}</button>`,
      onMount: (w, close) => {
        $('#cfOk', w).onclick = () => { close(); res(true); };
        w.addEventListener('click', e => { if (e.target.closest('[data-close]') || e.target === w) res(false); });
      },
    });
  });
}

/* =================================================================
   NAWIGACJA
   ================================================================= */
function renderNav() {
  const t = U.todayStr();
  const T = tasks().filter(i => !i.done);
  const counts = {
    today: T.filter(i => i.due && i.due <= t).length,
    upcoming: T.filter(i => i.due && i.due >= t).length,
    starred: T.filter(i => i.starred).length,
    all: T.length,
    notes: notes().length,
  };
  $('#nav').innerHTML = Object.entries(VIEWS).map(([k, v]) =>
    `<button class="nav-btn ${ui.view === k ? 'active' : ''}" data-view="${k}">${ic(v.icon)}<span>${v.title}</span>${counts[k] ? `<span class="count">${counts[k]}</span>` : ''}</button>`).join('');
  $('#listsNav').innerHTML = Store.lists().map(l => {
    const n = T.filter(i => i.listId === l.id).length;
    return `<button class="nav-btn ${ui.view === 'list' && ui.listId === l.id ? 'active' : ''}" data-list="${l.id}"><span class="dot" style="background:${esc(l.color)}"></span><span>${esc(l.name)}</span>${n ? `<span class="count">${n}</span>` : ''}</button>`;
  }).join('');
  renderSyncStatus();
}

function renderSyncStatus() {
  const s = ui.sync, S = Store.settings;
  const el = $('#syncStatus');
  let cls = '', txt = 'Tylko na tym urządzeniu';
  if (S.googleOn) {
    if (s.status === 'busy') { cls = 'busy'; txt = 'Synchronizacja…'; }
    else if (s.status === 'ok') { cls = 'ok'; txt = 'Zsynchronizowano ' + new Date(Store.local.lastSync).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }); }
    else if (s.status === 'auth') { cls = 'warn'; txt = 'Połącz ponownie z Google'; }
    else if (s.status === 'offline') { cls = 'warn'; txt = 'Offline – zapisano lokalnie'; }
    else if (s.status === 'err') { cls = 'err'; txt = 'Błąd synchronizacji'; }
    else { cls = 'warn'; txt = 'Dotknij, aby zsynchronizować'; }
  }
  el.className = 'sync-status ' + cls;
  el.title = s.msg || 'Synchronizuj teraz';
  el.innerHTML = `<span class="led"></span><span>${txt}</span>`;
  const b = $('#banner');
  b.innerHTML = S.googleOn && s.status === 'auth'
    ? `<div class="banner">${ic('google', 'fill')}<span>Sesja Google wygasła. Zmiany są zapisane lokalnie.</span><button class="btn primary" id="reauth">Połącz</button></div>` : '';
  if (b.firstChild) $('#reauth').onclick = () => syncNow(true);
}

function setView(v, listId = null) {
  ui.view = v; ui.listId = listId; ui.search = ''; $('#search').value = ''; $('.search').classList.remove('has');
  document.body.classList.remove('menu-open');
  if (v === 'notes') setQaType('note'); else if (ui.qaType === 'note' && v !== 'list') setQaType('task');
  render(); $('#view').scrollTop = 0;
}

/* =================================================================
   WIDOKI
   ================================================================= */
let lastViewKey = '';
function render() {
  renderNav();
  const v = $('#view');
  const key = ui.view + (ui.listId || '') + ui.search;
  const keep = key === lastViewKey ? v.scrollTop : 0;
  const weekScroll = $('.wk-scroll') ? $('.wk-scroll').scrollTop : null;
  lastViewKey = key;

  let title, tools = '', html;
  if (ui.search) { title = 'Wyniki wyszukiwania'; html = viewSearch(); }
  else switch (ui.view) {
    case 'today': title = 'Dziś'; html = viewToday(); break;
    case 'upcoming': title = 'Nadchodzące'; html = viewUpcoming(); break;
    case 'calendar': title = 'Kalendarz'; html = viewCalendar(); break;
    case 'starred': title = 'Ważne'; html = viewSimple(tasks().filter(i => i.starred && !i.done), 'Oznacz zadanie gwiazdką, żeby trafiło tutaj.', 'star'); break;
    case 'all': title = 'Wszystkie zadania'; html = viewAll(); break;
    case 'notes': title = 'Notatki'; html = viewNotes(notes()); break;
    case 'done': title = 'Ukończone'; html = viewDone(); break;
    case 'list': {
      const l = Store.state.lists[ui.listId];
      if (!l || l.deleted) { ui.view = 'today'; return render(); }
      title = l.name;
      tools = `<button class="icon-btn" id="listEdit" title="Zmień nazwę">${ic('edit')}</button><button class="icon-btn" id="listDel" title="Usuń listę">${ic('trash')}</button>`;
      html = viewList(l); break;
    }
  }
  $('#viewTitle').textContent = title;
  document.title = title + ' · Zadania';
  $('#viewTools').innerHTML = tools;
  v.innerHTML = html;
  v.scrollTop = keep;
  if (ui.view === 'calendar' && !ui.search) afterCalendar(weekScroll);
  bindListTools();
}

const rowHtml = (it, opts = {}) => {
  const t = U.todayStr();
  const meta = [];
  if (opts.showList !== false) meta.push(`<span><span class="dot" style="width:8px;height:8px;border-radius:50%;background:${esc(listColor(it.listId))}"></span>${esc(listName(it.listId))}</span>`);
  if (it.due && opts.showDate !== false) {
    const cls = !it.done && it.due < t ? 'late' : it.due === t ? 'tod' : '';
    meta.push(`<span class="${cls}">${ic('calendar')}${U.fmtDate(it.due)}</span>`);
  }
  if (it.time) meta.push(`<span>${ic('clock')}${it.time}</span>`);
  if (it.duration) meta.push(`<span>${ic('dur')}${U.fmtDur(it.duration)}</span>`);
  if (it.recurrence) meta.push(`<span title="${esc(U.REC_LABELS[it.recurrence])}">${ic('repeat')}</span>`);
  if (it.reminder != null && !it.done) meta.push(`<span title="Przypomnienie">${ic('bell')}</span>`);
  if (it.body) meta.push(`<span title="Ma notatkę">${ic('note')}</span>`);
  return `<div class="row ${it.done ? 'done' : ''} ${ui.sel === it.id ? 'sel' : ''}" data-id="${it.id}">
    <button class="check" data-act="toggle" aria-label="${it.done ? 'Oznacz jako nieukończone' : 'Ukończ'}">${ic('check')}</button>
    <div class="r-main"><div class="r-title">${esc(it.title) || '<i style="color:var(--muted)">(bez tytułu)</i>'}</div>${meta.length ? `<div class="r-meta">${meta.join('')}</div>` : ''}</div>
    <button class="star ${it.starred ? 'on' : ''}" data-act="star" aria-label="Ważne">${ic('star')}</button></div>`;
};
const evRowHtml = (ev, i) => `<div class="row ev-row" style="--c:${esc(ev.color)}" data-ev="${i}">
  <div class="r-main"><div class="r-title">${esc(ev.title)}</div><div class="r-meta"><span>${ic('clock')}${ev.allDay ? 'Cały dzień' : ev.time + ' · ' + U.fmtDur(ev.duration)}</span><span>${esc(ev.calName)}</span></div></div></div>`;
const group = (title, inner, cls = '') => `<div class="group"><div class="group-h ${cls}">${title}</div>${inner}</div>`;
const empty = (text, icon = 'check') => `<div class="empty">${ic(icon)}<div>${esc(text)}</div></div>`;

function doneGroup(list) {
  if (!list.length) return '';
  const open = ui.showDone;
  return `<div class="group"><div class="group-h"><button data-act="showdone">${ic(open ? 'chevd' : 'right')}Ukończone (${list.length})</button></div>${open ? list.map(i => rowHtml(i)).join('') : ''}</div>`;
}

function viewToday() {
  const t = U.todayStr();
  const T = tasks();
  const overdue = T.filter(i => !i.done && i.due && i.due < t).sort(cmpTask);
  const today = T.filter(i => !i.done && i.due === t).sort(cmpTask);
  const doneToday = T.filter(i => i.done && i.doneAt && U.dateStr(new Date(i.doneAt)) === t);
  const evs = eventsFor(t, U.addDays(t, 1)).filter(e => e.date <= t && e.endDate >= t);
  const planned = today.reduce((s, i) => s + (i.duration || 0), 0);
  let h = `<div class="summary"><span>${U.cap(U.DAYS[new Date().getDay()])}, ${U.fmtDate(t, { full: true })}</span><span>${today.length} zadań na dziś</span>${planned ? `<span>Zaplanowany czas: ${U.fmtDur(planned)}</span>` : ''}</div>`;
  if (evs.length) h += group('Z kalendarza', evs.map(e => evRowHtml(e, ui.evIndex.indexOf(e))).join(''));
  if (overdue.length) h += group('Zaległe', overdue.map(i => rowHtml(i)).join(''), 'overdue');
  if (today.length) h += group(overdue.length || evs.length ? 'Na dziś' : '', today.map(i => rowHtml(i, { showDate: false })).join(''));
  if (!overdue.length && !today.length) h += empty('Na dziś nic nie zostało. Dodaj zadanie poniżej.', 'sun');
  return h + doneGroup(doneToday);
}

function viewUpcoming() {
  const t = U.todayStr();
  const T = tasks().filter(i => !i.done && i.due).sort(cmpTask);
  if (!T.length) return empty('Brak zaplanowanych zadań.', 'upcoming');
  let h = '';
  const overdue = T.filter(i => i.due < t);
  if (overdue.length) h += group('Zaległe', overdue.map(i => rowHtml(i)).join(''), 'overdue');
  for (let d = 0; d < 7; d++) {
    const ds = U.addDays(t, d);
    const day = T.filter(i => i.due === ds);
    if (!day.length) continue;
    const mins = day.reduce((s, i) => s + (i.duration || 0), 0);
    h += group(`${U.fmtDate(ds)} <span style="font-weight:500">· ${U.fmtDate(ds, { full: true, weekday: d < 2 })}${mins ? ' · ' + U.fmtDur(mins) : ''}</span>`, day.map(i => rowHtml(i, { showDate: false })).join(''));
  }
  const later = T.filter(i => i.due >= U.addDays(t, 7));
  if (later.length) h += group('Później', later.map(i => rowHtml(i)).join(''));
  return h;
}

function viewSimple(list, emptyText, icon) {
  list.sort(cmpTask);
  return list.length ? list.map(i => rowHtml(i)).join('') : empty(emptyText, icon);
}

function viewAll() {
  const T = tasks().filter(i => !i.done);
  if (!T.length) return empty('Brak zadań. Dodaj pierwsze poniżej.', 'all');
  return Store.lists().map(l => {
    const L = T.filter(i => i.listId === l.id).sort(cmpTask);
    return L.length ? group(`<span class="dot" style="width:9px;height:9px;border-radius:50%;background:${esc(l.color)}"></span>${esc(l.name)}`, L.map(i => rowHtml(i, { showList: false })).join('')) : '';
  }).join('');
}

function viewList(l) {
  const T = tasks().filter(i => i.listId === l.id);
  const open = T.filter(i => !i.done).sort(cmpTask), done = T.filter(i => i.done).sort((a, b) => b.doneAt - a.doneAt);
  const N = notes().filter(i => i.listId === l.id);
  let h = open.length ? open.map(i => rowHtml(i, { showList: false })).join('') : empty('Lista jest pusta.', 'list');
  h += doneGroup(done);
  if (N.length) h += `<div class="group"><div class="group-h">Notatki</div>${notesGrid(N)}</div>`;
  return h;
}

function viewDone() {
  const T = tasks().filter(i => i.done).sort((a, b) => (b.doneAt || 0) - (a.doneAt || 0));
  if (!T.length) return empty('Nic jeszcze nie ukończono.', 'done');
  const groups = {};
  for (const i of T) { const d = U.dateStr(new Date(i.doneAt || i.updatedAt)); (groups[d] = groups[d] || []).push(i); }
  return Object.entries(groups).map(([d, L]) => group(U.fmtDate(d), L.map(i => rowHtml(i)).join(''))).join('');
}

function notesGrid(list) {
  list.sort((a, b) => (b.starred - a.starred) || (b.updatedAt - a.updatedAt));
  return `<div class="notes-grid">${list.map(n => `<div class="note-card ${ui.sel === n.id ? 'sel' : ''}" data-id="${n.id}">
    ${n.starred ? `<span class="pin">${ic('star')}</span>` : ''}
    <h3>${esc(n.title) || '<i style="color:var(--muted)">(bez tytułu)</i>'}</h3>
    ${n.body ? `<div class="body">${esc(n.body)}</div>` : ''}
    <div class="foot"><span class="dot" style="width:8px;height:8px;border-radius:50%;background:${esc(listColor(n.listId))}"></span>${esc(listName(n.listId))}<span style="margin-left:auto">${new Date(n.updatedAt).toLocaleDateString('pl-PL')}</span></div></div>`).join('')}</div>`;
}
function viewNotes(list) {
  return list.length ? notesGrid(list) : empty('Brak notatek. Wpisz pierwszą poniżej.', 'note');
}

function viewSearch() {
  const q = ui.search;
  const T = tasks().filter(i => matches(i, q)).sort(cmpTask);
  const N = notes().filter(i => matches(i, q));
  if (!T.length && !N.length) return empty(`Nic nie znaleziono dla „${q}”.`, 'search');
  return (T.length ? group(`Zadania (${T.length})`, T.map(i => rowHtml(i)).join('')) : '') + (N.length ? group(`Notatki (${N.length})`, notesGrid(N)) : '');
}

/* =================================================================
   KALENDARZ
   ================================================================= */
ui.evIndex = [];
/** Zwraca wydarzenia Google z pamięci podręcznej i w tle pobiera brakujące. */
function eventsFor(from, to) {
  const S = Store.settings;
  if (!S.googleOn || !G.hasValidToken()) { ui.evIndex = []; return []; }
  const key = from + '|' + to;
  const fresh = ui.ev.key === key && Date.now() - ui.ev.at < 5 * 60000;
  if (!fresh && !ui.ev.loading) {
    ui.ev.loading = true;
    G.listEvents(from, to).then(list => {
      ui.ev = { key, at: Date.now(), list, loading: false };
      render();
    }).catch(e => {
      ui.ev.loading = false; ui.ev.at = Date.now(); ui.ev.key = key;
      if (e.needAuth) { ui.sync.status = 'auth'; renderSyncStatus(); } else console.warn(e);
    });
  }
  const list = ui.ev.key === key ? ui.ev.list : [];
  ui.evIndex = list;
  return list;
}

function calRange() {
  const c = ui.cal;
  if (c.mode === 'month') {
    const d = U.parseDate(c.date); d.setDate(1);
    const first = U.weekStart(U.dateStr(d));
    return { from: first, to: U.addDays(first, 42), days: 42 };
  }
  if (isMobile()) return { from: c.date, to: U.addDays(c.date, 3), days: 3 };
  const ws = U.weekStart(c.date);
  return { from: ws, to: U.addDays(ws, 7), days: 7 };
}

function viewCalendar() {
  const c = ui.cal, r = calRange();
  const evs = eventsFor(r.from, r.to);
  const T = tasks().filter(i => i.due && i.due >= r.from && i.due < r.to);
  let title;
  if (c.mode === 'month') { const d = U.parseDate(c.date); title = `${U.MONTHS_NOM[d.getMonth()]} ${d.getFullYear()}`; }
  else { const a = U.parseDate(r.from), b = U.parseDate(U.addDays(r.to, -1)); title = a.getMonth() === b.getMonth() ? `${a.getDate()}–${b.getDate()} ${U.MONTHS[a.getMonth()]}` : `${a.getDate()} ${U.MONTHS[a.getMonth()].slice(0, 3)} – ${b.getDate()} ${U.MONTHS[b.getMonth()].slice(0, 3)}`; }
  const bar = `<div class="cal-toolbar">
    <button class="icon-btn" data-cal="prev" aria-label="Wstecz">${ic('left')}</button>
    <button class="btn" data-cal="today">Dziś</button>
    <button class="icon-btn" data-cal="next" aria-label="Dalej">${ic('right')}</button>
    <h2>${esc(title)}</h2>
    <div class="seg" style="margin-left:auto"><button data-cal="week" class="${c.mode === 'week' ? 'on' : ''}">${isMobile() ? '3 dni' : 'Tydzień'}</button><button data-cal="month" class="${c.mode === 'month' ? 'on' : ''}">Miesiąc</button></div>
  </div>`;
  return bar + (c.mode === 'month' ? monthHtml(r, T, evs) : weekHtml(r, T, evs));
}

function monthHtml(r, T, evs) {
  const t = U.todayStr(), cur = U.parseDate(ui.cal.date).getMonth();
  const max = isMobile() ? 3 : 4;
  let h = '<div class="month">' + ['pn', 'wt', 'śr', 'cz', 'pt', 'sb', 'nd'].map(d => `<div class="dow">${d}</div>`).join('');
  for (let i = 0; i < 42; i++) {
    const ds = U.addDays(r.from, i), d = U.parseDate(ds);
    const dayEv = evs.filter(e => e.date <= ds && e.endDate >= ds).sort((a, b) => (a.allDay ? '' : a.time) < (b.allDay ? '' : b.time) ? -1 : 1);
    const dayT = T.filter(x => x.due === ds).sort(cmpTask);
    const chips = [
      ...dayEv.filter(e => e.allDay).map(e => ({ s: '', h: `<div class="chipx event" style="--c:${esc(e.color)}" data-ev="${evs.indexOf(e)}">${esc(e.title)}</div>` })),
      ...dayEv.filter(e => !e.allDay).map(e => ({ s: e.time, h: `<div class="chipx event" style="--c:${esc(e.color)}" data-ev="${evs.indexOf(e)}">${e.time} ${esc(e.title)}</div>` })),
      ...dayT.map(x => ({ s: x.time || '', h: `<div class="chipx task ${x.done ? 'done' : ''}" data-id="${x.id}" draggable="true">${x.time ? x.time + ' ' : ''}${esc(x.title || '(bez tytułu)')}</div>` })),
    ].sort((a, b) => a.s < b.s ? -1 : a.s > b.s ? 1 : 0);
    h += `<div class="mcell ${d.getMonth() !== cur ? 'other' : ''} ${ds === t ? 'today' : ''}" data-newdate="${ds}" data-drop="${ds}">
      <span class="mnum" data-goto="${ds}">${d.getDate()}</span>${chips.slice(0, max).map(c => c.h).join('')}${chips.length > max ? `<span class="more" data-goto="${ds}">+${chips.length - max} więcej</span>` : ''}</div>`;
  }
  return h + '</div>';
}

/** Rozkłada nakładające się bloki na kolumny. */
function layoutBlocks(blocks) {
  blocks.sort((a, b) => a.s - b.s || b.e - a.e);
  let cluster = [], colsEnd = [], maxEnd = -1;
  const flush = () => { const n = colsEnd.length; cluster.forEach(b => b.n = n); cluster = []; colsEnd = []; };
  for (const b of blocks) {
    if (b.s >= maxEnd) flush();
    let col = colsEnd.findIndex(e => e <= b.s);
    if (col < 0) { col = colsEnd.length; colsEnd.push(b.e); } else colsEnd[col] = b.e;
    b.col = col; cluster.push(b); maxEnd = Math.max(maxEnd, b.e);
  }
  flush();
  return blocks;
}

function weekHtml(r, T, evs) {
  const t = U.todayStr(), S = Store.settings;
  const days = Array.from({ length: r.days }, (_, i) => U.addDays(r.from, i));
  let head = '<div></div>', allday = '<div>cały<br>dzień</div>', cols = '';
  for (const ds of days) {
    const d = U.parseDate(ds);
    head += `<div class="${ds === t ? 'today' : ''}" data-goto="${ds}" style="cursor:pointer">${U.DAYS_SHORT[d.getDay()]}<b>${d.getDate()}</b></div>`;
    const ad = [
      ...evs.filter(e => e.allDay && e.date <= ds && e.endDate >= ds).map(e => `<div class="chipx event" style="--c:${esc(e.color)}" data-ev="${evs.indexOf(e)}">${esc(e.title)}</div>`),
      ...T.filter(x => x.due === ds && !x.time).sort(cmpTask).map(x => `<div class="chipx task ${x.done ? 'done' : ''}" data-id="${x.id}" draggable="true">${esc(x.title || '(bez tytułu)')}</div>`),
    ];
    allday += `<div data-drop="${ds}" data-allday="1">${ad.join('')}</div>`;
    const blocks = [
      ...evs.filter(e => !e.allDay && e.date === ds).map(e => ({ s: U.timeToMin(e.time), e: Math.min(1440, U.timeToMin(e.time) + e.duration), ev: e })),
      ...T.filter(x => x.due === ds && x.time).map(x => ({ s: U.timeToMin(x.time), e: Math.min(1440, U.timeToMin(x.time) + (x.duration || S.defaultDuration)), task: x })),
    ];
    layoutBlocks(blocks);
    const bh = blocks.map(b => {
      const top = b.s / 60, hgt = Math.max(20, b.e - b.s) / 60;
      const pos = `top:calc(${top} * var(--hour));height:calc(${hgt} * var(--hour) - 2px);left:calc(${b.col} * (100% / ${b.n}) + 2px);right:auto;width:calc(100% / ${b.n} - 4px)`;
      const range = `${U.minToTime(b.s)}–${U.minToTime(b.e % 1440)}`;
      if (b.ev) return `<div class="blk" style="--c:${esc(b.ev.color)};${pos}" data-ev="${evs.indexOf(b.ev)}"><b>${esc(b.ev.title)}</b><small>${range}</small></div>`;
      return `<div class="blk task ${b.task.done ? 'done' : ''}" style="${pos}" data-id="${b.task.id}" draggable="true"><b>${b.task.done ? '✓ ' : ''}${esc(b.task.title || '(bez tytułu)')}</b><small>${range}</small></div>`;
    }).join('');
    cols += `<div class="wk-col ${ds === t ? 'today' : ''}" data-col="${ds}" data-drop="${ds}">${bh}${ds === t ? '<div class="now-line"></div>' : ''}</div>`;
  }
  const hours = Array.from({ length: 24 }, (_, h) => `<div>${h ? U.pad(h) + ':00' : ''}</div>`).join('');
  return `<div class="week" style="--n:${r.days}"><div class="wk-head">${head}</div><div class="wk-allday">${allday}</div>
    <div class="wk-scroll"><div class="wk-grid"><div class="wk-hours">${hours}</div>${cols}</div></div></div>`;
}

function afterCalendar(prevScroll) {
  const sc = $('.wk-scroll');
  if (sc) {
    const hourPx = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hour')) || 48;
    sc.scrollTop = prevScroll != null ? prevScroll : (Store.settings.weekStartHour || 7) * hourPx - 12;
    updateNowLine();
  }
}
function updateNowLine() {
  const l = $('.now-line'); if (!l) return;
  const n = new Date(); l.style.top = `calc(${(n.getHours() * 60 + n.getMinutes()) / 60} * var(--hour))`;
}

function calNav(a) {
  const c = ui.cal;
  if (a === 'today') c.date = U.todayStr();
  else if (a === 'week' || a === 'month') c.mode = a;
  else {
    const dir = a === 'next' ? 1 : -1;
    if (c.mode === 'month') c.date = U.addMonths(c.date, dir);
    else c.date = U.addDays(c.date, dir * (isMobile() ? 3 : 7));
  }
  render();
}

function showEvent(ev) {
  const when = ev.allDay
    ? (ev.date === ev.endDate ? U.fmtDate(ev.date, { full: true, weekday: true }) : `${U.fmtDate(ev.date, { full: true })} – ${U.fmtDate(ev.endDate, { full: true })}`) + ', cały dzień'
    : `${U.fmtDate(ev.date, { full: true, weekday: true })}, ${ev.time} (${U.fmtDur(ev.duration)})`;
  modal({
    title: ev.title,
    body: `<div class="ev-pop"><dl><dt>Kiedy</dt><dd>${esc(when)}</dd><dt>Kalendarz</dt><dd><span class="dot" style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${esc(ev.color)}"></span> ${esc(ev.calName)}</dd>${ev.location ? `<dt>Miejsce</dt><dd>${esc(ev.location)}</dd>` : ''}</dl>${ev.description ? `<p style="margin-top:12px;font-size:14px">${U.linkify(ev.description.replace(/<[^>]+>/g, ' '))}</p>` : ''}</div>`,
    foot: `<button class="btn" id="evToTask">${ic('plus')}Zadanie z tego</button>${ev.link ? `<a class="btn primary" href="${esc(ev.link)}" target="_blank" rel="noopener">${ic('ext')}Otwórz w Google</a>` : ''}`,
    onMount: (w, close) => {
      $('#evToTask', w).onclick = () => {
        close();
        const it = Store.newItem({ title: ev.title, due: ev.date, time: ev.allDay ? null : ev.time, duration: ev.allDay ? null : ev.duration, listId: Store.firstListId() });
        openDetail(it.id);
      };
    },
  });
}

/* =================================================================
   PANEL SZCZEGÓŁÓW
   ================================================================= */
function reminderOptions(it) {
  const o = it.time
    ? [[null, 'Brak'], [0, 'W chwili rozpoczęcia'], [5, '5 min wcześniej'], [10, '10 min wcześniej'], [15, '15 min wcześniej'], [30, '30 min wcześniej'], [60, '1 godz. wcześniej'], [120, '2 godz. wcześniej'], [1440, '1 dzień wcześniej']]
    : [[null, 'Brak'], [-540, 'W dniu terminu o 9:00 (tylko w aplikacji)'], [900, 'Dzień wcześniej o 9:00'], [360, 'Dzień wcześniej o 18:00'], [2340, '2 dni wcześniej o 9:00']];
  if (it.reminder != null && !o.some(([v]) => v === it.reminder)) o.push([it.reminder, `${it.reminder} min wcześniej`]);
  return o.map(([v, l]) => `<option value="${v ?? ''}" ${v === it.reminder ? 'selected' : ''}>${l}</option>`).join('');
}

function openDetail(id) {
  const was = ui.sel;
  ui.sel = id;
  renderDetail();
  if (isMobile() && !was && !(history.state && history.state.d)) history.pushState({ d: 1 }, '');
  render();
}
function closeDetail(fromPop) {
  if (!ui.sel) return;
  if (!fromPop && history.state && history.state.d) { history.back(); return; }
  const it = Store.get(ui.sel);
  if (it && !it.deleted && !it.title.trim() && !it.body.trim()) Store.remove(it.id);
  ui.sel = null;
  $('#detail').classList.remove('open'); $('#detail').setAttribute('aria-hidden', 'true');
  render();
}

function renderDetail(focusTitle) {
  const it = ui.sel && Store.get(ui.sel);
  const d = $('#detail');
  if (!it || it.deleted) { ui.sel = null; d.classList.remove('open'); return; }
  const isNote = it.type === 'note';
  const t = U.todayStr();
  const nextMon = U.addDays(t, ((8 - U.parseDate(t).getDay()) % 7) || 7);
  d.innerHTML = `<div class="d-inner ${isNote ? 'note-mode' : ''}">
    <div class="d-head">
      <div class="seg"><button data-f="type" data-v="task" class="${!isNote ? 'on' : ''}">Zadanie</button><button data-f="type" data-v="note" class="${isNote ? 'on' : ''}">Notatka</button></div>
      <span style="flex:1"></span>
      <button class="icon-btn star ${it.starred ? 'on' : ''}" data-f="star" title="${isNote ? 'Przypnij' : 'Ważne'}">${ic('star')}</button>
      <button class="icon-btn" data-f="close" aria-label="Zamknij">${ic('x')}</button>
    </div>
    <div class="d-body">
      <div class="d-title">${!isNote ? `<button class="check ${it.done ? '' : ''}" data-f="done" style="${it.done ? 'background:var(--accent);border-color:var(--accent);color:#fff' : ''}" aria-label="Ukończ">${ic('check')}</button>` : ''}
        <textarea id="dTitle" rows="1" placeholder="${isNote ? 'Tytuł notatki' : 'Co trzeba zrobić?'}">${esc(it.title)}</textarea></div>
      ${!isNote ? `
      <div class="field"><label for="dDue">Termin</label>
        <input class="inp" type="date" id="dDue" value="${it.due || ''}">
        <div class="quick-dates"><button data-f="qd" data-v="${t}">Dziś</button><button data-f="qd" data-v="${U.addDays(t, 1)}">Jutro</button><button data-f="qd" data-v="${nextMon}">Pn</button><button data-f="qd" data-v="${U.addDays(t, 7)}">Za tydzień</button>${it.due ? '<button data-f="qd" data-v="">Usuń termin</button>' : ''}</div></div>
      <div class="field-row">
        <div class="field"><label for="dTime">Godzina</label><input class="inp" type="time" id="dTime" value="${it.time || ''}" ${it.due ? '' : 'disabled'}></div>
        <div class="field"><label for="dDur">Czas trwania</label><input class="inp" id="dDur" list="durList" placeholder="np. 45m, 1h30" value="${it.duration ? U.fmtDur(it.duration).replace(' godz.', 'h') : ''}">
          <datalist id="durList"><option value="15 min"><option value="30 min"><option value="45 min"><option value="1 h"><option value="1 h 30 min"><option value="2 h"><option value="3 h"><option value="4 h"></datalist></div>
      </div>
      <div class="field"><label for="dRem">Przypomnienie</label><select class="inp" id="dRem" ${it.due ? '' : 'disabled'}>${reminderOptions(it)}</select></div>
      <div class="field"><label for="dRec">Powtarzanie</label><select class="inp" id="dRec" ${it.due ? '' : 'disabled'}>${Object.entries(U.REC_LABELS).map(([k, v]) => `<option value="${k}" ${k === (it.recurrence || '') ? 'selected' : ''}>${v}</option>`).join('')}</select></div>` : ''}
      <div class="field"><label for="dList">Lista</label><select class="inp" id="dList">${Store.lists().map(l => `<option value="${l.id}" ${l.id === it.listId ? 'selected' : ''}>${esc(l.name)}</option>`).join('')}</select></div>
      <div class="field"><label for="dBody">${isNote ? 'Treść' : 'Notatka do zadania'}</label><textarea class="inp body-inp" id="dBody" placeholder="${isNote ? 'Pisz…' : 'Szczegóły, linki…'}">${esc(it.body)}</textarea></div>
    </div>
    <div class="d-foot"><span>${it.done ? 'Ukończono ' + new Date(it.doneAt).toLocaleString('pl-PL', { dateStyle: 'short', timeStyle: 'short' }) : 'Utworzono ' + new Date(it.createdAt).toLocaleDateString('pl-PL')}</span>
      <button class="btn danger" data-f="delete">${ic('trash')}Usuń</button></div>
  </div>`;
  d.classList.add('open'); d.setAttribute('aria-hidden', 'false');
  const ta = $('#dTitle');
  const grow = () => { ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px'; };
  grow(); ta.addEventListener('input', grow);
  if (focusTitle) setTimeout(() => ta.focus(), 50);
}

function detailPatch(patch, rerender = true) {
  if (!ui.sel) return;
  Store.update(ui.sel, patch);
  if (rerender) renderDetail();
}

function bindDetail() {
  const d = $('#detail');
  const saveTitle = U.debounce((id, v) => Store.get(id) && Store.update(id, { title: v }), 300);
  const saveBody = U.debounce((id, v) => Store.get(id) && Store.update(id, { body: v }), 400);
  d.addEventListener('input', e => {
    if (e.target.id === 'dTitle') saveTitle(ui.sel, e.target.value);
    if (e.target.id === 'dBody') saveBody(ui.sel, e.target.value);
  });
  d.addEventListener('keydown', e => { if (e.target.id === 'dTitle' && e.key === 'Enter') { e.preventDefault(); e.target.blur(); } });
  d.addEventListener('change', e => {
    const it = Store.get(ui.sel); if (!it) return;
    const S = Store.settings;
    switch (e.target.id) {
      case 'dTitle': Store.update(it.id, { title: e.target.value }); break;
      case 'dBody': Store.update(it.id, { body: e.target.value }); break;
      case 'dDue': setDue(it, e.target.value || null); break;
      case 'dTime': {
        const time = e.target.value || null;
        const p = { time };
        if (time && !it.time) p.reminder = S.defaultReminder;
        if (!time && it.reminder != null && it.reminder < 360 && it.reminder >= 0) p.reminder = null;
        detailPatch(p); break;
      }
      case 'dDur': {
        const v = U.parseDur(e.target.value.replace(/\s*h\s*/g, 'h').replace(/\s*min/g, 'm').replace(/\s/g, ''));
        detailPatch({ duration: v || null }); break;
      }
      case 'dRem': detailPatch({ reminder: e.target.value === '' ? null : +e.target.value }, false); break;
      case 'dRec': detailPatch({ recurrence: e.target.value }, false); break;
      case 'dList': detailPatch({ listId: e.target.value }, false); break;
    }
  });
  d.addEventListener('click', async e => {
    const b = e.target.closest('[data-f]'); if (!b) return;
    const it = Store.get(ui.sel); if (!it) return;
    switch (b.dataset.f) {
      case 'close': closeDetail(); break;
      case 'star': detailPatch({ starred: !it.starred }); break;
      case 'done': Store.toggleDone(it.id); renderDetail(); break;
      case 'qd': setDue(it, b.dataset.v || null); break;
      case 'type': if (b.dataset.v !== it.type) detailPatch({ type: b.dataset.v }); break;
      case 'delete': {
        Store.remove(it.id);
        const id = it.id;
        closeDetail();
        toast(it.type === 'note' ? 'Usunięto notatkę' : 'Usunięto zadanie', 'Cofnij', () => Store.update(id, { deleted: false }), 5000);
        break;
      }
    }
  });
}
function setDue(it, due) {
  const p = { due };
  if (!due) Object.assign(p, { time: null, reminder: null, recurrence: '' });
  detailPatch(p);
}

/* =================================================================
   SZYBKIE DODAWANIE
   ================================================================= */
function setQaType(t) {
  ui.qaType = t;
  $('#qaType').innerHTML = t === 'note' ? `${ic('note')}<span>Notatka</span>` : `${ic('check')}<span>Zadanie</span>`;
  $('#qaInput').placeholder = t === 'note' ? 'Nowa notatka – wpisz tytuł' : 'Dodaj zadanie – np. „jutro 15:00 1h spotkanie”';
  qaPreview();
}
function qaPreview() {
  const v = $('#qaInput').value;
  const el = $('#qaPreview');
  if (!v.trim() || ui.qaType === 'note' || /^\s*(n|notatka)\s*:/i.test(v)) { el.innerHTML = /^\s*(n|notatka)\s*:/i.test(v) ? `<span class="chip">${ic('note')}notatka</span>` : ''; return; }
  const p = U.parseQuick(v, Store.lists());
  const c = [];
  if (p.due) c.push(`${ic('calendar')}${U.fmtDate(p.due)}`);
  if (p.time) c.push(`${ic('clock')}${p.time}`);
  if (p.duration) c.push(`${ic('dur')}${U.fmtDur(p.duration)}`);
  if (p.recurrence) c.push(`${ic('repeat')}${U.REC_LABELS[p.recurrence]}`);
  if (p.starred) c.push(`${ic('star')}ważne`);
  if (p.listId) c.push(esc(listName(p.listId)));
  el.innerHTML = c.map(x => `<span class="chip">${x.replace(/class="i /g, 'style="width:12px;height:12px" class="i ')}</span>`).join('');
}
function quickAdd(e) {
  e.preventDefault();
  const inp = $('#qaInput'), text = inp.value.trim();
  if (!text) return;
  const S = Store.settings;
  const explicitNote = /^\s*(n|notatka|note)\s*:/i.test(text);
  let data;
  if (ui.qaType === 'note' || explicitNote) {
    data = { type: 'note', title: text.replace(/^\s*(n|notatka|note)\s*:\s*/i, '') };
  } else {
    const p = U.parseQuick(text, Store.lists());
    data = { type: 'task', title: p.title, due: p.due, time: p.time, duration: p.duration, starred: p.starred, recurrence: p.recurrence };
    if (p.listId) data.listId = p.listId;
    if (!data.due && (ui.view === 'today' || ui.view === 'calendar') && !ui.search) data.due = U.todayStr();
    if (ui.view === 'starred') data.starred = true;
    if (data.time) data.reminder = S.defaultReminder;
    if (!data.due) data.recurrence = '';
  }
  if (!data.listId && ui.view === 'list') data.listId = ui.listId;
  const it = Store.newItem(data);
  inp.value = ''; qaPreview();
  toast(it.type === 'note' ? 'Dodano notatkę' : `Dodano${it.due ? ' na ' + U.fmtDate(it.due).toLowerCase() : ''}`, 'Otwórz', () => openDetail(it.id));
}

/* =================================================================
   USTAWIENIA
   ================================================================= */
function openSettings() {
  const S = Store.settings;
  G.preload();
  const redirect = location.origin;
  const remOpts = [[null, 'Brak'], [0, 'W chwili rozpoczęcia'], [5, '5 min'], [10, '10 min'], [15, '15 min'], [30, '30 min'], [60, '1 godz.']]
    .map(([v, l]) => `<option value="${v ?? ''}" ${v === S.defaultReminder ? 'selected' : ''}>${l}</option>`).join('');
  modal({
    title: 'Ustawienia', wide: true,
    body: `
    <div class="set-sec"><h3>Google: kalendarz i synchronizacja</h3>
      ${S.googleOn ? `<p>Połączono. Dane synchronizują się między urządzeniami przez ukryty folder aplikacji na Twoim Dysku Google, a zadania z terminem trafiają do kalendarza <b>Zadania</b>.</p>
        <div class="field"><span class="flabel">Pokazuj wydarzenia z kalendarzy</span><div class="cal-list" id="calList"><span class="hint">Wczytywanie…</span></div></div>
        <label class="inline-check"><input type="checkbox" id="sPush" ${S.pushToCalendar ? 'checked' : ''}> Dodawaj zadania z terminem do kalendarza „Zadania” (przypomnienia z Kalendarza Google)</label>
        <label class="inline-check" style="margin-top:6px"><input type="checkbox" id="sRmDone" ${S.removeDoneFromCalendar ? 'checked' : ''}> Usuwaj ukończone zadania z kalendarza</label>
        <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap"><button class="btn" id="sSync">${ic('sync')}Synchronizuj teraz</button><button class="btn danger" id="sDisc">Rozłącz</button></div>`
        : `<p>Wklej Client ID z Google Cloud (instrukcja w pliku README). Jako „Autoryzowane źródło JavaScript” podaj: <code>${esc(redirect)}</code></p>
        <div class="field"><label for="sCid">OAuth Client ID</label><input class="inp" id="sCid" placeholder="123…apps.googleusercontent.com" value="${esc(S.clientId)}"></div>
        <button class="btn primary" id="sConnect">${ic('google', 'fill')}Połącz z Google</button>`}
    </div>
    <div class="set-sec"><h3>Domyślne wartości</h3>
      <div class="field-row">
        <div class="field"><label for="sDur">Czas trwania (w kalendarzu)</label><select class="inp" id="sDur">${[15, 30, 45, 60, 90, 120].map(v => `<option value="${v}" ${v === S.defaultDuration ? 'selected' : ''}>${U.fmtDur(v)}</option>`).join('')}</select></div>
        <div class="field"><label for="sRem">Przypomnienie dla zadań z godziną</label><select class="inp" id="sRem">${remOpts}</select></div>
      </div>
      <div class="field-row">
        <div class="field"><label for="sHour">Kalendarz przewija się do</label><select class="inp" id="sHour">${[5, 6, 7, 8, 9].map(h => `<option value="${h}" ${h === S.weekStartHour ? 'selected' : ''}>${h}:00</option>`).join('')}</select></div>
        <div class="field"><label for="sTheme">Motyw</label><select class="inp" id="sTheme">${[['auto', 'Jak w systemie'], ['light', 'Jasny'], ['dark', 'Ciemny']].map(([v, l]) => `<option value="${v}" ${v === S.theme ? 'selected' : ''}>${l}</option>`).join('')}</select></div>
      </div>
    </div>
    <div class="set-sec"><h3>Powiadomienia z aplikacji</h3>
      <p>Działają, gdy aplikacja jest otwarta lub działa w tle. Przypomnienia, które przyjdą zawsze, nawet przy wyłączonej aplikacji, daje Kalendarz Google (sekcja wyżej).</p>
      <label class="inline-check"><input type="checkbox" id="sNotif" ${S.notifications ? 'checked' : ''}> Pokazuj powiadomienia systemowe</label>
    </div>
    <div class="set-sec"><h3>Kopia zapasowa</h3>
      <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" id="sExport">${ic('down')}Eksportuj (JSON)</button><label class="btn" style="cursor:pointer">${ic('up')}Importuj<input type="file" id="sImport" accept="application/json,.json" hidden></label></div>
    </div>`,
    onMount: (w, close) => {
      const q = s => $(s, w);
      const on = (s, ev, fn) => { const el = q(s); if (el) el.addEventListener(ev, fn); };
      on('#sCid', 'change', e => { Store.setSettings({ clientId: e.target.value.trim() }); G.preload(); });
      on('#sConnect', 'click', async () => {
        const cid = q('#sCid').value.trim();
        if (!/\.apps\.googleusercontent\.com$/.test(cid)) { toast('To nie wygląda na Client ID (powinien kończyć się na .apps.googleusercontent.com)'); return; }
        Store.setSettings({ clientId: cid });
        try {
          await G.getToken(true);
          Store.setSettings({ googleOn: true });
          close();
          toast('Połączono z Google – synchronizuję…');
          await syncNow(false);
          openSettings();
        } catch (err) { toast('Nie udało się połączyć: ' + err.message, null, null, 6000); }
      });
      on('#sSync', 'click', () => syncNow(true));
      on('#sDisc', 'click', () => { G.signOut(); Store.setSettings({ googleOn: false }); ui.sync.status = 'off'; ui.ev = { key: '', at: 0, list: [], loading: false }; close(); render(); toast('Rozłączono z Google. Dane zostały na urządzeniu.'); });
      on('#sPush', 'change', e => { Store.setSettings({ pushToCalendar: e.target.checked }); scheduleSync(); });
      on('#sRmDone', 'change', e => { Store.setSettings({ removeDoneFromCalendar: e.target.checked }); scheduleSync(); });
      on('#sDur', 'change', e => Store.setSettings({ defaultDuration: +e.target.value }));
      on('#sRem', 'change', e => Store.setSettings({ defaultReminder: e.target.value === '' ? null : +e.target.value }));
      on('#sHour', 'change', e => Store.setSettings({ weekStartHour: +e.target.value }));
      on('#sTheme', 'change', e => { Store.setSettings({ theme: e.target.value }); applyTheme(); });
      on('#sNotif', 'change', async e => {
        if (e.target.checked) {
          if (!('Notification' in self)) { toast('Ta przeglądarka nie obsługuje powiadomień'); e.target.checked = false; return; }
          const p = await Notification.requestPermission();
          if (p !== 'granted') { toast('Brak zgody na powiadomienia'); e.target.checked = false; return; }
        }
        Store.setSettings({ notifications: e.target.checked });
      });
      on('#sExport', 'click', () => {
        const blob = new Blob([JSON.stringify(Store.exportData(), null, 2)], { type: 'application/json' });
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `zadania-${U.todayStr()}.json`; a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      });
      on('#sImport', 'change', async e => {
        const f = e.target.files[0]; if (!f) return;
        try { const data = JSON.parse(await f.text()); Store.importData(data); toast('Zaimportowano'); render(); }
        catch (err) { toast('Nieprawidłowy plik: ' + err.message); }
      });
      const cl = q('#calList');
      if (cl) {
        G.listCalendars(true).then(cals => {
          const shown = new Set(Store.settings.showCalendars);
          cl.innerHTML = cals.filter(c => c.id !== Store.settings.taskCalendarId).map(c => {
            const id = c.primary ? 'primary' : c.id;
            return `<label><input type="checkbox" value="${esc(id)}" ${shown.has(id) ? 'checked' : ''}><span class="sw" style="background:${esc(c.backgroundColor)}"></span>${esc(c.summaryOverride || c.summary)}${c.primary ? ' (główny)' : ''}</label>`;
          }).join('') || '<span class="hint">Brak kalendarzy</span>';
          cl.addEventListener('change', () => {
            Store.setSettings({ showCalendars: $$('input:checked', cl).map(x => x.value) });
            ui.ev.at = 0; render();
          });
        }).catch(err => { cl.innerHTML = `<span class="hint">${err.needAuth ? 'Połącz ponownie, żeby zobaczyć listę kalendarzy.' : esc(err.message)}</span>`; });
      }
    },
  });
}
function applyTheme() {
  const t = Store.settings.theme;
  if (t === 'auto') delete document.documentElement.dataset.theme; else document.documentElement.dataset.theme = t;
}

/* =================================================================
   SYNCHRONIZACJA
   ================================================================= */
let syncPromise = null;
function setSync(status, msg = '') { ui.sync = { status, msg }; renderSyncStatus(); }
function syncNow(interactive) {
  if (!Store.settings.googleOn) { if (interactive) openSettings(); return Promise.resolve(); }
  if (syncPromise) return syncPromise;
  syncPromise = (async () => {
    if (!navigator.onLine) { setSync('offline'); return; }
    try {
      if (interactive) await G.getToken(true);
      else if (!G.hasValidToken()) throw new G.NeedAuth();
      setSync('busy');
      await G.syncData();
      await G.pushTasks();
      ui.ev.at = 0;
      setSync('ok');
      render();
    } catch (e) {
      if (e.needAuth) setSync('auth'); else { console.error(e); setSync('err', e.message); if (interactive) toast(e.message, null, null, 6000); }
    }
  })().finally(() => { syncPromise = null; });
  return syncPromise;
}
const scheduleSync = U.debounce(() => { if (Store.settings.googleOn && G.hasValidToken()) syncNow(false); }, 3000);

/* =================================================================
   PRZYPOMNIENIA W APLIKACJI
   ================================================================= */
function checkReminders() {
  const now = Date.now(), L = Store.local;
  let changed = false;
  for (const it of tasks()) {
    if (it.done || it.reminder == null || !it.due) continue;
    const start = U.startOf(it);
    const at = start.getTime() - it.reminder * 60000;
    const key = it.id + '@' + at;
    if (now >= at && now - at < 15 * 60000 && !L.notified[key]) {
      L.notified[key] = now; changed = true;
      const when = it.time ? `${U.fmtDate(it.due)}, ${it.time}` : U.fmtDate(it.due);
      toast(`🔔 ${it.title} – ${when}`, 'Otwórz', () => openDetail(it.id), 10000);
      if (Store.settings.notifications && 'Notification' in self && Notification.permission === 'granted') {
        const opts = { body: when + (it.duration ? ' · ' + U.fmtDur(it.duration) : ''), tag: key, icon: 'icons/icon-192.png', badge: 'icons/icon-192.png', data: { id: it.id } };
        if (navigator.serviceWorker && navigator.serviceWorker.controller) navigator.serviceWorker.ready.then(r => r.showNotification(it.title, opts));
        else try { new Notification(it.title, opts); } catch (_) { }
      }
    }
  }
  for (const [k, v] of Object.entries(L.notified)) if (now - v > 7 * 86400000) { delete L.notified[k]; changed = true; }
  if (changed) Store.saveLocal();
  updateNowLine();
}

/* =================================================================
   ZDARZENIA
   ================================================================= */
function bindListTools() {
  const e = $('#listEdit'), d = $('#listDel');
  if (e) e.onclick = async () => { const l = Store.state.lists[ui.listId]; const n = await askText('Zmień nazwę listy', l.name); if (n) Store.updateList(l.id, { name: n }); };
  if (d) d.onclick = async () => {
    const l = Store.state.lists[ui.listId];
    if (Store.lists().length < 2) { toast('Musi zostać co najmniej jedna lista'); return; }
    if (await confirmBox('Usunąć listę?', `Lista „${l.name}” zostanie usunięta, a jej zadania i notatki przeniesione do pierwszej listy.`)) { Store.removeList(l.id); setView('today'); }
  };
}

function bindView() {
  const v = $('#view');
  v.addEventListener('click', e => {
    const act = e.target.closest('[data-act]');
    if (act) {
      e.stopPropagation();
      if (act.dataset.act === 'showdone') { ui.showDone = !ui.showDone; render(); return; }
      const id = act.closest('[data-id]').dataset.id;
      const it = Store.get(id);
      if (act.dataset.act === 'toggle') {
        const nextId = Store.toggleDone(id);
        if (Store.get(id).done) toast(nextId ? 'Ukończono – następne wystąpienie: ' + U.fmtDate(Store.get(nextId).due).toLowerCase() : 'Ukończono', 'Cofnij', () => { Store.toggleDone(id); if (nextId) Store.remove(nextId); });
        if (ui.sel === id) renderDetail();
      }
      if (act.dataset.act === 'star') { Store.update(id, { starred: !it.starred }); if (ui.sel === id) renderDetail(); }
      return;
    }
    const cal = e.target.closest('[data-cal]'); if (cal) return calNav(cal.dataset.cal);
    const ev = e.target.closest('[data-ev]'); if (ev) { const x = ui.evIndex[+ev.dataset.ev]; if (x) showEvent(x); return; }
    const row = e.target.closest('[data-id]'); if (row) return openDetail(row.dataset.id);
    const go = e.target.closest('[data-goto]');
    if (go) { ui.cal.date = go.dataset.goto; ui.cal.mode = 'week'; return render(); }
    const col = e.target.closest('[data-col]');
    if (col) {
      const y = e.clientY - col.getBoundingClientRect().top;
      const hourPx = col.offsetHeight / 24;
      const min = Math.max(0, Math.min(1410, Math.floor(y / hourPx * 2) * 30));
      const it = Store.newItem({ due: col.dataset.col, time: U.minToTime(min), duration: Store.settings.defaultDuration, reminder: Store.settings.defaultReminder });
      openDetail(it.id); renderDetail(true); return;
    }
    const nd = e.target.closest('[data-newdate],[data-allday]');
    if (nd) { const it = Store.newItem({ due: nd.dataset.newdate || nd.dataset.drop }); openDetail(it.id); renderDetail(true); }
  });

  // Przeciąganie zadań w kalendarzu
  v.addEventListener('dragstart', e => { const el = e.target.closest('[draggable][data-id]'); if (!el) return; e.dataTransfer.setData('text/plain', el.dataset.id); e.dataTransfer.effectAllowed = 'move'; });
  v.addEventListener('dragover', e => { const t = e.target.closest('[data-drop]'); if (!t) return; e.preventDefault(); $$('.drop', v).forEach(x => x !== t && x.classList.remove('drop')); t.classList.add('drop'); });
  v.addEventListener('dragleave', e => { const t = e.target.closest('[data-drop]'); if (t && !t.contains(e.relatedTarget)) t.classList.remove('drop'); });
  v.addEventListener('drop', e => {
    const t = e.target.closest('[data-drop]'); if (!t) return;
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain'), it = Store.get(id); if (!it) return;
    const p = { due: t.dataset.drop };
    if (t.dataset.col) {
      const hourPx = t.offsetHeight / 24;
      const min = Math.max(0, Math.min(1425, Math.round((e.clientY - t.getBoundingClientRect().top) / hourPx * 4) * 15));
      p.time = U.minToTime(min);
      if (!it.time && it.reminder == null) p.reminder = Store.settings.defaultReminder;
    } else if (t.dataset.allday) { p.time = null; if (it.reminder != null && it.reminder < 360) p.reminder = null; }
    Store.update(id, p);
    if (ui.sel === id) renderDetail();
  });
}

function bindGlobal() {
  $('#nav').addEventListener('click', e => { const b = e.target.closest('[data-view]'); if (b) setView(b.dataset.view); });
  $('#listsNav').addEventListener('click', e => { const b = e.target.closest('[data-list]'); if (b) setView('list', b.dataset.list); });
  $('#addList').innerHTML = ic('plus');
  $('#addList').onclick = async () => {
    const n = await askText('Nowa lista', '');
    if (n) { const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#10b981', '#14b8a6', '#eab308', '#ef4444']; const l = Store.addList(n, colors[Store.lists().length % colors.length]); setView('list', l.id); }
  };
  $('#openSettings').innerHTML = `${ic('settings')}<span>Ustawienia</span>`;
  $('#openSettings').onclick = () => { document.body.classList.remove('menu-open'); openSettings(); };
  $('#syncStatus').onclick = () => syncNow(true);
  $('#menuBtn').innerHTML = ic('menu');
  $('#menuBtn').onclick = () => document.body.classList.toggle('menu-open');
  $('#scrim').onclick = () => document.body.classList.remove('menu-open');
  $('.search-ico').innerHTML = ic('search');
  $('.qa-add').innerHTML = ic('plus');
  const s = $('#search');
  s.addEventListener('input', U.debounce(() => { ui.search = s.value.trim(); $('.search').classList.toggle('has', !!ui.search); render(); }, 150));
  $('#quickAdd').addEventListener('submit', quickAdd);
  $('#qaInput').addEventListener('input', qaPreview);
  $('#qaType').onclick = () => { setQaType(ui.qaType === 'note' ? 'task' : 'note'); $('#qaInput').focus(); };
  document.addEventListener('keydown', e => {
    const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
    if (e.key === 'Escape') { if ($('.modal-wrap')) return; if (ui.sel) closeDetail(); else if (typing) document.activeElement.blur(); }
    if (typing || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'n') { e.preventDefault(); $('#qaInput').focus(); }
    if (e.key === '/') { e.preventDefault(); s.focus(); }
  });
  addEventListener('popstate', () => { if (ui.sel) closeDetail(true); });
  addEventListener('online', () => syncNow(false));
  addEventListener('offline', () => Store.settings.googleOn && setSync('offline'));
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') { syncNow(false); checkReminders(); render(); } });
  let lastW = isMobile();
  addEventListener('resize', U.debounce(() => { if (isMobile() !== lastW) { lastW = isMobile(); render(); } }, 200));
}

/* =================================================================
   START
   ================================================================= */
async function start() {
  await Store.load();
  applyTheme();
  bindGlobal(); bindView(); bindDetail();
  setQaType('task');
  Store.on(kind => {
    if (kind === 'items' || kind === 'lists' || kind === 'merge') render();
    if (kind === 'merge' && ui.sel) renderDetail();
    if (kind === 'items' || kind === 'lists') scheduleSync();
  });
  render();
  const m = location.hash.match(/item=([0-9a-v]+)/);
  if (m && Store.get(m[1])) { openDetail(m[1]); history.replaceState(null, '', location.pathname); }
  if (Store.settings.googleOn) { G.preload(); syncNow(false); }
  setInterval(checkReminders, 20000); checkReminders();
  setInterval(() => syncNow(false), 3 * 60000);
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    navigator.serviceWorker.register('sw.js').catch(e => console.warn('SW', e));
    navigator.serviceWorker.addEventListener('message', e => { if (e.data && e.data.open) openDetail(e.data.open); });
  }
}
start();
