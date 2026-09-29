const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

function showSnippet(id, length = 1200) {
  const idx = html.indexOf(`id="${id}"`);
  if (idx === -1) {
    console.log(`[NOT FOUND] ${id}`);
    return;
  }
  console.log(`=== SNIPPET: ${id} ===`);
  console.log(html.substring(idx, idx + length));
}

showSnippet('weather-alerts-view', 800);
showSnippet('citizen-reports-view', 800);
showSnippet('social-stream-view', 800);
showSnippet('analytics-view', 800);
showSnippet('official-reports-view', 800);
showSnippet('admin-panel-view', 1200);
showSnippet('reportModal', 800);
showSnippet('alertDispatchModal', 800);
