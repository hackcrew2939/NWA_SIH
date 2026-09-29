const fs = require('fs');
const path = require('path');

const jsFiles = ['admin.js', 'alerts.js', 'app.js', 'export.js', 'map.js', 'reports.js', 'weather.js', 'social.js'];
const allToasts = [];

jsFiles.forEach(f => {
  const filePath = path.join('public/js', f);
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Find showToast calls
  const tRegex = /showToast\s*\(\s*(['"`])(.*?)\1/g;
  let m;
  while ((m = tRegex.exec(content)) !== null) {
    allToasts.push({ file: f, toast: m[2] });
  }

  // Find alert calls
  const aRegex = /alert\s*\(\s*(['"`])(.*?)\1/g;
  while ((m = aRegex.exec(content)) !== null) {
    allToasts.push({ file: f, alert: m[2] });
  }
});

console.log('Total toasts/alerts found:', allToasts.length);
fs.writeFileSync('scratch/js_messages.json', JSON.stringify(allToasts, null, 2));
allToasts.forEach(t => console.log(`[${t.file}] ${t.toast || t.alert}`));
