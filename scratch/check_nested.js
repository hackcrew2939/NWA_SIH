const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

const regex = /<([a-z0-9]+)[^>]*\bdata-i18n="([^"]+)"[^>]*>([\s\S]*?)<\/\1>/gi;
let m;
let nestedChildTags = [];
while ((m = regex.exec(html)) !== null) {
  const tag = m[1];
  const key = m[2];
  const content = m[3];
  const innerTags = [...content.matchAll(/<([a-z0-9]+)/gi)].map(t => t[1].toLowerCase());
  const nonIcons = innerTags.filter(t => t !== 'i' && t !== 'svg');
  if (nonIcons.length > 0) {
    nestedChildTags.push({ tag, key, nonIcons, snippet: content.trim().replace(/\s+/g, ' ').substring(0, 100) });
  }
}
console.log('Total data-i18n elements with non-icon child elements:', nestedChildTags.length);
nestedChildTags.forEach(x => console.log(`Key: ${x.key} | Children: [${x.nonIcons.join(', ')}] | HTML: ${x.snippet}`));
