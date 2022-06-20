const iconJson = require('../src/components/Icon/icon.json');
const fs = require('fs');

console.log(iconJson.icons.map(e => e.properties.name));

fs.writeFileSync(
  'src/components/Icon/type.tsx',
  `export type IconType = ${iconJson.icons
    .map(e => `'${e.properties.name}'`)
    .join('|')}`,
  'utf8',
);
