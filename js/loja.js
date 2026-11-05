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
    P(13, 'Sauvage Eau de Parfum', 'Dior', 'Masculino', 'Fresco', 'Bergamota · Lavanda · Baunilha', 'classic', '#7393b5', '#3b4656'),
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
    P(33, 'Y', 'Yves Saint Laurent', 'Masculino', 'Fresco', 'Maçã · Sálvia · Fava tonka', 'tall', '#9fb7d0', '#2f3440'),

    /* Perfumes das fotos enviadas pela loja. Notas e famílias das marcas nacionais a confirmar. */
    P(34, 'Phantom', 'Paco Rabanne', 'Masculino', 'Fresco', 'Lavanda · Limão · Baunilha', 'square', '#2b2b2f', '#1c1c1f'),
    P(35, 'Scandal', 'Jean Paul Gaultier', 'Feminino', 'Oriental', 'Mel · Gardênia · Patchouli', 'round', '#ef9a94', '#d9d4cc'),
    P(36, 'Sì', 'Giorgio Armani', 'Feminino', 'Floral', 'Cassis · Rosa · Baunilha', 'classic', '#f2c9a8', '#1c1c1f'),
    P(37, 'Paradoxe', 'Prada', 'Feminino', 'Floral', 'Néroli · Âmbar · Almíscar', 'facet', '#f4b8ad', '#1c1c1f'),
    P(38, 'Homem Sagaz', 'Natura', 'Masculino', 'Amadeirado', 'Notas em breve', 'classic', '#6e0f1c', '#8a8d92'),
    P(39, 'Bright Crystal', 'Versace', 'Feminino', 'Floral', 'Romã · Peônia · Almíscar', 'square', '#f3b6cd', '#e9eef2'),
    P(40, 'Botica 214 Verano en Firenze', 'O Boticário', 'Unissex', 'Fresco', 'Notas em breve', 'classic', '#1e1e20', '#1c1c1f'),
    P(41, 'Alien', 'Mugler', 'Feminino', 'Amadeirado', 'Jasmim · Madeiras · Âmbar', 'facet', '#6a1b9a', '#c9a26b'),
    P(42, 'For Her Eau de Parfum', 'Narciso Rodriguez', 'Feminino', 'Floral', 'Rosa · Pêssego · Almíscar', 'square', '#f2cfd0', '#f2cfd0'),
    P(43, 'Club 6 Intenso', 'Eudora', 'Masculino', 'Amadeirado', 'Notas em breve', 'classic', '#2a2a2a', '#c0c4c9'),
    P(44, 'Homem Cor.agio', 'Natura', 'Masculino', 'Amadeirado', 'Notas em breve', 'square', '#4a4a4e', '#1c1c1f'),
    P(45, 'Invictus Victory', 'Paco Rabanne', 'Masculino', 'Oriental', 'Lavanda · Baunilha · Âmbar', 'round', '#1c1c1f', '#1c1c1f'),
    P(46, 'Impression In Black', 'Eudora', 'Masculino', 'Amadeirado', 'Notas em breve', 'tall', '#1e1e20', '#1c1c1f'),
    P(47, "L'Interdit", 'Givenchy', 'Feminino', 'Floral', 'Flor de laranjeira · Jasmim · Patchouli', 'round', '#f3c9a8', '#1c1c1f'),
    P(48, 'Club 6 Exclusive', 'Eudora', 'Masculino', 'Oriental', 'Notas em breve', 'classic', '#a8741e', '#c9a26b'),
    P(49, 'Malbec Magnetic', 'O Boticário', 'Masculino', 'Amadeirado', 'Notas em breve', 'tall', '#c0c4c9', '#1c1c1f'),
    P(50, 'Clash', 'O Boticário', 'Masculino', 'Fresco', 'Notas em breve', 'tall', '#8fc3d6', '#c0c4c9'),
    P(51, 'The Blend', 'O Boticário', 'Masculino', 'Amadeirado', 'Notas em breve', 'square', '#3a2a1e', '#a8743c'),
    P(52, 'Attar Al Wesal', 'Al Wataniah', 'Árabe', 'Oriental', 'Notas em breve', 'square', '#1c1c1f', '#c0c4c9'),
    P(53, 'Hawas for Him', 'Rasasi', 'Árabe', 'Fresco', 'Maçã · Bergamota · Âmbar', 'round', '#8f86c9', '#8a8d92'),
    P(54, 'Select', 'Mercedes-Benz', 'Masculino', 'Amadeirado', 'Notas em breve', 'tall', '#e9eef2', '#1c1c1f'),
    P(55, 'Individuel', 'Montblanc', 'Masculino', 'Oriental', 'Notas em breve', 'classic', '#b8c4cc', '#8a8d92'),
    P(56, 'Starwalker', 'Montblanc', 'Masculino', 'Fresco', 'Notas em breve', 'tall', '#eef1f2', '#8a8d92'),
    P(57, 'Voyage', 'Nautica', 'Masculino', 'Fresco', 'Maçã verde · Notas aquáticas · Almíscar', 'round', '#8fc3e6', '#c0c4c9'),
    P(58, 'Homme Sport', 'Stella Dustin', 'Masculino', 'Fresco', 'Notas em breve', 'tall', '#e8d9a8', '#8a8d92')
  ];

  /* Fotos reais: id -> [arquivo, cor do fundo da foto]. */
  const fotos = {
    1: ['la-vie-est-belle.webp', '#f7f1ec'],
    2: ['good-girl.webp', '#faf5ef'],
    3: ['jadore.webp', '#f5eee8'],
    4: ['coco-mademoiselle.webp', '#f5efea'],
    5: ['libre.webp', '#f6efe9'],
    11: ['light-blue.webp', '#f7f3ee'],
    12: ['gucci-bloom.webp', '#faf5ef'],
    13: ['sauvage-edp.webp', '#e2dcd5'],
    34: ['phantom.webp', '#e7e0d8'],
    35: ['scandal.webp', '#f4eee8'],
    36: ['si.webp', '#f6f1e9'],
    39: ['bright-crystal.webp', '#faf5ef'],
    40: ['botica-214-verano.webp', '#e1ddda'],
    41: ['alien.webp', '#f8f1eb'],
    42: ['for-her.webp', '#f7f3f0'],
    43: ['club-6-intenso.webp', '#dcd5d0'],
    44: ['homem-coragio.webp', '#e0dbd5'],
    45: ['invictus-victory.webp', '#d9d2cc'],
    46: ['impression-in-black.webp', '#e0dcd3'],
    47: ['linterdit.webp', '#f6f0ea'],
    48: ['club-6-exclusive.webp', '#ded7d1'],
    49: ['malbec-magnetic.webp', '#e9e6e1'],
    20: ['asad.webp', '#ddd5d0'],
    50: ['clash.webp', '#dcd6ce'],
    51: ['the-blend.webp', '#e2dcd6'],
    37: ['paradoxe.webp', '#f5efeb'],
    38: ['homem-sagaz.webp', '#eae7e2'],
    52: ['attar-al-wesal.webp', '#f8f8f8'],
    53: ['hawas-for-him.webp', '#f8f8f8'],
    54: ['mercedes-benz-select.webp', '#f8f8f8'],
    55: ['montblanc-individuel.webp', '#f8f8f8'],
    56: ['montblanc-starwalker.webp', '#ffffff'],
    57: ['nautica-voyage.webp', '#f8f8f8'],
    58: ['stella-dustin-homme-sport.webp', '#f8f8f8']
  };
  Object.entries(fotos).forEach(([id, [arq, fundo]]) => {
    const p = produtos.find((x) => x.id === Number(id));
    if (p) { p.foto = 'assets/produtos/' + arq; p.fundo = fundo; }
  });
  /* Fotos mais altas que o quadro: mostradas inteiras, sem corte. */
  [20, 34, 46, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58].forEach((id) => { const p = produtos.find((x) => x.id === id); if (p) p.alta = true; });
  /* Fotos quadradas com muito espaço em volta: aproximadas para o frasco ficar em destaque. */
  [52, 53, 54, 56, 57].forEach((id) => { const p = produtos.find((x) => x.id === id); if (p) p.zoom = true; });
  /* Produtos com foto aparecem primeiro nas listas. */
  const comFotoPrimeiro = (a, b) => (b.foto ? 1 : 0) - (a.foto ? 1 : 0);
  const byId = (id) => produtos.find((p) => p.id === Number(id));
  const maisAmados = [13, 1, 45, 2, 4, 34, 3, 47, 43, 41];
  const top5 = [13, 1, 45, 4, 2];

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
    ? `<span class="photo-fill" aria-hidden="true" style="background-image:url(${p.foto})"></span><img class="photo${p.alta ? ' fit' : ''}${p.zoom ? ' zoom' : ''}" src="${p.foto}" alt="Frasco de ${p.nome}, ${p.marca}" loading="lazy" decoding="async">`
    : bottleSVG(p);
  const mediaStyle = (p) => p.foto ? ` has-photo" style="--photo-bg:${p.fundo}` : '';

  /* ---------- Seleção (favoritos) ---------- */
  const selected = new Set();
  const heart = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/></svg>';

  function card(p) {
    const on = selected.has(p.id);
    return `<article class="product" data-family="${p.familia}" style="--tint:${mix(p.liquido, '#fbf6f1', .72)}">
      <div class="product-media${mediaStyle(p)}"><span class="mist" aria-hidden="true"><i></i><i></i><i></i></span>${media(p)}
        <span class="chip">${p.familia}</span>
        <button class="fav" data-fav="${p.id}" aria-pressed="${on}" aria-label="${on ? 'Tirar' : 'Guardar'} ${p.nome} ${on ? 'da' : 'na'} seleção">${heart}</button>
      </div>
      <div class="product-info">
        <span class="brand">${p.marca}</span>
        <h3>${p.nome}</h3>
        <p class="notes">${p.notas}</p>
        <p class="meta">${p.familia} · ${p.cat}</p>
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

  /* ---------- Molduras com foto de produto (banner e seções editoriais) ---------- */
  $$('[data-frame]').forEach((el) => {
    const p = byId(el.dataset.frame);
    if (!p || !p.foto) return;
    el.innerHTML = `<img src="${p.foto}" alt="Frasco de ${p.nome}, ${p.marca}" decoding="async"${el.dataset.eager ? '' : ' loading="lazy"'}>
      <figcaption><span class="brand">${p.marca}</span><b>${p.nome}</b></figcaption>`;
  });

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
      <div class="top-media${mediaStyle(p)}">${media(p)}</div>
      <span class="brand">${p.marca}</span>
      <h3>${p.nome}</h3>
      <p class="top-notes">${p.notas}</p>
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
    const list = produtos.filter((p) => p.cat === cat).sort(comFotoPrimeiro).slice(0, 8);
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
      (!catSel.value || p.cat === catSel.value)).sort(comFotoPrimeiro);
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
