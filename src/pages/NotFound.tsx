import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Pill, Stethoscope, Activity } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FallingItem {
  id: number;
  icon: typeof Heart;
  left: number;
  delay: number;
  duration: number;
}

const NotFound = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [score, setScore] = useState(0);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [gameActive, setGameActive] = useState(false);

  const icons = [Heart, Pill, Stethoscope, Activity];

  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      const newItem: FallingItem = {
        id: Date.now(),
        icon: icons[Math.floor(Math.random() * icons.length)],
        left: Math.random() * 90,
        delay: 0,
        duration: 3 + Math.random() * 2,
      };
      setItems(prev => [...prev, newItem]);
    }, 800);

    return () => clearInterval(interval);
  }, [gameActive]);

  useEffect(() => {
    if (!gameActive) return;

    const timeout = setTimeout(() => {
      setItems(prev => prev.slice(1));
    }, 5000);

    return () => clearTimeout(timeout);
  }, [items, gameActive]);

  const handleCatch = (id: number) => {
    setScore(prev => prev + 10);
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center relative overflow-hidden">
      {/* Falling items */}
      {gameActive && items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="absolute cursor-pointer animate-fall"
            style={{
              left: `${item.left}%`,
              top: '-60px',
              animationDuration: `${item.duration}s`,
              animationDelay: `${item.delay}s`,
            }}
            onClick={() => handleCatch(item.id)}
          >
            <Icon className="h-12 w-12 text-primary hover:text-accent transition-colors" />
          </div>
        );
      })}

      <div className="text-center z-10 p-8 bg-card/80 backdrop-blur-sm rounded-3xl shadow-2xl max-w-2xl mx-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4 animate-pulse">
            404
          </h1>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {isArabic ? "عذراً! الصفحة غير موجودة" : "Oops! Page Not Found"}
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            {isArabic 
              ? "يبدو أن هذه الصفحة اختفت مثل الألم بعد تناول الدواء!"
              : "Looks like this page disappeared like pain after medicine!"}
          </p>
        </div>

        {gameActive && (
          <div className="mb-6 p-4 bg-gradient-to-r from-primary to-accent rounded-xl">
            <p className="text-2xl font-bold text-white">
              {isArabic ? "النقاط" : "Score"}: {score}
            </p>
            <p className="text-sm text-white/80">
              {isArabic ? "اضغط على الأيقونات الساقطة!" : "Click the falling items!"}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="gap-2"
          >
            <Heart className="h-5 w-5" />
            {isArabic ? "العودة للصفحة الرئيسية" : "Back to Home"}
          </Button>
          
          <Button
            onClick={() => {
              setGameActive(!gameActive);
              if (gameActive) {
                setScore(0);
                setItems([]);
              }
            }}
            size="lg"
            variant="outline"
            className="gap-2"
          >
            <Activity className="h-5 w-5" />
            {gameActive 
              ? (isArabic ? "إيقاف اللعبة" : "Stop Game")
              : (isArabic ? "ابدأ اللعب!" : "Play Game!")}
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes fall {
          from {
            transform: translateY(0) rotate(0deg);
          }
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        .animate-fall {
          animation: fall linear forwards;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
