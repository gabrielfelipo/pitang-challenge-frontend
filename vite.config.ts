import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tspaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tspaths()],
  build: {
    minify: 'esbuild',
  },
  worker: {
    plugins: () => [react()],
    format: 'es',
  },
})
