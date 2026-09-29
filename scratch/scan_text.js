const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

// Find all buttons
const btnRegex = /<button[^>]*>([\s\S]*?)<\/button>/gi;
let match;
const buttons = [];
while ((match = btnRegex.exec(html)) !== null) {
  const full = match[0];
  const text = match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const hasI18n = full.includes('data-i18n');
  if (text) buttons.push({ text, hasI18n, tag: full.substring(0, 100) });
}

// Find placeholders
const phRegex = /placeholder="([^"]+)"/gi;
const placeholders = [];
while ((match = phRegex.exec(html)) !== null) {
  placeholders.push(match[1]);
}

// Find headings
const hRegex = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
const headings = [];
while ((match = hRegex.exec(html)) !== null) {
  const full = match[0];
  const text = match[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const hasI18n = full.includes('data-i18n');
  if (text) headings.push({ text, level: match[1], hasI18n, full: full.substring(0, 100) });
}

// Find titles (tooltips)
const titleRegex = /\stitle="([^"]+)"/gi;
const titles = [];
while ((match = titleRegex.exec(html)) !== null) {
  titles.push(match[1]);
}

// Find labels
const labelRegex = /<label[^>]*>([\s\S]*?)<\/label>/gi;
const labels = [];
while ((match = labelRegex.exec(html)) !== null) {
  const full = match[0];
  const text = match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const hasI18n = full.includes('data-i18n');
  if (text) labels.push({ text, hasI18n, full: full.substring(0, 100) });
}

// Find links
const aRegex = /<a[^>]*>([\s\S]*?)<\/a>/gi;
const links = [];
while ((match = aRegex.exec(html)) !== null) {
  const full = match[0];
  const text = match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const hasI18n = full.includes('data-i18n');
  if (text) links.push({ text, hasI18n, full: full.substring(0, 100) });
}

console.log('Total buttons:', buttons.length, 'Without i18n:', buttons.filter(b => !b.hasI18n).length);
console.log('Total headings:', headings.length, 'Without i18n:', headings.filter(h => !h.hasI18n).length);
console.log('Total labels:', labels.length, 'Without i18n:', labels.filter(l => !l.hasI18n).length);
console.log('Total links:', links.length, 'Without i18n:', links.filter(l => !l.hasI18n).length);
console.log('Placeholders:', placeholders);
console.log('Titles:', titles);

fs.writeFileSync('scratch/extracted_elements.json', JSON.stringify({
  buttons,
  headings,
  labels,
  links,
  placeholders,
  titles
}, null, 2));
