const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

// Find all elements with id="..."
const idRegex = /id="([^"]+)"/g;
const ids = new Set();
let m;
while ((m = idRegex.exec(html)) !== null) {
  ids.add(m[1]);
}

console.log('Total unique IDs found in index.html:', ids.size);
fs.writeFileSync('scratch/all_ids.json', JSON.stringify([...ids], null, 2));

// Print sample IDs
console.log('Sample IDs:', [...ids].slice(0, 40));
