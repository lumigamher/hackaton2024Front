import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',  // Define `global` como `globalThis`
  },
  resolve: {
    alias: {
      util: 'rollup-plugin-node-polyfills/polyfills/util', // Ejemplo para util si fuera necesario
    },
  },
  server: {
    proxy: {
      '/ws': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        ws: true, // Permitir WebSockets
      },
    },
  },
});
