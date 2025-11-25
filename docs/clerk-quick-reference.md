# Clerk Authentication Quick Reference

## Common Clerk Hooks & Components

### Client Components

```tsx
'use client'
import { useUser, useAuth, SignInButton, SignOutButton, SignUpButton } from '@clerk/nextjs';

// Get current user
const { user, isLoaded, isSignedIn } = useUser();

// Get auth state
const { userId, sessionId, getToken } = useAuth();

// Pre-built auth buttons
<SignInButton mode="modal" />
<SignOutButton />
<SignUpButton mode="modal" />
```

### Server Components

```tsx
import { auth, currentUser } from '@clerk/nextjs/server';

// Get auth state (server component or route handler)
const { userId } = await auth();

// Get full user object
const user = await currentUser();
```

### Middleware

```tsx
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});
```

## User Object Structure

```typescript
user.id                              // Unique user ID
user.firstName                       // First name
user.lastName                        // Last name
user.fullName                        // Full name
user.emailAddresses                  // Array of email addresses
user.primaryEmailAddress             // Primary email object
user.primaryEmailAddress.emailAddress // Email string
user.imageUrl                        // Profile image URL
user.username                        // Username (if enabled)
user.createdAt                       // Account creation date
```

## Protected Routes Example

```tsx
// In middleware.ts
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/profile(.*)',
  '/admin(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});
```

## Conditional Rendering

```tsx
'use client'
import { useUser } from '@clerk/nextjs';

export default function MyComponent() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
  
  if (!isSignedIn) {
    return <div>Please sign in</div>;
  }

  return <div>Welcome, {user.firstName}!</div>;
}
```

## Custom Sign In/Out

```tsx
import { SignOutButton } from '@clerk/nextjs';

<SignOutButton>
  <button className="custom-button">
    Sign Out
  </button>
</SignOutButton>
```

## Accessing User in Server Actions

```tsx
'use server'
import { auth } from '@clerk/nextjs/server';

export async function myServerAction() {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }
  
  // Your logic here
}
```

## Environment Variables

```env
# Required
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Optional - Custom paths
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Optional - Custom domains
NEXT_PUBLIC_CLERK_DOMAIN=clerk.yourdomain.com
```

## Redirect After Auth

### In Environment Variables
```env
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/welcome
```

### Programmatically
```tsx
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

const router = useRouter();
const { isSignedIn } = useAuth();

useEffect(() => {
  if (isSignedIn) {
    router.push('/dashboard');
  }
}, [isSignedIn, router]);
```

## Session Management

```tsx
import { useAuth } from '@clerk/nextjs';

const { signOut, sessionId, getToken } = useAuth();

// Sign out
await signOut();

// Get JWT token
const token = await getToken();

// Get token with custom claims
const token = await getToken({ template: 'myTemplate' });
```

## Organization Support

```tsx
import { useOrganization, OrganizationSwitcher } from '@clerk/nextjs';

const { organization, isLoaded } = useOrganization();

// Organization switcher component
<OrganizationSwitcher />
```

## Customizing Clerk Components

```tsx
import { SignIn } from '@clerk/nextjs';

<SignIn 
  appearance={{
    elements: {
      formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
      card: 'shadow-lg'
    }
  }}
  routing="path"
  path="/sign-in"
/>
```

## Webhooks

Clerk can send webhooks for user events:

1. Set up webhook endpoint in Clerk Dashboard
2. Add signing secret to env: `CLERK_WEBHOOK_SECRET`
3. Create route handler:

```tsx
import { Webhook } from 'svix';
import { headers } from 'next/headers';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  
  if (!WEBHOOK_SECRET) {
    throw new Error('Missing CLERK_WEBHOOK_SECRET');
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  const body = await req.text();

  const wh = new Webhook(WEBHOOK_SECRET);
  
  let evt;
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    return new Response('Webhook verification failed', { status: 400 });
  }

  // Handle the event
  const { type, data } = evt;
  
  if (type === 'user.created') {
    // Handle user creation
  }
  
  return new Response('Webhook received', { status: 200 });
}
```

## Multi-Factor Authentication

Enable in Clerk Dashboard under:
- Settings > Authentication > Multi-factor authentication

Users can set up:
- SMS verification
- Authenticator app (TOTP)
- Backup codes

## Common Issues & Solutions

### Issue: "Clerk: Missing publishable key"
**Solution**: Add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` to `.env.local`

### Issue: Infinite redirect loop
**Solution**: Check middleware matcher and ensure sign-in/up routes are public

### Issue: User not loading
**Solution**: Ensure `<ClerkProvider>` wraps your app in `layout.tsx`

### Issue: Session not persisting
**Solution**: Check cookie settings and ensure domain is set correctly

## Useful CLI Commands

```powershell
# Check Clerk status
npx clerk --version

# Generate types
npx clerk generate-types
```

## Testing Authentication Flows

### Local Testing
1. Use test mode keys (start with `pk_test_` and `sk_test_`)
2. Sign up with test email addresses
3. Check Clerk Dashboard for test users

### Production Testing
1. Use live mode keys (start with `pk_live_` and `sk_live_`)
2. Configure allowed redirect URLs
3. Set up production environment variables

## Best Practices

1. **Always check `isLoaded`** before rendering user-dependent content
2. **Use server-side auth** for sensitive operations
3. **Protect API routes** with auth middleware
4. **Handle loading states** gracefully
5. **Use environment variables** for all Clerk configuration
6. **Enable MFA** for production applications
7. **Monitor webhooks** for user events
8. **Test auth flows** thoroughly before deploying

## Resources

- [Clerk Docs](https://clerk.com/docs)
- [Next.js Integration](https://clerk.com/docs/quickstarts/nextjs)
- [Component Reference](https://clerk.com/docs/components/overview)
- [API Reference](https://clerk.com/docs/references/javascript/overview)
