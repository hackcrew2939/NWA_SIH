const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

const tagContentRegex = /<([a-zA-Z0-9]+)([^>]*)>([^<]+)<\/\1>/g;
let m;
const remaining = [];
while ((m = tagContentRegex.exec(html)) !== null) {
  const tag = m[1].toLowerCase();
  const attrs = m[2];
  const text = m[3].trim();
  if (['script','style','code','svg','path','circle'].includes(tag)) continue;
  if (!text || /^[\d\s°%.,:;/\-+~()#&;]+$/.test(text)) continue;
  if (text.startsWith('//') || text.startsWith('/*')) continue;
  if (!attrs.includes('data-i18n')) {
    remaining.push({ tag, text });
  }
}
console.log('Remaining untagged items (' + remaining.length + '):');
remaining.forEach(r => console.log(`<${r.tag}>: "${r.text}"`));
