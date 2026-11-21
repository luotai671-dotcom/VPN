const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};
http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); } catch { res.writeHead(400); return res.end('Bad request'); }
  if (pathname === '/' || pathname === '') pathname = '/index.html';
  let file = path.resolve(root, '.' + pathname);
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    file = path.join(file, 'index.html');
  } else if (!fs.existsSync(file)) {
    if (fs.existsSync(file + '.html')) {
      file = file + '.html';
    } else if (fs.existsSync(path.join(file, 'index.html'))) {
      file = path.join(file, 'index.html');
    }
  }
  if (!file.startsWith(root + path.sep) || pathname.split('/').some(s => s.startsWith('.') && s !== '.') || !types[path.extname(file)]) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file, (err, data) => { if (err) { res.writeHead(404); return res.end('Not found'); } res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' }); res.end(data); });
}).listen(Number(process.env.PORT || 3000), '127.0.0.1', () => console.log(`VPN Insight ready: http://localhost:${process.env.PORT || 3000}`));
