'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const $ = (s, r) => (r || document).querySelector(s);
    const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = document.documentElement;
    const site = $('.site');
    const ac = new AbortController();
    const sig = { signal: ac.signal };
    const timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    let alive = true;
    let lenis = null;
    const observers = [];

    const yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();

    /* theme */
    const theme = $('.themepick');
    const label = () => { const d = root.dataset.theme === 'dark'; theme.setAttribute('aria-label', d ? 'Switch to light' : 'Switch to dark'); };
    label();
    theme.addEventListener('click', () => {
      const d = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = d; label();
      try { localStorage.setItem('theme', d); } catch (e) {}
    }, sig);

    /* smooth scroll: Lenis with its defaults, no CSS smooth-scroll fighting it */
    const goTo = (target, offset) => {
      const el = typeof target === 'string' ? $(target) : target;
      if (!el) return;
      const off = offset == null ? -(64 + 8) : offset;
      if (lenis) lenis.scrollTo(el, { offset: off });
      else window.scrollTo({ top: el.getBoundingClientRect().top + scrollY + off, behavior: reduce ? 'auto' : 'smooth' });
    };
    if (!reduce) {
      import('lenis').then(({ default: Lenis }) => {
        if (!alive) return;
        lenis = new Lenis();
        const raf = (t) => { if (!alive) return; lenis.raf(t); requestAnimationFrame(raf); };
        requestAnimationFrame(raf);
        if (location.hash && $(location.hash)) later(() => goTo(location.hash), 120);
      });
    }

    /* in-page anchors go through goTo; cross-page ones navigate normally */
    $$('a[href]').forEach((a) => {
      a.addEventListener('click', (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
        const u = new URL(a.href, location.href);
        if (u.origin !== location.origin || u.pathname !== location.pathname || !u.hash) return;
        if (u.hash === '#top') { e.preventDefault(); lenis ? lenis.scrollTo(0) : scrollTo({ top: 0, behavior: 'smooth' }); closeDrawer(); return; }
        const t = $(u.hash);
        if (!t) return;
        e.preventDefault(); closeDrawer(); history.replaceState(null, '', u.hash);
        if (u.hash === '#desk') { goTo(t, -(64 + 32)); later(() => { t.dataset.flash = '1'; later(() => delete t.dataset.flash, 2100); }, 500); }
        else goTo(t);
      }, sig);
    });

    /* drawer (mobile) */
    const burger = $('.burger'), drawer = $('#site-drawer'), scrim = $('.drawer__scrim');
    function closeDrawer() {
      delete root.dataset.drawer; burger.setAttribute('aria-expanded', 'false'); drawer.setAttribute('inert', '');
      if (lenis) lenis.start();
    }
    function openDrawer() {
      root.dataset.drawer = '1'; burger.setAttribute('aria-expanded', 'true'); drawer.removeAttribute('inert');
      if (lenis) lenis.stop();
    }
    burger.addEventListener('click', () => (root.dataset.drawer ? closeDrawer() : openDrawer()), sig);
    scrim.addEventListener('click', closeDrawer, sig);
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && root.dataset.drawer) closeDrawer(); }, sig);

    /* logos that fail to load: try the "plain" variant, then fall back to a text chip */
    $$('.s-tool img').forEach((img) => {
      const fix = () => {
        if (!img.src.includes('-original.svg')) { const t = img.closest('.s-tool'); img.remove(); t && t.classList.add('s-tool--text'); return; }
        img.src = img.src.replace('-original.svg', '-plain.svg');
      };
      img.addEventListener('error', fix, sig);
      if (img.complete && img.naturalWidth === 0) fix();
    });

    /* intro: eyebrow, name lines, headline words, actions */
    const hero = $('[data-hero]');
    if (hero) {
      const eyebrow = $('.hero__eyebrow'), lines = $$('.name__line > span'), words = $$('.word > span'), actions = $('.hero__actions');
      const play = () => {
        const d = 0.05;
        const add = (el, t) => later(() => el.classList.add('is-in'), t * 1000);
        add(eyebrow, d);
        lines.forEach((l, i) => add(l, d + 0.12 + i * 0.12));
        words.forEach((w, i) => add(w, d + 0.5 + i * 0.045));
        add(actions, d + 0.5 + words.length * 0.045 + 0.1);
      };
      if (reduce) { [eyebrow, actions].concat(lines, words).forEach((e) => e.classList.add('is-in')); }
      else (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => alive && requestAnimationFrame(play));
    }

    /* morph: the circle follows the cursor (eased) and opens on enter, closes on leave */
    $$('[data-morph]').forEach((el) => {
      let tx = 0, ty = 0, x = 0, y = 0, running = false;
      const tick = () => {
        x += (tx - x) * 0.22; y += (ty - y) * 0.22;
        el.style.setProperty('--mx', x.toFixed(1) + 'px'); el.style.setProperty('--my', y.toFixed(1) + 'px');
        if (alive && (el.dataset.on === '1' || Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5)) requestAnimationFrame(tick); else running = false;
      };
      const kick = () => { if (!running) { running = true; requestAnimationFrame(tick); } };
      el.addEventListener('pointerenter', (e) => {
        if (e.pointerType === 'touch') return;
        const r = el.getBoundingClientRect(); tx = x = e.clientX - r.left; ty = y = e.clientY - r.top;
        el.dataset.on = '1'; kick();
      }, sig);
      el.addEventListener('pointermove', (e) => {
        if (e.pointerType === 'touch') return;
        const r = el.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top; kick();
      }, sig);
      el.addEventListener('pointerleave', () => { el.dataset.on = '0'; }, sig);
    });

    /* hero grid parallax + accent spotlight (mouse), plus scroll-linked bits */
    const lns = $('.hero__lines'), glow = $('.hero__glow'), light = $('.hero__light');
    let mx = 0, my = 0, cx = 0, cy = 0;
    if (hero) {
      hero.addEventListener('pointermove', (e) => {
        const r = hero.getBoundingClientRect();
        mx = (e.clientX - r.left) / r.width - 0.5; my = (e.clientY - r.top) / r.height - 0.5;
        light.style.setProperty('--sx', e.clientX - r.left + 'px'); light.style.setProperty('--sy', e.clientY - r.top + 'px');
        light.dataset.on = '1';
      }, sig);
      hero.addEventListener('pointerleave', () => { light.dataset.on = '0'; mx = my = 0; }, sig);
    }
    const bar = $('.bar'), field = $('[data-closer-field]'), shotImgs = $$('[data-case-shot] img, [data-case-shot] video');
    const frame = () => {
      if (!alive) return;
      const y = window.scrollY, vh = innerHeight;
      bar.dataset.stuck = y > 8 ? '1' : '0';
      site.dataset.far = y > vh * 0.6 ? '1' : '0';
      if (!reduce) {
        if (hero) {
          cx += (mx - cx) * 0.08; cy += (my - cy) * 0.08;
          lns.style.transform = `translate3d(${(-cx * 40).toFixed(1)}px,${(-cy * 28 + y * 0.12).toFixed(1)}px,0)`;
          glow.style.transform = `translate3d(${(cx * 20).toFixed(1)}px,${(y * 0.06).toFixed(1)}px,0)`;
        }
        shotImgs.forEach((im) => {
          const f = im.closest('[data-case-shot]'), r = f.getBoundingClientRect();
          if (r.bottom < -50 || r.top > vh + 50) return;
          const p = (r.top + r.height / 2 - vh / 2) / vh;
          im.style.transform = `translate3d(0,${(p * -14).toFixed(1)}px,0) scale(1.04)`;
        });
        if (field) {
          const cr = field.parentNode.getBoundingClientRect();
          if (cr.bottom > 0 && cr.top < vh) field.style.transform = `translate3d(0,${((cr.top - vh) * -0.08).toFixed(1)}px,0)`;
        }
      }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);

    /* reveals: fade up 28px as they approach the viewport */
    let batch = 0, batchTimer = null;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target; io.unobserve(el);
        const d = reduce ? 0 : batch++ * 80;
        later(() => el.classList.add('is-in'), d);
      });
      clearTimeout(batchTimer); batchTimer = setTimeout(() => { batch = 0; }, 120);
    }, { threshold: 0, rootMargin: '0px 0px -12% 0px' });
    observers.push(io);
    $$('.reveal').forEach((el) => io.observe(el));

    /* toolbox: chips pop in one after another when their row appears */
    const io2 = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        io2.unobserve(e.target);
        $$('.s-tool', e.target).forEach((t, i) => later(() => t.classList.add('is-in'), reduce ? 0 : i * 45));
      });
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
    observers.push(io2);
    $$('.skillgroup').forEach((el) => io2.observe(el));

    /* experience: scroll-spy + mobile accordion */
    const items = $$('[data-xp-item]'), jobs = $$('[data-job]'), list = $('.xp__list');
    let lastBest = -1;
    if (items.length) {
      items.forEach((it, i) => it.addEventListener('click', (e) => { e.preventDefault(); goTo(jobs[i], -(64 + 24)); }, sig));
      const spy = () => {
        const mid = innerHeight * 0.42; let best = 0, bd = 1e9;
        jobs.forEach((j, i) => { const r = j.getBoundingClientRect(), d = Math.abs(r.top + Math.min(r.height, 220) / 2 - mid); if (d < bd) { bd = d; best = i; } });
        items.forEach((it, i) => { it.dataset.on = i === best ? '1' : '0'; });
        jobs.forEach((j, i) => { if (i === best) j.dataset.active = '1'; else delete j.dataset.active; });
        if (best !== lastBest) {
          lastBest = best;
          /* on small screens the timeline is a horizontal rail: keep the selected role in view */
          if (list && list.scrollWidth > list.clientWidth + 2) {
            const it = items[best];
            list.scrollTo({ left: it.offsetLeft - (list.clientWidth - it.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
          }
        }
      };
      addEventListener('scroll', spy, { passive: true, signal: ac.signal }); spy();
    }
    jobs.forEach((j) => {
      const t = $('.job__toggle', j);
      if (t) t.addEventListener('click', () => {
        const open = j.dataset.open === '1'; j.dataset.open = open ? '0' : '1'; t.setAttribute('aria-expanded', String(!open));
      }, sig);
    });

    return () => {
      alive = false; ac.abort(); observers.forEach((o) => o.disconnect()); timers.forEach(clearTimeout);
      if (lenis) lenis.destroy();
      delete root.dataset.drawer;
    };
  }, [pathname]);
  return null;
}
