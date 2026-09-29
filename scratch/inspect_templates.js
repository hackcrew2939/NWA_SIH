const fs = require('fs');

function analyzeTemplates(filename) {
  const content = fs.readFileSync(filename, 'utf8');
  console.log(`\n=================== ${filename} ===================`);
  
  // Find all .innerHTML assignments or function returns with HTML
  const lines = content.split('\n');
  let inTemplate = false;
  let currentBlock = [];
  let startLine = 0;

  lines.forEach((line, idx) => {
    if (line.includes('.innerHTML = `') || line.includes('return `') || line.includes('card.innerHTML =') || line.includes('container.innerHTML =')) {
      inTemplate = true;
      startLine = idx + 1;
      currentBlock = [line];
    } else if (inTemplate) {
      currentBlock.push(line);
      if (line.includes('`;') || (line.includes('`') && currentBlock.length > 1)) {
        inTemplate = false;
        console.log(`--- [Lines ${startLine}-${idx + 1}] ---`);
        console.log(currentBlock.join('\n').substring(0, 500) + (currentBlock.join('\n').length > 500 ? '\n...[truncated]' : ''));
        console.log('-------------------------------------------');
      }
    }
  });
}

analyzeTemplates('public/js/alerts.js');
analyzeTemplates('public/js/social.js');
analyzeTemplates('public/js/reports.js');
analyzeTemplates('public/js/app.js');
