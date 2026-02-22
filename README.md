# The_89_Blog

> Ya ayyuhalladhina amanu - O you who believe

A clean, simple blog built for **Cloudflare Pages** static hosting.

## ✨ Features

- Static HTML generated from JSON posts (fast, cheap)
- Markdown-like content (line breaks preserved)
- Clean URLs with redirects
- No database needed
- Automatic sitemap.xml
- Admin-ReadOnly view (edit JSON directly in Git)

## 🛠️ Tech Stack

- **Node.js** scripts for building
- **Express** only for local dev (optional)
- **EJS** templating
- **Cloudflare Pages** for hosting

## 🚀 Quick Start (Local Dev)

```bash
# Install dependencies
npm install

# Run development server (dynamic version)
npm start
```
→ http://localhost:3000

**Note:** The dynamic server is for testing only. Production uses static build.

## 🔨 Build for Production

```bash
npm run build
```

This generates the `dist/` folder (static HTML, CSS, JS). Upload `dist/` to Cloudflare Pages.

## 📝 Writing Posts

Because this is a static site, posts are stored in `data/posts.json`.

To add a post:

1. Copy an existing entry in `data/posts.json`
2. Increment `id`, set `title`, generate `slug` (lowercase, hyphens)
3. Write `excerpt` and `content` (use `\n` for line breaks)
4. Set `date` in ISO format (`YYYY-MM-DDTHH:mm:ss.sssZ`)
5. Ensure `"published": true`
6. Run `npm run build` and commit

Example:
```json
{
  "id": 2,
  "title": "My Second Post",
  "slug": "my-second-post",
  "excerpt": "A brief summary...",
  "content": "Hello world\nThis is line two.",
  "date": "2025-02-22T10:30:00.000Z",
  "published": true
}
```

## 🗂️ Project Structure

```
The_89_Project/
├── src/
│   ├── server.js      # Dynamic dev server (Express)
│   ├── build.js       # Static site generator
│   ├── views/         # EJS templates
│   │   ├── partials/
│   │   ├── index.ejs
│   │   ├── post.ejs
│   │   ├── admin.ejs  # Read-only listing
│   │   └── 404.ejs
│   └── public/
│       ├── style.css
│       └── _redirects
├── data/
│   └── posts.json     # Your blog content (edit this)
├── dist/              # Build output (gitignore)
├── docs/
│   └── DEPLOY.md      # Full deployment guide
├── tests/
│   └── run.js
├── .gitignore
└── package.json
```

## 🌐 Deploy to Cloudflare Pages

1. Push to GitHub (already connected)
2. In Cloudflare Pages, create project from `mozarda/The_89_Project`
3. Build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Add custom domain `blogs.rosyada.my.id`
5. Done — automatic deploys on every push to `main`

Detailed steps: [docs/DEPLOY.md](./docs/DEPLOY.md)

## 🔐 About Admin

The `admin.html` page in the static build is **read-only**. There is no server to handle form submissions. To manage posts:

- Edit `data/posts.json` directly in the repository
- Commit changes → triggers rebuild → live

For a full dynamic admin, you'd need a backend (Workers + D1/KV). That's possible but adds complexity. For a personal blog, editing JSON is fine.

## 🔧 Customization

- **Theme colors**: Edit CSS variables in `src/public/style.css`
- **Templates**: Modify EJS files in `src/views/`
- **Markdown**: Currently plain text; can add `marked` parser in build step if desired

## 🧪 Testing

```bash
npm test
```

Runs basic checks on server module and HTTP endpoints (dev server only).

## 📦 Dependencies

- `express` — dev server (optional for production)
- `ejs` — templating
- `slugify` — URL-safe slugs
- `marked` — (available) for markdown

## 📄 License

ISC

---

*May this blog be of benefit. Barakallah.*
