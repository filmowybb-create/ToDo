/* Zadania – narzędzia: daty, identyfikatory, parser szybkiego dodawania */
'use strict';

const U = (() => {
  const pad = n => String(n).padStart(2, '0');
  const B32 = '0123456789abcdefghijklmnopqrstuv';

  /** Identyfikator w alfabecie base32hex – nadaje się też jako ID wydarzenia Google Calendar. */
  function uid() {
    let r = '';
    const a = new Uint8Array(8);
    crypto.getRandomValues(a);
    for (const b of a) r += B32[b & 31];
    return Date.now().toString(32) + r;
  }

  const dateStr = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const todayStr = () => dateStr(new Date());
  function parseDate(s) { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); }
  function addDays(s, n) { const d = parseDate(s); d.setDate(d.getDate() + n); return dateStr(d); }
  function addMonths(s, n) {
    const d = parseDate(s); const day = d.getDate();
    d.setDate(1); d.setMonth(d.getMonth() + n);
    const last = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    d.setDate(Math.min(day, last));
    return dateStr(d);
  }
  const diffDays = (a, b) => Math.round((parseDate(b) - parseDate(a)) / 86400000);
  /** Poniedziałek tygodnia, w którym jest data. */
  function weekStart(s) { const d = parseDate(s); const wd = (d.getDay() + 6) % 7; d.setDate(d.getDate() - wd); return dateStr(d); }

  const DAYS = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];
  const DAYS_SHORT = ['nd', 'pn', 'wt', 'śr', 'cz', 'pt', 'sb'];
  const MONTHS = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];
  const MONTHS_NOM = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

  function fmtDate(s, opts = {}) {
    if (!s) return '';
    const t = todayStr();
    const dd = diffDays(t, s);
    if (!opts.full) {
      if (dd === 0) return 'Dziś';
      if (dd === 1) return 'Jutro';
      if (dd === -1) return 'Wczoraj';
      if (dd > 1 && dd < 7) return cap(DAYS[parseDate(s).getDay()]);
    }
    const d = parseDate(s);
    let r = `${opts.weekday ? DAYS_SHORT[d.getDay()] + ', ' : ''}${d.getDate()} ${MONTHS[d.getMonth()]}`;
    if (d.getFullYear() !== new Date().getFullYear()) r += ' ' + d.getFullYear();
    return r;
  }
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

  function fmtDur(min) {
    if (!min) return '';
    const h = Math.floor(min / 60), m = min % 60;
    if (!h) return `${m} min`;
    return m ? `${h} h ${m} min` : `${h} h`;
  }
  /** "45m", "1h30", "1,5h", "90", "2h 15min" → minuty */
  function parseDur(s) {
    if (s == null) return null;
    s = String(s).trim().toLowerCase().replace(',', '.').replace(/\s+/g, '');
    if (!s) return null;
    let m = s.match(/^(\d+(?:\.\d+)?)h(?:(\d+)(?:m|min)?)?$/);
    if (m) return Math.round(parseFloat(m[1]) * 60 + (m[2] ? +m[2] : 0));
    m = s.match(/^(\d+)(?:m|min)?$/);
    if (m) return +m[1];
    m = s.match(/^(\d+):(\d{2})$/);
    if (m) return +m[1] * 60 + +m[2];
    return null;
  }
  const timeToMin = t => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
  const minToTime = n => `${pad(Math.floor(n / 60) % 24)}:${pad(n % 60)}`;

  /** Moment rozpoczęcia zadania (Date) lub null. Zadanie bez godziny zaczyna się o 00:00. */
  function startOf(item) {
    if (!item.due) return null;
    const d = parseDate(item.due);
    if (item.time) { const [h, m] = item.time.split(':').map(Number); d.setHours(h, m, 0, 0); }
    return d;
  }

  /** Następny termin zadania cyklicznego. */
  function nextDue(due, rec) {
    switch (rec) {
      case 'daily': return addDays(due, 1);
      case 'weekdays': { let d = addDays(due, 1); while ([0, 6].includes(parseDate(d).getDay())) d = addDays(d, 1); return d; }
      case 'weekly': return addDays(due, 7);
      case 'biweekly': return addDays(due, 14);
      case 'monthly': return addMonths(due, 1);
      case 'yearly': return addMonths(due, 12);
      default: return null;
    }
  }
  const REC_LABELS = { '': 'Nie powtarzaj', daily: 'Codziennie', weekdays: 'W dni robocze', weekly: 'Co tydzień', biweekly: 'Co 2 tygodnie', monthly: 'Co miesiąc', yearly: 'Co rok' };

  /* ---------- Parser szybkiego dodawania ----------
     Przykłady: "jutro 15:00 1h Spotkanie z Anią !"
                "pt o 9 30m zadzwonić do banku #praca"
                "n: pomysł na prezent"  → notatka
                "24.12 kupić karpia co rok" */
  const WD = [
    [/^(nd|niedz\.?|niedziel[aęi]|ndz)$/, 0], [/^(pn|pon\.?|poniedział(ek|ku))$/, 1], [/^(wt|wtor(ek|ku))$/, 2],
    [/^(śr|sr|środ[aęy]|srod[aey])$/, 3], [/^(czw|cz|czwart(ek|ku))$/, 4], [/^(pt|pi[aą]t(ek|ku)?)$/, 5], [/^(sob|sb|sobot[aęy])$/, 6],
  ];
  function parseQuick(text, lists = []) {
    const out = { type: 'task', tags: [], title: '', due: null, time: null, duration: null, starred: false, recurrence: '', listId: null };
    let s = ' ' + text.trim() + ' ';
    const take = (re, fn) => { s = s.replace(re, (...a) => { fn(...a); return ' '; }); };

    take(/^\s*(n|notatka|note)\s*:\s*/i, () => { out.type = 'note'; });
    take(/\s(codziennie|co\s+dzie[nń])(?=\s)/i, () => out.recurrence = 'daily');
    take(/\s(w\s+dni\s+robocze|dni\s+robocze)(?=\s)/i, () => out.recurrence = 'weekdays');
    take(/\s(co\s+2\s+tygodnie)(?=\s)/i, () => out.recurrence = 'biweekly');
    take(/\s(co\s+tydzie[nń]|cotygodniowo)(?=\s)/i, () => out.recurrence = 'weekly');
    take(/\s(co\s+miesi[aą]c)(?=\s)/i, () => out.recurrence = 'monthly');
    take(/\s(co\s+rok)(?=\s)/i, () => out.recurrence = 'yearly');
    take(/\s!(?=\s)/, () => out.starred = true);
    take(/\s#([\p{L}\d_-]+)(?=\s)/gu, (_, name) => {
      const l = lists.find(l => l.name.toLowerCase() === name.toLowerCase());
      if (l && !out.listId) out.listId = l.id;
      else { const t = normTag(name); if (t && !out.tags.includes(t)) out.tags.push(t); }
    });
    // godzina: 15:00, o 15, o 9:30
    take(/\s(?:o\s+)?([01]?\d|2[0-3]):([0-5]\d)(?=\s)/, (_, h, m) => out.time = `${pad(+h)}:${m}`);
    take(/\so\s+([01]?\d|2[0-3])(?=\s)/, (_, h) => out.time = `${pad(+h)}:00`);
    // czas trwania: 30m, 30min, 1h, 1,5h, 1h30
    take(/\s(\d+(?:[.,]\d+)?h(?:\d+(?:m|min)?)?|\d+\s?(?:m|min))(?=\s)/i, (_, d) => out.duration = parseDur(d));
    // daty
    const t = todayStr();
    take(/\s(dzi[sś](iaj)?)(?=\s)/i, () => out.due = t);
    take(/\s(pojutrze)(?=\s)/i, () => out.due = addDays(t, 2));
    take(/\s(jutro)(?=\s)/i, () => out.due = addDays(t, 1));
    take(/\sza\s+(\d+)\s+dn?i(?=\s)/i, (_, n) => out.due = addDays(t, +n));
    take(/\sza\s+tydzie[nń](?=\s)/i, () => out.due = addDays(t, 7));
    take(/\s(\d{1,2})[./](\d{1,2})(?:[./](\d{2,4}))?(?=\s)/, (_, d, m, y) => {
      let yr = y ? (+y < 100 ? 2000 + +y : +y) : new Date().getFullYear();
      let cand = `${yr}-${pad(+m)}-${pad(+d)}`;
      if (!y && cand < addDays(t, -60)) cand = `${yr + 1}-${pad(+m)}-${pad(+d)}`;
      if (+m >= 1 && +m <= 12 && +d >= 1 && +d <= 31) out.due = cand;
    });
    s = s.replace(/\s(?:w\s+|we\s+)?([\p{L}.]+)(?=\s)/gu, (all, w) => {
      if (out.due) return all;
      for (const [re, wd] of WD) {
        if (re.test(w.toLowerCase())) {
          const cur = parseDate(t).getDay();
          out.due = addDays(t, (wd - cur + 7) % 7);
          return ' ';
        }
      }
      return all;
    });
    if (out.time && !out.due) out.due = t;
    out.title = s.replace(/\s+/g, ' ').trim();
    if (!out.title) out.title = text.trim();
    return out;
  }

  const normTag = s => String(s || '').trim().replace(/^#+/, '').replace(/\s+/g, '-').toLowerCase();
  /** Stały kolor dla tagu. */
  function tagHue(t) { let h = 0; for (const c of t) h = (h * 31 + c.codePointAt(0)) % 360; return h; }

  function esc(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
  function linkify(s) {
    return esc(s).replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>').replace(/\n/g, '<br>');
  }
  function debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; }

  return { normTag, tagHue, uid, pad, dateStr, todayStr, parseDate, addDays, addMonths, diffDays, weekStart, fmtDate, fmtDur, parseDur, timeToMin, minToTime, startOf, nextDue, REC_LABELS, parseQuick, esc, linkify, debounce, cap, DAYS, DAYS_SHORT, MONTHS, MONTHS_NOM };
})();
if (typeof module !== 'undefined') module.exports = U;
