import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/kimok-website/',
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ['src/variables'],
      },
    },
  },
})
