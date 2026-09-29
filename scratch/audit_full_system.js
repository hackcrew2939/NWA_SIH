const fs = require('fs');
const path = require('path');

// Read i18n.js
const i18nContent = fs.readFileSync('public/js/i18n.js', 'utf8');

// Parse translations object
let translations = {};
try {
  const match = i18nContent.match(/const\s+translations\s*=\s*(\{[\s\S]*?\n\s*\};\n)/);
  if (match) {
    eval('translations = ' + match[1].replace(/;\s*$/, ''));
  }
} catch (e) {
  console.error('Error parsing translations from i18n.js:', e);
}

const supportedLangs = ['en', 'hi', 'mr', 'bn', 'ta', 'te'];
console.log('=== SUPPORTED LANGUAGES ===');
supportedLangs.forEach(lang => {
  const count = translations[lang] ? Object.keys(translations[lang]).length : 0;
  console.log(`${lang}: ${count} keys`);
});

// Check key consistency across all supported languages
const allKeys = new Set();
supportedLangs.forEach(lang => {
  if (translations[lang]) {
    Object.keys(translations[lang]).forEach(k => allKeys.add(k));
  }
});
console.log(`\nTotal unique keys in dictionary: ${allKeys.size}`);

const missingByLang = {};
supportedLangs.forEach(lang => {
  missingByLang[lang] = [];
  allKeys.forEach(k => {
    if (!translations[lang] || translations[lang][k] === undefined || translations[lang][k] === '') {
      missingByLang[lang].push(k);
    }
  });
  console.log(`Missing keys in ${lang}: ${missingByLang[lang].length}`);
});

// Scan all HTML files in public/
const htmlFiles = fs.readdirSync('public').filter(f => f.endsWith('.html'));
console.log('\n=== HTML FILES SCAN ===');
htmlFiles.forEach(file => {
  const content = fs.readFileSync(path.join('public', file), 'utf8');
  const dataI18nMatches = [...content.matchAll(/data-i18n="([^"]+)"/g)].map(m => m[1]);
  const dataPlaceholderMatches = [...content.matchAll(/data-i18n-placeholder="([^"]+)"/g)].map(m => m[1]);
  const dataTitleMatches = [...content.matchAll(/data-i18n-title="([^"]+)"/g)].map(m => m[1]);
  const dataAltMatches = [...content.matchAll(/data-i18n-alt="([^"]+)"/g)].map(m => m[1]);
  const dataAriaMatches = [...content.matchAll(/data-i18n-aria="([^"]+)"/g)].map(m => m[1]);

  console.log(`\nFile: ${file}`);
  console.log(`  data-i18n tags: ${dataI18nMatches.length}`);
  console.log(`  data-i18n-placeholder tags: ${dataPlaceholderMatches.length}`);
  console.log(`  data-i18n-title tags: ${dataTitleMatches.length}`);
  console.log(`  data-i18n-alt tags: ${dataAltMatches.length}`);
  console.log(`  data-i18n-aria tags: ${dataAriaMatches.length}`);

  const usedKeys = new Set([...dataI18nMatches, ...dataPlaceholderMatches, ...dataTitleMatches, ...dataAltMatches, ...dataAriaMatches]);
  const unmappedInDict = [];
  usedKeys.forEach(k => {
    if (!allKeys.has(k)) {
      unmappedInDict.push(k);
    }
  });
  console.log(`  Unique keys used: ${usedKeys.size}, Keys missing in dictionary: ${unmappedInDict.length}`);
  if (unmappedInDict.length > 0) {
    console.log(`    Missing in dict:`, unmappedInDict.slice(0, 10));
  }
});

// Scan JS files for hardcoded strings or dynamic components
console.log('\n=== JS FILES SCAN ===');
const jsFiles = fs.readdirSync('public/js').filter(f => f.endsWith('.js'));
jsFiles.forEach(file => {
  const content = fs.readFileSync(path.join('public/js', file), 'utf8');
  const tCalls = [...content.matchAll(/NWAI18n\.t\(\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
  const hasLanguageListener = content.includes('nwa_language_changed') || content.includes('applyTranslations');
  console.log(`File: ${file} -> NWAI18n.t() calls: ${tCalls.length}, listens to language changed: ${hasLanguageListener}`);
});
