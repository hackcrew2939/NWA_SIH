const fs = require('fs');

const items = JSON.parse(fs.readFileSync('scratch/cleaned_ui_elements.json', 'utf8'));

// Group items into categories so we can inspect and translate them cleanly:
// 1. Navigation & Brand
// 2. Weather & Metrics
// 3. Alerts & Warnings
// 4. Reports & Crowdsourcing
// 5. Social Intelligence
// 6. Analytics & Charts
// 7. Official Reports & Export
// 8. Admin & Security & Benchmark
// 9. Modals & Forms
// 10. Footer & Legal

console.log('Total items to map:', items.length);

// Let's create an inventory of all unique English texts
const uniqueTexts = new Map();
items.forEach(it => {
  if (!uniqueTexts.has(it.text)) {
    uniqueTexts.set(it.text, { key: it.key, tag: it.tag, text: it.text });
  }
});

console.log('Unique English text strings:', uniqueTexts.size);

fs.writeFileSync('scratch/unique_strings_to_translate.json', JSON.stringify(Array.from(uniqueTexts.values()), null, 2));
