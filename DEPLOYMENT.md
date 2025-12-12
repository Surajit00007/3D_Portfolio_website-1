# 🚀 Deployment Guide

This guide covers different deployment options for your 3D portfolio website.

## Quick Deploy Options

### 🚀 Vercel (Recommended - Free & Easy)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```
   Follow the prompts and select your project settings.

3. **Set up custom domain** (optional)
   ```bash
   vercel domains add yourdomain.com
   ```

### 🌐 Netlify (Free & Fast)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder** to Netlify:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Set build command: `npm run build`
   - Set publish directory: `dist`

### ☁️ GitHub Pages (Free)

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json**
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

## Manual Deployment

### Static Hosting Services

Upload the entire `dist` folder to any static hosting service:
- **AWS S3 + CloudFront**
- **Google Cloud Storage**
- **Azure Static Web Apps**
- **Firebase Hosting**
- **Surge.sh**

### Traditional Web Hosting

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload `dist` folder** via FTP to your web hosting provider

## Environment Variables

If you need environment variables for analytics or other services:

### Vercel
Create `.env.local` file and Vercel will automatically use it.

### Netlify
Add environment variables in the Netlify dashboard under Site Settings > Environment Variables.

## Performance Optimization

### Enable Compression
Most hosting providers automatically compress files. If not, enable gzip compression for:
- HTML, CSS, JS, JSON files

### CDN Setup
Consider using a CDN for static assets:
- **Cloudflare** (Free)
- **AWS CloudFront**
- **Vercel Edge Network** (Automatic)

## Domain Setup

### Custom Domain
1. Buy a domain from any registrar (Namecheap, GoDaddy, etc.)
2. Point DNS records to your hosting provider
3. Enable SSL certificate (usually automatic)

### Free Subdomain
- **Vercel**: `yourproject.vercel.app`
- **Netlify**: `yourproject.netlify.app`
- **GitHub Pages**: `username.github.io/repository`

## Monitoring & Analytics

### Add Analytics
```bash
npm install @vercel/analytics
```

Then add to your main.tsx:
```tsx
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  );
}
```

## Troubleshooting

### 404 Errors
- Ensure all routes are handled by `index.html`
- Check if your hosting supports SPA routing

### 3D Model Not Loading
- Verify all model files are uploaded to the correct paths
- Check browser console for CORS errors
- Ensure WebGL is enabled in browser

### Slow Loading
- Optimize images and 3D models
- Enable caching headers
- Use a CDN for global distribution

## Cost Comparison

| Platform | Free Tier | Paid Plans | Best For |
|----------|-----------|------------|----------|
| Vercel | 100GB bandwidth | $20+/month | React apps |
| Netlify | 100GB bandwidth | $19+/month | Static sites |
| GitHub Pages | Unlimited | Free | Open source |
| AWS S3 | 5GB storage | Pay-as-you-go | Enterprise |

## Maintenance

### Update Dependencies
```bash
npm update
npm run build
npm run deploy
```

### Monitor Performance
- Use Lighthouse for performance audits
- Monitor Core Web Vitals
- Check for broken links regularly

---

🎉 **Your 3D portfolio is now live!** Share your amazing work with the world!
