'use client';
import { useEffect, useRef } from 'react';

/* A typographic composition that is completely invisible until the pointer moves over the
   empty right side of the hero. A soft circular mask follows the cursor and only the words
   under it show. x / y are percentages of the safe area. */
const WORDS = [
  { w: 'building',                  s: 'big',     x: 0,  y: 1 },
  { w: 'scope creep',               s: 'mono',    x: 66, y: 5 },
  { w: 'shipping',                  s: 'serifbig', x: 40, y: 16 },
  { w: 'fixing bugs',               s: 'bold',    x: 0,  y: 26 },
  { w: 'debugging',                 s: 'outline', x: 0,  y: 37 },
  { w: 'one last commit',           s: 'serif',   x: 54, y: 41 },
  { w: 'finding bugs at 2 AM',      s: 'boldmk',  x: 4,  y: 56 },
  { w: 'just one more feature',     s: 'mono',    x: 58, y: 66 },
  { w: 'works on my machine',       s: 'outline2', x: 0, y: 75 },
  { w: 'fixing my sleep schedule',  s: 'serif',   x: 20, y: 86 },
  { w: "pretending it's intentional", s: 'mono',  x: 46, y: 96 },
];

export default function HeroScatter() {
  const box = useRef(null);

  useEffect(() => {
    const el = box.current;
    const hero = el.closest('.hero');
    const inner = hero.querySelector('.hero__inner');
    const name = hero.querySelector('.name');
    const base = hero.querySelector('.headline .morph__base') || hero.querySelector('.headline');
    const actions = hero.querySelector('.hero__actions');
    const ac = new AbortController(), sig = { signal: ac.signal };
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
    const timers = [];
    let alive = true, running = false, on = false;
    let tx = 0, ty = 0, x = 0, y = 0;

    /* keep the interactive area clear of the name, the tagline and the buttons */
    const place = () => {
      const h = hero.getBoundingClientRect();
      /* right edge of the actual glyphs (not the block boxes that stretch to full width) */
      const textRight = (node) => {
        let max = 0; const tw = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
        for (let n = tw.nextNode(); n; n = tw.nextNode()) {
          if (!n.textContent.trim()) continue;
          const r = document.createRange(); r.selectNodeContents(n);
          max = Math.max(max, r.getBoundingClientRect().right - h.left);
        }
        return max;
      };
      const gutter = parseFloat(getComputedStyle(inner).paddingRight) || 0;
      const right = h.width - gutter;
      const left = Math.max(h.width * 0.5, textRight(name) + 56, textRight(base) + 56);
      const top = 64 + 56;
      const bottom = actions.getBoundingClientRect().top - h.top - 28;
      const w = right - left, ht = bottom - top;
      if (!fine || w < 250 || ht < 280) { el.style.display = 'none'; return; }
      el.style.display = 'block';
      el.style.left = left + 'px'; el.style.top = top + 'px'; el.style.width = w + 'px'; el.style.height = ht + 'px';
    };
    const ro = new ResizeObserver(place);
    ro.observe(hero); ro.observe(base);
    place();
    const ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    ready.then(() => { if (!alive) return; place(); timers.push(setTimeout(place, 600), setTimeout(place, 2200)); });
    addEventListener('resize', place, sig);

    /* spotlight follows the pointer (rAF, eased) */
    const tick = () => {
      const k = reduce ? 1 : 0.2;
      x += (tx - x) * k; y += (ty - y) * k;
      el.style.setProperty('--mx', x.toFixed(1) + 'px'); el.style.setProperty('--my', y.toFixed(1) + 'px');
      if (alive && (on || Math.abs(tx - x) > 0.4 || Math.abs(ty - y) > 0.4)) requestAnimationFrame(tick); else running = false;
    };
    const kick = () => { if (!running) { running = true; requestAnimationFrame(tick); } };
    const pos = (e) => { const r = el.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top; };

    if (fine) {
      el.addEventListener('pointerenter', (e) => { pos(e); x = tx; y = ty; on = true; el.dataset.on = '1'; kick(); }, sig);
      el.addEventListener('pointermove', (e) => { pos(e); kick(); }, sig);
      el.addEventListener('pointerleave', () => { on = false; el.dataset.on = '0'; }, sig);
    }
    return () => { alive = false; ac.abort(); ro.disconnect(); timers.forEach(clearTimeout); };
  }, []);

  return (
    <div className="scatter" ref={box} data-on="0" aria-hidden="true">
      <div className="scatter__field">
        {WORDS.map((it) => (
          <span key={it.w} className={`sc sc--${it.s}`} style={{ left: `${it.x}%`, top: `${it.y}%` }}>{it.w}</span>
        ))}
      </div>
    </div>
  );
}
