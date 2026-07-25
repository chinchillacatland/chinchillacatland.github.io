import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

const base = import.meta.env.BASE_URL.replace(/\/$/, '')

// 相容舊版 hash 路由連結（/#/games/xxx → /games/xxx），
// 網站初期曾以 HashRouter 上線，避免已分享出去的舊連結失效
if (window.location.hash.startsWith('#/')) {
  window.history.replaceState(null, '', base + window.location.hash.slice(1))
}

const app = (
  <StrictMode>
    <BrowserRouter basename={base}>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// 預渲染過的頁面（root 內已有 HTML）用 hydrate 接手；
// dev 模式下 root 是空的，直接客戶端渲染
const container = document.getElementById('root')
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
