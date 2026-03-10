import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // appType: 'spa' varsayılandır — /ui-kit gibi rotalar için history API fallback otomatik aktif
})
