// 預渲染腳本：在 vite build（客戶端）與 vite build --ssr（伺服端）之後執行，
// 把每條路由渲染成真實 HTML 寫進 dist/，讓 GitHub Pages 直接伺服、搜尋引擎可個別索引。
// 同時產出 sitemap.xml 與 404.html。
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

const { render, games, articles, tools, getMeta, SITE } = await import(
  new URL('../dist-server/entry-server.js', import.meta.url).href
)

const routes = [
  '/',
  '/knowledge',
  ...articles.map((a) => `/knowledge/${a.slug}`),
  '/games',
  ...games.filter((g) => g.status === 'live').map((g) => `/games/${g.id}`),
  '/tools',
  ...tools.map((t) => `/tools/${t.id}`),
  '/about',
  '/privacy',
]

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8')

function escapeHtml(s) {
  return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;')
}

function canonicalUrl(route) {
  return `${SITE.origin}${route === '/' ? '/' : `${route}/`}`
}

function buildHead(route) {
  const meta = getMeta(route)
  const title = escapeHtml(meta.title)
  const description = escapeHtml(meta.description)
  const url = canonicalUrl(route)
  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE.name)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="zh_TW" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
  ].join('\n    ')
}

function renderPage(route, { withCanonical = true } = {}) {
  const appHtml = render(route)
  let head = buildHead(route)
  if (!withCanonical) {
    head = head
      .split('\n')
      .filter((line) => !line.includes('rel="canonical"'))
      .join('\n')
  }
  return template.replace('<!--app-head-->', head).replace('<!--app-html-->', appHtml)
}

for (const route of routes) {
  const outDir = route === '/' ? dist : path.join(dist, route.slice(1))
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'index.html'), renderPage(route))
  console.log(`prerendered ${route}`)
}

// 404 頁：GitHub Pages 對不存在的路徑會伺服 404.html（不該有 canonical）
fs.writeFileSync(path.join(dist, '404.html'), renderPage('/not-found', { withCanonical: false }))
console.log('prerendered /404.html')

// sitemap.xml
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${canonicalUrl(r)}</loc></url>`).join('\n')}
</urlset>
`
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)
console.log(`sitemap.xml written (${routes.length} urls)`)
