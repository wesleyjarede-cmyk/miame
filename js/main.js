/* =========================================================
   MIAMI STORE — interações
   - Abertura com o vídeo (toca 1x sem som, acende a fachada)
   - Coleções com desenho a traço que acende
   - Vitrine 3D giratória (arrastar, setas, teclado)
   ========================================================= */
(function () {
  "use strict";

  var LOJA = window.LOJA || {};
  var CATEGORIAS = window.CATEGORIAS || [];
  var PRODUTOS = window.PRODUTOS || [];
  var menosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ponteiroFino = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };

  function guardar(chave, valor) { try { sessionStorage.setItem(chave, valor); } catch (e) {} }
  function ler(chave) { try { return sessionStorage.getItem(chave); } catch (e) { return null; } }

  /* ---------- Contatos (vêm de dados.js) ---------- */
  var ig = LOJA.instagram;
  $$("[data-ig-link]").forEach(function (a) {
    if (ig) a.href = "https://www.instagram.com/" + ig + "/"; else a.hidden = true;
  });
  $$("[data-ig-arroba]").forEach(function (s) { s.textContent = ig ? "@" + ig : ""; });
  $$("[data-direct]").forEach(function (a) {
    if (ig) a.href = "https://ig.me/m/" + ig; else a.hidden = true;
  });
  if (LOJA.whatsapp) {
    var msg = encodeURIComponent("Olá! Vi o site da Miami Store e quero saber mais sobre as peças.");
    $$("[data-whats]").forEach(function (a) {
      a.href = "https://wa.me/55" + String(LOJA.whatsapp).replace(/\D/g, "") + "?text=" + msg;
      a.hidden = false;
    });
  }
  var dados = $("[data-dados]");
  if (dados && (LOJA.endereco || LOJA.horario)) {
    var html = "";
    if (LOJA.endereco) html += "<div><dt>Endereço</dt><dd>" + LOJA.endereco + "</dd></div>";
    if (LOJA.horario) html += "<div><dt>Horário</dt><dd>" + LOJA.horario + "</dd></div>";
    dados.innerHTML = html; dados.hidden = false;
  }
  var ano = $("[data-ano]"); if (ano) ano.textContent = new Date().getFullYear();

  /* ---------- Desenho a traço ---------- */
  function desenho(icone) {
    return '<svg class="desenho" viewBox="0 0 120 120" aria-hidden="true">' +
      '<use class="d-sombra" href="#ic-' + icone + '"/>' +
      '<use class="d-linha" href="#ic-' + icone + '"/></svg>';
  }
  function escapar(t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* ---------- Topo e menu ---------- */
  var topo = $("[data-topo]");
  var menuBtn = $("[data-menu-btn]");
  var menu = $("#menu");
  function fecharMenu() {
    menu.classList.remove("is-aberto");
    menuBtn.setAttribute("aria-expanded", "false");
    $(".sr", menuBtn).textContent = "Abrir menu";
    document.body.style.overflow = "";
  }
  menuBtn.addEventListener("click", function () {
    var abrir = !menu.classList.contains("is-aberto");
    if (!abrir) return fecharMenu();
    menu.classList.add("is-aberto");
    menuBtn.setAttribute("aria-expanded", "true");
    $(".sr", menuBtn).textContent = "Fechar menu";
    document.body.style.overflow = "hidden";
  });
  $$("a", menu).forEach(function (a) { a.addEventListener("click", fecharMenu); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && menu.classList.contains("is-aberto")) { fecharMenu(); menuBtn.focus(); } });

  /* =========================================================
     A. ABERTURA
     ========================================================= */
  var palco = $("[data-palco]");
  var video = $("[data-video]");
  var tela = $("[data-tela]");
  var imgFinal = $("[data-final]");
  var luz = $("[data-luz]");
  var ctxLuz = luz.getContext("2d");
  var botaoSom = $("[data-som]");
  var botaoRever = $("[data-rever]");
  var MOMENTO_LUZ = 3.1; // segundo em que a fachada do vídeo começa a acender

  function pintarLuz(fonte) {
    // usa só a faixa da fachada (topo do vídeo), não as roupas dos personagens
    var w = fonte.videoWidth || fonte.naturalWidth, h = fonte.videoHeight || fonte.naturalHeight;
    if (!w || !h) return;
    try { ctxLuz.drawImage(fonte, 0, h * 0.06, w, h * 0.3, 0, 0, luz.width, luz.height); } catch (e) {}
  }
  function loopLuz() {
    if (video.paused || video.ended) return;
    pintarLuz(video);
    if (!palco.classList.contains("is-luz") && video.currentTime >= MOMENTO_LUZ) palco.classList.add("is-luz");
    if (video.requestVideoFrameCallback) video.requestVideoFrameCallback(loopLuz);
    else requestAnimationFrame(loopLuz);
  }
  function mostrarFinal(rotuloRever) {
    palco.classList.add("is-final", "is-luz", "is-aceso");
    if (imgFinal.complete) pintarLuz(imgFinal); else imgFinal.addEventListener("load", function () { pintarLuz(imgFinal); }, { once: true });
    if (rotuloRever) botaoRever.textContent = rotuloRever;
  }
  function tocar() {
    palco.classList.remove("is-final", "is-luz", "is-aceso");
    botaoRever.textContent = "Ver de novo";
    try { video.currentTime = 0; } catch (e) {}
    var p = video.play();
    if (p && p.catch) p.catch(function () { mostrarFinal("Assistir abertura"); });
  }

  video.addEventListener("play", loopLuz);
  video.addEventListener("ended", function () {
    palco.classList.add("is-luz", "is-aceso");
    pintarLuz(video);
    guardar("miami-viu-abertura", "1");
  });
  video.addEventListener("error", function () { mostrarFinal("Assistir abertura"); }, true);

  // Som: o vídeo tem trilha. Começa mudo (regra dos navegadores) e o visitante liga se quiser.
  palco.classList.add("tem-som");
  botaoSom.addEventListener("click", function () {
    var ligar = video.muted;
    video.muted = !ligar;
    botaoSom.setAttribute("aria-pressed", String(ligar));
    $("[data-som-texto]").textContent = ligar ? "Desligar som" : "Ligar som";
    if (ligar && (video.ended || palco.classList.contains("is-final"))) tocar();
  });
  botaoRever.addEventListener("click", tocar);

  if (menosMovimento || ler("miami-viu-abertura")) {
    // quem pediu menos movimento, ou já viu a abertura nesta visita, cai direto na logo
    mostrarFinal("Assistir abertura");
  } else {
    tocar();
  }

  // Transição de câmera: ao rolar, o palco recua e escurece
  var faixa = $("[data-faixa]");
  var secaoMarca = $("#marca");
  var flutuante = $("[data-flutuante]");
  var contato = $("#contato");
  var contatoVisivel = false;
  var agendado = false;
  function aoRolar() {
    agendado = false;
    var y = window.scrollY;
    var alt = palco.offsetHeight || 1;
    topo.classList.toggle("is-solido", y > 40);
    if (!menosMovimento) {
      var p = Math.min(Math.max(y / alt, 0), 1);
      tela.style.transform = "translateY(" + (p * alt * 0.18).toFixed(1) + "px) scale(" + (1 - p * 0.1).toFixed(4) + ")";
      tela.style.opacity = (1 - p * 0.75).toFixed(3);
      var r = secaoMarca.getBoundingClientRect();
      var prog = (window.innerHeight - r.top) / (window.innerHeight + r.height);
      faixa.style.setProperty("--desloca", (-prog * 40).toFixed(2) + "%");
    }
    flutuante.classList.toggle("is-visivel", y > alt * 0.8 && !contatoVisivel);
  }
  window.addEventListener("scroll", function () { if (!agendado) { agendado = true; requestAnimationFrame(aoRolar); } }, { passive: true });
  window.addEventListener("resize", aoRolar);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) { contatoVisivel = es[0].isIntersecting; aoRolar(); }, { threshold: .2 }).observe(contato);
  }
  aoRolar();

  /* =========================================================
     C. COLEÇÕES
     ========================================================= */
  var mosaico = $("[data-colecoes]");
  mosaico.innerHTML = CATEGORIAS.map(function (c) {
    var visual = c.foto
      ? '<img class="peca__foto" src="' + escapar(c.foto) + '" alt="" loading="lazy" decoding="async">'
      : '<span class="peca__desenho">' + desenho(c.icone) + "</span>";
    return '<a class="peca revela" href="#vitrine" data-cat="' + escapar(c.nome) + '" aria-label="' + escapar(c.nome) + ': ver na vitrine">' +
      visual + '<span class="peca__nome">' + escapar(c.nome) + "</span></a>";
  }).join("");
  // corrige o tamanho do desenho (o span precisa do svg dentro ocupando a área)
  $$(".peca__desenho").forEach(function (s) { s.firstChild.style.width = "100%"; s.firstChild.style.height = "100%"; });

  var etiqueta = $("[data-etiqueta]");
  $$(".peca", mosaico).forEach(function (peca, i) {
    peca.style.transitionDelay = (i * 60) + "ms";
    peca.addEventListener("transitionend", function () { peca.style.transitionDelay = ""; }, { once: true });
    if (ponteiroFino && !menosMovimento) {
      peca.addEventListener("pointermove", function (e) {
        var r = peca.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        peca.style.setProperty("--ry", ((x - .5) * 8).toFixed(2) + "deg");
        peca.style.setProperty("--rx", ((.5 - y) * 8).toFixed(2) + "deg");
        peca.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
        peca.style.setProperty("--my", (y * 100).toFixed(1) + "%");
        etiqueta.style.setProperty("--ex", e.clientX + "px");
        etiqueta.style.setProperty("--ey", e.clientY + "px");
        etiqueta.classList.add("is-ativa");
      });
      peca.addEventListener("pointerleave", function () {
        peca.style.setProperty("--rx", "0deg"); peca.style.setProperty("--ry", "0deg");
        etiqueta.classList.remove("is-ativa");
      });
    }
    peca.addEventListener("click", function () {
      var cat = peca.getAttribute("data-cat");
      for (var k = 0; k < PRODUTOS.length; k++) {
        if (PRODUTOS[k].categoria === cat) { irPara(k, true); break; }
      }
    });
  });

  if ("IntersectionObserver" in window && !menosMovimento) {
    var obsRevela = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-visivel"); obsRevela.unobserve(e.target); } });
    }, { threshold: .15, rootMargin: "0px 0px -8% 0px" });
    $$(".revela").forEach(function (el) { obsRevela.observe(el); });
  } else {
    $$(".revela").forEach(function (el) { el.classList.add("is-visivel"); });
  }

  /* =========================================================
     D/E. VITRINE 3D GIRATÓRIA
     ========================================================= */
  var cena = $("[data-cena]");
  var anel = $("[data-anel]");
  var n = PRODUTOS.length;
  var passo = 360 / n;
  var itens = [];

  PRODUTOS.forEach(function (p, i) {
    var el = document.createElement("div");
    el.className = "vit-item";
    el.style.setProperty("--a", (i * passo) + "deg");
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = (p.foto
      ? '<img src="' + escapar(p.foto) + '" alt="" loading="lazy" decoding="async" draggable="false">'
      : desenho(p.icone)) +
      '<span class="vit-item__rotulo">' + escapar(p.nome || p.categoria) + "</span>";
    anel.appendChild(el);
    itens.push(el);
  });

  function medirRaio() {
    var w = anel.offsetWidth || 200;
    var raio = (w / 2) / Math.tan(Math.PI / n) * 1.14 + 12;
    anel.style.setProperty("--raio", raio.toFixed(1) + "px");
  }
  medirRaio();
  window.addEventListener("resize", medirRaio);

  var giro = 0, alvo = 0, frente = -1, arrastando = false, rodando = false;
  var infoCat = $("[data-info-categoria]"), infoNome = $("[data-info-nome]"), infoPreco = $("[data-info-preco]");

  function indiceFrente(g) { return ((Math.round(-g / passo) % n) + n) % n; }
  function atualizarInfo(i) {
    var p = PRODUTOS[i];
    infoCat.textContent = p.nome ? p.categoria : "Peça em destaque";
    infoNome.textContent = p.nome || p.categoria;
    if (p.preco) { infoPreco.textContent = p.preco; infoPreco.hidden = false; } else { infoPreco.hidden = true; }
  }
  function desenhar() {
    anel.style.setProperty("--giro", giro.toFixed(2) + "deg");
    for (var i = 0; i < n; i++) {
      var a = ((i * passo + giro) % 360 + 540) % 360 - 180; // -180..180, 0 = frente
      var d = Math.abs(a) / 180;
      itens[i].style.setProperty("--luz", (1 - d * 0.82).toFixed(3));
      itens[i].classList.toggle("is-costas", Math.abs(a) > 90);
    }
    var f = indiceFrente(giro);
    if (f !== frente) {
      if (frente >= 0) itens[frente].classList.remove("is-frente");
      itens[f].classList.add("is-frente");
      frente = f;
      atualizarInfo(f);
    }
  }
  function animar() {
    var dif = alvo - giro;
    if (arrastando) { giro = alvo; }
    else if (Math.abs(dif) < 0.05) { giro = alvo; desenhar(); rodando = false; return; }
    else { giro += dif * (menosMovimento ? 1 : 0.12); }
    desenhar();
    requestAnimationFrame(animar);
  }
  function mover() { if (!rodando) { rodando = true; requestAnimationFrame(animar); } }
  function irPara(i, rolar) {
    // escolhe o caminho mais curto até a peça i
    var atual = -giro / passo;
    var k = Math.round(atual);
    var dif = ((i - k) % n + n) % n;
    if (dif > n / 2) dif -= n;
    alvo = -(k + dif) * passo;
    pausarAuto();
    mover();
    if (rolar) document.getElementById("vitrine").scrollIntoView({ behavior: menosMovimento ? "auto" : "smooth", block: "start" });
  }
  function proxima(dir) { alvo = (Math.round(alvo / passo) - dir) * passo; mover(); }

  $("[data-anterior]").addEventListener("click", function () { pausarAuto(); proxima(-1); });
  $("[data-proxima]").addEventListener("click", function () { pausarAuto(); proxima(1); });
  cena.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { e.preventDefault(); pausarAuto(); proxima(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); pausarAuto(); proxima(-1); }
  });

  // arrastar (mouse e dedo)
  var x0 = 0, giro0 = 0, moveu = 0, idPonteiro = null, ultX = 0, ultT = 0, vel = 0;
  cena.addEventListener("pointerdown", function (e) {
    if (e.button !== undefined && e.button !== 0) return;
    idPonteiro = e.pointerId; x0 = ultX = e.clientX; ultT = performance.now(); vel = 0;
    giro0 = giro; moveu = 0; arrastando = true; pausarAuto();
    cena.classList.add("is-arrastando");
    mover();
  });
  window.addEventListener("pointermove", function (e) {
    if (!arrastando || e.pointerId !== idPonteiro) return;
    var dx = e.clientX - x0;
    moveu = Math.max(moveu, Math.abs(dx));
    if (moveu > 6 && cena.setPointerCapture) { try { cena.setPointerCapture(idPonteiro); } catch (er) {} }
    var agora = performance.now();
    vel = (e.clientX - ultX) / Math.max(agora - ultT, 1);
    ultX = e.clientX; ultT = agora;
    alvo = giro0 + dx * (360 / (cena.offsetWidth * 1.6));
  });
  function soltar(e) {
    if (!arrastando || (e && e.pointerId !== idPonteiro)) return;
    arrastando = false;
    cena.classList.remove("is-arrastando");
    if (moveu > 6) {
      var impulso = vel * 120 * (360 / (cena.offsetWidth * 1.6));
      alvo = Math.round((alvo + impulso) / passo) * passo;
    } else if (e && e.target) {
      // toque simples numa peça lateral: traz ela para a frente
      var item = e.target.closest && e.target.closest(".vit-item");
      if (item) irPara(itens.indexOf(item));
      else alvo = Math.round(alvo / passo) * passo;
    }
    mover();
  }
  window.addEventListener("pointerup", soltar);
  window.addEventListener("pointercancel", soltar);

  // giro automático lento enquanto ninguém mexe (para quando o visitante interage)
  var timerAuto = null, emVista = false, pausadoAte = 0;
  function pausarAuto() { pausadoAte = performance.now() + 9000; }
  function tickAuto() {
    if (emVista && !arrastando && !document.hidden && performance.now() > pausadoAte) proxima(1);
  }
  if (!menosMovimento) {
    timerAuto = setInterval(tickAuto, 3200);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) { emVista = es[0].isIntersecting; }, { threshold: .5 }).observe(cena);
    }
  }

  desenhar();
})();
