import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/React-Mobile-POS-Project/', // 👈 IMPORTANT (must match repo name)
})
