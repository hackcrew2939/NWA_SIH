const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');
const lines = html.split('\n');
const untranslated = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('<script') || line.includes('<style') || line.includes('<!--')) continue;
  
  const matches = line.match(/>([^<>{}\n\r]+)</g);
  if (matches) {
    for (const m of matches) {
      const text = m.substring(1, m.length - 1).trim();
      // Filter out pure numbers, punctuation, icons
      if (text.length > 1 && /[a-zA-Z]{2,}/.test(text) && !text.startsWith('http') && !text.startsWith('data:') && !text.includes('function(') && !text.includes('var ') && !text.includes('const ') && !text.includes('console.')) {
        if (!line.includes('data-i18n=') && !line.includes('data-i18n-html=')) {
          untranslated.push({ line: i + 1, text, fullLine: line.trim() });
        }
      }
    }
  }
}

console.log('Total untranslated in index.html:', untranslated.length);
fs.writeFileSync('scratch/untranslated_index_html.json', JSON.stringify(untranslated, null, 2));
console.log('Saved to scratch/untranslated_index_html.json');
