/**
 * Advanced Query Processing for Digital Twin RAG System
 * Week 7: Implementation - Step 1
 */

export type QueryIntent = 
  | 'skills_inquiry'
  | 'experience_inquiry'
  | 'project_inquiry'
  | 'education_inquiry'
  | 'personality_inquiry'
  | 'career_goals'
  | 'achievements'
  | 'general';

export interface ProcessedQuery {
  original: string;
  normalized: string;
  intent: QueryIntent;
  keywords: string[];
  expandedTerms: string[];
  priority: 'high' | 'medium' | 'low';
}

/**
 * Detect the intent of a user's question
 */
export function detectIntent(query: string): QueryIntent {
  const lowerQuery = query.toLowerCase();
  
  // Skills-related questions (improved patterns)
  if (/(what|which|tell|describe).*(skill|technology|tech|program|language|framework|tool|database)/i.test(lowerQuery) ||
      /know (how to|about)|proficient|expert|familiar with|experience with.*?(react|next|laravel|javascript|typescript|python|php|mysql)/i.test(lowerQuery) ||
      /(rate|assess|describe).*?(skill|proficiency|ability)/i.test(lowerQuery) ||
      /tech stack|frameworks.*proficient|tools.*use|databases.*worked/i.test(lowerQuery) ||
      /strongest.*skill|approach.*learning.*technolog/i.test(lowerQuery)) {
    return 'skills_inquiry';
  }
  
  // Achievements (check before experience to catch "achievement" keyword)
  if (/(achievement|accomplish|success|proud|award|recognition|exceed|outstanding)/i.test(lowerQuery) ||
      /most proud|biggest.*achievement|time.*exceeded/i.test(lowerQuery)) {
    return 'achievements';
  }
  
  // Experience-related questions
  if (/(work experience|professional experience|job|internship|role|position|worked|responsibilities)/i.test(lowerQuery) ||
      /(previous|past|former|current).*(work|job|role|internship)/i.test(lowerQuery) ||
      /tell.*about.*(experience|internship|work)/i.test(lowerQuery) ||
      /(challenging|difficult).*(problem|issue).*solved/i.test(lowerQuery) ||
      /what.*learn.*from/i.test(lowerQuery)) {
    return 'experience_inquiry';
  }
  
  // Project-related questions
  if (/(project|built|created|developed|made|portfolio)/i.test(lowerQuery) &&
      !/(tech stack|technolog)/i.test(lowerQuery)) {
    return 'project_inquiry';
  }
  
  // Education-related questions
  if (/(education|school|university|degree|study|studied|major|gpa|coursework|studied at|where.*study)/i.test(lowerQuery)) {
    return 'education_inquiry';
  }
  
  // Personality & soft skills (check collaboration patterns)
  if (/(personality|soft skill|strength.*weakness|challenge|team|collaborate|work with others)/i.test(lowerQuery) ||
      /(tell me about yourself|who are you|describe yourself)/i.test(lowerQuery) ||
      /(handle|deal with).*(stress|pressure)/i.test(lowerQuery)) {
    return 'personality_inquiry';
  }
  
  // Career goals (improved patterns)
  if (/(goal|aspiration|future|plan|want to|looking for|career path|see yourself|years from now)/i.test(lowerQuery) &&
      /(career|professional|future|next|5 years)/i.test(lowerQuery)) {
    return 'career_goals';
  }
  
  return 'general';
}

/**
 * Extract important keywords from the query
 */
export function extractKeywords(query: string): string[] {
  const lowerQuery = query.toLowerCase();
  const keywords: string[] = [];
  
  // Technical skills keywords
  const techSkills = [
    'javascript', 'typescript', 'python', 'java', 'html', 'css',
    'react', 'next.js', 'nextjs', 'node', 'laravel', 'php',
    'mysql', 'database', 'sql', 'mongodb',
    'git', 'github', 'docker', 'api', 'rest'
  ];
  
  techSkills.forEach(skill => {
    if (lowerQuery.includes(skill)) {
      // Normalize variants (next.js -> nextjs)
      const normalized = skill === 'next.js' ? 'nextjs' : skill;
      if (!keywords.includes(normalized)) {
        keywords.push(normalized);
      }
    }
  });
  
  // Soft skills keywords
  const softSkills = [
    'communication', 'leadership', 'teamwork', 'problem solving',
    'analytical', 'creative', 'learning', 'adaptable'
  ];
  
  softSkills.forEach(skill => {
    if (lowerQuery.includes(skill)) {
      keywords.push(skill);
    }
  });
  
  // Experience-related keywords
  const experienceTerms = [
    'internship', 'developer', 'engineer', 'designer',
    'frontend', 'backend', 'fullstack', 'full-stack'
  ];
  
  experienceTerms.forEach(term => {
    if (lowerQuery.includes(term)) {
      keywords.push(term);
    }
  });
  
  return [...new Set(keywords)]; // Remove duplicates
}

/**
 * Expand query with related terms for better matching
 */
export function expandQuery(query: string, intent: QueryIntent): string[] {
  const expansions: string[] = [query];
  
  switch (intent) {
    case 'skills_inquiry':
      expansions.push(
        'technical skills',
        'programming languages',
        'frameworks and tools',
        'technologies',
        'expertise'
      );
      break;
      
    case 'experience_inquiry':
      expansions.push(
        'work experience',
        'professional background',
        'internship',
        'projects developed',
        'responsibilities'
      );
      break;
      
    case 'project_inquiry':
      expansions.push(
        'portfolio projects',
        'applications built',
        'development work',
        'technical implementations',
        'solutions created'
      );
      break;
      
    case 'education_inquiry':
      expansions.push(
        'academic background',
        'degree',
        'university',
        'coursework',
        'studies'
      );
      break;
      
    case 'personality_inquiry':
      expansions.push(
        'soft skills',
        'personal qualities',
        'strengths',
        'hobbies',
        'interests',
        'work style'
      );
      break;
      
    case 'career_goals':
      expansions.push(
        'professional goals',
        'career aspirations',
        'future plans',
        'objectives',
        'ambitions'
      );
      break;
      
    case 'achievements':
      expansions.push(
        'accomplishments',
        'success stories',
        'notable work',
        'recognition',
        'impact'
      );
      break;
  }
  
  return expansions;
}

/**
 * Normalize the query (clean, lowercase, remove noise)
 */
export function normalizeQuery(query: string): string {
  return query
    .toLowerCase()
    .replace(/[?!.,;:]/g, '') // Remove punctuation
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim();
}

/**
 * Determine query priority (for ranking results)
 */
export function determineQueryPriority(intent: QueryIntent, keywords: string[]): 'high' | 'medium' | 'low' {
  // High priority: Direct questions about skills, experience, projects
  if (['skills_inquiry', 'experience_inquiry', 'project_inquiry'].includes(intent)) {
    return 'high';
  }
  
  // Medium priority: Education, career goals, achievements
  if (['education_inquiry', 'career_goals', 'achievements'].includes(intent)) {
    return 'medium';
  }
  
  // High priority if multiple technical keywords found
  if (keywords.length >= 2) {
    return 'high';
  }
  
  return 'low';
}

/**
 * Main function: Process a query through all enhancement steps
 */
export function processQuery(query: string): ProcessedQuery {
  const normalized = normalizeQuery(query);
  const intent = detectIntent(query);
  const keywords = extractKeywords(query);
  const expandedTerms = expandQuery(query, intent);
  const priority = determineQueryPriority(intent, keywords);
  
  return {
    original: query,
    normalized,
    intent,
    keywords,
    expandedTerms,
    priority
  };
}

/**
 * Get enhanced search query for vector database
 */
export function getEnhancedSearchQuery(processedQuery: ProcessedQuery): string {
  // Combine original query with expanded terms and keywords
  const parts = [
    processedQuery.original,
    ...processedQuery.expandedTerms.slice(1, 3), // Add top 2 expanded terms
    ...processedQuery.keywords
  ];
  
  return parts.join(' ');
}
