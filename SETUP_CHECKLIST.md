# Clerk Setup Checklist

## 🎯 Immediate Action Required

### Step 1: Get Your Clerk API Keys (REQUIRED)

- [ ] Go to [https://dashboard.clerk.com](https://dashboard.clerk.com)
- [ ] Sign up or log in to Clerk
- [ ] Click **"Create Application"**
- [ ] Name it: **"Digital Twin Portfolio"** (or your preferred name)
- [ ] Select authentication methods:
  - [ ] Email/Password
  - [ ] Google OAuth (recommended - you already have Google credentials)
  - [ ] Add others if desired (GitHub, Facebook, etc.)
- [ ] Click **"Create Application"**
- [ ] Go to **"API Keys"** in the left sidebar
- [ ] Copy your **Publishable Key** (starts with `pk_test_...`)
- [ ] Copy your **Secret Key** (starts with `sk_test_...`)

### Step 2: Update Your Environment Variables

- [ ] Open `.env.local` file in your project
- [ ] Replace these lines:
  ```env
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
  CLERK_SECRET_KEY=your_clerk_secret_key_here
  ```
  With your actual keys:
  ```env
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key
  CLERK_SECRET_KEY=sk_test_your_actual_key
  ```
- [ ] Save the file

### Step 3: Test Locally

- [ ] Run `npm run dev` to start development server
- [ ] Visit `http://localhost:3000`
- [ ] Test the sign-up flow:
  - [ ] Click "Sign In" button in navbar
  - [ ] Click "Sign up" to create account
  - [ ] Create account with email or Google
  - [ ] Verify you're redirected to home page
- [ ] Test the sign-in flow:
  - [ ] Sign out if signed in
  - [ ] Click "Sign In"
  - [ ] Sign in with your credentials
  - [ ] Verify you're logged in
- [ ] Test protected routes:
  - [ ] Sign out
  - [ ] Try accessing `/digital-twin` (should redirect to sign-in)
  - [ ] Try accessing `/profile` (should redirect to sign-in)
  - [ ] Sign in and access both pages successfully
- [ ] Test profile page:
  - [ ] Go to `/profile`
  - [ ] Check if avatar displays correctly
  - [ ] Check if name and email are correct
  - [ ] Switch to "Security" tab
  - [ ] View mock device sessions
- [ ] Test floating chatbot:
  - [ ] Click floating button (bottom right)
  - [ ] If not signed in: should show lock icon and sign-in prompt
  - [ ] If signed in: should open chat and greet you by name
  - [ ] Test asking a question
- [ ] Test navigation:
  - [ ] Click your avatar in navbar
  - [ ] Click "Profile" - should go to profile page
  - [ ] Click "Sign out" - should sign you out

## 🚀 Deploy to Production

### Step 4: Configure Vercel Environment Variables

- [ ] Go to [Vercel Dashboard](https://vercel.com/dashboard)
- [ ] Select your project: **digitaltwinportfolio**
- [ ] Go to **Settings** > **Environment Variables**
- [ ] Add new variables:
  - [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` = Your publishable key
  - [ ] `CLERK_SECRET_KEY` = Your secret key
- [ ] Select environments: **Production**, **Preview**, **Development**
- [ ] Click **"Save"**

### Step 5: Push to GitHub and Deploy

- [ ] Open terminal in project directory
- [ ] Run these commands:
  ```powershell
  git add .
  git commit -m "Migrate to Clerk authentication with profile and security monitoring"
  git push origin next15
  ```
- [ ] Wait for Vercel to deploy (auto-deploys on push)
- [ ] Check Vercel dashboard for deployment status

### Step 6: Test Production Deployment

- [ ] Visit your production URL: `https://digitaltwinportfolio.vercel.app`
- [ ] Test all authentication flows again (same as local testing)
- [ ] Verify everything works in production

## 🔧 Optional Enhancements

### Google OAuth Setup (If Not Already Working)

- [ ] In Clerk Dashboard, go to **"Social Connections"**
- [ ] Click **"Google"**
- [ ] Enable Google OAuth
- [ ] You can use your existing Google OAuth credentials or create new ones in Google Cloud Console
- [ ] Or create new ones if preferred
- [ ] Test Google sign-in

### Enable Additional Features

- [ ] **Multi-Factor Authentication**: Settings > Authentication > MFA
- [ ] **Email Templates**: Customize welcome emails
- [ ] **Branding**: Add your logo and colors in Clerk Dashboard
- [ ] **User Impersonation**: For admin testing (Settings > Advanced)

## 🧹 Cleanup (After Everything Works)

### Remove Legacy NextAuth Files

Once Clerk is working perfectly:

```powershell
# Remove old auth files
Remove-Item "c:\Users\roque\Documents\Person-Search\person-search\auth.ts"
Remove-Item "c:\Users\roque\Documents\Person-Search\person-search\components\auth-provider.tsx"
Remove-Item -Recurse "c:\Users\roque\Documents\Person-Search\person-search\app\auth"

# Uninstall next-auth
npm uninstall next-auth

# Clean up .env.local (optional)
# Remove these lines:
# AUTH_SECRET="..."
# AUTH_URL="..."
# GOOGLE_CLIENT_ID="..."
# GOOGLE_CLIENT_SECRET="..."
```

### Commit Cleanup

```powershell
git add .
git commit -m "Remove legacy NextAuth files"
git push origin next15
```

## 📋 Feature Completeness Checklist

- [x] Clerk package installed
- [x] Middleware configured with route protection
- [x] Layout wrapped with ClerkProvider
- [x] Sign-in page created
- [x] Sign-up page created
- [x] Profile page with tabs created
- [x] Security monitoring UI (mock data)
- [x] Navbar updated with Clerk hooks
- [x] Floating chatbot updated with Clerk
- [x] All TypeScript errors resolved
- [ ] Clerk API keys added (YOUR TASK)
- [ ] Local testing completed (YOUR TASK)
- [ ] Production deployment (YOUR TASK)

## 🎓 Future Improvements

### Real Device Session Tracking

Currently, the profile page shows mock device data. To implement real tracking:

1. **Read Clerk Session Documentation**: [Clerk Sessions](https://clerk.com/docs/references/javascript/session)
2. **Update Profile Page**: Fetch real sessions from Clerk
3. **Implement Sign Out**: Use Clerk's session.end() method per device

Example code to add later:

```tsx
import { useAuth } from '@clerk/nextjs';

const { getToken, signOut } = useAuth();

// Get all sessions (requires server-side API call)
const sessions = await fetch('/api/sessions', {
  headers: {
    Authorization: `Bearer ${await getToken()}`
  }
});

// Sign out specific session
await fetch('/api/sessions/revoke', {
  method: 'POST',
  body: JSON.stringify({ sessionId: 'sess_xxx' })
});
```

### Additional Features to Consider

- [ ] **Webhooks**: Sync user data to your database
- [ ] **Organizations**: Add team/organization support
- [ ] **User Metadata**: Store additional user preferences
- [ ] **Custom Claims**: Add custom JWT claims for advanced authorization
- [ ] **Analytics**: Track sign-ups and user engagement
- [ ] **Rate Limiting**: Protect your API routes

## 📞 Need Help?

### Resources
- **Migration Guide**: See `CLERK_MIGRATION.md` in project root
- **Quick Reference**: See `docs/clerk-quick-reference.md`
- **Clerk Docs**: [https://clerk.com/docs](https://clerk.com/docs)
- **Clerk Support**: [https://clerk.com/support](https://clerk.com/support)

### Common Issues

**"Missing publishable key" error**
- Make sure you added keys to `.env.local`
- Restart dev server: `npm run dev`

**Infinite redirect loop**
- Check middleware.ts - ensure sign-in/up routes are public
- Clear browser cookies and try again

**User not loading**
- Check that ClerkProvider wraps your app in layout.tsx
- Check browser console for errors

**Production not working**
- Verify environment variables in Vercel
- Check Vercel deployment logs
- Ensure keys are for correct environment (test vs live)

## ✅ Current Status

**Completed**: ✅ Code migration is 100% complete
**Next Step**: 🎯 Add your Clerk API keys to `.env.local`
**Time Estimate**: ~5-10 minutes to get keys and test locally

---

**Last Updated**: November 26, 2024
**Migration Status**: ✅ READY FOR CLERK API KEYS
