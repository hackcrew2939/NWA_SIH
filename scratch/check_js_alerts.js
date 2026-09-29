const fs = require('fs');
const path = require('path');

const jsFiles = fs.readdirSync('public/js').filter(f => f.endsWith('.js'));
console.log('JS files:', jsFiles);

jsFiles.forEach(f => {
  const content = fs.readFileSync(path.join('public/js', f), 'utf8');
  const alertMatches = content.match(/(?:alert|confirm|prompt)\s*\(\s*['"`](.*?)['"`]\s*\)/g) || [];
  const toastMatches = content.match(/showToast\s*\(\s*['"`](.*?)['"`]/g) || [];
  if (alertMatches.length || toastMatches.length) {
    console.log(`${f}: ${alertMatches.length} alerts/confirms, ${toastMatches.length} toasts`);
  }
});
