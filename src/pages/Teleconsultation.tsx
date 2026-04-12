import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Video, Phone, MessageSquare, Shield, Clock, 
  CheckCircle, Stethoscope, Heart, Calendar
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Teleconsultation = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const features = [
    {
      icon: Video,
      title: isArabic ? "استشارة فيديو" : "Video Consultation",
      description: isArabic 
        ? "تحدث مع طبيبك وجهاً لوجه من خلال مكالمات الفيديو عالية الجودة"
        : "Talk to your doctor face-to-face through high-quality video calls"
    },
    {
      icon: Phone,
      title: isArabic ? "مكالمات صوتية" : "Voice Calls",
      description: isArabic
        ? "احصل على استشارة طبية عبر الهاتف في أي وقت"
        : "Get medical consultation over the phone anytime"
    },
    {
      icon: MessageSquare,
      title: isArabic ? "رسائل فورية" : "Instant Messaging",
      description: isArabic
        ? "تواصل مع طبيبك عبر الرسائل النصية للمتابعة"
        : "Communicate with your doctor via text messages for follow-ups"
    },
    {
      icon: Shield,
      title: isArabic ? "خصوصية تامة" : "Complete Privacy",
      description: isArabic
        ? "جميع المحادثات مشفرة وآمنة بالكامل"
        : "All conversations are fully encrypted and secure"
    },
  ];

  const benefits = [
    isArabic ? "لا حاجة للانتظار في العيادة" : "No need to wait in the clinic",
    isArabic ? "استشارة من راحة منزلك" : "Consult from the comfort of your home",
    isArabic ? "توفير الوقت والمال" : "Save time and money",
    isArabic ? "متابعة سهلة للعلاج" : "Easy treatment follow-ups",
    isArabic ? "الوصول لأفضل الأطباء" : "Access to the best doctors",
    isArabic ? "سجل طبي إلكتروني" : "Electronic medical records",
  ];

  const steps = [
    {
      number: "1",
      title: isArabic ? "اختر طبيبك" : "Choose Your Doctor",
      description: isArabic 
        ? "ابحث عن الطبيب المناسب حسب التخصص والتقييم"
        : "Find the right doctor by specialty and rating"
    },
    {
      number: "2",
      title: isArabic ? "احجز موعدك" : "Book Your Appointment",
      description: isArabic 
        ? "اختر الوقت المناسب لك من المواعيد المتاحة"
        : "Choose a convenient time from available slots"
    },
    {
      number: "3",
      title: isArabic ? "ابدأ الاستشارة" : "Start Consultation",
      description: isArabic 
        ? "انضم للمكالمة في الموعد المحدد"
        : "Join the call at the scheduled time"
    },
    {
      number: "4",
      title: isArabic ? "احصل على الوصفة" : "Get Your Prescription",
      description: isArabic 
        ? "استلم وصفتك الطبية إلكترونياً"
        : "Receive your prescription electronically"
    },
  ];

  return (
    <div className="min-h-screen bg-background" dir={isArabic ? 'rtl' : 'ltr'}>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary/90 to-accent py-20 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
          
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                  <Video className="h-10 w-10" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {isArabic ? "استشارات طبية عن بُعد" : "Teleconsultation Services"}
              </h1>
              <p className="text-xl text-white/90 leading-relaxed mb-8">
                {isArabic 
                  ? "احصل على استشارة طبية من أفضل الأطباء دون مغادرة منزلك"
                  : "Get medical consultation from the best doctors without leaving your home"}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                  <Link to="/doctors">{isArabic ? "ابحث عن طبيب" : "Find a Doctor"}</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link to="/auth">{isArabic ? "سجل الآن" : "Sign Up Now"}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {isArabic ? "خدماتنا" : "Our Services"}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {isArabic
                  ? "نوفر لك طرق متعددة للتواصل مع طبيبك"
                  : "We provide multiple ways to communicate with your doctor"}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {isArabic ? "كيف يعمل؟" : "How It Works"}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div key={index} className="text-center relative">
                  <div className="h-16 w-16 rounded-full bg-primary text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-primary/20"></div>
                  )}
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  {isArabic ? "مزايا الاستشارات عن بُعد" : "Benefits of Teleconsultation"}
                </h2>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
                <Button size="lg" className="mt-8" asChild>
                  <Link to="/doctors">
                    <Calendar className="h-5 w-5 mr-2" />
                    {isArabic ? "احجز استشارتك الآن" : "Book Your Consultation Now"}
                  </Link>
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6 text-center bg-primary/5">
                  <Stethoscope className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-primary">500+</h3>
                  <p className="text-muted-foreground text-sm">
                    {isArabic ? "طبيب متاح" : "Available Doctors"}
                  </p>
                </Card>
                <Card className="p-6 text-center bg-accent/5">
                  <Heart className="h-10 w-10 text-accent mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-accent">50K+</h3>
                  <p className="text-muted-foreground text-sm">
                    {isArabic ? "استشارة ناجحة" : "Successful Consultations"}
                  </p>
                </Card>
                <Card className="p-6 text-center bg-accent/5">
                  <Clock className="h-10 w-10 text-accent mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-accent">24/7</h3>
                  <p className="text-muted-foreground text-sm">
                    {isArabic ? "متاح دائماً" : "Always Available"}
                  </p>
                </Card>
                <Card className="p-6 text-center bg-primary/5">
                  <Shield className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-primary">100%</h3>
                  <p className="text-muted-foreground text-sm">
                    {isArabic ? "آمن ومشفر" : "Secure & Encrypted"}
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-primary to-accent">
          <div className="container text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {isArabic ? "ابدأ استشارتك الآن" : "Start Your Consultation Now"}
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              {isArabic 
                ? "لا تنتظر، احصل على الرعاية الصحية التي تستحقها من منزلك"
                : "Don't wait, get the healthcare you deserve from your home"}
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link to="/doctors">{isArabic ? "ابحث عن طبيب" : "Find a Doctor"}</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Teleconsultation;