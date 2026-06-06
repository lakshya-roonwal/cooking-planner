import { z } from 'zod';

export const roadmapSchema = z.object({
  meals: z.object({
    breakfast: z.object({
      title: z.string(),
      prepTimeMins: z.number(),
      instructions: z.array(z.string()),
    }),
    lunch: z.object({
      title: z.string(),
      prepTimeMins: z.number(),
      instructions: z.array(z.string()),
    }),
    dinner: z.object({
      title: z.string(),
      prepTimeMins: z.number(),
      instructions: z.array(z.string()),
    }),
  }),
  groceryList: z.array(
    z.object({
      item: z.string(),
      category: z.enum(['Produce', 'Meat/Protein', 'Pantry', 'Dairy', 'Other']),
      estimatedCost: z.number(),
    })
  ),
  substitutions: z.array(
    z.object({
      original: z.string(),
      replacement: z.string(),
      reason: z.string(),
    })
  ),
  budgetAnalysis: z.object({
    totalCost: z.number(),
    isUnderBudget: z.boolean(),
    explanation: z.string(),
  }),
});

export type Roadmap = z.infer<typeof roadmapSchema>;
