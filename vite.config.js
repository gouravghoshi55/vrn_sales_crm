// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://script.google.com/macros/s/AKfycbwdkTmYVfCCtjo8Sxlznr9_-xIowHy0TB9Hz1_y4ui3RvY0clRJTa8wsHaMEXRVY2zG/exec',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
      },
    },
  },
})