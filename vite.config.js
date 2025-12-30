// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://script.google.com/macros/s/AKfycbzxjdhxmA8Pr8tZSWylcY7XOVek4p7U5ajtF4FQaDVSiw3JDbcVt8iiy6Bnn2n7QvK5/exec',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
      },
    },
  },
})