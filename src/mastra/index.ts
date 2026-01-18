// =============================================================================
// TODO: Create the Mastra Instance
// =============================================================================
//
// This is the main entry point for your Mastra configuration.
// It creates a Mastra instance and registers all your agents.
//
// =============================================================================
// WHAT IS THE MASTRA INSTANCE?
// =============================================================================
//
// The Mastra instance is the central hub that:
//   - Holds all your registered agents
//   - Provides methods to access agents by name
//   - Can also hold workflows, tools, memory, and more
//
// Think of it as the "container" for your AI application.
//
// =============================================================================
// REQUIRED IMPORTS
// =============================================================================
//
// import { Mastra } from '@mastra/core';
//   - The main Mastra class
//   - Used to create your application instance
//
// import { fitnessCoach } from './agents';
//   - Your fitness coach agent
//   - Imported from the agents barrel file
//
// =============================================================================
// HOW TO IMPLEMENT
// =============================================================================
//
// Step 1: Add your imports
//
//   import { Mastra } from '@mastra/core';
//   import { fitnessCoach } from './agents';
//
// Step 2: Create and export the Mastra instance
//
//   export const mastra = new Mastra({
//     agents: {
//       fitnessCoach,  // Key 'fitnessCoach' is used in API routes
//     },
//   });
//
// =============================================================================
// MASTRA CONFIGURATION OPTIONS
// =============================================================================
//
// The Mastra constructor accepts:
//
// agents: Record<string, Agent>
//   - Your registered agents
//   - The KEY is important - it's how you reference agents in routes
//   - Example: { fitnessCoach: myAgent } → agent: 'fitnessCoach' in route
//
// workflows?: Record<string, Workflow>
//   - Multi-step automated processes
//   - Not needed for this project
//
// storage?: Storage
//   - Persistent data storage
//   - Not needed for this project
//
// memory?: Memory
//   - Conversation memory/history
//   - Not needed for basic implementation
//
// =============================================================================
// IMPORTANT: AGENT KEY NAMING
// =============================================================================
//
// The key you use when registering the agent MUST match what you use in routes:
//
// In this file:
//   agents: {
//     fitnessCoach: fitnessCoach,  // ← Key is 'fitnessCoach'
//   }
//
// In route.ts:
//   export const POST = chatRoute({
//     agent: 'fitnessCoach',  // ← Must match the key above!
//     mastra: mastra,
//   });
//
// =============================================================================
// EXAMPLE WITH MULTIPLE AGENTS
// =============================================================================
//
// If you add more agents later:
//
//   import { Mastra } from '@mastra/core';
//   import { fitnessCoach, nutritionCoach, yogaInstructor } from './agents';
//
//   export const mastra = new Mastra({
//     agents: {
//       fitnessCoach,
//       nutritionCoach,
//       yogaInstructor,
//     },
//   });
//
// Then you could create routes for each:
//   /api/chat/fitness    → agent: 'fitnessCoach'
//   /api/chat/nutrition  → agent: 'nutritionCoach'
//   /api/chat/yoga       → agent: 'yogaInstructor'
//
// =============================================================================
// ACCESSING AGENTS PROGRAMMATICALLY
// =============================================================================
//
// Once created, you can access agents from the mastra instance:
//
//   const agent = mastra.getAgent('fitnessCoach');
//   const response = await agent.generate('Hello!');
//
// This is useful for testing or server-side operations.
//
// =============================================================================
// NEXT STEPS
// =============================================================================
//
// After implementing this file:
//
// 1. Fix the import in src/app/api/chat/route.ts:
//    Change: import { mastra } from "@mastra";
//    To:     import { mastra } from "@/mastra";
//
// 2. Complete the route.ts implementation
//
// 3. Run the dev server and test!
//
// =============================================================================
