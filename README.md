# Maré de Essências · perfumaria

Protótipo estático e responsivo de uma loja de perfumes. **Ainda não é uma loja operacional**: não há preços, estoque, checkout, pagamento ou cadastro. Os nomes dos perfumes são de produtos reais de mercado; as imagens dos frascos são ilustrações em SVG.

## Executar
Rode um servidor local na pasta do projeto (`npx http-server`) e abra o endereço mostrado. Abrir o `index.html` direto também funciona.

## Estrutura
- `index.html`: seções e textos.
- `css/loja.css`: identidade visual (cores, fontes, formas) e layout.
- `js/loja.js`: lista de produtos, carrossel, coleções, catálogo, busca, seletor de maré, pirâmide olfativa e seleção.
- `docs/BRIEFING.md`: dados da marca e operação comercial.
- `CLAUDE.md`: instruções para evolução com Claude Code.

## Trocar ilustrações por fotos reais
Em `js/loja.js`, cada produto tem um último campo opcional `foto`. Coloque a imagem em `assets/produtos/` e informe o caminho, por exemplo `'assets/produtos/sauvage.webp'`. Use fotos com fundo claro ou transparente e direito de uso.

## Para vender perfumes de verdade
Confirmar fornecedores e autorização de revenda, estoque e preços; obter fotos com direito de uso; integrar uma plataforma de e-commerce confiável com checkout, frete, pagamentos, pedidos e políticas de privacidade e devolução; validar obrigações fiscais e legais. Não coletar cartão diretamente neste frontend.
