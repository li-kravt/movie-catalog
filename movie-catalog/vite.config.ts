import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost'},
    port: 5177,
    strictPort: true
  },
  plugins: [react()],
})
