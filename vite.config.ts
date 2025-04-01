import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: false, // Will try alternative ports if 3000 is taken
    host: true, // Listen on all addresses, including LAN and public addresses
    open: true, // Automatically open browser
    cors: true, // Enable CORS
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}) 