const fs = require('fs');
const path = require('path');

function scan(dir, out = []) {
  for (const f of fs.readdirSync(dir)) {
    if (f.startsWith('.') || f === 'node_modules') continue;
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) scan(p, out);
    else if (/\.(html|js|cjs|ts)$/i.test(f)) {
      const c = fs.readFileSync(p, 'utf8');
      const matches = c.match(/最佳\s*VPN/g);
      if (matches) {
        out.push({ file: p, count: matches.length });
      }
    }
  }
  return out;
}

const list = scan('.');
console.log('Total files:', list.length);
let totalOccurrences = list.reduce((a, b) => a + b.count, 0);
console.log('Total occurrences:', totalOccurrences);

// Let's inspect non-nav occurrences
list.forEach(item => {
  const c = fs.readFileSync(item.file, 'utf8');
  const lines = c.split('\n');
  lines.forEach((l, idx) => {
    if (l.includes('最佳 VPN') || l.includes('最佳VPN')) {
      if (!l.includes('index.html') && !l.includes('main-nav') && !l.includes('nav-active')) {
        console.log(`${item.file}:${idx+1}: ${l.trim()}`);
      }
    }
  });
});
