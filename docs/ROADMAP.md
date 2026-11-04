# Evolução para uma loja real

1. Validar nome, marca, público e proposta comercial.
2. Confirmar fornecedores e direitos de revenda; obter catálogo e imagens reais.
3. Selecionar plataforma de e-commerce com pagamentos, estoque, frete e pedidos.
4. Integrar a experiência editorial com catálogo e checkout reais.
5. Configurar domínio, SEO, páginas legais e canais de suporte.
6. Testar compra completa em ambiente apropriado, acessibilidade e dispositivos.
7. Publicar apenas após revisão comercial e técnica.

## Estado atual
Protótipo visual navegável, filtros e seleção local temporária; não há venda ativa.


## Edição 2
- 36 fragrâncias demonstrativas, com filtros e botão de carregar mais.
- Seção de atendimento acolhedor, editorial oceânico e revista olfativa.
- Microinterações em cards, animações com suporte a movimento reduzido.
- Pendente: imagens reais licenciadas, dados de estoque, backend, carrinho, checkout e testes completos em navegadores.

## Edição 3: o mergulho
- Abertura cinematográfica controlada pelo scroll (`js/cinema.js`, `css/cinema.css`): do céu do amanhecer, a câmera atravessa a superfície e desce até a areia, onde o frasco repousa sob um raio de sol. Tudo desenhado em canvas, sem vídeo nem imagens externas.
- Medidor de profundidade com os quatro capítulos da abertura.
- Momento interativo "Qual maré combina com você?": controle deslizante que muda a cor do frasco e filtra o catálogo pela família.
- Movimento leve no resto do site: faixa deslizante, ondas que se desenham ao rolar, bolhas no manifesto.
- Movimento reduzido e sem JavaScript: a abertura vira uma capa estática com todo o texto.
- Pendente: imagens reais licenciadas; avaliar vídeo gerado para a abertura quando houver ferramenta de geração conectada.

## Edição 4: loja feminina
- Site refeito do zero com estrutura de perfumaria online e identidade própria: creme, nude, rosé e dourado, formas arredondadas e em arco, Bodoni Moda e Jost.
- Banner em carrossel (3 destaques), famílias olfativas em arcos, "Os mais amados" (trilho com setas), "Top 5 da curadoria", coleções em abas (Femininos, Masculinos, Árabes, Nicho).
- 26 perfumes reais de mercado com notas principais e "preço sob consulta". Frascos ilustrados em SVG, com campo `foto` pronto para imagens reais.
- Catálogo completo escondido, aberto por botão, famílias ou busca rápida.
- Seletor de maré mantido e ampliado: muda a cor do frasco e sugere perfumes da família.
- Novas seções: guia com pirâmide olfativa interativa e intensidades, nossa história, chamada final para a seleção.
- Removidos: abertura em canvas (`js/cinema.js`), estilos e scripts antigos.
- Pendente: fotos reais com direito de uso (ou geradas com Higgsfield), preços reais, canal de atendimento, plataforma de vendas.

## Edição 5: visual masculino para todos os públicos
- Identidade trocada para grafite, preto, dourado e areia, com cantos levemente arredondados e Playfair Display nos títulos.
- Cabeçalho, banner, Top 5 e rodapé escuros; textos sem linguagem feminina.
- Nova aba e categoria Unissex; mais masculinos (Eros, Invictus, 212 VIP Men, Y) e unissex (Ombré Leather, Wood Sage & Sea Salt, Erba Pura). Total: 33 perfumes.
- Coleções abrem em Masculinos por padrão.

## Edição 6: mais vida
- Nova camada de movimento em `js/vida.js`: poeira dourada e névoa no banner, frascos que seguem o mouse, borrifada ao trocar de destaque.
- Faixa de marcas deslizando, títulos que sobem palavra por palavra, parallax ao rolar.
- Cartões com inclinação 3D, brilho e borrifada ao passar o mouse; luz que segue o mouse no Top 5; trilho que pode ser arrastado.
- Barra dourada de progresso no cabeçalho.
- Tudo desliga com "reduzir movimento"; efeitos de mouse só em telas com mouse.
- Próximo passo para ainda mais vida: fotos e vídeo realistas (Higgsfield ou fotos com direito de uso).

## Edição 7: fotos reais (em andamento)
- Fotos da loja em `assets/produtos/` (webp, 1000px de altura). Cards em 3:4 com fundo na cor da foto e bordas suavizadas.
- Com foto: Sauvage Eau de Parfum, Phantom, Scandal, Sì. Produtos com foto aparecem primeiro nas listas.
- Cadastrados aguardando arquivo: Good Girl, La Vie Est Belle, Libre, Paradoxe, Homem Sagaz, Bright Crystal, Botica 214 Verano en Firenze, Alien, For Her, Club 6 Intenso, Coco Mademoiselle, Homem Cor.agio, J'adore, Invictus Victory, Bloom, Impression In Black, Light Blue.
- A confirmar com a loja: notas dos nacionais (Natura, Eudora, O Boticário), dois frascos sem rótulo, direito de uso das fotos e se o catálogo fica só com os perfumes da loja.
