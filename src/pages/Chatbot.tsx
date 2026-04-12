import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles, Bot, Calendar, Pill, Stethoscope } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const Chatbot = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: isArabic 
        ? 'مرحباً! أنا د. بوت، مساعدك الطبي الذكي. كيف يمكنني مساعدتك اليوم؟'
        : 'Hello! I\'m Dr. Bot, your AI medical assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const responses: { [key: string]: { en: string; ar: string } } = {
    appointment: {
      en: "To book an appointment, please visit our Find Doctors page and select a doctor that matches your needs. You can then choose an available time slot.",
      ar: "لحجز موعد، يرجى زيارة صفحة البحث عن الأطباء واختيار طبيب يناسب احتياجاتك. يمكنك بعد ذلك اختيار موعد متاح."
    },
    pharmacy: {
      en: "Our pharmacy offers a wide range of medicines. If you have a prescription code from your doctor, you can use it to get your medicines directly. Visit the Pharmacy page to browse our products.",
      ar: "صيدليتنا تقدم مجموعة واسعة من الأدوية. إذا كان لديك رمز وصفة طبية من طبيبك، يمكنك استخدامه للحصول على أدويتك مباشرة. قم بزيارة صفحة الصيدلية لتصفح منتجاتنا."
    },
    teleconsultation: {
      en: "Teleconsultation allows you to consult with doctors remotely via video call, voice call, or chat. It's convenient and saves time. Visit our Teleconsultation page to learn more.",
      ar: "الاستشارة عن بُعد تتيح لك التشاور مع الأطباء عن طريق مكالمة فيديو أو صوتية أو دردشة. إنها مريحة وتوفر الوقت. قم بزيارة صفحة الاستشارات عن بُعد لمعرفة المزيد."
    },
    symptoms: {
      en: "While I can provide general health information, I recommend consulting with a qualified doctor for proper diagnosis. Would you like me to help you find a specialist?",
      ar: "بينما يمكنني تقديم معلومات صحية عامة، أنصح بالتشاور مع طبيب مؤهل للتشخيص الصحيح. هل تريدني مساعدتك في إيجاد أخصائي؟"
    },
    default: {
      en: "I'm here to help! I can assist you with booking appointments, finding doctors, pharmacy information, and general health questions. What would you like to know?",
      ar: "أنا هنا للمساعدة! يمكنني مساعدتك في حجز المواعيد، إيجاد الأطباء، معلومات الصيدلية، والأسئلة الصحية العامة. ماذا تود أن تعرف؟"
    }
  };

  const getResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('appointment') || input.includes('book') || input.includes('موعد') || input.includes('حجز')) {
      return isArabic ? responses.appointment.ar : responses.appointment.en;
    }
    if (input.includes('pharmacy') || input.includes('medicine') || input.includes('صيدلية') || input.includes('دواء')) {
      return isArabic ? responses.pharmacy.ar : responses.pharmacy.en;
    }
    if (input.includes('teleconsult') || input.includes('video') || input.includes('online') || input.includes('استشارة') || input.includes('فيديو')) {
      return isArabic ? responses.teleconsultation.ar : responses.teleconsultation.en;
    }
    if (input.includes('symptom') || input.includes('pain') || input.includes('sick') || input.includes('أعراض') || input.includes('ألم') || input.includes('مريض')) {
      return isArabic ? responses.symptoms.ar : responses.symptoms.en;
    }
    
    return isArabic ? responses.default.ar : responses.default.en;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { 
      role: 'user', 
      content: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const assistantMessage: Message = {
        role: 'assistant',
        content: getResponse(userInput),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const quickActions = [
    { label: isArabic ? "حجز موعد" : "Book Appointment", icon: Calendar, query: isArabic ? "كيف أحجز موعد؟" : "How do I book an appointment?" },
    { label: isArabic ? "الصيدلية" : "Pharmacy", icon: Pill, query: isArabic ? "معلومات عن الصيدلية" : "Tell me about pharmacy" },
    { label: isArabic ? "استشارة عن بُعد" : "Teleconsultation", icon: Stethoscope, query: isArabic ? "ما هي الاستشارة عن بُعد؟" : "What is teleconsultation?" },
  ];

  return (
    <div className="min-h-screen bg-background" dir={isArabic ? 'rtl' : 'ltr'}>
      <Navbar />
      
      <main className="container py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-4xl">👨‍⚕️</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {isArabic ? "د. بوت - المساعد الطبي الذكي" : "Dr. Bot - AI Medical Assistant"}
          </h1>
          <p className="text-muted-foreground">
            {isArabic 
              ? "احصل على إجابات فورية لأسئلتك الصحية ومساعدة في التنقل في خدماتنا"
              : "Get instant answers to your health questions and help navigating our services"}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Chat Container */}
          <Card className="overflow-hidden border-2">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-primary to-accent p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-bold flex items-center gap-2">
                    {isArabic ? "د. بوت" : "Dr. Bot"}
                    <Sparkles className="h-4 w-4 text-yellow-300" />
                  </h2>
                  <p className="text-sm text-white/80 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                    {isArabic ? "متصل الآن" : "Online"}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="h-[400px] bg-secondary/20" ref={scrollRef}>
              <div className="p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mr-2 flex-shrink-0">
                        <span className="text-sm">👨‍⚕️</span>
                      </div>
                    )}
                    <div className="flex flex-col gap-1">
                      <div
                        className={`max-w-[300px] rounded-2xl px-4 py-3 ${
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
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mr-2 flex-shrink-0">
                      <span className="text-sm">👨‍⚕️</span>
                    </div>
                    <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3">
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
            <div className="px-4 py-3 border-t border-border bg-secondary/10">
              <p className="text-xs text-muted-foreground mb-2">
                {isArabic ? "اختر موضوع:" : "Quick actions:"}
              </p>
              <div className="flex gap-2 flex-wrap">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => setInput(action.query)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-medium text-foreground hover:bg-primary/10 hover:border-primary/30 transition-colors"
                    >
                      <Icon className="h-3 w-3" />
                      {action.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-border p-4 bg-card">
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
                  className="rounded-xl h-10 w-10"
                  disabled={!input.trim() || isTyping}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground text-center mt-2">
                {isArabic ? "للاستشارات العامة فقط • استشر طبيباً للتشخيص" : "For general guidance only • Consult a doctor for diagnosis"}
              </p>
            </div>
          </Card>

          {/* Navigation Cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <Link to="/doctors">
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Stethoscope className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{isArabic ? "ابحث عن طبيب" : "Find a Doctor"}</h3>
                    <p className="text-xs text-muted-foreground">{isArabic ? "احجز موعداً الآن" : "Book an appointment"}</p>
                  </div>
                </div>
              </Card>
            </Link>
            <Link to="/pharmacy">
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                    <Pill className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{isArabic ? "الصيدلية" : "Pharmacy"}</h3>
                    <p className="text-xs text-muted-foreground">{isArabic ? "اطلب أدويتك" : "Order medicines"}</p>
                  </div>
                </div>
              </Card>
            </Link>
            <Link to="/teleconsultation">
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Calendar className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{isArabic ? "استشارة عن بُعد" : "Teleconsultation"}</h3>
                    <p className="text-xs text-muted-foreground">{isArabic ? "استشر طبيباً عبر الإنترنت" : "Consult online"}</p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Chatbot;
