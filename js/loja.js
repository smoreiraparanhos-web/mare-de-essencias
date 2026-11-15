/*
 * Maré de Essências: página inicial.
 * Vitrines (mais amados, Top 5, coleções em abas), seletor de maré e pirâmide olfativa.
 * Dados em js/produtos.js; cartões, seleção e WhatsApp em js/base.js.
 */
(() => {
  'use strict';

  const M = window.Mare;
  const { $, $$, byId } = M;

  /* ---------- Molduras com foto de produto (banner e história) ---------- */
  $$('[data-frame]').forEach((el) => {
    const p = byId(el.dataset.frame);
    if (!p || !p.foto) return;
    el.innerHTML = `<a href="${M.linkProduto(p)}" class="frame-link"><img src="${p.foto}" alt="Frasco de ${M.esc(p.nome)}, ${M.esc(p.marca)}" decoding="async"${el.dataset.eager ? '' : ' loading="lazy"'}>
      <figcaption><span class="brand">${p.marca}</span><b>${p.nome}</b></figcaption></a>`;
  });

  /* ---------- Compre por coleção ---------- */
  const chamadas = {
    Masculino: 'Quentes, amadeirados e marcantes', Feminino: 'Florais, delicados e envolventes', Unissex: 'Para dividir, sem regras',
    'Árabe': 'Intensos, doces e duradouros', Nicho: 'Criações raras e autorais', Teen: 'Leves e divertidos'
  };
  const destaqueCol = { Masculino: 51, Feminino: 1, Unissex: 26, 'Árabe': 20, Nicho: 10 };
  $('#col-tiles').innerHTML = M.colecoes.map((cat) => {
    const n = M.produtos.filter((p) => p.cat === cat).length;
    const p = byId(destaqueCol[cat]);
    const arte = p ? `<span class="col-art${M.mediaAttrs(p)}">${M.media(p)}</span>`
      : '<span class="col-art col-art-teen" aria-hidden="true"><i></i><i></i><i></i></span>';
    return `<a class="col-tile reveal ${M.tema(cat)}" href="catalogo.html?cat=${encodeURIComponent(cat)}">
      <span class="col-copy"><span class="col-kicker">${n ? `${n} perfume${n === 1 ? '' : 's'}` : 'Em breve'}</span>
      <span class="col-name">${M.plural[cat]}</span><span class="col-desc">${chamadas[cat]}</span></span>${arte}</a>`;
  }).join('');

  /* ---------- Os mais amados ---------- */
  $('#loved-rail').innerHTML = M.maisAmados.map((id) => M.card(byId(id))).join('');
  $$('[data-rail]').forEach((b) => b.addEventListener('click', () => {
    const rail = document.getElementById(b.dataset.rail);
    rail.scrollBy({ left: Number(b.dataset.dir) * rail.clientWidth * 0.8, behavior: M.reduceMotion.matches ? 'auto' : 'smooth' });
  }));

  /* ---------- Top 5 ---------- */
  $('#top-grid').innerHTML = M.top5.map((id, i) => {
    const p = byId(id);
    return `<li class="top-card reveal" style="--d:${i * 0.07}s">
      <span class="top-num" aria-hidden="true">${i + 1}</span>
      <a class="top-media${M.mediaAttrs(p)}" href="${M.linkProduto(p)}" tabindex="-1" aria-hidden="true">${M.media(p)}</a>
      <span class="brand">${p.marca}</span>
      <h3><a href="${M.linkProduto(p)}">${p.nome}</a></h3>
      <span class="top-sub">${p.sub || p.familia}</span>
      <button class="link-btn" data-fav="${p.id}" aria-pressed="${M.selected.has(p.id)}" aria-label="Guardar ${M.esc(p.nome)} na seleção">${M.heart} Guardar</button>
    </li>`;
  }).join('');

  /* ---------- Coleções em abas (cada coleção com seu tema) ---------- */
  const tabs = $$('[data-tab]'), panel = $('#tab-panel'), section = $('#colecoes'), verTodos = $('#open-catalog');
  function showTab(cat, focus = false) {
    tabs.forEach((t) => {
      const on = t.dataset.tab === cat;
      t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1;
      if (on) { panel.setAttribute('aria-labelledby', t.id); if (focus) t.focus(); }
    });
    M.aplicarTema(section, cat);
    const list = M.produtos.filter((p) => p.cat === cat).sort(M.comFotoPrimeiro).slice(0, 8);
    panel.classList.remove('swap'); void panel.offsetWidth; panel.classList.add('swap');
    panel.innerHTML = list.length ? list.map(M.card).join('') : `<div class="empty-col">
        <span class="eyebrow">Coleção ${M.plural[cat]}</span>
        <h3>Estamos montando esta seleção.</h3>
        <p>Enquanto isso, fale com a gente: indicamos opções leves e divertidas, na medida certa para cada idade.</p>
        <a class="btn btn-wa" href="${M.waLink(`Olá! Gostaria de sugestões de perfumes ${M.plural[cat].toLowerCase()}.`)}" target="_blank" rel="noopener">${M.waIcon}Pedir sugestões no WhatsApp</a>
      </div>`;
    verTodos.href = `catalogo.html?cat=${encodeURIComponent(cat)}`;
    verTodos.textContent = list.length ? `Ver todos os ${M.plural[cat].toLowerCase()}` : 'Ver catálogo completo';
  }
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => showTab(t.dataset.tab));
    t.addEventListener('keydown', (e) => {
      const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (d) { e.preventDefault(); showTab(tabs[(i + d + tabs.length) % tabs.length].dataset.tab, true); }
    });
  });
  showTab('Masculino');

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
    go.textContent = m.cta; go.href = `catalogo.html?familia=${encodeURIComponent(m.familia)}`;
    range.setAttribute('aria-valuetext', `${m.nome}, família ${m.familia}`);
    $('#tide-picks').innerHTML = '<span class="picks-label">Sugestões</span>' + M.produtos.filter((p) => p.familia === m.familia && p.foto).slice(0, 3)
      .map((p) => `<a class="pick" href="${M.linkProduto(p)}"><span class="sel-thumb${M.mediaAttrs(p)}">${M.media(p)}</span><span><b>${p.nome}</b><small>${p.marca}</small></span></a>`).join('');
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

  M.initShell();
})();
