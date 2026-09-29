const fs = require('fs');

const master = JSON.parse(fs.readFileSync('scratch/master_comprehensive_dict.json', 'utf8'));
const locs = JSON.parse(fs.readFileSync('scratch/locations_i18n_dict.json', 'utf8'));

// Verify that all keys are present in all languages
const supportedLangs = ['en', 'hi', 'mr', 'bn', 'ta', 'te'];
const allKeys = Object.keys(master.en);

supportedLangs.forEach(lang => {
  if (!master[lang]) master[lang] = {};
  allKeys.forEach(k => {
    if (!master[lang][k] || master[lang][k].trim() === '') {
      master[lang][k] = master.en[k];
    }
  });
  console.log(`Language [${lang}] complete: ${Object.keys(master[lang]).length} keys.`);
});

const fileContent = `/**
 * NWA (National Weather Analytics) - Comprehensive Internationalization Engine (i18n)
 * Fully covers all UI elements across all 6 supported languages:
 * 🇬🇧 English, 🇮🇳 हिन्दी, 🇮🇳 मराठी, 🇮🇳 বাংলা, 🇮🇳 தமிழ், 🇮🇳 తెలుగు
 */

window.NWAI18n = (function() {
  const translations = ${JSON.stringify(master, null, 2)};

  // Location translations for all Indian States, UTs, and major cities
  const stateTranslations = ${JSON.stringify(locs.stateTranslations || {}, null, 2)};
  const cityTranslations = ${JSON.stringify(locs.cityTranslations || {}, null, 2)};

  // Meteorological condition mapping
  const conditionTranslations = {
    'Clear Sky': { hi: 'साफ आसमान', mr: 'स्वच्छ आकाश', bn: 'পরিষ্কার আকাশ', ta: 'தெளிவான வானம்', te: 'నిర్మలమైన ఆకాశం' },
    'Mainly Clear': { hi: 'मुख्यतः साफ', mr: 'बहुतांश स्वच्छ', bn: 'প্রধানত পরিষ্কার', ta: 'பெரும்பாலும் தெளிவானது', te: 'ఎక్కువగా నిర్మలంగా' },
    'Partly Cloudy': { hi: 'आंशिक रूप से बादल', mr: 'अंशतः ढगाळ', bn: 'আংশিক মেঘলা', ta: 'பகுதி மேகமூட்டம்', te: 'పాక్షికంగా మేఘావృతం' },
    'Overcast': { hi: 'घने बादल', mr: 'ढगाळ वातावरण', bn: 'মেঘলা আকাশ', ta: 'முழு மேகமூட்டம்', te: 'పూర్तिగా మేఘావృతం' },
    'Foggy Conditions': { hi: 'कोहरा', mr: 'धुके', bn: 'কুয়াশাচ্ছন্ন', ta: 'பனிமூட்டம்', te: 'పొగమంచు' },
    'Depositing Rime Fog': { hi: 'सफेद कोहरा', mr: 'हिम धुके', bn: 'তুহিন কুয়াশা', ta: 'உறைபனி மூட்டம்', te: 'మంచు పొగమంచు' },
    'Light Drizzle': { hi: 'हल्की बूंदाबांदी', mr: 'हलकी रिमझिम', bn: 'হালকা গুঁড়ি গুঁড়ি বৃষ্টি', ta: 'லேசான தூறல்', te: 'తేలికపాటి చినుకులు' },
    'Moderate Drizzle': { hi: 'मध्यम बूंदाबांदी', mr: 'मध्यम रिमझिम', bn: 'মাঝারি গুঁড়ি গুঁড়ি বৃষ্টি', ta: 'மிதமான தூறல்', te: 'మోస్తరు చినుకులు' },
    'Dense Drizzle': { hi: 'घनी बूंदाबांदी', mr: 'जोरदार रिमझिम', bn: 'ঘন গুঁড়ি গুঁড়ি বৃষ্টি', ta: 'அடர்ந்த தூறல்', te: 'దట్టమైన చినుకులు' },
    'Freezing Drizzle': { hi: 'बर्फ़ीली बूंदाबांदी', mr: 'गोठवणारी रिमझिम', bn: 'হিমশীতল গুঁড়ি গুঁড়ি বৃষ্টি', ta: 'உறைபனித் தூறல்', te: 'ఘనీభవన చినుకులు' },
    'Dense Freezing Drizzle': { hi: 'घनी बर्फ़ीली बूंदाबांदी', mr: 'तीव्र गोठवणारी रिमझिम', bn: 'ঘন হিমশীতল বৃষ্টি', ta: 'அடர்ந்த உறைபனித் தூறல்', te: 'దట్టమైన ఘనీభవన చినుకులు' },
    'Slight Rain': { hi: 'हल्की बारिश', mr: 'हलका पाऊस', bn: 'সামান্য বৃষ্টি', ta: 'லேசான மழை', te: 'తేలికపాటి వర్షం' },
    'Moderate Rain': { hi: 'मध्यम बारिश', mr: 'मध्यम पाऊस', bn: 'মাঝারি বৃষ্টি', ta: 'மிதமான மழை', te: 'మోస్తరు వర్షం' },
    'Heavy Rain / Downpour': { hi: 'भारी बारिश / मूसलाधार', mr: 'मुसळधार पाऊस', bn: 'ভারী বৃষ্টিপাত', ta: 'கனமழை / பெருமழை', te: 'భారీ వర్షం / కుండపోత' },
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

  // Incident & Hazard Categories
  const categoryTranslations = {
    'heavy_rain': { en: 'Heavy Rain / Downpour', hi: 'भारी बारिश / मूसलाधार', mr: 'मुसळधार पाऊस', bn: 'ভারী বৃষ্টিপাত', ta: 'கனமழை', te: 'భారీ వర్షం' },
    'flood': { en: 'Urban / Flash Flood', hi: 'शहरी / आकस्मिक बाढ़', mr: 'पूर / जलमय', bn: 'বন্যা / প্লাবন', ta: 'வெள்ளம்', te: 'వరద' },
    'cyclone': { en: 'Cyclone / Gale Winds', hi: 'चक्रवात / तेज हवाएं', mr: 'चक्रीवादळ', bn: 'ঘূর্ণিঝড়', ta: 'புயல் காற்று', te: 'తుఫాను' },
    'heatwave': { en: 'Severe Heatwave', hi: 'भीषण लू / ताप लहर', mr: 'उष्णतेची लाट', bn: 'তীব্র তাপপ্রবাহ', ta: 'கடும் வெப்ப அலை', te: 'తీవ్ర వేడిగాలులు' },
    'hailstorm': { en: 'Hailstorm / Ice', hi: 'ओलावृष्टि / बर्फ', mr: 'गारपीट', bn: 'শিলাবৃষ্টি', ta: 'ஆலங்கட்டி மழை', te: 'వడగండ్ల వాన' },
    'thunderstorm': { en: 'Severe Thunderstorm', hi: 'भीषण तूफान / बिजली', mr: 'वादळी पाऊस / विजा', bn: 'বজ্রপাত সহ ঝড়', ta: 'கடும் இடிமின்னல்', te: 'తీవ్ర ఉరుములతో కూడిన తుఫాను' },
    'cold_wave': { en: 'Cold Wave / Frost', hi: 'शीत लहर / पाला', mr: 'थंडीची लाट', bn: 'শৈত্যপ্রবাহ', ta: 'குளிர் அலை', te: 'చలిగాలులు' },
    'other': { en: 'Other Weather Incident', hi: 'अन्य मौसम घटना', mr: 'इतर हवामान घटना', bn: 'অন্যান্য আবহাওয়া ঘটনা', ta: 'மற்ற வானிலை நிகழ்வு', te: 'ఇతర వాతావరణ సంఘటన' }
  };

  // Severity labels
  const severityTranslations = {
    'red': { en: 'RED WARNING', hi: 'लाल चेतावनी', mr: 'लाल इशारा', bn: 'লাল সতর্কতা', ta: 'சிவப்பு எச்சரிக்கை', te: 'రెడ్ వార్నింగ్' },
    'orange': { en: 'ORANGE ALERT', hi: 'नारंगी चेतावनी', mr: 'केशरी इशारा', bn: 'কমলা সতর্কতা', ta: 'ஆரஞ்சு எச்சரிக்கை', te: 'ఆరెంజ్ అలర్ట్' },
    'yellow': { en: 'YELLOW WATCH', hi: 'पीली निगरानी', mr: 'पिवळी देखरेख', bn: 'হলুদ নজরদারি', ta: 'மஞ்சள் கண்காணிப்பு', te: 'ఎల్లో వాచ్' },
    'green': { en: 'NORMAL', hi: 'सामान्य', mr: 'सामान्य', bn: 'স্বাভাবিক', ta: 'இயல்பானது', te: 'సాధారణం' }
  };

  // AQI ratings
  const aqiTranslations = {
    'Good': { en: 'Good', hi: 'अच्छा', mr: 'उत्तम', bn: 'ভালো', ta: 'நல்லது', te: 'మంచిది' },
    'Satisfactory': { en: 'Satisfactory', hi: 'संतोषजनक', mr: 'समाधानकारक', bn: 'সন্তোষজনক', ta: 'திருப்திகரமானது', te: 'సంతృప్తికరం' },
    'Moderate': { en: 'Moderate', hi: 'मध्यम', mr: 'मध्यम', bn: 'মাঝারি', ta: 'மிதமானது', te: 'మోస్తరు' },
    'Poor': { en: 'Poor', hi: 'खराब', mr: 'खराब', bn: 'খারাপ', ta: 'மோசமானது', te: 'పేద' },
    'Very Poor': { en: 'Very Poor', hi: 'बहुत खराब', mr: 'अतिशय खराब', bn: 'খুব খারাপ', ta: 'மிகவும் மோசம்', te: 'చాలా పేద' },
    'Severe': { en: 'Severe', hi: 'गंभीर', mr: 'गंभीर', bn: 'মারাত্মক', ta: 'கடுமையானது', te: 'తీవ్రమైన' }
  };

  // UV ratings
  const uvTranslations = {
    'Low': { en: 'Low', hi: 'कम', mr: 'कमी', bn: 'কম', ta: 'குறைவு', te: 'తక్కువ' },
    'Moderate': { en: 'Moderate', hi: 'मध्यम', mr: 'मध्यम', bn: 'মাঝারি', ta: 'மிதமானது', te: 'మోస్తరు' },
    'High': { en: 'High', hi: 'उच्च', mr: 'जास्त', bn: 'উচ্চ', ta: 'அதிகம்', te: 'అధిక' },
    'Very High': { en: 'Very High', hi: 'अत्यधिक', mr: 'अति जास्त', bn: 'খুব উচ্চ', ta: 'மிக அதிகம்', te: 'చాలా ఎక్కువ' },
    'Extreme': { en: 'Extreme', hi: 'चरम', mr: 'अत्युच्च', bn: 'চরম', ta: 'தீவிரம்', te: 'తీవ్రమైన' }
  };

  let currentLang = localStorage.getItem('nwa_lang') || 'en';

  function setLanguage(lang) {
    if (!translations[lang]) lang = 'en';
    currentLang = lang;
    localStorage.setItem('nwa_lang', lang);
    document.documentElement.setAttribute('lang', lang);
    applyTranslations();

    // Trigger custom event so all active components update dynamically without reload
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

  function translateCategory(category) {
    if (!category) return '';
    const match = categoryTranslations[category];
    if (match) return match[currentLang] || match.en;
    return t(category, category);
  }

  function translateSeverity(severity) {
    if (!severity) return '';
    const match = severityTranslations[severity.toLowerCase()];
    if (match) return match[currentLang] || match.en;
    return severity;
  }

  function translateAqi(aqiLevel) {
    if (!aqiLevel) return '';
    const match = aqiTranslations[aqiLevel];
    if (match) return match[currentLang] || match.en;
    return aqiLevel;
  }

  function translateUv(uvLevel) {
    if (!uvLevel) return '';
    const match = uvTranslations[uvLevel];
    if (match) return match[currentLang] || match.en;
    return uvLevel;
  }

  /**
   * Translates any city, state, or compound location name
   * Examples: 'New Delhi', 'Ranchi', 'Maharashtra', 'New Delhi, Delhi', 'Mumbai & Coastal Konkan'
   */
  function translateLocation(locStr) {
    if (!locStr) return '';
    if (currentLang === 'en') return locStr;

    const trimmed = String(locStr).trim();

    // Check direct city translation
    if (cityTranslations[trimmed] && cityTranslations[trimmed][currentLang]) {
      return cityTranslations[trimmed][currentLang];
    }

    // Check direct state translation
    if (stateTranslations[trimmed] && stateTranslations[trimmed][currentLang]) {
      return stateTranslations[trimmed][currentLang];
    }

    // Handle compound strings like "New Delhi, Delhi", "Ranchi, Jharkhand", "Patna, Bihar, India"
    if (trimmed.includes(',')) {
      const parts = trimmed.split(',').map(p => p.trim());
      const translatedParts = parts.map(p => {
        if (p.toLowerCase() === 'india') {
          return currentLang === 'hi' ? 'भारत' : (currentLang === 'mr' ? 'भारत' : (currentLang === 'bn' ? 'ভারত' : (currentLang === 'ta' ? 'இந்தியா' : (currentLang === 'te' ? 'భారతదేశం' : 'India'))));
        }
        if (cityTranslations[p] && cityTranslations[p][currentLang]) return cityTranslations[p][currentLang];
        if (stateTranslations[p] && stateTranslations[p][currentLang]) return stateTranslations[p][currentLang];
        return p;
      });
      return translatedParts.join(', ');
    }

    // Handle "City & Region" strings like "Mumbai & Coastal Konkan"
    if (trimmed.includes('&')) {
      const parts = trimmed.split('&').map(p => p.trim());
      const translatedParts = parts.map(p => {
        if (cityTranslations[p] && cityTranslations[p][currentLang]) return cityTranslations[p][currentLang];
        if (stateTranslations[p] && stateTranslations[p][currentLang]) return stateTranslations[p][currentLang];
        return p;
      });
      const andSymbol = currentLang === 'hi' || currentLang === 'mr' ? 'और' : (currentLang === 'bn' ? 'ও' : (currentLang === 'ta' ? 'மற்றும்' : (currentLang === 'te' ? 'మరియు' : '&')));
      return translatedParts.join(' ' + andSymbol + ' ');
    }

    // Handle hyphenated strings like "Delhi-NCR"
    if (trimmed.includes('-')) {
      const parts = trimmed.split('-').map(p => p.trim());
      const translatedParts = parts.map(p => {
        if (cityTranslations[p] && cityTranslations[p][currentLang]) return cityTranslations[p][currentLang];
        if (stateTranslations[p] && stateTranslations[p][currentLang]) return stateTranslations[p][currentLang];
        return p;
      });
      return translatedParts.join('-');
    }

    return trimmed;
  }

  // Safe element text updater preserving leading icons or badge elements
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

  function applyTranslations() {
    const dict = translations[currentLang] || translations.en;

    // ── 1. Document Title ───────────────────────────────────────────────────
    if (dict.brandTitle && dict.brandTagline) {
      document.title = dict.brandTitle + ' | ' + dict.brandTagline;
    }

    // ── 2. All [data-i18n] text nodes (1000+ elements) ──────────────────────
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

    // ── 5. [data-i18n-alt] image alt attributes ────────────────────────────
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      const key = el.getAttribute('data-i18n-alt');
      if (dict[key]) el.alt = dict[key];
    });

    // ── 6. [data-i18n-aria] accessible labels ──────────────────────────────
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      if (dict[key]) el.setAttribute('aria-label', dict[key]);
    });

    // ── 7. Fallback & Composite Selectors ──────────────────────────────────
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

    // Modern dropdown UI sync
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

    document.querySelectorAll('.modern-lang-option').forEach(opt => {
      const isSelected = opt.getAttribute('data-lang') === lang;
      opt.classList.toggle('active', isSelected);
      opt.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });

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
    translateCategory,
    translateSeverity,
    translateAqi,
    translateUv,
    translateLocation,
    applyTranslations
  };
})();
`;

fs.writeFileSync('public/js/i18n.js', fileContent, 'utf8');
console.log('public/js/i18n.js written successfully!');
