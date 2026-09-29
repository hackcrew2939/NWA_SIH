const fs = require('fs');
const { masterTranslations } = require('./master_translations.js');

const stringsToTranslate = JSON.parse(fs.readFileSync('scratch/unique_strings_to_translate.json', 'utf8'));

// Build reverse lookup from English text to masterTranslation key
const enTextToKey = new Map();
for (const [key, text] of Object.entries(masterTranslations.en)) {
  enTextToKey.set(text.toLowerCase().trim(), key);
}

let alreadyMatched = 0;
let needsTranslation = [];

stringsToTranslate.forEach(item => {
  const norm = item.text.toLowerCase().trim();
  if (enTextToKey.has(norm)) {
    alreadyMatched++;
    item.existingKey = enTextToKey.get(norm);
  } else {
    needsTranslation.push(item);
  }
});

console.log(`Already matched with existing keys: ${alreadyMatched}/${stringsToTranslate.length}`);
console.log(`Needs new translation: ${needsTranslation.length}`);

fs.writeFileSync('scratch/needs_translation.json', JSON.stringify(needsTranslation, null, 2));

console.log('\nSample items needing translation:');
needsTranslation.slice(0, 30).forEach(it => console.log(`[${it.key}] (${it.tag}): "${it.text}"`));
