# Vercel Deployment Guide - Git LFS Files

## Issue Fixed
Your model files are now properly configured for Vercel deployment with Git LFS.

## What Was Done

1. **Added `vercel.json`** - This ensures Git LFS files are pulled during Vercel build
2. **Merged master into main** - All files are now on the main branch (Vercel's default)
3. **Pushed all LFS objects** - Model files are uploaded to GitHub LFS storage

## Files on GitHub

The following files are now on GitHub (main branch):
- ✅ `public/models/character.enc` (Git LFS)
- ✅ `public/models/char_enviorment.hdr` (Git LFS)
- ✅ `public/models/sponza_cd.glb` (Git LFS)

## Vercel Configuration

The `vercel.json` file includes:
```json
{
  "installCommand": "npm install"
}
```

Assets are now loaded from GitHub Releases at runtime, so no Git LFS pull is needed during build.

## Next Steps

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Check your project settings**:
   - Ensure it's connected to the `main` branch
   - If it's on `master`, update it to `main` in Settings → Git
3. **Trigger a new deployment**:
   - Go to Deployments tab
   - Click "Redeploy" on the latest deployment
   - Or push a new commit to trigger auto-deploy
4. **Clear Vercel cache** (if needed):
   - Settings → General → Clear Build Cache
   - Or redeploy with "Clear cache and redeploy" option

## Verify Files on GitHub

1. Go to: https://github.com/Surajit00007/3D_Portfolio_website/tree/main/public/models
2. You should see:
   - `character.enc` (shows as "Stored with Git LFS")
   - `char_enviorment.hdr` (shows as "Stored with Git LFS")
   - `sponza_cd.glb` (shows as "Stored with Git LFS")

## Troubleshooting

If models still don't load on Vercel:

1. **Check environment variables** in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Verify `VITE_CHARACTER_MODEL_URL` and `VITE_ENVIRONMENT_MAP_URL` are set
   - Values should be GitHub release URLs

2. **Check build logs** in Vercel dashboard:
   - Look for any fetch errors or missing environment variables

3. **Manual cache clear**:
   - Vercel Dashboard → Your Project → Settings → General
   - Scroll to "Clear Build Cache" and click it
   - Redeploy

4. **Verify GitHub release URLs**:
   ```bash
   curl -I "https://github.com/Surajit00007/3D_Portfolio_website/releases/download/v1.0.0-models/character.enc"
   curl -I "https://github.com/Surajit00007/3D_Portfolio_website/releases/download/v1.0.0-models/char_enviorment.hdr"
   ```
   Should return HTTP 200

## Current Status

✅ Model files hosted on GitHub Releases
✅ Environment variables configured for runtime loading
✅ Vercel config updated (no Git LFS needed)
✅ Ready for deployment

Your site should now work with 3D models on Vercel!

