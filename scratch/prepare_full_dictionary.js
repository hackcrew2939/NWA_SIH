const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scratch/translatable_catalog.json', 'utf8'));

// Filter out dynamic time strings like "01:00 AM" or telemetry placeholders with "--"
function isRealHumanText(t) {
  const s = t.text.trim();
  if (/^\d{2}:\d{2}\s*(AM|PM)$/i.test(s)) return false;
  if (/^--\s*[a-zA-Z%°]+$/i.test(s)) return false;
  if (/^--\s*:\s*--/i.test(s)) return false;
  if (s === 'IST' || s === 'NWA') return false;
  return true;
}

const cleaned = raw.filter(isRealHumanText);
console.log('Real human UI elements count:', cleaned.length);

fs.writeFileSync('scratch/cleaned_ui_elements.json', JSON.stringify(cleaned, null, 2));

console.log('Sample elements to translate:');
cleaned.slice(0, 35).forEach(c => console.log(`[${c.key}] <${c.tag}>: "${c.text}"`));
