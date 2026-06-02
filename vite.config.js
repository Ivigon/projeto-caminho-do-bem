import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './' // <-- Esta linha é o segredo para a tela não ficar branca no .exe
})