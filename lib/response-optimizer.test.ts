/**
 * Test file for Response Optimizer
 * Run this to verify response optimization logic
 */

import { 
  generateSystemPrompt, 
  getOptimizationConfig,
  postProcessResponse,
  enhanceUserPrompt
} from './response-optimizer';
import type { QueryIntent } from './query-processor';

console.log('🧪 Testing Response Optimizer\n');
console.log('='.repeat(80));

// Test 1: System Prompt Generation
console.log('\n📝 Test 1: System Prompt Generation for Different Intents\n');
console.log('-'.repeat(80));

const intents: QueryIntent[] = ['skills_inquiry', 'experience_inquiry', 'project_inquiry'];

intents.forEach(intent => {
  const config = getOptimizationConfig(intent);
  const prompt = generateSystemPrompt(intent, config);
  
  console.log(`\n🎯 Intent: ${intent}`);
  console.log(`Config: useSTAR=${config.useSTAR}, tone=${config.tone}, maxLength=${config.maxLength}`);
  console.log(`\nGenerated System Prompt (first 200 chars):`);
  console.log(prompt.substring(0, 200) + '...\n');
});

// Test 2: Response Post-Processing
console.log('\n' + '='.repeat(80));
console.log('\n📝 Test 2: Response Post-Processing\n');
console.log('-'.repeat(80));

const testResponses = [
  {
    text: `I have experience with React, TypeScript, and Next.js.I built several projects using these technologies.One project served 1000+ users and improved performance by 40%.`,
    intent: 'skills_inquiry' as QueryIntent
  },
  {
    text: `Situation: During my internship at a tech company, we needed to improve the website's load time.\n\n\n\nTask: I was responsible for optimizing the frontend performance.\n\n\nAction: I implemented code splitting and lazy loading, which reduced the bundle size by 35%.\n\nResult: The website load time decreased by 2 seconds, improving user experience for 5000+ daily users.`,
    intent: 'experience_inquiry' as QueryIntent
  }
];

testResponses.forEach((test, index) => {
  console.log(`\nTest Response ${index + 1}:`);
  console.log(`Intent: ${test.intent}`);
  console.log(`Original (${test.text.split(/\s+/).length} words):`);
  console.log(test.text.substring(0, 100) + '...\n');
  
  const config = getOptimizationConfig(test.intent);
  const optimized = postProcessResponse(test.text, config);
  
  console.log(`Optimized Result:`);
  console.log(`- Structure: ${optimized.structure}`);
  console.log(`- Word Count: ${optimized.wordCount}`);
  console.log(`- Has Metrics: ${optimized.hasMetrics ? '✅' : '❌'}`);
  console.log(`- Content (first 150 chars): ${optimized.content.substring(0, 150)}...`);
  console.log();
});

// Test 3: User Prompt Enhancement
console.log('\n' + '='.repeat(80));
console.log('\n📝 Test 3: User Prompt Enhancement\n');
console.log('-'.repeat(80));

const testQuery = "What programming languages do you know?";
const testContext = "I am proficient in JavaScript, TypeScript, Python, and PHP. I have built multiple projects using React and Next.js.";

const enhanced = enhanceUserPrompt(testQuery, testContext, 'skills_inquiry');
console.log(`\nOriginal Query: "${testQuery}"`);
console.log(`\nEnhanced Prompt (first 200 chars):`);
console.log(enhanced.substring(0, 200) + '...\n');

// Test 4: Configuration for All Intents
console.log('\n' + '='.repeat(80));
console.log('\n📝 Test 4: Optimization Config for All Intent Types\n');
console.log('-'.repeat(80));

const allIntents: QueryIntent[] = [
  'skills_inquiry',
  'experience_inquiry', 
  'project_inquiry',
  'education_inquiry',
  'personality_inquiry',
  'career_goals',
  'achievements',
  'general'
];

console.log('\n| Intent | STAR | Tone | Max Words | Metrics |');
console.log('|--------|------|------|-----------|---------|');

allIntents.forEach(intent => {
  const config = getOptimizationConfig(intent);
  console.log(`| ${intent.padEnd(18)} | ${config.useSTAR ? '✅' : '❌'} | ${config.tone.padEnd(12)} | ${String(config.maxLength || 'N/A').padEnd(9)} | ${config.includeMetrics ? '✅' : '❌'} |`);
});

console.log('\n' + '='.repeat(80));
console.log('✅ Response Optimizer Tests Complete!\n');
