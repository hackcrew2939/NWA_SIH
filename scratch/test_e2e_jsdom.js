const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('public/index.html', 'utf8');
const i18nCode = fs.readFileSync('public/js/i18n.js', 'utf8');

const dom = new JSDOM(html, {
  runScripts: "dangerously",
  resources: "usable",
  url: "http://localhost:3000/"
});

const { window } = dom;

// Inject i18n script
const scriptEl = window.document.createElement('script');
scriptEl.textContent = i18nCode;
window.document.body.appendChild(scriptEl);

console.log('--- Initial Language in DOM ---');
console.log('Current Lang:', window.NWAI18n.getLanguage());

// Test switching to Hindi
console.log('\n--- Switching to Hindi (hi) ---');
window.NWAI18n.setLanguage('hi');

const checkSamples = [
  { selector: 'h1.brand-title', expectedContains: 'राष्ट्रीय' },
  { selector: '[data-i18n="navLiveForecast"]', expectedContains: 'लाइव' },
  { selector: '[data-i18n="quickActionsTitle"]', expectedContains: 'त्वरित' },
  { selector: '[data-i18n="btnAdminPortal"]', expectedContains: 'व्यवस्थापक' },
  { selector: '#citySearch', attr: 'placeholder', expectedContains: 'शहर' },
  { selector: '#reportDescription', attr: 'placeholder', expectedContains: 'मौसम' },
  { selector: '[data-i18n="footerTagline"]', expectedContains: 'निगरानी' }
];

for (const sample of checkSamples) {
  const el = window.document.querySelector(sample.selector);
  if (!el) {
    console.error('Element not found:', sample.selector);
    continue;
  }
  const val = sample.attr ? el.getAttribute(sample.attr) : el.textContent.trim();
  const pass = val.includes(sample.expectedContains);
  console.log(`[${sample.selector}] (${sample.attr || 'text'}): "${val}" -> ${pass ? 'PASS' : 'FAIL'}`);
}

// Test switching across all languages
const testLangs = ['hi', 'mr', 'bn', 'ta', 'te', 'en'];
for (const l of testLangs) {
  window.NWAI18n.setLanguage(l);
  const brandEl = window.document.querySelector('[data-i18n="brandTitle"]');
  const searchEl = window.document.querySelector('#citySearch');
  console.log(`\nLang [${l}]:`);
  console.log(`  Brand Title: "${brandEl ? brandEl.textContent.trim() : 'NOT FOUND'}"`);
  console.log(`  Search Placeholder: "${searchEl ? searchEl.getAttribute('placeholder') : 'NOT FOUND'}"`);
  console.log(`  Stored in localStorage: "${window.localStorage.getItem('nwa_lang')}"`);
}

console.log('\n--- JSDOM E2E Test Completed Successfully! ---');
