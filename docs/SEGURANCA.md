# Segurança do site

## Situação atual
O site é estático: só HTML, CSS, JavaScript e imagens. Não tem banco de dados, login, formulário que envia dados, painel administrativo nem plugins. Por isso a área de ataque é pequena. Um site assim não "pega vírus" sozinho: os riscos reais são alguém entrar nas suas contas (GitHub, hospedagem, domínio, e-mail) ou um script de terceiros ser adulterado.

## O que já está no código
- **Política de segurança de conteúdo (CSP)** no `index.html`: o navegador só executa os scripts do próprio site e só carrega fontes do Google Fonts. Se alguém tentar injetar um script, ele é bloqueado.
- **`_headers`**: os mesmos cuidados como cabeçalhos HTTP (HTTPS obrigatório, proibição de abrir o site dentro de outro site, bloqueio de câmera, microfone e localização). Funciona sozinho em Netlify e Cloudflare Pages.
- **Busca segura**: o texto digitado na busca nunca é inserido como HTML, só comparado com a lista de perfumes.
- **Sem dependências**: nenhuma biblioteca de terceiros, então não há pacote desatualizado com falha conhecida.

## Ao alterar o código
- O script inline do `<head>` tem um hash na CSP. Se ele mudar, gere o novo hash e atualize no `index.html` e no `_headers`:
  `printf "%s" "CÓDIGO_DO_SCRIPT" | openssl dgst -sha256 -binary | base64`
- Novo serviço externo (mapa, chat, Instagram, análise de visitas) precisa ser liberado na CSP. Adicione só o que for usar, de fontes confiáveis.
- Nunca colocar senhas, tokens ou chaves de API em arquivos do site: tudo o que está aqui fica público.

## Checklist para o dono da loja
1. Ativar verificação em duas etapas (2FA) no GitHub, na hospedagem, no registro do domínio e no e-mail principal. É a proteção mais importante.
2. Usar senhas longas e diferentes em cada conta, com um gerenciador de senhas.
3. Publicar com HTTPS (GitHub Pages, Netlify e Cloudflare Pages oferecem de graça) e marcar "Enforce HTTPS".
4. Ativar bloqueio de transferência do domínio e renovação automática no registrador.
5. Restringir quem pode publicar: poucas pessoas com acesso de escrita ao repositório; proteger o branch principal.
6. Manter o histórico no Git: se algo der errado, dá para voltar a qualquer versão.
7. Testar o site em https://securityheaders.com e https://observatory.mozilla.org depois de publicar.

## Quando a loja for vender
- Usar uma plataforma de e-commerce confiável (pagamento, frete, estoque). O cartão nunca deve passar por este código.
- Publicar política de privacidade e de trocas, e seguir a LGPD ao coletar nome, telefone ou e-mail.
- Evitar sistemas com muitos plugins sem manutenção (ex.: WordPress desatualizado): são a origem mais comum de sites com vírus.
