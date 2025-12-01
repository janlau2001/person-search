'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { isAdmin, hashEmail } from '@/lib/admin';
import { getMonitoringData } from '@/app/actions/monitoring-actions';
import { formatDeviceString } from '@/lib/visitor-tracking';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Users, LogIn, Shield, Clock, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

interface VisitorData {
  id: string;
  timestamp: number;
  device: string;
  browser: string;
  os: string;
  isGuest: boolean;
}

interface LoginData {
  id: string;
  timestamp: number;
  email: string;
  device: string;
  browser: string;
  os: string;
}

export default function MonitoringPage() {
  const { user, isLoaded } = useUser();
  const [visitors, setVisitors] = useState<VisitorData[]>([]);
  const [logins, setLogins] = useState<LoginData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const isUserAdmin = isLoaded && user && isAdmin(user.emailAddresses[0]?.emailAddress);

  useEffect(() => {
    if (isUserAdmin) {
      fetchData();
    }
  }, [isUserAdmin]);

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const result = await getMonitoringData();
      if (result.success && result.data) {
        setVisitors(result.data.visitors);
        setLogins(result.data.logins);
      }
    } catch (error) {
      console.error('Error fetching monitoring data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const formatDateTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatRelativeTime = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading monitoring data...</p>
        </div>
      </div>
    );
  }

  if (!isUserAdmin) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <div className="text-center">
            <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h1>
            <p className="text-gray-600 dark:text-gray-400">
              You don't have permission to access this page.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-6 py-20 max-w-6xl">
        
        {/* Header */}
        <motion.div 
          className="mb-8 flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
              <Monitor className="h-10 w-10 text-blue-600" />
              Monitoring Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Real-time visitor and login tracking</p>
          </div>
          <Button 
            onClick={fetchData} 
            disabled={refreshing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid md:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Visits</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{visitors.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <LogIn className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Logins</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{logins.length}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs defaultValue="visits" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="visits" className="gap-2">
                <Users className="h-4 w-4" />
                Recent Visits
              </TabsTrigger>
              <TabsTrigger value="logins" className="gap-2">
                <LogIn className="h-4 w-4" />
                Recent Logins
              </TabsTrigger>
            </TabsList>

            {/* Recent Visits Tab */}
            <TabsContent value="visits" className="mt-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Visits ({visitors.length})
                </h2>
                {visitors.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 dark:text-gray-400">No visits recorded yet</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {visitors.map((visitor, idx) => (
                      <motion.div
                        key={visitor.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <Monitor className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {formatDeviceString(visitor.device, visitor.browser, visitor.os)}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                              <Clock className="h-3 w-3" />
                              {formatDateTime(visitor.timestamp)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatRelativeTime(visitor.timestamp)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </Card>
            </TabsContent>

            {/* Recent Logins Tab */}
            <TabsContent value="logins" className="mt-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Logins ({logins.length})
                </h2>
                {logins.length === 0 ? (
                  <div className="text-center py-12">
                    <LogIn className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 dark:text-gray-400">No logins recorded yet</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {logins.map((login, idx) => (
                      <motion.div
                        key={login.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <LogIn className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {hashEmail(login.email)}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                              {formatDeviceString(login.device, login.browser, login.os)}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                              <Clock className="h-3 w-3" />
                              {formatDateTime(login.timestamp)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatRelativeTime(login.timestamp)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
