import React, { useState, useRef, useEffect } from 'react';
import { playClickSound, playHoverTick } from './AudioEngine';
import { ChatMessage } from '../types';
import { Terminal, Send, X, CornerDownLeft, Sparkles, Files, Check } from 'lucide-react';

interface AIPromptTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuestion?: string;
}

export const AIPromptTerminal: React.FC<AIPromptTerminalProps> = ({
  isOpen,
  onClose,
  initialQuestion = ''
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Suggestions that users can click to immediately trigger a response
  const suggestions = [
    "What is your core design philosophy?",
    "Explain ARCHITECTURAL.LOGIC projects & stack",
    "Suggest a robust engineering stack for low latency",
    "Explain the 'disappearing interface' concept"
  ];

  // Set default intro message on mount
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'core',
          text: "SYSTEM.CORE // COGNITIVE CORE DEPLOYED.\n\nType your query below or choose a system suggestion to verify my engineering logic, stack, or design architecture.",
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    }
  }, []);

  // Handle initial active questions passed from parent component (e.g. from journal cards)
  useEffect(() => {
    if (isOpen && initialQuestion) {
      handleSend(initialQuestion);
    }
  }, [isOpen, initialQuestion]);

  // Scroll to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const visitorMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'visitor',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, visitorMessage]);
    setInput('');
    setIsLoading(true);
    playClickSound();

    try {
      // Package full conversation history
      const history = [...messages, visitorMessage];
      const response = await fetch('/api/portfolio-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: history })
      });

      if (!response.ok) {
        throw new Error("Failed core handshakes.");
      }

      const data = await response.json();
      
      const coreMessage: ChatMessage = {
        id: `msg-${Date.now()}-core`,
        sender: 'core',
        text: data.text || "SYSTEM.CORE.ERROR: Response packet returned blank.",
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, coreMessage]);
      playClickSound();
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now()}-error`,
          sender: 'core',
          text: "SYSTEM.CORE.INTERRUPT: Communication loop failed. Verify that GEMINI_API_KEY is configured in your Secrets dashboard.",
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    playClickSound();
    setTimeout(() => setCopiedId(null), 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex justify-end">
      {/* Slab Terminal Sidebar container */}
      <div className="w-full max-w-2xl bg-[#131313] text-white border-l border-white h-full flex flex-col pt-8 relative animate-in slide-in-from-right duration-200">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-8 pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-white" />
            <span className="font-mono text-xs tracking-wider text-zinc-400">CORE.AGENT_V1.0 // ONLINE</span>
          </div>
          <button 
            onClick={() => { playClickSound(); onClose(); }}
            className="text-zinc-400 hover:text-white p-1 hover:bg-zinc-800 transition-none"
            title="Disconnect terminal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Message Feeds */}
        <div className="flex-grow overflow-y-auto p-8 space-y-6 font-mono text-xs scrollbar-thin">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`p-4 border ${
                msg.sender === 'visitor' 
                  ? 'bg-zinc-900 border-zinc-800 text-end ml-12' 
                  : 'bg-zinc-950 border-zinc-800 text-start mr-12'
              }`}
            >
              <div className="flex justify-between items-center text-[10px] text-zinc-500 mb-2 font-mono">
                <span>{msg.sender === 'visitor' ? 'VISITOR.CLIENT' : 'SYSTEM.CORE_OUTPUT'}</span>
                <div className="flex items-center gap-2">
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'core' && (
                    <button 
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="text-zinc-600 hover:text-white pointer-events-auto"
                      title="Copy outputs"
                    >
                      {copiedId === msg.id ? <Check className="h-3. w-3 text-emerald-400" /> : <Files className="h-3 w-3" />}
                    </button>
                  )}
                </div>
              </div>
              <p className="whitespace-pre-wrap leading-relaxed select-text text-zinc-200 text-left">
                {msg.text}
              </p>
            </div>
          ))}

          {isLoading && (
            <div className="bg-zinc-950 border border-zinc-800 p-4 mr-12 text-start">
              <div className="font-mono text-[10px] text-zinc-500 mb-2">SYSTEM.CORE // REASONING...</div>
              <div className="flex items-center gap-1.5 text-zinc-400">
                <Sparkles className="animate-spin h-3.5 w-3.5 text-white" />
                <span>compiling cognitive nodes<span className="animate-pulse">_</span></span>
              </div>
            </div>
          )}
          <div ref={terminalEndRef} />
        </div>

        {/* System suggestions block */}
        <div className="px-8 py-3 bg-[#171717] border-t border-zinc-800">
          <p className="font-mono text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">Suggested systemic queries:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((sug, i) => (
              <button
                key={i}
                onClick={() => handleSend(sug)}
                onMouseEnter={playHoverTick}
                className="font-mono text-[10px] bg-zinc-900 hover:bg-white hover:text-black border border-zinc-700 text-zinc-300 px-3 py-1.5 transition-none duration-0 text-left"
              >
                {sug}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form Terminal Bottom */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          className="border-t border-white flex bg-black p-4"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Awaiting programmatic commands..."
            className="flex-grow bg-transparent text-white font-mono text-xs border-none outline-none focus:ring-0 px-4 focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            onMouseEnter={playHoverTick}
            disabled={isLoading || !input.trim()}
            className="bg-white text-black px-6 py-2 flex items-center gap-1 font-mono text-xs hover:bg-zinc-300 disabled:opacity-50 transition-none"
          >
            <Send className="h-3 w-3" />
            <CornerDownLeft className="h-3 w-3" />
          </button>
        </form>
      </div>
    </div>
  );
};
