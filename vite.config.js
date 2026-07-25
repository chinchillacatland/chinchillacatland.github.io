import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base 對應部署路徑：組織首頁 https://chinchillacatland.github.io/ 是網域根目錄，
// 不像之前 https://bo08042.github.io/chinchilla-cat-land/ 有子路徑，所以要用 '/'
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
