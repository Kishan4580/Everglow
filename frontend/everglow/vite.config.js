import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import process from 'process'
import { log } from 'console'
// https://vite.dev/config/
console.log(process.env.SERVER_URL);

export default defineConfig({
  plugins: [react(), tailwindcss(),],
  define: {
    'import.meta.env.SERVER_URL': JSON.stringify(process.env.SERVER_URL)
  }
})