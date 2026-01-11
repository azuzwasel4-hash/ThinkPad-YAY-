
import React, { useState, useRef, useEffect } from 'react';
import { getThinkBotResponse } from '../services/gemini';
import { ChatMessage } from '../types';
import { useTranslation } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const ChatAssistant: React.FC = () => {
  const { t, language } = useTranslation();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isLightTheme = theme === 'orange' || theme === 'yellow';

  // Initialize greeting
  useEffect(() => {
    setMessages([{ 
      role: 'assistant', 
      content: t('bot_greeting') 
    }]);
  }, [language, t]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (textOverride?: string) => {
    const messageToSend = textOverride || input;
    if (!messageToSend.trim() || isLoading) return;

    const userMsg = messageToSend;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const response = await getThinkBotResponse(userMsg, messages, language);
    setMessages(prev => [...prev, { role: 'assistant', content: response || 'Error reaching ThinkBot.' }]);
    setIsLoading(false);
  };

  return (
    <div className={`fixed bottom-6 ${language === 'ar' ? 'left-6' : 'right-6'} z-[60]`}>
      {isOpen ? (
        <div className={`w-80 md:w-96 h-[550px] shadow-2xl rounded-xl flex flex-col border overflow-hidden animate-in slide-in-from-bottom-2 duration-300 ${isLightTheme ? 'bg-white border-gray-200' : 'bg-[#111] border-gray-800'}`}>
          <div 
            className={`p-4 flex justify-between items-center border-b-2 transition-colors duration-300 ${isLightTheme ? 'bg-gray-50 text-gray-900' : 'bg-black text-white'}`}
            style={{ borderBottomColor: 'var(--accent)' }}
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-2.5 h-2.5 rounded-full animate-pulse transition-all duration-300"
                style={{ 
                  backgroundColor: 'var(--accent)',
                  boxShadow: `0 0 8px var(--accent)`
                }}
              ></div>
              <span className="font-bold text-sm tracking-wider uppercase font-mono">ThinkBot v2.5</span>
            </div>
            <button onClick={() => setIsOpen(false)} className={`${isLightTheme ? 'text-gray-400 hover:text-black' : 'text-gray-400 hover:text-white'} transition-colors`}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div ref={scrollRef} className={`flex-1 overflow-y-auto p-4 space-y-4 text-sm scroll-smooth transition-colors duration-300 ${isLightTheme ? 'bg-white' : 'bg-gray-900/50'}`}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-3 rounded-xl transition-all duration-300 ${
                  m.role === 'user' 
                    ? (isLightTheme ? 'bg-gray-800 text-white' : 'bg-black text-white') + ' rounded-tr-none shadow-md'
                    : (isLightTheme ? 'bg-gray-100 border-gray-200 text-gray-800' : 'bg-[#1a1a1a] border-gray-800 text-gray-300') + ' border rounded-tl-none shadow-sm'
                }`}>
                  <div 
                    className={`prose prose-sm break-words ${m.role === 'user' ? 'prose-invert' : (isLightTheme ? 'prose-slate' : 'prose-invert')}`} 
                    dangerouslySetInnerHTML={{ 
                      __html: m.content
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n/g, '<br/>') 
                    }} 
                  />
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className={`border p-3 rounded-lg flex gap-1.5 items-center ${isLightTheme ? 'bg-gray-50 border-gray-200' : 'bg-[#1a1a1a] border-gray-800'}`}>
                  <div className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.3s]" style={{ backgroundColor: 'var(--accent)' }}></div>
                  <div className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.15s]" style={{ backgroundColor: 'var(--accent)' }}></div>
                  <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: 'var(--accent)' }}></div>
                </div>
              </div>
            )}
          </div>

          <div className={`p-3 border-t transition-colors duration-300 ${isLightTheme ? 'bg-gray-50 border-gray-200' : 'bg-[#111] border-gray-800'}`}>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('search_placeholder')}
                className={`flex-1 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-1 transition-all ${
                  isLightTheme 
                  ? 'bg-white border border-gray-300 text-gray-900 focus:ring-gray-400' 
                  : 'bg-black border border-gray-800 text-white focus:ring-gray-700'
                }`}
              />
              <button 
                onClick={() => handleSend()}
                disabled={isLoading}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition-all disabled:opacity-50 active:scale-95 shadow-lg"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                <i className={`fas ${isLoading ? 'fa-spinner fa-spin' : (language === 'ar' ? 'fa-paper-plane fa-flip-horizontal' : 'fa-paper-plane')}`}></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className={`w-16 h-16 rounded-full shadow-2xl flex flex-col items-center justify-center hover:scale-105 transition-all border-2 group ${isLightTheme ? 'bg-white border-gray-200' : 'bg-black border-white/20'}`}
        >
          <div className="relative">
            <i className={`fas fa-robot text-xl transition-colors group-hover:thinkpad-red ${isLightTheme ? 'text-gray-900' : 'text-white'}`} style={{ color: isOpen ? 'var(--accent)' : '' }}></i>
            <div 
              className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 animate-pulse" 
              style={{ 
                backgroundColor: 'var(--accent)', 
                borderColor: isLightTheme ? 'white' : 'black' 
              }}
            ></div>
          </div>
          <span className={`text-[8px] font-bold mt-1 tracking-widest uppercase ${isLightTheme ? 'text-gray-500' : 'text-gray-400'}`}>AI BOT</span>
        </button>
      )}
    </div>
  );
};

export default ChatAssistant;
