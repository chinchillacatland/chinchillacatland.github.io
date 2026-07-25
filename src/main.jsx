import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// GitHub Pages 沒有 server-side rewrite，先以 HashRouter 上線。
// 日後若為 SEO 遷移到 BrowserRouter + 預渲染（SSR 產出各路由的真實 HTML），
// 記得保留 #/ 舊連結的轉址相容。規劃見 docs/chinchilla-cat-land/browserrouter-prerender-plan.md
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
