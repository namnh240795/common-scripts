const fs = require('fs');
const XLSX = require('xlsx');

const workbook = XLSX.readFile('src/utils/locales/locale.xlsx', {
  type: 'file',
  bookType: 'xlsx',
  raw: true,
});

const languageSheet = workbook.Sheets[workbook.SheetNames[0]];

const languageSheetData = XLSX.utils.sheet_to_json(languageSheet);

const languages = ['vi', 'en'];
const transObject = {};

languages.map(e => (transObject[e] = {}));

languageSheetData.map(e => {
  languages.map(lang => {
    const key = e.key;
    const tran = e[lang];
    transObject[lang][key] = tran;
  });
});

languages.map(e => {
  fs.writeFileSync(
    `src/utils/locales/${e}.json`,
    JSON.stringify(transObject[e]),
    'utf8',
  );
});
