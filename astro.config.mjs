// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://fr4nly.github.io',
  base: '/Anthophotograph',
  vite: {
    plugins: [tailwindcss()],
  },
    compressHTML: true,
  build: { inlineStylesheets: 'always' },
});

