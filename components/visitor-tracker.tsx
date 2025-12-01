'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { trackPageVisit, trackUserLogin } from '@/app/actions/monitoring-actions';
import { getDeviceInfo } from '@/lib/visitor-tracking';

export function VisitorTracker() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const deviceInfo = getDeviceInfo(navigator.userAgent);

    // Track page visit
    trackPageVisit(deviceInfo);

    // Track login if user is authenticated
    if (isLoaded && user) {
      const email = user.emailAddresses[0]?.emailAddress;
      if (email) {
        trackUserLogin(email, deviceInfo);
      }
    }
  }, [user, isLoaded]);

  return null; // This component doesn't render anything
}
