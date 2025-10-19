/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  
  return {
    plugins: [react()],
    server: isDev ? {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          secure: false,
          ws: true,
          configure: (proxy, _options) => {
            proxy.on('error', (_err, _req, _res) => {
            });
            proxy.on('proxyReq', (_proxyReq, _req, _res) => {
            });
            proxy.on('proxyRes', (_proxyRes, _req, _res) => {
            });
          },
        }
      }
    } : undefined,
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: 'terser',
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      css: true,
      testTimeout: 10000,
    },
  }
})
