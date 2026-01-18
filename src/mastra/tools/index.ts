// TODO: (Optional) Create custom tools for your agent
//
// Tools give your agent real-world capabilities like:
// - Calculating BMI
// - Looking up exercises
// - Setting workout timers
//
// Tools are created with createTool from '@mastra/core/tools':
//
//   import { createTool } from '@mastra/core/tools';
//   import { z } from 'zod';
//
//   export const calculateBmiTool = createTool({
//     id: 'calculate-bmi',
//     description: 'Calculates BMI from height and weight',
//     inputSchema: z.object({
//       heightCm: z.number().describe('Height in centimeters'),
//       weightKg: z.number().describe('Weight in kilograms'),
//     }),
//     outputSchema: z.object({
//       bmi: z.number(),
//       category: z.string(),
//     }),
//     execute: async ({ context }) => {
//       const { heightCm, weightKg } = context;
//       const heightM = heightCm / 100;
//       const bmi = weightKg / (heightM * heightM);
//       // Return BMI and category
//       return { bmi, category: '...' };
//     },
//   });
