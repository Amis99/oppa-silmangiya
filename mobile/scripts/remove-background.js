const sharp = require('sharp');
const path = require('path');

async function removeBackgroundHeart(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

    const pixels = new Uint8Array(info.width * info.height * 4);

    for (let i = 0; i < info.width * info.height; i++) {
      const r = data[i * 3];
      const g = data[i * 3 + 1];
      const b = data[i * 3 + 2];

      // 체크무늬 배경 감지 (밝은 회색/흰색)
      const isGray = Math.abs(r - g) < 20 && Math.abs(g - b) < 20 && Math.abs(r - b) < 20;
      const isBackground = isGray && r > 150;

      pixels[i * 4] = r;
      pixels[i * 4 + 1] = g;
      pixels[i * 4 + 2] = b;
      pixels[i * 4 + 3] = isBackground ? 0 : 255;
    }

    await sharp(Buffer.from(pixels), {
      raw: { width: info.width, height: info.height, channels: 4 }
    }).png().toFile(outputPath);

    console.log(`Successfully processed: ${outputPath}`);
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error);
  }
}

async function removeBackgroundBrokenHeart(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

    const pixels = new Uint8Array(info.width * info.height * 4);

    for (let i = 0; i < info.width * info.height; i++) {
      const r = data[i * 3];
      const g = data[i * 3 + 1];
      const b = data[i * 3 + 2];

      // 체크무늬 배경 감지 (어두운/밝은 회색 체크)
      // 체크무늬는 회색 계열 (r≈g≈b)
      const isGray = Math.abs(r - g) < 25 && Math.abs(g - b) < 25 && Math.abs(r - b) < 25;

      // 하트의 빨간색/붉은색은 r > g, r > b
      const isRedish = r > g + 20 && r > b + 20;

      // 회색이고 붉은색이 아니면 배경
      const isBackground = isGray && !isRedish;

      pixels[i * 4] = r;
      pixels[i * 4 + 1] = g;
      pixels[i * 4 + 2] = b;
      pixels[i * 4 + 3] = isBackground ? 0 : 255;
    }

    await sharp(Buffer.from(pixels), {
      raw: { width: info.width, height: info.height, channels: 4 }
    }).png().toFile(outputPath);

    console.log(`Successfully processed: ${outputPath}`);
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error);
  }
}

async function main() {
  const assetsDir = path.join(__dirname, '..', 'assets', 'images');

  // heart.jpg -> heart.png
  await removeBackgroundHeart(
    path.join(assetsDir, 'heart.jpg'),
    path.join(assetsDir, 'heart.png')
  );

  // broken-heart.jpg -> broken-heart.png
  await removeBackgroundBrokenHeart(
    path.join(assetsDir, 'broken-heart.jpg'),
    path.join(assetsDir, 'broken-heart.png')
  );

  console.log('Done!');
}

main();
