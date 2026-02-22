# The_89_Blog

> Ya ayyuhalladhina amanu - O you who believe

A simple, clean Node.js blog ready for deployment at **blogs.rosyada.my.id**.

## ✨ Features

- Minimal, responsive design
- Markdown-like content with line breaks
- Admin panel for creating/deleting posts
- JSON file storage (easy to backup/migrate)
- Dynamic sitemap.xml for SEO
- RESTful API
- No database required for small blogs

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run the development server
npm start
```

Then open: http://localhost:3000

- **Homepage**: View published posts
- **Admin panel**: http://localhost:3000/admin
- **API**: http://localhost:3000/api/posts

## 📝 Creating Posts

1. Visit `/admin` in your browser
2. Fill in:
   - **Title** (required)
   - **Excerpt** (optional, auto-generated if empty)
   - **Content** (required, line breaks preserved)
3. Click **Publish** → post appears on homepage instantly

## 🗂️ Project Structure

```
The_89_Project/
├── src/
│   ├── server.js          # Express app + routes
│   ├── views/
│   │   ├── partials/      # Header & footer
│   │   ├── index.ejs      # Homepage
│   │   ├── post.ejs       # Single post view
│   │   ├── admin.ejs      # Admin panel
│   │   └── 404.ejs        # Not found page
│   └── public/
│       ├── style.css      # Styling
│       └── robots.txt     # SEO
├── data/
│   └── posts.json         # Your blog posts (back this up!)
├── docs/
│   └── DEPLOY.md          # Deployment instructions
├── tests/
│   └── run.js             # Basic tests
└── package.json
```

## 🌐 Deployment to blogs.rosyada.my.id

See **[docs/DEPLOY.md](./docs/DEPLOY.md)** for:

- Server setup
- PM2 process management
- Nginx reverse proxy
- SSL (HTTPS) with Let's Encrypt

## 🔧 Customization

- **Colors & styling**: Edit `src/public/style.css` (CSS variables in `:root`)
- **Templates**: Modify EJS files in `src/views/`
- **Domain**: Set your domain in the reverse proxy config

## 🔐 Security Note

The admin panel has no authentication. For a personal blog on a private server, this may be acceptable. If the server is publicly accessible, consider adding:

- HTTP Basic Auth (nginx)
- Login session system (future enhancement)
- IP whitelist

## 📦 Dependencies

- `express` — Web framework
- `ejs` — Templating
- `slugify` — URL slugs from titles
- `marked` — Markdown parser (available for later use)

## 🧪 Testing

```bash
npm test
```

Runs basic module and HTTP checks.

## 📚 Future Improvements

- [ ] Add markdown rendering (currently plain text with line breaks)
- [ ] Image upload support
- [ ] Draft/publish scheduling
- [ ] Search functionality
- [ ] RSS feed
- [ ] Database migration (PostgreSQL/MongoDB)
- [ ] Authentication for admin
- [ ] Syntax highlighting for code blocks
- [ ] Comments section

## 💾 Backup

Your content lives in `data/posts.json`. Regular backups of this file are essential before migration or server changes.

## 📄 License

ISC

---

*May this blog be of benefit. Barakallah.*
