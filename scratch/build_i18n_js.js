const fs = require('fs');
const { masterTranslations } = require('./master_translations.js');

const i18nTemplate = `/**
 * NWA (National Weather Analytics) - Internationalization & Multi-Lingual Engine (i18n)
 * Supports: 🇬🇧 English, 🇮🇳 हिन्दी (Hindi), 🇮🇳 मराठी (Marathi), 🇮🇳 বাংলা (Bengali), 🇮🇳 தமிழ் (Tamil), 🇮🇳 తెలుగు (Telugu)
 * Complete coverage: Headings, Buttons, Labels, Placeholders, Tooltips, Modals, Footer, and Dynamic Views.
 */

window.NWAI18n = (function() {
  const translations = ${JSON.stringify(masterTranslations, null, 2)};

  // Condition translation lookup for WMO codes and common weather phrases
  const conditionTranslations = {
    'Clear Sky': { hi: 'साफ आसमान', mr: 'स्वच्छ आकाश', bn: 'পরিষ্কার আকাশ', ta: 'தெளிவான வானம்', te: 'నిర్మలమైన ఆకాశం' },
    'Mainly Clear': { hi: 'मुख्यतः साफ', mr: 'बहुतांश स्वच्छ', bn: 'প্রধানত পরিষ্কার', ta: 'பெரும்பாலும் தெளிவானது', te: 'ఎక్కువగా నిర్మలంగా' },
    'Partly Cloudy': { hi: 'आंशिक रूप से बादल', mr: 'अंशतः ढगाळ', bn: 'আংশিক মেঘলা', ta: 'பகுதி மேகமூட்டம்', te: 'పాక్షికంగా మేఘావృతం' },
    'Overcast': { hi: 'घने बादल', mr: 'ढगाळ वातावरण', bn: 'মেঘলা আকাশ', ta: 'முழு மேகமூட்டம்', te: 'పూర్తిగా మేఘావృతం' },
    'Foggy Conditions': { hi: 'कोहरा', mr: 'धुके', bn: 'কুয়াশাচ্ছন্ন', ta: 'பனிமூட்டம்', te: 'పొగమంచు' },
    'Depositing Rime Fog': { hi: 'सफेद कोहरा', mr: 'हिम धुके', bn: 'তুহিন কুয়াশা', ta: 'உறைபனி மூட்டம்', te: 'మంచు పొగమంచు' },
    'Light Drizzle': { hi: 'हल्की बूंदाबांदी', mr: 'हलकी रिमझिम', bn: 'হালকা গুঁড়ি গুঁড়ি বৃষ্টি', ta: 'லேசான தூறல்', te: 'తేలికపాటి చినుకులు' },
    'Moderate Drizzle': { hi: 'मध्यम बूंदाबांदी', mr: 'मध्यम रिमझिम', bn: 'মাঝারি গুঁড়ি গুঁড়ি বৃষ্টি', ta: 'மிதமான தூறல்', te: 'మోస్తరు చినుకులు' },
    'Dense Drizzle': { hi: 'घनी बूंदाबांदी', mr: 'जोरदार रिमझिम', bn: 'ঘন গুঁড়ি গুঁড়ি বৃষ্টি', ta: 'அடர்ந்த தூறல்', te: 'దట్టమైన చినుకులు' },
    'Freezing Drizzle': { hi: 'बर्फ़ीली बूंदाबांदी', mr: 'गोठवणारी रिमझिम', bn: 'হিমশীতল গুঁড়ি গুঁড়ি বৃষ্টি', ta: 'உறைபனித் தூறல்', te: 'ఘనీభవన చినుకులు' },
    'Dense Freezing Drizzle': { hi: 'घनी बर्फ़ीली बूंदाबांदी', mr: 'तीव्र गोठवणारी रिमझिम', bn: 'ঘন হিমশীতল বৃষ্টি', ta: 'அடர்ந்த உறைபனித் தூறல்', te: 'దట్టమైన ఘనీభవన చినుకులు' },
    'Slight Rain': { hi: 'हल्की बारिश', mr: 'हलका पाऊस', bn: 'সামান্য বৃষ্টি', ta: 'லேசான மழை', te: 'తేలికపాటి వర్షం' },
    'Moderate Rain': { hi: 'मध्यम बारिश', mr: 'मध्यम पाऊस', bn: 'মাঝারি বৃষ্টি', ta: 'மிதமான மழை', te: 'మోస్తరు వర్షం' },
    'Heavy Rain / Downpour': { hi: 'भारी बारिश / मूसलाधार', mr: 'मुसळधार पाऊस', bn: 'ভারী বৃষ্টিপাত / বর্ষণ', ta: 'கனமழை / பெருமழை', te: 'భారీ వర్షం / కుండపోత' },
    'Freezing Rain': { hi: 'बर्फ़ीली बारिश', mr: 'गोठवणारा पाऊस', bn: 'হিমশীতল বৃষ্টি', ta: 'உறைபனி மழை', te: 'ఘనీభవన వర్షం' },
    'Heavy Freezing Rain': { hi: 'भारी बर्फ़ीली बारिश', mr: 'तीव्र गोठवणारा पाऊस', bn: 'প্রবল হিমশীতল বৃষ্টি', ta: 'கடும் உறைபனி மழை', te: 'తీవ్ర ఘనీభవన వర్షం' },
    'Slight Snowfall': { hi: 'हल्की बर्फबारी', mr: 'हलकी बर्फवृष्टी', bn: 'সামান্য তুষারপাত', ta: 'லேசான பனிப்பொழிவு', te: 'తేలికపాటి హిమపాతం' },
    'Moderate Snowfall': { hi: 'मध्यम बर्फबारी', mr: 'मध्यम बर्फवृष्टी', bn: 'মাঝারি তুষারপাত', ta: 'மிதமான பனிப்பொழிவு', te: 'మోస్తరు హిమపాతం' },
    'Heavy Snowfall': { hi: 'भारी बर्फबारी', mr: 'जोरदार बर्फवृष्टी', bn: 'ভারী তুষারপাত', ta: 'கடும் பனிப்பொழிவு', te: 'భారీ హిమపాతం' },
    'Snow Grains': { hi: 'बर्फ के कण', mr: 'बर्फाचे कण', bn: 'তুষার কণা', ta: 'பனித் துகள்கள்', te: 'మంచు కణాలు' },
    'Slight Rain Showers': { hi: 'हल्की वर्षा की बौछारें', mr: 'हलक्या पावसाच्या सरी', bn: 'হালকা বৃষ্টির ঝাপটা', ta: 'லேசான மழைச்சாரல்', te: 'తేలికపాటి వర్షపు జల్లులు' },
    'Moderate Rain Showers': { hi: 'मध्यम वर्षा की बौछारें', mr: 'मध्यम पावसाच्या सरी', bn: 'মাঝারি বৃষ্টির ঝাপটা', ta: 'மிதமான மழைச்சாரல்', te: 'మోస్తరు వర్షపు జల్లులు' },
    'Violent Rain Showers': { hi: 'भीषण वर्षा की बौछारें', mr: 'तीव्र पावसाच्या सरी', bn: 'প্রচণ্ড বৃষ্টির ঝাপটা', ta: 'கடுமையான மழைச்சாரல்', te: 'తీవ్ర వర్షపు జల్లులు' },
    'Thunderstorm with Lightning': { hi: 'बिजली के साथ गरज-चमक', mr: 'विजांसह वादळी पाऊस', bn: 'বজ্রবিদ্যুৎ সহ ঝড়বৃষ্টি', ta: 'மின்னலுடன் கூடிய இடிமழை', te: 'మెరుపులతో కూడిన ఉరుములు' },
    'Thunderstorm with Slight Hail': { hi: 'हल्के ओलों के साथ तूफान', mr: 'हलक्या गारांसह वादळ', bn: 'হালকা শিলাবৃষ্টি সহ ঝড়', ta: 'லேசான ஆலங்கட்டியுடன் புயல்', te: 'తేలికపాటి వడగండ్లతో తుఫాను' },
    'Severe Thunderstorm with Hail': { hi: 'ओलों के साथ भीषण तूफान', mr: 'गारांसह जोरदार वादळ', bn: 'শিলাবৃষ্টি সহ প্রবল ঝড়', ta: 'ஆலங்கட்டியுடன் கூடிய கடும்புயல்', te: 'వడగండ్లతో కూడిన తీవ్ర తుఫాను' },
    'Rain Showers': { hi: 'बारिश की बौछारें', mr: 'पावसाच्या सरी', bn: 'বৃষ্টির ঝাপটা', ta: 'மழைச்சாரல்', te: 'వర్షపు జల్లులు' },
    'Sunny': { hi: 'धूप खिली', mr: 'सूर्यप्रकाश', bn: 'রৌদ্রোজ্জ্বল', ta: 'வெயில்', te: 'ఎండగా' }
  };

  let currentLang = localStorage.getItem('nwa_lang') || 'en';

  function setLanguage(lang) {
    if (!translations[lang]) lang = 'en';
    currentLang = lang;
    localStorage.setItem('nwa_lang', lang);
    document.documentElement.setAttribute('lang', lang);
    applyTranslations();

    // Trigger custom event so all active components update dynamically
    window.dispatchEvent(new CustomEvent('nwa_language_changed', { detail: { lang } }));
  }

  function getLanguage() {
    return currentLang;
  }

  function t(key, fallback = '') {
    const langDict = translations[currentLang] || translations.en;
    if (langDict && langDict[key]) return langDict[key];
    if (translations.en && translations.en[key]) return translations.en[key];
    return fallback || key;
  }

  function translateCondition(condition) {
    if (!condition) return '';
    if (currentLang === 'en') return condition;
    const match = conditionTranslations[condition];
    if (match && match[currentLang]) return match[currentLang];
    return t(condition, condition);
  }

  // Safe element text updater preserving leading icons
  function setElText(el, text) {
    if (!el || !text) return;
    const icon = el.querySelector('i, svg');
    if (icon) {
      const iconHtml = icon.outerHTML;
      el.innerHTML = iconHtml + ' ' + text;
    } else {
      el.textContent = text;
    }
  }

  // Safe element helper by selector
  function updateSelector(sel, text, isHtml = false) {
    const el = document.querySelector(sel);
    if (!el || !text) return;
    if (isHtml) el.innerHTML = text;
    else setElText(el, text);
  }

  function applyTranslations() {
    const dict = translations[currentLang] || translations.en;

    // ── 1. Document Title ───────────────────────────────────────────────────
    if (dict.brandTitle && dict.brandTagline) {
      document.title = dict.brandTitle + ' | ' + dict.brandTagline;
    }

    // ── 2. Standard [data-i18n] text nodes ──────────────────────────────────
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = dict[key];
        } else if (el.hasAttribute('data-i18n-html')) {
          el.innerHTML = dict[key];
        } else {
          setElText(el, dict[key]);
        }
      }
    });

    // ── 3. [data-i18n-placeholder] attributes ──────────────────────────────
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) el.placeholder = dict[key];
    });

    // ── 4. [data-i18n-title] tooltip attributes ────────────────────────────
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (dict[key]) el.title = dict[key];
    });

    // ── 5. [data-i18n-aria] accessible labels ──────────────────────────────
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      if (dict[key]) el.setAttribute('aria-label', dict[key]);
    });

    // ── 6. Fallback Selector Coverage for Elements without data tags ───────

    // Sidebar & Brand
    updateSelector('.brand-tagline', dict.brandTagline);
    updateSelector('.sidebar-section-title:first-of-type', dict.navMeteorology);
    updateSelector('.sidebar-section-title[style*="margin-top"]', dict.navQuickActions);

    // Header Actions
    const searchInp = document.getElementById('citySearchInput');
    if (searchInp && dict.searchPlaceholder) searchInp.placeholder = dict.searchPlaceholder;

    const stateSel = document.getElementById('stateSelect');
    if (stateSel && stateSel.options && stateSel.options[0] && dict.stateSelectDefault) {
      stateSel.options[0].textContent = dict.stateSelectDefault;
    }
    const citySel = document.getElementById('citySelect');
    if (citySel && citySel.options && citySel.options[0] && dict.citySelectDefault) {
      citySel.options[0].textContent = dict.citySelectDefault;
    }

    const refreshSpan = document.querySelector('#refreshWeatherBtn span');
    if (refreshSpan && dict.btnRefresh) refreshSpan.textContent = dict.btnRefresh;

    const incidentBtnText = document.querySelector('#openReportModalBtn .action-btn-text');
    if (incidentBtnText && dict.btnReportIncident) incidentBtnText.textContent = dict.btnReportIncident;

    const adminBtnText = document.getElementById('topNavAdminBtnText');
    if (adminBtnText && dict.btnAdminPortal) adminBtnText.textContent = dict.btnAdminPortal;

    // Hero Weather
    const voiceSpan = document.getElementById('voiceBriefText');
    if (voiceSpan && dict.btnAudioSummary) voiceSpan.textContent = dict.btnAudioSummary;

    const heroFeels = document.querySelector('.hero-feels');
    if (heroFeels && dict.feelsLike) {
      const inner = document.getElementById('heroFeelsLike');
      heroFeels.textContent = dict.feelsLike + ' ';
      if (inner) heroFeels.appendChild(inner);
    }
    const heroMaxSpan = document.querySelector('.hero-high-low span:first-child');
    if (heroMaxSpan && dict.maxTemp) {
      const strong = document.getElementById('heroMaxToday');
      heroMaxSpan.innerHTML = '<i class="fa-solid fa-arrow-up" style="color:#ef4444;"></i> ' + dict.maxTemp + ': <strong id="heroMaxToday">' + (strong ? strong.textContent : '--°') + '</strong>';
    }
    const heroMinSpan = document.querySelector('.hero-high-low span:last-child');
    if (heroMinSpan && dict.minTemp) {
      const strong = document.getElementById('heroMinToday');
      heroMinSpan.innerHTML = '<i class="fa-solid fa-arrow-down" style="color:#38bdf8;"></i> ' + dict.minTemp + ': <strong id="heroMinToday">' + (strong ? strong.textContent : '--°') + '</strong>';
    }

    // Telemetry Pills
    const dewPill = document.querySelector('#heroDewPointPill span');
    if (dewPill && dict.dewPoint) {
      const val = document.getElementById('heroDewPointVal');
      dewPill.childNodes[0].textContent = dict.dewPoint + ': ';
    }
    const rainPill = document.querySelector('#heroRainChancePill span');
    if (rainPill && dict.rainChance) {
      const val = document.getElementById('heroRainChanceVal');
      rainPill.childNodes[0].textContent = dict.rainChance + ': ';
    }
    const aqiPill = document.querySelector('#heroAqiPill span');
    if (aqiPill && dict.aqi) {
      const val = document.getElementById('heroAqiStatus');
      aqiPill.childNodes[0].textContent = dict.aqi + ': ';
    }

    // Metric Cards
    const metricKeys = [
      'lblRainfall', 'lblHumidity', 'lblWind', 'lblPressure',
      'lblUVIndex', 'lblVisibility', 'lblSunrise', 'lblSunset'
    ];
    document.querySelectorAll('.metric-card').forEach((card, i) => {
      const hSpan = card.querySelector('.metric-header > span');
      if (hSpan && metricKeys[i] && dict[metricKeys[i]]) {
        hSpan.textContent = dict[metricKeys[i]];
      }
    });

    // Interactive Map
    updateSelector('.map-title > span', dict.mapTitle);
    const mapLayerKeys = { weather: 'mapStations', citizen: 'mapCitizenReports', social: 'mapSocialFeed', clusters: 'mapClusters', heatmap: 'mapHeatmap' };
    document.querySelectorAll('.layer-btn[data-layer]').forEach(btn => {
      const key = mapLayerKeys[btn.getAttribute('data-layer')];
      if (key && dict[key]) setElText(btn, dict[key]);
    });
    const mapTipDiv = document.querySelector('.map-tip-text');
    if (mapTipDiv && dict.mapTipText) {
      mapTipDiv.innerHTML = '<i class="fa-solid fa-arrow-pointer" style="color:var(--accent-primary);margin-right:5px;font-size:0.75rem;"></i><strong>' + (dict.mapTipLabel || 'Tip:') + '</strong> ' + dict.mapTipText;
    }

    // Diurnal 24-Hour Progression
    updateSelector('.diurnal-card-container .chart-title > span', dict.diurnalTitle);
    updateSelector('#diurnalDateBadgeText', dict.diurnalToday);
    const rebuildBtn = (id, key) => {
      const btn = document.getElementById(id);
      if (!btn || !dict[key]) return;
      setElText(btn, dict[key]);
    };
    rebuildBtn('diurnalBtnToday', 'diurnalBtnToday');
    rebuildBtn('diurnalBtnTomorrow', 'diurnalBtnTomorrow');
    rebuildBtn('diurnalBtnDayAfter', 'diurnalBtnDayAfter');
    updateSelector('#diurnalCustomLabelText', dict.diurnalBtnCustom);
    updateSelector('.diurnal-subtitle span', dict.diurnalClickHint);

    // 10-Day Forecast
    document.querySelectorAll('.chart-card:not(.diurnal-card-container) .chart-title > span').forEach(span => {
      const t = span.textContent.trim();
      if ((t.includes('10') || t.includes('Forecast') || t.includes('पूर्वानुमान') || t.includes('अंदाज')) && !t.includes('Trend') && !t.includes('रुझान') && dict.forecastTitle) {
        span.textContent = dict.forecastTitle;
      } else if ((t.includes('Trend') || t.includes('Temperature') || t.includes('रुझान') || t.includes('कल')) && dict.forecastTrendTitle) {
        span.textContent = dict.forecastTrendTitle;
      }
    });
    updateSelector('#exportCsvBtn span', dict.forecastBtnDownload);

    // Weather Alerts View
    updateSelector('#weather-alerts-view .alerts-surveillance-indicator span:last-child', dict.alertsBadge);
    updateSelector('#weather-alerts-view .alerts-main-title', dict.alertsTitle);
    updateSelector('#weather-alerts-view .alerts-subtitle', dict.alertsSub);
    updateSelector('#dispatchAlertModalBtn span', dict.btnDispatchAgency);
    updateSelector('#testAudioSirenBtn span', dict.btnTestAudioPush);
    updateSelector('#refreshAlertsBtn span', dict.btnRefreshWarnings);
    updateSelector('#weather-alerts-view .panel-card-title span', dict.personalAlertTitle);
    updateSelector('#weather-alerts-view .panel-card-sub', dict.personalAlertDesc);
    updateSelector('label[for="alertCityInput"]', dict.lblMonitoredLocation);
    updateSelector('#alertCurrentGpsBtn span', dict.btnCurrentGPS);
    updateSelector('label[for="alertHazardType"]', dict.lblHazardTrigger);
    updateSelector('label[for="alertThresholdInput"]', dict.lblThresholdValue);
    updateSelector('label[for="alertSoundSelect"]', dict.lblSirenTone);
    updateSelector('#previewSirenBtn span', dict.btnTestSiren);
    updateSelector('#btnActivateAlert span', dict.btnSaveAlert);
    updateSelector('#weather-alerts-view .active-alerts-header h3', dict.activeWarningsHeading);

    // Citizen Reports View
    updateSelector('#citizen-reports-view .filter-bar .section-title span', dict.reportsQueueTitle);
    updateSelector('#citizen-reports-view button[onclick*="openReportModal"] span', dict.btnReportEvent);
    const repTabs = document.querySelectorAll('#citizen-reports-view .filter-tab');
    if (repTabs[0] && dict.tabAllReports) repTabs[0].textContent = dict.tabAllReports;
    if (repTabs[1] && dict.tabPendingVerif) repTabs[1].textContent = dict.tabPendingVerif;
    if (repTabs[2] && dict.tabVerified) repTabs[2].textContent = dict.tabVerified;

    // Social Intelligence Stream
    updateSelector('#social-stream-view h3 span', dict.socialTitle);
    updateSelector('#fetchLiveSignalsBtn span', dict.btnFetchSignals);
    updateSelector('#socialLiveBadge', dict.badgeIngestionActive);
    updateSelector('#social-stream-view .monitored-tags-card h3', dict.monitoredTagsTitle);
    updateSelector('#social-stream-view .monitored-tags-card p', dict.monitoredTagsDesc);
    updateSelector('#social-stream-view .ingestion-stats-card h3', dict.ingestionOverviewTitle);

    // Analytics View
    updateSelector('#analytics-view h2', dict.analyticsTitle);
    updateSelector('#analytics-view p', dict.analyticsSub);
    updateSelector('#refreshAnalyticsBtn span', dict.btnRefreshAnalytics);
    const kpiLabels = document.querySelectorAll('#analytics-view .stat-label, #analytics-view .kpi-label');
    if (kpiLabels[0] && dict.statMonitoredEvents) kpiLabels[0].textContent = dict.statMonitoredEvents;
    if (kpiLabels[1] && dict.statCitizenReports) kpiLabels[1].textContent = dict.statCitizenReports;
    if (kpiLabels[2] && dict.statSocialSignals) kpiLabels[2].textContent = dict.statSocialSignals;
    if (kpiLabels[3] && dict.statVerifRate) kpiLabels[3].textContent = dict.statVerifRate;

    // Official Reports View
    updateSelector('#official-reports-view .report-export-intro h2', dict.docReportTitle);
    updateSelector('#official-reports-view .report-export-intro p', dict.docReportSub);
    updateSelector('#official-reports-view button[onclick*="exportToExcel"] span', dict.btnDownloadExcel);
    updateSelector('#official-reports-view button[onclick*="exportToPDF"] span', dict.btnDownloadPdf);
    updateSelector('#official-reports-view button[onclick*="print"] span', dict.btnPrintReport);
    updateSelector('#official-reports-view .doc-status-badge span', dict.badgeDocReady);

    // Admin Panel View
    updateSelector('#adminAuthGate .admin-login-shield-badge', dict.adminSecBadge);
    updateSelector('#adminAuthGate h3', dict.adminLoginTitle);
    updateSelector('#adminAuthGate p', dict.adminLoginSub);
    updateSelector('label[for="adminPasswordInput"]', dict.lblAdminPassword);
    const adminPassInp = document.getElementById('adminPasswordInput');
    if (adminPassInp && dict.adminPasswordPh) adminPassInp.placeholder = dict.adminPasswordPh;
    updateSelector('#adminLoginSubmitBtn span', dict.btnLoginAdmin);
    updateSelector('#adminMainContent .section-title', dict.adminDashboardTitle);
    updateSelector('#adminMainContent .section-subtitle', dict.adminDashboardSub);
    updateSelector('#adminLogoutBtn span', dict.btnLogout);
    updateSelector('#adminDeduplicateBtn span', dict.btnDedup);
    updateSelector('#adminExportCsvBtn span', dict.btnExportCsv);
    updateSelector('#adminRefreshBtn span', dict.btnRefreshQueue);

    // Modals
    updateSelector('#reportModal .modal-header h3 span', dict.modalReportTitle);
    updateSelector('#reportModal .modal-subtitle', dict.modalReportSub);
    updateSelector('#citizenReportForm button[type="submit"] span', dict.btnSubmitReport);
    updateSelector('#citizenReportForm .btn-cancel', dict.btnCancel);

    updateSelector('#alertDispatchModal h3', dict.modalDispatchTitle);
    updateSelector('#alertDispatchModal p', dict.modalDispatchSub);
    updateSelector('#alertDispatchModal button[type="submit"] span', dict.btnDispatchEmergency);

    updateSelector('#aiForensicsModal h3', dict.modalForensicsTitle);
    updateSelector('#aiForensicsModal .modal-sub', dict.modalForensicsSub);

    updateSelector('#bigDataModal h3', dict.modalBigDataTitle);
    updateSelector('#bigDataModal .modal-sub', dict.modalBigDataSub);

    // Footer
    updateSelector('.footer-desc', dict.footerBrandDesc);
    updateSelector('.meta-label', dict.footerConnectedDomain);
    updateSelector('.footer-heading:first-of-type', dict.footerDeskTitle);
    updateSelector('.footer-heading:last-of-type', dict.footerPoliciesTitle);
    updateSelector('.footer-copy-text', dict.footerCopyright);

    // ── 7. Update Modern Dropdown Header UI ─────────────────────────────────
    updateModernDropdownUI(currentLang);
  }

  const svgFlagUK = '<svg class="lang-flag-svg" viewBox="0 0 60 40" width="18" height="12"><path fill="#012169" d="M0 0h60v40H0z"/><path stroke="#fff" stroke-width="6" d="M0 0l60 40M60 0L0 40"/><path stroke="#C8102E" stroke-width="3" d="M0 0l60 40M60 0L0 40"/><path stroke="#fff" stroke-width="10" d="M30 0v40M0 20h60"/><path stroke="#C8102E" stroke-width="6" d="M30 0v40M0 20h60"/></svg>';
  const svgFlagIN = '<svg class="lang-flag-svg" viewBox="0 0 60 40" width="18" height="12"><path fill="#FF9933" d="M0 0h60v13.3H0z"/><path fill="#FFFFFF" d="M0 13.3h60v13.4H0z"/><path fill="#128807" d="M0 26.7h60V40H0z"/><circle cx="30" cy="20" r="4.2" fill="none" stroke="#000080" stroke-width="1.2"/><circle cx="30" cy="20" r="1.2" fill="#000080"/></svg>';

  const langMeta = {
    en: { flagSvg: svgFlagUK, name: 'English' },
    hi: { flagSvg: svgFlagIN, name: 'हिन्दी' },
    mr: { flagSvg: svgFlagIN, name: 'मराठी' },
    bn: { flagSvg: svgFlagIN, name: 'বাংলা' },
    ta: { flagSvg: svgFlagIN, name: 'தமிழ்' },
    te: { flagSvg: svgFlagIN, name: 'తెలుగు' }
  };

  function updateModernDropdownUI(lang) {
    const meta = langMeta[lang] || langMeta.en;
    const flagEl = document.getElementById('currentLangFlag');
    const nameEl = document.getElementById('currentLangName');
    if (flagEl) flagEl.innerHTML = meta.flagSvg;
    if (nameEl) nameEl.textContent = meta.name;

    // Update active highlight & aria-selected in dropdown
    document.querySelectorAll('.modern-lang-option').forEach(opt => {
      const isSelected = opt.getAttribute('data-lang') === lang;
      opt.classList.toggle('active', isSelected);
      opt.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });

    // Sync native selector if present
    const selector = document.getElementById('languageSelector');
    if (selector && selector.value !== lang) {
      selector.value = lang;
    }
  }

  function initModernLangDropdown() {
    const dropdown = document.getElementById('modernLangDropdown');
    const btn = document.getElementById('modernLangBtn');
    if (!dropdown || !btn) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.querySelectorAll('.modern-lang-option').forEach(opt => {
      const chooseOption = () => {
        const selectedLang = opt.getAttribute('data-lang');
        if (selectedLang) {
          setLanguage(selectedLang);
          dropdown.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
          btn.focus();
        }
      };

      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        chooseOption();
      });

      opt.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          chooseOption();
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dropdown.classList.contains('open')) {
        dropdown.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
    initModernLangDropdown();

    const selector = document.getElementById('languageSelector');
    if (selector) {
      selector.value = currentLang;
      selector.addEventListener('change', (e) => {
        setLanguage(e.target.value);
      });
    }
  });

  return {
    setLanguage,
    getLanguage,
    t,
    translateCondition,
    applyTranslations
  };
})();
`;

fs.writeFileSync('public/js/i18n.js', i18nTemplate);
console.log('Successfully wrote comprehensive public/js/i18n.js!');
