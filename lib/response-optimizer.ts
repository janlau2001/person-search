/**
 * Response Optimization System for Digital Twin
 * Week 7: Implementation - Step 2
 * 
 * Formats responses using STAR methodology and professional tone
 */

import type { QueryIntent } from './query-processor';

export interface OptimizationConfig {
  useSTAR: boolean;
  maxLength?: number;
  tone: 'professional' | 'casual' | 'technical';
  includeMetrics: boolean;
}

export interface OptimizedResponse {
  content: string;
  structure: 'STAR' | 'bullet-points' | 'narrative';
  wordCount: number;
  hasMetrics: boolean;
}

/**
 * Generate system prompt based on query intent and optimization config
 */
export function generateSystemPrompt(
  intent: QueryIntent,
  config: OptimizationConfig
): string {
  const basePrompt = `You are a professional digital twin assistant representing Jan Laurence Olarte, a skilled software developer. Answer questions based ONLY on the provided context.`;
  
  const toneGuidelines = {
    professional: 'Use clear, professional language suitable for interviews and formal settings.',
    casual: 'Use friendly, conversational language while maintaining professionalism.',
    technical: 'Use precise technical terminology and detailed explanations.'
  };
  
  let prompt = `${basePrompt}\n\n${toneGuidelines[config.tone]}\n`;
  
  // Add STAR methodology guidance for relevant intents
  if (config.useSTAR && shouldUseSTAR(intent)) {
    prompt += `\nSTRUCTURE YOUR RESPONSE USING STAR METHODOLOGY:
- Situation: Set the context (project/role/challenge)
- Task: Describe the objective or responsibility
- Action: Explain specific steps taken (use "I" statements)
- Result: Share outcomes with quantifiable metrics when possible\n`;
  }
  
  // Add intent-specific guidelines
  prompt += getIntentGuidelines(intent);
  
  // Add metrics emphasis
  if (config.includeMetrics) {
    prompt += `\nIMPORTANT: Include specific metrics, numbers, and quantifiable results whenever possible (e.g., "improved performance by 40%", "reduced load time by 2 seconds", "served 1000+ users").`;
  }
  
  // Add length constraint
  if (config.maxLength) {
    prompt += `\n\nKeep your response concise and focused, aiming for approximately ${config.maxLength} words or less.`;
  }
  
  prompt += `\n\nIf the context doesn't contain relevant information to answer the question, politely say so and suggest related topics you can discuss.`;
  
  return prompt;
}

/**
 * Determine if STAR methodology should be used for this intent
 */
function shouldUseSTAR(intent: QueryIntent): boolean {
  return [
    'experience_inquiry',
    'project_inquiry',
    'achievements',
    'skills_inquiry'
  ].includes(intent);
}

/**
 * Get specific guidelines based on query intent
 */
function getIntentGuidelines(intent: QueryIntent): string {
  const guidelines: Record<QueryIntent, string> = {
    skills_inquiry: `
SKILLS RESPONSE GUIDELINES:
- List relevant technologies with proficiency levels
- Mention recent projects where skills were applied
- Include years of experience or depth of knowledge
- Group by categories (Frontend, Backend, Tools, etc.)`,

    experience_inquiry: `
EXPERIENCE RESPONSE GUIDELINES:
- Start with most recent/relevant experience
- Highlight key responsibilities and achievements
- Connect experience to the question asked
- Use action verbs (developed, implemented, led, designed)`,

    project_inquiry: `
PROJECT RESPONSE GUIDELINES:
- Name the project and its purpose
- Describe your specific role and contributions
- Highlight technical stack and challenges solved
- Share measurable outcomes or impact`,

    education_inquiry: `
EDUCATION RESPONSE GUIDELINES:
- State degree, major, and institution
- Mention relevant coursework or achievements
- Include GPA if strong (3.5+)
- Connect education to practical skills gained`,

    personality_inquiry: `
PERSONALITY RESPONSE GUIDELINES:
- Be authentic and specific with examples
- Balance strengths with self-awareness
- Connect traits to professional success
- Use brief anecdotes when relevant`,

    career_goals: `
CAREER GOALS RESPONSE GUIDELINES:
- Be specific and realistic about aspirations
- Connect goals to current skills and experience
- Show enthusiasm for growth and learning
- Align with industry trends and opportunities`,

    achievements: `
ACHIEVEMENTS RESPONSE GUIDELINES:
- Use STAR format to describe the achievement
- Quantify the impact with specific metrics
- Explain what made it challenging or significant
- Keep humble while showcasing accomplishment`,

    general: `
GENERAL RESPONSE GUIDELINES:
- Provide helpful, relevant information
- Structure answer clearly (bullet points or short paragraphs)
- Be concise and direct`
  };
  
  return guidelines[intent] || guidelines.general;
}

/**
 * Post-process the LLM response to ensure quality
 */
export function postProcessResponse(
  response: string,
  config: OptimizationConfig
): OptimizedResponse {
  let content = response.trim();
  
  // Remove excessive newlines
  content = content.replace(/\n{3,}/g, '\n\n');
  
  // Ensure proper spacing after periods
  content = content.replace(/\.([A-Z])/g, '. $1');
  
  // Detect structure
  const structure = detectResponseStructure(content);
  
  // Count words
  const wordCount = content.split(/\s+/).length;
  
  // Check for metrics
  const hasMetrics = /\d+[%+]|\d+\s*(users|seconds|percent|times|hours|days|projects)/i.test(content);
  
  // Apply length constraint if needed
  if (config.maxLength && wordCount > config.maxLength * 1.2) {
    content = truncateResponse(content, config.maxLength);
  }
  
  return {
    content,
    structure,
    wordCount,
    hasMetrics
  };
}

/**
 * Detect the structure of the response
 */
function detectResponseStructure(content: string): 'STAR' | 'bullet-points' | 'narrative' {
  // Check for STAR keywords
  const starKeywords = ['situation', 'task', 'action', 'result'];
  const hasSTARKeywords = starKeywords.some(keyword => 
    content.toLowerCase().includes(keyword + ':')
  );
  
  if (hasSTARKeywords) {
    return 'STAR';
  }
  
  // Check for bullet points or numbered lists
  const hasBulletPoints = /^[\s]*[-•*]\s/m.test(content) || /^\d+\.\s/m.test(content);
  
  if (hasBulletPoints) {
    return 'bullet-points';
  }
  
  return 'narrative';
}

/**
 * Truncate response while maintaining coherence
 */
function truncateResponse(content: string, maxWords: number): string {
  const sentences = content.match(/[^.!?]+[.!?]+/g) || [content];
  let result = '';
  let wordCount = 0;
  
  for (const sentence of sentences) {
    const sentenceWords = sentence.split(/\s+/).length;
    if (wordCount + sentenceWords <= maxWords) {
      result += sentence;
      wordCount += sentenceWords;
    } else {
      break;
    }
  }
  
  return result.trim() || content; // Fallback to original if truncation fails
}

/**
 * Get optimization config based on query intent
 */
export function getOptimizationConfig(intent: QueryIntent): OptimizationConfig {
  // Default config
  const config: OptimizationConfig = {
    useSTAR: shouldUseSTAR(intent),
    tone: 'professional',
    includeMetrics: true
  };
  
  // Adjust based on intent
  switch (intent) {
    case 'skills_inquiry':
      config.maxLength = 200;
      config.tone = 'technical';
      break;
      
    case 'experience_inquiry':
    case 'project_inquiry':
      config.maxLength = 300;
      config.useSTAR = true;
      break;
      
    case 'education_inquiry':
      config.maxLength = 150;
      config.includeMetrics = true;
      break;
      
    case 'personality_inquiry':
      config.maxLength = 250;
      config.tone = 'professional';
      config.useSTAR = false;
      break;
      
    case 'career_goals':
      config.maxLength = 200;
      config.tone = 'professional';
      break;
      
    case 'achievements':
      config.maxLength = 300;
      config.useSTAR = true;
      break;
      
    case 'general':
      config.maxLength = 200;
      config.useSTAR = false;
      break;
  }
  
  return config;
}

/**
 * Enhance the user prompt with context-specific instructions
 */
export function enhanceUserPrompt(
  originalQuery: string,
  context: string,
  intent: QueryIntent
): string {
  let prompt = `Context about Jan Laurence Olarte:\n${context}\n\n`;
  prompt += `Question: ${originalQuery}\n\n`;
  
  // Add specific instructions based on intent
  if (intent === 'skills_inquiry') {
    prompt += `Focus on technical skills, proficiency levels, and real-world applications.`;
  } else if (intent === 'experience_inquiry') {
    prompt += `Highlight relevant work experience with specific responsibilities and achievements.`;
  } else if (intent === 'project_inquiry') {
    prompt += `Describe projects with technical details, your role, and measurable outcomes.`;
  }
  
  return prompt;
}
