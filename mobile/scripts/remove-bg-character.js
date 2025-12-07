const sharp = require('sharp');
const path = require('path');

async function removeBackgroundCharacter(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

    const pixels = new Uint8Array(info.width * info.height * 4);

    for (let i = 0; i < info.width * info.height; i++) {
      const r = data[i * 3];
      const g = data[i * 3 + 1];
      const b = data[i * 3 + 2];

      // 체크무늬 배경 감지 (회색 계열)
      const isGray = Math.abs(r - g) < 20 && Math.abs(g - b) < 20 && Math.abs(r - b) < 20;
      const isBackground = isGray && r > 180;

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

  // teacher-character.jpg -> teacher-character.png
  await removeBackgroundCharacter(
    path.join(assetsDir, 'teacher-character.jpg'),
    path.join(assetsDir, 'teacher-character.png')
  );

  // oppa-character.jpg -> oppa-character.png
  await removeBackgroundCharacter(
    path.join(assetsDir, 'oppa-character.jpg'),
    path.join(assetsDir, 'oppa-character.png')
  );

  console.log('Done!');
}

main();
