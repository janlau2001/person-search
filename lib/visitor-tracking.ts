/**
 * Visitor tracking utilities
 */

export interface VisitorData {
  id: string;
  timestamp: number;
  device: string;
  browser: string;
  os: string;
  isGuest: boolean;
}

export interface LoginData {
  id: string;
  timestamp: number;
  email: string;
  device: string;
  browser: string;
  os: string;
}

/**
 * Get device information from user agent
 */
export function getDeviceInfo(userAgent: string) {
  // Detect device type
  let device = 'Desktop';
  if (/mobile/i.test(userAgent)) {
    device = 'Mobile';
  } else if (/tablet|ipad/i.test(userAgent)) {
    device = 'Tablet';
  }

  // Detect browser
  let browser = 'Unknown';
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    browser = 'Chrome';
  } else if (userAgent.includes('Firefox')) {
    browser = 'Firefox';
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    browser = 'Safari';
  } else if (userAgent.includes('Edg')) {
    browser = 'Edge';
  } else if (userAgent.includes('MSIE') || userAgent.includes('Trident')) {
    browser = 'Internet Explorer';
  }

  // Detect OS
  let os = 'Unknown';
  if (userAgent.includes('Windows')) {
    os = 'Windows';
  } else if (userAgent.includes('Mac OS')) {
    os = 'macOS';
  } else if (userAgent.includes('Linux')) {
    os = 'Linux';
  } else if (userAgent.includes('Android')) {
    os = 'Android';
  } else if (userAgent.includes('iOS') || userAgent.includes('iPhone') || userAgent.includes('iPad')) {
    os = 'iOS';
  }

  return { device, browser, os };
}

/**
 * Format device string for display
 */
export function formatDeviceString(device: string, browser: string, os: string): string {
  return `${device} • ${browser} • ${os}`;
}

// In-memory storage for visitors and logins
// Note: This will reset on server restart. For production, use a database.
let visitors: VisitorData[] = [];
let logins: LoginData[] = [];

/**
 * Track a visitor
 */
export function trackVisitor(deviceInfo: { device: string; browser: string; os: string }): void {
  const visitor: VisitorData = {
    id: `visitor-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    ...deviceInfo,
    isGuest: true
  };
  
  visitors.push(visitor);
  
  // Keep only last 100 visitors
  if (visitors.length > 100) {
    visitors = visitors.slice(-100);
  }
}

/**
 * Track a login
 */
export function trackLogin(email: string, deviceInfo: { device: string; browser: string; os: string }): void {
  const login: LoginData = {
    id: `login-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    email,
    ...deviceInfo
  };
  
  logins.push(login);
  
  // Keep only last 100 logins
  if (logins.length > 100) {
    logins = logins.slice(-100);
  }
}

/**
 * Get recent visitors
 */
export function getRecentVisitors(): VisitorData[] {
  return [...visitors].reverse(); // Most recent first
}

/**
 * Get recent logins
 */
export function getRecentLogins(): LoginData[] {
  return [...logins].reverse(); // Most recent first
}

/**
 * Clear all tracking data
 */
export function clearTrackingData(): void {
  visitors = [];
  logins = [];
}
