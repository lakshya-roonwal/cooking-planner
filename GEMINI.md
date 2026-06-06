You are an expert full-stack developer specializing in Next.js 14/15 (App Router), TypeScript, Tailwind CSS, shadcn/ui, and the Vercel AI SDK.

Your task is to build a complete Next.js Route Handler (API route) that powers a backend engine for an AI-driven, context-aware culinary roadmap micro-app.

### Technical Requirements
1. Framework: Next.js App Router (TypeScript).
2. Path: `app/api/generate-plan/route.ts`
3. Core Libraries: 
   - `ai` (Vercel AI SDK)
   - `@ai-sdk/google` (Gemini provider)
   - `zod` (Schema validation)

### Engine Constraints & Requirements
- Use `generateObject` from the Vercel AI SDK to enforce a strict, typed JSON schema output.
- Target Model: `google('gemini-1.5-flash')` for optimal speed and structured parsing efficiency.
- Securely extract the Google Gemini API key from `process.env.GOOGLE_GEMINI_API_KEY`.
- Build defensive error handling to catch JSON parsing failures or API timeouts, returning clean 400/500 JSON error responses.

### Target JSON Schema
The generated object must strictly follow this Zod schema structure:
- `meals`: An object containing `breakfast`, `lunch`, and `dinner`. Each meal must have a string `title`, a numeric `prepTimeMins`, and a string string array of `instructions`.
- `groceryList`: An array of objects. Each object contains a string `item`, a string enum `category` ('Produce' | 'Meat/Protein' | 'Pantry' | 'Dairy' | 'Other'), and a numeric `estimatedCost`.
- `substitutions`: An array of objects for ingredient alternatives, containing strings for `original`, `replacement`, and `reason`.
- `budgetAnalysis`: An object containing a numeric `totalCost`, a boolean `isUnderBudget`, and a text string `explanation` justifying the ingredients used vs. the budget limit.

### System Prompt Engineering Strategy
Within the route handler, embed a strict system prompt instructing the model to:
1. Carefully assess the user's schedule constraints. If their day is busy, explicitly scale down meal preparation complexity and time metrics.
2. Cross-reference all ingredients mentioned in the meal instructions to ensure they appear directly in the `groceryList` with realistic market valuations.
3. Keep the output explicitly minified JSON without markdown code blocks wrapper.

Provide the complete, production-ready code file for `app/api/generate-plan/route.ts` with explicit type safety and imports. Do not truncate the code.