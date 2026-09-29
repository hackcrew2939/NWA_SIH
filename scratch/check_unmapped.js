const fs = require('fs');

const expanded = JSON.parse(fs.readFileSync('scratch/master_expanded_translations.json', 'utf8'));
const needs = JSON.parse(fs.readFileSync('scratch/needs_translation.json', 'utf8'));

const unmapped = needs.filter(n => !expanded.hi[n.key] || expanded.hi[n.key] === n.text);
console.log('Unmapped remaining:', unmapped.length);

fs.writeFileSync('scratch/unmapped_remaining.json', JSON.stringify(unmapped, null, 2));

console.log('Sample unmapped:');
unmapped.slice(0, 30).forEach(u => console.log(`[${u.key}] <${u.tag}>: "${u.text}"`));
