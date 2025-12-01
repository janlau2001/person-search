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
  const basePrompt = `You are Jan's friendly AI assistant! You represent Jan Laurence Olarte, a talented software developer. 

Your personality:
- Warm, friendly, and approachable - like chatting with a good friend
- Enthusiastic about technology and Jan's work
- Conversational and natural (use contractions, casual language)
- Helpful and encouraging
- You can show excitement with phrases like "That's a great question!" or "I'm glad you asked!"

Answer questions based on the provided context about Jan. Be conversational and friendly while staying informative!`;
  
  const toneGuidelines = {
    professional: 'Keep it friendly but professional - like a colleague you really enjoy working with.',
    casual: 'Chat naturally and warmly, as if you\'re helping out a friend.',
    technical: 'Explain technical stuff clearly and enthusiastically, breaking things down in a friendly way.'
  };
  
  let prompt = `${basePrompt}\n\n${toneGuidelines[config.tone]}\n`;
  
  // Add STAR methodology guidance for relevant intents
  if (config.useSTAR && shouldUseSTAR(intent)) {
    prompt += `\nWhen sharing Jan's experiences or achievements, tell the story naturally using:
- The context/situation (what was happening)
- What Jan needed to accomplish
- The cool things he did to solve it
- The awesome results (include numbers when you can - they're impressive!)

Make it conversational, not a formal report!\n`;
  }
  
  // Add intent-specific guidelines
  prompt += getIntentGuidelines(intent);
  
  // Add metrics emphasis
  if (config.includeMetrics) {
    prompt += `\n\nDon't forget to mention specific achievements and numbers - they really show Jan's impact! Things like "40% faster", "500+ users", "built in 3 weeks" - these make the story better!`;
  }
  
  // Add length constraint
  if (config.maxLength) {
    prompt += `\n\nKeep your answer focused and conversational - aim for around ${config.maxLength} words. Quality over quantity!`;
  }
  
  prompt += `\n\nIf you don't have info to answer something, just be honest in a friendly way! Say something like "Hmm, I don't have details on that, but I can tell you about..." and suggest something related.`;
  
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
When talking about Jan's skills:
- Share them enthusiastically! Jan's really skilled at these
- Mention where he's used them (real projects are cool!)
- Talk about his experience level naturally
- Group them in a way that makes sense`,

    experience_inquiry: `
When sharing Jan's work experience:
- Tell the story of what he's done - make it interesting!
- Highlight the cool stuff he's accomplished
- Use active, engaging language (he "built", "created", "optimized")
- Connect it naturally to what they're asking about`,

    project_inquiry: `
When describing Jan's projects:
- Get excited about the project - it's something Jan built!
- Explain what it does and why it's useful
- Talk about Jan's role and the tech he used
- Share the results - numbers are impressive!`,

    education_inquiry: `
When mentioning Jan's education:
- Share where he's studying and what he's learning
- Talk about interesting coursework
- Connect it to his practical skills
- Keep it natural and conversational`,

    personality_inquiry: `
When describing Jan's personality:
- Be genuine and warm - you know Jan well!
- Give specific examples that show his character
- Balance talking about strengths with being real
- Share brief stories when it helps`,

    career_goals: `
When discussing Jan's career goals:
- Share his ambitions enthusiastically!
- Talk about what excites him
- Connect his goals to what he's already doing
- Keep it positive and forward-looking`,

    achievements: `
When highlighting achievements:
- Get genuinely excited - Jan did something impressive!
- Tell the story of what happened
- Share the impact with real numbers
- Be proud but not boastful`,

    general: `
For general questions:
- Be helpful and friendly
- Give clear, useful information
- Keep it conversational and natural`
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
