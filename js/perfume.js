/*
 * Maré de Essências: página do perfume (perfume.html?id=13).
 * Foto, ficha completa, pirâmide olfativa e consulta pelo WhatsApp. Sem preço: "sob consulta".
 */
(() => {
  'use strict';

  const M = window.Mare;
  const { $ } = M;
  const p = M.byId(new URLSearchParams(location.search).get('id'));
  const pdp = $('#pdp');

  if (!p) {
    pdp.innerHTML = `<div class="pdp-missing"><span class="eyebrow">Perfume não encontrado</span>
      <h1>Não achamos <em>este perfume.</em></h1>
      <p>Ele pode ter saído do catálogo ou o endereço está incompleto.</p>
      <a class="btn" href="catalogo.html">Ver todos os perfumes</a></div>`;
    M.initShell();
    return;
  }

  M.aplicarTema(document.body, p.cat);
  document.title = `${p.nome} · ${p.marca} · Maré de Essências`;
  const resumo = (p.desc && p.desc[0]) || `${p.nome}, de ${p.marca}.`;
  document.querySelector('meta[name="description"]').setAttribute('content', `${p.nome} (${p.marca}): ${resumo}`);
  document.querySelector('meta[property="og:title"]').setAttribute('content', `${p.nome} · ${p.marca}`);
  document.querySelector('meta[property="og:description"]').setAttribute('content', resumo);
  document.querySelectorAll('[data-nav]').forEach((a) => a.toggleAttribute('aria-current', a.dataset.nav === p.cat));

  const catLink = `catalogo.html?cat=${encodeURIComponent(p.cat)}`;
  const linha = [p.conc, p.sub || p.familia].filter(Boolean).join(' · ');
  const chips = (p.principais || (p.piramide ? p.piramide.join(' · ') : p.notas)).split(' · ').slice(0, 6);
  const tempos = ['Primeiros minutos', 'Após 30 minutos', 'O que fica na pele'];
  const nomes = ['Saída', 'Coração', 'Fundo'];
  const piramide = p.piramide
    ? `<ol class="pdp-pyramid">${p.piramide.map((n, i) => `<li><span class="py-step">${nomes[i]}<small>${tempos[i]}</small></span><span>${n.replace(/ · /g, ', ')}</span></li>`).join('')}</ol>`
    : p.principais
      ? `<p>A marca não divulga a divisão em saída, coração e fundo. As notas principais são:</p><p class="pdp-main-notes">${p.principais.replace(/ · /g, ', ')}.</p>`
      : '<p>As notas deste perfume ainda não foram publicadas pela marca. Fale com a gente pelo WhatsApp para saber mais.</p>';

  const usoConc = {
    Parfum: 'Por ser muito concentrado, uma ou duas borrifadas bastam.',
    'Eau de Parfum': 'De duas a quatro borrifadas costumam ser suficientes para o dia todo.',
    'Eau de Parfum Extrême': 'É intenso: comece com duas borrifadas.',
    'Deo Parfum': 'De duas a quatro borrifadas garantem boa presença.',
    'Eau de Toilette': 'Mais leve, pode ser reaplicado ao longo do dia.',
    Cologne: 'Leve e fresco, pode ser reaplicado à vontade.',
    'Desodorante Colônia': 'Leve, pode ser reaplicado ao longo do dia.'
  };

  const attrs = [
    ['Coleção', `<a href="${catLink}">${M.plural[p.cat]}</a>`],
    ['Família olfativa', `<a href="catalogo.html?familia=${encodeURIComponent(p.familia)}">${M.famPlural[p.familia]}</a>`],
    ['Subfamília', p.sub],
    ['Concentração', p.conc],
    ['Ocasião', p.ocasiao],
    ['Marca', `<a href="catalogo.html?marca=${encodeURIComponent(p.marca)}">${p.marca}</a>`]
  ].filter(([, v]) => v);

  pdp.innerHTML = `
    <nav class="crumbs" aria-label="Você está em"><a href="index.html">Início</a><span aria-hidden="true">›</span><a href="${catLink}">${M.plural[p.cat]}</a><span aria-hidden="true">›</span><span aria-current="page">${p.nome}</span></nav>
    <div class="pdp-grid">
      <div class="pdp-gallery">
        <div class="pdp-photo${M.mediaAttrs(p)}">${M.media(p, true)}<span class="chip">${p.familia}</span></div>
      </div>

      <div class="pdp-buy">
        <div class="pdp-top">
          <a class="brand" href="catalogo.html?marca=${encodeURIComponent(p.marca)}">${p.marca}</a>
          <button class="icon-btn pdp-share" id="share" aria-label="Compartilhar este perfume"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4"/></svg></button>
        </div>
        <h1>${p.nome}</h1>
        ${linha ? `<p class="pdp-line">${linha}</p>` : ''}
        <p class="pdp-lead">${resumo}</p>
        <ul class="pdp-chips" aria-label="Notas principais">${chips.map((n) => `<li>${n}</li>`).join('')}</ul>
        <div class="pdp-price"><b>Preço sob consulta</b><span>Valor e disponibilidade são informados na conversa pelo WhatsApp.</span></div>
        <a class="btn btn-wa btn-block" href="${M.waProduto(p)}" target="_blank" rel="noopener">${M.waIcon}Consultar pelo WhatsApp</a>
        <button class="btn btn-outline btn-block pdp-fav" data-fav="${p.id}" data-label="texto" aria-pressed="${M.selected.has(p.id)}">${M.heart}<span>${M.selected.has(p.id) ? 'Na seleção' : 'Guardar na seleção'}</span></button>
        <ul class="pdp-perks">
          <li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/></svg><span><b>Loja online em Eldorado do Sul (RS)</b>Sem loja física: atendimento pelo WhatsApp</span></li>
          <li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"/></svg><span><b>Ajuda para escolher</b>Tire dúvidas sobre notas, fixação e presentes</span></li>
        </ul>
      </div>

      <div class="pdp-details">
        <dl class="pdp-attrs">${attrs.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
        <details open><summary>Sobre o perfume</summary><div class="acc">${(p.desc || [resumo]).map((t) => `<p>${t}</p>`).join('')}</div></details>
        <details open><summary>Pirâmide olfativa</summary><div class="acc">${piramide}</div></details>
        <details><summary>Como usar</summary><div class="acc">
          <p>Aplique nos pontos de pulsação, como pescoço, pulsos e atrás das orelhas, a cerca de 15 cm da pele. Não esfregue os pulsos: isso acelera a evaporação das notas de saída.</p>
          ${p.conc && usoConc[p.conc] ? `<p>${usoConc[p.conc]}</p>` : ''}
          <p>Guarde o frasco longe do sol e do calor para preservar a fragrância.</p></div></details>
        <details><summary>Como comprar</summary><div class="acc">
          <p>O site não faz pedidos nem pagamentos. Toque em “Consultar pelo WhatsApp” para saber o preço, a disponibilidade e combinar a compra direto com a gente.</p>
          <p>Somos uma loja online de Eldorado do Sul (RS) e não temos loja física.</p></div></details>
      </div>
    </div>`;

  /* Compartilhar */
  $('#share').addEventListener('click', async () => {
    const dados = { title: `${p.nome} · ${p.marca}`, text: `Olha este perfume: ${p.nome} (${p.marca})`, url: location.href };
    try {
      if (navigator.share) await navigator.share(dados);
      else { await navigator.clipboard.writeText(location.href); $('#share').setAttribute('aria-label', 'Link copiado'); $('#share').classList.add('done'); }
    } catch (e) { /* compartilhamento cancelado */ }
  });

  /* Você também pode gostar */
  const rel = M.produtos.filter((x) => x.id !== p.id && x.familia === p.familia)
    .sort((a, b) => (b.cat === p.cat) - (a.cat === p.cat) || M.comFotoPrimeiro(a, b)).slice(0, 4);
  if (rel.length) {
    $('#related-grid').innerHTML = rel.map(M.card).join('');
    $('#related').hidden = false;
  }

  /* Dados estruturados (sem preço nem avaliações) */
  const ld = document.createElement('script');
  ld.type = 'application/ld+json';
  ld.textContent = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Product', name: p.nome, brand: { '@type': 'Brand', name: p.marca },
    description: (p.desc || [resumo]).join(' '), category: `Perfumes ${M.plural[p.cat].toLowerCase()}`,
    ...(p.foto ? { image: new URL(p.foto, location.href).href } : {})
  });
  document.head.appendChild(ld);

  M.initShell();
})();
