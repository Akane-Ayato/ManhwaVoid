import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load unprefixed variables too. API_BASE_URL is intentionally public because
  // the browser connects directly to the VPS API.
  const env = loadEnv(mode, process.cwd(), '');
  const target = env.VITE_DEV_API_TARGET || 'http://127.0.0.1:8000';

  return {
    plugins: [react()],
    define: {
      // Vite does not expose unprefixed variables to client code by default.
      // Explicitly expose only this public API base URL at build time.
      'import.meta.env.API_BASE_URL': JSON.stringify(env.API_BASE_URL || ''),
    },
    server: {
      port: 5173,
      proxy: { '/api': { target, changeOrigin: true } },
    },
    preview: {
      port: 4173,
      proxy: { '/api': { target, changeOrigin: true } },
    },
    build: { sourcemap: false, chunkSizeWarningLimit: 700 },
  };
});
