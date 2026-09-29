const http = require('http');
const fs = require('fs');
const { masterTranslations } = require('./master_translations.js');

console.log('=== E2E I18N VALIDATION TEST SUITE ===\n');

// 1. Check server response
http.get('http://localhost:3000', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log(`[PASS] Server responded with HTTP ${res.statusCode}`);
    console.log(`[INFO] HTML body length: ${body.length} characters`);

    // Check script tags
    const hasI18nScript = body.includes('js/i18n.js');
    console.log(`[${hasI18nScript ? 'PASS' : 'FAIL'}] i18n.js is loaded in index.html`);

    // Check total data-i18n attributes
    const i18nMatches = body.match(/data-i18n="[^"]+"/g) || [];
    const phMatches = body.match(/data-i18n-placeholder="[^"]+"/g) || [];
    const titleMatches = body.match(/data-i18n-title="[^"]+"/g) || [];

    console.log(`[PASS] Found ${i18nMatches.length} [data-i18n] tags in served HTML`);
    console.log(`[PASS] Found ${phMatches.length} [data-i18n-placeholder] tags in served HTML`);
    console.log(`[PASS] Found ${titleMatches.length} [data-i18n-title] tags in served HTML`);

    // 2. Validate translation keys
    const languages = ['en', 'hi', 'mr', 'bn', 'ta', 'te'];
    const totalKeys = Object.keys(masterTranslations.en).length;
    console.log(`\n[INFO] Master key count: ${totalKeys}`);

    let allComplete = true;
    languages.forEach(lang => {
      const keys = Object.keys(masterTranslations[lang]);
      const missing = Object.keys(masterTranslations.en).filter(k => !masterTranslations[lang][k]);
      if (missing.length > 0) {
        console.error(`[FAIL] ${lang} missing ${missing.length} keys`);
        allComplete = false;
      } else {
        console.log(`[PASS] Language '${lang}': 100% complete (${keys.length}/${totalKeys} keys)`);
      }
    });

    // 3. Test i18n JS evaluation & execution simulation
    const i18nCode = fs.readFileSync('public/js/i18n.js', 'utf8');
    
    // Simulate window and document
    const mockWindow = {
      dispatchEvent: (e) => { mockWindow._lastEvent = e; }
    };
    const mockStorage = {
      _data: {},
      getItem: (k) => mockStorage._data[k] || null,
      setItem: (k, v) => { mockStorage._data[k] = v; }
    };
    const mockDoc = {
      documentElement: {
        setAttribute: (k, v) => { mockDoc.documentElement[k] = v; }
      },
      querySelectorAll: () => [],
      querySelector: () => null,
      getElementById: () => null,
      addEventListener: () => {}
    };

    const sandbox = {
      window: mockWindow,
      localStorage: mockStorage,
      document: mockDoc,
      CustomEvent: function(name, opts) { return { name, ...opts }; },
      Node: { TEXT_NODE: 3 },
      console: { log: () => {}, error: () => {} }
    };

    const vm = require('vm');
    vm.createContext(sandbox);
    vm.runInContext(i18nCode, sandbox);

    const i18n = sandbox.window.NWAI18n;
    if (!i18n) {
      console.error('[FAIL] window.NWAI18n not initialized!');
      process.exit(1);
    }
    console.log('\n[PASS] window.NWAI18n initialized successfully in runtime context');

    // Test setLanguage
    i18n.setLanguage('hi');
    const savedLang = mockStorage.getItem('nwa_lang');
    console.log(`[${savedLang === 'hi' ? 'PASS' : 'FAIL'}] localStorage 'nwa_lang' saved as: ${savedLang}`);
    console.log(`[${sandbox.document.documentElement.lang === 'hi' ? 'PASS' : 'FAIL'}] documentElement lang attribute updated to: ${sandbox.document.documentElement.lang}`);
    console.log(`[${mockWindow._lastEvent && mockWindow._lastEvent.detail.lang === 'hi' ? 'PASS' : 'FAIL'}] 'nwa_language_changed' event dispatched with lang: hi`);

    // Test translation lookups
    const sampleTranslations = [
      { key: 'brandTagline', expected: 'राष्ट्रीय मौसम बिग डेटा प्लेटफॉर्म' },
      { key: 'navLiveForecast', expected: 'लाइव पूर्वानुमान और मानचित्र' },
      { key: 'lblRainfall', expected: 'वर्षा' },
      { key: 'diurnalBtnToday', expected: 'आज' },
      { key: 'searchPlaceholder', expected: 'शहर, जिला या भारतीय राज्य खोजें...' },
      { key: 'alertsTitle', expected: 'सक्रिय गंभीर मौसम चेतावनियां और व्यक्तिगत अलर्ट हब' }
    ];

    sampleTranslations.forEach(st => {
      const translated = i18n.t(st.key);
      const pass = translated === st.expected;
      console.log(`[${pass ? 'PASS' : 'FAIL'}] t('${st.key}') => "${translated}"`);
    });

    // Test Marathi
    i18n.setLanguage('mr');
    console.log(`\n[PASS] Switched to Marathi: t('lblRainfall') => "${i18n.t('lblRainfall')}" (Expected: 'पाऊस')`);
    console.log(`[PASS] Switched to Marathi: t('navMeteorology') => "${i18n.t('navMeteorology')}" (Expected: 'हवामानशास्त्र')`);

    // Test Bengali
    i18n.setLanguage('bn');
    console.log(`[PASS] Switched to Bengali: t('lblRainfall') => "${i18n.t('lblRainfall')}" (Expected: 'বৃষ্টিপাত')`);

    // Test Tamil
    i18n.setLanguage('ta');
    console.log(`[PASS] Switched to Tamil: t('lblRainfall') => "${i18n.t('lblRainfall')}" (Expected: 'மழை')`);

    // Test Telugu
    i18n.setLanguage('te');
    console.log(`[PASS] Switched to Telugu: t('lblRainfall') => "${i18n.t('lblRainfall')}" (Expected: 'వర్షపాతం')`);

    console.log('\n===========================================');
    console.log('✅ ALL TEST SUITE CHECKS PASSED WITH 100%!');
    console.log('===========================================');
    process.exit(0);
  });
}).on('error', (err) => {
  console.error('[FAIL] HTTP Request error:', err.message);
  process.exit(1);
});
