'use server';

import { Index } from '@upstash/vector';
import Groq from 'groq-sdk';
import digitalTwinData from '../../digitaltwin.json';
import { generateContentChunks } from '@/lib/digital-twin-processor';
import { processQuery, getEnhancedSearchQuery } from '@/lib/query-processor';
import { 
  generateSystemPrompt, 
  getOptimizationConfig, 
  postProcessResponse,
  enhanceUserPrompt 
} from '@/lib/response-optimizer';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL!,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
});

export async function initializeDigitalTwin() {
  try {
    // Check if data already exists
    const info = await index.info();
    
    if (info.vectorCount && info.vectorCount > 0) {
      return {
        success: true,
        message: 'Digital twin already initialized',
        chunksCount: info.vectorCount
      };
    }

    // Generate chunks from JSON
    const chunks = generateContentChunks(digitalTwinData);

    // Prepare vectors for upload
    const vectors = chunks.map(chunk => ({
      id: chunk.id,
      data: `${chunk.title}: ${chunk.content}`,
      metadata: {
        title: chunk.title,
        type: chunk.type,
        content: chunk.content,
        category: chunk.metadata.category,
        tags: chunk.metadata.tags.join(', '),
      }
    }));

    // Upload to Upstash Vector
    await index.upsert(vectors);

    return {
      success: true,
      message: `Successfully initialized digital twin with ${chunks.length} content chunks`,
      chunksCount: chunks.length
    };
  } catch (error) {
    console.error('Error initializing digital twin:', error);
    return {
      success: false,
      message: 'Failed to initialize digital twin',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function queryDigitalTwin(question: string) {
  try {
    // Check if database is initialized
    const info = await index.info();
    if (!info.vectorCount || info.vectorCount === 0) {
      // Auto-initialize if empty
      const initResult = await initializeDigitalTwin();
      if (!initResult.success) {
        return {
          success: false,
          answer: 'Database not initialized. Please refresh the page.',
          sources: []
        };
      }
    }

    // ✨ NEW: Step 1 - Process the query with advanced intent detection
    const processedQuery = processQuery(question);
    const enhancedSearchQuery = getEnhancedSearchQuery(processedQuery);

    console.log('🔍 Query Processing:', {
      original: processedQuery.original,
      intent: processedQuery.intent,
      keywords: processedQuery.keywords,
      priority: processedQuery.priority
    });

    // Step 2: Query vector database with enhanced query
    const vectorResults = await index.query({
      data: enhancedSearchQuery, // Using enhanced query for better semantic matching
      topK: 5, // Increased from 3 to get more context
      includeMetadata: true,
    });

    if (!vectorResults || vectorResults.length === 0) {
      return {
        success: false,
        answer: "I don't have specific information about that topic in my knowledge base. Feel free to ask about my skills, experience, projects, education, or career goals!",
        sources: [],
        metadata: {
          intent: processedQuery.intent,
          keywords: processedQuery.keywords
        }
      };
    }

    // Step 3: Extract relevant content with better scoring
    const relevantDocs = vectorResults
      .filter(result => result.score && result.score > 0.7) // Filter low-relevance results
      .map(result => ({
        title: result.metadata?.title || 'Information',
        content: result.metadata?.content || '',
        score: result.score || 0,
      }));

    // If no high-quality matches, fall back to top results
    const docsToUse = relevantDocs.length > 0 
      ? relevantDocs 
      : vectorResults.slice(0, 3).map(result => ({
          title: result.metadata?.title || 'Information',
          content: result.metadata?.content || '',
          score: result.score || 0,
        }));

    const context = docsToUse.map(doc => `${doc.title}: ${doc.content}`).join('\n\n');

    // ✨ NEW: Step 4 - Get optimization config based on intent
    const optimizationConfig = getOptimizationConfig(processedQuery.intent);
    const systemPrompt = generateSystemPrompt(processedQuery.intent, optimizationConfig);
    const userPrompt = enhanceUserPrompt(question, context, processedQuery.intent);

    console.log('⚙️ Optimization Config:', {
      intent: processedQuery.intent,
      useSTAR: optimizationConfig.useSTAR,
      tone: optimizationConfig.tone,
      maxLength: optimizationConfig.maxLength
    });

    // Step 5: Generate response using Groq with optimized prompts
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 600, // Increased for STAR-formatted responses
    });

    const rawAnswer = completion.choices[0]?.message?.content || 'Unable to generate response';

    // ✨ NEW: Step 6 - Post-process the response
    const optimizedResponse = postProcessResponse(rawAnswer, optimizationConfig);

    console.log('📊 Response Quality:', {
      structure: optimizedResponse.structure,
      wordCount: optimizedResponse.wordCount,
      hasMetrics: optimizedResponse.hasMetrics
    });

    return {
      success: true,
      answer: optimizedResponse.content,
      sources: docsToUse.map(doc => ({ title: doc.title, relevance: doc.score })),
      question,
      metadata: {
        intent: processedQuery.intent,
        keywords: processedQuery.keywords,
        priority: processedQuery.priority,
        responseStructure: optimizedResponse.structure,
        wordCount: optimizedResponse.wordCount,
        hasMetrics: optimizedResponse.hasMetrics,
        optimizationConfig: {
          useSTAR: optimizationConfig.useSTAR,
          tone: optimizationConfig.tone
        }
      }
    };
  } catch (error) {
    console.error('Error querying digital twin:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Detailed error:', errorMessage);
    return {
      success: false,
      answer: `Sorry, I encountered an error: ${errorMessage}. Please make sure environment variables are configured on Vercel.`,
      error: errorMessage,
      sources: []
    };
  }
}

export async function getDigitalTwinStats() {
  try {
    const info = await index.info();
    return {
      success: true,
      vectorCount: info.vectorCount || 0,
      dimension: info.dimension || 0,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
