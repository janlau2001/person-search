/**
 * Admin utilities for monitoring system
 */

// Admin email address
export const ADMIN_EMAIL = 'janlaurenceolarte070101@gmail.com';

/**
 * Check if a user is an admin
 */
export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

/**
 * Hash email for privacy display (show first 3 chars and domain)
 */
export function hashEmail(email: string): string {
  const [username, domain] = email.split('@');
  if (!username || !domain) return '***@***.com';
  
  const visibleChars = Math.min(3, username.length);
  const hashedUsername = username.substring(0, visibleChars) + '*'.repeat(Math.max(0, username.length - visibleChars));
  return `${hashedUsername}@${domain}`;
}
