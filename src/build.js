/**
 * Static Site Generator for The_89_Blog
 * Builds the blog into the dist/ folder for Cloudflare Pages
 */

const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Clean dist folder
const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true, force: true });
}
fs.mkdirSync(DIST, { recursive: true });

// Marked options (GFM + line breaks)
marked.setOptions({
  breaks: true,
  gfm: true
});

const VIEWS_DIR = path.join(ROOT, 'src', 'views');
const PUBLIC_DIR = path.join(ROOT, 'src', 'public');
const DATA_DIR = path.join(ROOT, 'data');

// Load posts
const postsPath = path.join(DATA_DIR, 'posts.json');
let posts = [];
if (fs.existsSync(postsPath)) {
  posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
}
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// Render helper
function renderTemplate(templatePath, outputPath, locals = {}) {
  const fullPath = path.join(VIEWS_DIR, templatePath);
  const html = ejs.renderFile(fullPath, locals, {}, (err, str) => {
    if (err) throw err;
    const outPath = path.join(DIST, outputPath);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, str);
    console.log(`✓ ${outputPath}`);
  });
}

console.log('🏗️  Building static site...\n');

// Build pages
renderTemplate('index.ejs', 'index.html', { posts });
posts.forEach(post => {
  renderTemplate('post.ejs', `post/${post.slug}/index.html`, { post });
});
renderTemplate('admin.ejs', 'admin.html', { posts });
renderTemplate('404.ejs', '404.html', {});

// Copy public assets
function copyRecursive(src, dest) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(item => {
      copyRecursive(path.join(src, item), path.join(dest, item));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}
copyRecursive(PUBLIC_DIR, path.join(DIST, ''));

// Copy highlight.js CSS (self-hosted)
const HLJS_CSS_SRC = path.join(ROOT, 'node_modules', 'highlight.js', 'styles', 'github.min.css');
const HLJS_CSS_DEST = path.join(DIST, 'css', 'highlight.min.css');
if (fs.existsSync(HLJS_CSS_SRC)) {
  fs.mkdirSync(path.dirname(HLJS_CSS_DEST), { recursive: true });
  fs.copyFileSync(HLJS_CSS_SRC, HLJS_CSS_DEST);
  console.log('✓ css/highlight.min.css');
} else {
  console.warn('⚠️  highlight.js CSS not found. Run `npm install highlight.js`.');
}

// Generate sitemap.xml
const baseUrl = 'https://blogs.rosyada.my.id';
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${posts.filter(p => p.published).map(post => `
  <url>
    <loc>${baseUrl}/post/${post.slug}/</loc>
    <lastmod>${post.date.split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);
console.log('✓ sitemap.xml');

console.log('\n✅ Build complete! The dist/ folder is ready for Cloudflare Pages.');
