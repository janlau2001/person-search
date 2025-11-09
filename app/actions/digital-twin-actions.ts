'use server';

import { Index } from '@upstash/vector';
import Groq from 'groq-sdk';
import digitalTwinData from '../../digitaltwin.json';
import { generateContentChunks } from '@/lib/digital-twin-processor';

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

    // Step 1: Query vector database for relevant content
    const vectorResults = await index.query({
      data: question,
      topK: 3,
      includeMetadata: true,
    });

    if (!vectorResults || vectorResults.length === 0) {
      return {
        success: false,
        answer: "I don't have specific information about that topic.",
        sources: []
      };
    }

    // Step 2: Extract relevant content
    const relevantDocs = vectorResults.map(result => ({
      title: result.metadata?.title || 'Information',
      content: result.metadata?.content || '',
      score: result.score || 0,
    }));

    const context = relevantDocs.map(doc => `${doc.title}: ${doc.content}`).join('\n\n');

    // Step 3: Generate response using Groq
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: `You are Jan Laurence Hernandez Olarte's AI digital twin assistant. Answer questions about Jan's background, skills, experience, and career goals in first person. Be professional, friendly, and enthusiastic. Use the provided context to give accurate, specific answers.`
        },
        {
          role: 'user',
          content: `Based on the following information about Jan, answer this question: "${question}"

Context:
${context}

Provide a helpful, conversational response as if you were Jan:`
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const answer = completion.choices[0]?.message?.content || 'Unable to generate response';

    return {
      success: true,
      answer,
      sources: relevantDocs.map(doc => ({ title: doc.title, relevance: doc.score })),
      question
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
