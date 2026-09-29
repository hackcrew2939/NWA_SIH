const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// Function to safely inject data-i18n attributes
function injectDataI18n(htmlContent) {
  let content = htmlContent;

  // 1. Sidebar items (if not already tagged)
  content = content.replace(
    /(<span class="tab-btn-text"(?:(?!data-i18n)[^>])*)>Live Forecast & Map<\/span>/i,
    '$1 data-i18n="navLiveForecast">Live Forecast & Map</span>'
  );
  content = content.replace(
    /(<span class="tab-btn-text"(?:(?!data-i18n)[^>])*)>Weather Alerts<\/span>/i,
    '$1 data-i18n="navWeatherAlerts">Weather Alerts</span>'
  );
  content = content.replace(
    /(<span class="tab-btn-text"(?:(?!data-i18n)[^>])*)>Citizen Reports<\/span>/i,
    '$1 data-i18n="navCitizenReports">Citizen Reports</span>'
  );
  content = content.replace(
    /(<span class="tab-btn-text"(?:(?!data-i18n)[^>])*)>Social Intelligence<\/span>/i,
    '$1 data-i18n="navSocialIntel">Social Intelligence</span>'
  );
  content = content.replace(
    /(<span class="tab-btn-text"(?:(?!data-i18n)[^>])*)>Analytics & Trends<\/span>/i,
    '$1 data-i18n="navAnalytics">Analytics & Trends</span>'
  );
  content = content.replace(
    /(<span class="tab-btn-text"(?:(?!data-i18n)[^>])*)>Admin Panel<\/span>/i,
    '$1 data-i18n="navAdminPanel">Admin Panel</span>'
  );
  content = content.replace(
    /(<span class="tab-btn-text"(?:(?!data-i18n)[^>])*)>Report Severe Event<\/span>/i,
    '$1 data-i18n="navReportIncident">Report Severe Event</span>'
  );
  content = content.replace(
    /(<span class="tab-btn-text"(?:(?!data-i18n)[^>])*)>Download Official Reports<\/span>/i,
    '$1 data-i18n="navDownloadReports">Download Official Reports</span>'
  );

  // 2. Weather Alerts Banner
  content = content.replace(
    /<span>NATIONAL WEATHER SURVEILLANCE &amp; EARLY WARNING<\/span>/i,
    '<span data-i18n="alertsBadge">NATIONAL WEATHER SURVEILLANCE & EARLY WARNING</span>'
  );
  content = content.replace(
    /<span>NATIONAL WEATHER SURVEILLANCE & EARLY WARNING<\/span>/i,
    '<span data-i18n="alertsBadge">NATIONAL WEATHER SURVEILLANCE & EARLY WARNING</span>'
  );
  content = content.replace(
    /<h2 class="alerts-main-title">([\s\S]*?)<\/h2>/i,
    '<h2 class="alerts-main-title" data-i18n="alertsTitle">$1</h2>'
  );
  content = content.replace(
    /<p class="alerts-subtitle">([\s\S]*?)<\/p>/i,
    '<p class="alerts-subtitle" data-i18n="alertsSub">$1</p>'
  );

  // Alerts buttons
  content = content.replace(
    /(<button id="dispatchAlertModalBtn"[^>]*>[\s\S]*?)Dispatch Agency Alert(<\/button>)/i,
    '$1<span data-i18n="btnDispatchAgency">Dispatch Agency Alert</span>$2'
  );
  content = content.replace(
    /(<button id="testAudioSirenBtn"[^>]*>[\s\S]*?)Test Alert Audio &amp; Push(<\/button>)/i,
    '$1<span data-i18n="btnTestAudioPush">Test Alert Audio & Push</span>$2'
  );
  content = content.replace(
    /(<button id="testAudioSirenBtn"[^>]*>[\s\S]*?)Test Alert Audio & Push(<\/button>)/i,
    '$1<span data-i18n="btnTestAudioPush">Test Alert Audio & Push</span>$2'
  );
  content = content.replace(
    /(<button id="refreshAlertsBtn"[^>]*>[\s\S]*?)Refresh Warnings(<\/button>)/i,
    '$1<span data-i18n="btnRefreshWarnings">Refresh Warnings</span>$2'
  );

  // Alerts form
  content = content.replace(
    /<label for="alertCityInput">([\s\S]*?)<\/label>/i,
    '<label for="alertCityInput" data-i18n="lblMonitoredLocation">$1</label>'
  );
  content = content.replace(
    /<label for="alertHazardType">([\s\S]*?)<\/label>/i,
    '<label for="alertHazardType" data-i18n="lblHazardTrigger">$1</label>'
  );
  content = content.replace(
    /<label for="alertThresholdInput">([\s\S]*?)<\/label>/i,
    '<label for="alertThresholdInput" data-i18n="lblThresholdValue">$1</label>'
  );
  content = content.replace(
    /<label for="alertSoundSelect">([\s\S]*?)<\/label>/i,
    '<label for="alertSoundSelect" data-i18n="lblSirenTone">$1</label>'
  );

  // 3. Citizen Reports View
  content = content.replace(
    /<span>Crowd Reports &amp; Verification Queue<\/span>/i,
    '<span data-i18n="reportsQueueTitle">Citizen Weather Reports</span>'
  );
  content = content.replace(
    /<span>Crowd Reports & Verification Queue<\/span>/i,
    '<span data-i18n="reportsQueueTitle">Citizen Weather Reports</span>'
  );

  // 4. Social Stream View
  content = content.replace(
    /<span>Multi-Platform Weather Intelligence Stream<\/span>/i,
    '<span data-i18n="socialTitle">Social Intelligence Feed</span>'
  );
  content = content.replace(
    /(<button id="fetchLiveSignalsBtn"[^>]*>[\s\S]*?)Fetch Live Signals(<\/button>)/i,
    '$1<span data-i18n="btnFetchSignals">Fetch Live Signals</span>$2'
  );
  content = content.replace(
    /(<span id="socialLiveBadge"[^>]*>)MULTI-SOURCE INGESTION ACTIVE(<\/span>)/i,
    '$1<span data-i18n="badgeIngestionActive">MULTI-SOURCE INGESTION ACTIVE</span>$2'
  );

  // 5. Analytics View
  content = content.replace(
    /<h2[^>]*><i class="fa-solid fa-chart-pie"[^>]*><\/i>\s*National Weather Analytics<\/h2>/i,
    '<h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin: 0 0 0.2rem 0; display: flex; align-items: center; gap: 0.5rem;"><i class="fa-solid fa-chart-pie" style="color: var(--accent-primary);"></i> <span data-i18n="analyticsTitle">Analytics & Trends</span></h2>'
  );

  // 6. Official Reports View
  content = content.replace(
    /<h2><i class="fa-solid fa-file-shield"[^>]*><\/i>\s*Official Meteorological Intelligence Report<\/h2>/i,
    '<h2><i class="fa-solid fa-file-shield" style="color: var(--accent-primary);"></i> <span data-i18n="docReportTitle">Official Meteorological Intelligence Report</span></h2>'
  );

  // 7. Admin Panel View
  content = content.replace(
    /<div class="admin-login-shield-badge">[\s\S]*?NWA SECURITY ACCESS[\s\S]*?<\/div>/i,
    '<div class="admin-login-shield-badge"><i class="fa-solid fa-shield-halved"></i> <span data-i18n="adminSecBadge">NWA SECURITY ACCESS</span></div>'
  );
  content = content.replace(
    /<h3>Admin Portal Login<\/h3>/i,
    '<h3 data-i18n="adminLoginTitle">Admin Portal Login</h3>'
  );
  content = content.replace(
    /<p>Please enter your administrative credentials to access the moderation queue, verification controls, and AI audit telemetry\.<\/p>/i,
    '<p data-i18n="adminLoginSub">Please enter your administrative credentials to access the moderation queue, verification controls, and AI audit telemetry.</p>'
  );

  // 8. Global Footer
  content = content.replace(
    /<div class="footer-brand-title">[\s\S]*?National Weather Analytics \(NWA\)[\s\S]*?<\/div>/i,
    '<div class="footer-brand-title"><i class="fa-solid fa-cloud-bolt"></i> <span data-i18n="brandTitle">National Weather Analytics</span></div>'
  );
  content = content.replace(
    /<p class="footer-brand-desc">[\s\S]*?<\/p>/i,
    '<p class="footer-brand-desc" data-i18n="footerBrandDesc">Authoritative meteorological monitoring, real-time severe weather intelligence, and community incident verification across Indian states and union territories.</p>'
  );
  content = content.replace(
    /<div class="footer-domain-badge">[\s\S]*?Connected Domain:[\s\S]*?<\/div>/i,
    '<div class="footer-domain-badge"><i class="fa-solid fa-globe"></i> <span data-i18n="footerConnectedDomain">Connected Domain:</span> <strong>weatheranalytics.in</strong></div>'
  );
  content = content.replace(
    /<div class="footer-heading">Emergency &amp; Meteorological Desk<\/div>/i,
    '<div class="footer-heading" data-i18n="footerDeskTitle">Emergency & Meteorological Desk</div>'
  );
  content = content.replace(
    /<div class="footer-heading">Emergency & Meteorological Desk<\/div>/i,
    '<div class="footer-heading" data-i18n="footerDeskTitle">Emergency & Meteorological Desk</div>'
  );
  content = content.replace(
    /<div class="footer-heading">Legal &amp; Operational Policies<\/div>/i,
    '<div class="footer-heading" data-i18n="footerPoliciesTitle">Legal & Operational Policies</div>'
  );
  content = content.replace(
    /<div class="footer-heading">Legal & Operational Policies<\/div>/i,
    '<div class="footer-heading" data-i18n="footerPoliciesTitle">Legal & Operational Policies</div>'
  );
  content = content.replace(
    /<div>&copy; 2026 National Weather Analytics \(NWA\)\. All rights reserved\. Operating under WMO open observational data standards\.<\/div>/i,
    '<div data-i18n="footerCopyright">&copy; 2026 National Weather Analytics (NWA). All rights reserved. Operating under WMO open observational data standards.</div>'
  );

  return content;
}

const updatedHtml = injectDataI18n(html);
console.log('Modified HTML length:', updatedHtml.length);
fs.writeFileSync('public/index.html', updatedHtml);
console.log('Saved public/index.html with fresh data-i18n tags!');
