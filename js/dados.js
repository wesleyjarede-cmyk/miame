/* =========================================================
   DADOS DA LOJA — tudo o que é informação real fica AQUI.
   Para trocar contato, categorias ou produtos, edite só este arquivo.
   (Arquivo comum, sem 'módulos', para o site abrir direto no navegador.)
   Regra: nada de preço, tamanho, endereço ou telefone inventado.
   Campo vazio (null) = o site esconde aquela informação.
   ========================================================= */

window.LOJA = {
  nome: "Miami Store",
  instagram: "miamistore.ura",           // confirmado pelo dono
  whatsapp: null,                        // [PREENCHER] ex.: "34999999999" (só números, com DDD)
  endereco: null,                        // [PREENCHER] ex.: "Rua ..., 123 — Centro, Cidade/UF"
  horario: null,                         // [PREENCHER] ex.: "Seg a sáb, 9h às 19h"
};

/* Categorias — [CONFIRMAR] com o dono.
   Hoje vêm das roupas que os personagens da animação usam
   (boné, moletom, camiseta, calça cargo, tênis, acessórios),
   porque o Instagram não mostrou as fotos sem login.
   foto: caminho da imagem (ex.: "img/colecoes/bones.webp"). Sem foto = aparece o desenho a traço. */
window.CATEGORIAS = [
  { id: "bones",      nome: "Bonés",      icone: "bone",     foto: null, formato: "alto" },
  { id: "moletons",   nome: "Moletons",   icone: "moletom",  foto: null, formato: "largo" },
  { id: "camisetas",  nome: "Camisetas",  icone: "camiseta", foto: null, formato: "quadrado" },
  { id: "tenis",      nome: "Tênis",      icone: "tenis",    foto: null, formato: "largo" },
  { id: "calcas",     nome: "Calças e bermudas", icone: "calca", foto: null, formato: "alto" },
  { id: "acessorios", nome: "Acessórios", icone: "corrente", foto: null, formato: "quadrado" },
];

/* Vitrine 3D — peças em destaque.
   Preencha com as peças reais quando tiver as fotos:
   { nome: "Moletom ...", categoria: "Moletons", icone: "moletom", foto: "img/produtos/moletom-1.webp", preco: "R$ 199,90" }
   preco: só coloque se a loja confirmou. null = não mostra preço. */
window.PRODUTOS = [
  { nome: null, categoria: "Bonés",      icone: "bone",     foto: null, preco: null },
  { nome: null, categoria: "Moletons",   icone: "moletom",  foto: null, preco: null },
  { nome: null, categoria: "Camisetas",  icone: "camiseta", foto: null, preco: null },
  { nome: null, categoria: "Tênis",      icone: "tenis",    foto: null, preco: null },
  { nome: null, categoria: "Calças e bermudas", icone: "calca", foto: null, preco: null },
  { nome: null, categoria: "Acessórios", icone: "corrente", foto: null, preco: null },
  { nome: null, categoria: "Camisetas",  icone: "camiseta", foto: null, preco: null },
  { nome: null, categoria: "Moletons",   icone: "moletom",  foto: null, preco: null },
];
