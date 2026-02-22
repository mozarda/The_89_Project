/**
 * Static Site Generator for The_89_Blog
 * Builds the blog into the dist/ folder for Cloudflare Pages
 */

const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const { minify: minifyHTML } = require('html-minifier-terser');

// Marked options (GFM + line breaks)
marked.setOptions({
  breaks: true,
  gfm: true
});

// Paths
const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const VIEWS_DIR = path.join(ROOT, 'src', 'views');
const PUBLIC_DIR = path.join(ROOT, 'src', 'public');
const DATA_DIR = path.join(ROOT, 'data');

// Clean dist folder
if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true, force: true });
}
fs.mkdirSync(DIST, { recursive: true });

// Load posts
const postsPath = path.join(DATA_DIR, 'posts.json');
let posts = [];
if (fs.existsSync(postsPath)) {
  posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
}
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// Render a template (async), returns Promise<void>
async function renderTemplate(templatePath, outputPath, locals = {}) {
  const fullPath = path.join(VIEWS_DIR, templatePath);
  const str = await ejs.renderFile(fullPath, locals);
  let output = str;
  if (outputPath.endsWith('.html')) {
    try {
      output = await minifyHTML(str, {
        collapseWhitespace: true,
        removeComments: true,
        removeEmptyAttributes: true,
        minifyCSS: true,
        minifyJS: true,
        keepClosingSlash: true,
        sortAttributes: true,
        sortClassName: true
      });
    } catch (e) {
      console.warn(`⚠️  Minification failed for ${outputPath}: ${e.message}`);
      output = str;
    }
  }
  const outPath = path.join(DIST, outputPath);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, output);
  console.log(`✓ ${outputPath}`);
}

// Copy directory recursively (sync)
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

// Main build (async)
(async () => {
  console.log('🏗️  Building static site...\n');

  // Build pages
  await renderTemplate('index.ejs', 'index.html', { posts, allPosts: posts });
  await Promise.all(posts.map(post => {
    const contentHtml = marked.parse(post.content);
    return renderTemplate('post.ejs', `post/${post.slug}/index.html`, {
      post: { ...post, content: contentHtml },
      allPosts: posts
    });
  }));
  await renderTemplate('404.ejs', '404.html', { allPosts: posts });

  // Copy public assets
  copyRecursive(PUBLIC_DIR, path.join(DIST, ''));

  // Copy highlight.js CSS (self-hosted)
  const HLJS_CSS_SRC = path.join(ROOT, 'node_modules', 'highlight.js', 'styles', 'github.min.css');
  const HLJS_CSS_DEST = path.join(DIST, 'css', 'highlight.min.css');
  if (fs.existsSync(HLJS_CSS_SRC)) {
    fs.mkdirSync(path.dirname(HLJS_CSS_DEST), { recursive: true });
    fs.copyFileSync(HLJS_CSS_SRC, HLJS_CSS_DEST);
    console.log('✓ css/highlight.min.css');
  } else {
    console.warn('⚠️  highlight.js CSS not found.');
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

  // Generate robots.txt
  const robots = `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml`;
  fs.writeFileSync(path.join(DIST, 'robots.txt'), robots);
  console.log('✓ robots.txt');

  console.log('\n✅ Build complete! The dist/ folder is ready for Cloudflare Pages.');
})().catch(err => {
  console.error('\n❌ Build failed:', err);
  process.exit(1);
});
