import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base 對應部署路徑：部署在網域根目錄（組織首頁／自訂網域）用 '/'，
// 若改回專案子路徑形式（<帳號>.github.io/repo名/）才需要改成對應的子路徑
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
