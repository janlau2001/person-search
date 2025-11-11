'use client';

import { useState, useEffect, useRef } from 'react';
import { queryDigitalTwin } from '../app/actions/digital-twin-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Loader2, Send, Bot, User, X, MessageCircle, Maximize2, Lock } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();

  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';

  useEffect(() => {
    if (isOpen && messages.length === 0 && isAuthenticated) {
      const userName = session?.user?.name || 'there';
      setMessages([{
        role: 'assistant',
        content: `Hi ${userName}! I'm Jan's AI assistant. Ask me anything about his experience, skills, or projects!`
      }]);
    }
  }, [isOpen, messages.length, isAuthenticated, session]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const result = await queryDigitalTwin(input);
      
      if (result.success) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: result.answer
        }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: result.answer || 'Sorry, I encountered an error. Please try again.'
        }]);
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, something went wrong. Please check if environment variables are set in Vercel.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center z-50"
          >
            {isAuthenticated ? (
              <MessageCircle className="h-7 w-7" />
            ) : (
              <Lock className="h-7 w-7" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Card className="w-96 h-[550px] shadow-2xl flex flex-col bg-white dark:bg-gray-800">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Bot className="h-6 w-6" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-lg">Jan's AI Assistant</h3>
                    <p className="text-xs text-blue-100">
                      {isAuthenticated ? 'Online • Ready to help' : 'Sign in required'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {isAuthenticated && (
                    <Link href="/digital-twin">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-blue-700"
                        title="Open in full screen"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-blue-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Auth Gate or Messages */}
              {!isAuthenticated ? (
                <div className="flex-1 flex items-center justify-center p-8">
                  <div className="text-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mb-6"
                    >
                      <Lock className="h-16 w-16 text-gray-400 mx-auto" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                      Sign In Required
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Please sign in to chat with Jan's AI assistant
                    </p>
                    <Link href="/auth/signin">
                      <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                        <Lock className="h-4 w-4 mr-2" />
                        Sign In
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
                          <Bot className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    )}
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`max-w-[80%] rounded-2xl p-3 shadow-md ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    </motion.div>

                    {message.role === 'user' && (
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shadow-md">
                          <User className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
                
                {loading && (
                  <motion.div 
                    className="flex gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-3">
                      <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                    </div>
                  </motion.div>
                )}
                
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-lg">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything..."
                        disabled={loading}
                        className="flex-1 rounded-full"
                      />
                      <Button 
                        type="submit" 
                        disabled={loading || !input.trim()} 
                        size="sm"
                        className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      >
                        {loading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                      </Button>
                    </form>
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}