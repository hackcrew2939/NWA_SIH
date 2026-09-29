const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

// Current translations in i18n.js
const i18nContent = fs.readFileSync('public/js/i18n.js', 'utf8');
const enMatch = i18nContent.match(/en:\s*\{([\s\S]*?)\n\s*\},/);
const currentKeys = {};
if (enMatch) {
  const lines = enMatch[1].split('\n');
  lines.forEach(line => {
    const km = line.match(/^\s*([a-zA-Z0-9_]+)\s*:\s*(['"`])(.*)\2/);
    if (km) {
      currentKeys[km[1]] = km[3];
    }
  });
}
console.log('Current translation keys count:', Object.keys(currentKeys).length);

// Let's inspect sections in index.html
const sectionRegex = /<(section|aside|header|footer|div\s+class="modal-backdrop[^"]*"|div\s+id="[^"]*modal[^"]*")[^>]*>([\s\S]*?)<\/\1>/gi;
// Instead of complex regex, let's look at sections by id
const sectionIds = [
  'appSidebar',
  'header',
  'live-weather-view',
  'weather-alerts-view',
  'citizen-reports-view',
  'social-stream-view',
  'analytics-view',
  'official-reports-view',
  'admin-panel-view',
  'footer',
  'reportModal',
  'aiForensicsModal',
  'alertDispatchModal',
  'bigDataModal',
  'imageEnlargeModal'
];

console.log('--- Analyzing sections ---');
