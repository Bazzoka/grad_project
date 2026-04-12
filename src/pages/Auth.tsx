import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Stethoscope, Activity, HeartPulse } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocalAuth } from "@/contexts/LocalAuthContext";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const { signIn, signUp } = useLocalAuth();
  const isArabic = language === 'ar';

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn(email, password);

      if (!result.success) {
        throw new Error(result.error);
      }

      toast({
        title: isArabic ? "تم تسجيل الدخول بنجاح" : "Signed in successfully",
        description: isArabic ? "مرحباً بك مرة أخرى!" : "Welcome back!",
      });

      navigate("/");
    } catch (error: any) {
      toast({
        title: isArabic ? "خطأ في تسجيل الدخول" : "Sign in error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signUp(email, password, name, 'patient');

      if (!result.success) {
        throw new Error(result.error);
      }

      toast({
        title: isArabic ? "تم إنشاء الحساب بنجاح" : "Account created successfully",
        description: isArabic ? "مرحباً بك!" : "Welcome!",
      });

      navigate("/");
    } catch (error: any) {
      toast({
        title: isArabic ? "خطأ في إنشاء الحساب" : "Sign up error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated medical icons background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Heart className="absolute top-20 left-10 h-12 w-12 text-primary/20 animate-pulse" />
        <Stethoscope className="absolute top-40 right-20 h-16 w-16 text-accent/20 animate-bounce" style={{ animationDuration: '3s' }} />
        <Activity className="absolute bottom-20 left-20 h-14 w-14 text-primary/20 animate-pulse" style={{ animationDelay: '1s' }} />
        <HeartPulse className="absolute bottom-40 right-40 h-10 w-10 text-accent/20 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
        <Heart className="absolute top-1/2 left-1/4 h-8 w-8 text-primary/10 animate-pulse" style={{ animationDelay: '2s' }} />
        <Stethoscope className="absolute top-1/3 right-1/3 h-10 w-10 text-accent/10 animate-bounce" style={{ animationDuration: '4s' }} />
      </div>

      <Card className="w-full max-w-md p-8 backdrop-blur-sm bg-card/95 shadow-2xl border-2 border-primary/20 relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent mb-4 animate-pulse">
            <Heart className="h-8 w-8 text-white" fill="currentColor" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            MEDLINK
          </h1>
          <p className="text-muted-foreground mt-2">
            {isArabic ? "منصتك الطبية الموثوقة" : "Your Trusted Healthcare Platform"}
          </p>
        </div>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">
              {isArabic ? "تسجيل الدخول" : "Sign In"}
            </TabsTrigger>
            <TabsTrigger value="signup">
              {isArabic ? "إنشاء حساب" : "Sign Up"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {isArabic ? "البريد الإلكتروني" : "Email"}
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isArabic ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {isArabic ? "كلمة المرور" : "Password"}
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isArabic ? "أدخل كلمة المرور" : "Enter your password"}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (isArabic ? "جاري التحميل..." : "Loading...") : (isArabic ? "تسجيل الدخول" : "Sign In")}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                {isArabic ? "حساب تجريبي: patient@demo.com / demo123" : "Demo account: patient@demo.com / demo123"}
              </p>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {isArabic ? "الاسم الكامل" : "Full Name"}
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isArabic ? "أدخل اسمك الكامل" : "Enter your full name"}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {isArabic ? "البريد الإلكتروني" : "Email"}
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isArabic ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {isArabic ? "كلمة المرور" : "Password"}
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isArabic ? "أدخل كلمة المرور" : "Enter your password"}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (isArabic ? "جاري التحميل..." : "Loading...") : (isArabic ? "إنشاء حساب" : "Sign Up")}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <Button
            variant="link"
            onClick={() => navigate("/")}
            className="text-primary hover:text-primary/80"
          >
            {isArabic ? "العودة للصفحة الرئيسية" : "Back to Home"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
