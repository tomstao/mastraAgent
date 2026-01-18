import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const calculateBmiTool = createTool({
  id: 'calculate-bmi',
  description: 'Calculates BMI from height and weight',
  inputSchema: z.object({
    heightCm: z.number().describe('Height in centimeters'),
    weightKg: z.number().describe('Weight in kilograms'),
  }),
  outputSchema: z.object({
    bmi: z.number(),
    category: z.string(),
  }),
  execute: async ({ context }) => {
    const { heightCm, weightKg } = context;
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);

    // Determine BMI category based on WHO standards
    let category = '';
    if (bmi < 18.5) {
      category = 'Underweight';
    } else if (bmi < 25) {
      category = 'Normal weight';
    } else if (bmi < 30) {
      category = 'Overweight';
    } else {
      category = 'Obese';
    }

    // Round BMI to 1 decimal place
    const roundedBmi = Math.round(bmi * 10) / 10;

    return { bmi: roundedBmi, category };
  },
});
