# Week 5: Authentication Setup Instructions

## ✅ Step 1: Get Google OAuth Credentials

To enable Google sign-in, you need to create OAuth credentials:

### 1. Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### 2. Create a New Project (or select existing)
- Click "Select a project" dropdown at the top
- Click "New Project"
- Name it: "Portfolio Auth" or similar
- Click "Create"

### 3. Enable Google+ API
- In the left menu, go to "APIs & Services" → "Library"
- Search for "Google+ API"
- Click on it and press "Enable"

### 4. Configure OAuth Consent Screen
- Go to "APIs & Services" → "OAuth consent screen"
- Select "External" user type
- Click "Create"
- Fill in:
  - App name: "Jan Laurence Portfolio"
  - User support email: your email
  - Developer contact: your email
- Click "Save and Continue"
- Skip "Scopes" (click "Save and Continue")
- Add test users (your email) - click "Save and Continue"
- Click "Back to Dashboard"

### 5. Create OAuth Credentials
- Go to "APIs & Services" → "Credentials"
- Click "+ Create Credentials" → "OAuth client ID"
- Application type: "Web application"
- Name: "Portfolio Web Client"
- Authorized JavaScript origins:
  - `http://localhost:3000`
  - `https://your-vercel-url.vercel.app` (add after deployment)
- Authorized redirect URIs:
  - `http://localhost:3000/api/auth/callback/google`
  - `https://your-vercel-url.vercel.app/api/auth/callback/google`
- Click "Create"

### 6. Copy Your Credentials
You'll see a popup with:
- **Client ID**: Copy this
- **Client Secret**: Copy this

### 7. Update `.env.local`
Replace the placeholder values in your `.env.local` file:

```bash
GOOGLE_CLIENT_ID="your-actual-client-id-here"
GOOGLE_CLIENT_SECRET="your-actual-client-secret-here"
```

### 8. Generate AUTH_SECRET
Run this command in PowerShell to generate a secure secret:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and update `.env.local`:
```bash
AUTH_SECRET="paste-the-generated-secret-here"
```

## ✅ Step 2: Test Locally

1. Restart your dev server:
```powershell
pnpm dev
```

2. Open http://localhost:3000
3. Click on the chatbot (lock icon)
4. You should see the sign-in page
5. Test both:
   - ✅ Google Sign In
   - ✅ Guest Login (just enter your name)

## ✅ Step 3: Deploy to Vercel

1. Push your changes:
```powershell
git push origin next15
```

2. In Vercel Dashboard, add environment variables:
   - `AUTH_SECRET` = your generated secret
   - `AUTH_URL` = `https://your-site.vercel.app`
   - `GOOGLE_CLIENT_ID` = your Google client ID
   - `GOOGLE_CLIENT_SECRET` = your Google client secret

3. Update Google Cloud Console:
   - Add your Vercel URL to Authorized JavaScript origins
   - Add `https://your-site.vercel.app/api/auth/callback/google` to redirect URIs

4. Redeploy on Vercel

## 🎯 Features Implemented

✅ **Google OAuth Integration**
- Secure sign-in with Google account
- Persistent sessions across devices

✅ **Guest Login System**
- Quick access without account
- Temporary sessions

✅ **Protected Routes**
- Chatbot requires authentication
- Automatic redirect to sign-in page

✅ **User Interface**
- Beautiful animated sign-in page
- User avatar in navbar
- Sign out functionality

✅ **Security**
- JWT-based sessions
- Middleware protection
- Secure token handling

## 🎓 Internship Learning Objectives Achieved

✅ Implement comprehensive authentication system using Auth.js
✅ Secure Person App with Google OAuth and session management
✅ Configure OAuth security for MCP server implementations
✅ Understand enterprise security patterns for AI applications
✅ Master advanced security workshop concepts and best practices

## Next Steps: Week 7 - Advanced RAG Implementation

Continue your internship by enhancing the Digital Twin RAG system with:
- Advanced query preprocessing
- Response optimization algorithms
- Multi-platform integration testing
- Professional content refinement strategies
- Iterative improvement based on feedback simulation
