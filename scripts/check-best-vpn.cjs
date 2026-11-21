const fs = require('fs');
const path = require('path');

function scan(dir, out = []) {
  for (const f of fs.readdirSync(dir)) {
    if (f.startsWith('.') || f === 'node_modules') continue;
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) scan(p, out);
    else if (/\.(html|js|cjs|ts)$/i.test(f)) {
      const c = fs.readFileSync(p, 'utf8');
      const matches = c.match(/.{0,30}最佳\s*VPN.{0,30}/g);
      if (matches) {
        out.push({ file: p, matches });
      }
    }
  }
  return out;
}

const list = scan('.');
console.log(`Found in ${list.length} files:`);
list.slice(0, 10).forEach(x => {
  console.log(`File: ${x.file}`);
  console.log(x.matches.slice(0, 3));
});
