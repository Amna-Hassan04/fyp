import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ar': 'http://localhost:8000',
    }
  }
  // Look for something like this in vite.config.js
// server: {
//   proxy: {
//     '/api': 'http://localhost:8000', // Good: only proxies API paths
//     // If it says '/': 'http://localhost:8000', it's breaking your HTML pages!
//   }
// }
})