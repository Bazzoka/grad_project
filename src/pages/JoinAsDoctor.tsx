import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Stethoscope, Users, Calendar, TrendingUp, 
  Shield, Clock, Send, Award
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { useLocalAuth } from "@/contexts/LocalAuthContext";

const JoinAsDoctor = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const navigate = useNavigate();
  const { signUp } = useLocalAuth();
  
  const [formData, setFormData] = useState({
    fullName: "",
    specialty: "",
    email: "",
    password: "",
    phone: "",
    experience: "",
    city: "",
    bio: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "يجب الموافقة على الشروط والأحكام" : "You must agree to the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "كلمة المرور يجب أن تكون 6 أحرف على الأقل" : "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await signUp(
        formData.email,
        formData.password,
        formData.fullName,
        'doctor',
        {
          specialty: formData.specialty,
          phone: formData.phone,
          experience: formData.experience,
          city: formData.city,
          bio: formData.bio
        }
      );

      if (!result.success) {
        throw new Error(result.error);
      }

      toast({
        title: isArabic ? "تم إنشاء الحساب بنجاح!" : "Account Created Successfully!",
        description: isArabic 
          ? "مرحباً بك في ميدلينك. يمكنك الآن الوصول للوحة التحكم"
          : "Welcome to MEDLINK. You can now access your dashboard",
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: isArabic ? "خطأ في إنشاء الحساب" : "Account Creation Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Users,
      title: isArabic ? "وصول لآلاف المرضى" : "Reach Thousands of Patients",
      description: isArabic 
        ? "انضم لشبكتنا الواسعة واحصل على مرضى جدد يومياً"
        : "Join our extensive network and get new patients daily"
    },
    {
      icon: Calendar,
      title: isArabic ? "إدارة سهلة للمواعيد" : "Easy Appointment Management",
      description: isArabic
        ? "نظام ذكي لإدارة جدولك ومواعيدك بكفاءة"
        : "Smart system to manage your schedule and appointments efficiently"
    },
    {
      icon: TrendingUp,
      title: isArabic ? "زيادة دخلك" : "Increase Your Income",
      description: isArabic
        ? "حقق دخل إضافي من خلال الاستشارات عبر الإنترنت"
        : "Earn additional income through online consultations"
    },
    {
      icon: Shield,
      title: isArabic ? "حماية وأمان" : "Protection & Security",
      description: isArabic
        ? "بيانات مرضاك محمية بأعلى معايير الأمان"
        : "Your patients' data is protected with highest security standards"
    },
    {
      icon: Clock,
      title: isArabic ? "مرونة في العمل" : "Work Flexibility",
      description: isArabic
        ? "اختر ساعات عملك ونوع الاستشارات التي تقدمها"
        : "Choose your working hours and types of consultations you offer"
    },
    {
      icon: Award,
      title: isArabic ? "سمعة مهنية" : "Professional Reputation",
      description: isArabic
        ? "ابنِ سمعتك من خلال تقييمات المرضى الإيجابية"
        : "Build your reputation through positive patient reviews"
    },
  ];

  const stats = [
    { value: "10,000+", label: isArabic ? "مريض نشط" : "Active Patients" },
    { value: "500+", label: isArabic ? "طبيب شريك" : "Partner Doctors" },
    { value: "98%", label: isArabic ? "رضا المرضى" : "Patient Satisfaction" },
    { value: "24/7", label: isArabic ? "دعم فني" : "Technical Support" },
  ];

  return (
    <div className="min-h-screen bg-background" dir={isArabic ? 'rtl' : 'ltr'}>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary/90 to-accent py-20 text-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center">
                  <Stethoscope className="h-10 w-10" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {isArabic ? "انضم كطبيب في ميدلينك" : "Join MEDLINK as a Doctor"}
              </h1>
              <p className="text-xl text-white/90 leading-relaxed mb-8">
                {isArabic 
                  ? "انضم لمجتمع الأطباء المتميزين وساعد آلاف المرضى في الحصول على الرعاية الصحية التي يستحقونها"
                  : "Join our community of distinguished doctors and help thousands of patients get the healthcare they deserve"}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  <a href="#apply">{isArabic ? "سجل الآن" : "Register Now"}</a>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link to="/benefits">{isArabic ? "تعرف على المزايا" : "View Benefits"}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-secondary/30">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</h3>
                  <p className="text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {isArabic ? "لماذا تنضم إلينا؟" : "Why Join Us?"}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {isArabic
                  ? "نوفر لك كل ما تحتاجه لتقديم أفضل رعاية لمرضاك"
                  : "We provide everything you need to offer the best care to your patients"}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <section id="apply" className="py-20 bg-secondary/30">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {isArabic ? "سجل كطبيب" : "Register as a Doctor"}
                </h2>
                <p className="text-muted-foreground">
                  {isArabic
                    ? "أنشئ حسابك وابدأ في استقبال المرضى فوراً"
                    : "Create your account and start receiving patients immediately"}
                </p>
              </div>

              <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        {isArabic ? "الاسم الكامل" : "Full Name"} *
                      </label>
                      <Input 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required 
                        placeholder={isArabic ? "د. أحمد محمد" : "Dr. John Doe"} 
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        {isArabic ? "التخصص" : "Specialty"} *
                      </label>
                      <Input 
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleInputChange}
                        required 
                        placeholder={isArabic ? "طب القلب" : "Cardiology"} 
                      />
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        {isArabic ? "البريد الإلكتروني" : "Email"} *
                      </label>
                      <Input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                        placeholder="doctor@example.com" 
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        {isArabic ? "كلمة المرور" : "Password"} *
                      </label>
                      <Input 
                        type="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required 
                        placeholder={isArabic ? "أدخل كلمة مرور قوية" : "Enter a strong password"}
                        minLength={6}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        {isArabic ? "رقم الهاتف" : "Phone Number"} *
                      </label>
                      <Input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required 
                        placeholder="+20 123 456 7890" 
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        {isArabic ? "سنوات الخبرة" : "Years of Experience"} *
                      </label>
                      <Input 
                        type="number" 
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        required 
                        min="0" 
                        placeholder="10" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {isArabic ? "المدينة" : "City"} *
                    </label>
                    <Input 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required 
                      placeholder={isArabic ? "القاهرة" : "Cairo"} 
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {isArabic ? "نبذة عنك" : "About You"}
                    </label>
                    <Textarea 
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder={isArabic 
                        ? "أخبرنا عن خبراتك ومؤهلاتك..." 
                        : "Tell us about your experience and qualifications..."}
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input 
                      type="checkbox" 
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-1" 
                    />
                    <label className="text-sm text-muted-foreground">
                      {isArabic 
                        ? "أوافق على شروط الخدمة وسياسة الخصوصية"
                        : "I agree to the Terms of Service and Privacy Policy"}
                    </label>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    <Send className="h-4 w-4 mr-2" />
                    {isSubmitting 
                      ? (isArabic ? "جاري إنشاء الحساب..." : "Creating Account...") 
                      : (isArabic ? "إنشاء حساب الطبيب" : "Create Doctor Account")}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>

        {/* Already have account */}
        <section className="py-12 bg-gradient-to-r from-primary to-accent">
          <div className="container text-center">
            <h3 className="text-xl font-semibold text-white mb-4">
              {isArabic ? "لديك حساب بالفعل؟" : "Already have an account?"}
            </h3>
            <Button asChild className="bg-white text-primary hover:bg-white/90">
              <Link to="/auth">{isArabic ? "تسجيل الدخول" : "Login"}</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default JoinAsDoctor;
