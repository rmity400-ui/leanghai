import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // បន្ថែមបន្ទាត់នេះ

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // បន្ថែមពាក្យនេះក្នុង plugins
  ],
})