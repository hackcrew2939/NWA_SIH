const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');
const i18n = fs.readFileSync('public/js/i18n.js', 'utf8');

// Extract all querySelector and updateSelector strings from i18n.js
const selRegex = /(?:updateSelector|querySelector(?:All)?)\s*\(\s*['"`]([^'"`]+)['"`]/g;
const selectors = new Set();
let m;
while ((m = selRegex.exec(i18n)) !== null) {
  selectors.add(m[1]);
}

console.log('Total selectors checked:', selectors.size);

// Check presence of simple IDs or classes in index.html
const missing = [];
const found = [];

selectors.forEach(sel => {
  // If it's an ID like '#foo'
  if (sel.startsWith('#') && !sel.includes(' ') && !sel.includes('.')) {
    const id = sel.substring(1);
    if (html.includes(`id="${id}"`)) found.push(sel);
    else missing.push(sel);
  } else if (sel.startsWith('.') && !sel.includes(' ') && !sel.includes('>')) {
    const cls = sel.substring(1);
    if (html.includes(`class="`) && html.includes(cls)) found.push(sel);
    else missing.push(sel);
  } else {
    // For complex selectors, check if the main tokens exist in html
    const tokens = sel.split(/[\s>+~,]+/).filter(Boolean);
    const allTokensExist = tokens.every(tok => {
      if (tok.startsWith('#')) return html.includes(`id="${tok.substring(1)}"`);
      if (tok.startsWith('.')) return html.includes(tok.substring(1));
      if (tok.includes('[')) return true;
      return true;
    });
    if (allTokensExist) found.push(sel);
    else missing.push(sel);
  }
});

console.log(`Found: ${found.length}/${selectors.size}`);
if (missing.length) {
  console.log('Selectors needing check:', missing);
}
