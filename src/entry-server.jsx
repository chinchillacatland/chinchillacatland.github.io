import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'

// 給 scripts/prerender.mjs 使用：路由清單與每頁 meta
export { games } from './data/games'
export { articles } from './content/articles'
export { tools } from './tools'
export { getMeta, SITE } from './seo'

const base = import.meta.env.BASE_URL.replace(/\/$/, '')

// url 需含 base，讓輸出 HTML 內的連結 href 帶有正確的部署路徑
export function render(url) {
  return renderToString(
    <StaticRouter location={url} basename={base}>
      <App />
    </StaticRouter>,
  )
}
