const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// Function to replace tag content or attribute with whitespace/entity tolerance
function fuzzyReplace(htmlContent, searchPattern, replaceWith) {
  // convert searchPattern into regex
  const escaped = searchPattern
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/\\&amp;/g, '(?:&|&amp;)')
    .replace(/\\&/g, '(?:&|&amp;)')
    .replace(/\s+/g, '\\s*');
  
  const regex = new RegExp(escaped, 'i');
  if (regex.test(htmlContent)) {
    return { success: true, html: htmlContent.replace(regex, replaceWith) };
  }
  return { success: false, html: htmlContent };
}

console.log('Testing fuzzyReplace...');
