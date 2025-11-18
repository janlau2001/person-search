/**
 * Test file for Query Processor
 * Run this to verify query processing logic
 */

import { processQuery, getEnhancedSearchQuery } from './query-processor';

const testQueries = [
  "What programming languages do you know?",
  "Tell me about your work experience",
  "What projects have you built?",
  "Where did you study?",
  "What are your strengths?",
  "What are your career goals?",
  "Do you know React and TypeScript?",
  "What achievements are you proud of?"
];

console.log('🧪 Testing Query Processor\n');
console.log('='.repeat(80));

testQueries.forEach((query, index) => {
  console.log(`\n📝 Test ${index + 1}: "${query}"`);
  console.log('-'.repeat(80));
  
  const processed = processQuery(query);
  
  console.log(`Intent: ${processed.intent}`);
  console.log(`Normalized: "${processed.normalized}"`);
  console.log(`Keywords: [${processed.keywords.join(', ') || 'none'}]`);
  console.log(`Priority: ${processed.priority}`);
  console.log(`Expanded Terms: ${processed.expandedTerms.slice(0, 3).join(' | ')}`);
  console.log(`Enhanced Query: "${getEnhancedSearchQuery(processed)}"`);
});

console.log('\n' + '='.repeat(80));
console.log('✅ Query Processor Tests Complete!\n');
