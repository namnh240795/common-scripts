const fs = require('fs');
const { iconList } = require('react-icomoon');

const iconSet = require('../src/components/Icon/selection.json');

const getTemplate = () => {
  const names = iconList(iconSet);

  const template = ` 
    export default interface IconI {
      icon: ${names.map((name) => `'${name}'`).join(' | ')};
      color?: string;
      size?: string | number;
      className?: string;
      style?: React.CSSProperties;
      [name: string]: any;
    }
  `;

  return template;
};

const generate = (interfacePath) => {
  const template = getTemplate();

  fs.writeFileSync(interfacePath, template, 'utf8');
};

generate('src/components/Icon/icon.interface.ts');
