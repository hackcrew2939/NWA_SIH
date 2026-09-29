const fs = require('fs');

// Read index.html
let html = fs.readFileSync('public/index.html', 'utf8');

// List of replacements to ensure 100% of UI elements in index.html are tagged
const specificReplacements = [
  {
    target: '<span><i class="fa-solid fa-globe"></i> Browser Push Notification</span>',
    replacement: '<span><i class="fa-solid fa-globe"></i> <span data-i18n="lblBrowserPush">Browser Push Notification</span></span>'
  },
  {
    target: '<span><i class="fa-solid fa-volume-high"></i> Acoustic Siren / Chime</span>',
    replacement: '<span><i class="fa-solid fa-volume-high"></i> <span data-i18n="lblAcousticSiren">Acoustic Siren / Chime</span></span>'
  },
  {
    target: '<span class="badge badge-success"><i class="fa-solid fa-circle-check"></i> Active Guard</span>',
    replacement: '<span class="badge badge-success"><i class="fa-solid fa-circle-check"></i> <span data-i18n="badgeActiveGuard">Active Guard</span></span>'
  },
  {
    target: '<h4><i class="fa-solid fa-shield-halved" style="color: var(--accent-primary);"></i> Authoritative Warning Standards & Emergency Helplines</h4>',
    replacement: '<h4><i class="fa-solid fa-shield-halved" style="color: var(--accent-primary);"></i> <span data-i18n="hdrWarningStandards">Authoritative Warning Standards & Emergency Helplines</span></h4>'
  },
  {
    target: '<h4><i class="fa-solid fa-hashtag" style="color: var(--accent-primary);"></i> Monitored Weather Tags</h4>',
    replacement: '<h4><i class="fa-solid fa-hashtag" style="color: var(--accent-primary);"></i> <span data-i18n="hdrMonitoredTags">Monitored Weather Tags</span></h4>'
  },
  {
    target: '<h4><i class="fa-solid fa-circle-info" style="color: var(--accent-primary);"></i> Ingestion Overview</h4>',
    replacement: '<h4><i class="fa-solid fa-circle-info" style="color: var(--accent-primary);"></i> <span data-i18n="hdrIngestionOverview">Ingestion Overview</span></h4>'
  },
  {
    target: '<h4><i class="fa-solid fa-shield-halved" style="color: var(--text-secondary);"></i> Privacy Notice</h4>',
    replacement: '<h4><i class="fa-solid fa-shield-halved" style="color: var(--text-secondary);"></i> <span data-i18n="hdrPrivacyNotice">Privacy Notice</span></h4>'
  },
  {
    target: '<h4><i class="fa-solid fa-shield-halved" style="color: var(--accent-primary);"></i> Data Provenance & Accreditation</h4>',
    replacement: '<h4><i class="fa-solid fa-shield-halved" style="color: var(--accent-primary);"></i> <span data-i18n="hdrDataProvenance">Data Provenance & Accreditation</span></h4>'
  },
  {
    target: '<span class="admin-portal-badge"><i class="fa-solid fa-shield-halved"></i> Authorized Console</span>',
    replacement: '<span class="admin-portal-badge"><i class="fa-solid fa-shield-halved"></i> <span data-i18n="adminAuthorizedConsole">Authorized Console</span></span>'
  },
  {
    target: '<span class="admin-live-pulse"><span class="pulse-dot"></span> Live Moderation Active</span>',
    replacement: '<span class="admin-live-pulse"><span class="pulse-dot"></span> <span data-i18n="adminLiveModeration">Live Moderation Active</span></span>'
  },
  {
    target: '<span class="admin-toolbar-label"><i class="fa-solid fa-screwdriver-wrench"></i> Tools:</span>',
    replacement: '<span class="admin-toolbar-label"><i class="fa-solid fa-screwdriver-wrench"></i> <span data-i18n="adminToolsLabel">Tools:</span></span>'
  },
  {
    target: '<label for="adminDateFrom"><i class="fa-solid fa-calendar-day"></i> Date Range</label>',
    replacement: '<label for="adminDateFrom"><i class="fa-solid fa-calendar-day"></i> <span data-i18n="adminLblDateRange">Date Range</span></label>'
  },
  {
    target: '<label for="adminFilterCategory"><i class="fa-solid fa-cloud-bolt"></i> Event Category</label>',
    replacement: '<label for="adminFilterCategory"><i class="fa-solid fa-cloud-bolt"></i> <span data-i18n="adminLblCategory">Event Category</span></label>'
  },
  {
    target: '<label for="adminFilterState"><i class="fa-solid fa-location-dot"></i> State / UT</label>',
    replacement: '<label for="adminFilterState"><i class="fa-solid fa-location-dot"></i> <span data-i18n="adminLblState">State / UT</span></label>'
  },
  {
    target: '<label for="adminFilterCity"><i class="fa-solid fa-city"></i> City / Landmark</label>',
    replacement: '<label for="adminFilterCity"><i class="fa-solid fa-city"></i> <span data-i18n="adminLblCity">City / Landmark</span></label>'
  },
  {
    target: '<label for="adminFilterStatus"><i class="fa-solid fa-list-check"></i> Verification Status</label>',
    replacement: '<label for="adminFilterStatus"><i class="fa-solid fa-list-check"></i> <span data-i18n="adminLblStatus">Verification Status</span></label>'
  },
  {
    target: '<label for="adminFilterFakeRisk"><i class="fa-solid fa-brain"></i> AI Credibility Risk</label>',
    replacement: '<label for="adminFilterFakeRisk"><i class="fa-solid fa-brain"></i> <span data-i18n="adminLblRisk">AI Credibility Risk</span></label>'
  },
  {
    target: '<label for="adminSearchInput"><i class="fa-solid fa-search"></i> Search Reports</label>',
    replacement: '<label for="adminSearchInput"><i class="fa-solid fa-search"></i> <span data-i18n="adminLblSearch">Search Reports</span></label>'
  },
  {
    target: '<label class="form-label" for="adminAlertCity" style="margin: 0;"><i class="fa-solid fa-city"></i> City / Region *</label>',
    replacement: '<label class="form-label" for="adminAlertCity" style="margin: 0;"><i class="fa-solid fa-city"></i> <span data-i18n="adminAlertCityLabel">City / Region *</span></label>'
  },
  {
    target: '<label class="form-label" for="adminAlertState"><i class="fa-solid fa-map"></i> State / UT *</label>',
    replacement: '<label class="form-label" for="adminAlertState"><i class="fa-solid fa-map"></i> <span data-i18n="adminAlertStateLabel">State / UT *</span></label>'
  },
  {
    target: '<span class="telemetry-pill"><i class="fa-solid fa-microchip"></i> Buffer: 100% QoS</span>',
    replacement: '<span class="telemetry-pill"><i class="fa-solid fa-microchip"></i> <span data-i18n="telBufferQos">Buffer: 100% QoS</span></span>'
  },
  {
    target: '<span class="telemetry-pill"><i class="fa-solid fa-database"></i> SQLite WAL Synchronized</span>',
    replacement: '<span class="telemetry-pill"><i class="fa-solid fa-database"></i> <span data-i18n="telSqliteWal">SQLite WAL Synchronized</span></span>'
  },
  {
    target: '<div style="font-size: 0.8rem; font-weight: 700; color: #10b981;"><i class="fa-solid fa-shield-halved"></i> Fault-Tolerance & Self-Healing</div>',
    replacement: '<div style="font-size: 0.8rem; font-weight: 700; color: #10b981;"><i class="fa-solid fa-shield-halved"></i> <span data-i18n="adminFaultTolerance">Fault-Tolerance & Self-Healing</span></div>'
  },
  {
    target: '<span><i class="fa-brands fa-docker"></i> Container & K8s Manifests Ready</span>',
    replacement: '<span><i class="fa-brands fa-docker"></i> <span data-i18n="adminK8sReady">Container & K8s Manifests Ready</span></span>'
  }
];

let replacedCount = 0;
specificReplacements.forEach(({ target, replacement }) => {
  if (html.includes(target)) {
    html = html.replace(target, replacement);
    replacedCount++;
  }
});

console.log(`Replaced ${replacedCount} elements in index.html`);
fs.writeFileSync('public/index.html', html, 'utf8');
