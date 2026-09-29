const fs = require('fs');
const path = require('path');

const jsFiles = fs.readdirSync('public/js').filter(f => f.endsWith('.js'));

console.log('=== DYNAMIC STRINGS AUDIT IN JS FILES ===');

jsFiles.forEach(file => {
  const content = fs.readFileSync(path.join('public/js', file), 'utf8');
  const innerHtmlMatches = [...content.matchAll(/\.innerHTML\s*=\s*`([^`]+)`/g)].map(m => m[1]);
  const textContentMatches = [...content.matchAll(/\.textContent\s*=\s*['"`]([^'"`\n]+)['"`]/g)].map(m => m[1]);
  console.log(`\n--- ${file} ---`);
  console.log(`innerHTML template blocks: ${innerHtmlMatches.length}`);
  console.log(`textContent assignments: ${textContentMatches.length}`);
});
