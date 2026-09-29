const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

// Let's find all text blocks between tags >text< that are not just whitespace or JS/CSS
const textNodes = [];
const textRegex = />([^<]+)</g;
let m;
while ((m = textRegex.exec(html)) !== null) {
  const t = m[1].trim();
  if (t && !t.startsWith('/*') && !t.startsWith('//') && t.length > 1 && !t.includes('{') && !t.includes('}')) {
    textNodes.push(t);
  }
}

console.log('Total non-empty text strings found:', textNodes.length);

// Let's filter out numbers, single punctuation, CSS/JS artifacts
const cleanTexts = textNodes.filter(t => {
  if (/^[0-9\s°%.,:;/\-+~()#]+$/.test(t)) return false;
  if (/^&[a-z0-9#]+;$/i.test(t)) return false;
  return true;
});

console.log('Clean human texts:', cleanTexts.length);
fs.writeFileSync('scratch/all_human_texts.json', JSON.stringify(cleanTexts, null, 2));

// Print unique list
const unique = [...new Set(cleanTexts)];
console.log('Unique human texts:', unique.length);
fs.writeFileSync('scratch/unique_human_texts.json', JSON.stringify(unique, null, 2));
