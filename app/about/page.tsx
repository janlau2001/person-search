'use client';

import { Badge } from '@/components/ui/badge';
import { FloatingChatbot } from '@/components/floating-chatbot';
import digitalTwinData from '../../digitaltwin.json';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' as const }
};

export default function AboutPage() {
  const { career_goals, interview_prep } = digitalTwinData;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-6 py-20 max-w-5xl">
        
        {/* Header */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">About</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            My journey, goals, and what drives me as a developer
          </p>
        </motion.div>

        {/* Career Goals */}
        <motion.section 
          className="mb-24"
          {...fadeIn}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Career Goals</h2>
          
          <div className="space-y-12">
            {/* Short-term Goals */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Short-term (0-2 years)</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {typeof career_goals.short_term === 'string' 
                  ? career_goals.short_term 
                  : career_goals.short_term.primary_goal}
              </p>
              {typeof career_goals.short_term === 'object' && 'specific_objectives' in career_goals.short_term && (
                <ul className="space-y-2 ml-6">
                  {career_goals.short_term.specific_objectives.map((objective: string, idx: number) => (
                    <li key={idx} className="text-gray-600 dark:text-gray-400 list-disc">
                      {objective}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Medium-term Goals */}
            {typeof career_goals.medium_term === 'object' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Medium-term (2-5 years)</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {career_goals.medium_term.primary_goal}
                </p>
              </div>
            )}

            {/* Long-term Vision */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Long-term Vision (5-10 years)</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {typeof career_goals.long_term === 'string' 
                  ? career_goals.long_term 
                  : career_goals.long_term.primary_goal}
              </p>
            </div>

            {/* Currently Learning */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Currently Learning</h3>
              <div className="flex flex-wrap gap-2">
                {(typeof career_goals.learning_focus === 'object' && 'currently_learning' in career_goals.learning_focus
                  ? career_goals.learning_focus.currently_learning
                  : Array.isArray(career_goals.learning_focus) 
                  ? career_goals.learning_focus 
                  : []
                ).map((item: string, idx: number) => (
                  <Badge key={idx} variant="secondary" className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-0">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Industries of Interest */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Industries of Interest</h3>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(career_goals.industries_interested)
                  ? career_goals.industries_interested.map((item: string | { industry: string }) => 
                      typeof item === 'string' ? item : item.industry
                    )
                  : []
                ).map((industry: string, idx: number) => (
                  <Badge key={idx} variant="outline" className="border-gray-300 dark:border-gray-700">
                    {industry}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Why Work With Me */}
        <motion.section 
          className="mb-24"
          {...fadeIn}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Why Work With Me</h2>
          
          <div className="space-y-8">
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {typeof interview_prep.why_hire_me === 'string' 
                ? interview_prep.why_hire_me 
                : interview_prep.why_hire_me.elevator_pitch}
            </p>
            
            {/* Key Strengths */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Key Strengths</h3>
              <div className="space-y-6">
                {interview_prep.strengths.map((strength: string | { strength: string; description?: string }, idx: number) => (
                  <div key={idx} className="border-l-2 border-gray-200 dark:border-gray-800 pl-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {typeof strength === 'string' ? strength : strength.strength}
                    </h4>
                    {typeof strength === 'object' && strength.description && (
                      <p className="text-gray-600 dark:text-gray-400">{strength.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* What Makes Me Unique */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">What Makes Me Unique</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {'unique_value_proposition' in interview_prep 
                  ? interview_prep.unique_value_proposition.what_makes_me_different
                  : String((interview_prep as Record<string, unknown>).unique_value || '')}
              </p>
            </div>

            {/* Passion for Technology */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Passion for Technology</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {'passion_for_technology' in interview_prep
                  ? interview_prep.passion_for_technology.genuine_interest
                  : String((interview_prep as Record<string, unknown>).passion_projects || '')}
              </p>
            </div>
          </div>
        </motion.section>

      </div>

      <FloatingChatbot />
    </div>
  );
}

