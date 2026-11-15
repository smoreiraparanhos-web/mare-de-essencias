/*
 * Maré de Essências: catálogo com filtros laterais.
 * Os filtros ficam no endereço (ex.: catalogo.html?cat=Feminino&familia=Floral), então dá para
 * compartilhar uma busca. O tema da página muda com a coleção escolhida.
 */
(() => {
  'use strict';

  const M = window.Mare;
  const { $, $$ } = M;

  const textos = {
    '': { eyebrow: 'Catálogo completo', titulo: 'Todos os <em>perfumes</em>', intro: 'Clássicos importados, árabes intensos, criações de nicho e grandes nacionais. Filtre por família, marca ou concentração.' },
    Masculino: { eyebrow: 'Coleção masculina', titulo: 'Perfumes <em>masculinos</em>', intro: 'Amadeirados quentes, especiados e frescos para todos os momentos: do trabalho à noite.' },
    Feminino: { eyebrow: 'Coleção feminina', titulo: 'Perfumes <em>femininos</em>', intro: 'Florais delicados, gourmands envolventes e frescos luminosos para cada versão de você.' },
    Unissex: { eyebrow: 'Coleção unissex', titulo: 'Perfumes <em>unissex</em>', intro: 'Fragrâncias sem regras, para usar e dividir.' },
    'Árabe': { eyebrow: 'Coleção árabe', titulo: 'Perfumes <em>árabes</em>', intro: 'Intensos, doces e duradouros, com âmbar, especiarias e baunilha.' },
    Nicho: { eyebrow: 'Perfumaria de nicho', titulo: 'Perfumes <em>de nicho</em>', intro: 'Criações autorais das casas mais desejadas do mundo.' },
    Teen: { eyebrow: 'Coleção teen', titulo: 'Perfumes <em>teen</em>', intro: 'Leves, alegres e na medida certa para quem está começando a descobrir perfumes.' }
  };

  /* Estado vindo do endereço */
  const params = new URLSearchParams(location.search);
  const lista = (k) => (params.get(k) || '').split(',').filter(Boolean);
  const st = {
    cat: M.colecoes.includes(params.get('cat')) ? params.get('cat') : '',
    familia: new Set(lista('familia')), marca: new Set(lista('marca')),
    conc: new Set(lista('conc')), ocasiao: new Set(lista('ocasiao')),
    q: params.get('q') || '', sort: params.get('ordem') || 'destaques'
  };

  /* Ocasiões simplificadas a partir do texto da ficha */
  const ocasioes = ['Dia a dia', 'Trabalho', 'Noite', 'Calor', 'Frio'];
  const temOcasiao = (p, o) => {
    const t = (p.ocasiao || '').toLowerCase();
    return { 'Dia a dia': /dia a dia|dia,|^dia/.test(t), Trabalho: /trabalho|reuni/.test(t), Noite: /noite|festa|encontro|jantar/.test(t), Calor: /calor|verão|esporte/.test(t), Frio: /frio/.test(t) }[o];
  };
  const concGrupo = (p) => {
    const c = (p.conc || '').toLowerCase();
    if (!c) return '';
    if (c.startsWith('parfum')) return 'Parfum';
    if (c.includes('parfum')) return 'Eau de Parfum';
    if (c.includes('toilette')) return 'Eau de Toilette';
    return 'Colônia';
  };
  const concs = ['Parfum', 'Eau de Parfum', 'Eau de Toilette', 'Colônia'];

  const search = $('#search'), sort = $('#sort');
  search.value = st.q; sort.value = st.sort;

  /* Base da coleção (antes dos filtros laterais) */
  const daColecao = () => M.produtos.filter((p) => !st.cat || p.cat === st.cat);

  function filtrar(ignorar = '') {
    const q = st.q.trim().toLowerCase();
    return daColecao().filter((p) =>
      (!q || `${p.nome} ${p.marca} ${p.notas} ${p.familia} ${p.sub || ''} ${p.principais || ''} ${(p.piramide || []).join(' ')}`.toLowerCase().includes(q)) &&
      (ignorar === 'familia' || !st.familia.size || st.familia.has(p.familia)) &&
      (ignorar === 'marca' || !st.marca.size || st.marca.has(p.marca)) &&
      (ignorar === 'conc' || !st.conc.size || st.conc.has(concGrupo(p))) &&
      (ignorar === 'ocasiao' || !st.ocasiao.size || [...st.ocasiao].some((o) => temOcasiao(p, o))));
  }

  function opcoes(el, chave, valores, contar, rotulo = (v) => v) {
    el.innerHTML = valores.map((v) => {
      const n = contar(v);
      const id = `f-${chave}-${v.replace(/\W+/g, '-')}`;
      return `<label class="opt${n ? '' : ' is-empty'}" for="${id}"><input type="checkbox" id="${id}" data-f="${chave}" value="${M.esc(v)}" ${st[chave].has(v) ? 'checked' : ''}><span>${rotulo(v)}</span><small>${n}</small></label>`;
    }).join('');
  }

  function render() {
    /* Tema e textos da coleção */
    M.aplicarTema(document.body, st.cat);
    const t = textos[st.cat];
    $('#cat-eyebrow').textContent = t.eyebrow;
    $('#cat-title').innerHTML = t.titulo;
    $('#cat-intro').textContent = t.intro;
    $('#crumb-cat').innerHTML = st.cat ? `<span aria-hidden="true">›</span><span aria-current="page">${M.plural[st.cat]}</span>` : '';
    document.title = `${st.cat ? 'Perfumes ' + M.plural[st.cat].toLowerCase() : 'Todos os perfumes'} · Maré de Essências`;
    $$('[data-cat]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.cat === st.cat));
    $$('[data-nav]').forEach((a) => a.toggleAttribute('aria-current', a.dataset.nav === (st.cat || 'todos')));
    $$('[data-chip]').forEach((b) => b.setAttribute('aria-pressed', st.familia.has(b.dataset.chip)));

    /* Opções dos filtros com contagem */
    const base = (ign) => filtrar(ign);
    const marcas = [...new Set(daColecao().map((p) => p.marca))].sort((a, b) => a.localeCompare(b, 'pt'));
    opcoes($('#f-familia'), 'familia', M.familias, (v) => base('familia').filter((p) => p.familia === v).length, (v) => M.famPlural[v]);
    opcoes($('#f-marca'), 'marca', marcas, (v) => base('marca').filter((p) => p.marca === v).length);
    opcoes($('#f-conc'), 'conc', concs, (v) => base('conc').filter((p) => concGrupo(p) === v).length);
    opcoes($('#f-ocasiao'), 'ocasiao', ocasioes, (v) => base('ocasiao').filter((p) => temOcasiao(p, v)).length);

    /* Resultados */
    let res = filtrar();
    if (st.sort === 'nome') res.sort((a, b) => a.nome.localeCompare(b.nome, 'pt'));
    else if (st.sort === 'marca') res.sort((a, b) => a.marca.localeCompare(b.marca, 'pt') || a.nome.localeCompare(b.nome, 'pt'));
    else res.sort(M.comFotoPrimeiro);
    $('#result-count').textContent = `${res.length} perfume${res.length === 1 ? '' : 's'}`;

    $('.shop').classList.toggle('is-empty', !daColecao().length);
    const grid = $('#products');
    if (res.length) grid.innerHTML = res.map(M.card).join('');
    else if (!daColecao().length) grid.innerHTML = `<div class="empty-col">
        <span class="eyebrow">${t.eyebrow}</span><h3>Estamos montando esta seleção.</h3>
        <p>Fale com a gente: indicamos opções leves e divertidas, na medida certa para cada idade.</p>
        <a class="btn btn-wa" href="${M.waLink(`Olá! Gostaria de sugestões de perfumes ${M.plural[st.cat].toLowerCase()}.`)}" target="_blank" rel="noopener">${M.waIcon}Pedir sugestões no WhatsApp</a></div>`;
    else grid.innerHTML = '<p class="empty">Nenhum perfume com esses filtros. <button class="link-btn" data-clear>Limpar filtros</button></p>';

    /* Filtros ativos */
    const ativos = [];
    ['familia', 'marca', 'conc', 'ocasiao'].forEach((k) => st[k].forEach((v) => ativos.push([k, v, k === 'familia' ? M.famPlural[v] : v])));
    if (st.q) ativos.push(['q', st.q, `“${st.q}”`]);
    $('#active-filters').innerHTML = ativos.map(([k, v, l]) => `<button class="af" data-rm="${k}" data-v="${M.esc(v)}" aria-label="Remover filtro ${M.esc(l)}">${M.esc(l)} <span aria-hidden="true">×</span></button>`).join('')
      + (ativos.length > 1 ? '<button class="link-btn" data-clear>Limpar tudo</button>' : '');

    /* Endereço */
    const u = new URLSearchParams();
    if (st.cat) u.set('cat', st.cat);
    ['familia', 'marca', 'conc', 'ocasiao'].forEach((k) => st[k].size && u.set(k, [...st[k]].join(',')));
    if (st.q) u.set('q', st.q);
    if (st.sort !== 'destaques') u.set('ordem', st.sort);
    history.replaceState(null, '', u.toString() ? `?${u}` : location.pathname);
  }

  function limpar() { ['familia', 'marca', 'conc', 'ocasiao'].forEach((k) => st[k].clear()); st.q = ''; search.value = ''; render(); }

  /* Eventos */
  $('#filters').addEventListener('change', (e) => {
    const i = e.target.closest('[data-f]');
    if (!i) return;
    i.checked ? st[i.dataset.f].add(i.value) : st[i.dataset.f].delete(i.value);
    render();
  });
  $$('[data-cat]').forEach((b) => b.addEventListener('click', () => { st.cat = b.dataset.cat; st.marca.clear(); render(); }));
  $$('[data-chip]').forEach((b) => b.addEventListener('click', () => {
    const v = b.dataset.chip;
    st.familia.has(v) ? st.familia.delete(v) : st.familia.add(v);
    render();
  }));
  let timer;
  search.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => { st.q = search.value; render(); }, 150); });
  sort.addEventListener('change', () => { st.sort = sort.value; render(); });
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-clear]')) limpar();
    const rm = e.target.closest('[data-rm]');
    if (rm) { if (rm.dataset.rm === 'q') { st.q = ''; search.value = ''; } else st[rm.dataset.rm].delete(rm.dataset.v); render(); }
  });
  $('#clear-filters').addEventListener('click', limpar);

  /* Navegação no cabeçalho dentro do próprio catálogo, sem recarregar */
  $$('[data-nav]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    st.cat = a.dataset.nav === 'todos' ? '' : a.dataset.nav; st.marca.clear();
    render(); window.scrollTo({ top: 0, behavior: M.reduceMotion.matches ? 'auto' : 'smooth' });
  }));

  /* Filtros no celular (painel lateral) */
  const painel = $('#filters'), abrir = $('#open-filters');
  const setPainel = (on) => { painel.classList.toggle('open', on); abrir.setAttribute('aria-expanded', on); document.body.classList.toggle('no-scroll', on); if (on) $('#close-filters').focus(); };
  abrir.addEventListener('click', () => setPainel(true));
  $('#close-filters').addEventListener('click', () => { setPainel(false); abrir.focus(); });
  $('#apply-filters').addEventListener('click', () => { setPainel(false); abrir.focus(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && painel.classList.contains('open')) { setPainel(false); abrir.focus(); } });

  render();
  M.initShell();
})();
