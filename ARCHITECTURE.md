# Fitness Coach Chatbot - Architecture Documentation

A comprehensive guide on how this AI-powered fitness coach chatbot was built using Mastra framework and Vercel AI SDK.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Project Structure](#project-structure)
3. [Layer-by-Layer Breakdown](#layer-by-layer-breakdown)
4. [Data Flow](#data-flow)
5. [Key Dependencies](#key-dependencies)
6. [Environment Setup](#environment-setup)
7. [Commands](#commands)
8. [Key Concepts](#key-concepts)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND (Browser)                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  page.tsx → ChatInterface.tsx → MessageBubble.tsx + ChatInput.tsx     │  │
│  │                    │                                                   │  │
│  │              useChat() hook                                            │  │
│  │                    │                                                   │  │
│  └────────────────────┼──────────────────────────────────────────────────┘  │
│                       │ POST /api/chat                                      │
├───────────────────────┼─────────────────────────────────────────────────────┤
│                       ▼                                                     │
│                              BACKEND (Server)                               │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  route.ts → mastra.getAgent('fitnessCoach') → agent.generate()        │  │
│  │                                                      │                 │  │
│  │                                                      ▼                 │  │
│  │                                              OpenAI API Call           │  │
│  │                                              (gpt-4o-mini)             │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### How It Works

1. **Frontend**: React components with `useChat` hook handle UI and state
2. **API Route**: Next.js route receives messages and calls the Mastra agent
3. **Mastra Agent**: Processes messages using OpenAI's GPT-4o-mini model
4. **Tools**: Agent can use tools (like BMI calculator) for precise calculations
5. **Response**: Streamed back to frontend in AI SDK data stream format

---

## Project Structure

```
fitness-coach/
├── src/
│   ├── mastra/                      # MASTRA CONFIGURATION
│   │   ├── agents/
│   │   │   ├── fitness-coach.ts     # Agent definition
│   │   │   └── index.ts             # Agent exports
│   │   ├── tools/
│   │   │   ├── calculate-bmi.ts     # BMI calculator tool
│   │   │   └── index.ts             # Tool exports
│   │   └── index.ts                 # Mastra instance
│   │
│   └── app/                         # NEXT.JS APP
│       ├── api/
│       │   └── chat/
│       │       └── route.ts         # API endpoint
│       ├── components/
│       │   ├── ChatInterface.tsx    # Main chat UI
│       │   ├── MessageBubble.tsx    # Message display
│       │   └── ChatInput.tsx        # Input form
│       ├── page.tsx                 # Home page
│       ├── layout.tsx               # Root layout
│       └── globals.css              # Global styles
│
├── .env.local                       # API keys (gitignored)
├── .env.example                     # API key template
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── .prettierrc                      # Prettier config
└── .husky/pre-commit                # Pre-commit hook
```

---

## Layer-by-Layer Breakdown

### 1. Agent Definition

**File:** `src/mastra/agents/fitness-coach.ts`

```typescript
import { Agent } from '@mastra/core/agent';
import { calculateBmiTool } from '@/mastra/tools';

export const fitnessCoach = new Agent({
  name: 'fitness coach',
  instructions: 'Role: You are "Apex," an elite AI Fitness Coach...',
  model: 'openai/gpt-4o-mini',
  tools: {
    calculateBmiTool: calculateBmiTool,
  },
});
```

**Purpose:**

- Defines the agent's personality via `instructions` (system prompt)
- Specifies the LLM model using a "magic string"
- Registers tools the agent can call

**Key Properties:**

| Property       | Type   | Description                     |
| -------------- | ------ | ------------------------------- |
| `name`         | string | Unique identifier for the agent |
| `instructions` | string | System prompt defining behavior |
| `model`        | string | LLM model to use                |
| `tools`        | object | Available tools for the agent   |

---

### 2. Tool Definition

**File:** `src/mastra/tools/calculate-bmi.ts`

```typescript
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

    let category = '';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal weight';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';

    return { bmi: Math.round(bmi * 10) / 10, category };
  },
});
```

**Purpose:**

- Extends agent capabilities beyond text generation
- Provides precise calculations (LLMs are bad at math)
- Uses Zod for type-safe input/output validation

**Tool Anatomy:**

| Property       | Description                                   |
| -------------- | --------------------------------------------- |
| `id`           | Unique identifier for logging/tracking        |
| `description`  | LLM reads this to decide when to use the tool |
| `inputSchema`  | Zod schema for input validation               |
| `outputSchema` | Zod schema for output validation              |
| `execute`      | The function that runs when tool is called    |

---

### 3. Mastra Instance

**File:** `src/mastra/index.ts`

```typescript
import { Mastra } from '@mastra/core';
import { fitnessCoach } from '@/mastra/agents';

export const mastra = new Mastra({
  agents: {
    fitnessCoach: fitnessCoach,
  },
});
```

**Purpose:**

- Central registry for all agents
- Agents retrieved via `mastra.getAgent('fitnessCoach')`
- Can also hold workflows, memory, and storage configurations

---

### 4. API Route

**File:** `src/app/api/chat/route.ts`

```typescript
import { mastra } from '@/mastra';

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Get the fitness coach agent
  const agent = mastra.getAgent('fitnessCoach');

  // Generate response (non-streaming)
  const result = await agent.generate(messages);
  const text = result.text;

  // Format as AI SDK data stream
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(`0:${JSON.stringify(text)}\n`));
      controller.enqueue(
        encoder.encode(
          `e:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0}}\n`
        )
      );
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
```

**Purpose:**

- Receives POST requests from frontend
- Extracts messages from request body
- Calls Mastra agent to generate response
- Formats response in AI SDK data stream protocol

**Data Stream Protocol:**

| Prefix | Purpose                    |
| ------ | -------------------------- |
| `0:`   | Text content               |
| `e:`   | Finish event with metadata |

---

### 5. Frontend Components

#### ChatInterface.tsx

```typescript
'use client';

import { useChat } from '@ai-sdk/react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';

export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({ api: '/api/chat' });

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header>Apex Fitness Coach</header>

      {/* Messages */}
      <main>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
        ))}
      </main>

      {/* Input */}
      <footer>
        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </footer>
    </div>
  );
}
```

**useChat Hook Returns:**

| Property            | Type     | Description            |
| ------------------- | -------- | ---------------------- |
| `messages`          | array    | Chat message history   |
| `input`             | string   | Current input value    |
| `handleInputChange` | function | Input change handler   |
| `handleSubmit`      | function | Form submit handler    |
| `isLoading`         | boolean  | Loading state          |
| `error`             | Error    | Error object if failed |
| `reload`            | function | Retry last message     |
| `stop`              | function | Stop generation        |

#### MessageBubble.tsx

```typescript
interface MessageBubbleProps {
  role: string;
  content: string;
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === 'user';

  return (
    <div className={isUser ? 'justify-end' : 'justify-start'}>
      <div className={isUser ? 'bg-emerald-600 text-white' : 'bg-white'}>
        {content}
      </div>
    </div>
  );
}
```

#### ChatInput.tsx

```typescript
interface ChatInputProps {
  input: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export function ChatInput({ input, handleInputChange, handleSubmit, isLoading }: ChatInputProps) {
  return (
    <form onSubmit={handleSubmit}>
      <input value={input} onChange={handleInputChange} disabled={isLoading} />
      <button type="submit" disabled={isLoading}>Send</button>
    </form>
  );
}
```

---

## Data Flow

```
1. User types message       → ChatInput.tsx (input state)
           │
2. Form submit              → handleSubmit() from useChat
           │
3. POST request             → /api/chat with { messages: [...] }
           │
4. Server receives          → route.ts extracts messages
           │
5. Agent processes          → agent.generate(messages)
           │
6. Tool execution           → If needed, BMI tool runs
           │
7. OpenAI API call          → gpt-4o-mini with system prompt
           │
8. Response returns         → Formatted as data stream (0:..., e:...)
           │
9. Frontend receives        → useChat hook parses stream
           │
10. UI updates              → MessageBubble renders new message
```

---

## Key Dependencies

| Package          | Version | Purpose                            |
| ---------------- | ------- | ---------------------------------- |
| `@mastra/core`   | ^0.24.9 | Agent and tool creation            |
| `@mastra/ai-sdk` | ^0.3.3  | Mastra ↔ Vercel AI SDK integration |
| `@ai-sdk/react`  | latest  | `useChat` hook for React           |
| `@ai-sdk/openai` | ^3.0.12 | OpenAI model provider              |
| `zod`            | ^4.3.5  | Schema validation for tools        |
| `next`           | 16.1.3  | React framework with API routes    |
| `react`          | 19.2.3  | UI library                         |
| `tailwindcss`    | ^4      | Styling                            |

### Dev Dependencies

| Package       | Purpose                     |
| ------------- | --------------------------- |
| `typescript`  | Type checking               |
| `prettier`    | Code formatting             |
| `husky`       | Git hooks                   |
| `lint-staged` | Run linters on staged files |
| `eslint`      | Linting                     |

---

## Environment Setup

### Required Environment Variables

Create `.env.local` in the project root:

```bash
# OpenAI API Key (required)
# Get yours at: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-proj-your-key-here
```

### How API Key is Used

```
.env.local
    │
    │  OPENAI_API_KEY=sk-proj-xxx
    │
    ▼ (auto-read by Node.js)

fitness-coach.ts
    │
    │  model: 'openai/gpt-4o-mini'  ← Magic string
    │
    ▼ (Mastra resolves)

Mastra Model Resolver
    │
    │  1. Parses 'openai/gpt-4o-mini'
    │  2. Reads process.env.OPENAI_API_KEY
    │  3. Creates OpenAI client
    │
    ▼

OpenAI API Call
```

---

## Commands

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Build for production
bun run build

# Start production server
bun start

# Format code
bun run format

# Check formatting
bun run format:check

# Lint code
bun run lint
```

---

## Key Concepts

### What is an Agent?

An **Agent** is an AI entity with:

- **Instructions**: System prompt defining personality and behavior
- **Model**: The LLM that powers it (e.g., GPT-4o-mini)
- **Tools**: Functions it can call for specific tasks

### What is a Tool?

A **Tool** extends an agent's capabilities:

- Provides functions the agent can call
- Useful for precise calculations, API calls, database queries
- LLM decides when to use tools based on `description`

### Magic Strings

Instead of importing model providers, you can use magic strings:

```typescript
// Magic string (simple)
model: 'openai/gpt-4o-mini';

// Equivalent explicit import
import { openai } from '@ai-sdk/openai';
model: openai('gpt-4o-mini');
```

Mastra automatically reads `OPENAI_API_KEY` from environment.

### AI SDK Data Stream Protocol

The frontend `useChat` hook expects responses in this format:

```
0:"Hello, I'm Apex!"\n     ← Text chunk
0:" How can I help?"\n     ← Another text chunk
e:{"finishReason":"stop"}  ← Finish event
```

| Prefix | Meaning              |
| ------ | -------------------- |
| `0:`   | Text delta (content) |
| `e:`   | Finish event         |
| `d:`   | Data event           |

---

## Testing

### Postman Test

**URL:** `POST http://localhost:3000/api/chat`

**Headers:**

```
Content-Type: application/json
```

**Body:**

```json
{
  "messages": [
    {
      "role": "user",
      "content": "Calculate my BMI. I am 180cm tall and weigh 75kg."
    }
  ]
}
```

---

## Future Enhancements

- [ ] Add streaming responses for real-time typing effect
- [ ] Add conversation memory/persistence
- [ ] Add more tools (TDEE calculator, workout generator)
- [ ] Add voice input/output
- [ ] Deploy to Vercel

---

## Resources

- [Mastra Documentation](https://mastra.ai/docs)
- [Vercel AI SDK Documentation](https://sdk.vercel.ai/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
