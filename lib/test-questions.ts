/**
 * Comprehensive Test Questions for Digital Twin
 * Week 7 - Step 5: Testing Framework
 * 
 * Real interview questions categorized by intent type
 */

export interface TestQuestion {
  id: number;
  question: string;
  category: string;
  expectedIntent: string;
  difficulty: 'easy' | 'medium' | 'hard';
  shouldUseSTAR: boolean;
  expectedKeywords?: string[];
  qualityCriteria: {
    minWordCount: number;
    shouldHaveMetrics: boolean;
    shouldBeProfessional: boolean;
    shouldBeSpecific: boolean;
  };
}

export const testQuestions: TestQuestion[] = [
  // SKILLS INQUIRY (8 questions)
  {
    id: 1,
    question: "What programming languages do you know?",
    category: "Technical Skills",
    expectedIntent: "skills_inquiry",
    difficulty: "easy",
    shouldUseSTAR: true,
    expectedKeywords: [],
    qualityCriteria: {
      minWordCount: 50,
      shouldHaveMetrics: true,
      shouldBeProfessional: true,
      shouldBeSpecific: true
    }
  },
  {
    id: 2,
    question: "Do you have experience with React and Next.js?",
    category: "Technical Skills",
    expectedIntent: "skills_inquiry",
    difficulty: "easy",
    shouldUseSTAR: true,
    expectedKeywords: ["react", "nextjs"],
    qualityCriteria: {
      minWordCount: 80,
      shouldHaveMetrics: true,
      shouldBeProfessional: true,
      shouldBeSpecific: true
    }
  },
  {
    id: 3,
    question: "What frameworks and tools are you proficient in?",
    category: "Technical Skills",
    expectedIntent: "skills_inquiry",
    difficulty: "easy",
    shouldUseSTAR: true,
    qualityCriteria: {
      minWordCount: 60,
      shouldHaveMetrics: false,
      shouldBeProfessional: true,
      shouldBeSpecific: true
    }
  },
  {
    id: 4,
    question: "How would you rate your JavaScript skills?",
    category: "Technical Skills",
    expectedIntent: "skills_inquiry",
    difficulty: "medium",
    shouldUseSTAR: true,
    expectedKeywords: ["javascript"],
    qualityCriteria: {
      minWordCount: 70,
      shouldHaveMetrics: true,
      shouldBeProfessional: true,
      shouldBeSpecific: true
    }
  },
  {
    id: 5,
    question: "What databases have you worked with?",
    category: "Technical Skills",
    expectedIntent: "skills_inquiry",
    difficulty: "easy",
    shouldUseSTAR: true,
    qualityCriteria: {
      minWordCount: 60,
      shouldHaveMetrics: true,
      shouldBeProfessional: true,
      shouldBeSpecific: true
    }
  },
  {
    id: 6,
    question: "Tell me about your experience with Laravel",
    category: "Technical Skills",
    expectedIntent: "skills_inquiry",
    difficulty: "medium",
    shouldUseSTAR: true,
    expectedKeywords: ["laravel"],
    qualityCriteria: {
      minWordCount: 100,
      shouldHaveMetrics: true,
      shouldBeProfessional: true,
      shouldBeSpecific: true
    }
  },
  {
    id: 7,
    question: "What's your strongest technical skill?",
    category: "Technical Skills",
    expectedIntent: "skills_inquiry",
    difficulty: "medium",
    shouldUseSTAR: true,
    qualityCriteria: {
      minWordCount: 80,
      shouldHaveMetrics: true,
      shouldBeProfessional: true,
      shouldBeSpecific: true
    }
  },
  {
    id: 8,
    question: "How do you approach learning new technologies?",
    category: "Technical Skills",
    expectedIntent: "skills_inquiry",
    difficulty: "hard",
    shouldUseSTAR: true,
    qualityCriteria: {
      minWordCount: 100,
      shouldHaveMetrics: false,
      shouldBeProfessional: true,
      shouldBeSpecific: true
    }
  },

  // EXPERIENCE INQUIRY (6 questions)
  {
    id: 9,
    question: "Tell me about your work experience",
    category: "Work Experience",
    expectedIntent: "experience_inquiry",
    difficulty: "medium",
    shouldUseSTAR: true,
    qualityCriteria: {
      minWordCount: 150,
      shouldHaveMetrics: true,
      shouldBeProfessional: true,
      shouldBeSpecific: true
    }
  },
  {
    id: 10,
    question: "What are your responsibilities in your current internship?",
    category: "Work Experience",
    expectedIntent: "experience_inquiry",
    difficulty: "easy",
    shouldUseSTAR: true,
    expectedKeywords: ["internship"],
    qualityCriteria: {
      minWordCount: 100,
      shouldHaveMetrics: true,
      shouldBeProfessional: true,
      shouldBeSpecific: true
    }
  },
  {
    id: 11,
    question: "Can you describe a challenging problem you solved at work?",
    category: "Work Experience",
    expectedIntent: "experience_inquiry",
    difficulty: "hard",
    shouldUseSTAR: true,
    qualityCriteria: {
      minWordCount: 150,
      shouldHaveMetrics: true,
      shouldBeProfessional: true,
      shouldBeSpecific: true
    }
  },
  {
    id: 12,
    question: "What did you learn from your internship?",
    category: "Work Experience",
    expectedIntent: "experience_inquiry",
    difficulty: "medium",
    shouldUseSTAR: true,
    qualityCriteria: {
      minWordCount: 100,
      shouldHaveMetrics: false,
      shouldBeProfessional: true,
      shouldBeSpecific: true
    }
  },
  {
    id: 13,
    question: "How do you collaborate with other developers?",
    category: "Work Experience",
    expectedIntent: "experience_inquiry",
    difficulty: "medium",
    shouldUseSTAR: true,
    qualityCriteria: {
      minWordCount: 100,
      shouldHaveMetrics: false,
      shouldBeProfessional: true,
      shouldBeSpecific: true
    }
  },
  {
    id: 14,
    question: "What's your biggest professional achievement so far?",
    category: "Work Experience",
    expectedIntent: "experience_inquiry",
    difficulty: "hard",
    shouldUseSTAR: true,
    qualityCriteria: {
      minWordCount: 150,
      shouldHaveMetrics: true,
      shouldBeProfessional: true,
      shouldBeSpecific: true
    }
  },

  // PROJECT INQUIRY (4 questions)
  {
    id: 15,
    question: "What projects have you built?",
    category: "Projects",
    expectedIntent: "project_inquiry",
    difficulty: "medium",
    shouldUseSTAR: true,
    qualityCriteria: {
      minWordCount: 120,
      shouldHaveMetrics: true,
      shouldBeProfessional: true,
      shouldBeSpecific: true
    }
  },
  {
    id: 16,
    question: "Tell me about your most complex project",
    category: "Projects",
    expectedIntent: "project_inquiry",
    difficulty: "hard",
    shouldUseSTAR: true,
    qualityCriteria: {
      minWordCount: 150,
      shouldHaveMetrics: true,
      shouldBeProfessional: true,
      shouldBeSpecific: true
    }
  },
  {
    id: 17,
    question: "What was the tech stack for your e-commerce project?",
    category: "Projects",
    expectedIntent: "project_inquiry",
    difficulty: "easy",
    shouldUseSTAR: true,
    qualityCriteria: {
      minWordCount: 80,
      shouldHaveMetrics: false,
      shouldBeProfessional: true,
      shouldBeSpecific: true
    }
  },
  {
    id: 18,
    question: "How did you handle deployment and hosting for your projects?",
    category: "Projects",
    expectedIntent: "project_inquiry",
    difficulty: "medium",
    shouldUseSTAR: true,
    qualityCriteria: {
      minWordCount: 100,
      shouldHaveMetrics: false,
      shouldBeProfessional: true,
      shouldBeSpecific: true
    }
  },

  // EDUCATION INQUIRY (2 questions)
  {
    id: 19,
    question: "Where did you study?",
    category: "Education",
    expectedIntent: "education_inquiry",
    difficulty: "easy",
    shouldUseSTAR: false,
    qualityCriteria: {
      minWordCount: 50,
      shouldHaveMetrics: false,
      shouldBeProfessional: true,
      shouldBeSpecific: true
    }
  },
  {
    id: 20,
    question: "What relevant coursework have you completed?",
    category: "Education",
    expectedIntent: "education_inquiry",
    difficulty: "easy",
    shouldUseSTAR: false,
    qualityCriteria: {
      minWordCount: 80,
      shouldHaveMetrics: false,
      shouldBeProfessional: true,
      shouldBeSpecific: true
    }
  },

  // PERSONALITY & SOFT SKILLS (3 questions)
  {
    id: 21,
    question: "What are your strengths and weaknesses?",
    category: "Personality",
    expectedIntent: "personality_inquiry",
    difficulty: "medium",
    shouldUseSTAR: false,
    qualityCriteria: {
      minWordCount: 120,
      shouldHaveMetrics: false,
      shouldBeProfessional: true,
      shouldBeSpecific: true
    }
  },
  {
    id: 22,
    question: "Tell me about yourself",
    category: "Personality",
    expectedIntent: "personality_inquiry",
    difficulty: "hard",
    shouldUseSTAR: false,
    qualityCriteria: {
      minWordCount: 150,
      shouldHaveMetrics: true,
      shouldBeProfessional: true,
      shouldBeSpecific: true
    }
  },
  {
    id: 23,
    question: "How do you handle stress and pressure?",
    category: "Personality",
    expectedIntent: "personality_inquiry",
    difficulty: "medium",
    shouldUseSTAR: false,
    qualityCriteria: {
      minWordCount: 100,
      shouldHaveMetrics: false,
      shouldBeProfessional: true,
      shouldBeSpecific: true
    }
  },

  // CAREER GOALS (2 questions)
  {
    id: 24,
    question: "What are your career goals?",
    category: "Career Goals",
    expectedIntent: "career_goals",
    difficulty: "medium",
    shouldUseSTAR: false,
    qualityCriteria: {
      minWordCount: 100,
      shouldHaveMetrics: false,
      shouldBeProfessional: true,
      shouldBeSpecific: true
    }
  },
  {
    id: 25,
    question: "Where do you see yourself in 5 years?",
    category: "Career Goals",
    expectedIntent: "career_goals",
    difficulty: "medium",
    shouldUseSTAR: false,
    qualityCriteria: {
      minWordCount: 100,
      shouldHaveMetrics: false,
      shouldBeProfessional: true,
      shouldBeSpecific: true
    }
  },

  // ACHIEVEMENTS (2 questions)
  {
    id: 26,
    question: "What achievement are you most proud of?",
    category: "Achievements",
    expectedIntent: "achievements",
    difficulty: "hard",
    shouldUseSTAR: true,
    qualityCriteria: {
      minWordCount: 150,
      shouldHaveMetrics: true,
      shouldBeProfessional: true,
      shouldBeSpecific: true
    }
  },
  {
    id: 27,
    question: "Tell me about a time you exceeded expectations",
    category: "Achievements",
    expectedIntent: "achievements",
    difficulty: "hard",
    shouldUseSTAR: true,
    qualityCriteria: {
      minWordCount: 150,
      shouldHaveMetrics: true,
      shouldBeProfessional: true,
      shouldBeSpecific: true
    }
  },

  // GENERAL / MIXED (3 questions)
  {
    id: 28,
    question: "Why should we hire you?",
    category: "General",
    expectedIntent: "general",
    difficulty: "hard",
    shouldUseSTAR: false,
    qualityCriteria: {
      minWordCount: 150,
      shouldHaveMetrics: true,
      shouldBeProfessional: true,
      shouldBeSpecific: true
    }
  },
  {
    id: 29,
    question: "What makes you different from other candidates?",
    category: "General",
    expectedIntent: "general",
    difficulty: "hard",
    shouldUseSTAR: false,
    qualityCriteria: {
      minWordCount: 120,
      shouldHaveMetrics: true,
      shouldBeProfessional: true,
      shouldBeSpecific: true
    }
  },
  {
    id: 30,
    question: "Do you have any questions for us?",
    category: "General",
    expectedIntent: "general",
    difficulty: "medium",
    shouldUseSTAR: false,
    qualityCriteria: {
      minWordCount: 80,
      shouldHaveMetrics: false,
      shouldBeProfessional: true,
      shouldBeSpecific: true
    }
  }
];

export function getQuestionsByCategory(category: string): TestQuestion[] {
  return testQuestions.filter(q => q.category === category);
}

export function getQuestionsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): TestQuestion[] {
  return testQuestions.filter(q => q.difficulty === difficulty);
}

export function getQuestionsByIntent(intent: string): TestQuestion[] {
  return testQuestions.filter(q => q.expectedIntent === intent);
}

export function getTestSummary() {
  const categories = [...new Set(testQuestions.map(q => q.category))];
  const intents = [...new Set(testQuestions.map(q => q.expectedIntent))];
  
  return {
    totalQuestions: testQuestions.length,
    categories: categories.map(cat => ({
      name: cat,
      count: getQuestionsByCategory(cat).length
    })),
    intents: intents.map(intent => ({
      name: intent,
      count: getQuestionsByIntent(intent).length
    })),
    difficulty: {
      easy: getQuestionsByDifficulty('easy').length,
      medium: getQuestionsByDifficulty('medium').length,
      hard: getQuestionsByDifficulty('hard').length
    },
    starQuestions: testQuestions.filter(q => q.shouldUseSTAR).length
  };
}
