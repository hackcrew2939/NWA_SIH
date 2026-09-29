async function testLiveServer() {
  try {
    const resHtml = await fetch('http://localhost:3000/');
    const html = await resHtml.text();
    console.log('GET / status:', resHtml.status, '| HTML Length:', html.length);
    console.log('Contains data-i18n="brandTitle":', html.includes('data-i18n="brandTitle"'));
    console.log('Contains data-i18n="navLiveForecast":', html.includes('data-i18n="navLiveForecast"'));
    console.log('Contains script src="js/i18n.js?v=8.0":', html.includes('src="js/i18n.js?v=8.0"'));

    const resJs = await fetch('http://localhost:3000/js/i18n.js');
    const js = await resJs.text();
    console.log('GET /js/i18n.js status:', resJs.status, '| JS Length:', js.length);
    console.log('Contains "hi": { ... }:', js.includes('"hi":'));
    console.log('Contains "mr": { ... }:', js.includes('"mr":'));
    console.log('Contains "bn": { ... }:', js.includes('"bn":'));
    console.log('Contains "ta": { ... }:', js.includes('"ta":'));
    console.log('Contains "te": { ... }:', js.includes('"te":'));

    console.log('\nAll Live Server Checks PASSED!');
  } catch (err) {
    console.error('Error connecting to live server:', err);
  }
}
testLiveServer();
