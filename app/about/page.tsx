import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Target, TrendingUp, BookOpen, Sparkles } from 'lucide-react';
import { FloatingChatbot } from '@/components/floating-chatbot';
import digitalTwinData from '../../digitaltwin.json';

export default function AboutPage() {
  const { career_goals, interview_prep } = digitalTwinData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Learn more about my journey, goals, and what drives me
          </p>
        </div>

        {/* Career Goals */}
        <section className="mb-12">
          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl flex items-center gap-2">
                <Target className="h-7 w-7 text-blue-600" />
                Career Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Short-term Goals
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {typeof career_goals.short_term === 'string' 
                    ? career_goals.short_term 
                    : career_goals.short_term.primary_goal}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-yellow-600" />
                  Long-term Vision
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {typeof career_goals.long_term === 'string' 
                    ? career_goals.long_term 
                    : career_goals.long_term.primary_goal}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                  Currently Learning
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(typeof career_goals.learning_focus === 'object' && 'currently_learning' in career_goals.learning_focus
                    ? career_goals.learning_focus.currently_learning
                    : Array.isArray(career_goals.learning_focus) 
                    ? career_goals.learning_focus 
                    : []
                  ).map((item: string, idx: number) => (
                    <Badge key={idx} variant="secondary">{item}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Industries of Interest</h3>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(career_goals.industries_interested)
                    ? career_goals.industries_interested.map((item: any) => 
                        typeof item === 'string' ? item : item.industry
                      )
                    : []
                  ).map((industry: string, idx: number) => (
                    <Badge key={idx} variant="outline">{industry}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Why Hire Me */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl">Why Work With Me?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed mb-6">
                {typeof interview_prep.why_hire_me === 'string' 
                  ? interview_prep.why_hire_me 
                  : interview_prep.why_hire_me.elevator_pitch}
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-xl mb-3">Key Strengths</h3>
                  <ul className="space-y-2">
                    {interview_prep.strengths.map((strength: any, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-yellow-300">★</span>
                        <span>{typeof strength === 'string' ? strength : strength.strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-xl mb-3">What Makes Me Unique</h3>
                  <p className="text-blue-50 mb-4">
                    {'unique_value_proposition' in interview_prep 
                      ? interview_prep.unique_value_proposition.what_makes_me_different
                      : (interview_prep as any).unique_value || ''}
                  </p>
                  <div>
                    <h4 className="font-semibold mb-2">Passion for Technology</h4>
                    <p className="text-blue-50">
                      {'passion_for_technology' in interview_prep
                        ? interview_prep.passion_for_technology.genuine_interest
                        : (interview_prep as any).passion_projects || ''}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

      </div>

      <FloatingChatbot />
    </div>
  );
}

