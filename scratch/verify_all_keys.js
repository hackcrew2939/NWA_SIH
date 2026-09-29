const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

// Load i18n
const vm = require('vm');
const sandbox = { 
  window: {}, 
  document: { 
    addEventListener: () => {}, 
    querySelectorAll: () => [],
    querySelector: () => null,
    documentElement: { setAttribute: () => {} }
  }, 
  localStorage: { getItem: () => 'hi', setItem: () => {} }, 
  Event: function(e){ this.type = e; },
  CustomEvent: function(e, opts){ this.type = e; this.detail = opts ? opts.detail : null; }
};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('public/js/i18n.js', 'utf8'), sandbox);

const translations = sandbox.window.NWAI18n.translations;
const languages = ['en', 'hi', 'mr', 'bn', 'ta', 'te'];

// Extract all data-i18n, data-i18n-placeholder, data-i18n-title
const dataI18nMatches = [...html.matchAll(/data-i18n="([^"]+)"/g)].map(m => m[1]);
const placeholderMatches = [...html.matchAll(/data-i18n-placeholder="([^"]+)"/g)].map(m => m[1]);
const titleMatches = [...html.matchAll(/data-i18n-title="([^"]+)"/g)].map(m => m[1]);

console.log('=== HTML SCAN REPORT ===');
console.log('Total data-i18n attributes in HTML:        ', dataI18nMatches.length);
console.log('Total placeholder attributes in HTML:      ', placeholderMatches.length);
console.log('Total title/tooltip attributes in HTML:    ', titleMatches.length);
console.log('Total translation attributes in HTML:      ', dataI18nMatches.length + placeholderMatches.length + titleMatches.length);

const allUsedKeys = new Set([...dataI18nMatches, ...placeholderMatches, ...titleMatches]);
console.log('Unique translation keys used in HTML:      ', allUsedKeys.size);
console.log('Total translation keys in master i18n file:', Object.keys(translations.en).length);

console.log('\n=== ZERO MISSING KEY VERIFICATION ===');
let allGood = true;
for (const lang of languages) {
  let missing = 0;
  let empty = 0;
  for (const key of allUsedKeys) {
    if (!translations[lang] || typeof translations[lang][key] === 'undefined') {
      console.error(`Missing key in [${lang}]: ${key}`);
      missing++;
    } else if (translations[lang][key] === '') {
      console.error(`Empty translation in [${lang}]: ${key}`);
      empty++;
    }
  }
  if (missing === 0 && empty === 0) {
    console.log(`Language [${lang.toUpperCase()}]: OK (All ${allUsedKeys.size} HTML keys present and non-empty!)`);
  } else {
    allGood = false;
    console.log(`Language [${lang.toUpperCase()}]: FAILED (${missing} missing, ${empty} empty)`);
  }
}

if (allGood) {
  console.log('\n>>> SUCCESS: 100% OF HTML KEYS ARE TRANSLATED IN ALL 6 LANGUAGES! <<<');
}
