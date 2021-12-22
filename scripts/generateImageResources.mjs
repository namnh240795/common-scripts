import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import fs from 'fs';

(async () => {
  await imagemin(['public/assets/images/*.{jpg,png,gif,svg}'], {
    destination: 'public/assets/images',
    plugins: [imageminWebp({ quality: 100 })],
  });

  const imageFileNames = () => {
    const array = fs
      .readdirSync('public/assets/images')
      .filter((file) => {
        return file.endsWith('.webp');
      })
      .map((e) => e.replace('.webp', ''));
    return array;
  };

  const names = imageFileNames();

  const template = ` 
    export default interface IconI {
      name: ${names.map((name) => `'${name}'`).join(' | ')};
      className?: string;
      style?: React.CSSProperties;
      [name: string]: any;
    }
  `;

  fs.writeFileSync('src/components/Image/image.interface.ts', template, 'utf8');
})();
