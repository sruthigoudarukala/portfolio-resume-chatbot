import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, ChevronDown, ChevronUp, Bot, User, Sparkles, AlertCircle } from 'lucide-react';
import { ChatMessage } from '../types.ts';

// Mandatory backend URL definition as specified
const BACKEND_URL = "https://chapter-prefer-warning-function.trycloudflare.com";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId] = useState<string>(() => {
    return 'session_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now().toString(36);
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [expandedSources, setExpandedSources] = useState<Record<string, boolean>>({});
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: "Hello! I am Sruthi Arukala's portfolio assistant. Ask me about her education, teaching experience, data science training, skills or machine learning projects.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isLoading]);

  const toggleSource = (msgId: string) => {
    setExpandedSources(prev => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMessageId = 'user_' + Date.now();
    const newUserMessage: ChatMessage = {
      id: userMessageId,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: text,
          session_id: sessionId
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      
      const assistantMessageId = 'assistant_' + Date.now();
      const newAssistantMessage: ChatMessage = {
        id: assistantMessageId,
        sender: 'assistant',
        text: data.answer || "No response received.",
        sources: Array.isArray(data.sources) && data.sources.length > 0 ? data.sources : undefined,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, newAssistantMessage]);
    } catch {
      const errorMessageId = 'error_' + Date.now();
      const offlineMessage: ChatMessage = {
        id: errorMessageId,
        sender: 'assistant',
        text: "The assistant is offline right now. Please try again later.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true
      };
      setMessages(prev => [...prev, offlineMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What is Sruthi's experience at PS Associates?",
    "Tell me about the Telugu stop word lexicon",
    "What are Sruthi's core technical skills?"
  ];

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close chat" : "Ask me anything about Sruthi"}
          className="group relative flex items-center gap-2.5 rounded-full bg-amber-500 px-4 py-3 text-slate-950 font-semibold shadow-lg shadow-amber-500/20 hover:bg-amber-400 hover:shadow-amber-500/30 transition-all duration-200 active:scale-95"
        >
          {isOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <>
              <MessageSquare className="h-5 w-5 fill-slate-950" />
              <span className="hidden sm:inline text-sm whitespace-nowrap">Ask me about Sruthi</span>
            </>
          )}
        </button>
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-panel-title"
          className="fixed bottom-20 right-4 z-40 w-[calc(100vw-2rem)] sm:w-[420px] max-w-[420px] h-[560px] max-h-[calc(100vh-6.5rem)] rounded-2xl border border-slate-800 bg-[#0c121e] shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 bg-[#090D14]/90 px-4 py-3.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <h3 id="chat-panel-title" className="text-sm font-semibold text-white truncate">
                  Ask me anything about Sruthi
                </h3>
                <p className="text-[11px] text-slate-400 truncate">
                  AI assistant · Data science & ML projects
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              aria-label="Close chat window"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-sm">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`flex items-start gap-2 max-w-[88%] ${
                    msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {/* Sender Avatar */}
                  <div
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${
                      msg.sender === 'user'
                        ? 'bg-amber-500 text-slate-950 font-medium'
                        : msg.isError
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-slate-800 text-amber-400'
                    }`}
                  >
                    {msg.sender === 'user' ? (
                      <User className="h-3.5 w-3.5" />
                    ) : msg.isError ? (
                      <AlertCircle className="h-3.5 w-3.5" />
                    ) : (
                      <Bot className="h-3.5 w-3.5" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-xs'
                        : msg.isError
                        ? 'bg-red-950/40 border border-red-800/40 text-red-200 rounded-tl-xs'
                        : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-xs'
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">{msg.text}</p>

                    {/* Collapsible Sources List */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-slate-800/80">
                        <button
                          type="button"
                          onClick={() => toggleSource(msg.id)}
                          className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors"
                        >
                          <span>Sources ({msg.sources.length})</span>
                          {expandedSources[msg.id] ? (
                            <ChevronUp className="h-3 w-3" />
                          ) : (
                            <ChevronDown className="h-3 w-3" />
                          )}
                        </button>

                        {expandedSources[msg.id] && (
                          <ul className="mt-1.5 space-y-1 text-xs text-slate-400 pl-1">
                            {msg.sources.map((src, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-amber-500/70 select-none">•</span>
                                <span className="break-all">{src}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <span className="mt-1 px-1 text-[10px] text-slate-500 tabular-nums">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800 text-amber-400 text-xs">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="rounded-2xl rounded-tl-xs border border-slate-800 bg-slate-900 px-4 py-3 text-slate-400 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Questions */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 border-t border-slate-800/50 bg-[#090D14]/40">
              <p className="text-[11px] text-slate-400 mb-1.5">Suggested queries:</p>
              <div className="flex flex-col gap-1">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(q)}
                    disabled={isLoading}
                    className="text-left text-xs text-slate-300 hover:text-amber-300 hover:bg-slate-800/70 py-1 px-2 rounded transition-colors truncate"
                  >
                    → {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="border-t border-slate-800 bg-[#090D14] p-3 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Sruthi's background..."
              disabled={isLoading}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-slate-950 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-400 transition-colors shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
