/**
 * The_89_Blog - Main Server
 * Foundation for blogs.rosyada.my.id
 */

const express = require('express');
const path = require('path');
const fs = require('fs');

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
      return JSON.parse(content);
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
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Local storage (will be replaced by DB later)
let posts = loadPosts();

// Routes
app.get('/', (req, res) => {
  res.render('index', { posts: posts.sort((a, b) => new Date(b.date) - new Date(a.date)) });
});

app.get('/post/:slug', (req, res) => {
  const post = posts.find(p => p.slug === req.params.slug);
  if (!post) return res.status(404).render('404');
  res.render('post', { post });
});

app.get('/admin', (req, res) => {
  res.render('admin', { posts });
});

app.post('/admin/posts', (req, res) => {
  const { title, content, excerpt } = req.body;
  const slug = require('slugify')(title, { lower: true, strict: true });
  const newPost = {
    id: Date.now(),
    title,
    slug,
    content,
    excerpt: excerpt || content.substring(0, 150) + '...',
    date: new Date().toISOString(),
    published: true
  };
  posts.unshift(newPost);
  savePosts(posts);
  res.redirect('/admin');
});

app.post('/admin/posts/:id/delete', (req, res) => {
  posts = posts.filter(p => p.id !== parseInt(req.params.id));
  savePosts(posts);
  res.redirect('/admin');
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

// Start server
app.listen(PORT, () => {
  console.log(`🕌 The_89_Blog running at http://localhost:${PORT}`);
  console.log('📝 Admin panel: /admin');
});

module.exports = app;
