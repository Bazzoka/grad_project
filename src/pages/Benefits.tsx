import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Wallet, Users, Calendar, BarChart3, 
  Shield, Clock, MessageSquare, Award,
  Globe, Zap, HeartPulse, CheckCircle
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Benefits = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const mainBenefits = [
    {
      icon: Wallet,
      title: isArabic ? "دخل إضافي مضمون" : "Guaranteed Additional Income",
      description: isArabic
        ? "احصل على دخل إضافي من خلال الاستشارات عبر الإنترنت والحجوزات المباشرة. نظام دفع آمن وسحب سريع."
        : "Earn additional income through online consultations and direct bookings. Secure payment system with fast withdrawals.",
      highlight: isArabic ? "متوسط الدخل: 5000+ جنيه/شهر" : "Average income: $500+/month"
    },
    {
      icon: Users,
      title: isArabic ? "قاعدة مرضى واسعة" : "Large Patient Base",
      description: isArabic
        ? "الوصول إلى آلاف المرضى الباحثين عن أطباء متخصصين في منطقتك. مرضى جدد كل يوم."
        : "Access thousands of patients looking for specialized doctors in your area. New patients every day.",
      highlight: isArabic ? "10,000+ مريض نشط" : "10,000+ active patients"
    },
    {
      icon: Calendar,
      title: isArabic ? "إدارة ذكية للمواعيد" : "Smart Appointment Management",
      description: isArabic
        ? "لوحة تحكم متكاملة لإدارة جدولك ومواعيدك. تذكيرات تلقائية وتنظيم فعال للوقت."
        : "Integrated dashboard to manage your schedule and appointments. Automatic reminders and efficient time management.",
      highlight: isArabic ? "توفير 5+ ساعات أسبوعياً" : "Save 5+ hours weekly"
    },
  ];

  const additionalBenefits = [
    {
      icon: Shield,
      title: isArabic ? "حماية قانونية" : "Legal Protection",
      description: isArabic ? "تغطية تأمينية شاملة وحماية قانونية لجميع الاستشارات" : "Comprehensive insurance coverage and legal protection for all consultations"
    },
    {
      icon: BarChart3,
      title: isArabic ? "تحليلات مفصلة" : "Detailed Analytics",
      description: isArabic ? "تقارير وإحصائيات مفصلة عن أدائك ومرضاك" : "Detailed reports and statistics about your performance and patients"
    },
    {
      icon: MessageSquare,
      title: isArabic ? "دردشة آمنة" : "Secure Chat",
      description: isArabic ? "تواصل آمن ومشفر مع مرضاك في أي وقت" : "Secure and encrypted communication with your patients anytime"
    },
    {
      icon: Globe,
      title: isArabic ? "وصول عالمي" : "Global Reach",
      description: isArabic ? "استقبل مرضى من جميع أنحاء المنطقة العربية" : "Receive patients from all over the Arab region"
    },
    {
      icon: Zap,
      title: isArabic ? "استشارات عن بعد" : "Telemedicine",
      description: isArabic ? "قدم استشارات فيديو عالية الجودة من أي مكان" : "Provide high-quality video consultations from anywhere"
    },
    {
      icon: HeartPulse,
      title: isArabic ? "سجلات طبية إلكترونية" : "Electronic Medical Records",
      description: isArabic ? "نظام متكامل لإدارة سجلات المرضى بأمان" : "Integrated system for secure patient record management"
    },
    {
      icon: Award,
      title: isArabic ? "شهادات وتقييمات" : "Certificates & Reviews",
      description: isArabic ? "اعرض مؤهلاتك واحصل على تقييمات من مرضاك" : "Display your qualifications and get reviews from your patients"
    },
    {
      icon: Clock,
      title: isArabic ? "مرونة تامة" : "Complete Flexibility",
      description: isArabic ? "حدد ساعات عملك وأنواع الاستشارات التي تقدمها" : "Set your working hours and types of consultations you offer"
    },
  ];

  const steps = [
    {
      number: "1",
      title: isArabic ? "أنشئ حسابك" : "Create Your Account",
      description: isArabic ? "سجل معلوماتك الأساسية ومؤهلاتك الطبية" : "Register your basic information and medical qualifications"
    },
    {
      number: "2",
      title: isArabic ? "التحقق والموافقة" : "Verification & Approval",
      description: isArabic ? "نتحقق من شهاداتك ونوافق على حسابك خلال 48 ساعة" : "We verify your credentials and approve your account within 48 hours"
    },
    {
      number: "3",
      title: isArabic ? "أكمل ملفك" : "Complete Your Profile",
      description: isArabic ? "أضف صورتك وتخصصاتك وساعات عملك" : "Add your photo, specialties, and working hours"
    },
    {
      number: "4",
      title: isArabic ? "ابدأ استقبال المرضى" : "Start Receiving Patients",
      description: isArabic ? "استقبل حجوزات المرضى وابدأ في تقديم الاستشارات" : "Receive patient bookings and start providing consultations"
    },
  ];

  return (
    <div className="min-h-screen bg-background" dir={isArabic ? 'rtl' : 'ltr'}>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Award className="h-10 w-10 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {isArabic ? "مزايا الانضمام كطبيب" : "Benefits of Joining as a Doctor"}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {isArabic 
                  ? "اكتشف كل المزايا التي ستحصل عليها عند الانضمام لفريق ميدلينك"
                  : "Discover all the benefits you'll get when joining the MEDLINK team"}
              </p>
            </div>
          </div>
        </section>

        {/* Main Benefits */}
        <section className="py-20">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">
              {mainBenefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="p-8 hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-transparent hover:border-primary/20">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground mb-4">{benefit.description}</p>
                    <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {benefit.highlight}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Additional Benefits Grid */}
        <section className="py-20 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {isArabic ? "المزيد من المزايا" : "More Benefits"}
              </h2>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalBenefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="p-6 text-center hover:shadow-lg transition-all">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {isArabic ? "كيف تبدأ؟" : "How to Get Started?"}
              </h2>
              <p className="text-muted-foreground text-lg">
                {isArabic ? "4 خطوات بسيطة للانضمام إلينا" : "4 simple steps to join us"}
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="text-center">
                    <div className="h-16 w-16 rounded-full bg-primary text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                      {step.number}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-primary/20 -translate-x-1/2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-accent">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {isArabic ? "مستعد للانضمام؟" : "Ready to Join?"}
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              {isArabic
                ? "انضم الآن لآلاف الأطباء الذين يثقون في ميدلينك لتنمية ممارستهم الطبية"
                : "Join thousands of doctors who trust MEDLINK to grow their medical practice"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link to="/join">{isArabic ? "قدم طلبك الآن" : "Apply Now"}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/contact">{isArabic ? "تواصل معنا" : "Contact Us"}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Benefits;