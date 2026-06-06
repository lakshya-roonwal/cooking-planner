import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
import { roadmapSchema } from '@/lib/schema';

// Initialize the Google Gemini provider with the API key from environment variables
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY,
});

export const runtime = 'edge';

/**
 * POST /api/generate-plan
 * 
 * Generates a context-aware culinary roadmap using Google Gemini 1.5 Flash.
 * Enforces a strict JSON schema for meals, grocery lists, and budget analysis.
 */
export async function POST(req: Request) {
  try {
    // 1. Extract and validate environment configuration
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error('[Configuration Error] GOOGLE_GEMINI_API_KEY is missing');
      return Response.json(
        { error: 'Server configuration error: Missing API Key.' },
        { status: 500 }
      );
    }

    // 2. Parse and validate request body
    const body = await req.json().catch(() => ({}));
    const { prompt, schedule, budgetLimit } = body;

    if (!prompt || typeof prompt !== 'string') {
      return Response.json(
        { error: 'A valid culinary preference prompt is required.' },
        { status: 400 }
      );
    }

    // 3. Invoke the AI SDK with structured output enforcement
    const result = await generateObject({
      model: google('gemini-1.5-flash'),
      schema: roadmapSchema,
      system: `You are a high-performance culinary roadmap engine. Your goal is to generate a comprehensive, context-aware daily meal plan.
      
      CRITICAL OPERATIONAL CONSTRAINTS:
      1. Schedule Awareness: Assess the user's availability: "${schedule || 'not specified'}". 
         - If the user is "busy", prioritize meals with minimal prep and cleanup (under 20 mins).
         - If "moderate", allow 30-45 mins. 
         - If "free", focus on high-quality, chef-level techniques.
      
      2. Ingredient Integrity: Every ingredient mentioned in the instructions for breakfast, lunch, and dinner MUST appear as an entry in the 'groceryList'.
      
      3. Budgetary Precision: Adhere to the budget limit of ${budgetLimit ? `$${budgetLimit}` : 'unlimited'}. 
         Estimate realistic market prices for each item. Ensure the 'budgetAnalysis' reflects the total accurately.
      
      4. Structured Format: Output must be minified JSON. Do not include markdown formatting or extra text.
      
      5. Tone: Professional, encouraging, and nutritionally focused.`,
      prompt: `User Preferences: ${prompt}`,
    });

    // 4. Return the structured roadmap object
    return Response.json(result.object);

  } catch (error: any) {
    console.error('[Culinary Engine Error]:', error);

    // Specific handling for common failure modes
    
    // API Timeouts or Network Errors
    if (error.name === 'AbortError' || error.message?.includes('timeout')) {
      return Response.json(
        { error: 'Generation timed out. The model took too long to respond.' },
        { status: 504 }
      );
    }

    // Schema Validation or Parsing Errors
    if (error.name === 'ZodError' || error.message?.includes('JSON')) {
      return Response.json(
        { error: 'Failed to generate a valid roadmap structure. Please try again with clearer preferences.' },
        { status: 422 }
      );
    }

    // Default Error Handler
    return Response.json(
      { error: 'An unexpected error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
