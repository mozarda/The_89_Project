# Deploy to Cloudflare Pages

Target domain: `blogs.rosyada.my.id`

## One-Click Deploy

1. Push this repository to GitHub (already done: https://github.com/mozarda/The_89_Project)

2. Go to [Cloudflare Pages](https://pages.cloudflare.com/)

3. Click **"Create a project"** → **"Connect to Git"**

4. Select repository `mozarda/The_89_Project`

5. Configure build settings:
   - **Production branch**: `main`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Environment variables**: (none required)

6. Click **"Save and Deploy"**

Cloudflare will build and deploy. You'll get a `*.pages.dev` subdomain instantly.

## Custom Domain Setup

Once deployed:

1. In your Cloudflare Pages project dashboard, go to **Custom domains**

2. Click **"Add custom domain"**

3. Enter: `blogs.rosyada.my.id`

4. Cloudflare will verify DNS - if your domain already uses Cloudflare nameservers, it will auto-verify.

5. If not using Cloudflare DNS, add these DNS records at your registrar:
   - **Type**: CNAME
   - **Name**: blogs
   - **Target**: your-project.pages.dev

6. Cloudflare will automatically provision SSL (HTTPS)

## Adding New Posts

The static site does not have a live admin panel. To add a post:

1. Edit `data/posts.json` locally (or on GitHub)
2. Follow the format of the existing welcome post:
```json
{
  "id": 2,
  "title": "Your Post Title",
  "slug": "your-post-title",
  "excerpt": "Short summary...",
  "content": "Your content with line breaks preserved.",
  "date": "2025-02-22T00:00:00.000Z",
  "published": true
}
```
3. Commit and push to `main`
4. Cloudflare Pages will automatically rebuild and deploy

That's it — it's Git-based CMS workflow.

## Structure Overview

```
dist/                 # Build output (upload this to Pages)
├── index.html        # Homepage
├── admin.html        # Read-only post listing
├── 404.html          # Not found page
├── sitemap.xml
├── style.css
├── _redirects        # Clean URL handling
└── post/
    └── slug/
        └── index.html   # Individual posts (clean URLs)
```

## Advanced: Serverless Admin (Optional)

If you want a functional admin panel without editing JSON manually, you can add a Cloudflare Worker that:
- Serves the static site (same as Pages)
- Handles POST/DELETE to write posts to KV storage (or back to GitHub via API)

That's a more advanced setup. Let me know if you want that.

## Troubleshooting

- **Build fails**: Check `npm run build` locally first
- **404 on posts**: Ensure redirects are working; _redirects file must be in the build output
- **Domain not connecting**: Verify CNAME/DNS, and that the domain is added in Pages project

---

*Need help? Open an issue: https://github.com/mozarda/The_89_Project/issues*
