'use client';

import { useUser } from '@clerk/nextjs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Shield, 
  Smartphone, 
  Clock, 
  MapPin, 
  Globe,
  Monitor,
  Laptop,
  Tablet
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface DeviceSession {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastActive: string;
  current: boolean;
  icon: 'monitor' | 'laptop' | 'smartphone' | 'tablet';
}

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
  const [sessions, setSessions] = useState<DeviceSession[]>([]);

  useEffect(() => {
    // Mock device sessions - In production, you'd fetch this from Clerk's session API
    if (user) {
      const mockSessions: DeviceSession[] = [
        {
          id: '1',
          device: 'Windows PC',
          browser: 'Chrome 120',
          location: 'Philippines',
          lastActive: 'Active now',
          current: true,
          icon: 'monitor'
        },
        {
          id: '2',
          device: 'iPhone 15',
          browser: 'Safari',
          location: 'Philippines',
          lastActive: '2 hours ago',
          current: false,
          icon: 'smartphone'
        },
        {
          id: '3',
          device: 'MacBook Pro',
          browser: 'Chrome 119',
          location: 'Philippines',
          lastActive: 'Yesterday',
          current: false,
          icon: 'laptop'
        }
      ];
      setSessions(mockSessions);
    }
  }, [user]);

  const getDeviceIcon = (icon: string) => {
    switch(icon) {
      case 'monitor': return <Monitor className="h-5 w-5" />;
      case 'laptop': return <Laptop className="h-5 w-5" />;
      case 'smartphone': return <Smartphone className="h-5 w-5" />;
      case 'tablet': return <Tablet className="h-5 w-5" />;
      default: return <Monitor className="h-5 w-5" />;
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Account</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Manage your account info.</p>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Card className="p-6 h-fit">
            <nav className="space-y-2">
              <Button 
                variant={activeTab === 'profile' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setActiveTab('profile')}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <Button 
                variant={activeTab === 'security' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setActiveTab('security')}
              >
                <Shield className="mr-2 h-4 w-4" />
                Security
              </Button>
            </nav>
            
            <div className="mt-8 pt-6 border-t">
              <p className="text-xs text-gray-500 flex items-center gap-2">
                <Shield className="h-3 w-3" />
                Secured by Clerk
              </p>
            </div>
          </Card>

          {/* Main Content */}
          <div className="md:col-span-3">
            {activeTab === 'profile' && (
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">Profile details</h2>
                
                <div className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user.imageUrl} alt={user.fullName || 'User'} />
                      <AvatarFallback className="text-2xl">
                        {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{user.fullName}</h3>
                      <Button variant="link" className="p-0 h-auto text-blue-600">
                        Update profile
                      </Button>
                    </div>
                  </div>

                  {/* Connected Accounts */}
                  <div className="pt-6 border-t">
                    <h3 className="text-lg font-semibold mb-4">Connected accounts</h3>
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">Google</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {user.primaryEmailAddress?.emailAddress}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">...</Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'security' && (
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">Security</h2>
                
                <div className="space-y-6">
                  {/* Active Devices */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Active devices</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      These devices are currently signed into your account
                    </p>
                    
                    <div className="space-y-3">
                      {sessions.map((session) => (
                        <div 
                          key={session.id}
                          className={`flex items-center justify-between p-4 rounded-lg border ${
                            session.current 
                              ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                              : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="text-blue-600">
                              {getDeviceIcon(session.icon)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{session.device}</p>
                                {session.current && (
                                  <Badge variant="default" className="text-xs">
                                    Current device
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                                <span className="flex items-center gap-1">
                                  <Globe className="h-3 w-3" />
                                  {session.browser}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {session.location}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {session.lastActive}
                                </span>
                              </div>
                            </div>
                          </div>
                          {!session.current && (
                            <Button variant="outline" size="sm">
                              Sign out
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sign out all devices */}
                  <div className="pt-6 border-t">
                    <Button variant="destructive">
                      Sign out of all devices
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
