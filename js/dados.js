/* =========================================================
   DADOS DA LOJA — tudo o que é informação real fica AQUI.
   Para trocar contato, categorias ou produtos, edite só este arquivo.
   (Arquivo comum, sem 'módulos', para o site abrir direto no navegador.)
   Regra: nada de preço, tamanho ou telefone inventado.
   Campo vazio (null) = o site esconde aquela informação.
   ========================================================= */

/* Fonte: bio e legendas dos posts do Instagram @miamistore.ura (páginas salvas em 17/11/2026). */
window.LOJA = {
  nome: "Miami Store",
  instagram: "miamistore.ura",
  whatsapp: null,                                         // [PREENCHER] só números, com DDD. Ex.: "34999999999"
  endereco: "Avenida Reinaldo Boaretto, 797, Uberaba, MG", // bio do Instagram
  horario: "Segunda a sábado, das 10h às 19h",            // legenda do post de 09/2026
  formato: "Loja física e online",                        // bio do Instagram
};

/* Categorias — com base nas peças que a loja posta.
   foto: imagem real (posts da loja). formato não é mais usado (o mosaico é fixo). */
window.CATEGORIAS = [
  { id: "kits",      nome: "Kits completos", icone: "camiseta", foto: "img/colecoes/kits.webp" },
  { id: "camisetas", nome: "Camisetas",      icone: "camiseta", foto: "img/colecoes/camisetas.webp" },
  { id: "moletons",  nome: "Moletons",       icone: "moletom",  foto: "img/colecoes/moletons.webp" },
  { id: "calcas",    nome: "Calças",         icone: "calca",    foto: "img/colecoes/calcas.webp" },
  { id: "bermudas",  nome: "Bermudas",       icone: "calca",    foto: "img/colecoes/bermudas.webp" },
  { id: "tenis",     nome: "Tênis",          icone: "tenis",    foto: "img/colecoes/tenis.webp" },
];

/* Vitrine 3D — peças reais dos posts da loja.
   nome: descrição do que aparece na foto (não é nome comercial oficial).
   preco: só coloque se a loja confirmar. null = não mostra preço. */
window.PRODUTOS = [
  { nome: "Moletom Nike branco",            categoria: "Moletons",       icone: "moletom",  foto: "img/produtos/moletom-nike-branco.webp",        preco: null },
  { nome: "Tênis Nike preto e vermelho",    categoria: "Tênis",          icone: "tenis",    foto: "img/produtos/tenis-nike-preto-vermelho.webp",  preco: null },
  { nome: "Camiseta e bermuda jeans",       categoria: "Kits completos", icone: "camiseta", foto: "img/produtos/kit-camiseta-bermuda-jeans.webp", preco: null },
  { nome: "Polos Zara",                     categoria: "Camisetas",      icone: "camiseta", foto: "img/produtos/polos-zara.webp",                 preco: null },
  { nome: "Moletom Nike cinza",             categoria: "Moletons",       icone: "moletom",  foto: "img/produtos/moletom-nike-cinza.webp",         preco: null },
  { nome: "Tênis Tommy Hilfiger branco",    categoria: "Tênis",          icone: "tenis",    foto: "img/produtos/tenis-tommy-branco.webp",         preco: null },
  { nome: "Moletom Hilfiger e calça jeans", categoria: "Calças",         icone: "moletom",  foto: "img/produtos/kit-moletom-hilfiger.webp",       preco: null },
  { nome: "Camiseta e bermuda azul",        categoria: "Bermudas",       icone: "camiseta", foto: "img/produtos/kit-camiseta-bermuda-azul.webp",  preco: null },
];
