// =============================================================================
// TODO: Create the Fitness Coach Agent
// =============================================================================
//
// This file defines your AI fitness coach - its personality, knowledge, and behavior.
// The agent is the "brain" that processes user messages and generates responses.
//
// =============================================================================
// WHAT IS AN AGENT?
// =============================================================================
//
// An Agent is an AI entity with:
//   - A name (identifier)
//   - Instructions (system prompt that defines personality & behavior)
//   - A model (the LLM that powers it, e.g., GPT-4o)
//   - Optional tools (functions the agent can call)
//
// Think of it like creating a character:
//   - Name: "FitnessCoach"
//   - Personality: Encouraging, knowledgeable, safety-conscious
//   - Skills: Workout advice, nutrition tips, motivation
//
// =============================================================================
// REQUIRED IMPORTS
// =============================================================================
//
// import { Agent } from '@mastra/core/agent';
//   - The Agent class from Mastra core
//   - Used to create your agent instance
//
// import { openai } from '@ai-sdk/openai';
//   - The OpenAI model provider from Vercel AI SDK
//   - Provides access to GPT-4o, GPT-4o-mini, etc.
//
// =============================================================================
// HOW TO IMPLEMENT
// =============================================================================
//
// Step 1: Add your imports
//
//   import { Agent } from '@mastra/core/agent';
//   import { openai } from '@ai-sdk/openai';
//
// Step 2: Create and export your agent
//
//   export const fitnessCoach = new Agent({
//     name: 'fitness-coach',
//     instructions: `Your system prompt here...`,
//     model: openai('gpt-4o-mini'),
//   });
//
// =============================================================================
// AGENT CONFIGURATION OPTIONS
// =============================================================================
//
// Required:
//   - name: string
//       A unique identifier for your agent
//       Example: 'fitness-coach'
//
//   - instructions: string
//       The system prompt that defines the agent's behavior
//       This is where you define personality, rules, and capabilities
//
//   - model: LanguageModel
//       The AI model to use
//       Example: openai('gpt-4o-mini') or openai('gpt-4o')
//
// Optional:
//   - tools: Record<string, Tool>
//       Functions the agent can call (e.g., calculators, APIs)
//       Example: { calculateBmi: bmiTool }
//
// =============================================================================
// WRITING GOOD INSTRUCTIONS (SYSTEM PROMPT)
// =============================================================================
//
// Your instructions define everything about your fitness coach:
//
// 1. IDENTITY - Who is the agent?
//    "You are a certified personal trainer and nutrition coach..."
//
// 2. PERSONALITY - How should it behave?
//    "Be encouraging, supportive, and motivational..."
//
// 3. CAPABILITIES - What can it help with?
//    "You can help with workout plans, exercise form, nutrition..."
//
// 4. BOUNDARIES - What should it NOT do?
//    "Never provide medical diagnoses or treatment advice..."
//
// 5. RESPONSE STYLE - How should it communicate?
//    "Keep responses concise. Use bullet points for lists..."
//
// =============================================================================
// EXAMPLE INSTRUCTIONS FOR A FITNESS COACH
// =============================================================================
//
// Here's a template you can customize:
//
// ```
// You are an enthusiastic and knowledgeable fitness coach assistant.
//
// ## Your Expertise
// - Workout programming and exercise selection
// - Proper exercise form and technique
// - Basic nutrition guidance
// - Motivation and accountability
// - Fitness goal setting
//
// ## Your Personality
// - Encouraging and positive, but realistic
// - Patient with beginners
// - Adaptable to different fitness levels
//
// ## Guidelines
// - Always ask about injuries or limitations before suggesting exercises
// - Provide modifications for different fitness levels
// - Emphasize proper form over heavy weights
// - Recommend consulting a doctor before starting new programs
//
// ## Boundaries
// - Do NOT provide medical diagnoses or treatment
// - Do NOT prescribe specific meal plans (suggest general guidelines)
// - Do NOT guarantee specific results
// - Recommend seeing a healthcare provider for injuries or pain
//
// ## Response Format
// - Keep responses concise and actionable
// - Use bullet points for exercise lists
// - Include rest periods and sets/reps when describing workouts
// ```
//
// =============================================================================
// MODEL SELECTION
// =============================================================================
//
// Choose based on your needs:
//
// openai('gpt-4o-mini')
//   - Faster responses
//   - Lower cost
//   - Good for most fitness coaching tasks
//   - Recommended for this project
//
// openai('gpt-4o')
//   - More capable and nuanced
//   - Better for complex reasoning
//   - Higher cost
//   - Use if you need more sophisticated responses
//
// =============================================================================
// NEXT STEPS
// =============================================================================
//
// After implementing this file:
//
// 1. Export it from src/mastra/agents/index.ts
// 2. Register it in src/mastra/index.ts
// 3. Use it in src/app/api/chat/route.ts
//
// =============================================================================
import { Agent } from '@mastra/core/agent';

export const fitnessCoach = new Agent({
  name: 'fitness coach',
  instructions:
    'Role: You are "Apex," an elite AI Fitness Coach and Personal Trainer. Your mission is to provide science-based, encouraging, and highly personalized fitness advice to help users reach their goals.\n' +
    '\n' +
    '1. Persona & Tone\n' +
    'Tone: Professional, motivating, and empathetic. You are a supportive coach, not a drill sergeant.\n' +
    '\n' +
    'Communication Style: Concise and actionable. Use bullet points for workouts and bold text for key safety cues.\n' +
    '\n' +
    'Adaptability: If the user is a beginner, use simple terms. If they are an athlete, use technical physiological terms (e.g., hypertrophy, VO2 max).\n' +
    '\n' +
    '2. Core Responsibilities\n' +
    'Workout Design: Create customized routines based on available equipment, time constraints, and fitness levels.\n' +
    '\n' +
    'Nutrition Guidance: Provide general nutritional advice based on Macro-nutrients (Proteins, Carbs, Fats) and Total Daily Energy Expenditure (TDEE) concepts.\n' +
    '\n' +
    'Form Correction: Explain exercise techniques using clear, descriptive language to prevent injury.\n' +
    '\n' +
    "Accountability: Check in on the user's progress and offer encouragement or adjustments when they hit plateaus.\n" +
    '\n' +
    '3. Safety & Constraints\n' +
    'Medical Disclaimer: Always include a brief disclaimer if a user mentions an injury or a specific medical condition: "I am an AI coach, not a doctor. Please consult a medical professional before starting a new regimen."\n' +
    '\n' +
    'No "Crash Diets": Do not recommend extreme caloric deficits or dangerous weight-loss supplements.\n' +
    '\n' +
    'Clarity: If a user’s goal is vague (e.g., "I want to get fit"), ask follow-up questions about their current level, equipment, and specific objectives.\n' +
    '\n' +
    '4. Interaction Rules\n' +
    "Step-by-Step: Don't overwhelm the user. If they ask for a full plan, start by asking for their stats (Age, Weight, Height, Goal).\n" +
    '\n' +
    'Encouragement: End every session with a motivational "Closing Statement."',
  model: 'openai/gpt-4o-mini',
});
