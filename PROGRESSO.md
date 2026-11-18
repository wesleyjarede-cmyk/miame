# Progresso — Miami Store (site)

Situação em **17/11/2026** (2ª rodada: correções visuais e fotos reais).
Pasta do projeto: `C:\Users\e4u\Downloads\miami-store`

## 0. Site publicado
- **Link para o cliente:** https://wesleyjarede-cmyk.github.io/miame/
- Repositório: https://github.com/wesleyjarede-cmyk/miame (público; GitHub Pages pela branch main, pasta raiz).
- Para atualizar o site no ar: commit + `git push` (o GitHub republica sozinho em 1 ou 2 minutos).

## 1. Como abrir
1. No Chrome: `"C:\Program Files\Google\Chrome\Application\chrome.exe" "C:\Users\e4u\Downloads\miami-store\index.html"`
2. Para ver como fica no celular: abra `Área de Trabalho\claude code\miami-store-no-celular.html` no Chrome.
3. Contato, categorias e produtos ficam **só em `js/dados.js`**.

## 2. O que já foi feito
- **Abertura**: no computador, o topo, o vídeo e o botão "Ver a coleção" cabem inteiros na tela, sem rolar. Testado em 1920×1080, 1366×768 e 1280×720. O vídeo mostra a faixa útil da animação (da fachada até a logo); só o fundo liso de cima e de baixo fica de fora. No celular, o vídeo ocupa a largura toda e o botão vem logo abaixo, tudo na primeira tela (testado em 390×844 e 360×640).
- **Som** (3ª rodada): o vídeo tenta tocar com som. Se o navegador bloquear, o que é comum no iPhone e no Chrome na primeira visita, ele toca mudo, **sem nenhum aviso na tela**. Se a pessoa tocar na página enquanto o vídeo ainda roda, o som liga sem pausar o vídeo. Não há botões de som nem de repetir.
- **Abertura no celular** (3ª rodada): recorte mais justo (do topo da fachada até logo abaixo da logo), botão colado na composição e o título "Streetwear" a 36 px do botão, já visível na primeira tela do iPhone 13 (Safari).
- **Marca**: o texto ficou mais compacto e duas fotos reais de dentro da loja apareceram ao lado, com a etiqueta "Dentro da loja".
- **Coleções**: seis cards com fotos reais (Kits completos, Camisetas, Moletons, Calças, Bermudas e Tênis). No computador, o mosaico tem 4 colunas, com Kits em destaque alto. No celular são 2 colunas, todos os cards iguais (4:5) e sem espaço vazio.
- **Catálogo por coleção** (4ª rodada): cada card de categoria abre a própria coleção numa tela que surge do ponto do clique. Ela tem nome da categoria, fotos reais, nome descritivo da peça, botão "Consultar no direct", abas para trocar de coleção e botão de voltar. Cada coleção tem link próprio (ex.: `#colecao/moletons`), o Voltar do navegador fecha a coleção e a página volta ao mesmo ponto. Os dados ficam em `js/dados.js` → `CATALOGO`. Fotos: Kits 10, Camisetas 3, Moletons 3, Calças 2, Bermudas 2, Tênis 3 (pasta `img/catalogo/<categoria>/`).
- **Vitrine 3D**: oito peças reais tiradas dos posts. Continua independente do catálogo (destaques).
- **Instagram**: perfil com avatar, título, botões "Seguir no Instagram" e "Mandar direct", grade com 6 posts reais e dados da loja (endereço com link para o mapa, horário e atendimento).
- **Rodapé**: a logo original (personagens, fachada e "MIAMI STORE") aparece num quadro, com links, endereço e horário.

## 3. Origem das fotos e informações
- Fotos: páginas do Instagram salvas em `Downloads\fotos miame*.html` (pastas `_files`). Só foram usadas fotos de posts da própria Miami Store. Ficaram de fora a foto de perfil de outra pessoa e dois memes. Os originais não foram alterados.
- Endereço, horário e "loja física e online": bio e legendas dos posts da loja.
- Logo: último quadro do vídeo de abertura (a foto de perfil do Instagram tem só 150 px).
- Os nomes das peças descrevem o que aparece na foto (ex.: "Moletom Nike branco"); não são nomes comerciais oficiais.

## 4. Pendências
- [ ] **WhatsApp**: não aparece no Instagram salvo. Quando tiver, preencher em `dados.js` e o botão aparece sozinho.
- [ ] **Preços**: só se a loja confirmar.
- [ ] Opcional: ampliar o vídeo com IA (Real-ESRGAN), o que precisa da sua liberação.

## 5. Decisões importantes
- **Conceito "do traço ao neon"**: a fachada a lápis acende em laranja. As fotos ficam um pouco apagadas e "acendem" (cor cheia e borda laranja) quando o mouse passa.
- **Cores** (em `css/marca.css`): asfalto `#131111`, grafite `#2f2d2b`, lápis `#8a827c`, neon `#ff7a1a`, brasa `#e2501b` e giz `#f5f1ec`.
- **Fontes**: *Dela Gothic One* para títulos (inclinada a −8° só nos títulos de uma linha) e *Schibsted Grotesk* para os textos.
- **Sem bibliotecas**: HTML, CSS e JS puros; o 3D é feito com CSS.
- **Textos sugeridos** (não oficiais): "Streetwear com atitude, do boné ao tênis.", "Os kits novos saem primeiro no Insta.", "Viu uma peça que curtiu? Chama no direct e garante o seu kit." (inspirado na legenda "Chame direct e garante o seu kit"). O lema "Conforto e qualidade é o lema da casa" é da própria loja.
