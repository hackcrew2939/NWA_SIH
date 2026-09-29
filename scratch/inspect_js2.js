const fs = require('fs');

function inspectJsFile(filename) {
  const content = fs.readFileSync(filename, 'utf8');
  console.log(`\n================= ${filename} =================`);
  const functions = [...content.matchAll(/function\s+([a-zA-Z0-9_]+)\s*\(/g)].map(m => m[1]);
  console.log('Functions:', functions);
}

inspectJsFile('public/js/app.js');
inspectJsFile('public/js/export.js');
inspectJsFile('public/js/bigdata.js');
inspectJsFile('public/js/charts.js');
inspectJsFile('public/js/map.js');
