'use client';

import { useState, useEffect, useRef } from 'react';
import { initializeDigitalTwin, queryDigitalTwin, getDigitalTwinStats } from '../actions/digital-twin-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Loader2, Send, Bot, User, Sparkles, RefreshCw, Mic, MicOff } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: { title: string; relevance: number }[];
}

export default function DigitalTwinPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [stats, setStats] = useState<{ vectorCount: number } | null>(null);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<unknown>(null);

  useEffect(() => {
    initializeSystem();
    
    // Initialize speech recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as Window & typeof globalThis & { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).SpeechRecognition || (window as Window & typeof globalThis & { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new (SpeechRecognition as new () => {
          continuous: boolean;
          interimResults: boolean;
          lang: string;
          maxAlternatives: number;
          onresult: (event: { 
            results: { 
              length: number;
              [key: number]: { 
                [key: number]: { transcript: string };
                isFinal: boolean;
              } 
            } 
          }) => void;
          onerror: (event: { error: string }) => void;
          onend: () => void;
          onstart: () => void;
          start: () => void;
          stop: () => void;
        })();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          console.log('Speech recognition started');
          setIsListening(true);
        };

        recognition.onresult = (event) => {
          console.log('Speech recognition result received');
          let finalTranscript = '';
          
          for (let i = 0; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              setInput(transcript);
            }
          }
          
          if (finalTranscript) {
            setInput(finalTranscript);
            console.log('Final transcript:', finalTranscript);
            // Auto-submit after a brief delay to ensure state is updated
            setTimeout(() => {
              const submitEvent = new Event('submit', { cancelable: true, bubbles: true });
              document.querySelector('form')?.dispatchEvent(submitEvent);
            }, 300);
          }
        };

        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          if (event.error === 'not-allowed') {
            alert('Microphone access denied. Please allow microphone access in your browser settings.');
          } else if (event.error === 'no-speech') {
            alert('No speech detected. Please try again.');
          } else if (event.error === 'network') {
            alert('Network error with speech recognition. If using Brave browser:\n\n1. Click the Shields icon (🛡️) in the address bar\n2. Turn Shields OFF for this site\n3. Refresh the page and try again\n\nAlternatively, use Chrome or Edge for speech recognition.');
          } else if (event.error === 'aborted') {
            console.log('Speech recognition aborted');
          } else {
            alert(`Speech recognition error: ${event.error}`);
          }
        };

        recognition.onend = () => {
          console.log('Speech recognition ended');
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const initializeSystem = async () => {
    setInitializing(true);
    await initializeDigitalTwin();
    const statsResult = await getDigitalTwinStats();
    
    if (statsResult.success && statsResult.vectorCount) {
      setStats({ vectorCount: statsResult.vectorCount });
    }
    
    setInitializing(false);
    
    // Add welcome message
    setMessages([{
      role: 'assistant',
      content: "Hey there! 👋 I'm Jan's AI buddy - your friendly guide to everything about him! Want to know about his projects? His skills? What he's working on? Just ask! I'm here to chat and I promise to keep things fun and helpful! 😊"
    }]);
  };

  const handleClearChat = () => {
    setMessages([{
      role: 'assistant',
      content: "Hey there! 👋 I'm Jan's AI buddy - your friendly guide to everything about him! Want to know about his projects? His skills? What he's working on? Just ask! I'm here to chat and I promise to keep things fun and helpful! 😊"
    }]);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please try Chrome or Edge.');
      return;
    }

    const recognition = recognitionRef.current as { start: () => void; stop: () => void };

    if (isListening) {
      try {
        recognition.stop();
      } catch (error) {
        console.error('Error stopping recognition:', error);
        setIsListening(false);
      }
    } else {
      try {
        recognition.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
        alert('Could not start speech recognition. Please make sure you have granted microphone permissions.');
      }
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const result = await queryDigitalTwin(input);
      
      if (result.success) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: result.answer,
          sources: result.sources as { title: string; relevance: number }[]
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.'
        }]);
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestedQuestions = [
    "Tell me about your experience",
    "What are your technical skills?",
    "What projects have you worked on?",
    "What are your career goals?",
    "What makes you unique?",
    "Tell me about your hobbies"
  ];

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <Card className="p-8 text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
          <h2 className="text-2xl font-bold mb-2">Initializing Digital Twin</h2>
          <p className="text-gray-600 dark:text-gray-400">Setting up AI assistant...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bot className="h-10 w-10 text-blue-600" />
                <Sparkles className="h-4 w-4 text-yellow-500 absolute -top-1 -right-1" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Jan's Digital Twin
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  AI-Powered Assistant
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearChat}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Clear Chat
              </Button>
              {stats && (
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Knowledge Base</p>
                  <p className="text-sm font-semibold text-blue-600">
                    {stats.vectorCount} chunks loaded
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto p-4 h-[calc(100vh-180px)] flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                </div>
              )}
              
              <div className={`max-w-[80%] ${message.role === 'user' ? 'order-first' : ''}`}>
                <Card className={`p-4 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800'
                }`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        Sources:
                      </p>
                      <div className="space-y-1">
                        {message.sources.map((source, idx) => (
                          <div key={idx} className="text-xs text-gray-600 dark:text-gray-300">
                            • {source.title} (relevance: {source.relevance.toFixed(3)})
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </div>

              {message.role === 'user' && (
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gray-700 dark:bg-gray-600 flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {loading && (
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
              </div>
              <Card className="p-4 bg-white dark:bg-gray-800">
                <div className="flex gap-2 items-center">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Thinking...
                  </span>
                </div>
              </Card>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions (only show when no user messages yet) */}
        {messages.length === 1 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Try asking:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setInput(question)}
                  className="text-xs"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Form */}
        <Card className="p-4 bg-white dark:bg-gray-800">
          {isListening && (
            <div className="mb-3 flex items-center gap-2 text-sm text-red-600 dark:text-red-400 animate-pulse">
              <div className="flex gap-1">
                <div className="w-1 h-4 bg-red-600 rounded animate-pulse" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1 h-4 bg-red-600 rounded animate-pulse" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1 h-4 bg-red-600 rounded animate-pulse" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="font-medium">Listening... Speak now</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? "Listening..." : "Ask me anything about Jan..."}
              disabled={loading}
              className="flex-1"
            />
            <Button 
              type="button" 
              variant="outline"
              size="icon"
              onClick={toggleListening}
              disabled={loading}
              className={isListening ? 'bg-red-100 dark:bg-red-900 border-red-500 animate-pulse' : ''}
              title={isListening ? 'Stop recording' : 'Start recording'}
            >
              {isListening ? (
                <MicOff className="h-4 w-4 text-red-600" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
            <Button type="submit" disabled={loading || !input.trim()}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
