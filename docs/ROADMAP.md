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

## Edição 7: fotos e fundos da loja
- 24 perfumes com foto real em `assets/produtos/` (webp, 1000px de altura). Cards em 3:4 com fundo na cor da foto e bordas suavizadas; produtos com foto aparecem primeiro.
- Recortes sem fundo (Sauvage, L'Interdit, Invictus Victory) para o banner e a seção "Nossa história".
- 9 fundos da loja em `assets/fundos/` (versão grande e versão `-p` para celular): banner (pedra com arco, âmbar no mar, cristal violeta), famílias (limão, flor, pedra, âmbar), maré (onda japonesa), história (seda rosada), chamada final (praia).
- Originais em PNG retirados da raiz do projeto para não pesar o site (continuam no histórico do Git).
- Banner 2 passou a destacar Orientais (há poucos árabes com foto).
- Confirmado com a loja: Attar Al Wesal é da Al Wataniah e The Blend é do O Boticário.
- A confirmar com a loja: notas dos nacionais (Natura, Eudora, O Boticário); direito de uso das fotos; se o catálogo fica só com os perfumes da loja.

## Edição 8: fundos de seção e fotos inteiras
- Recortes removidos. Fotos dos perfumes ocupam o quadro inteiro (5:8); frascos altos aparecem inteiros, sem corte.
- Fundos da loja agora são fundos de seção, de ponta a ponta, com parallax: banner (pedra, âmbar, cristal violeta), famílias (o fundo troca com a família em foco: limão, flor, pedra, âmbar), mais amados (praia), Top 5 (cristal violeta), maré (onda japonesa), coleções (seda rosada), história (âmbar no mar), chamada final (pedra com arco).
- Banner de ponta a ponta com cartão de vidro mostrando o produto em foto.
- Novos com foto: Lattafa Asad, Clash (O Boticário), The Blend.

## Edição 9: modelo editorial, mais calmo e organizado
- Base visual: a seção "Nossa história" (fundo de ponta a ponta, painel de vidro com texto e foto em moldura) aplicada ao banner, à maré e à chamada final.
- Banner fixo, sem carrossel, com textos novos e três destaques (para todos, curadoria, atendimento).
- Famílias em quatro cartões com foto nítida, sem números e sem troca automática.
- Seções de produto (mais amados, Top 5, coleções) com fundo liso, para não ampliar imagens.
- Fundos exportados em qualidade máxima no tamanho original; versões ampliadas e para celular removidas.
- Removidos: camada de movimento (`js/vida.js`), faixas deslizando, poeira, névoa, inclinação 3D, borrifadas, barra de progresso.

## Edição 10: novos perfumes
- Com foto: Paradoxe, Homem Sagaz, Attar Al Wesal (Al Wataniah), Hawas for Him, Mercedes-Benz Select, Montblanc Individuel, Montblanc Starwalker, Nautica Voyage, Stella Dustin Homme Sport. Fotos de Phantom, Sauvage, Scandal, Sì e The Blend trocadas pelas versões originais.
- Fotos quadradas aproximadas para o frasco ficar em destaque; fotos largas mostradas inteiras.
- Arquivos enviados na raiz convertidos para `assets/produtos/` e retirados da raiz.

## Edição 11: loja com WhatsApp, ficha do perfume e catálogo com filtros
- Contato real: WhatsApp (51) 99626-3127, loja online em Eldorado do Sul (RS), sem loja física. Botão flutuante, ícone no cabeçalho, rodapé com contato e "Consultar" em cada cartão com mensagem pronta.
- Seleção de favoritos guardada no navegador entre páginas e enviada pelo WhatsApp como lista.
- Nova página do perfume (`perfume.html?id=`), inspirada na estrutura de página de produto: foto, marca, concentração, subfamília, notas principais, "Preço sob consulta", consulta pelo WhatsApp, atributos (coleção, família, subfamília, concentração, ocasião, marca), descrição, pirâmide olfativa, como usar, como comprar e "você também pode gostar".
- Novo catálogo (`catalogo.html`), inspirado na estrutura de listagem: faixa da coleção, famílias em botões, filtros laterais (família, marca, concentração, ocasião) com contagem, busca, ordenação e filtros no endereço. No celular, os filtros abrem em painel lateral. A home continua sem o catálogo completo.
- Fichas completas dos 58 perfumes em `js/produtos.js` (único arquivo a editar para o catálogo). Sem preço, estoque ou avaliações.
- Temas por coleção: masculino quente (couro, conhaque e âmbar), feminino rosé, teen vibrante (violeta e água-marinha), árabe dourado. Aplicados no catálogo, na ficha, nas abas da home e na nova seção "Compre por coleção".
- Nova coleção Teen, ainda sem perfumes: mostra convite para pedir sugestões no WhatsApp.
- Código separado em `js/produtos.js` (dados), `js/base.js` (comum), `js/loja.js` (home), `js/catalogo.js`, `js/perfume.js`; estilos novos em `css/paginas.css`. Ícone da aba em `assets/icone.svg`. Fundo da maré recomprimido (567 KB para 289 KB).
- Pirâmides completas conferidas nas fontes oficiais (Natura: Homem Sagaz e Homem Cor.agio; O Boticário: The Blend, Clash, Malbec Magnetic) e em fichas de lojas que concordam entre si (Club 6 Intenso, Club 6 Exclusive, Impression In Black, Stella Dustin Homme Sport). Todos os 58 perfumes têm notas.
- Coleção Teen montada com 7 perfumes de notas conferidas: Thank U, Next e Ari (Ariana Grande), Nina (Nina Ricci), Be Delicious (DKNY), Floratta Blue e Quasar Classic (O Boticário), Kaiak (Natura). Sem fotos ainda: aparecem com ilustração.
- Confirmado com a loja: Stella Dustin Homme Sport é Eau de Parfum.
- Confirmado com a loja: Botica 214 Verano en Firenze é a versão masculina (fougère aromático, Eau de Parfum).
- A confirmar com a loja:
  - horário de atendimento, se quiser mostrar.
