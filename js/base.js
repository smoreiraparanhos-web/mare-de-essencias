/*
 * Maré de Essências: partes comuns a todas as páginas.
 * Contato pelo WhatsApp, seleção de favoritos (guardada no navegador), cartões de produto,
 * busca rápida, menu do celular e temas por coleção.
 * Depende de js/produtos.js (carregado antes).
 */
(() => {
  'use strict';

  const D = window.MareDados;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- Contato ---------- */
  const WHATS = '5551996263127';
  const WHATS_TXT = '(51) 99626-3127';
  const waLink = (msg) => `https://wa.me/${WHATS}?text=${encodeURIComponent(msg)}`;
  const waProduto = (p) => waLink(`Olá! Vi o ${p.nome} (${p.marca}) no site da Maré de Essências e gostaria de saber o preço e a disponibilidade.`);
  const waIcon = '<svg class="wa-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.2a8.7 8.7 0 0 0-7.5 13.1L3.3 20.8l4.6-1.2A8.7 8.7 0 1 0 12 3.2Z"/><path d="M9.1 7.9c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.4.8 1.3 1.8 2.5 2.4.2.1.4.1.5-.1l.7-.8c.2-.2.3-.2.6-.1l1.6.8c.2.1.4.2.4.4 0 .4-.1 1.1-.6 1.5-.5.5-1.4.8-2.3.6-1.1-.3-2.6-.9-4-2.4-1.3-1.3-2-2.7-2.2-3.6-.2-1 .2-1.8.4-2.1Z" class="wa-phone"/></svg>';

  /* ---------- Coleções e temas ---------- */
  const plural = { Masculino: 'Masculinos', Feminino: 'Femininos', Unissex: 'Unissex', 'Árabe': 'Árabes', Nicho: 'Nicho', Teen: 'Teen' };
  const famPlural = { Fresco: 'Frescos', Floral: 'Florais', Amadeirado: 'Amadeirados', Oriental: 'Orientais' };
  const tema = (cat) => ({ Masculino: 'tema-masculino', Feminino: 'tema-feminino', Teen: 'tema-teen', 'Árabe': 'tema-arabe' }[cat] || 'tema-neutro');
  const temas = ['tema-masculino', 'tema-feminino', 'tema-teen', 'tema-arabe', 'tema-neutro'];
  const aplicarTema = (el, cat) => { el.classList.remove(...temas); el.classList.add(tema(cat)); };

  const byId = (id) => D.produtos.find((p) => p.id === Number(id));
  const comFotoPrimeiro = (a, b) => (b.foto ? 1 : 0) - (a.foto ? 1 : 0);
  const linkProduto = (p) => `perfume.html?id=${p.id}`;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- Cores e frasco ilustrado (sem foto) ---------- */
  const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const toHex = (c) => '#' + c.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
  const mix = (a, b, k) => { const A = hex(a), B = hex(b); return toHex(A.map((v, i) => v + (B[i] - v) * k)); };
  let uid = 0;
  function bottleSVG(p) {
    const u = 'b' + (++uid), L = p.liquido, C = p.tampa;
    const shapes = {
      classic: { body: '<rect x="40" y="112" width="120" height="168" rx="20"/>', neck: [84, 94, 32, 22], cap: '<rect x="66" y="40" width="68" height="58" rx="9"/>' },
      round: { body: '<circle cx="100" cy="200" r="80"/>', neck: [84, 104, 32, 20], cap: '<rect x="70" y="50" width="60" height="58" rx="28"/>' },
      tall: { body: '<rect x="58" y="92" width="84" height="188" rx="16"/>', neck: [86, 76, 28, 20], cap: '<rect x="73" y="26" width="54" height="54" rx="7"/>' },
      square: { body: '<rect x="34" y="122" width="132" height="158" rx="12"/>', neck: [84, 106, 32, 20], cap: '<rect x="70" y="58" width="60" height="52" rx="5"/>' },
      facet: { body: '<polygon points="62,112 138,112 170,150 170,244 138,280 62,280 30,244 30,150"/>', neck: [84, 96, 32, 20], cap: '<polygon points="74,40 126,40 138,70 126,100 74,100 62,70"/>' },
      drop: { body: '<path d="M100 98C64 148 36 186 36 220a64 60 0 0 0 128 0c0-34-28-72-64-122Z"/>', neck: [87, 82, 26, 22], cap: '<circle cx="100" cy="54" r="30"/>' }
    };
    const s = shapes[p.forma] || shapes.classic;
    const [nx, ny, nw, nh] = s.neck;
    return `<svg class="bottle-svg" viewBox="0 0 200 300" role="img" aria-label="Ilustração do frasco de ${esc(p.nome)}">
      <defs>
        <linearGradient id="${u}l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix(L, '#ffffff', .45)}"/><stop offset="1" stop-color="${mix(L, '#000000', .12)}"/></linearGradient>
        <linearGradient id="${u}c" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${mix(C, '#000000', .22)}"/><stop offset=".45" stop-color="${mix(C, '#ffffff', .45)}"/><stop offset="1" stop-color="${mix(C, '#000000', .12)}"/></linearGradient>
        <linearGradient id="${u}g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".35" stop-color="#fff" stop-opacity=".08"/><stop offset=".8" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".35"/></linearGradient>
        <clipPath id="${u}k">${s.body}</clipPath>
      </defs>
      <ellipse cx="100" cy="288" rx="78" ry="8" fill="#3a2a20" opacity=".14"/>
      <rect x="${nx}" y="${ny}" width="${nw}" height="${nh + 4}" fill="${mix(C, '#000000', .1)}"/>
      <g fill="url(#${u}c)">${s.cap}</g>
      <g clip-path="url(#${u}k)">
        <rect width="200" height="300" fill="url(#${u}l)"/><rect width="200" height="300" fill="url(#${u}g)"/>
        <rect x="52" y="100" width="9" height="170" rx="4.5" fill="#fff" opacity=".5"/>
      </g>
      <g fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="3">${s.body}</g>
    </svg>`;
  }

  const media = (p, eager = false) => p.foto
    ? `<img class="photo${p.alta ? ' fit' : ''}${p.zoom ? ' zoom' : ''}" src="${p.foto}" alt="Frasco de ${esc(p.nome)}, ${esc(p.marca)}" ${eager ? '' : 'loading="lazy" '}decoding="async">`
    : bottleSVG(p);
  const mediaAttrs = (p) => p.foto ? ` has-photo" style="--photo-bg:${p.fundo}` : `" style="--tint:${mix(p.liquido, '#fbf6f1', .72)}`;

  /* Resumo de notas para o cartão. */
  const notasCurtas = (p) => p.notas;

  /* ---------- Seleção (favoritos), guardada só neste navegador ---------- */
  const KEY = 'mare-selecao';
  const selected = new Set();
  try { (JSON.parse(localStorage.getItem(KEY)) || []).forEach((id) => byId(id) && selected.add(Number(id))); } catch (e) { /* sem armazenamento: seleção vale só nesta página */ }
  const salvar = () => { try { localStorage.setItem(KEY, JSON.stringify([...selected])); } catch (e) { /* ignora */ } };
  const heart = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/></svg>';

  function card(p) {
    const on = selected.has(p.id), url = linkProduto(p);
    return `<article class="product">
      <div class="product-media${mediaAttrs(p)}">
        <a class="media-link" href="${url}" tabindex="-1" aria-hidden="true">${media(p)}</a>
        <span class="chip">${p.familia}</span>
        <button class="fav" data-fav="${p.id}" aria-pressed="${on}" aria-label="${on ? 'Tirar' : 'Guardar'} ${esc(p.nome)} ${on ? 'da' : 'na'} seleção">${heart}</button>
      </div>
      <div class="product-info">
        <span class="brand">${p.marca}</span>
        <h3><a href="${url}">${p.nome}</a></h3>
        <p class="notes">${notasCurtas(p)}</p>
        <div class="product-foot">
          <span class="price">Preço sob consulta</span>
          <a class="mini-btn wa-btn" href="${waProduto(p)}" target="_blank" rel="noopener" aria-label="Consultar ${esc(p.nome)} pelo WhatsApp">${waIcon}<span>Consultar</span></a>
        </div>
      </div>
    </article>`;
  }

  function syncFavs() {
    $$('[data-fav]').forEach((b) => {
      const id = Number(b.dataset.fav), on = selected.has(id), p = byId(id);
      b.setAttribute('aria-pressed', on);
      if (b.dataset.label === 'texto') b.querySelector('span').textContent = on ? 'Na seleção' : 'Guardar na seleção';
      else if (!b.classList.contains('pick')) b.setAttribute('aria-label', `${on ? 'Tirar' : 'Guardar'} ${p.nome} ${on ? 'da' : 'na'} seleção`);
    });
    $$('.bag-count').forEach((c) => { c.textContent = selected.size; });
    const bag = $('#bag');
    if (bag) {
      bag.setAttribute('aria-label', `Minha seleção, ${selected.size} perfume${selected.size === 1 ? '' : 's'}`);
      bag.classList.remove('pop'); void bag.offsetWidth; bag.classList.add('pop');
    }
  }

  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-fav]');
    if (!b) return;
    const id = Number(b.dataset.fav);
    selected.has(id) ? selected.delete(id) : selected.add(id);
    salvar(); syncFavs();
  });

  /* ---------- Diálogo da seleção ---------- */
  function abrirSelecao() {
    const dialog = $('#selection');
    if (!dialog) return;
    const lista = [...selected].map(byId);
    $('#selected').innerHTML = lista.length
      ? lista.map((p) => `<div class="selected-item">
          <span class="sel-thumb${mediaAttrs(p)}">${media(p)}</span>
          <a href="${linkProduto(p)}"><b>${p.nome}</b><small>${p.marca}</small></a>
          <button class="link-btn" data-remove="${p.id}">Remover</button>
        </div>`).join('')
      : '<p class="empty">Sua seleção está vazia. Toque no coração de um perfume para guardar aqui.</p>';
    const enviar = $('#send-selection');
    enviar.hidden = !lista.length;
    enviar.href = waLink('Olá! Separei estes perfumes no site da Maré de Essências e gostaria de saber preço e disponibilidade:\n' + lista.map((p) => `• ${p.nome} (${p.marca})`).join('\n'));
    if (!dialog.open) dialog.showModal();
  }

  /* ---------- Busca rápida ---------- */
  function buscar(q) {
    q = q.trim().toLowerCase();
    if (!q) return [];
    return D.produtos.filter((p) => `${p.nome} ${p.marca} ${p.notas} ${p.familia} ${p.cat} ${p.sub || ''}`.toLowerCase().includes(q));
  }

  function initShell() {
    /* Menu do celular */
    const menu = $('.menu-btn'), nav = $('#nav');
    if (menu && nav) {
      menu.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        menu.setAttribute('aria-expanded', open);
        menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      });
      $$('a', nav).forEach((a) => a.addEventListener('click', () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }));
    }

    /* Cabeçalho ao rolar */
    const header = $('.header');
    const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* Busca */
    const sDialog = $('#search-dialog'), qs = $('#quick-search'), qr = $('#quick-results');
    if (sDialog) {
      const render = () => {
        const q = qs.value.trim();
        const list = q ? buscar(q).slice(0, 6) : D.maisAmados.slice(0, 4).map(byId);
        qr.innerHTML = (q ? '' : '<span class="eyebrow">Mais procurados</span>') + (list.length
          ? list.map((p) => `<a class="quick-item" href="${linkProduto(p)}"><span class="sel-thumb${mediaAttrs(p)}">${media(p)}</span><span><b>${p.nome}</b><small>${p.marca} · ${plural[p.cat]} · ${famPlural[p.familia]}</small></span></a>`).join('')
            + (q ? `<a class="quick-all" href="catalogo.html?q=${encodeURIComponent(q)}">Ver todos os resultados para “${esc(q)}” →</a>` : '')
          : '<p class="empty">Nada encontrado. Tente o nome, a marca ou uma nota, como “baunilha”.</p>');
      };
      $('#open-search').addEventListener('click', () => { sDialog.showModal(); qs.focus(); render(); });
      qs.addEventListener('input', render);
      $('.search-form').addEventListener('submit', (e) => {
        if (!qs.value.trim()) return;
        e.preventDefault();
        location.href = `catalogo.html?q=${encodeURIComponent(qs.value.trim())}`;
      });
    }

    /* Seleção */
    const dialog = $('#selection');
    if (dialog) {
      $('#selected').addEventListener('click', (e) => {
        const b = e.target.closest('[data-remove]');
        if (!b) return;
        selected.delete(Number(b.dataset.remove));
        salvar(); syncFavs(); abrirSelecao();
      });
      $$('[data-open-selection]').forEach((b) => b.addEventListener('click', abrirSelecao));
      $('#close').addEventListener('click', () => dialog.close());
    }
    [dialog, sDialog].forEach((d) => d && d.addEventListener('click', (e) => { if (e.target === d) d.close(); }));

    /* Links do WhatsApp com mensagem padrão */
    $$('[data-wa]').forEach((a) => {
      a.href = waLink(a.dataset.wa || 'Olá! Vim pelo site da Maré de Essências e gostaria de ajuda para escolher um perfume.');
      a.target = '_blank'; a.rel = 'noopener';
    });

    syncFavs();
    revelar();
  }

  /* ---------- Entradas suaves ---------- */
  function revelar() {
    const els = $$('.reveal:not(.visible)');
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('visible')); return; }
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
    }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach((e) => io.observe(e));
  }

  window.Mare = {
    ...D, $, $$, reduceMotion, byId, comFotoPrimeiro, linkProduto, esc, mix,
    WHATS_TXT, waLink, waProduto, waIcon, plural, famPlural, tema, aplicarTema,
    bottleSVG, media, mediaAttrs, card, heart, selected, syncFavs, abrirSelecao, buscar, initShell, revelar
  };
})();
