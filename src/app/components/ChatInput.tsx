import { ChangeEvent, FormEvent } from 'react';

interface ChatInputProps {
  input: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export function ChatInput({ input, handleInputChange, handleSubmit, isLoading }: ChatInputProps) {
  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Ask about workouts, nutrition, or fitness goals..."
        disabled={isLoading}
        className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Sending...</span>
          </>
        ) : (
          <>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            <span>Send</span>
          </>
        )}
      </button>
    </form>
  );
}
