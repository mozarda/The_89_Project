/**
 * The_89_Blog - Main Server
 * Foundation for blogs.rosyada.my.id
 */

require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const marked = require('marked');
const helmet = require('helmet');

// Marked options to match build.js
marked.setOptions({
  breaks: true,
  gfm: true
});

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure data directory exists
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const postsPath = path.join(dataDir, 'posts.json');

// Load posts (or initialize empty)
function loadPosts() {
  try {
    if (fs.existsSync(postsPath)) {
      const content = fs.readFileSync(postsPath, 'utf8');
      const posts = JSON.parse(content);
      // Sort posts once upon loading (newest first)
      return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  } catch (err) {
    console.error('Error loading posts:', err);
  }
  return [];
}

function savePosts(posts) {
  fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://cdnjs.cloudflare.com"],
      styleSrc: ["'self'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:"],
    }
  }
}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Local storage (will be replaced by DB later)
let posts = loadPosts();

// Routes
app.get('/', (req, res) => {
  res.render('index', { posts });
});

// Admin route (read-only)
app.get('/admin', (req, res) => {
  res.render('admin', { posts });
});

app.get('/post/:slug', (req, res) => {
  const post = posts.find(p => p.slug === req.params.slug);
  if (!post) return res.status(404).render('404', { allPosts: posts });

  // Parse markdown for dev preview to match production build
  const postWithRenderedContent = {
    ...post,
    content: marked.parse(post.content)
  };

  // Pass all posts so the sidebar has access to the full list
  res.render('post', { post: postWithRenderedContent, allPosts: posts });
});

// API
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.get('/api/posts/:slug', (req, res) => {
  const post = posts.find(p => p.slug === req.params.slug);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

// Sitemap
app.get('/sitemap.xml', (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${posts.filter(p => p.published).map(post => `
  <url>
    <loc>${baseUrl}/post/${post.slug}</loc>
    <lastmod>${post.date.split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;
  res.type('application/xml');
  res.send(xml);
});

// Robots.txt
app.get('/robots.txt', (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const robots = `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml`;
  res.type('text/plain');
  res.send(robots);
});

// 404 Handler
app.use((req, res) => {
  res.status(404).render('404', { allPosts: posts });
});

// Start server
app.listen(PORT, () => {
  console.log(`🕌 The_89_Blog running at http://localhost:${PORT}`);
});

module.exports = app;
