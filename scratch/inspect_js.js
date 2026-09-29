const fs = require('fs');

function inspectJsFile(filename) {
  const content = fs.readFileSync(filename, 'utf8');
  console.log(`\n================= ${filename} =================`);
  const functions = [...content.matchAll(/function\s+([a-zA-Z0-9_]+)\s*\(/g)].map(m => m[1]);
  console.log('Functions:', functions);
}

inspectJsFile('public/js/alerts.js');
inspectJsFile('public/js/social.js');
inspectJsFile('public/js/weather.js');
inspectJsFile('public/js/reports.js');
inspectJsFile('public/js/admin.js');
