import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/my-vite-app/', // 👈 IMPORTANT (must match repo name)
})
