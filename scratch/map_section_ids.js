const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

const sections = [
  'weather-alerts-view',
  'citizen-reports-view',
  'social-stream-view',
  'analytics-view',
  'official-reports-view',
  'admin-panel-view',
  'reportModal',
  'alertDispatchModal',
  'aiForensicsModal',
  'bigDataModal'
];

sections.forEach(secId => {
  const startIdx = html.indexOf(`id="${secId}"`);
  if (startIdx === -1) {
    console.log(`[NOT FOUND] ${secId}`);
    return;
  }
  // find matching or next section/modal
  const endIdx = html.indexOf('</section>', startIdx) !== -1 ? html.indexOf('</section>', startIdx) : startIdx + 3000;
  const chunk = html.substring(startIdx, endIdx);
  
  const ids = [];
  const idRegex = /id="([^"]+)"/g;
  let m;
  while ((m = idRegex.exec(chunk)) !== null) {
    ids.push(m[1]);
  }
  console.log(`=== ${secId} IDs (${ids.length}) ===`);
  console.log(ids.join(', '));
});
