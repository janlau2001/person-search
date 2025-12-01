'use server';

import { getRecentVisitors, getRecentLogins, trackVisitor, trackLogin } from '@/lib/visitor-tracking';
import { isAdmin } from '@/lib/admin';
import { currentUser } from '@clerk/nextjs/server';

/**
 * Get monitoring data (admin only)
 */
export async function getMonitoringData() {
  const user = await currentUser();
  
  if (!user || !isAdmin(user.emailAddresses[0]?.emailAddress)) {
    return {
      success: false,
      error: 'Unauthorized access'
    };
  }

  const visitors = getRecentVisitors();
  const logins = getRecentLogins();

  return {
    success: true,
    data: {
      visitors,
      logins
    }
  };
}

/**
 * Track page visit
 */
export async function trackPageVisit(deviceInfo: { device: string; browser: string; os: string }) {
  try {
    trackVisitor(deviceInfo);
    return { success: true };
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return { success: false };
  }
}

/**
 * Track user login
 */
export async function trackUserLogin(email: string, deviceInfo: { device: string; browser: string; os: string }) {
  try {
    trackLogin(email, deviceInfo);
    return { success: true };
  } catch (error) {
    console.error('Error tracking login:', error);
    return { success: false };
  }
}
