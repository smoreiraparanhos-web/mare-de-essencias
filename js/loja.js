/*
 * Maré de Essências: vitrine, carrossel, coleções, catálogo, seletor de maré e seleção.
 * Protótipo sem vendas: nenhum preço ou estoque é exibido.
 *
 * Para usar fotos reais: preencha o campo `foto` do produto com o caminho da imagem
 * (ex.: 'assets/produtos/sauvage.webp'). Sem foto, o card mostra uma ilustração.
 */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- Produtos (nomes reais; notas principais; sem preço) ---------- */
  const P = (id, nome, marca, cat, familia, notas, forma, liquido, tampa, foto = '') =>
    ({ id, nome, marca, cat, familia, notas, forma, liquido, tampa, foto });

  const produtos = [
    P(1, 'La Vie Est Belle', 'Lancôme', 'Feminino', 'Oriental', 'Íris · Praliné · Baunilha', 'round', '#f2b6c0', '#f3ece6'),
    P(2, 'Good Girl', 'Carolina Herrera', 'Feminino', 'Oriental', 'Tuberosa · Cacau · Fava tonka', 'tall', '#3a3552', '#c9a26b'),
    P(3, "J'adore", 'Dior', 'Feminino', 'Floral', 'Ylang-ylang · Rosa · Jasmim', 'drop', '#f1d48a', '#c9a26b'),
    P(4, 'Coco Mademoiselle', 'Chanel', 'Feminino', 'Floral', 'Laranja · Rosa · Patchouli', 'square', '#f0c9a8', '#efe7dd'),
    P(5, 'Libre', 'Yves Saint Laurent', 'Feminino', 'Floral', 'Lavanda · Flor de laranjeira · Baunilha', 'classic', '#f3dcc2', '#c9a26b'),
    P(6, 'Olympéa', 'Paco Rabanne', 'Feminino', 'Oriental', "Flor de sal · Baunilha · Jasmim d'água", 'facet', '#f6e3c4', '#d6b37a'),
    P(7, 'Yara', 'Lattafa', 'Árabe', 'Floral', 'Orquídea · Heliotrópio · Baunilha', 'round', '#f3bfce', '#dba6b1'),
    P(8, 'Cloud', 'Ariana Grande', 'Feminino', 'Oriental', 'Lavanda · Coco · Praliné', 'drop', '#cfc6ea', '#efeaf7'),
    P(9, 'Delina', 'Parfums de Marly', 'Nicho', 'Floral', 'Rosa · Lichia · Ruibarbo', 'classic', '#f4c3cf', '#c9a26b'),
    P(10, 'Baccarat Rouge 540', 'Maison Francis Kurkdjian', 'Nicho', 'Amadeirado', 'Jasmim · Açafrão · Âmbar · Cedro', 'facet', '#e9a08f', '#c9a26b'),
    P(11, 'Light Blue', 'Dolce&Gabbana', 'Feminino', 'Fresco', 'Limão-siciliano · Maçã · Cedro', 'tall', '#bfe0ee', '#dfe6ec'),
    P(12, 'Bloom', 'Gucci', 'Feminino', 'Floral', 'Tuberosa · Jasmim', 'classic', '#f2c6c9', '#e7b9bd'),
    P(13, 'Sauvage', 'Dior', 'Masculino', 'Fresco', 'Bergamota · Pimenta · Ambroxan', 'classic', '#7393b5', '#3b4656'),
    P(14, 'Bleu de Chanel', 'Chanel', 'Masculino', 'Amadeirado', 'Cítricos · Incenso · Cedro', 'square', '#41608c', '#2f3440'),
    P(15, '1 Million', 'Paco Rabanne', 'Masculino', 'Oriental', 'Tangerina · Canela · Couro', 'square', '#e2c06d', '#c9a26b'),
    P(16, 'Le Male Elixir', 'Jean Paul Gaultier', 'Masculino', 'Oriental', 'Lavanda · Fava tonka · Mel', 'tall', '#e3b86a', '#c9a26b'),
    P(17, 'Acqua di Giò', 'Giorgio Armani', 'Masculino', 'Fresco', 'Notas marinhas · Bergamota · Alecrim', 'drop', '#d4ecef', '#e9eef2'),
    P(18, 'The Most Wanted', 'Azzaro', 'Masculino', 'Oriental', 'Cardamomo · Caramelo · Âmbar', 'round', '#8d2f3a', '#2f3440'),
    P(19, 'Khamrah', 'Lattafa', 'Árabe', 'Oriental', 'Canela · Tâmara · Praliné', 'facet', '#b0643a', '#c9a26b'),
    P(20, 'Asad', 'Lattafa', 'Árabe', 'Oriental', 'Pimenta-preta · Tabaco · Baunilha', 'square', '#4a3a2e', '#c9a26b'),
    P(21, 'Club de Nuit Intense Man', 'Armaf', 'Árabe', 'Amadeirado', 'Limão · Abacaxi · Bétula', 'tall', '#3c3c44', '#c0c4c9'),
    P(22, 'Amber Oud Gold Edition', 'Al Haramain', 'Árabe', 'Amadeirado', 'Bergamota · Âmbar · Almíscar', 'facet', '#d9b36a', '#c9a26b'),
    P(23, 'Aventus', 'Creed', 'Nicho', 'Fresco', 'Abacaxi · Bétula · Almíscar', 'classic', '#dfe7ee', '#3a3a40'),
    P(24, 'Santal 33', 'Le Labo', 'Nicho', 'Amadeirado', 'Sândalo · Cardamomo · Couro', 'classic', '#efe6d6', '#2f3440'),
    P(25, 'Lost Cherry', 'Tom Ford', 'Nicho', 'Oriental', 'Cereja · Amêndoa amarga · Fava tonka', 'square', '#8e1f33', '#3a2a2f'),
    P(26, 'CK One', 'Calvin Klein', 'Unissex', 'Fresco', 'Bergamota · Chá verde · Almíscar', 'tall', '#e6eee6', '#b7bcbf'),
    P(27, 'Ombré Leather', 'Tom Ford', 'Unissex', 'Amadeirado', 'Couro · Cardamomo · Jasmim', 'square', '#4a382e', '#2f3440'),
    P(28, 'Wood Sage & Sea Salt', 'Jo Malone London', 'Unissex', 'Fresco', 'Sálvia · Sal marinho · Ambreta', 'square', '#dfe3d9', '#c9c5bd'),
    P(29, 'Erba Pura', 'Xerjoff', 'Unissex', 'Oriental', 'Frutas · Âmbar · Almíscar', 'facet', '#e9c46a', '#c9a26b'),
    P(30, 'Eros', 'Versace', 'Masculino', 'Oriental', 'Hortelã · Maçã verde · Baunilha', 'classic', '#4fa3a5', '#c9a26b'),
    P(31, 'Invictus', 'Paco Rabanne', 'Masculino', 'Fresco', 'Toranja · Notas marinhas · Louro', 'facet', '#c9d6de', '#c0c4c9'),
    P(32, '212 VIP Men', 'Carolina Herrera', 'Masculino', 'Oriental', 'Gengibre · Especiarias · Âmbar', 'tall', '#5a5e66', '#c0c4c9'),
    P(33, 'Y', 'Yves Saint Laurent', 'Masculino', 'Fresco', 'Maçã · Sálvia · Fava tonka', 'tall', '#9fb7d0', '#2f3440')
  ];
  const byId = (id) => produtos.find((p) => p.id === Number(id));
  const maisAmados = [13, 1, 14, 19, 10, 30, 2, 27, 15, 7];
  const top5 = [13, 10, 19, 1, 27];

  /* ---------- Cores ---------- */
  const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const toHex = (c) => '#' + c.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
  const mix = (a, b, k) => { const A = hex(a), B = hex(b); return toHex(A.map((v, i) => v + (B[i] - v) * k)); };

  /* ---------- Frasco ilustrado em SVG ---------- */
  let uid = 0;
  function bottleSVG(p, extra = '') {
    const u = 'b' + (++uid);
    const L = p.liquido, C = p.tampa;
    const shapes = {
      classic: { body: '<rect x="40" y="112" width="120" height="168" rx="20"/>', neck: [84, 94, 32, 22], cap: '<rect x="66" y="40" width="68" height="58" rx="9"/>' },
      round:   { body: '<circle cx="100" cy="200" r="80"/>', neck: [84, 104, 32, 20], cap: '<rect x="70" y="50" width="60" height="58" rx="28"/>' },
      tall:    { body: '<rect x="58" y="92" width="84" height="188" rx="16"/>', neck: [86, 76, 28, 20], cap: '<rect x="73" y="26" width="54" height="54" rx="7"/>' },
      square:  { body: '<rect x="34" y="122" width="132" height="158" rx="12"/>', neck: [84, 106, 32, 20], cap: '<rect x="70" y="58" width="60" height="52" rx="5"/>' },
      facet:   { body: '<polygon points="62,112 138,112 170,150 170,244 138,280 62,280 30,244 30,150"/>', neck: [84, 96, 32, 20], cap: '<polygon points="74,40 126,40 138,70 126,100 74,100 62,70"/>' },
      drop:    { body: '<path d="M100 98C64 148 36 186 36 220a64 60 0 0 0 128 0c0-34-28-72-64-122Z"/>', neck: [87, 82, 26, 22], cap: '<circle cx="100" cy="54" r="30"/>' }
    };
    const s = shapes[p.forma] || shapes.classic;
    const [nx, ny, nw, nh] = s.neck;
    const clip = s.body.replace('<', `<`);
    return `<svg class="bottle-svg" viewBox="0 0 200 300" role="img" aria-label="Ilustração do frasco de ${p.nome}" ${extra}>
      <defs>
        <linearGradient id="${u}l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix(L, '#ffffff', .45)}"/><stop offset="1" stop-color="${mix(L, '#000000', .12)}"/></linearGradient>
        <linearGradient id="${u}c" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${mix(C, '#000000', .22)}"/><stop offset=".45" stop-color="${mix(C, '#ffffff', .45)}"/><stop offset="1" stop-color="${mix(C, '#000000', .12)}"/></linearGradient>
        <linearGradient id="${u}g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".35" stop-color="#fff" stop-opacity=".08"/><stop offset=".8" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".35"/></linearGradient>
        <clipPath id="${u}k">${clip}</clipPath>
      </defs>
      <ellipse cx="100" cy="288" rx="78" ry="8" fill="#5a3b40" opacity=".14"/>
      <rect x="${nx}" y="${ny}" width="${nw}" height="${nh + 4}" fill="${mix(C, '#000000', .1)}"/>
      <g fill="url(#${u}c)">${s.cap}</g>
      <g clip-path="url(#${u}k)">
        <rect x="0" y="0" width="200" height="300" fill="url(#${u}l)"/>
        <rect x="0" y="0" width="200" height="300" fill="url(#${u}g)"/>
        <rect x="52" y="100" width="9" height="170" rx="4.5" fill="#fff" opacity=".5"/>
      </g>
      <g fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="3">${s.body}</g>
    </svg>`;
  }

  const media = (p) => p.foto
    ? `<img src="${p.foto}" alt="Frasco de ${p.nome}, ${p.marca}" loading="lazy" decoding="async">`
    : bottleSVG(p);

  /* ---------- Seleção (favoritos) ---------- */
  const selected = new Set();
  const heart = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/></svg>';

  function card(p) {
    const on = selected.has(p.id);
    return `<article class="product" data-family="${p.familia}" style="--tint:${mix(p.liquido, '#fbf6f1', .72)}">
      <div class="product-media"><span class="mist" aria-hidden="true"><i></i><i></i><i></i></span>${media(p)}
        <span class="chip">${p.familia}</span>
        <button class="fav" data-fav="${p.id}" aria-pressed="${on}" aria-label="${on ? 'Tirar' : 'Guardar'} ${p.nome} ${on ? 'da' : 'na'} seleção">${heart}</button>
      </div>
      <div class="product-info">
        <span class="brand">${p.marca}</span>
        <h3>${p.nome}</h3>
        <p class="notes">${p.notas}</p>
        <div class="product-foot">
          <span class="price">Preço sob consulta</span>
          <button class="mini-btn" data-fav="${p.id}" aria-pressed="${on}">${on ? 'Na seleção ✓' : 'Quero este'}</button>
        </div>
      </div>
    </article>`;
  }

  function syncFavs() {
    $$('[data-fav]').forEach((b) => {
      const id = Number(b.dataset.fav), on = selected.has(id), p = byId(id);
      b.setAttribute('aria-pressed', on);
      if (b.classList.contains('mini-btn')) b.textContent = on ? 'Na seleção ✓' : 'Quero este';
      else b.setAttribute('aria-label', `${on ? 'Tirar' : 'Guardar'} ${p.nome} ${on ? 'da' : 'na'} seleção`);
    });
    $('#count').textContent = selected.size;
    $('#bag').setAttribute('aria-label', `Minha seleção, ${selected.size} perfume${selected.size === 1 ? '' : 's'}`);
    $('#bag').classList.remove('pop'); void $('#bag').offsetWidth; $('#bag').classList.add('pop');
  }

  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-fav]');
    if (!b) return;
    const id = Number(b.dataset.fav);
    selected.has(id) ? selected.delete(id) : selected.add(id);
    syncFavs();
  });

  /* ---------- Banner em carrossel ---------- */
  $$('.slide-art').forEach((el) => {
    const a = byId(el.dataset.bottle), b = byId(el.dataset.bottleB);
    el.innerHTML = `<span class="halo"></span><span class="silk silk-a"></span><span class="silk silk-b"></span>
      <span class="pedestal"></span>
      <div class="hero-bottle back">${bottleSVG(b)}</div>
      <div class="hero-bottle front">${bottleSVG(a)}</div>
      <span class="sparkle" style="--x:18%;--y:24%"></span><span class="sparkle" style="--x:82%;--y:18%;--dl:-1.2s"></span><span class="sparkle" style="--x:74%;--y:70%;--dl:-2.4s"></span>
      <span class="hero-caption">${a.nome} <i>·</i> ${a.marca}</span>`;
  });

  const slides = $$('.slide'), dots = $$('.hero-dots button');
  let current = 0, timer = null;
  function go(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach((s, k) => { s.classList.toggle('is-current', k === current); s.setAttribute('aria-hidden', k !== current); s.inert = k !== current; });
    dots.forEach((d, k) => d.setAttribute('aria-selected', k === current));
    document.querySelector('.hero').dataset.theme = slides[current].dataset.theme;
  }
  function auto() { stopAuto(); if (!reduceMotion.matches) timer = setInterval(() => go(current + 1), 6500); }
  function stopAuto() { clearInterval(timer); }
  $('[data-hero="prev"]').addEventListener('click', () => { go(current - 1); auto(); });
  $('[data-hero="next"]').addEventListener('click', () => { go(current + 1); auto(); });
  dots.forEach((d, k) => d.addEventListener('click', () => { go(k); auto(); }));
  const hero = $('.hero');
  hero.addEventListener('mouseenter', stopAuto);
  hero.addEventListener('mouseleave', auto);
  hero.addEventListener('focusin', stopAuto);
  hero.addEventListener('focusout', auto);
  go(0); auto();

  /* ---------- Os mais amados ---------- */
  $('#loved-rail').innerHTML = maisAmados.map((id) => card(byId(id))).join('');
  $$('[data-rail]').forEach((b) => b.addEventListener('click', () => {
    const rail = document.getElementById(b.dataset.rail);
    rail.scrollBy({ left: Number(b.dataset.dir) * rail.clientWidth * 0.8, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  }));

  /* ---------- Top 5 ---------- */
  $('#top-grid').innerHTML = top5.map((id, i) => {
    const p = byId(id);
    return `<li class="top-card reveal" style="--d:${i * 0.07}s;--tint:${mix(p.liquido, '#fbf6f1', .7)}">
      <span class="top-num" aria-hidden="true">${i + 1}</span>
      <div class="top-media">${media(p)}</div>
      <span class="brand">${p.marca}</span>
      <h3>${p.nome}</h3>
      <button class="link-btn" data-fav="${p.id}" aria-pressed="${selected.has(p.id)}" aria-label="Guardar ${p.nome} na seleção">${heart} Guardar</button>
    </li>`;
  }).join('');

  /* ---------- Coleções em abas ---------- */
  const tabs = $$('[data-tab]'), panel = $('#tab-panel');
  function showTab(cat, focus = false) {
    tabs.forEach((t) => {
      const on = t.dataset.tab === cat;
      t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1;
      if (on) { panel.setAttribute('aria-labelledby', t.id); if (focus) t.focus(); }
    });
    const list = produtos.filter((p) => p.cat === cat).slice(0, 8);
    panel.classList.remove('swap'); void panel.offsetWidth; panel.classList.add('swap');
    panel.innerHTML = list.map(card).join('');
  }
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => showTab(t.dataset.tab));
    t.addEventListener('keydown', (e) => {
      const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (d) { e.preventDefault(); showTab(tabs[(i + d + tabs.length) % tabs.length].dataset.tab, true); }
    });
  });
  $$('[data-tab-link]').forEach((a) => a.addEventListener('click', () => showTab(a.dataset.tabLink)));
  showTab('Masculino');

  /* ---------- Catálogo completo (escondido) ---------- */
  const catalog = $('#catalogo'), openBtn = $('#open-catalog');
  const search = $('#search'), famSel = $('#family'), catSel = $('#cat-filter');
  function renderCatalog() {
    const q = search.value.trim().toLowerCase();
    const list = produtos.filter((p) =>
      (!q || `${p.nome} ${p.marca} ${p.notas}`.toLowerCase().includes(q)) &&
      (!famSel.value || p.familia === famSel.value) &&
      (!catSel.value || p.cat === catSel.value));
    $('#result-count').textContent = `${list.length} perfume${list.length === 1 ? '' : 's'}`;
    $('#products').innerHTML = list.length ? list.map(card).join('') : '<p class="empty">Nenhum perfume encontrado. Tente outra busca ou outro filtro.</p>';
  }
  function openCatalog(opts = {}) {
    if (opts.family !== undefined) famSel.value = opts.family;
    if (opts.cat !== undefined) catSel.value = opts.cat;
    if (opts.q !== undefined) search.value = opts.q;
    catalog.hidden = false;
    openBtn.setAttribute('aria-expanded', 'true');
    openBtn.textContent = 'Catálogo aberto abaixo ↓';
    renderCatalog();
    requestAnimationFrame(() => catalog.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth' }));
  }
  function closeCatalog() {
    catalog.hidden = true;
    openBtn.setAttribute('aria-expanded', 'false');
    openBtn.textContent = 'Ver catálogo completo';
    openBtn.scrollIntoView({ block: 'center' });
    openBtn.focus();
  }
  openBtn.addEventListener('click', () => (catalog.hidden ? openCatalog() : closeCatalog()));
  $('#close-catalog').addEventListener('click', closeCatalog);
  $('#footer-catalog').addEventListener('click', (e) => { e.preventDefault(); openCatalog({ family: '', cat: '', q: '' }); });
  [search, famSel, catSel].forEach((el) => el.addEventListener('input', renderCatalog));
  $$('[data-family-link]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    openCatalog({ family: a.dataset.familyLink, cat: '', q: '' });
  }));

  /* ---------- Busca rápida ---------- */
  const sDialog = $('#search-dialog'), qs = $('#quick-search'), qr = $('#quick-results');
  $('#open-search').addEventListener('click', () => { sDialog.showModal(); qs.focus(); renderQuick(); });
  function renderQuick() {
    const q = qs.value.trim().toLowerCase();
    const list = q ? produtos.filter((p) => `${p.nome} ${p.marca} ${p.notas}`.toLowerCase().includes(q)).slice(0, 6) : maisAmados.slice(0, 4).map(byId);
    qr.innerHTML = (q ? '' : '<span class="eyebrow">Mais procurados</span>') + (list.length
      ? list.map((p) => `<button class="quick-item" data-quick="${p.nome}"><span class="quick-dot" style="background:${p.liquido}"></span><span><b>${p.nome}</b><small>${p.marca} · ${p.familia}</small></span></button>`).join('')
      : '<p class="empty">Nada encontrado por aqui.</p>');
  }
  qs.addEventListener('input', renderQuick);
  qr.addEventListener('click', (e) => {
    const b = e.target.closest('[data-quick]');
    if (!b) return;
    sDialog.close();
    openCatalog({ q: b.dataset.quick, family: '', cat: '' });
  });
  $('.search-form').addEventListener('submit', () => { if (qs.value.trim()) openCatalog({ q: qs.value.trim(), family: '', cat: '' }); });

  /* ---------- Seletor de maré ---------- */
  const tide = $('#mare'), range = $('#tide-range');
  const mares = [
    { familia: 'Fresco', nome: 'Brisa', cor: '#a9cfd6', fundo: '#3d7f8f', texto: 'Cítricos, notas marinhas e verdes. Para dias claros e pele leve.', cta: 'Ver todos os frescos' },
    { familia: 'Floral', nome: 'Jardim', cor: '#e5c3bd', fundo: '#a9736b', texto: 'Jasmim, flor de laranjeira e rosa. Delicadeza que fica por perto.', cta: 'Ver todos os florais' },
    { familia: 'Amadeirado', nome: 'Profundidade', cor: '#c9ad88', fundo: '#6b4f3a', texto: 'Cedro, sândalo e vetiver. Presença calma, sem pressa.', cta: 'Ver todos os amadeirados' },
    { familia: 'Oriental', nome: 'Âmbar', cor: '#d9a866', fundo: '#8a5228', texto: 'Âmbar, baunilha e especiarias. Calor que abraça à noite.', cta: 'Ver todos os orientais' }
  ];
  let lastFam = '';
  function updateTide() {
    const v = Number(range.value);
    const m = mares[Math.min(3, Math.round((v / 100) * 3))];
    tide.style.setProperty('--level', (30 + v * 0.55).toFixed(1) + '%');
    tide.style.setProperty('--tide', m.cor);
    tide.style.setProperty('--tide-deep', m.fundo);
    range.style.setProperty('--pct', v + '%');
    if (m.familia === lastFam) return;
    lastFam = m.familia;
    $('.tide-name').textContent = m.nome;
    $('.tide-text').textContent = m.texto;
    const go = $('#tide-go');
    go.textContent = m.cta; go.dataset.familyLink = m.familia;
    range.setAttribute('aria-valuetext', `${m.nome}, família ${m.familia}`);
    $('#tide-picks').innerHTML = '<span class="picks-label">Sugestões</span>' + produtos.filter((p) => p.familia === m.familia).slice(0, 3)
      .map((p) => `<button class="pick" data-fav="${p.id}" aria-pressed="${selected.has(p.id)}"><span class="pick-dot" style="background:${p.liquido}"></span><span><b>${p.nome}</b><small>${p.marca}</small></span></button>`).join('');
    tide.classList.remove('tide-swap'); void tide.offsetWidth; tide.classList.add('tide-swap');
  }
  range.addEventListener('input', updateTide);
  updateTide();

  /* ---------- Pirâmide olfativa ---------- */
  const camadas = [
    { tempo: 'Primeiros 15 minutos', titulo: 'A primeira impressão', texto: 'É o que você sente assim que borrifa. Costumam ser notas leves e brilhantes, como limão, bergamota e frutas. Passam rápido, por isso vale esperar um pouco antes de decidir.' },
    { tempo: 'De 30 minutos a algumas horas', titulo: 'A alma do perfume', texto: 'Quando a saída vai embora, aparece o coração: flores, especiarias e frutas mais suaves. É aqui que você descobre a personalidade da fragrância.' },
    { tempo: 'O que fica até o fim do dia', titulo: 'A lembrança na pele', texto: 'As notas de fundo são as mais profundas, como baunilha, âmbar, madeiras e almíscar. São elas que fazem o seu perfume ser notado horas depois.' }
  ];
  const pyBtns = $$('.py-buttons button'), pyLayers = $$('.py-layer');
  function showLayer(i) {
    pyBtns.forEach((b, k) => b.setAttribute('aria-selected', k === i));
    pyLayers.forEach((l, k) => l.classList.toggle('on', k === i));
    $('#py-time').textContent = camadas[i].tempo;
    $('#py-title').textContent = camadas[i].titulo;
    $('#py-desc').textContent = camadas[i].texto;
    const box = $('.py-text'); box.classList.remove('swap'); void box.offsetWidth; box.classList.add('swap');
  }
  pyBtns.forEach((b) => b.addEventListener('click', () => showLayer(Number(b.dataset.layer))));
  pyLayers.forEach((l) => l.addEventListener('click', () => showLayer(Number(l.dataset.layer))));
  showLayer(0);

  /* ---------- Nossa história ---------- */
  $$('.story-bottle').forEach((el) => { el.innerHTML = bottleSVG(byId(el.dataset.bottle)); });

  /* ---------- Diálogo da seleção ---------- */
  const dialog = $('#selection');
  function openSelection() {
    $('#selected').innerHTML = selected.size
      ? [...selected].map((id) => { const p = byId(id); return `<div class="selected-item"><span class="pick-dot" style="background:${p.liquido}"></span><span><b>${p.nome}</b><small>${p.marca}</small></span><button class="link-btn" data-remove="${id}">Remover</button></div>`; }).join('')
      : '<p class="empty">Sua seleção está vazia. Toque no coração de um perfume para guardar aqui.</p>';
    dialog.showModal();
  }
  $('#selected').addEventListener('click', (e) => {
    const b = e.target.closest('[data-remove]');
    if (!b) return;
    selected.delete(Number(b.dataset.remove));
    syncFavs(); openSelection();
  });
  $('#bag').addEventListener('click', openSelection);
  $('#final-bag').addEventListener('click', openSelection);
  $('#close').addEventListener('click', () => dialog.close());
  [dialog, sDialog].forEach((d) => d.addEventListener('click', (e) => { if (e.target === d) d.close(); }));

  /* ---------- Menu do celular ---------- */
  const menu = $('.menu-btn'), nav = $('#nav');
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  $$('a', nav).forEach((a) => a.addEventListener('click', () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }));

  /* ---------- Cabeçalho ao rolar e entradas suaves ---------- */
  const header = $('.header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const reveal = () => {
    const els = $$('.reveal:not(.visible)');
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('visible')); return; }
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
    }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach((e) => io.observe(e));
  };
  reveal();
})();
