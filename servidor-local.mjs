// Servidor local para ver o site no celular (mesmo Wi-Fi).
// Uso: node servidor-local.mjs   → abre em http://<ip-do-computador>:8080
// Só para testes: não é para publicar.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

const raiz = path.dirname(fileURLToPath(import.meta.url));
const PORTA = Number(process.env.PORTA || 8080);
const tipos = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp",
  ".woff2": "font/woff2", ".mp4": "video/mp4",
};
const bloqueados = [".git", "originais", "servidor-local.mjs"];

http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split("?")[0]);
  if (url.endsWith("/")) url += "index.html";
  const arq = path.normalize(path.join(raiz, url));
  if (!arq.startsWith(raiz) || bloqueados.some((b) => arq.includes(path.sep + b)) || !fs.existsSync(arq) || fs.statSync(arq).isDirectory()) {
    res.writeHead(404); return res.end("Não encontrado");
  }
  const tam = fs.statSync(arq).size;
  const tipo = tipos[path.extname(arq).toLowerCase()] || "application/octet-stream";
  const faixa = req.headers.range; // o iPhone exige isso para tocar vídeo
  if (faixa) {
    const [a, b] = faixa.replace("bytes=", "").split("-");
    const ini = Number(a), fim = b ? Number(b) : tam - 1;
    res.writeHead(206, { "Content-Type": tipo, "Content-Range": `bytes ${ini}-${fim}/${tam}`, "Accept-Ranges": "bytes", "Content-Length": fim - ini + 1 });
    return fs.createReadStream(arq, { start: ini, end: fim }).pipe(res);
  }
  res.writeHead(200, { "Content-Type": tipo, "Content-Length": tam, "Accept-Ranges": "bytes", "Cache-Control": "no-cache" });
  fs.createReadStream(arq).pipe(res);
}).listen(PORTA, "0.0.0.0", () => {
  const ips = Object.values(os.networkInterfaces()).flat().filter((i) => i && i.family === "IPv4" && !i.internal).map((i) => i.address);
  console.log("Site da Miami Store no ar (só na sua rede):");
  ips.forEach((ip) => console.log(`  No celular: http://${ip}:${PORTA}`));
  console.log(`  Neste computador: http://localhost:${PORTA}`);
  console.log("Para desligar: feche esta janela ou aperte Ctrl+C.");
});
