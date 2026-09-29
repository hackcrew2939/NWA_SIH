const fs = require('fs');

const rawCatalog = JSON.parse(fs.readFileSync('scratch/catalog_items.json', 'utf8'));

const nativeLanguageNames = new Set(['हिन्दी', 'मराठी', 'বাংলা', 'தமிழ்', 'తెలుగు']);

function isTranslatable(item) {
  const text = item.text.trim();
  if (text.length < 2) return false;
  if (nativeLanguageNames.has(text)) return false;
  // numbers, temps, units, coords
  if (/^[\d\s°%.,:;/\-+~()#&;<>*=|]+$/.test(text)) return false;
  if (/^\d+(\.\d+)?\s*(°C|°F|mm|km\/h|hPa|m|s|ms|min|h|%)?$/i.test(text)) return false;
  if (/^--(:--)*(\s*IST)?$/i.test(text)) return false;
  if (/^--°[CF]?$/i.test(text)) return false;
  if (text === 'N/A' || text === 'null' || text === 'undefined') return false;
  // Check if contains at least 2 alphabet characters
  if (!/[a-zA-Z]{2,}/.test(text)) return false;
  return true;
}

const translatable = rawCatalog.filter(isTranslatable);

// Generate clean unique keys
const seenKeys = new Map();
translatable.forEach((item, idx) => {
  let key = item.key;
  if (!key || key === 'txt_' || key === 'txt_c') {
    key = `str_${idx}`;
  }
  if (seenKeys.has(key)) {
    let suffix = 2;
    while (seenKeys.has(`${key}_${suffix}`)) suffix++;
    key = `${key}_${suffix}`;
  }
  seenKeys.set(key, true);
  item.key = key;
});

console.log(`Translatable human text strings: ${translatable.length}`);
fs.writeFileSync('scratch/translatable_catalog.json', JSON.stringify(translatable, null, 2));

console.log('Sample translatable strings:');
translatable.slice(0, 30).forEach(t => console.log(`[${t.key}] (${t.tag}): "${t.text}"`));
