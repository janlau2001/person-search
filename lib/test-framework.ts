/**
 * Comprehensive Testing Framework for Digital Twin
 * Week 7 - Step 5: Response Quality Evaluation
 */

import { processQuery } from './query-processor';
import { testQuestions, getTestSummary } from './test-questions';
import type { TestQuestion } from './test-questions';

export interface TestResult {
  questionId: number;
  question: string;
  expectedIntent: string;
  detectedIntent: string;
  intentMatch: boolean;
  expectedKeywords?: string[];
  detectedKeywords: string[];
  keywordsMatch: boolean;
  shouldUseSTAR: boolean;
  priority: string;
  category: string;
  difficulty: string;
  passed: boolean;
}

export interface QualityMetrics {
  totalTests: number;
  passed: number;
  failed: number;
  successRate: number;
  intentAccuracy: number;
  keywordAccuracy: number;
  averagePriority: {
    high: number;
    medium: number;
    low: number;
  };
  byCategory: {
    category: string;
    total: number;
    passed: number;
    accuracy: number;
  }[];
  byDifficulty: {
    difficulty: string;
    total: number;
    passed: number;
    accuracy: number;
  }[];
}

/**
 * Test query processing for all test questions
 */
export function runQueryProcessingTests(): TestResult[] {
  const results: TestResult[] = [];

  testQuestions.forEach(testQuestion => {
    const processed = processQuery(testQuestion.question);
    
    // Check intent match
    const intentMatch = processed.intent === testQuestion.expectedIntent;
    
    // Check keywords match (if expected keywords provided)
    let keywordsMatch = true;
    if (testQuestion.expectedKeywords && testQuestion.expectedKeywords.length > 0) {
      keywordsMatch = testQuestion.expectedKeywords.every(keyword =>
        processed.keywords.includes(keyword)
      );
    }
    
    // Overall pass/fail
    const passed = intentMatch && keywordsMatch;
    
    results.push({
      questionId: testQuestion.id,
      question: testQuestion.question,
      expectedIntent: testQuestion.expectedIntent,
      detectedIntent: processed.intent,
      intentMatch,
      expectedKeywords: testQuestion.expectedKeywords,
      detectedKeywords: processed.keywords,
      keywordsMatch,
      shouldUseSTAR: testQuestion.shouldUseSTAR,
      priority: processed.priority,
      category: testQuestion.category,
      difficulty: testQuestion.difficulty,
      passed
    });
  });

  return results;
}

/**
 * Calculate quality metrics from test results
 */
export function calculateMetrics(results: TestResult[]): QualityMetrics {
  const total = results.length;
  const passed = results.filter(r => r.passed).length;
  const intentCorrect = results.filter(r => r.intentMatch).length;
  const keywordTests = results.filter(r => r.expectedKeywords && r.expectedKeywords.length > 0);
  const keywordCorrect = keywordTests.filter(r => r.keywordsMatch).length;

  // Priority distribution
  const priorityCounts = {
    high: results.filter(r => r.priority === 'high').length,
    medium: results.filter(r => r.priority === 'medium').length,
    low: results.filter(r => r.priority === 'low').length
  };

  // By category
  const categories = [...new Set(results.map(r => r.category))];
  const byCategory = categories.map(category => {
    const categoryResults = results.filter(r => r.category === category);
    const categoryPassed = categoryResults.filter(r => r.passed).length;
    return {
      category,
      total: categoryResults.length,
      passed: categoryPassed,
      accuracy: (categoryPassed / categoryResults.length) * 100
    };
  });

  // By difficulty
  const difficulties = ['easy', 'medium', 'hard'];
  const byDifficulty = difficulties.map(difficulty => {
    const difficultyResults = results.filter(r => r.difficulty === difficulty);
    const difficultyPassed = difficultyResults.filter(r => r.passed).length;
    return {
      difficulty,
      total: difficultyResults.length,
      passed: difficultyPassed,
      accuracy: difficultyResults.length > 0 ? (difficultyPassed / difficultyResults.length) * 100 : 0
    };
  });

  return {
    totalTests: total,
    passed,
    failed: total - passed,
    successRate: (passed / total) * 100,
    intentAccuracy: (intentCorrect / total) * 100,
    keywordAccuracy: keywordTests.length > 0 ? (keywordCorrect / keywordTests.length) * 100 : 100,
    averagePriority: {
      high: (priorityCounts.high / total) * 100,
      medium: (priorityCounts.medium / total) * 100,
      low: (priorityCounts.low / total) * 100
    },
    byCategory,
    byDifficulty
  };
}

/**
 * Generate detailed test report
 */
export function generateTestReport(results: TestResult[], metrics: QualityMetrics): string {
  let report = '';
  
  report += '═'.repeat(80) + '\n';
  report += '  DIGITAL TWIN RAG SYSTEM - COMPREHENSIVE TEST REPORT\n';
  report += '═'.repeat(80) + '\n\n';
  
  // Summary
  report += '📊 OVERALL SUMMARY\n';
  report += '─'.repeat(80) + '\n';
  report += `Total Questions Tested: ${metrics.totalTests}\n`;
  report += `Passed: ${metrics.passed} ✅\n`;
  report += `Failed: ${metrics.failed} ${metrics.failed > 0 ? '❌' : '✅'}\n`;
  report += `Success Rate: ${metrics.successRate.toFixed(1)}%\n`;
  report += `Intent Detection Accuracy: ${metrics.intentAccuracy.toFixed(1)}%\n`;
  report += `Keyword Extraction Accuracy: ${metrics.keywordAccuracy.toFixed(1)}%\n\n`;
  
  // Priority Distribution
  report += '🎯 PRIORITY DISTRIBUTION\n';
  report += '─'.repeat(80) + '\n';
  report += `High Priority: ${metrics.averagePriority.high.toFixed(1)}%\n`;
  report += `Medium Priority: ${metrics.averagePriority.medium.toFixed(1)}%\n`;
  report += `Low Priority: ${metrics.averagePriority.low.toFixed(1)}%\n\n`;
  
  // By Category
  report += '📁 ACCURACY BY CATEGORY\n';
  report += '─'.repeat(80) + '\n';
  metrics.byCategory.forEach(cat => {
    const status = cat.accuracy === 100 ? '✅' : cat.accuracy >= 80 ? '⚠️' : '❌';
    report += `${status} ${cat.category.padEnd(25)} ${cat.passed}/${cat.total} (${cat.accuracy.toFixed(1)}%)\n`;
  });
  report += '\n';
  
  // By Difficulty
  report += '⚡ ACCURACY BY DIFFICULTY\n';
  report += '─'.repeat(80) + '\n';
  metrics.byDifficulty.forEach(diff => {
    if (diff.total > 0) {
      const status = diff.accuracy === 100 ? '✅' : diff.accuracy >= 80 ? '⚠️' : '❌';
      report += `${status} ${diff.difficulty.padEnd(10)} ${diff.passed}/${diff.total} (${diff.accuracy.toFixed(1)}%)\n`;
    }
  });
  report += '\n';
  
  // Failed Tests Details
  const failedTests = results.filter(r => !r.passed);
  if (failedTests.length > 0) {
    report += '❌ FAILED TESTS\n';
    report += '─'.repeat(80) + '\n';
    failedTests.forEach(test => {
      report += `\nQuestion ${test.questionId}: "${test.question}"\n`;
      if (!test.intentMatch) {
        report += `  ❌ Intent Mismatch: Expected "${test.expectedIntent}", Got "${test.detectedIntent}"\n`;
      }
      if (!test.keywordsMatch && test.expectedKeywords) {
        report += `  ❌ Keywords Missing: Expected ${JSON.stringify(test.expectedKeywords)}, Got ${JSON.stringify(test.detectedKeywords)}\n`;
      }
    });
    report += '\n';
  }
  
  // Sample Successful Tests
  const successfulTests = results.filter(r => r.passed).slice(0, 5);
  if (successfulTests.length > 0) {
    report += '✅ SAMPLE SUCCESSFUL TESTS\n';
    report += '─'.repeat(80) + '\n';
    successfulTests.forEach(test => {
      report += `\nQuestion ${test.questionId}: "${test.question}"\n`;
      report += `  Category: ${test.category} | Difficulty: ${test.difficulty}\n`;
      report += `  Intent: ${test.detectedIntent} | Priority: ${test.priority}\n`;
      report += `  Keywords: [${test.detectedKeywords.join(', ') || 'none'}]\n`;
    });
    report += '\n';
  }
  
  report += '═'.repeat(80) + '\n';
  
  return report;
}

/**
 * Run complete test suite
 */
export function runCompleteTestSuite() {
  console.log('\n🧪 Starting Comprehensive Test Suite...\n');
  
  // Show test summary
  const summary = getTestSummary();
  console.log('📋 TEST SUITE OVERVIEW:');
  console.log(`   Total Questions: ${summary.totalQuestions}`);
  console.log(`   Categories: ${summary.categories.length}`);
  console.log(`   Intent Types: ${summary.intents.length}`);
  console.log(`   STAR Questions: ${summary.starQuestions}\n`);
  
  // Run tests
  console.log('🔄 Running query processing tests...\n');
  const results = runQueryProcessingTests();
  
  // Calculate metrics
  const metrics = calculateMetrics(results);
  
  // Generate and display report
  const report = generateTestReport(results, metrics);
  console.log(report);
  
  // Performance summary
  const grade = metrics.successRate >= 95 ? 'A+' :
                metrics.successRate >= 90 ? 'A' :
                metrics.successRate >= 85 ? 'B+' :
                metrics.successRate >= 80 ? 'B' : 'C';
  
  console.log(`\n🎓 OVERALL GRADE: ${grade}`);
  console.log(`   ${metrics.successRate >= 90 ? '🌟 Excellent!' : metrics.successRate >= 80 ? '👍 Good!' : '⚠️ Needs Improvement'}\n`);
  
  return { results, metrics, report, grade };
}
