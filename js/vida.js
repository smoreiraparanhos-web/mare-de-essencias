/*
 * Maré de Essências: camada de movimento.
 * Poeira dourada e névoa no banner, parallax pelo mouse e pelo scroll, títulos
 * palavra por palavra, cartões com inclinação 3D, luz que segue o mouse no Top 5,
 * barra de progresso e arrastar para rolar o trilho.
 * Tudo desliga com "reduzir movimento"; efeitos de mouse só onde há mouse.
 */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const calm = () => reduce.matches;

  /* ---------- Títulos palavra por palavra ---------- */
  function splitWords(el) {
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const parts = n.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const w = document.createElement('span');
            w.className = 'w';
            const inner = document.createElement('span');
            inner.textContent = part;
            w.appendChild(inner);
            frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    };
    walk(el);
    $$('.w > span', el).forEach((s, i) => s.style.setProperty('--i', i));
    el.classList.add('split');
  }
  $$('.section-head h2, .tide h2, .story-copy h2, .final h2').forEach(splitWords);

  /* ---------- Barra de progresso e parallax de scroll ---------- */
  const bar = $('.progress');
  const layers = [
    ...$$('.family-arch svg').map((el) => ({ el, k: -0.06 })),
    ...$$('.story-bottle').map((el) => ({ el, k: -0.1 })),
    ...$$('.tide-glass').map((el) => ({ el, k: -0.05 })),
    ...$$('.story-ring').map((el) => ({ el, k: 0.12 })),
    ...$$('.top-media').map((el, i) => ({ el, k: i % 2 ? -0.05 : 0.05 }))
  ];
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const h = document.documentElement.scrollHeight - innerHeight;
      if (bar) bar.style.transform = `scaleX(${h > 0 ? (scrollY / h).toFixed(4) : 0})`;
      if (calm()) return;
      const mid = innerHeight / 2;
      for (const l of layers) {
        const r = l.el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > innerHeight + 100) continue;
        const off = (r.top + r.height / 2 - mid) * l.k;
        l.el.style.translate = `0 ${off.toFixed(1)}px`;
      }
    });
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll, { passive: true });
  onScroll();

  /* ---------- Banner: poeira dourada, névoa e parallax do mouse ---------- */
  const hero = $('.hero');
  if (hero) {
    const mist = document.createElement('div');
    mist.className = 'hero-mist';
    mist.setAttribute('aria-hidden', 'true');
    mist.innerHTML = '<span></span><span></span><span></span>';
    hero.prepend(mist);

    const cv = document.createElement('canvas');
    cv.className = 'hero-dust';
    cv.setAttribute('aria-hidden', 'true');
    hero.prepend(cv);
    const ctx = cv.getContext && cv.getContext('2d');
    const motes = Array.from({ length: 70 }, () => ({
      x: Math.random(), y: Math.random(), r: 0.6 + Math.random() * 1.8,
      v: 0.006 + Math.random() * 0.02, ph: Math.random() * 6.28, sw: 8 + Math.random() * 22
    }));
    let W = 0, H = 0, run = false, vis = true, t0 = 0;
    const size = () => {
      const d = Math.min(devicePixelRatio || 1, 2);
      W = hero.clientWidth; H = hero.clientHeight;
      cv.width = W * d; cv.height = H * d;
      if (ctx) ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    const draw = (now) => {
      if (!run) return;
      const t = now / 1000;
      ctx.clearRect(0, 0, W, H);
      for (const m of motes) {
        const y = ((m.y - t * m.v) % 1 + 1) % 1 * H;
        const x = m.x * W + Math.sin(t * 0.5 + m.ph) * m.sw;
        const a = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(t * 1.6 + m.ph * 3));
        ctx.fillStyle = `rgba(232, 205, 150, ${a.toFixed(3)})`;
        ctx.beginPath(); ctx.arc(x, y, m.r, 0, 6.283); ctx.fill();
      }
      requestAnimationFrame(draw);
    };
    const start = () => { if (!ctx || run || !vis || calm() || document.hidden) return; run = true; requestAnimationFrame(draw); };
    const stop = () => { run = false; };
    if (ctx) {
      size();
      addEventListener('resize', size, { passive: true });
      new IntersectionObserver((e) => { vis = e[0].isIntersecting; vis ? start() : stop(); }).observe(hero);
      document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
      reduce.addEventListener && reduce.addEventListener('change', () => { if (calm()) { stop(); ctx.clearRect(0, 0, W, H); } else start(); });
      start();
    }

    /* parallax pelo mouse */
    let px = 0, py = 0, tx = 0, ty = 0, raf = 0;
    const ease = () => {
      px += (tx - px) * 0.08; py += (ty - py) * 0.08;
      hero.style.setProperty('--px', px.toFixed(3));
      hero.style.setProperty('--py', py.toFixed(3));
      raf = Math.abs(tx - px) + Math.abs(ty - py) > 0.002 ? requestAnimationFrame(ease) : 0;
    };
    hero.addEventListener('pointermove', (e) => {
      if (!finePointer.matches || calm()) return;
      const r = hero.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(ease);
    });
    hero.addEventListener('pointerleave', () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(ease); });

    /* borrifada ao trocar de destaque */
    const slidesObs = new MutationObserver((muts) => {
      muts.forEach((m) => {
        if (m.target.classList.contains('is-current')) {
          const art = $('.slide-art', m.target);
          if (!art) return;
          art.classList.remove('spray'); void art.offsetWidth; art.classList.add('spray');
        }
      });
    });
    $$('.slide').forEach((s) => slidesObs.observe(s, { attributes: true, attributeFilter: ['class'] }));
    const first = $('.slide.is-current .slide-art');
    if (first) first.classList.add('spray');
  }

  /* ---------- Cartões com inclinação 3D ---------- */
  document.addEventListener('pointermove', (e) => {
    if (!finePointer.matches || calm()) return;
    const card = e.target.closest && e.target.closest('.product, .top-card');
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.setProperty('--ry', (x * 10).toFixed(2) + 'deg');
    card.style.setProperty('--rx', (-y * 8).toFixed(2) + 'deg');
    card.style.setProperty('--gx', ((x + 0.5) * 100).toFixed(1) + '%');
    card.style.setProperty('--gy', ((y + 0.5) * 100).toFixed(1) + '%');
  }, { passive: true });
  document.addEventListener('pointerout', (e) => {
    const card = e.target.closest && e.target.closest('.product, .top-card');
    if (card && !card.contains(e.relatedTarget)) { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); }
  });

  /* ---------- Luz que segue o mouse no Top 5 ---------- */
  const top5 = $('.top5');
  if (top5) top5.addEventListener('pointermove', (e) => {
    if (!finePointer.matches || calm()) return;
    const r = top5.getBoundingClientRect();
    top5.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    top5.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, { passive: true });

  /* ---------- Arrastar para rolar o trilho ---------- */
  $$('.rail').forEach((rail) => {
    let down = false, sx = 0, sl = 0, moved = false;
    rail.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = false; sx = e.clientX; sl = rail.scrollLeft;
      rail.classList.add('dragging');
    });
    addEventListener('pointermove', (e) => {
      if (!down) return;
      const dx = e.clientX - sx;
      if (Math.abs(dx) > 4) moved = true;
      rail.scrollLeft = sl - dx;
    });
    addEventListener('pointerup', () => { if (!down) return; down = false; rail.classList.remove('dragging'); });
    rail.addEventListener('click', (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
  });
})();
