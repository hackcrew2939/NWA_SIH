const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

// Find navigation container or sidebar
const navMatch = html.match(/<nav[\s\S]*?<\/nav>/i);
if (navMatch) {
  console.log('--- NAV TAG ---');
  console.log(navMatch[0].substring(0, 1500));
}

// Find header or topbar
const headerMatch = html.match(/<header[\s\S]*?<\/header>/i);
if (headerMatch) {
  console.log('--- HEADER TAG ---');
  console.log(headerMatch[0].substring(0, 1500));
}

// Find sidebar
const sidebarMatch = html.match(/<aside[\s\S]*?<\/aside>/i) || html.match(/class="[^"]*sidebar[^"]*"[\s\S]*?>/i);
if (sidebarMatch) {
  console.log('--- SIDEBAR TAG ---');
  console.log(sidebarMatch[0]);
}
