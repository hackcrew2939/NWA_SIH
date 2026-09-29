const fs = require('fs');

// Update admin.js to integrate translateLocation and translateCategory
let adminCode = fs.readFileSync('public/js/admin.js', 'utf8');

adminCode = adminCode.replace(
  /const catLabel = categoryLabels\[r\.category\] \|\| r\.category \|\| 'Weather Event';/,
  `const catLabel = window.NWAI18n ? window.NWAI18n.translateCategory(r.category) : (categoryLabels[r.category] || r.category || 'Weather Event');
      const locName = window.NWAI18n ? window.NWAI18n.translateLocation(r.location || '') : (r.location || '');
      const stateName = window.NWAI18n ? window.NWAI18n.translateLocation(r.state || '') : (r.state || '');`
);

adminCode = adminCode.replace(
  /<div style="font-weight: 600; font-size: 0\.82rem;">\$\{escapeHtml\(r\.location \|\| ''\)\}<\/div>/,
  `<div style="font-weight: 600; font-size: 0.82rem;">\${escapeHtml(locName)}</div>`
);

adminCode = adminCode.replace(
  /<div style="font-size: 0\.72rem; color: var\(--text-muted\);">\$\{escapeHtml\(r\.state \|\| ''\)\} \(/,
  `<div style="font-size: 0.72rem; color: var(--text-muted);">\${escapeHtml(stateName)} (`
);

fs.writeFileSync('public/js/admin.js', adminCode, 'utf8');
console.log('✅ public/js/admin.js updated with location and category translations!');
