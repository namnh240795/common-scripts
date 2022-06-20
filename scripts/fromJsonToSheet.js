const en = require('../src/utils/locales/en.json');
const vi = require('../src/utils/locales/vi.json');

const XLSX = require('xlsx');

const keys = Object.keys(en);

const newbook = XLSX.utils.book_new();

const aoa = [['key', 'en', 'vi']];

keys.map((e, index) => {
  aoa.push([
    e,
    en[e],
    vi[e] ? vi[e] : { t: 'n', f: `GOOGLETRANSLATE(B${index + 2};"en";"vi")` },
  ]);
});

const ws = XLSX.utils.aoa_to_sheet(aoa);

XLSX.utils.book_append_sheet(newbook, ws, 'Translation');

XLSX.writeFile(newbook, './src/utils/locales/locale.xlsx', {});
