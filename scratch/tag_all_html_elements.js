const fs = require('fs');

const master = JSON.parse(fs.readFileSync('scratch/master_comprehensive_dict.json', 'utf8'));
let html = fs.readFileSync('public/index.html', 'utf8');

console.log('Original HTML size:', html.length);

// Sort entries by text length descending so longer phrases match before shorter substrings
const entries = Object.entries(master.en).sort((a, b) => b[1].length - a[1].length);

let taggedCount = 0;

entries.forEach(([key, text]) => {
  const trimmed = text.trim();
  if (trimmed.length < 2) return;
  if (trimmed === 'NWA' || trimmed === 'IST') return;

  // 1. Check if it's a placeholder
  const phEscaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const phRegex = new RegExp(`placeholder="(${phEscaped})"(?![^>]*data-i18n-placeholder)`, 'gi');
  if (phRegex.test(html)) {
    html = html.replace(phRegex, `placeholder="$1" data-i18n-placeholder="${key}"`);
    taggedCount++;
  }

  // 2. Check if it's a title
  const tiRegex = new RegExp(`title="(${phEscaped})"(?![^>]*data-i18n-title)`, 'gi');
  if (tiRegex.test(html)) {
    html = html.replace(tiRegex, `title="$1" data-i18n-title="${key}"`);
    taggedCount++;
  }

  // 3. Check simple tag text: <tag attrs>text</tag>
  const tagRegex = new RegExp(`(<([a-zA-Z0-9]+)(?![^>]*data-i18n)[^>]*)>\\s*(${phEscaped})\\s*<\\/\\2>`, 'gi');
  if (tagRegex.test(html)) {
    html = html.replace(tagRegex, `$1 data-i18n="${key}">$3</$2>`);
    taggedCount++;
  }

  // 4. Check span or strong inside buttons or headings
  const innerSpanRegex = new RegExp(`(<span(?![^>]*data-i18n)[^>]*)>\\s*(${phEscaped})\\s*<\\/span>`, 'gi');
  if (innerSpanRegex.test(html)) {
    html = html.replace(innerSpanRegex, `$1 data-i18n="${key}">$2</span>`);
    taggedCount++;
  }
});

console.log(`Successfully injected ${taggedCount} data-i18n tags!`);
console.log('Updated HTML size:', html.length);

fs.writeFileSync('public/index.html', html);
console.log('Saved tagged public/index.html');
