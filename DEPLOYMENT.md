# Deployment Guide - ShopHub E-commerce Website

## Quick Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications. Follow these steps:

### 1. Prerequisites
- GitHub account with your repository
- Vercel account (free) - Sign up at https://vercel.com

### 2. Deploy Steps

#### Option A: One-Click Deploy
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository: `ankitraj111/e-commerce-website`
4. Vercel will auto-detect Next.js configuration
5. Click "Deploy"
6. Wait 2-3 minutes for deployment to complete
7. Your site will be live at: `https://your-project-name.vercel.app`

#### Option B: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? e-commerce-website
# - Directory? ./
# - Override settings? No

# For production deployment
vercel --prod
```

### 3. Environment Variables (Optional)
If you need to add environment variables:
1. Go to your project on Vercel dashboard
2. Click "Settings" → "Environment Variables"
3. Add variables like:
   - `NEXT_PUBLIC_API_URL` (if using external API)
   - `JWT_SECRET` (for authentication)

### 4. Custom Domain (Optional)
1. Go to project settings on Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

---

## Alternative: Deploy to Netlify

### Steps:
1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Click "Deploy site"

---

## Alternative: Deploy to GitHub Pages

GitHub Pages doesn't support Next.js server-side features natively. You need to export as static:

### Steps:
1. Update `next.config.js`:
```javascript
module.exports = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}
```

2. Build and export:
```bash
npm run build
```

3. Deploy the `out` folder to GitHub Pages

**Note**: This method has limitations - no API routes, no server-side rendering.

---

## Backend Deployment (Spring Boot)

The Java backend needs separate deployment:

### Option 1: Railway
1. Go to https://railway.app
2. Connect GitHub repository
3. Select `backend` folder
4. Railway will auto-detect Spring Boot
5. Add environment variables for database

### Option 2: Heroku
1. Install Heroku CLI
2. Create new app: `heroku create your-app-name`
3. Deploy: `git subtree push --prefix backend heroku main`

### Option 3: AWS/Azure/GCP
- Use Elastic Beanstalk (AWS)
- Use App Service (Azure)
- Use App Engine (GCP)

---

## Current Status
✅ Frontend code pushed to GitHub
✅ All navigation pages created
✅ Category filtering implemented
✅ Ready for deployment

## Live URL
After deploying to Vercel, your site will be available at:
`https://e-commerce-website-[random-id].vercel.app`

You can customize this to: `https://shophub-ankit.vercel.app`

---

Made with ❤️ by Ankit
