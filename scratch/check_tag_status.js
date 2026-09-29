const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');

// Match tags and their immediate text content:
// e.g. <(tag)(attributes)>(text)</\1> or self-contained elements
// Let's parse all opening tags, attributes, text, and closing tags

const lines = html.split('\n');
console.log('Total HTML lines:', lines.length);

// Let's identify every element that contains text
// We can use a tag-by-tag regex scanner
const tagContentRegex = /<([a-zA-Z0-9]+)([^>]*)>([^<]+)<\/\1>/g;
let m;
const tagged = [];
const untagged = [];

const ignoredTags = new Set(['script', 'style', 'code', 'svg', 'path', 'circle', 'line', 'polyline', 'polygon']);

while ((m = tagContentRegex.exec(html)) !== null) {
  const tag = m[1].toLowerCase();
  const attrs = m[2];
  const text = m[3].trim();

  if (ignoredTags.has(tag)) continue;
  if (!text || text.length === 0) continue;
  if (/^[\d\s°%.,:;/\-+~()#&;]+$/.test(text)) continue;
  if (text.startsWith('//') || text.startsWith('/*')) continue;

  const hasI18n = attrs.includes('data-i18n');
  if (hasI18n) {
    tagged.push({ tag, attrs, text });
  } else {
    untagged.push({ tag, attrs, text, full: m[0] });
  }
}

console.log('Simple elements with data-i18n:', tagged.length);
console.log('Simple elements WITHOUT data-i18n:', untagged.length);

// What about elements with child tags like <button><i class="..."></i> Text</button>?
const compoundRegex = /<([a-zA-Z0-9]+)([^>]*)>(\s*<[a-zA-Z0-9]+[^>]*>[\s\S]*?<\/[a-zA-Z0-9]+>\s*([^<]+))<\/\1>/g;
const compoundUntagged = [];
while ((m = compoundRegex.exec(html)) !== null) {
  const tag = m[1].toLowerCase();
  const attrs = m[2];
  const text = m[4] ? m[4].trim() : '';
  if (ignoredTags.has(tag)) continue;
  if (text && text.length > 1 && !/^[\d\s°%.,:;/\-+~()#&;]+$/.test(text)) {
    if (!attrs.includes('data-i18n')) {
      compoundUntagged.push({ tag, attrs, text, full: m[0].substring(0, 150) });
    }
  }
}

console.log('Compound elements (e.g. icon + text) WITHOUT data-i18n:', compoundUntagged.length);

fs.writeFileSync('scratch/untagged_simple.json', JSON.stringify(untagged, null, 2));
fs.writeFileSync('scratch/untagged_compound.json', JSON.stringify(compoundUntagged, null, 2));
