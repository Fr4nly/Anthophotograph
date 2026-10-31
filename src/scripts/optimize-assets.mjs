import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';

const IN = 'source-frames';
const STEP = 2; // 1 = todos los frames · 2 = uno de cada dos (recomendado)

const sets = [
  { dir: 'public/frames-lg', width: 1280, quality: 72 }, // escritorio
  { dir: 'public/frames-sm', width: 720, quality: 70 },  // móvil
];

const files = (await readdir(IN)).filter((f) => f.endsWith('.jpg')).sort();
const picked = files.filter((_, i) => i % STEP === 0);

for (const { dir, width, quality } of sets) {
  await mkdir(dir, { recursive: true });
  let n = 1;
  for (const f of picked) {
    await sharp(`${IN}/${f}`)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 5 })
      .toFile(`${dir}/frame-${String(n++).padStart(3, '0')}.webp`);
  }
  console.log(`${dir}: ${picked.length} frames`);
}

// Foto de "Sobre mí"
await sharp('public/Perfil-Anthony.jpg')
  .resize({ width: 900, withoutEnlargement: true })
  .webp({ quality: 78 })
  .toFile('public/Perfil-Anthony.webp');
console.log('Foto de perfil lista');