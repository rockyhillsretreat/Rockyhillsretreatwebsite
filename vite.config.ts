import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/', // Explicit SPA base path
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/app', import.meta.url)),
    },
  },
})
