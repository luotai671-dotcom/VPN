const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        results = results.concat(getHtmlFiles(fullPath));
      }
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const rootDir = path.resolve(__dirname, '..');
const files = getHtmlFiles(rootDir);
console.log('Total HTML files found:', files.length);

let canonicalIssues = [];
let missingTitle = [];
let missingDesc = [];
let msvalidateCount = 0;
let canonicalCount = 0;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const relPath = path.relative(rootDir, f);
  if (!content.includes('<title>')) missingTitle.push(relPath);
  if (!content.includes('name="description"')) missingDesc.push(relPath);
  if (content.includes('msvalidate.01')) msvalidateCount++;
  
  const m = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if (m) {
    canonicalCount++;
    if (!m[1].startsWith('https://fanqiangguai.blog')) {
      canonicalIssues.push({ file: relPath, href: m[1] });
    }
  } else {
    // Check if canonical is missing
    canonicalIssues.push({ file: relPath, href: '(missing)' });
  }
});

console.log('Total files checked:', files.length);
console.log('Files with canonical tags:', canonicalCount);
console.log('Canonical issues / missing:', canonicalIssues.length);
if (canonicalIssues.length > 0) {
  console.log('Sample canonical issues:', canonicalIssues.slice(0, 5));
}
console.log('Missing title:', missingTitle);
console.log('Missing desc:', missingDesc);
console.log('Files with msvalidate.01:', msvalidateCount);
