# Deployment Guide

Target domain: `blogs.rosyada.my.id`

## Quick Deploy

1. **Copy files** to your hosting server (SSH/FTPS/SFTP)

2. **Install dependencies** on the server:
   ```bash
   npm ci --only=production
   ```

3. **Set environment** (optional):
   ```bash
   export PORT=3000
   export NODE_ENV=production
   ```

4. **Run the blog**:
   ```bash
   npm start
   ```

5. **Configure domain** (Cloudflare/Nameservers):
   - Point `blogs.rosyada.my.id` to your server IP
   - Ensure port 3000 (or your chosen PORT) is open
   - Use a reverse proxy (nginx) for port 80/443 forwarding if needed

## Using PM2 (Recommended for Production)

```bash
npm install -g pm2
pm2 start src/server.js --name "the89blog"
pm2 save
pm2 startup
```

## Nginx Reverse Proxy Example

```nginx
server {
    listen 80;
    server_name blogs.rosyada.my.id;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Files to Keep
- `src/` - source code
- `data/posts.json` - your blog posts (back this up!)
- `public/` - static assets
- `views/` - templates
- `package.json` and `package-lock.json`

## SSL (HTTPS)

Let's Encrypt with Certbot:
```bash
sudo certbot --nginx -d blogs.rosyada.my.id
```

## Database Migration (Future)

Currently posts are stored in `data/posts.json` (good for small blogs). When scaling:
- Migrate to PostgreSQL, MySQL, or MongoDB
- Update `src/server.js` to use database instead of file
- Export existing posts JSON to your DB

## Support

For issues, check the repository: https://github.com/mozarda/The_89_Project
