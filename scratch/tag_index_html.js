const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');
const originalLength = html.length;

// Define targeted replacements with clear before -> after
const replacements = [
  // 1. Sidebar brand & controls
  {
    from: '<div class="brand-tagline">National Weather Big Data Platform</div>',
    to: '<div class="brand-tagline" data-i18n="brandTagline">National Weather Big Data Platform</div>'
  },
  {
    from: '<button id="sidebarCollapseBtn" class="sidebar-collapse-btn" aria-label="Expand Sidebar" title="Expand Sidebar">',
    to: '<button id="sidebarCollapseBtn" class="sidebar-collapse-btn" aria-label="Expand Sidebar" title="Expand Sidebar" data-i18n-title="sidebarCollapseTitle">'
  },
  {
    from: '<button id="sidebarCloseBtn" class="sidebar-close-btn" aria-label="Close Navigation Menu" title="Close Navigation Menu">',
    to: '<button id="sidebarCloseBtn" class="sidebar-close-btn" aria-label="Close Navigation Menu" title="Close Navigation Menu" data-i18n-title="sidebarCloseTitle">'
  },
  // Sidebar sections & nav
  {
    from: '<div class="sidebar-section-title" data-i18n="secMeteorology">METEOROLOGY</div>',
    to: '<div class="sidebar-section-title" data-i18n="navMeteorology">METEOROLOGY</div>'
  },
  {
    from: '<button class="tab-btn active" data-tab="live-weather-view" title="Live Forecast & Map">',
    to: '<button class="tab-btn active" data-tab="live-weather-view" title="Live Forecast & Map" data-i18n-title="navLiveForecast">'
  },
  {
    from: '<button class="tab-btn" data-tab="weather-alerts-view" id="navWeatherAlertsBtn" title="Early Warning & Severe Weather Alerts">',
    to: '<button class="tab-btn" data-tab="weather-alerts-view" id="navWeatherAlertsBtn" title="Early Warning & Severe Weather Alerts" data-i18n-title="navWeatherAlerts">'
  },
  {
    from: '<button class="tab-btn" data-tab="citizen-reports-view" title="Citizen Reports">',
    to: '<button class="tab-btn" data-tab="citizen-reports-view" title="Citizen Reports" data-i18n-title="navCitizenReports">'
  },
  {
    from: '<button class="tab-btn" data-tab="social-stream-view" title="Social Intelligence">',
    to: '<button class="tab-btn" data-tab="social-stream-view" title="Social Intelligence" data-i18n-title="navSocialIntel">'
  },
  {
    from: '<button class="tab-btn" data-tab="analytics-view" title="Analytics & Trends">',
    to: '<button class="tab-btn" data-tab="analytics-view" title="Analytics & Trends" data-i18n-title="navAnalytics">'
  },
  {
    from: '<button class="tab-btn" data-tab="admin-panel-view" id="navAdminPanelBtn" title="Supervisory Admin & AI Moderation Panel">',
    to: '<button class="tab-btn" data-tab="admin-panel-view" id="navAdminPanelBtn" title="Supervisory Admin & AI Moderation Panel" data-i18n-title="navAdminPanel">'
  },
  {
    from: '<div class="sidebar-section-title" style="margin-top: 1rem;" data-i18n="secQuickActions">QUICK ACTIONS</div>',
    to: '<div class="sidebar-section-title" style="margin-top: 1rem;" data-i18n="navQuickActions">QUICK ACTIONS</div>'
  },
  {
    from: '<button class="quick-action-btn" type="button" title="Report Severe Event"',
    to: '<button class="quick-action-btn" type="button" title="Report Severe Event" data-i18n-title="navReportIncident"'
  },
  {
    from: '<button class="tab-btn" data-tab="official-reports-view" title="Download Official Reports">',
    to: '<button class="tab-btn" data-tab="official-reports-view" title="Download Official Reports" data-i18n-title="navDownloadReports">'
  },
  // Sidebar footer links
  {
    from: '<a href="/privacy.html" style="color: var(--sidebar-text-muted); text-decoration: none;">Privacy</a>',
    to: '<a href="/privacy.html" style="color: var(--sidebar-text-muted); text-decoration: none;" data-i18n="privacy">Privacy</a>'
  },
  {
    from: '<a href="/terms.html" style="color: var(--sidebar-text-muted); text-decoration: none;">Terms</a>',
    to: '<a href="/terms.html" style="color: var(--sidebar-text-muted); text-decoration: none;" data-i18n="terms">Terms</a>'
  },
  {
    from: '<a href="/empty.html" style="color: var(--sidebar-text-muted); text-decoration: none;">Archive</a>',
    to: '<a href="/empty.html" style="color: var(--sidebar-text-muted); text-decoration: none;" data-i18n="archive">Archive</a>'
  },

  // 2. Header
  {
    from: '<button id="mobileMenuToggleBtn" class="mobile-menu-toggle-btn" aria-label="Toggle Navigation Menu" title="Open Navigation Menu">',
    to: '<button id="mobileMenuToggleBtn" class="mobile-menu-toggle-btn" aria-label="Toggle Navigation Menu" title="Open Navigation Menu" data-i18n-title="menuToggleTitle">'
  },
  {
    from: 'placeholder="Search city, district, or Indian state..."',
    to: 'placeholder="Search city, district, or Indian state..." data-i18n-placeholder="searchPlaceholder"'
  },
  {
    from: '<button id="geoBtn" class="geo-btn" title="Use current GPS location">',
    to: '<button id="geoBtn" class="geo-btn" title="Use current GPS location" data-i18n-title="geoBtnTitle">'
  },
  {
    from: '<select id="stateSelect" class="custom-select" title="Select State / UT">',
    to: '<select id="stateSelect" class="custom-select" title="Select State / UT" data-i18n-title="stateSelectDefault">'
  },
  {
    from: '<option value="">State / UT</option>',
    to: '<option value="" data-i18n="stateSelectDefault">State / UT</option>'
  },
  {
    from: '<select id="citySelect" class="custom-select" title="Select District / City">',
    to: '<select id="citySelect" class="custom-select" title="Select District / City" data-i18n-title="citySelectDefault">'
  },
  {
    from: '<option value="">City</option>',
    to: '<option value="" data-i18n="citySelectDefault">City</option>'
  },
  {
    from: '<button id="refreshBtn" class="action-btn" title="Fetch fresh weather data">',
    to: '<button id="refreshBtn" class="action-btn" title="Fetch fresh weather data" data-i18n-title="refreshTitle">'
  },
  {
    from: '<span>Refresh</span>',
    to: '<span data-i18n="btnRefresh">Refresh</span>'
  },
  {
    from: '<button id="openReportModalBtn" class="action-btn incident-btn" title="Submit Citizen Weather Report">',
    to: '<button id="openReportModalBtn" class="action-btn incident-btn" title="Submit Citizen Weather Report" data-i18n-title="reportIncidentTitle">'
  },
  {
    from: '<span class="action-btn-text">Report Incident</span>',
    to: '<span class="action-btn-text" data-i18n="btnReportIncident">Report Incident</span>'
  },
  {
    from: '<button id="topNavAdminBtn" class="action-btn admin-btn" title="Open Admin Portal">',
    to: '<button id="topNavAdminBtn" class="action-btn admin-btn" title="Open Admin Portal" data-i18n-title="adminPortalTitle">'
  },
  {
    from: '<span class="action-btn-text">Admin Portal</span>',
    to: '<span class="action-btn-text" data-i18n="btnAdminPortal">Admin Portal</span>'
  },
  {
    from: '<div class="header-clock-pill" id="headerClockPill" title="Indian Standard Time (UTC+05:30)">',
    to: '<div class="header-clock-pill" id="headerClockPill" title="Indian Standard Time (UTC+05:30)" data-i18n-title="istClockTitle">'
  },
  {
    from: '<div class="modern-lang-dropdown" id="modernLangDropdown" title="Select Platform Language">',
    to: '<div class="modern-lang-dropdown" id="modernLangDropdown" title="Select Platform Language" data-i18n-title="langDropdownTitle">'
  },

  // 3. Live Weather Hero & Controls
  {
    from: '<button id="voiceBriefBtn" class="voice-brief-btn" title="Listen to weather summary">',
    to: '<button id="voiceBriefBtn" class="voice-brief-btn" title="Listen to weather summary" data-i18n-title="audioSummaryTitle">'
  },
  {
    from: '<div class="hero-pill-badge" id="heroDewPointPill" title="Atmospheric Dew Point">',
    to: '<div class="hero-pill-badge" id="heroDewPointPill" title="Atmospheric Dew Point" data-i18n-title="dewPointTitle">'
  },
  {
    from: '<div class="hero-pill-badge" id="heroRainChancePill" title="Precipitation Probability">',
    to: '<div class="hero-pill-badge" id="heroRainChancePill" title="Precipitation Probability" data-i18n-title="rainChanceTitle">'
  },
  {
    from: '<div class="hero-pill-badge" id="heroAqiPill" title="Air Quality Index Status">',
    to: '<div class="hero-pill-badge" id="heroAqiPill" title="Air Quality Index Status" data-i18n-title="aqiTitle">'
  },
  {
    from: '<div class="hero-pill-badge" id="heroFeedSourceBadge" title="Observational Data Feed">',
    to: '<div class="hero-pill-badge" id="heroFeedSourceBadge" title="Observational Data Feed" data-i18n-title="lblStationObs">'
  },
  {
    from: '<span>Observational Data Feed</span>',
    to: '<span data-i18n="lblStationObs">Observational Data Feed</span>'
  },

  // 4. Map & Diurnal
  {
    from: '<button id="mapFullscreenBtn" class="map-ctrl-btn" title="Toggle Fullscreen">',
    to: '<button id="mapFullscreenBtn" class="map-ctrl-btn" title="Toggle Fullscreen" data-i18n-title="mapFullscreenTitle">'
  },
  {
    from: '<span class="chart-subtitle" data-i18n="forecastSub">NWA Machine Learning NWP-MOS Model calibrated with localized station telemetry</span>',
    to: '<p class="chart-subtitle" data-i18n="forecastSub">NWA Machine Learning NWP-MOS Model calibrated with localized station telemetry</p>'
  },
  {
    from: '<button id="exportCsvBtn" class="chart-action-btn" title="Export forecast data to CSV">',
    to: '<button id="exportCsvBtn" class="chart-action-btn" title="Export forecast data to CSV" data-i18n-title="forecastBtnDownloadTitle">'
  },
  {
    from: '<i class="fa-solid fa-file-excel"></i> Download Excel',
    to: '<i class="fa-solid fa-file-excel"></i> <span data-i18n="forecastBtnDownload">Download Excel</span>'
  },

  // 5. Weather Alerts View
  {
    from: '<span class="category-badge">NATIONAL WEATHER SURVEILLANCE &amp; EARLY WARNING</span>',
    to: '<span class="category-badge" data-i18n="alertsBadge">NATIONAL WEATHER SURVEILLANCE & EARLY WARNING</span>'
  },
  {
    from: '<h2 class="section-title">Active Severe Weather Warnings &amp; Personal Alert Hub</h2>',
    to: '<h2 class="section-title" data-i18n="alertsTitle">Active Severe Weather Warnings & Personal Alert Hub</h2>'
  },
  {
    from: '<p class="section-subtitle">Surveillance of all geographical areas highly affected by intense monsoon downpours, severe heatwaves, cyclonic depressions, and flash floods across India. Set personalized early-warning alerts for your region.</p>',
    to: '<p class="section-subtitle" data-i18n="alertsSub">Surveillance of all geographical areas highly affected by intense monsoon downpours, severe heatwaves, cyclonic depressions, and flash floods across India. Set personalized early-warning alerts for your region.</p>'
  },
  {
    from: '<button id="dispatchAlertModalBtn" class="alert-dispatch-open-btn" title="Emergency Weather Desk: Dispatch National Weather Warning">',
    to: '<button id="dispatchAlertModalBtn" class="alert-dispatch-open-btn" title="Emergency Weather Desk: Dispatch National Weather Warning" data-i18n-title="btnDispatchAgencyTitle">'
  },
  {
    from: '<i class="fa-solid fa-bullhorn"></i> Dispatch Agency Alert',
    to: '<i class="fa-solid fa-bullhorn"></i> <span data-i18n="btnDispatchAgency">Dispatch Agency Alert</span>'
  },
  {
    from: '<button id="testAudioSirenBtn" class="alert-siren-test-btn" title="Simulate alert with sound siren and push notification">',
    to: '<button id="testAudioSirenBtn" class="alert-siren-test-btn" title="Simulate alert with sound siren and push notification" data-i18n-title="btnTestAudioPushTitle">'
  },
  {
    from: '<i class="fa-solid fa-volume-high"></i> Test Alert Audio &amp; Push',
    to: '<i class="fa-solid fa-volume-high"></i> <span data-i18n="btnTestAudioPush">Test Alert Audio & Push</span>'
  },
  {
    from: '<button id="refreshAlertsBtn" class="alerts-action-btn" title="Refresh national weather warnings">',
    to: '<button id="refreshAlertsBtn" class="alerts-action-btn" title="Refresh national weather warnings" data-i18n-title="btnRefreshWarningsTitle">'
  },
  {
    from: '<i class="fa-solid fa-arrows-rotate"></i> Refresh Warnings',
    to: '<i class="fa-solid fa-arrows-rotate"></i> <span data-i18n="btnRefreshWarnings">Refresh Warnings</span>'
  },
  {
    from: '<span>Set Personal Weather Alert</span>',
    to: '<span data-i18n="personalAlertTitle">Set Personal Weather Alert</span>'
  },
  {
    from: '<span class="status-badge live">Automated Monitor</span>',
    to: '<span class="status-badge live" data-i18n="personalAlertBadge">Automated Monitor</span>'
  },
  {
    from: '<p class="panel-card-sub">Configure an automated trigger for your area. The platform monitors real-time telemetry and sends instant browser notifications and audio sirens when dangerous weather thresholds are reached.</p>',
    to: '<p class="panel-card-sub" data-i18n="personalAlertDesc">Configure an automated trigger for your area. The platform monitors real-time telemetry and sends instant browser notifications and audio sirens when dangerous weather thresholds are reached.</p>'
  },
  {
    from: '<label for="alertCityInput">Monitored Location / City</label>',
    to: '<label for="alertCityInput" data-i18n="lblMonitoredLocation">Monitored Location / City</label>'
  },
  {
    from: '<button type="button" id="alertGpsBtn" class="geo-input-btn" title="Use Current Device GPS Location">',
    to: '<button type="button" id="alertGpsBtn" class="geo-input-btn" title="Use Current Device GPS Location" data-i18n-title="btnCurrentGPSTitle">'
  },
  {
    from: '<i class="fa-solid fa-location-crosshairs"></i> Current GPS',
    to: '<i class="fa-solid fa-location-crosshairs"></i> <span data-i18n="btnCurrentGPS">Current GPS</span>'
  },
  {
    from: '<label for="alertHazardType">Weather Hazard Trigger</label>',
    to: '<label for="alertHazardType" data-i18n="lblHazardTrigger">Weather Hazard Trigger</label>'
  },
  {
    from: '<option value="rain">Torrential / Heavy Rain (mm/h)</option>',
    to: '<option value="rain" data-i18n="optHeavyRain">Torrential / Heavy Rain (mm/h)</option>'
  },
  {
    from: '<option value="heat">Extreme Heatwave (°C)</option>',
    to: '<option value="heat" data-i18n="optHeatwave">Extreme Heatwave (°C)</option>'
  },
  {
    from: '<option value="wind">Severe Cyclone / Gale (km/h)</option>',
    to: '<option value="wind" data-i18n="optCyclone">Severe Cyclone / Gale (km/h)</option>'
  },
  {
    from: '<option value="flood">Flash Flood Inundation (m)</option>',
    to: '<option value="flood" data-i18n="optFlashFlood">Flash Flood Inundation (m)</option>'
  },
  {
    from: '<option value="fog">Dense Fog Visibility (&lt;m)</option>',
    to: '<option value="fog" data-i18n="optDenseFog">Dense Fog Visibility (&lt;m)</option>'
  },
  {
    from: '<option value="thunder">Severe Thunderstorm / Lightning</option>',
    to: '<option value="thunder" data-i18n="optThunderstorm">Severe Thunderstorm / Lightning</option>'
  },
  {
    from: '<label for="alertThreshold">Custom Hazard Threshold Value</label>',
    to: '<label for="alertThreshold" data-i18n="lblThresholdValue">Custom Hazard Threshold Value</label>'
  },
  {
    from: '<label for="alertSoundSelect">Siren Audio Tone</label>',
    to: '<label for="alertSoundSelect" data-i18n="lblSirenTone">Siren Audio Tone</label>'
  },
  {
    from: '<option value="eas_broadcast">Emergency Warble (High Urgency)</option>',
    to: '<option value="eas_broadcast" data-i18n="optSirenWarble">Emergency Warble (High Urgency)</option>'
  },
  {
    from: '<option value="disaster_siren">Meteorological Siren (Continuous)</option>',
    to: '<option value="disaster_siren" data-i18n="optSirenContinuous">Meteorological Siren (Continuous)</option>'
  },
  {
    from: '<option value="advisory_bell">Standard Chime Alert</option>',
    to: '<option value="advisory_bell" data-i18n="optSirenChime">Standard Chime Alert</option>'
  },
  {
    from: '<option value="sonar_ping">Low Frequency Warning</option>',
    to: '<option value="sonar_ping" data-i18n="optSirenLowFreq">Low Frequency Warning</option>'
  },
  {
    from: '<label>Alert Delivery Channels</label>',
    to: '<label data-i18n="lblDeliveryChannels">Alert Delivery Channels</label>'
  },
  {
    from: '<span class="checkbox-label-text">Browser Push Notification</span>',
    to: '<span class="checkbox-label-text" data-i18n="chkBrowserPush">Browser Push Notification</span>'
  },
  {
    from: '<span class="checkbox-label-text">Loud Siren Audio Tone</span>',
    to: '<span class="checkbox-label-text" data-i18n="chkSirenAudio">Loud Siren Audio Tone</span>'
  },
  {
    from: '<button type="button" id="previewSirenBtn" class="secondary-btn" title="Preview selected audio tone">',
    to: '<button type="button" id="previewSirenBtn" class="secondary-btn" title="Preview selected audio tone" data-i18n-title="btnTestSirenTitle">'
  },
  {
    from: '<i class="fa-solid fa-play"></i> Test Siren Tone',
    to: '<i class="fa-solid fa-play"></i> <span data-i18n="btnTestSiren">Test Siren Tone</span>'
  },
  {
    from: '<i class="fa-solid fa-bell"></i> Save &amp; Enable Alert Trigger',
    to: '<i class="fa-solid fa-bell"></i> <span data-i18n="btnSaveAlert">Save & Enable Alert Trigger</span>'
  },
  {
    from: '<h3 class="panel-card-title">Active Meteorological Warnings Across India</h3>',
    to: '<h3 class="panel-card-title" data-i18n="activeWarningsHeading">Active Meteorological Warnings Across India</h3>'
  },
  {
    from: '<button class="filter-pill active" data-severity="all">All Severity Levels</button>',
    to: '<button class="filter-pill active" data-severity="all" data-i18n="filterAllSeverity">All Severity Levels</button>'
  },
  {
    from: '<button class="filter-pill" data-severity="red">Red Alert (Severe)</button>',
    to: '<button class="filter-pill" data-severity="red" data-i18n="filterRedAlert">Red Alert (Severe)</button>'
  },
  {
    from: '<button class="filter-pill" data-severity="orange">Orange Alert (Moderate)</button>',
    to: '<button class="filter-pill" data-severity="orange" data-i18n="filterOrangeAlert">Orange Alert (Moderate)</button>'
  },
  {
    from: '<button class="filter-pill" data-severity="yellow">Yellow Watch (Advisory)</button>',
    to: '<button class="filter-pill" data-severity="yellow" data-i18n="filterYellowWatch">Yellow Watch (Advisory)</button>'
  },

  // 6. Citizen Reports View
  {
    from: '<h2 class="section-title">Crowd Reports &amp; Verification Queue</h2>',
    to: '<h2 class="section-title" data-i18n="reportsQueueTitle">Citizen Weather Reports</h2>'
  },
  {
    from: '<button class="action-btn report-btn" onclick="openReportModal()">',
    to: '<button class="action-btn report-btn" onclick="openReportModal()" data-i18n-title="reportIncidentTitle">'
  },
  {
    from: '<i class="fa-solid fa-bullhorn"></i> Report Severe Event',
    to: '<i class="fa-solid fa-bullhorn"></i> <span data-i18n="btnReportEvent">Report Severe Event</span>'
  },
  {
    from: '<button class="filter-tab active" data-filter="all">All Reports</button>',
    to: '<button class="filter-tab active" data-filter="all" data-i18n="tabAllReports">All Reports</button>'
  },
  {
    from: '<button class="filter-tab" data-filter="pending">Pending Verification</button>',
    to: '<button class="filter-tab" data-filter="pending" data-i18n="tabPendingVerif">Pending Verification</button>'
  },
  {
    from: '<button class="filter-tab" data-filter="verified">Verified</button>',
    to: '<button class="filter-tab" data-filter="verified" data-i18n="tabVerified">Verified</button>'
  },

  // 7. Social Stream View
  {
    from: '<span class="category-badge">MULTI-PLATFORM WEATHER INTELLIGENCE STREAM</span>',
    to: '<span class="category-badge" data-i18n="socialBadge">MULTI-PLATFORM WEATHER INTELLIGENCE STREAM</span>'
  },
  {
    from: '<h2 class="section-title">Social Intelligence Feed</h2>',
    to: '<h2 class="section-title" data-i18n="socialTitle">Social Intelligence Feed</h2>'
  },
  {
    from: '<button id="triggerSocialIngestionBtn" class="stream-trigger-btn" title="Trigger Live Ingestion from Google News, GDACS &amp; Social API">',
    to: '<button id="triggerSocialIngestionBtn" class="stream-trigger-btn" title="Trigger Live Ingestion from Google News, GDACS & Social API" data-i18n-title="btnFetchSignalsTitle">'
  },
  {
    from: '<i class="fa-solid fa-satellite-dish"></i> Fetch Live Signals',
    to: '<i class="fa-solid fa-satellite-dish"></i> <span data-i18n="btnFetchSignals">Fetch Live Signals</span>'
  },
  {
    from: '<i class="fa-solid fa-arrows-rotate"></i> Refresh Feed',
    to: '<i class="fa-solid fa-arrows-rotate"></i> <span data-i18n="btnRefreshSocial">Refresh Feed</span>'
  },
  {
    from: '<span class="status-badge live">MULTI-SOURCE INGESTION ACTIVE</span>',
    to: '<span class="status-badge live" data-i18n="badgeIngestionActive">MULTI-SOURCE INGESTION ACTIVE</span>'
  },
  {
    from: '<button class="platform-filter-pill active" data-platform="all">All Platforms</button>',
    to: '<button class="platform-filter-pill active" data-platform="all" data-i18n="filterPlatformAll">All Platforms</button>'
  },
  {
    from: '<button class="platform-filter-pill" data-platform="gdacs">UN GDACS Disaster Alerts</button>',
    to: '<button class="platform-filter-pill" data-platform="gdacs" data-i18n="filterPlatformGDACS">UN GDACS Disaster Alerts</button>'
  },
  {
    from: '<button class="platform-filter-pill" data-platform="gnews">Google News RSS</button>',
    to: '<button class="platform-filter-pill" data-platform="gnews" data-i18n="filterPlatformGoogleNews">Google News RSS</button>'
  },
  {
    from: '<button class="platform-filter-pill" data-platform="twitter">X / Twitter (API v2)</button>',
    to: '<button class="platform-filter-pill" data-platform="twitter" data-i18n="filterPlatformTwitter">X / Twitter (API v2)</button>'
  },
  {
    from: '<button class="platform-filter-pill" data-platform="instagram">Instagram Weather</button>',
    to: '<button class="platform-filter-pill" data-platform="instagram" data-i18n="filterPlatformInstagram">Instagram Weather</button>'
  },
  {
    from: '<button class="platform-filter-pill" data-platform="imd">IMD RSS Bulletin</button>',
    to: '<button class="platform-filter-pill" data-platform="imd" data-i18n="filterPlatformIMD">IMD RSS Bulletin</button>'
  },
  {
    from: '<h3 class="panel-card-title">Monitored Weather Tags</h3>',
    to: '<h3 class="panel-card-title" data-i18n="monitoredTagsTitle">Monitored Weather Tags</h3>'
  },
  {
    from: '<p class="panel-card-sub">Live crawling active for meteorological and disaster keywords</p>',
    to: '<p class="panel-card-sub" data-i18n="monitoredTagsDesc">Live crawling active for meteorological and disaster keywords</p>'
  },
  {
    from: '<h3 class="panel-card-title">Ingestion Overview</h3>',
    to: '<h3 class="panel-card-title" data-i18n="ingestionOverviewTitle">Ingestion Overview</h3>'
  },
  {
    from: '<span class="ingestion-stat-name">Stream Health</span>',
    to: '<span class="ingestion-stat-name" data-i18n="lblStreamHealth">Stream Health</span>'
  },
  {
    from: '<span class="ingestion-stat-name">Active Rate</span>',
    to: '<span class="ingestion-stat-name" data-i18n="lblActiveRate">Active Rate</span>'
  },
  {
    from: '<span class="ingestion-stat-name">Sentiment Engine</span>',
    to: '<span class="ingestion-stat-name" data-i18n="lblSentimentEngine">Sentiment Engine</span>'
  },
  {
    from: '<span class="ingestion-stat-name">Spam Filter</span>',
    to: '<span class="ingestion-stat-name" data-i18n="lblSpamFilter">Spam Filter</span>'
  },

  // 8. Analytics View
  {
    from: '<h2 class="section-title">National Weather Analytics</h2>',
    to: '<h2 class="section-title" data-i18n="analyticsTitle">Analytics & Trends</h2>'
  },
  {
    from: '<p class="section-subtitle">Real-time meteorological intelligence from citizen reports, social streams &amp; national stations</p>',
    to: '<p class="section-subtitle" data-i18n="analyticsSub">Real-time meteorological intelligence from citizen reports, social streams & national stations</p>'
  },
  {
    from: '<button id="refreshAnalyticsBtn" class="refresh-btn" title="Refresh analytics data">',
    to: '<button id="refreshAnalyticsBtn" class="refresh-btn" title="Refresh analytics data" data-i18n-title="btnRefreshAnalyticsTitle">'
  },
  {
    from: '<i class="fa-solid fa-arrows-rotate"></i> Refresh Data',
    to: '<i class="fa-solid fa-arrows-rotate"></i> <span data-i18n="btnRefreshAnalytics">Refresh Data</span>'
  },
  {
    from: '<div class="stat-label">Total Monitored Events</div>',
    to: '<div class="stat-label" data-i18n="statMonitoredEvents">Total Monitored Events</div>'
  },
  {
    from: '<div class="stat-label">Citizen Field Reports</div>',
    to: '<div class="stat-label" data-i18n="statCitizenReports">Citizen Field Reports</div>'
  },
  {
    from: '<div class="stat-label">Social Advisory Signals</div>',
    to: '<div class="stat-label" data-i18n="statSocialSignals">Social Advisory Signals</div>'
  },
  {
    from: '<div class="stat-label">Data Verification Rate</div>',
    to: '<div class="stat-label" data-i18n="statVerifRate">Data Verification Rate</div>'
  },
  {
    from: '<span>Weather Event Breakdown by Category</span>',
    to: '<span data-i18n="chartCategoryBreakdown">Weather Event Breakdown by Category</span>'
  },
  {
    from: '<span>Event Frequency by Indian State</span>',
    to: '<span data-i18n="chartStateFrequency">Event Frequency by Indian State</span>'
  },
  {
    from: '<span>Regional Weather Station Observations</span>',
    to: '<span data-i18n="chartRegionalStations">Regional Weather Station Observations</span>'
  },
  {
    from: '<span>Live Meteorological Feed</span>',
    to: '<span data-i18n="chartLiveFeed">Live Meteorological Feed</span>'
  },

  // 9. Official Reports View
  {
    from: '<h2 class="section-title">Official Meteorological Intelligence Report</h2>',
    to: '<h2 class="section-title" data-i18n="docReportTitle">Official Meteorological Intelligence Report</h2>'
  },
  {
    from: '<p class="section-subtitle">Verified atmospheric snapshot, 4-day predictive window, and station telemetry formatted for administrative documentation, engineering, and civil preparedness.</p>',
    to: '<p class="section-subtitle" data-i18n="docReportSub">Verified atmospheric snapshot, 4-day predictive window, and station telemetry formatted for administrative documentation, engineering, and civil preparedness.</p>'
  },
  {
    from: '<i class="fa-solid fa-file-excel"></i> Download Excel (.xlsx)',
    to: '<i class="fa-solid fa-file-excel"></i> <span data-i18n="btnDownloadExcel">Download Excel (.xlsx)</span>'
  },
  {
    from: '<i class="fa-solid fa-file-pdf"></i> Download PDF (.pdf)',
    to: '<i class="fa-solid fa-file-pdf"></i> <span data-i18n="btnDownloadPdf">Download PDF (.pdf)</span>'
  },
  {
    from: '<i class="fa-solid fa-print"></i> Print Report',
    to: '<i class="fa-solid fa-print"></i> <span data-i18n="btnPrintReport">Print Report</span>'
  },
  {
    from: '<div class="doc-status-badge"><i class="fa-solid fa-circle-check"></i> Document Ready</div>',
    to: '<div class="doc-status-badge"><i class="fa-solid fa-circle-check"></i> <span data-i18n="badgeDocReady">Document Ready</span></div>'
  },
  {
    from: '<h4 class="report-table-heading">1. Current Surface Meteorological Observations</h4>',
    to: '<h4 class="report-table-heading" data-i18n="docTable1Title">1. Current Surface Meteorological Observations</h4>'
  },
  {
    from: '<th style="width: 25%;">Meteorological Parameter</th>',
    to: '<th style="width: 25%;" data-i18n="thParam">Meteorological Parameter</th>'
  },
  {
    from: '<th style="width: 25%;">Recorded Value</th>',
    to: '<th style="width: 25%;" data-i18n="thValue">Recorded Value</th>'
  },
  {
    from: '<th style="width: 50%;">Sensor &amp; Observation Remarks</th>',
    to: '<th style="width: 50%;" data-i18n="thRemarks">Sensor & Observation Remarks</th>'
  },
  {
    from: '<h4 class="report-table-heading" style="margin-top: 1.5rem;">2. 4-Day Forward Forecast Outlook</h4>',
    to: '<h4 class="report-table-heading" style="margin-top: 1.5rem;" data-i18n="docTable2Title">2. 4-Day Forward Forecast Outlook</h4>'
  },
  {
    from: '<th>Day / Date</th>',
    to: '<th data-i18n="thDayDate">Day / Date</th>'
  },
  {
    from: '<th>Forecast Condition</th>',
    to: '<th data-i18n="thCondition">Forecast Condition</th>'
  },
  {
    from: '<th>Expected Min / Max</th>',
    to: '<th data-i18n="thTempMinMax">Expected Min / Max</th>'
  },
  {
    from: '<th>Precipitation Probability</th>',
    to: '<th data-i18n="thPrecipProb">Precipitation Probability</th>'
  },
  {
    from: '<th>Operational Advisory</th>',
    to: '<th data-i18n="thAdvisory">Operational Advisory</th>'
  },

  // 10. Admin Panel View
  {
    from: '<span class="category-badge">NWA SECURITY ACCESS</span>',
    to: '<span class="category-badge" data-i18n="adminSecBadge">NWA SECURITY ACCESS</span>'
  },
  {
    from: '<h2 class="section-title">Admin Portal Login</h2>',
    to: '<h2 class="section-title" data-i18n="adminLoginTitle">Admin Portal Login</h2>'
  },
  {
    from: '<p class="section-subtitle">Please enter your administrative credentials to access the moderation queue, verification controls, and AI audit telemetry.</p>',
    to: '<p class="section-subtitle" data-i18n="adminLoginSub">Please enter your administrative credentials to access the moderation queue, verification controls, and AI audit telemetry.</p>'
  },
  {
    from: '<label for="adminAuthPassword">Admin Password</label>',
    to: '<label for="adminAuthPassword" data-i18n="lblAdminPassword">Admin Password</label>'
  },
  {
    from: 'placeholder="Enter password (default: admin@imd2026)"',
    to: 'placeholder="Enter password (default: admin@imd2026)" data-i18n-placeholder="adminPasswordPh"'
  },
  {
    from: '<i class="fa-solid fa-right-to-bracket"></i> Log In to Admin Portal',
    to: '<i class="fa-solid fa-right-to-bracket"></i> <span data-i18n="btnLoginAdmin">Log In to Admin Portal</span>'
  },
  {
    from: '<span class="badge auth-badge"><i class="fa-solid fa-shield-halved"></i> Authorized Console</span>',
    to: '<span class="badge auth-badge"><i class="fa-solid fa-shield-halved"></i> <span data-i18n="badgeAuthConsole">Authorized Console</span></span>'
  },
  {
    from: '<span class="badge live-badge"><i class="fa-solid fa-circle-dot"></i> Live Moderation Active</span>',
    to: '<span class="badge live-badge"><i class="fa-solid fa-circle-dot"></i> <span data-i18n="badgeLiveModeration">Live Moderation Active</span></span>'
  },
  {
    from: '<h2 class="section-title">Supervisory Command &amp; Control Panel</h2>',
    to: '<h2 class="section-title" data-i18n="adminDashboardTitle">Supervisory Command & Control Panel</h2>'
  },
  {
    from: '<p class="section-subtitle">Central operational dashboard to review incoming citizen weather reports, analyze AI credibility scores, resolve duplicate clusters, and verify official meteorological observations.</p>',
    to: '<p class="section-subtitle" data-i18n="adminDashboardSub">Central operational dashboard to review incoming citizen weather reports, analyze AI credibility scores, resolve duplicate clusters, and verify official meteorological observations.</p>'
  },
  {
    from: '<span class="admin-badge"><i class="fa-solid fa-user-check"></i> Master Admin</span>',
    to: '<span class="admin-badge"><i class="fa-solid fa-user-check"></i> <span data-i18n="badgeMasterAdmin">Master Admin</span></span>'
  },
  {
    from: '<button id="adminLogoutBtn" class="admin-tool-btn logout" title="Log out from admin session">',
    to: '<button id="adminLogoutBtn" class="admin-tool-btn logout" title="Log out from admin session" data-i18n-title="btnLogoutTitle">'
  },
  {
    from: '<i class="fa-solid fa-right-from-bracket"></i> Logout',
    to: '<i class="fa-solid fa-right-from-bracket"></i> <span data-i18n="btnLogout">Logout</span>'
  },
  {
    from: '<span class="tools-label">Tools:</span>',
    to: '<span class="tools-label" data-i18n="lblTools">Tools:</span>'
  },
  {
    from: '<button id="triggerDedupBtn" class="admin-tool-btn" title="Scan and consolidate duplicate event clusters">',
    to: '<button id="triggerDedupBtn" class="admin-tool-btn" title="Scan and consolidate duplicate event clusters" data-i18n-title="btnDedupTitle">'
  },
  {
    from: '<i class="fa-solid fa-object-ungroup"></i> Deduplicate Reports',
    to: '<i class="fa-solid fa-object-ungroup"></i> <span data-i18n="btnDedup">Deduplicate Reports</span>'
  },
  {
    from: '<button id="exportAdminCsvBtn" class="admin-tool-btn" title="Export filtered audit table as CSV">',
    to: '<button id="exportAdminCsvBtn" class="admin-tool-btn" title="Export filtered audit table as CSV" data-i18n-title="btnExportCsvTitle">'
  },
  {
    from: '<i class="fa-solid fa-download"></i> Export CSV',
    to: '<i class="fa-solid fa-download"></i> <span data-i18n="btnExportCsv">Export CSV</span>'
  },
  {
    from: '<button id="refreshAdminBtn" class="admin-tool-btn" title="Refresh admin queue">',
    to: '<button id="refreshAdminBtn" class="admin-tool-btn" title="Refresh admin queue" data-i18n-title="btnRefreshQueueTitle">'
  },
  {
    from: '<i class="fa-solid fa-arrows-rotate"></i> Refresh Queue',
    to: '<i class="fa-solid fa-arrows-rotate"></i> <span data-i18n="btnRefreshQueue">Refresh Queue</span>'
  },

  // 11. Modals
  {
    from: '<h3 class="modal-title">Submit Citizen Weather Report</h3>',
    to: '<h3 class="modal-title" data-i18n="modalReportTitle">Submit Citizen Weather Report</h3>'
  },
  {
    from: '<p class="modal-subtitle">Crowdsourced weather intelligence with automated AI authenticity scoring</p>',
    to: '<p class="modal-subtitle" data-i18n="modalReportSub">Crowdsourced weather intelligence with automated AI authenticity scoring</p>'
  },
  {
    from: '<label for="reportCategory">Weather Hazard Category *</label>',
    to: '<label for="reportCategory" data-i18n="lblHazardCategory">Weather Hazard Category</label>'
  },
  {
    from: '<option value="Heavy Rain / Flood">Heavy Rain / Flood</option>',
    to: '<option value="Heavy Rain / Flood" data-i18n="optCatHeavyRain">Heavy Rain / Flood</option>'
  },
  {
    from: '<option value="Severe Thunderstorm">Severe Thunderstorm</option>',
    to: '<option value="Severe Thunderstorm" data-i18n="optCatThunderstorm">Severe Thunderstorm</option>'
  },
  {
    from: '<option value="Waterlogging">Waterlogging</option>',
    to: '<option value="Waterlogging" data-i18n="optCatWaterlogging">Waterlogging</option>'
  },
  {
    from: '<option value="Heatwave">Heatwave</option>',
    to: '<option value="Heatwave" data-i18n="optCatHeatwave">Heatwave</option>'
  },
  {
    from: '<option value="Coldwave">Coldwave</option>',
    to: '<option value="Coldwave" data-i18n="optCatColdwave">Coldwave</option>'
  },
  {
    from: '<option value="Tropical Cyclone">Tropical Cyclone</option>',
    to: '<option value="Tropical Cyclone" data-i18n="optCatCyclone">Tropical Cyclone</option>'
  },
  {
    from: '<option value="Hailstorm">Hailstorm</option>',
    to: '<option value="Hailstorm" data-i18n="optCatHailstorm">Hailstorm</option>'
  },
  {
    from: '<option value="Landslide">Landslide</option>',
    to: '<option value="Landslide" data-i18n="optCatLandslide">Landslide</option>'
  },
  {
    from: '<option value="Cloudburst">Cloudburst</option>',
    to: '<option value="Cloudburst" data-i18n="optCatCloudburst">Cloudburst</option>'
  },
  {
    from: '<label for="reportLocation">Location / Landmark *</label>',
    to: '<label for="reportLocation" data-i18n="lblReportLocation">Location / Landmark</label>'
  },
  {
    from: 'placeholder="e.g., Marine Drive, Churchgate"',
    to: 'placeholder="e.g., Marine Drive, Churchgate" data-i18n-placeholder="locationPh"'
  },
  {
    from: '<label for="reportLat">Latitude *</label>',
    to: '<label for="reportLat" data-i18n="lblLatitude">Latitude</label>'
  },
  {
    from: '<label for="reportLon">Longitude *</label>',
    to: '<label for="reportLon" data-i18n="lblLongitude">Longitude</label>'
  },
  {
    from: '<label for="reportDescription">Description &amp; Impact *</label>',
    to: '<label for="reportDescription" data-i18n="lblDescription">Description & Impact</label>'
  },
  {
    from: 'placeholder="Describe water levels, road blocks, tree falls, wind damage, or severe conditions..."',
    to: 'placeholder="Describe water levels, road blocks, tree falls, wind damage, or severe conditions..." data-i18n-placeholder="descPh"'
  },
  {
    from: '<label for="reportImage">Attach Photo / Evidence</label>',
    to: '<label for="reportImage" data-i18n="lblAttachPhoto">Attach Photo / Evidence</label>'
  },
  {
    from: '<label for="reportVideo">Video / Live Stream URL (Optional)</label>',
    to: '<label for="reportVideo" data-i18n="lblVideoUrl">Video / Live Stream URL (Optional)</label>'
  },
  {
    from: 'placeholder="e.g., https://youtu.be/... or video stream URL"',
    to: 'placeholder="e.g., https://youtu.be/... or video stream URL" data-i18n-placeholder="videoUrlPh"'
  },
  {
    from: '<label for="reportName">Your Name / Organization</label>',
    to: '<label for="reportName" data-i18n="lblReporterName">Your Name / Organization</label>'
  },
  {
    from: 'placeholder="e.g., Rohit Verma"',
    to: 'placeholder="e.g., Rohit Verma" data-i18n-placeholder="reporterNamePh"'
  },
  {
    from: '<i class="fa-solid fa-paper-plane"></i> Submit Verified Report',
    to: '<i class="fa-solid fa-paper-plane"></i> <span data-i18n="btnSubmitReport">Submit Verified Report</span>'
  },
  {
    from: '<button type="button" class="btn-cancel" onclick="closeReportModal()">Cancel</button>',
    to: '<button type="button" class="btn-cancel" onclick="closeReportModal()" data-i18n="btnCancel">Cancel</button>'
  },

  // Alert Dispatch Modal
  {
    from: '<h3 class="modal-title">Dispatch Official Meteorological Warning</h3>',
    to: '<h3 class="modal-title" data-i18n="modalDispatchTitle">Dispatch Official Meteorological Warning</h3>'
  },
  {
    from: '<p class="modal-subtitle">Issue an authoritative early-warning bulletin across emergency channels and public displays.</p>',
    to: '<p class="modal-subtitle" data-i18n="modalDispatchSub">Issue an authoritative early-warning bulletin across emergency channels and public displays.</p>'
  },
  {
    from: '<label for="dispatchRegion">Target State / Region</label>',
    to: '<label for="dispatchRegion" data-i18n="lblTargetRegion">Target State / Region</label>'
  },
  {
    from: 'placeholder="e.g., Coastal Konkan &amp; Mumbai Metropolitan Region"',
    to: 'placeholder="e.g., Coastal Konkan & Mumbai Metropolitan Region" data-i18n-placeholder="targetRegionPh"'
  },
  {
    from: '<label for="dispatchSeverity">Warning Severity Level</label>',
    to: '<label for="dispatchSeverity" data-i18n="lblSeverityLevel">Warning Severity Level</label>'
  },
  {
    from: '<option value="red">RED ALERT (Extremely Severe / Evacuation)</option>',
    to: '<option value="red" data-i18n="optRedAlert">RED ALERT (Extremely Severe / Evacuation)</option>'
  },
  {
    from: '<option value="orange">ORANGE ALERT (Be Prepared / Heavy Impact)</option>',
    to: '<option value="orange" data-i18n="optOrangeAlert">ORANGE ALERT (Be Prepared / Heavy Impact)</option>'
  },
  {
    from: '<option value="yellow">YELLOW WATCH (Be Updated / Minor Disruption)</option>',
    to: '<option value="yellow" data-i18n="optYellowWatch">YELLOW WATCH (Be Updated / Minor Disruption)</option>'
  },
  {
    from: '<label for="dispatchHeadline">Warning Headline</label>',
    to: '<label for="dispatchHeadline" data-i18n="lblHeadline">Warning Headline</label>'
  },
  {
    from: 'placeholder="e.g., Red Alert: Severe Monsoon Inundation &amp; Flash Flood Risk"',
    to: 'placeholder="e.g., Red Alert: Severe Monsoon Inundation & Flash Flood Risk" data-i18n-placeholder="headlinePh"'
  },
  {
    from: '<label for="dispatchInstructions">Public Advisory &amp; Safety Instructions</label>',
    to: '<label for="dispatchInstructions" data-i18n="lblPublicAdvisory">Public Advisory & Safety Instructions</label>'
  },
  {
    from: 'placeholder="Specify evacuations, shelter guidelines, road closures, or safety steps..."',
    to: 'placeholder="Specify evacuations, shelter guidelines, road closures, or safety steps..." data-i18n-placeholder="advisoryPh"'
  },
  {
    from: '<i class="fa-solid fa-tower-broadcast"></i> Dispatch Emergency Bulletin',
    to: '<i class="fa-solid fa-tower-broadcast"></i> <span data-i18n="btnDispatchEmergency">Dispatch Emergency Bulletin</span>'
  },

  // 12. Footer
  {
    from: '<p class="footer-desc">Authoritative meteorological monitoring, real-time severe weather intelligence, and community incident verification across Indian states and union territories.</p>',
    to: '<p class="footer-desc" data-i18n="footerBrandDesc">Authoritative meteorological monitoring, real-time severe weather intelligence, and community incident verification across Indian states and union territories.</p>'
  },
  {
    from: '<span class="meta-label">Connected Domain:</span>',
    to: '<span class="meta-label" data-i18n="footerConnectedDomain">Connected Domain:</span>'
  },
  {
    from: '<h4 class="footer-heading">Emergency &amp; Meteorological Desk</h4>',
    to: '<h4 class="footer-heading" data-i18n="footerDeskTitle">Emergency & Meteorological Desk</h4>'
  },
  {
    from: '<span>+91 11 2461 1792 (Control Room)</span>',
    to: '<span data-i18n="footerPhone">+91 11 2461 1792 (Control Room)</span>'
  },
  {
    from: '<span>support@weatheranalytics.in</span>',
    to: '<span data-i18n="footerEmail">support@weatheranalytics.in</span>'
  },
  {
    from: '<span>Lodhi Road Meteorological Complex, New Delhi 110003</span>',
    to: '<span data-i18n="footerAddress">Lodhi Road Meteorological Complex, New Delhi 110003</span>'
  },
  {
    from: '<h4 class="footer-heading">Legal &amp; Operational Policies</h4>',
    to: '<h4 class="footer-heading" data-i18n="footerPoliciesTitle">Legal & Operational Policies</h4>'
  },
  {
    from: '<a href="/privacy.html" class="footer-link">Privacy Policy</a>',
    to: '<a href="/privacy.html" class="footer-link" data-i18n="footerPrivacyPolicy">Privacy Policy</a>'
  },
  {
    from: '<a href="/terms.html" class="footer-link">Terms of Service</a>',
    to: '<a href="/terms.html" class="footer-link" data-i18n="footerTermsOfService">Terms of Service</a>'
  },
  {
    from: '<a href="/empty.html" class="footer-link">Historical Observation Archive</a>',
    to: '<a href="/empty.html" class="footer-link" data-i18n="footerArchiveLink">Historical Observation Archive</a>'
  },
  {
    from: '<a href="/api/health" class="footer-link" target="_blank">System Telemetry &amp; Health Status</a>',
    to: '<a href="/api/health" class="footer-link" target="_blank" data-i18n="footerSystemHealth">System Telemetry & Health Status</a>'
  },
  {
    from: '<div class="footer-copy-text">&copy; 2026 National Weather Analytics (NWA). All rights reserved. Operating under WMO open observational data standards.</div>',
    to: '<div class="footer-copy-text" data-i18n="footerCopyright">&copy; 2026 National Weather Analytics (NWA). All rights reserved. Operating under WMO open observational data standards.</div>'
  },
  {
    from: '<a href="/privacy.html">Privacy Policy</a>',
    to: '<a href="/privacy.html" data-i18n="privacy">Privacy Policy</a>'
  },
  {
    from: '<a href="/terms.html">Terms of Use</a>',
    to: '<a href="/terms.html" data-i18n="terms">Terms of Use</a>'
  },
  {
    from: '<a href="mailto:support@weatheranalytics.in">Help Desk</a>',
    to: '<a href="mailto:support@weatheranalytics.in" data-i18n="footerHelpDesk">Help Desk</a>'
  }
];

let applied = 0;
let missed = 0;

replacements.forEach((r, idx) => {
  if (html.includes(r.from)) {
    html = html.replace(r.from, r.to);
    applied++;
  } else {
    missed++;
    console.warn(`[#${idx}] Did not match:`, r.from.substring(0, 60));
  }
});

console.log(`Applied: ${applied}/${replacements.length} replacements. Missed: ${missed}`);
fs.writeFileSync('public/index.html', html);
console.log('Saved updated public/index.html');
