// TODO: Create the main chat interface component
//
// This is a client component - add 'use client' at the top!
//
// You'll need to:
// 1. Import useChat from '@ai-sdk/react'
// 2. Use the hook to get: messages, input, handleInputChange, handleSubmit, isLoading
// 3. Map over messages to display them
// 4. Create a form with an input field and submit button
//
// The useChat hook is called like this:
//   const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
//     api: '/api/chat',  // your API route
//   });
//
// Each message has: { id, role, content }
// - role is either 'user' or 'assistant'
