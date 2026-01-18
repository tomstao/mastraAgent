// =============================================================================
// TODO: Create the Chat API Route
// =============================================================================
//
// This file is the BACKEND endpoint that handles chat requests from your frontend.
// It receives messages from the useChat hook and streams responses back.
//
// =============================================================================
// WHAT THIS FILE DOES
// =============================================================================
//
// 1. Receives POST requests from the frontend (useChat hook)
// 2. Extracts the conversation messages from the request body
// 3. Passes messages to your Mastra fitness coach agent
// 4. Streams the AI response back to the frontend in real-time
//
// Request Flow:
//   Browser (useChat) → POST /api/chat → This Route → Mastra Agent → OpenAI → Stream back
//
// =============================================================================
// REQUIRED IMPORTS
// =============================================================================
//
// import { chatRoute } from '@mastra/ai-sdk';
//   - Helper function that creates a Next.js route handler
//   - Handles request parsing, agent execution, and response streaming
//
// import { mastra } from '@/mastra';
//   - Your Mastra instance with registered agents
//   - Contains the 'fitnessCoach' agent you created
//
// =============================================================================
// HOW TO IMPLEMENT
// =============================================================================
//
// Step 1: Add your imports at the top of the file
//
//   import { chatRoute } from '@mastra/ai-sdk';
//   import { mastra } from '@/mastra';
//
// Step 2: Export a POST handler using chatRoute
//
//   export const POST = chatRoute({
//     mastra: mastra,
//     agent: 'fitnessCoach',  // Must match the key in your Mastra agents config
//   });
//
// =============================================================================
// CONFIGURATION OPTIONS
// =============================================================================
//
// The chatRoute function accepts these options:
//
// Required:
//   - mastra: Mastra          Your Mastra instance
//   - agent: string           The agent key (e.g., 'fitnessCoach')
//
// Optional:
//   - defaultOptions: {       Default execution options
//       maxSteps?: number     Max tool-use iterations (default: 5)
//     }
//
// =============================================================================
// WHAT THE FRONTEND SENDS (Request Body)
// =============================================================================
//
// The useChat hook sends a POST request with this JSON body:
//
//   {
//     "messages": [
//       { "role": "user", "content": "Hi, I want to start working out" },
//       { "role": "assistant", "content": "Great! What are your fitness goals?" },
//       { "role": "user", "content": "I want to lose weight" }
//     ]
//   }
//
// =============================================================================
// WHAT THIS ROUTE RETURNS (Streaming Response)
// =============================================================================
//
// The response is a Server-Sent Events (SSE) stream:
//
//   data: {"type":"text","text":"That's"}
//   data: {"type":"text","text":" a great"}
//   data: {"type":"text","text":" goal!"}
//   data: {"type":"text","text":" Let me..."}
//   data: {"type":"finish"}
//
// The useChat hook automatically parses this stream and updates the UI.
//
// =============================================================================
// PREREQUISITES - IMPLEMENT THESE FIRST!
// =============================================================================
//
// Before this route will work, you need to create:
//
// 1. src/mastra/agents/fitness-coach.ts
//    - Define your fitness coach agent with name, instructions, and model
//
// 2. src/mastra/agents/index.ts
//    - Export the fitness coach agent
//
// 3. src/mastra/index.ts
//    - Create the Mastra instance and register the agent as 'fitnessCoach'
//
// =============================================================================
// DEBUGGING TIPS
// =============================================================================
//
// If you get errors:
//
// - "Cannot find module '@/mastra'"
//   → Make sure src/mastra/index.ts exports the mastra instance
//
// - "Agent 'fitnessCoach' not found"
//   → Check that the agent key matches in mastra config and this route
//
// - 500 Internal Server Error
//   → Check terminal for error details
//   → Verify OPENAI_API_KEY is set in .env.local
//
// - Empty responses
//   → Check that your agent has valid instructions
//   → Verify the model is correctly configured (e.g., openai('gpt-4o-mini'))
//
// =============================================================================
