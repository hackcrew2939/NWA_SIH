const fs = require('fs');

console.log('Applying translations integration to JS modules...');

// 1. UPDATE public/js/alerts.js
let alertsCode = fs.readFileSync('public/js/alerts.js', 'utf8');

// Ensure activeAlertsCache is accessible and listener added
if (!alertsCode.includes('nwa_language_changed')) {
  // Update renderAlertCards
  alertsCode = alertsCode.replace(
    /const severityBadgeLabel = a\.severity === 'red' \? 'RED WARNING' : \(a\.severity === 'orange' \? 'ORANGE ALERT' : 'YELLOW WATCH'\);/,
    `const sev = a.severity || 'orange';
      const severityBadgeLabel = window.NWAI18n ? window.NWAI18n.translateSeverity(sev) : (sev === 'red' ? 'RED WARNING' : (sev === 'orange' ? 'ORANGE ALERT' : 'YELLOW WATCH'));
      const translatedCity = window.NWAI18n ? window.NWAI18n.translateLocation(a.city) : a.city;
      const translatedState = window.NWAI18n ? window.NWAI18n.translateLocation(a.state) : a.state;
      const translatedCategory = window.NWAI18n ? window.NWAI18n.translateCategory(a.hazard) : (a.hazard_label || a.hazard);
      const publicSafetyTxt = window.NWAI18n ? window.NWAI18n.t('alertPublicSafety', 'Public Safety Advisory:') : 'Public Safety Advisory:';
      const viewMapTxt = window.NWAI18n ? window.NWAI18n.t('alertViewAreaMap', 'View Area Map') : 'View Area Map';`
  );

  alertsCode = alertsCode.replace(
    /<h4 class="alert-location-title">\$\{escapeHtml\(a\.city\)\}<\/h4>/,
    `<h4 class="alert-location-title">\${escapeHtml(translatedCity)}</h4>`
  );

  alertsCode = alertsCode.replace(
    /<div class="alert-state-subtitle">\$\{escapeHtml\(a\.state\)\}<\/div>/,
    `<div class="alert-state-subtitle">\${escapeHtml(translatedState)}</div>`
  );

  alertsCode = alertsCode.replace(
    /<span class="hazard-tag">\$\{escapeHtml\(a\.hazard_label \|\| a\.hazard\)\}<\/span>/,
    `<span class="hazard-tag">\${escapeHtml(translatedCategory)}</span>`
  );

  alertsCode = alertsCode.replace(
    /<i class="fa-solid fa-shield-heart" style="color: #0284c7;"><\/i> Public Safety Advisory:/,
    `<i class="fa-solid fa-shield-heart" style="color: #0284c7;"></i> \${publicSafetyTxt}`
  );

  alertsCode = alertsCode.replace(
    /<i class="fa-solid fa-location-crosshairs"><\/i> View Area Map/,
    `<i class="fa-solid fa-location-crosshairs"></i> \${viewMapTxt}`
  );

  // Update summary stats ticker
  alertsCode = alertsCode.replace(
    /<strong>\$\{s\.redCount\}<\/strong> Red Warnings \(Take Action\)/,
    `<strong>\${s.redCount}</strong> \${window.NWAI18n ? window.NWAI18n.t('alertRedTitle', 'Red Warnings (Take Action)') : 'Red Warnings (Take Action)'}`
  );
  alertsCode = alertsCode.replace(
    /<strong>\$\{s\.orangeCount\}<\/strong> Orange Alerts \(Be Prepared\)/,
    `<strong>\${s.orangeCount}</strong> \${window.NWAI18n ? window.NWAI18n.t('alertOrangeTitle', 'Orange Alerts (Be Prepared)') : 'Orange Alerts (Be Prepared)'}`
  );
  alertsCode = alertsCode.replace(
    /<strong>\$\{s\.yellowCount\}<\/strong> Yellow Watches \(Be Updated\)/,
    `<strong>\${s.yellowCount}</strong> \${window.NWAI18n ? window.NWAI18n.t('alertYellowTitle', 'Yellow Watches (Be Updated)') : 'Yellow Watches (Be Updated)'}`
  );
  alertsCode = alertsCode.replace(
    /<strong>\$\{s\.affectedStates\}<\/strong> Impacted States \/ UTs/,
    `<strong>\${s.affectedStates}</strong> \${window.NWAI18n ? window.NWAI18n.t('alertImpactedStates', 'Impacted States / UTs') : 'Impacted States / UTs'}`
  );

  // Add event listener in init()
  alertsCode = alertsCode.replace(
    /function init\(\) \{/,
    `function init() {
    window.addEventListener('nwa_language_changed', () => {
      renderUserSubscriptions();
      if (activeAlertsCache && activeAlertsCache.length > 0) {
        renderAlertCards(activeAlertsCache);
      }
      loadAlertsRegisteredReports();
    });`
  );

  fs.writeFileSync('public/js/alerts.js', alertsCode, 'utf8');
  console.log('✅ public/js/alerts.js updated with full i18n support!');
}

// 2. UPDATE public/js/social.js
let socialCode = fs.readFileSync('public/js/social.js', 'utf8');

if (!socialCode.includes('nwa_language_changed')) {
  socialCode = socialCode.replace(
    /let socialAutoStreamTimer = null;/,
    `let socialAutoStreamTimer = null;
let lastSocialPostsCache = [];`
  );

  socialCode = socialCode.replace(
    /function renderSocialFeed\(posts\) \{/,
    `function renderSocialFeed(posts) {
  lastSocialPostsCache = posts || [];`
  );

  socialCode = socialCode.replace(
    /const timeAgo = formatSocialTime\(p\.timestamp\);/,
    `const timeAgo = formatSocialTime(p.timestamp);
    const catLabel = window.NWAI18n ? window.NWAI18n.translateCategory(p.category) : (catLabels[p.category] || p.category);
    const inferredCity = window.NWAI18n ? window.NWAI18n.translateLocation(p.city || 'National') : (p.city || 'National');
    const inferredState = window.NWAI18n ? window.NWAI18n.translateLocation(p.state || 'India') : (p.state || 'India');
    const urgencyLabel = window.NWAI18n ? window.NWAI18n.t('socialUrgency', 'Urgency:') : 'Urgency:';
    const inferredLabel = window.NWAI18n ? window.NWAI18n.t('socialInferred', 'Inferred:') : 'Inferred:';
    const viewStationTxt = window.NWAI18n ? window.NWAI18n.t('socialViewStation', 'View Station') : 'View Station';`
  );

  socialCode = socialCode.replace(
    /<span class="category-tag cat-\$\{p\.category\}">\$\{catLabels\[p\.category\] \|\| p\.category\}<\/span>/,
    `<span class="category-tag cat-\${p.category}">\${catLabel}</span>`
  );

  socialCode = socialCode.replace(
    /<span class="category-meta-badge"><i class="fa-solid fa-tag"><\/i> \$\{catLabels\[p\.category\]\}<\/span>/,
    `<span class="category-meta-badge"><i class="fa-solid fa-tag"></i> \${catLabel}</span>`
  );

  socialCode = socialCode.replace(
    /<div class="post-time" style="font-size: 0\.75rem; color: var\(--text-muted\);">\$\{timeAgo\} • Inferred: \$\{escapeHtml\(p\.city \|\| 'National'\)\}, \$\{escapeHtml\(p\.state \|\| 'India'\)\}<\/div>/,
    `<div class="post-time" style="font-size: 0.75rem; color: var(--text-muted);">\${timeAgo} • \${inferredLabel} \${escapeHtml(inferredCity)}, \${escapeHtml(inferredState)}</div>`
  );

  socialCode = socialCode.replace(
    /<span class="urgency-tag \$\{urgencyClass\}">Urgency: \$\{\(p\.urgency \|\| 'Medium'\)\.toUpperCase\(\)\}<\/span>/,
    `<span class="urgency-tag \${urgencyClass}">\${urgencyLabel} \${(p.urgency || 'Medium').toUpperCase()}</span>`
  );

  socialCode = socialCode.replace(
    /<i class="fa-solid fa-compass"><\/i> View Station/,
    `<i class="fa-solid fa-compass"></i> \${viewStationTxt}`
  );

  // Add event listener
  socialCode += `\n
// Synchronize dynamically on language change
window.addEventListener('nwa_language_changed', () => {
  if (lastSocialPostsCache && lastSocialPostsCache.length > 0) {
    renderSocialFeed(lastSocialPostsCache);
  }
  loadLiveStationMatrix();
});\n`;

  fs.writeFileSync('public/js/social.js', socialCode, 'utf8');
  console.log('✅ public/js/social.js updated with full i18n support!');
}

// 3. UPDATE public/js/app.js
let appCode = fs.readFileSync('public/js/app.js', 'utf8');

if (!appCode.includes('// I18N SYNC LISTENER')) {
  // Update location banner rendering
  appCode = appCode.replace(
    /if \(locTitleEl\) locTitleEl\.textContent = name;\s*if \(locStateEl\) locStateEl\.textContent = state \? `\$\{state\}, India` : 'India';/,
    `if (locTitleEl) locTitleEl.textContent = window.NWAI18n ? window.NWAI18n.translateLocation(name) : name;
  if (locStateEl) locStateEl.textContent = window.NWAI18n ? (state ? window.NWAI18n.translateLocation(state) + ', India' : 'India') : (state ? \`\${state}, India\` : 'India');`
  );

  // Add comprehensive nwa_language_changed event listener in app.js
  appCode += `\n
// I18N SYNC LISTENER - Instantly update all live forecast and location components
window.addEventListener('nwa_language_changed', () => {
  if (appState.currentLocation) {
    const locTitleEl = document.getElementById('currentLocationTitle');
    const locStateEl = document.getElementById('currentLocationState');
    if (locTitleEl) locTitleEl.textContent = window.NWAI18n.translateLocation(appState.currentLocation.name);
    if (locStateEl) locStateEl.textContent = appState.currentLocation.state ? \`\${window.NWAI18n.translateLocation(appState.currentLocation.state)}, India\` : 'India';
  }
  if (appState.currentData) {
    renderCurrentWeather({ current: appState.currentData, cached: false, retrieved_at: new Date() }, appState.forecastData);
  }
  if (appState.forecastData) {
    renderForecastOutlook(appState.forecastData);
    renderForecastTable(appState.forecastData, currentForecastRange);
  }
});\n`;

  fs.writeFileSync('public/js/app.js', appCode, 'utf8');
  console.log('✅ public/js/app.js updated with full i18n support!');
}

// 4. UPDATE public/js/reports.js
let reportsCode = fs.readFileSync('public/js/reports.js', 'utf8');

if (!reportsCode.includes('nwa_language_changed')) {
  reportsCode += `\n
// Re-render citizen reports list when language changes
window.addEventListener('nwa_language_changed', () => {
  if (typeof renderReportsList === 'function') {
    renderReportsList();
  }
});\n`;

  fs.writeFileSync('public/js/reports.js', reportsCode, 'utf8');
  console.log('✅ public/js/reports.js updated with language listener!');
}

// 5. UPDATE public/js/admin.js
let adminCode = fs.readFileSync('public/js/admin.js', 'utf8');

if (!adminCode.includes('nwa_language_changed')) {
  adminCode += `\n
// Re-render admin panels on language change
window.addEventListener('nwa_language_changed', () => {
  if (typeof renderAdminTable === 'function' && cachedAdminReports && cachedAdminReports.length > 0) {
    renderAdminTable(cachedAdminReports);
  }
});\n`;

  fs.writeFileSync('public/js/admin.js', adminCode, 'utf8');
  console.log('✅ public/js/admin.js updated with language listener!');
}
