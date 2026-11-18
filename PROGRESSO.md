# Progresso — Miami Store (site)

Situação em **17/11/2026**.
Pasta do projeto: `C:\Users\e4u\Downloads\miami-store`

## 1. Como abrir
1. Abra no Chrome: `"C:\Program Files\Google\Chrome\Application\chrome.exe" "C:\Users\e4u\Downloads\miami-store\index.html"`
2. Não precisa instalar nada nem rodar servidor: é HTML, CSS e JS puros.
3. Para editar contato, categorias e produtos: **só o arquivo `js/dados.js`**.

## 2. O que já foi feito (protótipo navegável)
- **Abertura**: o vídeo da loja é o protagonista. Toca uma vez, sem som (com botão "Ligar som"), e não corta os personagens. No computador, a fachada desenhada continua pelas laterais da tela e acende em laranja junto com o vídeo, aos 3,1 s. Ao terminar, a imagem para na logo e aparecem "Ver a coleção" e "Ver de novo". Quem já viu a abertura na mesma visita cai direto na logo.
- **Vídeo melhorado**: o original (480×854) foi ampliado para 1080×1920, com redução de ruído e nitidez (`videos/abertura-1080.mp4`, 6,6 MB). O celular recebe uma versão de 720×1280 (1,9 MB). O original fica guardado em `originais/`.
- **Marca**: o nome "Miami Store" passa gigante em contorno, se movendo com a rolagem.
- **Coleções**: um mosaico com proporções diferentes. Cada coleção tem um desenho a traço que acende em laranja, uma inclinação 3D que segue o mouse e uma etiqueta "Ver na vitrine" que acompanha o cursor. Clicar numa coleção gira a vitrine até ela.
- **Vitrine 3D giratória** (a experiência exclusiva): as peças ficam num anel em volta de um piso de luz laranja. Dá para girar arrastando com o mouse ou o dedo, com as setas da tela ou com as setas do teclado. A peça da frente acende, e a vitrine gira sozinha devagar até a pessoa mexer.
- **Contato**: só pelo Instagram por enquanto, com "Mandar mensagem" (abre o direct) e "Ver o Instagram". Há também um botão flutuante de direct no celular.
- **Testes feitos**: celular (360 e 390 px) e computador (1280 e 1440 px), sem rolagem lateral, sem erros, modo "menos movimento" funcionando e vídeo tocando até o fim.

## 3. Pendências (precisam do dono da loja)
- [ ] **Fotos reais** das peças e das coleções. O Instagram não mostra as fotos sem login, então hoje aparecem desenhos a traço no lugar. Quando chegarem: salvar em `img/produtos/` e `img/colecoes/` e preencher `foto:` em `js/dados.js`.
- [ ] **Confirmar as categorias**: hoje elas vêm das roupas dos personagens (bonés, moletons, camisetas, tênis, calças e bermudas, acessórios).
- [ ] **Nome e preço** de cada peça da vitrine. Preço só se a loja confirmar.
- [ ] **WhatsApp, endereço e horário**: hoje ficam escondidos, porque estão vazios em `dados.js`.
- [ ] Opcional: ampliar o vídeo com IA (Real-ESRGAN, próprio para desenho animado). A ferramenta já está baixada em `~/.claude/ferramentas-midia/realesrgan`, mas rodar o programa precisa da sua liberação.

## 4. Decisões importantes
- **Conceito "do traço ao neon"**: a história do vídeo, em que a fachada a lápis acende em laranja, vira a linguagem do site inteiro. Tudo é desenhado em traço cinza e acende ao interagir.
- **Cores** (em `css/marca.css`): asfalto `#131111` (fundo, igual à base do vídeo), grafite `#2f2d2b`, lápis `#8a827c`, neon `#ff7a1a` (laranja da logo), brasa `#e2501b` e giz `#f5f1ec`.
- **Fontes** (dentro do projeto): *Dela Gothic One* para títulos, inclinada a −8° como a logo, e *Schibsted Grotesk* para os textos.
- **Sem bibliotecas**: o 3D é feito com CSS puro, sem Three.js. O site é leve e abre direto pelo arquivo.
- **Textos sugeridos** (não são frases oficiais da loja): "Streetwear com atitude, do boné ao tênis.", "Peças pra montar o visual completo..." e "Gostou de alguma peça? Chama a gente no direct."
- Vídeos ficam fora do Git, por serem pesados.
