const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

// Let's create an inventory of all text in index.html grouped by component/section:
// 1. Sidebar & Nav
// 2. Header & Search
// 3. Live Weather (Hero, Telemetry, Metrics, Map, Diurnal, Forecast)
// 4. Weather Alerts (Banner, Hub, Personal Alert Form, Alerts List)
// 5. Citizen Reports (Header, Tabs, Search/Filters, Report Cards)
// 6. Social Intelligence (Header, Tabs/Platforms, Monitored Tags, Ingestion, Feed)
// 7. Analytics (Header, Stat Cards, Charts, Station Observations, Live Feed)
// 8. Official Reports (Header, Buttons, Telemetry preview, Table 1, Table 2)
// 9. Admin Panel (Login screen, Dashboard header, Quick actions, Filters, Queue table)
// 10. Modals:
//     - Citizen Report Modal (reportModal)
//     - Alert Dispatch Modal (alertDispatchModal)
//     - AI Forensics Modal (aiForensicsModal)
//     - Big Data Pipeline Modal (bigDataModal)
// 11. Footer

const sections = [
  { name: 'sidebar', start: '<aside', end: '</aside>' },
  { name: 'header', start: '<header', end: '</header>' },
  { name: 'live_weather', start: 'id="live-weather-view"', end: '</section>' },
  { name: 'weather_alerts', start: 'id="weather-alerts-view"', end: '</section>' },
  { name: 'citizen_reports', start: 'id="citizen-reports-view"', end: '</section>' },
  { name: 'social_stream', start: 'id="social-stream-view"', end: '</section>' },
  { name: 'analytics', start: 'id="analytics-view"', end: '</section>' },
  { name: 'official_reports', start: 'id="official-reports-view"', end: '</section>' },
  { name: 'admin_panel', start: 'id="admin-panel-view"', end: '</section>' },
  { name: 'report_modal', start: 'id="reportModal"', end: 'id="aiForensicsModal"' },
  { name: 'ai_forensics_modal', start: 'id="aiForensicsModal"', end: 'id="alertDispatchModal"' },
  { name: 'alert_dispatch_modal', start: 'id="alertDispatchModal"', end: 'id="bigDataModal"' },
  { name: 'bigdata_modal', start: 'id="bigDataModal"', end: 'id="imageEnlargeModal"' },
  { name: 'footer', start: '<footer', end: '</footer>' }
];

const inventory = {};

sections.forEach(sec => {
  const sIdx = html.indexOf(sec.start);
  if (sIdx === -1) {
    console.log('Section not found:', sec.name);
    return;
  }
  let eIdx;
  if (sec.end.startsWith('id=')) {
    eIdx = html.indexOf(sec.end, sIdx);
  } else {
    eIdx = html.indexOf(sec.end, sIdx) + sec.end.length;
  }
  const chunk = html.substring(sIdx, eIdx);
  
  // Extract all human text strings
  const texts = [];
  const textRegex = />([^<]+)</g;
  let m;
  while ((m = textRegex.exec(chunk)) !== null) {
    const t = m[1].trim();
    if (t && t.length > 1 && !/^[0-9\s°%.,:;/\-+~()#]+$/.test(t) && !t.startsWith('//') && !t.startsWith('/*')) {
      texts.push(t);
    }
  }
  
  // Extract all placeholders
  const phs = [];
  const phRegex = /placeholder="([^"]+)"/g;
  while ((m = phRegex.exec(chunk)) !== null) {
    phs.push(m[1]);
  }

  // Extract all titles
  const titles = [];
  const tRegex = /\stitle="([^"]+)"/g;
  while ((m = tRegex.exec(chunk)) !== null) {
    titles.push(m[1]);
  }

  inventory[sec.name] = {
    texts: [...new Set(texts)],
    placeholders: [...new Set(phs)],
    titles: [...new Set(titles)]
  };
});

fs.writeFileSync('scratch/inventory.json', JSON.stringify(inventory, null, 2));

for (const [k, v] of Object.entries(inventory)) {
  console.log(`${k}: ${v.texts.length} texts, ${v.placeholders.length} phs, ${v.titles.length} titles`);
}
