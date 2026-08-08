// 集中管理站內連結網址格式。
//
// 預渲染輸出是「資料夾 + index.html」結構（例如 games/greedy-cat/index.html），
// GitHub Pages 對「造訪資料夾網址但沒加結尾斜線」會自動 301 轉址到有斜線的版本。
// 站內連結若沒有結尾斜線，Google 爬蟲/使用者點擊都會先經過一次轉址，會被
// Search Console 的「要求建立索引」判定為轉址錯誤而失敗。所有內部連結一律
// 透過這裡的函式產生，統一補上結尾斜線，換路由結構時也只需要改這一個檔案。
export const paths = {
  home: () => '/',
  knowledge: () => '/knowledge/',
  article: (slug) => `/knowledge/${slug}/`,
  games: () => '/games/',
  game: (id) => `/games/${id}/`,
  tools: () => '/tools/',
  tool: (id) => `/tools/${id}/`,
  about: () => '/about/',
  privacy: () => '/privacy/',
}
