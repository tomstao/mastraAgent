'use client';

import { useChat } from '@ai-sdk/react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { useEffect, useRef } from 'react';

export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error, reload, stop } =
    useChat({
      api: '/api/chat',
    });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">Apex Fitness Coach</h1>
          <p className="text-emerald-100 text-sm">Your AI-powered personal trainer</p>
        </div>
      </header>

      {/* Messages Container */}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Welcome message when no messages */}
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💪</div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Welcome to Apex Fitness Coach!
              </h2>
              <p className="text-gray-500 max-w-md mx-auto">
                I&apos;m here to help you with workout plans, nutrition advice, and achieving your
                fitness goals. What would you like to work on today?
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <SuggestionChip text="Create a workout plan" />
                <SuggestionChip text="Calculate my BMI" />
                <SuggestionChip text="Nutrition tips" />
                <SuggestionChip text="Home exercises" />
              </div>
            </div>
          )}

          {/* Message List */}
          {messages.map((message) => (
            <MessageBubble key={message.id} role={message.role} content={message.content} />
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 text-gray-500">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                />
                <div
                  className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                />
              </div>
              <span className="text-sm">Apex is thinking...</span>
              <button
                onClick={() => stop()}
                className="text-xs text-red-500 hover:text-red-700 ml-2 underline"
              >
                Stop
              </button>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="font-medium">Something went wrong</p>
              <p className="text-sm">{error.message}</p>
              <button
                onClick={() => reload()}
                className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
              >
                Try again
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="border-t bg-white p-4">
        <div className="max-w-4xl mx-auto">
          <ChatInput
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </footer>
    </div>
  );
}

// Suggestion chip component
function SuggestionChip({ text }: { text: string }) {
  return (
    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm cursor-pointer hover:bg-emerald-200 transition-colors">
      {text}
    </span>
  );
}
