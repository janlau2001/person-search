/**
 * Test Runner for Week 7 Advanced RAG System
 * Run: npx tsx run-tests.ts
 */

import { runCompleteTestSuite } from './lib/test-framework';

console.log('\n');
console.log('╔════════════════════════════════════════════════════════════════════════════════╗');
console.log('║                  DIGITAL TWIN RAG SYSTEM - TEST SUITE                         ║');
console.log('║                          Week 7: Advanced Implementation                       ║');
console.log('╚════════════════════════════════════════════════════════════════════════════════╝');
console.log('\n');

// Run the complete test suite
const testResults = runCompleteTestSuite();

// Export results for programmatic access
export default testResults;
