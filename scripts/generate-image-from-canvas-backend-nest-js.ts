import { Controller, Res, StreamableFile, Get } from '@nestjs/common';
import { SeoImagesService } from './seo-images.service';
import { ApiTags } from '@nestjs/swagger';
import * as cv from 'canvas';
import { Response } from 'express';
import { join } from 'path';

@ApiTags('seo-images')
@Controller('seo-images')
export class SeoImagesController {
  constructor(private readonly seoImagesService: SeoImagesService) {
    const fontNames = [
      // get all files names from the fonts folder

      'FilsonSoft-Black.otf',
      'FilsonSoft-BlackItalic.otf',
      'FilsonSoft-Bold.otf',
      'FilsonSoft-BoldItalic.otf',
      'FilsonSoft-Book.otf',
      'FilsonSoft-BookItalic.otf',
      'FilsonSoft-Heavy.otf',
      'FilsonSoft-HeavyItalic.otf',
      'FilsonSoft-Light.otf',
      'FilsonSoft-LightItalic.otf',
      'FilsonSoft-Medium.otf',
      'FilsonSoft-MediumItalic.otf',
      'FilsonSoft-Regular.otf',
      'FilsonSoft-Thin.otf',
      'FilsonSoft-ThinItalic.otf',

      // 'FilsonSoft-Bold.otf',
      // 'FilsonSoft-Light.otf',
      // 'FilsonSoft-Regular.otf',
      // 'FilsonSoft-Thin.otf',
    ];
    for (const fontName of fontNames) {
      cv.registerFont(
        join(
          process.cwd(),
          `src/share_modules/seo-images/assets/fonts/${fontName}`,
        ),
        { family: 'FilsonSoft' },
      );
    }
  }

  @Get()
  async create(@Res() res: Response) {
    const canvas = cv.createCanvas(800, 800);

    const ctx = canvas.getContext('2d');

    await cv
      .loadImage(
        join(
          (process.cwd(),
          'src/share_modules/seo-images/assets/img/background_img.png'),
        ),
      )
      .then((image) => {
        ctx.drawImage(image, 0, 0, 800, 800);
      });
    ctx.rect(0, 0, 800, 800);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fill();

    await cv
      .loadImage(
        join(
          (process.cwd(), 'src/share_modules/seo-images/assets/img/logo.png'),
        ),
      )
      .then((image) => {
        ctx.drawImage(image, 277.145, 50, 245.71, 40);
      });

    // gradient text 45 degree
    ctx.font = 'thin italic 35px "FilsonSoft"';

    const gradient = ctx.createLinearGradient(
      0,
      0,
      ctx.measureText('Nam Nguyen').width * Math.cos(45),
      (ctx.measureText('Nam Nguyen').actualBoundingBoxAscent +
        ctx.measureText('Nam Nguyen').actualBoundingBoxDescent) *
        Math.sin(45),
    );
    gradient.addColorStop(0, 'rgba(8,233,248,1)');
    gradient.addColorStop(1.0, 'rgba(0,255,210,1)');

    ctx.fillStyle = gradient;

    ctx.textAlign = 'center';

    ctx.fillText('Nam Nguyen', 400, 400);

    return canvas.toBuffer((err, buf) => {
      return new StreamableFile(buf).getStream().pipe(res);
    }, 'image/png');
  }
}
