export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://mapmentor.vercel.app/sitemap.xml',
  }
}