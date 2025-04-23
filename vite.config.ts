import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  define: {
    // Provide fallback values for environment variables
    'import.meta.env.VITE_APIKEY': JSON.stringify('YOUR_OPENWEATHER_API_KEY')
  }
})
