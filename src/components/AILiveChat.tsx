import { useState } from 'react';
import { MessageCircle, X, RotateCcw } from 'lucide-react';
import { useBodyScrollLock, useSidebarState, useAutoScrollToBottom, useChatMessages } from '@hooks';
import type { Message } from '@hooks';
import type { QuestionTemplate } from '@config/chatTemplates';

// Message Component
interface MessageItemProps {
  message: Message;
}

const MessageItem = ({ message }: MessageItemProps) => {
  const isUser = message.type === 'user';
  const messageClasses = isUser
    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white'
    : 'bg-white dark:bg-dark-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-white/10';
  
  const timeClasses = isUser 
    ? 'text-white/80' 
    : 'text-gray-500 dark:text-gray-400';

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
    >
      <div className={`max-w-[85%] rounded-xl px-3 py-2 shadow-sm ${messageClasses}`}>
        <p className="text-xs leading-relaxed whitespace-pre-line">
          {message.text}
        </p>
        <p className={`text-[10px] mt-1 ${timeClasses}`}>
          {message.timestamp.toLocaleTimeString('id-ID', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>
    </div>
  );
};

// Template Questions Component
interface TemplateQuestionsProps {
  templates: QuestionTemplate[];
  onTemplateClick: (template: QuestionTemplate) => void;
}

const TemplateQuestions = ({ templates, onTemplateClick }: TemplateQuestionsProps) => (
  <div className="p-3 border-t border-gray-200 dark:border-white/10 space-y-1.5 max-h-48 overflow-y-auto bg-gray-50 dark:bg-dark-900/50 shrink-0 custom-scrollbar">
    <div className="flex items-center gap-2 mb-2">
      <div className="w-0.5 h-3.5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
      <p className="text-xs font-bold text-gray-700 dark:text-gray-200">Questions</p>
    </div>
    {templates.map((template) => (
      <button
        key={template.id}
        onClick={() => onTemplateClick(template)}
        className="w-full text-left px-3 py-2 rounded-lg bg-white dark:bg-dark-800/80 border border-gray-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-purple-500/40 hover:shadow-sm transition-all duration-200 group"
      >
        <p className="text-xs text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-white transition-colors leading-snug">
          {template.text}
        </p>
      </button>
    ))}
  </div>
);

// Chat Header Component
interface ChatHeaderProps {
  onClose: () => void;
}

const ChatHeader = ({ onClose }: ChatHeaderProps) => (
  <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-3.5 shrink-0">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-white/95 flex items-center justify-center shadow-md">
            <MessageCircle className="w-4.5 h-4.5 text-blue-600" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
        </div>
        <div>
          <h3 className="text-white font-bold text-sm">Neverland AI</h3>
          <p className="text-white/90 text-xs">Ready to help</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="text-white/80 hover:text-white hover:bg-white/15 p-1.5 rounded-lg transition-all duration-200"
        aria-label="Close chat"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  </div>
);

// Chat Footer Component
interface ChatFooterProps {
  onReset: () => void;
}

const ChatFooter = ({ onReset }: ChatFooterProps) => (
  <div className="p-3 border-t border-gray-200 dark:border-white/10 bg-white dark:bg-dark-900 shrink-0">
    <button
      onClick={onReset}
      className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-200 flex items-center justify-center gap-2 group shadow-sm hover:shadow-md"
    >
      <RotateCcw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-300" />
      <span className="text-xs font-semibold">New Conversation</span>
    </button>
  </div>
);

// Main Component
export default function AILiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const isSidebarOpen = useSidebarState();
  const { messages, showTemplates, templates, handleTemplateClick, resetChat } = useChatMessages();
  const { ref: messagesEndRef } = useAutoScrollToBottom<HTMLDivElement>([messages]);
  
  useBodyScrollLock(isOpen);

  const blurClass = isSidebarOpen 
    ? 'blur-[2px] opacity-50 pointer-events-none lg:blur-none lg:opacity-100 lg:pointer-events-auto' 
    : '';

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-16 right-4 w-[340px] max-h-[500px] bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 transition-all duration-300 ${blurClass}`}>
          <ChatHeader onClose={() => setIsOpen(false)} />

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-gradient-to-b from-gray-50 to-white dark:from-dark-800/30 dark:to-dark-900 custom-scrollbar">
            {messages.map((message) => (
              <MessageItem key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {showTemplates && (
            <TemplateQuestions 
              templates={templates} 
              onTemplateClick={handleTemplateClick} 
            />
          )}

          <ChatFooter onReset={resetChat} />
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center z-50 group ${blurClass}`}
        aria-label="AI Live Chat"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <>
            <MessageCircle className="w-5 h-5 text-white" />
            <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75" />
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-dark-900 animate-pulse" />
          </>
        )}
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 dark:bg-dark-800 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
          <span className="text-xs text-white font-medium">💬 Chat AI</span>
        </div>
      </button>
    </>
  );
}


