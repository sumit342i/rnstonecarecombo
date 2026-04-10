# Vercel Deployment Guide - RN Herbal Order Website

This guide will help you deploy your RN Herbal Stone-Go order website on Vercel.

## Prerequisites

- GitHub account (for connecting repository)
- Vercel account (free at https://vercel.com)
- Git installed on your local machine

## Step 1: Prepare Your Repository

### 1.1 Initialize Git (if not already done)
```bash
cd "c:\Users\Entertainment\Downloads\rn-stone-care(landing-page) v2 old"
git init
git add .
git commit -m "Initial commit - RN Herbal Order Website"
```

### 1.2 Push to GitHub
```bash
# Create a new repository on GitHub (don't initialize with README)
# Then run:
git remote add origin https://github.com/YOUR_USERNAME/rn-stone-care.git
git branch -M main
git push -u origin main
```

## Step 2: Set Up on Vercel

### 2.1 Connect Vercel to GitHub
1. Go to https://vercel.com and sign in
2. Click "Add New" → "Project"
3. Select "Import Git Repository"
4. Connect your GitHub account and select `rn-stone-care` repository
5. Click "Import"

### 2.2 Configure Environment Variables
1. In the Vercel project settings, go to **Settings → Environment Variables**
2. Add the following variables:

| Key | Value | Notes |
|-----|-------|-------|
| `GMAIL_EMAIL` | your-email@gmail.com | Your Gmail address |
| `GMAIL_PASSWORD` | Your Gmail App Password | [How to generate?](#how-to-get-gmail-app-password) |
| `NODE_ENV` | production | Keep as is |

### 2.3 Deploy
1. Click "Deploy"
2. Wait for the build to complete (2-5 minutes)
3. Your site will be live at `https://[project-name].vercel.app`

## Step 3: Verify Deployment

### 3.1 Test Health Check
Visit: `https://your-vercel-url/health`

You should see:
```json
{
  "status": "✅ Server is running",
  "timestamp": "2026-04-10T..."
}
```

### 3.2 Test Order Endpoint
Try submitting a test form on:
`https://your-vercel-url/order.html`

### 3.3 Check Server Logs
In Vercel dashboard:
1. Go to your project
2. Click "Deployments"
3. Select latest deployment
4. Click "Functions" to see logs

## How to Get Gmail App Password

Gmail requires an App Password for third-party applications (not your regular Gmail password).

### Steps:
1. Go to Google Account: https://myaccount.google.com
2. Navigate to **Security** (left sidebar)
3. Scroll down to **How you sign in to Google**
4. Enable **2-Step Verification** (if not already enabled)
5. Go back to **Security** and look for **App passwords**
6. Select "Mail" and "Windows Computer" (or your device)
7. Generate app password
8. Copy the 16-character password
9. Paste into Vercel environment variable `GMAIL_PASSWORD`

## Custom Domain Setup

To use a custom domain:

1. In Vercel dashboard, go to **Settings → Domains**
2. Add your domain (e.g., `stoneghealth.com`)
3. Follow DNS instructions provided by Vercel
4. Update nameservers at your domain registrar
5. Wait 24-48 hours for DNS propagation

## Useful Commands for Local Development

```bash
# Install dependencies
npm install

# Run locally
npm start

# Run with auto-reload (requires nodemon)
npm run dev
```

## Troubleshooting

### Build Fails
- Check `package.json` is in root directory
- Ensure `server.js` exists and is properly configured
- Check Node version: `node --version` (should be 14+)

### Emails Not Sending
- Verify Gmail credentials in environment variables
- Check Gmail App Password (not regular password)
- Check Vercel function logs for error messages
- Ensure "Less secure app access" is enabled if using Gmail password

### 404 Errors on Static Files
- Verify all image files are uploaded (check in node_modules/.gitignore is not blocking static files)
- Ensure `app.use(express.static('.'))` is in server.js

### CORS Errors
- Check that `cors` middleware is properly configured
- Ensure frontend is making requests to correct domain

## Production Checklist

- ✅ Environment variables set in Vercel
- ✅ `.env` file not committed to Git
- ✅ `.gitignore` properly configured
- ✅ vercel.json configuration in place
- ✅ All static files included in repository
- ✅ Test health endpoint returns success
- ✅ Test order submission works
- ✅ Email delivery verified
- ✅ Custom domain configured (optional)

## Redeployment

Any time you push to GitHub main branch, Vercel automatically redeploys.

```bash
# Make changes locally
# Then:
git add .
git commit -m "Update: [description]"
git push origin main
# Vercel will automatically build and deploy
```

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Node.js on Vercel: https://vercel.com/docs/runtimes/nodejs
- Contact: digital.work.3442@gmail.com

---

**Deployment Status**: ✅ Ready to Deploy
**Last Updated**: April 10, 2026
