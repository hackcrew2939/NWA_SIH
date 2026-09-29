const { masterTranslations } = require('./master_translations.js');

const languages = ['en', 'hi', 'mr', 'bn', 'ta', 'te'];
const enKeys = Object.keys(masterTranslations.en);
console.log(`Total master keys in 'en': ${enKeys.length}`);

let hasErrors = false;
languages.forEach(lang => {
  if (lang === 'en') return;
  const langKeys = new Set(Object.keys(masterTranslations[lang] || {}));
  const missing = [];
  const empty = [];
  
  enKeys.forEach(k => {
    if (!langKeys.has(k)) missing.push(k);
    else if (!masterTranslations[lang][k] || masterTranslations[lang][k].trim() === '') empty.push(k);
  });
  
  if (missing.length > 0) {
    console.error(`❌ Language [${lang}] MISSING ${missing.length} keys:`, missing);
    hasErrors = true;
  }
  if (empty.length > 0) {
    console.error(`❌ Language [${lang}] EMPTY ${empty.length} keys:`, empty);
    hasErrors = true;
  }
  
  if (missing.length === 0 && empty.length === 0) {
    console.log(`✅ Language [${lang}] has 100% complete keys (${enKeys.length}/${enKeys.length})!`);
  }
});

if (!hasErrors) {
  console.log('\n🎉 ALL LANGUAGES ARE 100% COMPLETE WITH ZERO MISSING OR EMPTY KEYS!');
}
