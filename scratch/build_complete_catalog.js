const fs = require('fs');

const untagged = JSON.parse(fs.readFileSync('scratch/untagged_simple.json', 'utf8'));
const rawData = JSON.parse(fs.readFileSync('scratch/scanned_raw_texts.json', 'utf8'));

// Unique text collection
const catalog = new Map(); // text -> { key, tags: Set, occurrences: number }

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .substring(0, 35);
}

// 1. Process untagged elements
untagged.forEach(item => {
  const t = item.text.trim();
  if (!t || t.length < 2) return;
  if (/^[\d\s°%.,:;/\-+~()#&;]+$/.test(t)) return;
  if (t === '&times;' || t === '•') return;

  if (!catalog.has(t)) {
    let prefix = 'txt';
    if (['h1','h2','h3','h4','h5','h6'].includes(item.tag)) prefix = 'hdr';
    else if (item.tag === 'button') prefix = 'btn';
    else if (item.tag === 'label') prefix = 'lbl';
    else if (item.tag === 'p') prefix = 'p';
    else if (item.tag === 'option') prefix = 'opt';
    else if (item.tag === 'th') prefix = 'th';
    else if (item.tag === 'a') prefix = 'lnk';

    const slug = slugify(t);
    const key = `${prefix}_${slug}`;
    catalog.set(t, { key, tag: item.tag, text: t, count: 1 });
  } else {
    catalog.get(t).count++;
  }
});

// 2. Process placeholders
rawData.placeholders.forEach(ph => {
  const t = ph.trim();
  if (t && !catalog.has(t)) {
    catalog.set(t, { key: `ph_${slugify(t)}`, tag: 'input', text: t, count: 1 });
  }
});

// 3. Process titles
rawData.titles.forEach(ti => {
  const t = ti.trim();
  if (t && !catalog.has(t)) {
    catalog.set(t, { key: `title_${slugify(t)}`, tag: 'attr', text: t, count: 1 });
  }
});

console.log(`Total unique human text items in catalog: ${catalog.size}`);

const catalogArray = Array.from(catalog.values());
fs.writeFileSync('scratch/catalog_items.json', JSON.stringify(catalogArray, null, 2));

console.log('Sample catalog items:');
console.log(catalogArray.slice(0, 25));
