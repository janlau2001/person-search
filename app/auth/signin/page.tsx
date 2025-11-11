'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Bot, Chrome, UserCircle, Sparkles, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function SignInPage() {
  const [guestName, setGuestName] = useState('');
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await signIn('google', { callbackUrl });
  };

  const handleGuestSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    
    setLoading(true);
    await signIn('credentials', {
      name: guestName,
      callbackUrl,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="flex justify-center mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="relative">
                <Bot className="h-16 w-16 text-blue-600" />
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="h-6 w-6 text-yellow-500" />
                </motion.div>
              </div>
            </motion.div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Welcome Back!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to access Jan's AI Assistant
            </p>
          </div>

          {/* Sign In Options */}
          <div className="space-y-4">
            {/* Google Sign In */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full h-12 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all shadow-md hover:shadow-lg"
                size="lg"
              >
                <Chrome className="h-5 w-5 mr-3 text-blue-600" />
                Continue with Google
              </Button>
            </motion.div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or continue as guest
                </span>
              </div>
            </div>

            {/* Guest Login Form */}
            <form onSubmit={handleGuestSignIn} className="space-y-4">
              <motion.div whileHover={{ scale: 1.01 }}>
                <div className="relative">
                  <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    disabled={loading}
                    className="pl-10 h-12 text-base"
                    required
                  />
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={loading || !guestName.trim()}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg"
                  size="lg"
                >
                  <Lock className="h-5 w-5 mr-2" />
                  Continue as Guest
                </Button>
              </motion.div>
            </form>
          </div>

          {/* Info Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-xs text-gray-500 dark:text-gray-400">
              🔒 Your data is secure. Guest sessions are temporary.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Sign in with Google for persistent sessions across devices.
            </p>
          </motion.div>
        </Card>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Part of <strong>Week 5: Authentication & Security Implementation</strong>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Advanced AI Integration Internship Program
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
