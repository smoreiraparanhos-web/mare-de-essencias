/*
 * Maré de Essências: abertura cinematográfica desenhada em canvas.
 * O scroll controla a "câmera": do céu do amanhecer, atravessa a superfície
 * do mar e desce até a areia, onde o frasco repousa sob um raio de sol.
 * Sem vídeo e sem imagens externas: tudo é desenhado aqui.
 *
 * Regras de desempenho: o loop só roda com a abertura visível, o progresso
 * exibido é suavizado (lerp) e o DOM só é escrito quando um valor muda.
 * Movimento reduzido ou ausência de canvas: quadro estático final.
 */
(() => {
  'use strict';

  const voyage = document.querySelector('.voyage');
  if (!voyage) return;

  const canvas = voyage.querySelector('canvas');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  const beats = [...voyage.querySelectorAll('.beat')];
  const gaugeDot = voyage.querySelector('.depth-dot');
  const gaugeNum = voyage.querySelector('.depth-num');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ramp = (v, a, b) => clamp((v - a) / (b - a));
  const ease = (v) => (1 - Math.cos(Math.PI * v)) / 2;

  let W = 0, H = 0, dpr = 1, mobile = false;
  let target = 0, shown = 0, time = 0, last = 0;
  let running = false, onScreen = true, isStatic = false;

  /* Janelas de cada legenda: entrada (in0..in1) e saída (out0..out1). */
  const windows = beats.map((b) => (b.dataset.w || '0,0,2,2').split(',').map(Number));
  const lastOpacity = beats.map(() => '');
  let lastDot = '', lastNum = '', lastDeep = null;

  /* Partículas criadas uma vez. */
  const rand = (a, b) => a + Math.random() * (b - a);
  const bubbles = Array.from({ length: 56 }, () => ({
    x: Math.random(), y: Math.random() * 1.3, r: rand(1.5, 6), v: rand(0.03, 0.09),
    par: rand(0.4, 1.4), f: rand(0.6, 1.6), ph: rand(0, 6.28), wob: rand(3, 12), a: rand(0.4, 1)
  }));
  const burst = Array.from({ length: 46 }, () => ({
    x: rand(0.05, 0.95), y: Math.random(), r: rand(2, 9), v: rand(0.25, 0.6), ph: rand(0, 6.28)
  }));
  const motes = Array.from({ length: 60 }, () => ({
    x: Math.random(), y: Math.random(), r: rand(0.6, 1.8), v: rand(0.004, 0.015), ph: rand(0, 6.28)
  }));

  function resize() {
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    mobile = W < 720;
    dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (isStatic || !running) draw(isStatic ? 1 : shown, time);
  }

  function readScroll() {
    const total = voyage.offsetHeight - window.innerHeight;
    if (total <= 0) { target = 0; return; }
    target = clamp(-voyage.getBoundingClientRect().top / total);
  }

  function rrect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawBottle(cx, base, h, glow, t) {
    const bodyW = h * 0.56, bodyH = h * 0.6, neckW = h * 0.17, neckH = h * 0.06;
    const capW = h * 0.3, capH = h * 0.2;
    const bodyX = cx - bodyW / 2, bodyTop = base - bodyH;

    /* brilho atrás do frasco */
    const halo = ctx.createRadialGradient(cx, bodyTop + bodyH * 0.35, 0, cx, bodyTop + bodyH * 0.35, h * 0.9);
    halo.addColorStop(0, `rgba(255,246,218,${0.32 * glow})`);
    halo.addColorStop(1, 'rgba(255,246,218,0)');
    ctx.fillStyle = halo;
    ctx.fillRect(cx - h * 0.9, bodyTop + bodyH * 0.35 - h * 0.9, h * 1.8, h * 1.8);

    /* sombra na areia */
    ctx.fillStyle = 'rgba(4,38,55,.35)';
    ctx.beginPath();
    ctx.ellipse(cx + h * 0.05, base + h * 0.012, bodyW * 0.62, h * 0.035, 0, 0, Math.PI * 2);
    ctx.fill();

    /* tampa e gargalo */
    const neckTop = bodyTop - neckH;
    ctx.fillStyle = '#c99d5c';
    ctx.fillRect(cx - neckW / 2, neckTop, neckW, neckH + 2);
    const cap = ctx.createLinearGradient(cx - capW / 2, 0, cx + capW / 2, 0);
    cap.addColorStop(0, '#9c7440');
    cap.addColorStop(0.45, '#ecd39a');
    cap.addColorStop(1, '#ad8650');
    ctx.fillStyle = cap;
    rrect(cx - capW / 2, neckTop - capH, capW, capH, h * 0.02);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,250,230,.45)';
    ctx.fillRect(cx - capW * 0.3, neckTop - capH * 0.9, capW * 0.07, capH * 0.8);

    /* vidro */
    ctx.save();
    rrect(bodyX, bodyTop, bodyW, bodyH, h * 0.07);
    ctx.clip();
    const glass = ctx.createLinearGradient(bodyX, 0, bodyX + bodyW, 0);
    glass.addColorStop(0, 'rgba(255,255,255,.55)');
    glass.addColorStop(0.2, 'rgba(205,245,242,.32)');
    glass.addColorStop(0.6, 'rgba(98,198,207,.24)');
    glass.addColorStop(0.88, 'rgba(7,80,111,.38)');
    glass.addColorStop(1, 'rgba(255,255,255,.35)');
    ctx.fillStyle = glass;
    ctx.fillRect(bodyX, bodyTop, bodyW, bodyH);

    /* líquido com superfície viva */
    const lq = bodyTop + bodyH * 0.27;
    const liquid = ctx.createLinearGradient(0, lq, 0, base);
    liquid.addColorStop(0, 'rgba(140,222,220,.78)');
    liquid.addColorStop(1, 'rgba(8,110,145,.88)');
    ctx.fillStyle = liquid;
    ctx.beginPath();
    ctx.moveTo(bodyX, base);
    for (let i = 0; i <= 12; i++) {
      const x = bodyX + (bodyW * i) / 12;
      ctx.lineTo(x, lq + Math.sin(i * 0.9 + t * 1.3) * h * 0.004);
    }
    ctx.lineTo(bodyX + bodyW, base);
    ctx.closePath();
    ctx.fill();

    /* rótulo */
    const lw = bodyW * 0.68, lh = bodyH * 0.3, ly = bodyTop + bodyH * 0.42;
    ctx.fillStyle = 'rgba(248,245,231,.94)';
    ctx.fillRect(cx - lw / 2, ly, lw, lh);
    ctx.fillStyle = '#245166';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${Math.round(h * 0.075)}px "Playfair Display", Georgia, serif`;
    ctx.fillText('MARÉ', cx, ly + lh * 0.42);
    ctx.font = `${Math.max(7, Math.round(h * 0.022))}px "DM Sans", Arial, sans-serif`;
    ctx.fillText('E S S Ê N C I A S', cx, ly + lh * 0.76);

    /* reflexos */
    ctx.fillStyle = 'rgba(255,255,255,.5)';
    rrect(bodyX + bodyW * 0.08, bodyTop + bodyH * 0.1, bodyW * 0.055, bodyH * 0.74, bodyW * 0.03);
    ctx.fill();
    ctx.restore();

    ctx.strokeStyle = 'rgba(235,255,255,.65)';
    ctx.lineWidth = Math.max(1.5, h * 0.012);
    rrect(bodyX, bodyTop, bodyW, bodyH, h * 0.07);
    ctx.stroke();
  }

  function draw(p, t) {
    if (!ctx || !W || !H) return;
    const cam = 2.2 * ease(p);
    const Y = (wy) => H * 0.62 + (wy - cam) * H;
    const sY = Y(0);
    const sunX = W * (mobile ? 0.74 : 0.7);
    const under = ramp(cam, 0.42, 0.72);

    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;

    /* mar em profundidade (coordenadas do mundo) */
    const sea = ctx.createLinearGradient(0, Y(0), 0, Y(2.6));
    sea.addColorStop(0, '#86d3d5');
    sea.addColorStop(0.12, '#3fb0c0');
    sea.addColorStop(0.36, '#0b7f9e');
    sea.addColorStop(0.7, '#07506f');
    sea.addColorStop(1, '#05304a');
    ctx.fillStyle = sea;
    ctx.fillRect(0, 0, W, H);

    /* céu do amanhecer, que vira a "janela" da superfície vista de baixo */
    if (sY > 0) {
      const sky = ctx.createLinearGradient(0, 0, 0, sY);
      sky.addColorStop(0, '#bfe1e4');
      sky.addColorStop(0.6, '#e4efe7');
      sky.addColorStop(1, '#f7e7c8');
      ctx.globalAlpha = 1 - under;
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, sY);
      if (under > 0) {
        ctx.globalAlpha = under;
        const win = ctx.createLinearGradient(0, 0, 0, sY);
        win.addColorStop(0, '#5fc0cc');
        win.addColorStop(1, '#bdeee9');
        ctx.fillStyle = win;
        ctx.fillRect(0, 0, W, sY);
      }
      /* sol */
      ctx.globalAlpha = 1 - under * 0.7;
      const sunY = sY - H * 0.16;
      const glow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, H * 0.34);
      glow.addColorStop(0, 'rgba(255,248,222,.95)');
      glow.addColorStop(0.22, 'rgba(255,238,198,.38)');
      glow.addColorStop(1, 'rgba(255,238,198,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(sunX - H * 0.4, sunY - H * 0.4, H * 0.8, H * 0.8);
      ctx.fillStyle = '#fff8e4';
      ctx.beginPath();
      ctx.arc(sunX, sunY, H * 0.05, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    /* superfície vista de cima: ondas em perspectiva e reflexo do sol */
    if (sY < H && under < 1) {
      const above = 1 - ramp(under, 0, 0.45);
      ctx.lineWidth = 1;
      for (let k = 1; k <= 16; k++) {
        const f = k / 16;
        const y = sY + Math.pow(f, 1.9) * H * 0.9;
        if (y > H + 10) break;
        ctx.strokeStyle = `rgba(255,255,255,${(0.06 + 0.22 * f) * above})`;
        ctx.beginPath();
        const amp = 0.8 + f * 5, len = 30 + f * 170, sp = 0.5 + f;
        for (let x = 0; x <= W; x += 8) {
          const yy = y + Math.sin(x / len + t * sp + k) * amp;
          x ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy);
        }
        ctx.stroke();
      }
      for (let i = 0; i < 20; i++) {
        const y = sY + 3 + i * i * H * 0.0011;
        const w = (8 + i * 7) * (0.55 + 0.45 * Math.sin(t * 2.2 + i * 1.7));
        ctx.fillStyle = `rgba(255,246,218,${0.55 * (1 - i / 20) * above})`;
        ctx.fillRect(sunX - w / 2 + Math.sin(t + i) * 4, y, w, 1.6);
      }
      ctx.fillStyle = `rgba(255,252,240,${0.6 * above})`;
      ctx.fillRect(0, sY - 0.5, W, 1.2);
    }

    /* superfície vista de baixo: linha de luz ondulante */
    if (under > 0 && sY > -H * 0.1) {
      ctx.strokeStyle = `rgba(235,255,250,${0.7 * under})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x <= W; x += 6) {
        const yy = sY + Math.sin(x / 60 + t * 1.6) * 3 + Math.sin(x / 23 - t * 2.1) * 1.5;
        x ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy);
      }
      ctx.stroke();
    }

    ctx.globalCompositeOperation = 'lighter';

    /* raios de luz atravessando a água */
    if (under > 0) {
      const top = Math.max(sY, -10);
      const fade = 1 - ramp(cam, 1.7, 2.3) * 0.45;
      for (let i = 0; i < 7; i++) {
        const o = i - 3;
        const x0 = sunX + o * W * 0.028 + Math.sin(t * 0.35 + i) * W * 0.012;
        const x1 = x0 + o * W * 0.07 - W * 0.03;
        const w0 = W * 0.006, w1 = W * (0.035 + (i % 3) * 0.012);
        const g = ctx.createLinearGradient(0, top, 0, H);
        const a = (0.07 + 0.05 * Math.sin(t * 0.8 + i * 2)) * under * fade;
        g.addColorStop(0, `rgba(220,252,245,${a * 1.6})`);
        g.addColorStop(1, 'rgba(220,252,245,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(x0 - w0, top);
        ctx.lineTo(x0 + w0, top);
        ctx.lineTo(x1 + w1, H);
        ctx.lineTo(x1 - w1, H);
        ctx.closePath();
        ctx.fill();
      }
    }

    /* partículas suspensas */
    if (under > 0) {
      for (const m of motes) {
        const y = ((m.y - t * m.v) % 1 + 1) % 1 * H;
        if (y < sY) continue;
        const x = (m.x * W + Math.sin(t * 0.4 + m.ph) * 10);
        ctx.fillStyle = `rgba(210,245,240,${0.35 * under})`;
        ctx.fillRect(x, y, m.r, m.r);
      }
    }
    ctx.globalCompositeOperation = 'source-over';

    /* bolhas: as de sempre e a explosão na travessia da superfície */
    const drawBubble = (x, y, r, a) => {
      ctx.strokeStyle = `rgba(230,255,255,${a})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = `rgba(255,255,255,${a * 0.8})`;
      ctx.fillRect(x - r * 0.4, y - r * 0.45, Math.max(1, r * 0.3), Math.max(1, r * 0.3));
    };
    const scale = Math.max(0.7, H / 900);
    if (under > 0) {
      for (const b of bubbles) {
        const y = ((((b.y - t * b.v - p * b.par * 2) % 1.3) + 1.3) % 1.3 - 0.15) * H;
        if (y < sY + 6) continue;
        const x = b.x * W + Math.sin(t * b.f + b.ph) * b.wob;
        drawBubble(x, y, b.r * scale, 0.42 * under * b.a);
      }
    }
    const crossing = ramp(p, 0.27, 0.33) * (1 - ramp(p, 0.4, 0.46));
    if (crossing > 0) {
      for (const b of burst) {
        const y = (((b.y - t * b.v) % 1) + 1) % 1 * H;
        if (y < sY + 4) continue;
        drawBubble(b.x * W + Math.sin(t * 2 + b.ph) * 6, y, b.r * scale, 0.55 * crossing);
      }
    }

    /* fundo de areia e o frasco */
    const floorWorld = mobile ? 2.45 : 2.4;
    const fY = Y(floorWorld);
    if (fY < H + 40) {
      const back = ctx.createLinearGradient(0, fY - H * 0.05, 0, H);
      back.addColorStop(0, '#5f8f92');
      back.addColorStop(1, '#2f5f6d');
      ctx.fillStyle = back;
      ctx.beginPath();
      ctx.moveTo(0, fY - H * 0.02);
      ctx.bezierCurveTo(W * 0.25, fY - H * 0.07, W * 0.45, fY + H * 0.01, W * 0.7, fY - H * 0.05);
      ctx.bezierCurveTo(W * 0.85, fY - H * 0.08, W * 0.95, fY - H * 0.03, W, fY - H * 0.04);
      ctx.lineTo(W, H);
      ctx.lineTo(0, H);
      ctx.closePath();
      ctx.fill();

      const sand = ctx.createLinearGradient(0, fY, 0, H);
      sand.addColorStop(0, '#c7bf9f');
      sand.addColorStop(1, '#7c9590');
      ctx.fillStyle = sand;
      ctx.beginPath();
      ctx.moveTo(0, fY + H * 0.03);
      ctx.bezierCurveTo(W * 0.3, fY - H * 0.01, W * 0.55, fY + H * 0.04, W, fY);
      ctx.lineTo(W, H);
      ctx.lineTo(0, H);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = 'rgba(7,80,111,.28)';
      ctx.fill();

      const bx = mobile ? W * 0.5 : W * 0.7;
      const settle = ramp(p, 0.8, 1);

      /* luz do sol pousando na areia */
      ctx.globalCompositeOperation = 'lighter';
      const pool = ctx.createRadialGradient(bx, fY + H * 0.02, 0, bx, fY + H * 0.02, W * 0.22);
      pool.addColorStop(0, `rgba(255,246,214,${0.3 * settle + 0.08})`);
      pool.addColorStop(1, 'rgba(255,246,214,0)');
      ctx.fillStyle = pool;
      ctx.fillRect(bx - W * 0.22, fY + H * 0.02 - W * 0.22, W * 0.44, W * 0.44);
      if (settle > 0) {
        const beam = ctx.createLinearGradient(0, 0, 0, fY + H * 0.05);
        beam.addColorStop(0, 'rgba(255,248,225,0)');
        beam.addColorStop(0.8, `rgba(255,248,225,${0.14 * settle})`);
        beam.addColorStop(1, 'rgba(255,248,225,0)');
        ctx.fillStyle = beam;
        ctx.beginPath();
        ctx.moveTo(bx - W * 0.02 + W * 0.05, 0);
        ctx.lineTo(bx + W * 0.03 + W * 0.05, 0);
        ctx.lineTo(bx + W * 0.11, fY + H * 0.05);
        ctx.lineTo(bx - W * 0.11, fY + H * 0.05);
        ctx.closePath();
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';

      const bh = mobile ? Math.min(H * 0.3, W * 0.62) : Math.min(H * 0.42, W * 0.3);
      drawBottle(bx, fY + H * 0.012, bh, 0.4 + settle * 0.6, t);
    }

    /* vinheta da profundidade */
    const deep = ramp(cam, 0.9, 2);
    if (deep > 0) {
      const v = ctx.createRadialGradient(W / 2, H * 0.55, Math.min(W, H) * 0.3, W / 2, H * 0.55, Math.max(W, H) * 0.8);
      v.addColorStop(0, 'rgba(3,30,46,0)');
      v.addColorStop(1, `rgba(3,30,46,${0.45 * deep})`);
      ctx.fillStyle = v;
      ctx.fillRect(0, 0, W, H);
    }
  }

  function updateText(p) {
    beats.forEach((b, i) => {
      const [a, c, d, e] = windows[i];
      const o = ramp(p, a, c) * (1 - ramp(p, d, e));
      const s = o.toFixed(3);
      if (s !== lastOpacity[i]) {
        lastOpacity[i] = s;
        b.style.setProperty('--o', s);
        b.style.visibility = o > 0.002 ? 'visible' : 'hidden';
        b.classList.toggle('is-active', o > 0.5);
      }
    });
    const deep = p > 0.3;
    if (deep !== lastDeep) { lastDeep = deep; voyage.classList.toggle('is-deep', deep); }
    if (gaugeDot) {
      const dot = (p * 100).toFixed(1);
      if (dot !== lastDot) { lastDot = dot; gaugeDot.style.setProperty('--d', dot + '%'); }
      const n = String(Math.min(4, 1 + Math.floor(p * 4 - 0.0001)) || 1).padStart(2, '0');
      if (n !== lastNum && gaugeNum) { lastNum = n; gaugeNum.textContent = n; }
    }
  }

  function frame(now) {
    if (!running) return;
    const dt = Math.min(50, now - (last || now));
    last = now;
    time += dt / 1000;
    shown += (target - shown) * Math.min(1, (dt / 1000) * 6);
    if (Math.abs(target - shown) < 0.0004) shown = target;
    draw(shown, time);
    updateText(shown);
    requestAnimationFrame(frame);
  }

  function start() {
    if (running || isStatic || !onScreen) return;
    running = true;
    last = 0;
    requestAnimationFrame(frame);
  }
  function stop() { running = false; }

  function setMode() {
    isStatic = reduce.matches || !ctx;
    voyage.classList.toggle('is-static', isStatic);
    if (isStatic) {
      stop();
      beats.forEach((b) => { b.style.removeProperty('--o'); b.style.visibility = ''; });
      if (ctx) { resize(); draw(1, 0); }
    } else {
      resize();
      readScroll();
      shown = target;
      updateText(shown);
      start();
    }
  }

  if (!ctx) { voyage.classList.add('is-static'); return; }

  window.addEventListener('scroll', readScroll, { passive: true });
  window.addEventListener('resize', () => { resize(); readScroll(); }, { passive: true });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      onScreen = entries[0].isIntersecting;
      onScreen ? start() : stop();
    }).observe(voyage);
  }
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  reduce.addEventListener ? reduce.addEventListener('change', setMode) : reduce.addListener(setMode);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (!running) draw(isStatic ? 1 : shown, time); });

  setMode();
})();

/* Momento interativo: "Qual maré combina com você?" */
(() => {
  'use strict';
  const root = document.querySelector('.tide');
  if (!root) return;
  const range = root.querySelector('#tide-range');
  const name = root.querySelector('.tide-name');
  const text = root.querySelector('.tide-text');
  const go = root.querySelector('.tide-go');
  const tides = [
    { family: 'Fresco', label: 'Brisa', color: '#8fd8d7', deep: '#3aa9b5', text: 'Cítricos, notas marinhas e verdes. Para dias claros e pele leve.', cta: 'VER FRAGRÂNCIAS FRESCAS' },
    { family: 'Floral', label: 'Jardim', color: '#efc6c7', deep: '#c98a95', text: 'Jasmim, flor de laranjeira e rosa. Delicadeza que fica por perto.', cta: 'VER FRAGRÂNCIAS FLORAIS' },
    { family: 'Amadeirado', label: 'Profundidade', color: '#a9bfa6', deep: '#5d7a6d', text: 'Cedro, vetiver e sândalo. Presença calma, sem pressa.', cta: 'VER FRAGRÂNCIAS AMADEIRADAS' },
    { family: 'Oriental', label: 'Âmbar', color: '#e3bf8e', deep: '#a8714a', text: 'Âmbar, baunilha e especiarias. Calor que abraça à noite.', cta: 'VER FRAGRÂNCIAS ORIENTAIS' }
  ];

  function update() {
    const v = Number(range.value);
    const tide = tides[Math.min(3, Math.round(v / 100 * 3))];
    root.style.setProperty('--level', (30 + v * 0.55).toFixed(1) + '%');
    root.style.setProperty('--tide', tide.color);
    root.style.setProperty('--tide-deep', tide.deep);
    if (name.dataset.family !== tide.family) {
      name.dataset.family = tide.family;
      name.textContent = tide.label;
      text.textContent = tide.text;
      go.textContent = tide.cta + ' ↗';
      range.setAttribute('aria-valuetext', `${tide.label}, família ${tide.family}`);
      root.classList.remove('tide-swap');
      void root.offsetWidth;
      root.classList.add('tide-swap');
    }
    go.dataset.family = tide.family;
  }

  range.addEventListener('input', update);
  go.addEventListener('click', () => {
    const select = document.querySelector('#family');
    if (!select) return;
    select.value = go.dataset.family;
    select.dispatchEvent(new Event('change'));
  });
  update();
})();
