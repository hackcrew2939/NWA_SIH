const fs = require('fs');

const locs = JSON.parse(fs.readFileSync('scratch/locations_i18n_dict.json', 'utf8'));
console.log('States in dict:', Object.keys(locs.stateTranslations || {}).length);
console.log('Cities in dict:', Object.keys(locs.cityTranslations || {}).length);
