import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ELECTROGUARD-A/' // غيّرها لاسم مستودعك لو مختلف
})
