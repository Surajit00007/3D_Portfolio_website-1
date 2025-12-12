# Guide: Adding 3D Models to Your Portfolio Website

## Current Status
Your website is now configured to work **gracefully without model files**. The site will function normally, but without the 3D character and environment lighting.

## Required Model Files

You need two files in the `public/models/` directory:

1. **`character.enc`** - Encrypted 3D character model (GLTF format, encrypted)
2. **`char_enviorment.hdr`** - HDR environment map for realistic lighting

## Method 1: Direct File Upload (Recommended for Vercel)

### Step 1: Prepare Your Files
- Ensure you have the original `character.enc` and `char_enviorment.hdr` files
- If you don't have them, you'll need to recreate them:
  - **character.enc**: Export your 3D character as GLTF, then encrypt it using your encryption script
  - **char_enviorment.hdr**: Download or create an HDR environment map

### Step 2: Add Files to Your Project
```bash
# Navigate to your project
cd 3d_Portfolio_website

# Create models directory if it doesn't exist
mkdir -p public/models

# Copy your files to the directory
# Windows:
copy "path\to\character.enc" public\models\
copy "path\to\char_enviorment.hdr" public\models\

# Mac/Linux:
cp "path/to/character.enc" public/models/
cp "path/to/char_enviorment.hdr" public/models/
```

### Step 3: Update .gitignore (if needed)
Your `.gitignore` currently excludes `.enc` and `.hdr` files. If you want to track them:

**Option A: Use Git LFS (Recommended for large files)**
```bash
# Install Git LFS if not already installed
git lfs install

# Track model files with LFS
git lfs track "public/models/*.enc"
git lfs track "public/models/*.hdr"

# Add and commit
git add .gitattributes
git add public/models/*.enc public/models/*.hdr
git commit -m "Add 3D model files with Git LFS"
git push origin master
```

**Option B: Remove from .gitignore (Not recommended for large files)**
Edit `.gitignore` and remove or comment out:
```
# public/models/*.hdr
# public/models/*.enc
```

### Step 4: Deploy to Vercel
- Push to GitHub (if using Git LFS, ensure LFS files are pushed)
- Vercel will automatically deploy
- Files in `public/` are served at the root URL

## Method 2: Cloud Storage (Recommended for Large Files)

### Option A: AWS S3 / CloudFront
1. Upload files to S3 bucket
2. Make bucket public or use CloudFront
3. Update file paths in code:

**Update `src/components/Character/utils/character.ts`:**
```typescript
const encryptedBlob = await decryptFile(
  "https://your-bucket.s3.amazonaws.com/models/character.enc",
  "Character3D#@"
);
```

**Update `src/components/Character/utils/lighting.ts`:**
```typescript
rgbeLoader
  .setPath("https://your-bucket.s3.amazonaws.com/models/")
  .load("char_enviorment.hdr", ...)
```

**Update `src/components/TechStack.tsx`:**
```typescript
<Environment
  files="https://your-bucket.s3.amazonaws.com/models/char_enviorment.hdr"
  ...
/>
```

### Option B: Cloudinary / ImageKit
1. Upload HDR file to Cloudinary/ImageKit
2. Get the CDN URL
3. Update paths in code (same as above)

### Option C: GitHub Releases / Raw GitHub URLs
1. Create a GitHub release with model files
2. Use raw GitHub URLs:
```typescript
// For character.enc
const encryptedBlob = await decryptFile(
  "https://github.com/yourusername/repo/releases/download/v1.0/character.enc",
  "Character3D#@"
);
```

## Method 3: Environment Variables (For Sensitive Files)

If you want to keep model URLs configurable:

1. Create `.env.local`:
```env
VITE_CHARACTER_MODEL_URL=/models/character.enc
VITE_ENVIRONMENT_MAP_URL=/models/char_enviorment.hdr
```

2. Update code to use environment variables:
```typescript
// In character.ts
const encryptedBlob = await decryptFile(
  import.meta.env.VITE_CHARACTER_MODEL_URL || "/models/character.enc",
  "Character3D#@"
);
```

## Method 4: Vercel Blob Storage (New Feature)

Vercel now supports Blob Storage for large files:

1. Install Vercel Blob:
```bash
npm install @vercel/blob
```

2. Upload files programmatically or via Vercel dashboard
3. Use blob URLs in your code

## File Size Considerations

- **HDR files**: Typically 5-50 MB
- **Encrypted GLTF**: Varies (could be 10-100+ MB)

### Recommendations:
- **< 10 MB total**: Use Method 1 (direct upload)
- **10-50 MB**: Use Git LFS (Method 1, Option A)
- **> 50 MB**: Use Cloud Storage (Method 2)

## Troubleshooting

### Files not loading on Vercel?
1. Check file paths are correct (case-sensitive)
2. Ensure files are in `public/models/` directory
3. Check Vercel build logs for errors
4. Verify file permissions

### CORS Issues with External URLs?
- Ensure your CDN/bucket allows CORS
- Add CORS headers if hosting externally

### Still seeing 404 errors?
- Clear browser cache
- Check browser console for exact URLs being requested
- Verify files are actually deployed (check Vercel deployment files)

## Quick Test

After adding files, test locally:
```bash
npm run dev
```

Check browser console - you should see:
- ✅ No 404 errors for model files
- ✅ Character loads successfully
- ✅ Environment map loads successfully

## Current Error Handling

Your code now handles missing files gracefully:
- ✅ Site loads without models
- ✅ Console warnings instead of crashes
- ✅ Loading completes even if models fail
- ✅ Main content is always visible

## Need Help?

If you're missing the original model files:
1. Check backups or previous commits
2. Re-export from your 3D software
3. Use placeholder/demo models temporarily
4. Contact your original developer/designer

---

**Last Updated**: After fixing black screen issue
**Status**: Site works without models, ready to add files when available

