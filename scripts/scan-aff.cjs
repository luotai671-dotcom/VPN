const fs = require('fs');
const path = require('path');

const affRegex = /https?:\/\/[^\s"'<>]*(?:aff\.|affaff|vipaff|speedworldaff|edgenovaaff|code=|\?code=)[^\s"'<>]*/gi;
const found = {};
let totalScanned = 0;

function scanDir(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (item === '.git' || item === 'node_modules') continue;
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      scanDir(full);
    } else if (/\.(html|js|cjs|ts|json|md)$/i.test(item)) {
      totalScanned++;
      const content = fs.readFileSync(full, 'utf8');
      let m;
      while ((m = affRegex.exec(content)) !== null) {
        const url = m[0].replace(/[',;)>]+$/, '');
        if (!found[url]) found[url] = [];
        if (!found[url].includes(full)) {
          found[url].push(full);
        }
      }
    }
  }
}

scanDir('.');
console.log('Total files scanned:', totalScanned);
console.log('Unique AFF URLs found:', Object.keys(found).length);
for (const [url, files] of Object.entries(found)) {
  console.log('\nURL:', url);
  console.log('  Found in (' + files.length + ' files):');
  for (const f of files.slice(0, 10)) {
    console.log('   -', f);
  }
  if (files.length > 10) {
    console.log('   - ... and ' + (files.length - 10) + ' more');
  }
}
