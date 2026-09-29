const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');

// We want to identify all tags containing visible human text.
// Skip <script> and <style> tags.
// Let's remove script and style bodies temporarily to inspect only DOM markup.

let cleanHtml = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, (m) => '<!-- SCRIPT -->');
cleanHtml = cleanHtml.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, (m) => '<!-- STYLE -->');
cleanHtml = cleanHtml.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, (m) => '<!-- SVG -->');

// Find all text between > and <
const textRegex = />([^<]+)</g;
let m;
const textNodes = [];

while ((m = textRegex.exec(cleanHtml)) !== null) {
  const raw = m[1];
  const trimmed = raw.trim();
  // Filter out whitespace-only, numbers/symbols only, or template placeholders like --°C
  if (trimmed.length > 0 && !/^[\d\s°%.,:;/\-+~()#&;]+$/.test(trimmed)) {
    // Check if it's not a comment or code artifact
    if (!trimmed.startsWith('//') && !trimmed.startsWith('/*') && !trimmed.startsWith('<!--')) {
      textNodes.push({
        text: trimmed,
        index: m.index,
        raw
      });
    }
  }
}

console.log('Total human text nodes found:', textNodes.length);

// Extract placeholders
const phRegex = /placeholder="([^"]+)"/gi;
const placeholders = [];
while ((m = phRegex.exec(cleanHtml)) !== null) {
  placeholders.push(m[1].trim());
}
console.log('Total placeholders found:', placeholders.length);

// Extract titles
const titleRegex = /\stitle="([^"]+)"/gi;
const titles = [];
while ((m = titleRegex.exec(cleanHtml)) !== null) {
  titles.push(m[1].trim());
}
console.log('Total titles found:', titles.length);

// Extract alts
const altRegex = /\salt="([^"]+)"/gi;
const alts = [];
while ((m = altRegex.exec(cleanHtml)) !== null) {
  alts.push(m[1].trim());
}
console.log('Total alts found:', alts.length);

fs.writeFileSync('scratch/scanned_raw_texts.json', JSON.stringify({
  textNodes,
  placeholders: [...new Set(placeholders)],
  titles: [...new Set(titles)],
  alts: [...new Set(alts)]
}, null, 2));

console.log('Unique text strings count:', new Set(textNodes.map(t => t.text)).size);
