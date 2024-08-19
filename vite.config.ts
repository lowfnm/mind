import react from '@vitejs/plugin-react';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';
import Sitemap from 'vite-plugin-sitemap';
import svgr from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';

import { aliases } from './config/aliases';
import { RoutesEnum } from './src/enums';

export default defineConfig({
  base: '/',
  build: {
    emptyOutDir: true,
    target: browserslistToEsbuild(),
    cssMinify: 'lightningcss',
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name].[hash].js',
        entryFileNames: 'js/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        manualChunks: {
          reactVendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  plugins: [
    Sitemap({
      hostname: 'http://localhost:3000',
      changefreq: 'weekly',
      priority: 0.5,
      dynamicRoutes: Object.values(RoutesEnum).filter(
        (route) => !route.includes(':'),
      ),
    }),
    react(),
    viteTsconfigPaths(),
    svgr({
      svgrOptions: {
        exportType: 'named',
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: '**/*.svg',
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
      webp: {
        quality: 75,
      },
    }),
  ],
  server: {
    host: 'localhost',
    port: 3000,
  },
  css: {
    transformer: 'lightningcss',
  },
  assetsInclude: ['**/*.svg'],
  resolve: {
    alias: aliases,
  },
});
