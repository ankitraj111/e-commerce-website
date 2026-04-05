# 🚀 Deploy to GitHub Pages

## Quick Deployment Steps

### Option 1: Using Vercel (Recommended for Next.js)

1. **Go to Vercel**: https://vercel.com
2. **Sign in with GitHub**
3. **Import your repository**: 
   - Click "New Project"
   - Select `ankitraj111/e-commerce-website`
4. **Configure**:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. **Click Deploy**
6. **Done!** Your site will be live at: `https://e-commerce-website-ankitraj111.vercel.app`

### Option 2: Using Netlify

1. **Go to Netlify**: https://netlify.com
2. **Sign in with GitHub**
3. **New site from Git**
4. **Select your repo**: `ankitraj111/e-commerce-website`
5. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. **Deploy**

### Option 3: GitHub Pages (Static Export)

**Note**: GitHub Pages works best with static sites. For Next.js, you need to export as static.

#### Step 1: Update next.config.mjs

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/e-commerce-website',
  assetPrefix: '/e-commerce-website/',
}

export default nextConfig
```

#### Step 2: Add .nojekyll file

```bash
echo "" > .nojekyll
git add .nojekyll
git commit -m "Add .nojekyll for GitHub Pages"
git push
```

#### Step 3: Build and Deploy

```bash
# Build the project
npm run build

# The output will be in 'out' folder
# Push to gh-pages branch
npm install -g gh-pages
gh-pages -d out
```

#### Step 4: Enable GitHub Pages

1. Go to: https://github.com/ankitraj111/e-commerce-website/settings/pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` / `root`
4. Save

Your site will be live at:
```
https://ankitraj111.github.io/e-commerce-website/
```

---

## 🎯 Recommended: Deploy to Vercel (Easiest)

Vercel is made by the creators of Next.js and works perfectly:

### Quick Vercel Deploy:

1. **Click this button**: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ankitraj111/e-commerce-website)

2. **Or manually**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login
   vercel login
   
   # Deploy
   vercel
   
   # For production
   vercel --prod
   ```

3. **Your site will be live at**:
   ```
   https://e-commerce-website.vercel.app
   ```

---

## 🔧 Environment Variables

Don't forget to add these in your deployment platform:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
```

---

## 📝 Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All images display
- [ ] Navigation works
- [ ] Product pages load
- [ ] Cart functionality works
- [ ] Mobile responsive
- [ ] SEO meta tags present

---

## 🎉 Your Site is Live!

Once deployed, share your link:
- Vercel: `https://e-commerce-website-ankitraj111.vercel.app`
- Netlify: `https://e-commerce-website-ankitraj111.netlify.app`
- GitHub Pages: `https://ankitraj111.github.io/e-commerce-website/`

---

**Made with ❤️ by Ankit**
