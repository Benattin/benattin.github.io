import { defineConfig } from 'vite';

// Gera um index.html único na raiz do projeto, com JS, CSS, fontes e imagens embutidos,
// para abrir com dois cliques (file://), onde o navegador bloqueia módulos e arquivos externos.
const singleFile = {
  name: 'single-file',
  enforce: 'post',
  generateBundle(_, bundle) {
    const html = Object.values(bundle).find((f) => f.fileName.endsWith('.html'));
    if (!html) return;
    let source = String(html.source);
    for (const file of Object.values(bundle)) {
      const name = file.fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (file.type === 'chunk') {
        const code = file.code.replace(/<\/script/gi, '<\\/script');
        source = source.replace(new RegExp(`<script[^>]*${name}[^>]*></script>`), '');
        source = source.replace('</body>', () => `<script>${code}</script>\n</body>`);
        delete bundle[file.fileName];
      } else if (file.fileName.endsWith('.css')) {
        source = source.replace(new RegExp(`<link[^>]*${name}[^>]*>`), () => `<style>${file.source}</style>`);
        delete bundle[file.fileName];
      }
    }
    html.source = source;
  },
};

export default defineConfig({
  root: 'src',
  base: './',
  publicDir: '../public',
  plugins: [singleFile],
  build: {
    outDir: '..',
    emptyOutDir: false,
    assetsInlineLimit: 100_000_000,
    modulePreload: false,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: { format: 'iife', inlineDynamicImports: true },
    },
  },
});
