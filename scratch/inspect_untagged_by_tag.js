const fs = require('fs');

const untagged = JSON.parse(fs.readFileSync('scratch/untagged_simple.json', 'utf8'));

const byTag = {};
untagged.forEach(u => {
  byTag[u.tag] = byTag[u.tag] || [];
  byTag[u.tag].push(u.text);
});

for (const [tag, list] of Object.entries(byTag)) {
  console.log(`<${tag}> count: ${list.length}`);
}

fs.writeFileSync('scratch/untagged_by_tag.json', JSON.stringify(byTag, null, 2));

console.log('\nSample headings:');
console.log(byTag.h1 || [], byTag.h2 || [], byTag.h3 || [], byTag.h4 || [], byTag.h5 || []);

console.log('\nSample labels:');
console.log((byTag.label || []).slice(0, 20));

console.log('\nSample buttons:');
console.log((byTag.button || []).slice(0, 20));

console.log('\nSample options:');
console.log((byTag.option || []).slice(0, 20));

console.log('\nSample paragraphs:');
console.log((byTag.p || []).slice(0, 20));
