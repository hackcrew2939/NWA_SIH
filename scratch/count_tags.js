const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

const i18nMatches = html.match(/data-i18n="[^"]+"/g) || [];
const phMatches = html.match(/data-i18n-placeholder="[^"]+"/g) || [];
const titleMatches = html.match(/data-i18n-title="[^"]+"/g) || [];

console.log('data-i18n count:', i18nMatches.length);
console.log('data-i18n-placeholder count:', phMatches.length);
console.log('data-i18n-title count:', titleMatches.length);
console.log('Total translation attributes in HTML:', i18nMatches.length + phMatches.length + titleMatches.length);
