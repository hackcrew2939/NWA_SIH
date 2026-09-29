const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

// Find all elements with textContent that are visible to user
// e.g. headings, buttons, labels, spans, p, th, td, a, li, option, etc.
const sections = [];
const sRegex = /<section[^>]+id="([^"]+)"[^>]*>/g;
let m;
while ((m = sRegex.exec(html)) !== null) {
  sections.push(m[1]);
}

const panels = [];
const pRegex = /id="([a-zA-Z0-9_-]*[pP]anel[a-zA-Z0-9_-]*)"/g;
while ((m = pRegex.exec(html)) !== null) {
  panels.push(m[1]);
}

const modals = [];
const mRegex = /id="([a-zA-Z0-9_-]*[mM]odal[a-zA-Z0-9_-]*)"/g;
while ((m = mRegex.exec(html)) !== null) {
  modals.push(m[1]);
}

console.log('Sections:', sections);
console.log('Panels:', panels);
console.log('Modals:', modals);

// Let's inspect nav items in sidebar & topbar
const navItems = [];
const navRegex = /<a[^>]+class="[^"]*nav-item[^"]*"[^>]*>([\s\S]*?)<\/a>/g;
while ((m = navRegex.exec(html)) !== null) {
  navItems.push(m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}
console.log('Nav items:', navItems);

// Let's inspect footer
const footerMatch = html.match(/<footer[\s\S]*?<\/footer>/i);
if (footerMatch) {
  console.log('Footer length:', footerMatch[0].length);
  // Extract text nodes
  const footerTexts = footerMatch[0].replace(/<[^>]+>/g, '\n').split('\n').map(s => s.trim()).filter(Boolean);
  console.log('Footer texts:', footerTexts);
}
