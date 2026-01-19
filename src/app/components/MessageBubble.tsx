interface MessageBubbleProps {
  role: string;
  content: string;
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-emerald-600 text-white rounded-br-md'
            : 'bg-white text-gray-800 shadow-md rounded-bl-md border border-gray-100'
        }`}
      >
        {/* Role indicator */}
        <div
          className={`text-xs font-medium mb-1 ${isUser ? 'text-emerald-200' : 'text-emerald-600'}`}
        >
          {isUser ? 'You' : 'Apex Coach'}
        </div>

        {/* Message content with markdown-like formatting */}
        <div className={`text-sm leading-relaxed whitespace-pre-wrap ${isUser ? '' : 'prose-sm'}`}>
          {content}
        </div>
      </div>
    </div>
  );
}
