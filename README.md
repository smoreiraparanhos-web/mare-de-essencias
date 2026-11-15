# Maré de Essências · perfumaria

Protótipo estático e responsivo de uma loja de perfumes. **Ainda não é uma loja operacional**: não há preços, estoque, checkout, pagamento ou cadastro. Os nomes dos perfumes são de produtos reais de mercado. Preço e disponibilidade são informados pelo WhatsApp; perfumes sem foto aparecem com ilustração em SVG.

## Executar
Rode um servidor local na pasta do projeto (`npx http-server`) e abra o endereço mostrado. Abrir o `index.html` direto também funciona.

## Estrutura
- `index.html`: página inicial. `catalogo.html`: catálogo com filtros. `perfume.html?id=13`: ficha de cada perfume.
- `js/produtos.js`: **lista de perfumes e fichas** (o arquivo a editar para incluir ou corrigir perfumes e fotos).
- `js/base.js`: partes comuns (WhatsApp, seleção, cartões, busca, temas). `js/loja.js`, `js/catalogo.js` e `js/perfume.js`: cada página.
- `css/loja.css`: identidade visual e temas por coleção (bloco "Edição 11" no fim). `css/paginas.css`: catálogo e ficha.
- O número do WhatsApp fica em `js/base.js` (constante `WHATS`) e nos links `wa.me` do HTML.
- `docs/BRIEFING.md`: dados da marca e operação comercial.
- `CLAUDE.md`: instruções para evolução com Claude Code.

## Imagens
- `assets/produtos/`: fotos dos perfumes (webp) e recortes sem fundo (`*-recorte.webp`).
- `assets/fundos/`: fundos das seções no tamanho original (1672x941). Use só em seções de altura moderada para não ampliar a imagem.

## Trocar ilustrações por fotos reais
Em `js/produtos.js`, adicione o arquivo ao objeto `fotos` (id do produto, nome do arquivo em `assets/produtos/` e cor do fundo da foto). Use fotos com fundo claro ou transparente e direito de uso.

## Para vender perfumes de verdade
Confirmar fornecedores e autorização de revenda, estoque e preços; obter fotos com direito de uso; integrar uma plataforma de e-commerce confiável com checkout, frete, pagamentos, pedidos e políticas de privacidade e devolução; validar obrigações fiscais e legais. Não coletar cartão diretamente neste frontend.

## Atualizar o site sem visual quebrado
Ao mudar `css/loja.css` ou `js/loja.js`, aumente o número `?v=` nos links do `index.html` (ex.: `?v=13`), nas três páginas. Isso obriga o navegador a baixar o arquivo novo em vez de usar uma cópia antiga guardada.
