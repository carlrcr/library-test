import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'components/Button': resolve(__dirname, 'src/components/Button.tsx'),
        'components/Card': resolve(__dirname, 'src/components/Card.tsx')
      },
      name: 'MyReactLibrary',
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.[hash].js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            // Extraer el nombre del componente del nombre del archivo
            const name = assetInfo.name.replace('.css', '');
            // Si es un componente (Button, Card), ponerlo en components/
            if (name === 'Button' || name === 'Card') {
              return `components/${name}.[hash].css`;
            }
            return `${name}.[hash].css`;
          }
          return 'assets/[name].[hash][extname]';
        },
        preserveModules: false, // Desactivamos preserveModules para usar entry points
      }
    },
    cssCodeSplit: true,
    cssMinify: true,
    sourcemap: true
  },
  css: {
    postcss: './postcss.config.js'
  }
});