'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import '../app/canvas/canvas.css';
import { site, jobs, cases, skills } from '@/lib/data';

/* ---------- icons ---------- */
const P = {
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>,
  case: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /></>,
  list: <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />,
  layers: <><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  file: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></>,
  pulse: <path d="M3 12h4l3-8 4 16 3-8h4" />,
  note: <><path d="M4 4h16v12l-4 4H4z" /><path d="M16 20v-4h4" /></>,
  game: <><rect x="2" y="7" width="20" height="11" rx="4" /><path d="M7 11v4M5 13h4M16 12h.01M18 14h.01" /></>,
  half: <><circle cx="12" cy="12" r="9" /><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" /></>,
  caret: <path d="M9 6l6 6-6 6" />,
};
const Icon = ({ n, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{P[n]}</svg>
);

/* ---------- card content ---------- */
function Arcade({ onWin }) {
  const [g, setG] = useState(() => start());
  function start() { const b = Array(16).fill(0); add(b); add(b); return { b, score: 0 }; }
  function add(b) { const e = b.map((v, i) => (v ? -1 : i)).filter((i) => i >= 0); if (e.length) b[e[Math.floor(Math.random() * e.length)]] = Math.random() < 0.9 ? 2 : 4; }
  const move = useCallback((dir) => {
    setG((cur) => {
      const b = cur.b.slice(); let score = cur.score, moved = false;
      const line = (idx) => {
        const vals = idx.map((i) => b[i]).filter(Boolean); const out = [];
        for (let i = 0; i < vals.length; i++) { if (vals[i] === vals[i + 1]) { out.push(vals[i] * 2); score += vals[i] * 2; i++; } else out.push(vals[i]); }
        while (out.length < 4) out.push(0);
        idx.forEach((ix, k) => { if (b[ix] !== out[k]) moved = true; b[ix] = out[k]; });
      };
      for (let r = 0; r < 4; r++) {
        const row = [0, 1, 2, 3].map((c) => r * 4 + c), col = [0, 1, 2, 3].map((c) => c * 4 + r);
        if (dir === 'l') line(row); if (dir === 'r') line(row.slice().reverse());
        if (dir === 'u') line(col); if (dir === 'd') line(col.slice().reverse());
      }
      if (!moved) return cur;
      add(b); if (b.some((v) => v >= 128)) onWin && onWin();
      return { b, score };
    });
  }, [onWin]);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; let sx = 0, sy = 0;
    const key = (e) => { const m = { ArrowLeft: 'l', ArrowRight: 'r', ArrowUp: 'u', ArrowDown: 'd' }[e.key]; if (m) { e.preventDefault(); move(m); } };
    const ds = (e) => { sx = e.clientX; sy = e.clientY; };
    const de = (e) => { const dx = e.clientX - sx, dy = e.clientY - sy; if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return; move(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'r' : 'l') : (dy > 0 ? 'd' : 'u')); };
    el.addEventListener('keydown', key); el.addEventListener('pointerdown', ds); el.addEventListener('pointerup', de);
    return () => { el.removeEventListener('keydown', key); el.removeEventListener('pointerdown', ds); el.removeEventListener('pointerup', de); };
  }, [move]);
  return (
    <div>
      <p>2048. Arrow keys, or swipe the board. Reach 128 for a secret.</p>
      <div className="g2048" ref={ref} tabIndex={0} aria-label="2048 board">
        {g.b.map((v, i) => <span key={i} className="g2048__t" data-v={v || undefined}>{v || ''}</span>)}
      </div>
      <div className="g2048__foot"><b>Score {g.score}</b><button type="button" className="chip chip--btn" onClick={() => setG(start())}>New game</button></div>
    </div>
  );
}

function Notes() {
  const [v, setV] = useState('');
  useEffect(() => { try { setV(localStorage.getItem('notes') || ''); } catch (e) {} }, []);
  return (
    <div>
      <p>Leave yourself a note. It stays in this browser only.</p>
      <textarea className="notes" rows={7} value={v} placeholder="Type something…"
        onChange={(e) => { setV(e.target.value); try { localStorage.setItem('notes', e.target.value); } catch (er) {} }} />
    </div>
  );
}

const CARDS = [
  { id: 'about', name: 'About', icon: 'user', c: '#FACC00', w: 520, rot: -1, x: 331, y: -159,
    body: () => (<>
      <p className="lede">I build things end to end, React Native apps, Next.js sites, Node backends, and the occasional model that has to survive contact with real photos :)</p>
      <p>Final year B.Tech in Information Technology at SRMS CET Bareilly, building things on the side because one courseload was never going to be enough</p>
      <p>Right now I'm a full-stack developer at HomlyHouse, working on a marketplace with Stripe billing and an escrow payment flow</p>
      <p>I like finding out why something broke. My favourite bug so far: a BGR/RGB mix-up that quietly dropped a classifier's live accuracy from 88% to 69%</p>
      <p>Almost forgot, welcome to the site! Poke around, it hides a few things :D</p>
      <p><a className="link" href={`mailto:${site.email}`}>{site.email}</a></p>
      <div><a className="chip" href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a><a className="chip" href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a><a className="chip" href={`mailto:${site.email}`}>Email</a></div>
    </>) },
  { id: 'work', name: 'Work', icon: 'case', c: '#A8E6A1', w: 560, rot: 0.7, x: -640, y: 150,
    body: () => (<div className="items">{cases.map((c) => (
      <a className="item" key={c.slug} href={`/work/${c.slug}`}>
        <span className="yr">{c.no}</span><span><span className="ttl">{c.title}</span><span className="sub">{c.tag}</span></span><span className="tag">{c.kind.split(',')[0].split(' ')[0]}</span>
      </a>))}</div>) },
  { id: 'experience', name: 'Experience', icon: 'list', c: '#FFB4A2', w: 600, rot: -0.8, x: 240, y: 270,
    body: () => (<div className="items">{jobs.map((j) => (
      <div className="item item--static" key={j.id}>
        <span className="yr">{j.year}</span><span><span className="ttl">{j.short}</span><span className="sub">{j.role} · {j.when}</span><span className="sub sub--body">{j.lede}</span></span>
      </div>))}</div>) },
  { id: 'stack', name: 'Stack', icon: 'layers', c: '#A9D6FF', w: 500, rot: 1, x: -800, y: -520,
    body: () => (<>{skills.map((g) => (<div key={g.group} className="stk"><b>{g.group}</b><div>{g.tools.map((t) => <span className="chip" key={t.n}>{t.n}</span>)}</div></div>))}</>) },
  { id: 'contact', name: 'Contact', icon: 'mail', c: '#B8F2E6', w: 380, rot: -0.6, x: -760, y: -170,
    body: () => (<>
      <p className="lede">Let's build something.</p>
      <p>Open to internships and interesting problems. The fastest way to reach me is email, I answer all of them.</p>
      <p><a className="link" href={`mailto:${site.email}`}>{site.email}</a></p>
      <div><a className="chip" href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a><a className="chip" href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></div>
    </>) },
  { id: 'resume', name: 'Résumé', icon: 'file', c: '#FFE0A3', w: 320, rot: 0.9, x: -80, y: -470, folder: 'words',
    body: () => (<><p>One page. Projects, experience and wins.</p><a className="chip chip--solid" href={site.resume} download>Download PDF ↓</a></>) },
  { id: 'now', name: 'Now', icon: 'pulse', c: '#C9E4C5', w: 360, rot: -1.2, x: 860, y: -120, folder: 'live',
    body: () => (<>
      <p className="lede">What I'm on right now</p>
      <p>Building a multi-role marketplace at HomlyHouse: Stripe billing, dual checkout and an escrow payment flow.</p>
      <p>Writing the backend for RecallOS, the spaced-repetition app that currently runs on mock data.</p>
      <p>Final year of B.Tech, and looking for the next interesting problem.</p>
    </>) },
  { id: 'notes', name: 'Notes', icon: 'note', c: '#E6D3B3', w: 360, rot: 1.1, x: 900, y: 250, folder: 'live', body: () => <Notes /> },
  { id: 'arcade', name: 'Arcade', icon: 'game', c: '#DCE8A0', w: 380, rot: -0.7, x: -1180, y: 170, body: (p) => <Arcade onWin={p.win} /> },
];
const byId = Object.fromEntries(CARDS.map((c) => [c.id, c]));
const FOLDERS = [{ id: 'words', name: 'Words', c: '#D9C2FF' }, { id: 'live', name: 'Live', c: '#BCC7F5' }];

const STICKIES = [
  { x: -2700, y: 2150, rot: -3, tint: 'yellow', h: 'Note to self', t: 'ship it first, then make it nicer 🤫' },
  { x: -2592, y: 2238, rot: 9, glyph: '✦' },
  { x: -3700, y: -2050, rot: 2, tint: 'pink', h: 'Quick question (easy)', t: 'is it a bug or a feature?' },
  { x: 280, y: -3400, rot: 3, tint: 'blue', h: 'Still panning?', t: 'bold of you. keep going.' },
  { x: 3050, y: -1900, rot: -2, tint: 'green', h: 'Drink water', t: 'yes, now. I will wait.' },
];

const COACH = [
  ['This is a desk, not a page', 'Drag the background to move around. Nothing scrolls here, everything is just somewhere.'],
  ['Zoom out to see the lot', '⌘/Ctrl + scroll zooms, and F fits everything on screen at once when you lose your bearings.'],
  ['The dock opens cards', 'Every icon down here is a card. Click to open it, click again to put it away. Drag a card by its title bar.'],
  ['Or just ask for it', '⌘/Ctrl + K lists every card and action by name, which is faster than hunting once you know what you want.'],
];

const MenuCtx = createContext({ menu: null, setMenu: () => {} });
function Menu({ id, label, children }) {
  const { menu, setMenu } = useContext(MenuCtx);
  return (
    <div className="arrange">
      <button type="button" aria-expanded={menu === id} aria-haspopup="menu" className={menu === id ? 'on' : ''} onClick={(e) => { e.stopPropagation(); setMenu(menu === id ? null : id); }}>{label} <span aria-hidden="true">▾</span></button>
      <div className="arrange__menu" role="menu" data-open={menu === id ? '' : undefined}>{children}</div>
    </div>
  );
}
function Item({ label, hint, on, run }) {
  return (
    <button type="button" role="menuitem" aria-checked={on} onClick={(e) => { e.stopPropagation(); run(); }}>
      <span className="arrange__label">{label}{on ? <em className="on-tag">·  on</em> : null}</span>{hint && <span className="arrange__hint">{hint}</span>}
    </button>
  );
}

/* ---------- component ---------- */
export default function CanvasApp() {
  const vp = useRef(null), world = useRef(null), grid = useRef(null), cursor = useRef(null);
  const cam = useRef({ x: 0, y: 0, s: 1 });
  const zTop = useRef(20);
  const [open, setOpen] = useState(['about']);
  const [pos, setPos] = useState({});
  const [focus, setFocus] = useState('about');
  const [zoomPct, setZoomPct] = useState(100);
  const [menu, setMenu] = useState(null);
  const [folder, setFolder] = useState(null);
  const [coach, setCoach] = useState(-1);
  const [pal, setPal] = useState(false);
  const [palQ, setPalQ] = useState('');
  const [palI, setPalI] = useState(0);
  const [theme, setTheme] = useState('light');
  const [found, setFound] = useState({});
  const [heroPos, setHeroPos] = useState({ x: -300, y: -105 });
  const [arranging, setArranging] = useState(false);
  const [far, setFar] = useState(false);
  const avTaps = useRef(0);

  const egg = (k) => setFound((f) => (f[k] ? f : { ...f, [k]: 1 }));
  const get = (id) => ({ x: pos[id]?.x ?? byId[id].x, y: pos[id]?.y ?? byId[id].y, rot: pos[id]?.rot ?? byId[id].rot, z: pos[id]?.z ?? 10 });

  /* camera */
  const applyCam = useCallback((animate) => {
    const { x, y, s } = cam.current;
    const w = world.current, g = grid.current; if (!w) return;
    w.style.transition = animate ? 'transform .65s cubic-bezier(.16,1,.3,1)' : 'none';
    g.style.transition = animate ? 'transform .65s cubic-bezier(.16,1,.3,1), background-size .65s cubic-bezier(.16,1,.3,1)' : 'none';
    w.style.transform = `translate3d(${x}px,${y}px,0) scale(${s})`;
    const size = 48 * s;
    g.style.backgroundSize = `${size}px ${size}px`;
    g.style.transform = `translate3d(${(x % size).toFixed(2)}px,${(y % size).toFixed(2)}px,0)`;
    setZoomPct(Math.round(s * 100));
  }, []);
  const camTo = useCallback((x, y, s, animate = true) => { cam.current = { x, y, s }; applyCam(animate); }, [applyCam]);
  const zoomAt = useCallback((f, cx, cy, animate = false) => {
    const c = cam.current, ns = Math.max(0.2, Math.min(1.6, c.s * f)), k = ns / c.s;
    camTo(cx - (cx - c.x) * k, cy - (cy - c.y) * k, ns, animate);
  }, [camTo]);
  const rectOf = (id) => {
    if (id === 'hero') { const e = document.getElementById('hero'); return { x: heroPos.x, y: heroPos.y, w: e.offsetWidth, h: e.offsetHeight }; }
    const e = document.querySelector(`[data-card-id="${id}"]`); const p = get(id);
    return { x: p.x, y: p.y, w: e ? e.offsetWidth : byId[id].w, h: e ? e.offsetHeight : 320 };
  };
  const frame = useCallback((ids, maxS = 1) => {
    const v = vp.current; if (!v || !ids.length) return;
    let l = 1e9, t = 1e9, r = -1e9, b = -1e9;
    ids.forEach((id) => { const q = rectOf(id); l = Math.min(l, q.x); t = Math.min(t, q.y); r = Math.max(r, q.x + q.w); b = Math.max(b, q.y + q.h); });
    const top = 90, bot = 130, aw = v.clientWidth - 120, ah = v.clientHeight - top - bot;
    const s = Math.min(aw / (r - l), ah / (b - t), maxS);
    camTo((v.clientWidth - (r - l) * s) / 2 - l * s, top + (ah - (b - t) * s) / 2 - t * s, s);
  }, [camTo, pos, heroPos, open]); // eslint-disable-line react-hooks/exhaustive-deps
  const fitAll = useCallback(() => frame(['hero', ...open]), [frame, open]);

  /* open / close cards */
  const openCard = useCallback((id, pan = true) => {
    setOpen((o) => (o.includes(id) ? o : [...o, id]));
    zTop.current += 1; setPos((p) => ({ ...p, [id]: { ...(p[id] || {}), z: zTop.current } })); setFocus(id);
    if (pan) setTimeout(() => {
      const q = rectOf(id), v = vp.current, s = Math.max(Math.min(cam.current.s, 1), 0.8);
      camTo(v.clientWidth / 2 - (q.x + q.w / 2) * s, v.clientHeight / 2 - 30 - (q.y + q.h / 2) * s, s);
    }, 60);
    try { history.replaceState(null, '', `?card=${id}`); } catch (e) {}
  }, [camTo, pos, heroPos]); // eslint-disable-line react-hooks/exhaustive-deps
  const closeCard = (id) => { setOpen((o) => o.filter((x) => x !== id)); try { history.replaceState(null, '', '/canvas'); } catch (e) {} };
  const toggleCard = (id) => (open.includes(id) ? closeCard(id) : openCard(id));

  /* arrange */
  const arrange = (mode) => {
    const ids = open.slice(); const v = vp.current; const next = {};
    const R = (a, b) => a + Math.random() * (b - a);
    const w = (id) => rectOf(id);
    if (mode === 'reset') { try { localStorage.removeItem('canvas-pos'); } catch (e) {} setPos({}); setHeroPos({ x: -300, y: -105 }); setMenu(null); setTimeout(fitAll, 700); setArranging(true); setTimeout(() => setArranging(false), 800); return; }
    if (mode === 'tidy') { let x = -700, y = 220, rowH = 0; ids.forEach((id) => { const q = w(id); if (x + q.w > 800) { x = -700; y += rowH + 40; rowH = 0; } next[id] = { x, y, rot: 0 }; x += q.w + 40; rowH = Math.max(rowH, q.h); }); }
    if (mode === 'ring') { ids.forEach((id, i) => { const a = (i / ids.length) * Math.PI * 2 - Math.PI / 2, q = w(id); next[id] = { x: Math.cos(a) * 760 - q.w / 2, y: Math.sin(a) * 440 - q.h / 2, rot: R(-2, 2) }; }); }
    if (mode === 'cascade') { ids.forEach((id, i) => { next[id] = { x: -260 + i * 46, y: 150 + i * 38, rot: R(-3, 3) }; }); }
    if (mode === 'scatter' || mode === 'chaos') { const placed = []; ids.forEach((id) => { const q = w(id); let p, tries = 0; do { p = { x: R(-1000, 700), y: R(-420, 520) }; tries++; } while (mode === 'scatter' && tries < 60 && placed.some((o) => p.x < o.x + o.w + 24 && p.x + q.w + 24 > o.x && p.y < o.y + o.h + 24 && p.y + q.h + 24 > o.y)); placed.push({ ...p, w: q.w, h: q.h }); next[id] = { ...p, rot: mode === 'chaos' ? R(-9, 9) : R(-2, 2) }; }); }
    setArranging(true); setPos((p) => { const n = { ...p }; Object.keys(next).forEach((k) => { n[k] = { ...(p[k] || {}), ...next[k] }; }); return n; });
    setMenu(null); setTimeout(() => { setArranging(false); }, 700); setTimeout(() => frame(['hero', ...ids]), 720);
  };

  /* persist positions */
  useEffect(() => { try { const s = JSON.parse(localStorage.getItem('canvas-pos') || 'null'); if (s) { setPos(s.pos || {}); if (s.hero) setHeroPos(s.hero); } } catch (e) {} }, []);
  const persist = useCallback((p, h) => { try { localStorage.setItem('canvas-pos', JSON.stringify({ pos: p, hero: h })); } catch (e) {} }, []);

  /* drag cards / hero */
  const drag = useRef(null);
  const onHeadDown = (id) => (e) => {
    if (e.target.closest('button')) return;
    const p = id === 'hero' ? heroPos : get(id);
    zTop.current += 1; if (id !== 'hero') { setFocus(id); e.currentTarget.closest('.card').style.zIndex = zTop.current; }
    drag.current = { id, sx: e.clientX, sy: e.clientY, ox: p.x, oy: p.y, el: e.currentTarget.closest('[data-obj]'), head: e.currentTarget };
    e.currentTarget.setPointerCapture(e.pointerId); e.currentTarget.dataset.dragging = '1'; e.stopPropagation();
  };
  const onHeadMove = (e) => {
    const d = drag.current; if (!d) return; const s = cam.current.s;
    d.nx = d.ox + (e.clientX - d.sx) / s; d.ny = d.oy + (e.clientY - d.sy) / s;
    d.el.style.left = d.nx + 'px'; d.el.style.top = d.ny + 'px';
  };
  const onHeadUp = () => {
    const d = drag.current; if (!d) return; delete d.head.dataset.dragging; drag.current = null;
    if (d.nx == null) return;
    if (d.id === 'hero') { const h = { x: d.nx, y: d.ny }; setHeroPos(h); persist(pos, h); }
    else setPos((p) => { const n = { ...p, [d.id]: { ...(p[d.id] || {}), x: d.nx, y: d.ny, z: zTop.current } }; persist(n, heroPos); return n; });
  };

  /* pan + wheel + keys */
  useEffect(() => {
    const v = vp.current; if (!v) return;
    if (matchMedia('(max-width: 900px)').matches) return;
    const ac = new AbortController(), o = { signal: ac.signal };
    let pan = null;
    v.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.card,#hero,.prop--btn')) return;
      pan = { x: e.clientX - cam.current.x, y: e.clientY - cam.current.y }; v.classList.add('panning'); v.setPointerCapture(e.pointerId);
      setMenu(null); setFolder(null);
    }, o);
    v.addEventListener('pointermove', (e) => { if (pan) { cam.current.x = e.clientX - pan.x; cam.current.y = e.clientY - pan.y; applyCam(false); } }, o);
    v.addEventListener('pointerup', () => { pan = null; v.classList.remove('panning'); }, o);
    v.addEventListener('wheel', (e) => {
      if (e.target.closest('.card__body') && !(e.ctrlKey || e.metaKey)) { const b = e.target.closest('.card__body'); if (b.scrollHeight > b.clientHeight) return; }
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) zoomAt(e.deltaY < 0 ? 1.08 : 0.92, e.clientX, e.clientY);
      else { cam.current.x -= e.deltaX; cam.current.y -= e.deltaY; applyCam(false); }
    }, { passive: false, signal: ac.signal });
    const move = (e) => {
      const c = cursor.current; if (!c) return;
      c.style.transform = `translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`; c.classList.add('on');
      c.classList.toggle('big', !!e.target.closest('a,button,.card__head,#hero,.g2048,textarea'));
    };
    addEventListener('pointermove', move, o);
    const far = () => {
      const { x, y, s } = cam.current; const cxw = (innerWidth / 2 - x) / s, cyw = (innerHeight / 2 - y) / s;
      setFar(Math.hypot(cxw, cyw) > 3000);
    };
    v.addEventListener('pointermove', far, o); v.addEventListener('wheel', far, { passive: true, signal: ac.signal });
    return () => ac.abort();
  }, [applyCam, zoomAt]);

  /* initial camera + deep link + theme + coach */
  useEffect(() => {
    document.body.classList.add('cv');
    try { setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'); } catch (e) {}
    const q = new URLSearchParams(location.search).get('card');
    const t = setTimeout(() => {
      const v = vp.current; if (!v) return;
      camTo(v.clientWidth / 2 - 0 * 0.85, v.clientHeight / 2 - 10, 0.85, false);
      setTimeout(() => { if (q && byId[q]) openCard(q); else frame(['hero', 'about']); }, 80);
    }, 30);
    let seen = false; try { seen = localStorage.getItem('canvas-tour'); } catch (e) {}
    if (!seen) setTimeout(() => setCoach(0), 900);
    return () => { clearTimeout(t); document.body.classList.remove('cv'); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const key = (e) => {
      const tag = (e.target.tagName || '').toLowerCase();
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPal((p) => !p); setPalQ(''); setPalI(0); return; }
      if (e.key === 'Escape') { setPal(false); setMenu(null); setFolder(null); return; }
      if (tag === 'input' || tag === 'textarea' || e.target.closest?.('.g2048')) return;
      if (e.key.toLowerCase() === 'f') fitAll();
    };
    addEventListener('keydown', key); return () => removeEventListener('keydown', key);
  }, [fitAll]);

  const setThemeTo = (t) => {
    setTheme(t); document.documentElement.dataset.theme = t; setMenu(null);
    try { localStorage.setItem('theme', t); } catch (e) {}
  };
  const endCoach = () => { setCoach(-1); try { localStorage.setItem('canvas-tour', '1'); } catch (e) {} };

  const actions = useMemo(() => [
    ...CARDS.map((c) => ({ t: `Open ${c.name}`, run: () => openCard(c.id) })),
    { t: 'Fit everything', run: fitAll }, { t: 'Close all cards', run: () => setOpen([]) },
    { t: 'Arrange: Tidy', run: () => arrange('tidy') }, { t: 'Arrange: Ring', run: () => arrange('ring') },
    { t: 'Theme: Light', run: () => setThemeTo('light') }, { t: 'Theme: Dark', run: () => setThemeTo('dark') },
    { t: 'Back to the site', run: () => { location.href = '/'; } },
  ], [open, pos, heroPos]); // eslint-disable-line react-hooks/exhaustive-deps
  const filtered = actions.filter((a) => a.t.toLowerCase().includes(palQ.toLowerCase()));

  const dockItem = (c, inTray) => (
    <button type="button" key={c.id} className={`dock__item${inTray ? ' dock__item--in' : ''}`} aria-label={c.name} data-open={open.includes(c.id) ? 'true' : undefined} onClick={() => toggleCard(c.id)}>
      <span className="dock__icon" style={{ '--c': c.c }}><Icon n={c.icon} /></span><span className="dock__tip">{c.name}</span>
    </button>
  );
  const top = CARDS.filter((c) => !c.folder);

  return (
    <div className="cvroot" data-arranging={arranging ? '1' : undefined}>
      <div className="m-note"><div><h2>Desktop only</h2><p>This place has a lot going on. Open it on a bigger screen, or head to the normal page.</p><a className="btn-link" href="/">← The site</a></div></div>

      <div id="viewport" ref={vp}>
        <div id="grid" ref={grid} aria-hidden="true" />
        <div id="world" ref={world}>
          {STICKIES.map((s, i) => s.glyph
            ? <div key={i} className="prop prop--sticky prop--glyph" data-tint="yellow" style={{ left: s.x, top: s.y, '--rot': `${s.rot}deg` }}>{s.glyph}</div>
            : <div key={i} className="prop prop--sticky" data-tint={s.tint} style={{ left: s.x, top: s.y, '--rot': `${s.rot}deg` }}><b>{s.h}</b>{s.t}</div>)}
          <button type="button" className="prop prop--btn" style={{ left: 3600, top: 2300 }} aria-label="A question mark" onClick={() => egg('far')}>
            {found.far ? <span><b>You went looking!</b><br />Most people never pan this far out. There's nothing useful here, that's the point :)</span> : '?'}
          </button>

          <div id="hero" data-obj="true" className={arranging ? 'is-arranging' : ''} style={{ left: heroPos.x, top: heroPos.y, width: 600 }}>
            <div className="hero__card" onPointerDown={onHeadDown('hero')} onPointerMove={onHeadMove} onPointerUp={onHeadUp}>
              <div className="hero__avatar" onClick={() => { if (++avTaps.current === 3) egg('avatar'); }}>{found.avatar ? '✨' : 'VG'}</div>
              <h1>Virat Gupta</h1>
              <p className="hero__role">Full-stack developer, <b>web, mobile &amp; ML</b></p>
              <p className="hero__meta">Bareilly, India</p>
            </div>
          </div>

          {open.map((id) => {
            const c = byId[id], p = get(id);
            return (
              <div key={id} className={`card${arranging ? ' is-arranging' : ''}`} data-obj="true" data-card-id={id} data-focused={focus === id ? '' : undefined}
                onPointerDown={() => { setFocus(id); }}
                style={{ left: p.x, top: p.y, zIndex: p.z, width: c.w, maxHeight: 640, transform: `rotate(${p.rot}deg)`, '--c': c.c }}>
                <div className="card__head" onPointerDown={onHeadDown(id)} onPointerMove={onHeadMove} onPointerUp={onHeadUp}>
                  <span className="card__ico"><Icon n={c.icon} size={15} /></span><span className="card__name">{c.name}</span>
                  <button type="button" className="card__x" aria-label={`Close ${c.name}`} onClick={() => closeCard(id)} />
                </div>
                <div className="card__body">{c.body({ win: () => egg('arcade') })}</div>
              </div>
            );
          })}
        </div>
      </div>

      <MenuCtx.Provider value={{ menu, setMenu }}>
      <div id="pill" onPointerDown={(e) => e.stopPropagation()}>
        <button type="button" onClick={fitAll}>Fit all</button>
        <button type="button" onClick={() => setOpen([])}>Minimise all</button>
        <Menu id="goto" label="Go to">
          <p className="goto__head">On the canvas</p>
          {CARDS.map((c) => (
            <button type="button" role="menuitem" key={c.id} onClick={() => { setMenu(null); openCard(c.id); }}>
              <span className="goto__ico" style={{ '--c': c.c }}><Icon n={c.icon} size={13} /></span><span className="arrange__label">{c.name}</span>
            </button>
          ))}
        </Menu>
        <button type="button" onClick={() => openCard(CARDS[Math.floor(Math.random() * CARDS.length)].id)}>Random</button>
        <Menu id="arrange" label="Arrange">
          <Item label="Tidy" hint="aligned rows, nothing tilted" run={() => arrange('tidy')} />
          <Item label="Scatter" hint="random, never overlapping" run={() => arrange('scatter')} />
          <Item label="Ring" hint="orbiting the hero" run={() => arrange('ring')} />
          <Item label="Cascade" hint="one fanned pile" run={() => arrange('cascade')} />
          <Item label="Chaos" hint="no rules at all" run={() => arrange('chaos')} />
          <div className="arrange__reset"><Item label="Reset layout" hint="forget saved positions, deal again" run={() => arrange('reset')} /></div>
        </Menu>
        <span className="pill__div" aria-hidden="true" />
        <Menu id="theme" label={<><Icon n="half" size={14} /> Theme</>}>
          <Item label="Light" hint="Cream" on={theme === 'light'} run={() => setThemeTo('light')} />
          <Item label="Dark" hint="Tokyo Night" on={theme === 'dark'} run={() => setThemeTo('dark')} />
        </Menu>
        <a className="pill__link" href="/">The site</a>
      </div>
      </MenuCtx.Provider>

      <nav id="dock" aria-label="Open a card">
        <div className="dock__scroll"><div className="dock__panel">
          {top.map((c) => dockItem(c))}
          {FOLDERS.map((f) => {
            const items = CARDS.filter((c) => c.folder === f.id);
            return (
              <div className="dock__folder" key={f.id} data-open={folder === f.id ? '' : undefined}>
                <button type="button" className="dock__item dock__item--folder" aria-label={`${f.name}, ${items.length} cards`} aria-expanded={folder === f.id}
                  onClick={() => setFolder(folder === f.id ? null : f.id)}>
                  <span className="dock__icon" style={{ '--c': f.c }}><Icon n="layers" /><span className="dock__caret"><Icon n="caret" size={10} /></span></span>
                  <span className="dock__tip">{f.name} · {items.length}</span>
                </button>
                <div className="dock__tray" style={{ '--n': items.length }}><div className="dock__tray-inner">{items.map((c) => dockItem(c, true))}</div></div>
              </div>
            );
          })}
          {dockItem(byId.arcade)}
          <span className="dock__sep" aria-hidden="true" />
          <a className="dock__item" href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><span className="dock__icon dock__icon--txt" style={{ '--c': '#E9E7DF' }}>GH</span><span className="dock__tip">GitHub</span></a>
          <a className="dock__item" href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><span className="dock__icon dock__icon--txt" style={{ '--c': '#E9E7DF' }}>in</span><span className="dock__tip">LinkedIn</span></a>
        </div></div>
      </nav>

      <div id="zoom-controls">
        <button type="button" aria-label="Zoom out" onClick={() => zoomAt(0.83, innerWidth / 2, innerHeight / 2, true)}>−</button>
        <button type="button" className="zoom-readout" aria-label="Fit everything on screen" onClick={fitAll}><span>{zoomPct}%</span></button>
        <button type="button" aria-label="Zoom in" onClick={() => zoomAt(1.2, innerWidth / 2, innerHeight / 2, true)}>+</button>
      </div>

      <div id="found">I FOUND IT ({Object.keys(found).length} of 3)</div>
      {far && <button type="button" className="homing" onClick={() => frame(['hero', ...open])}>↩ Back to the hero</button>}

      {coach >= 0 && (
        <aside id="coach" role="note" data-tail={coach === 2 ? '' : undefined}>
          <div className="coach__top"><span className="coach__badge">{coach + 1} of 4</span><button type="button" className="coach__skip" onClick={endCoach}>Skip</button></div>
          <p className="coach__title">{COACH[coach][0]}</p><p className="coach__body">{COACH[coach][1]}</p>
          <div className="coach__foot"><div className="coach__dots" aria-hidden="true">{COACH.map((_, i) => <i key={i} className={i === coach ? 'is-on' : ''} />)}</div>
            <button type="button" className="coach__next" onClick={() => (coach === 3 ? endCoach() : setCoach(coach + 1))}>{coach === 3 ? 'Got it' : 'Next'}</button></div>
        </aside>
      )}

      {pal && (
        <div id="cmdk" onPointerDown={(e) => { if (e.target.id === 'cmdk') setPal(false); }}>
          <div className="cmdk__box" role="dialog" aria-label="Quick menu">
            <input autoFocus placeholder="Open a card or run an action…" value={palQ} onChange={(e) => { setPalQ(e.target.value); setPalI(0); }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') { setPalI((i) => Math.min(i + 1, filtered.length - 1)); e.preventDefault(); }
                else if (e.key === 'ArrowUp') { setPalI((i) => Math.max(i - 1, 0)); e.preventDefault(); }
                else if (e.key === 'Enter' && filtered[palI]) { const a = filtered[palI]; setPal(false); a.run(); }
              }} />
            <ul>{filtered.map((a, i) => <li key={a.t} className={i === palI ? 'on' : ''} onClick={() => { setPal(false); a.run(); }}>{a.t}</li>)}</ul>
          </div>
        </div>
      )}

      <div id="cursor" ref={cursor} aria-hidden="true" />
    </div>
  );
}
