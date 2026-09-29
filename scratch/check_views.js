const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

const sections = [
  'weather-alerts-view',
  'citizen-reports-view',
  'social-stream-view',
  'analytics-view',
  'official-reports-view',
  'admin-panel-view'
];

sections.forEach(id => {
  const startIdx = html.indexOf(`id="${id}"`);
  if (startIdx === -1) {
    console.log(`Section ${id} NOT found`);
    return;
  }
  const endIdx = html.indexOf('</section>', startIdx);
  const snippet = html.substring(startIdx, endIdx);
  
  // Extract human text
  const texts = snippet.replace(/<[^>]+>/g, '\n').split('\n')
    .map(s => s.trim())
    .filter(s => s.length > 1 && !/^[0-9\s°%.,:;/\-+~()#]+$/.test(s) && !s.startsWith('//') && !s.startsWith('/*'));
  
  console.log(`=== ${id} (${texts.length} text items) ===`);
  console.log(texts.slice(0, 15).join(' | '));
});
