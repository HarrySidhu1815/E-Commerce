import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      'react-router-dom': path.resolve('node_modules/react-router-dom')
    }
  },
  build: {
    rollupOptions: {
      external: ['react-toastify', 'axios'] 
    }
  }
})
