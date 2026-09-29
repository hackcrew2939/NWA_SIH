const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

// Let's inspect all tags in index.html with human-readable text that don't have data-i18n
// We can use a regex to find all opening tags followed by text followed by closing tag
// <(tag)([^>]*)>(text)</\1>
const tagRegex = /<([a-zA-Z0-9]+)([^>]*)>([^<]+)<\/\1>/g;
let m;
const untranslated = [];
while ((m = tagRegex.exec(html)) !== null) {
  const tag = m[1].toLowerCase();
  const attrs = m[2];
  const text = m[3].trim();
  
  if (['script', 'style', 'code', 'svg', 'path'].includes(tag)) continue;
  if (!text || text.length < 2) continue;
  if (/^[0-9\s°%.,:;/\-+~()#]+$/.test(text)) continue;
  if (text.startsWith('//') || text.startsWith('/*')) continue;
  
  const hasI18n = attrs.includes('data-i18n');
  untranslated.push({ tag, text, hasI18n, attrs: attrs.trim() });
}

console.log('Total text elements matched:', untranslated.length);
const without = untranslated.filter(u => !u.hasI18n);
console.log('Without data-i18n:', without.length);

fs.writeFileSync('scratch/untranslated_tags.json', JSON.stringify(without, null, 2));

console.log('Sample untranslated:');
without.slice(0, 30).forEach(u => console.log(`<${u.tag}>: "${u.text}"`));
