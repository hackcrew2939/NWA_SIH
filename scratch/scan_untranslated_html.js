const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');

// Regex to find visible text nodes inside tags that don't have data-i18n
// Let's use a simple HTML parser / tokenizer
const lines = html.split('\n');
const untranslatedLines = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  // Skip script, style, comments
  if (line.includes('<script') || line.includes('<style') || line.includes('<!--')) continue;
  
  // Find tags like >Some Text< without data-i18n
  const matches = line.match(/>([^<>{}\n\r]+)</g);
  if (matches) {
    for (const m of matches) {
      const text = m.substring(1, m.length - 1).trim();
      // Filter out pure whitespace, numbers, symbols, icons, etc.
      if (text.length > 1 && /[a-zA-Z]{2,}/.test(text) && !text.startsWith('http') && !text.startsWith('data:') && !text.includes('function(') && !text.includes('var ') && !text.includes('const ')) {
        // Check if line or tag has data-i18n
        if (!line.includes('data-i18n') && !line.includes('data-i18n-html') && !line.includes('data-i18n-title') && !line.includes('data-i18n-placeholder')) {
          untranslatedLines.push({ line: i + 1, text, fullLine: line.trim() });
        }
      }
    }
  }
}

console.log(`Found ${untranslatedLines.length} potentially untranslated text instances in index.html:`);
untranslatedLines.slice(0, 40).forEach(u => {
  console.log(`L${u.line}: "${u.text}" -> ${u.fullLine}`);
});
