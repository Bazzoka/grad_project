import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, X, Minimize2, Maximize2, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Hello! I\'m Dr. Bot, your medical assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Popup every 60 seconds if chat is closed
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isOpen) {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 5000);
      }
    }, 60000);

    const initialTimeout = setTimeout(() => {
      if (!isOpen) {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 5000);
      }
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { 
      role: 'user', 
      content: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const assistantMessage: Message = {
        role: 'assistant',
        content: isArabic 
          ? 'أنا هنا للمساعدة! يرجى العلم أن هذا روبوت توضيحي. للحصول على استشارة طبية حقيقية، يرجى حجز موعد مع أطبائنا المعتمدين.'
          : 'I\'m here to help! Please note this is a demo chatbot. For real medical consultation, please book an appointment with our verified doctors.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1500);
  };

  const openChat = () => {
    setIsOpen(true);
    setShowPopup(false);
  };

  const quickActions = [
    { label: isArabic ? "حجز موعد" : "Book Appointment", icon: "📅" },
    { label: isArabic ? "استشارة سريعة" : "Quick Consult", icon: "💬" },
    { label: isArabic ? "الصيدلية" : "Pharmacy", icon: "💊" },
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50" dir={isArabic ? 'rtl' : 'ltr'}>
        {/* Popup Message */}
        {showPopup && (
          <div className={`absolute bottom-20 ${isArabic ? 'left-0' : 'right-0'} mb-2 animate-fade-in`}>
            <Card className="p-4 bg-card shadow-2xl max-w-[280px] relative border-2 border-primary/20">
              <button 
                onClick={() => setShowPopup(false)}
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-card shadow-md flex items-center justify-center text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-2xl">👨‍⚕️</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground mb-1">
                    {isArabic ? "مرحباً! أنا د. بوت 👋" : "Hi! I'm Dr. Bot 👋"}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {isArabic 
                      ? "هل تحتاج مساعدة في حجز موعد أو استشارة طبية؟"
                      : "Need help booking an appointment or medical advice?"}
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-2 right-8 w-4 h-4 bg-card border-r-2 border-b-2 border-primary/20 transform rotate-45"></div>
            </Card>
          </div>
        )}

        {/* Doctor Avatar Button */}
        <button
          onClick={openChat}
          className="h-16 w-16 rounded-2xl shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 bg-gradient-to-br from-primary via-primary to-accent relative overflow-hidden group flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="text-3xl relative z-10">👨‍⚕️</span>
          {/* Pulse animation */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
          </span>
        </button>
      </div>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-6 z-50 flex flex-col shadow-2xl transition-all duration-300 overflow-hidden border-0 ${
      isMinimized ? 'h-[72px] w-[340px]' : 'h-[520px] w-[380px]'
    }`} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex items-center gap-3 bg-gradient-to-r from-primary via-primary to-accent p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iLjA1IiBjeD0iMjAiIGN5PSIyMCIgcj0iMyIvPjwvZz48L3N2Zz4=')] opacity-30"></div>
        <div className="relative">
          <div className="h-12 w-12 rounded-xl bg-white/90 flex items-center justify-center shadow-lg">
            <span className="text-2xl">👨‍⚕️</span>
          </div>
          <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white"></div>
        </div>
        <div className="flex-1 relative">
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            {isArabic ? 'د. بوت' : 'Dr. Bot'}
            <Sparkles className="h-4 w-4 text-yellow-300" />
          </h3>
          <p className="text-xs text-white/80 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
            {isArabic ? 'متصل الآن • يرد فوراً' : 'Online • Replies instantly'}
          </p>
        </div>
        <div className="flex gap-1 relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-9 w-9 text-white hover:bg-white/20 rounded-lg"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-9 w-9 text-white hover:bg-white/20 rounded-lg"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <ScrollArea className="flex-1 bg-gradient-to-b from-secondary/30 to-background" ref={scrollRef}>
            <div className="p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  {message.role === 'assistant' && (
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mr-2 flex-shrink-0 shadow-md">
                      <span className="text-sm">👨‍⚕️</span>
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    <div
                      className={`max-w-[240px] rounded-2xl px-4 py-3 shadow-sm ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-sm'
                          : 'bg-card text-card-foreground border border-border rounded-bl-sm'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    <span className={`text-[10px] text-muted-foreground ${message.role === 'user' ? 'text-right' : 'text-left ml-10'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mr-2 flex-shrink-0">
                    <span className="text-sm">👨‍⚕️</span>
                  </div>
                  <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Actions */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 border-t border-border bg-secondary/20">
              <p className="text-xs text-muted-foreground mb-2">
                {isArabic ? "اختر موضوع:" : "Quick actions:"}
              </p>
              <div className="flex gap-2 flex-wrap">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(action.label)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-medium text-foreground hover:bg-primary/10 hover:border-primary/30 transition-colors"
                  >
                    <span>{action.icon}</span>
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-border p-3 bg-card">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isArabic ? 'اكتب رسالتك...' : 'Type your message...'}
                className="flex-1 rounded-xl bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
              />
              <Button 
                onClick={handleSend} 
                size="icon" 
                className="rounded-xl h-10 w-10 bg-primary hover:bg-primary/90"
                disabled={!input.trim() || isTyping}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-2">
              {isArabic ? "مدعوم بالذكاء الاصطناعي • للاستشارات التوضيحية فقط" : "AI-powered • For demo purposes only"}
            </p>
          </div>
        </>
      )}
    </Card>
  );
};

export default AIChatbot;