// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  base: isProd ? '/ELECTROGUARD-A/' : '/',
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } }

})
