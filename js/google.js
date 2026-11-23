/* Zadania – Google: logowanie (Google Identity Services), Kalendarz, synchronizacja przez Dysk (appDataFolder) */
'use strict';

const G = (() => {
  const SCOPES = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/drive.appdata';
  const FILE_NAME = 'zadania-data.json';
  const TASK_CAL_NAME = 'Zadania';
  const TZ = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Warsaw';

  let tokenClient = null, gisLoaded = null, pending = null;
  let token = null;
  try { token = JSON.parse(localStorage.getItem('zadania-token') || 'null'); } catch (_) { }

  class NeedAuth extends Error { constructor() { super('Wymagane ponowne połączenie z Google'); this.needAuth = true; } }

  function loadGis() {
    if (gisLoaded) return gisLoaded;
    gisLoaded = new Promise((res, rej) => {
      if (self.google && google.accounts) return res();
      const s = document.createElement('script');
      s.src = 'https://accounts.google.com/gsi/client'; s.async = true;
      s.onload = () => res(); s.onerror = () => { gisLoaded = null; rej(new Error('Nie udało się wczytać logowania Google (brak internetu?)')); };
      document.head.appendChild(s);
    });
    return gisLoaded;
  }

  async function init() {
    const id = Store.settings.clientId;
    if (!id) throw new Error('Najpierw wpisz Client ID w ustawieniach.');
    await loadGis();
    if (tokenClient && tokenClient._id === id) return;
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: id, scope: SCOPES,
      callback: resp => {
        const p = pending; pending = null;
        if (resp.error) return p && p.rej(new Error(resp.error_description || resp.error));
        token = { access: resp.access_token, exp: Date.now() + (resp.expires_in - 60) * 1000 };
        localStorage.setItem('zadania-token', JSON.stringify(token));
        p && p.res(token.access);
      },
      error_callback: err => { const p = pending; pending = null; p && p.rej(new Error(err.message || err.type || 'Logowanie przerwane')); },
    });
    tokenClient._id = id;
  }

  const hasValidToken = () => !!(token && token.exp > Date.now());

  /** Zwraca token. Bez interactive nie otwiera okna – rzuca NeedAuth. */
  /** Ile ms zostało do wygaśnięcia tokenu (0, jeśli brak). */
  const expiresIn = () => (token ? Math.max(0, token.exp - Date.now()) : 0);

  /** Zwraca token. Bez interactive nie otwiera okna – rzuca NeedAuth. force – odnawia przed czasem. */
  async function getToken(interactive = false, force = false) {
    if (!force && hasValidToken()) return token.access;
    if (!interactive) throw new NeedAuth();
    await init();
    if (pending) pending.rej(new Error('Przerwane przez nowe logowanie'));
    return new Promise((res, rej) => {
      pending = { res, rej };
      const opts = { prompt: Store.settings.googleOn ? '' : 'consent' };
      if (Store.settings.googleEmail) opts.login_hint = Store.settings.googleEmail;
      tokenClient.requestAccessToken(opts);
    });
  }

  function signOut() {
    if (token && self.google && google.accounts) { try { google.accounts.oauth2.revoke(token.access, () => { }); } catch (_) { } }
    token = null; localStorage.removeItem('zadania-token');
  }

  async function api(url, opts = {}) {
    const t = await getToken(false);
    const r = await fetch(url, { ...opts, headers: { Authorization: 'Bearer ' + t, ...(opts.body && typeof opts.body === 'string' && !opts.raw ? { 'Content-Type': 'application/json' } : {}), ...(opts.headers || {}) } });
    if (r.status === 401) { token = null; localStorage.removeItem('zadania-token'); throw new NeedAuth(); }
    if (!r.ok && !(opts.okStatus || []).includes(r.status)) {
      let msg = r.status + '';
      try { const j = await r.json(); msg = (j.error && j.error.message) || msg; } catch (_) { }
      const e = new Error('Google: ' + msg); e.status = r.status; throw e;
    }
    if (r.status === 204) return null;
    const ct = r.headers.get('content-type') || '';
    return ct.includes('json') ? r.json() : r.text();
  }

  /* ================= Dysk: plik danych w ukrytym folderze aplikacji ================= */
  async function findFile() {
    const q = encodeURIComponent(`name='${FILE_NAME}'`);
    const r = await api(`https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${q}&fields=files(id,modifiedTime)`);
    return (r.files && r.files[0]) || null;
  }
  async function download(id) {
    const txt = await api(`https://www.googleapis.com/drive/v3/files/${id}?alt=media`);
    if (typeof txt === 'object') return txt; // już JSON
    try { return JSON.parse(txt); } catch (_) { return null; }
  }
  async function upload(data, id) {
    const body = JSON.stringify(data);
    if (id) {
      return api(`https://www.googleapis.com/upload/drive/v3/files/${id}?uploadType=media`, { method: 'PATCH', body, headers: { 'Content-Type': 'application/json' }, raw: true });
    }
    const boundary = 'zad' + Math.random().toString(36).slice(2);
    const meta = { name: FILE_NAME, parents: ['appDataFolder'], mimeType: 'application/json' };
    const multipart = `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(meta)}\r\n--${boundary}\r\nContent-Type: application/json\r\n\r\n${body}\r\n--${boundary}--`;
    return api('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', { method: 'POST', body: multipart, headers: { 'Content-Type': 'multipart/related; boundary=' + boundary }, raw: true });
  }

  let syncing = null;
  /** Pobiera dane z Dysku, łączy z lokalnymi i wysyła wynik z powrotem. */
  function syncData() {
    if (syncing) return syncing;
    syncing = (async () => {
      const L = Store.local;
      let id = L.driveFileId;
      let remote = null;
      if (id) { remote = await download(id).catch(e => { if (e.status === 404) { id = ''; return null; } throw e; }); }
      if (!id) { const f = await findFile(); if (f) { id = f.id; remote = await download(id); } }
      if (remote) Store.merge(remote);
      if (!remote || Store.differsFrom(remote) || !id) {
        const r = await upload(Store.exportData(), id);
        if (!id && r && r.id) id = r.id;
      }
      L.driveFileId = id; L.lastSync = Date.now(); L.dirty = false;
      Store.saveLocal();
    })().finally(() => { syncing = null; });
    return syncing;
  }

  /* ================= Kalendarz ================= */
  const CAL = 'https://www.googleapis.com/calendar/v3';
  let calListCache = null;

  async function listCalendars(force) {
    if (calListCache && !force) return calListCache;
    const r = await api(`${CAL}/users/me/calendarList?minAccessRole=reader&maxResults=250`);
    calListCache = r.items || [];
    const prim = calListCache.find(c => c.primary);
    if (prim && prim.id.includes('@') && Store.settings.googleEmail !== prim.id) Store.setSettings({ googleEmail: prim.id });
    return calListCache;
  }

  async function ensureTaskCalendar() {
    const S = Store.settings;
    const cals = await listCalendars();
    if (S.taskCalendarId && cals.some(c => c.id === S.taskCalendarId)) return S.taskCalendarId;
    const found = cals.find(c => c.summary === TASK_CAL_NAME && c.accessRole === 'owner');
    if (found) { Store.setSettings({ taskCalendarId: found.id }); return found.id; }
    const created = await api(`${CAL}/calendars`, { method: 'POST', body: JSON.stringify({ summary: TASK_CAL_NAME, description: 'Zadania z aplikacji Zadania (PWA)', timeZone: TZ }) });
    await api(`${CAL}/users/me/calendarList/${encodeURIComponent(created.id)}`, { method: 'PATCH', body: JSON.stringify({ colorId: '9' }) }).catch(() => { });
    calListCache = null;
    Store.setSettings({ taskCalendarId: created.id });
    return created.id;
  }

  /** Wydarzenia z wybranych kalendarzy (poza kalendarzem zadań) w zakresie dat [from, to). */
  async function listEvents(from, to) {
    const S = Store.settings;
    const cals = await listCalendars();
    const ids = S.showCalendars.map(id => id === 'primary' ? ((cals.find(c => c.primary) || {}).id || 'primary') : id)
      .filter(id => id !== S.taskCalendarId);
    const tMin = U.parseDate(from).toISOString(), tMax = U.parseDate(to).toISOString();
    const out = [];
    await Promise.all([...new Set(ids)].map(async id => {
      const cal = cals.find(c => c.id === id) || {};
      let pageToken = '';
      do {
        const r = await api(`${CAL}/calendars/${encodeURIComponent(id)}/events?singleEvents=true&orderBy=startTime&maxResults=2500&timeMin=${encodeURIComponent(tMin)}&timeMax=${encodeURIComponent(tMax)}${pageToken ? '&pageToken=' + pageToken : ''}`).catch(e => { console.warn('Kalendarz', id, e); return {}; });
        for (const ev of r.items || []) {
          if (ev.status === 'cancelled') continue;
          if (ev.extendedProperties && ev.extendedProperties.private && ev.extendedProperties.private.zadaniaId) continue;
          out.push(normEvent(ev, cal));
        }
        pageToken = r.nextPageToken || '';
      } while (pageToken);
    }));
    return out;
  }

  function normEvent(ev, cal) {
    const allDay = !!(ev.start && ev.start.date);
    let date, time = null, endDate, duration = null;
    if (allDay) { date = ev.start.date; endDate = U.addDays(ev.end.date, -1); }
    else {
      const s = new Date(ev.start.dateTime), e = new Date(ev.end.dateTime);
      date = U.dateStr(s); time = `${U.pad(s.getHours())}:${U.pad(s.getMinutes())}`;
      endDate = U.dateStr(new Date(e - 1));
      duration = Math.max(15, Math.round((e - s) / 60000));
    }
    return { kind: 'event', id: ev.id, title: ev.summary || '(bez tytułu)', date, endDate, time, duration, allDay, link: ev.htmlLink, location: ev.location || '', description: ev.description || '', color: ev.backgroundColor || cal.backgroundColor || '#64748b', calName: cal.summaryOverride || cal.summary || '' };
  }

  function eventFor(it) {
    const S = Store.settings;
    const ev = {
      summary: (it.done ? '✓ ' : '') + (it.title || '(bez tytułu)'),
      description: (it.body ? it.body + '\n\n' : '') + '— dodane w aplikacji Zadania',
      extendedProperties: { private: { zadaniaId: it.id } },
      status: 'confirmed',
      transparency: it.time ? 'opaque' : 'transparent',
      reminders: { useDefault: false, overrides: [] },
    };
    if (it.time) {
      const start = U.startOf(it);
      const end = new Date(start.getTime() + (it.duration || S.defaultDuration) * 60000);
      const iso = d => `${U.dateStr(d)}T${U.pad(d.getHours())}:${U.pad(d.getMinutes())}:00`;
      ev.start = { dateTime: iso(start), timeZone: TZ };
      ev.end = { dateTime: iso(end), timeZone: TZ };
    } else {
      ev.start = { date: it.due };
      ev.end = { date: U.addDays(it.due, 1) };
    }
    if (it.reminder != null && it.reminder >= 0 && !it.done) ev.reminders.overrides.push({ method: 'popup', minutes: it.reminder });
    return ev;
  }
  const hashOf = ev => JSON.stringify([ev.summary, ev.description, ev.start, ev.end, ev.reminders]);

  /** Wysyła zmienione zadania do kalendarza "Zadania". ID wydarzenia = ID zadania, więc nie powstają duplikaty. */
  async function pushTasks() {
    const S = Store.settings, L = Store.local;
    if (!S.pushToCalendar) return 0;
    const calId = await ensureTaskCalendar();
    const base = `${CAL}/calendars/${encodeURIComponent(calId)}/events`;
    let n = 0;
    for (const it of Object.values(Store.state.items)) {
      const want = !it.deleted && it.type === 'task' && it.due && !(it.done && S.removeDoneFromCalendar);
      const key = calId + '|' + it.id;
      if (want) {
        const ev = eventFor(it), h = hashOf(ev);
        if (L.gcal[key] === h) continue;
        try {
          await api(`${base}/${it.id}`, { method: 'PUT', body: JSON.stringify(ev) });
        } catch (e) {
          if (e.status === 404) await api(base, { method: 'POST', body: JSON.stringify({ ...ev, id: it.id }) });
          else throw e;
        }
        L.gcal[key] = h; n++;
      } else if (it.cal && L.gcal[key] !== 'gone') {
        await api(`${base}/${it.id}`, { method: 'DELETE', okStatus: [404, 410] });
        L.gcal[key] = 'gone'; n++;
      }
    }
    Store.saveLocal();
    return n;
  }

  /** Wczytuje bibliotekę logowania z wyprzedzeniem, żeby okno logowania nie zostało zablokowane. */
  const preload = () => (Store.settings.clientId ? init().catch(() => { }) : Promise.resolve());

  return { preload, getToken, hasValidToken, expiresIn, signOut, syncData, listCalendars, listEvents, pushTasks, ensureTaskCalendar, NeedAuth, TZ };
})();
