const fs = require('fs');

let i18n = fs.readFileSync('public/js/i18n.js', 'utf8');

const extraConditions = `
    'Dense Fog': { hi: 'घना कोहरा', mr: 'दाट धुके', bn: 'ঘন কুয়াশা', ta: 'அடர்ந்த பனிமூட்டம்', te: 'దట్టమైన పొగమంచు' },
    'Light Fog': { hi: 'हल्का कोहरा', mr: 'हलके धुके', bn: 'হালকা কুয়াশা', ta: 'லேசான பனிமூட்டம்', te: 'తేలికపాటి పొగమంచు' },
    'Heavy Rain': { hi: 'भारी बारिश', mr: 'मुसळधार पाऊस', bn: 'ভারী বৃষ্টি', ta: 'கனமழை', te: 'భారీ వర్షం' },
    'Thunderstorm': { hi: 'गरज-चमक के साथ तूफान', mr: 'वादळी पाऊस', bn: 'বজ্রঝড়', ta: 'இடிமின்னல் புயல்', te: 'ఉరుముల తుఫాను' },
    'Clear': { hi: 'साफ', mr: 'स्वच्छ', bn: 'পরিষ্কার', ta: 'தெளிவானது', te: 'నిర్మలంగా' },
    'Cloudy': { hi: 'बादल छाए रहेंगे', mr: 'ढगाळ', bn: 'মেঘলা', ta: 'மேகமூட்டம்', te: 'మేఘావృతం' },
`;

if (!i18n.includes("'Dense Fog'")) {
  i18n = i18n.replace(/const conditionTranslations = \{/, 'const conditionTranslations = {' + extraConditions);
  fs.writeFileSync('public/js/i18n.js', i18n, 'utf8');
  console.log('Added extra conditions to i18n.js');
}
