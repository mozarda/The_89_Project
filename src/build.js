/**
 * Static Site Generator for The_89_Blog
 * Builds the blog into the dist/ folder for Cloudflare Pages
 */

const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const hljs = require('highlight.js');

// Clean dist folder (remove if exists)
const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true, force: true });
}
fs.mkdirSync(DIST, { recursive: true });

// Configure marked with markdown + highlight
marked.setOptions({
  breaks: true, // single newlines become <br>
  gfm: true, // GitHub Flavored Markdown
  highlight: (code, lang) => {
    let result;
    if (lang && hljs.getLanguage(lang)) {
      try {
        result = hljs.highlight(code, { language: lang }).value;
      } catch (e) {
        result = hljs.highlightAuto(code).value;
      }
    } else {
      result = hljs.highlightAuto(code).value;
    }
    // Strip <code class="hljs ..."> wrapper, keep inner spans
    // hljs returns `<code class="hljs ...">...</code>`
    const stripped = result.replace(/^<code[^>]*>/, '').replace(/<\/code>$/, '');
    return stripped;
  }
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

// Sort by date (newest first)
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// Utility: render a template and write to file
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

// 1. Build homepage
renderTemplate('index.ejs', 'index.html', { posts });

// 2. Build single post pages (clean URLs)
posts.forEach(post => {
  const contentHtml = marked.parse(post.content);
  const postWithHtml = { ...post, content: contentHtml };
  renderTemplate('post.ejs', `post/${post.slug}/index.html`, { post: postWithHtml });
});

// 3. Build admin panel
renderTemplate('admin.ejs', 'admin.html', { posts });

// 4. Build 404 page
renderTemplate('404.ejs', '404.html', {});

// 5. Copy public assets
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

// 6. Copy highlight.js CSS (self-hosted)
const hljsCssSrc = path.join(ROOT, 'node_modules', 'highlight.js', 'styles', 'github.min.css');
const hljsCssDest = path.join(DIST, 'css', 'highlight.min.css');
if (fs.existsSync(hljsCssSrc)) {
  fs.mkdirSync(path.dirname(hljsCssDest), { recursive: true });
  fs.copyFileSync(hljsCssSrc, hljsCssDest);
  console.log('✓ css/highlight.min.css');
} else {
  console.warn('⚠️  highlight.js CSS not found. Install highlight.js package.');
}

// 7. Generate sitemap.xml
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
