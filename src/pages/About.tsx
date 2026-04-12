import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { 
  Heart, Shield, Users, Award, Clock, 
  Stethoscope, Target, Sparkles, CheckCircle
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const stats = [
    { value: "10,000+", label: isArabic ? "مريض سعيد" : "Happy Patients", icon: Users },
    { value: "500+", label: isArabic ? "طبيب معتمد" : "Verified Doctors", icon: Stethoscope },
    { value: "50+", label: isArabic ? "تخصص طبي" : "Specialties", icon: Target },
    { value: "24/7", label: isArabic ? "دعم متاح" : "Support Available", icon: Clock },
  ];

  const values = [
    {
      icon: Heart,
      title: isArabic ? "رعاية المرضى" : "Patient Care",
      description: isArabic 
        ? "نضع صحة مرضانا في المقام الأول ونسعى لتقديم أفضل رعاية طبية ممكنة"
        : "We put our patients' health first and strive to provide the best possible medical care"
    },
    {
      icon: Shield,
      title: isArabic ? "الأمان والخصوصية" : "Safety & Privacy",
      description: isArabic
        ? "نحمي بياناتك الطبية بأعلى معايير الأمان والتشفير"
        : "We protect your medical data with the highest security and encryption standards"
    },
    {
      icon: Award,
      title: isArabic ? "أطباء موثوقون" : "Trusted Doctors",
      description: isArabic
        ? "جميع أطبائنا معتمدون ولديهم سنوات من الخبرة في تخصصاتهم"
        : "All our doctors are certified with years of experience in their specialties"
    },
    {
      icon: Sparkles,
      title: isArabic ? "تقنية متطورة" : "Advanced Technology",
      description: isArabic
        ? "نستخدم أحدث التقنيات لتسهيل حجز المواعيد والاستشارات"
        : "We use the latest technology to facilitate booking and consultations"
    },
  ];

  const features = [
    isArabic ? "حجز مواعيد سهل وسريع" : "Easy and fast appointment booking",
    isArabic ? "استشارات طبية عن بعد" : "Remote medical consultations",
    isArabic ? "سجلات طبية إلكترونية آمنة" : "Secure electronic medical records",
    isArabic ? "تذكيرات بالمواعيد" : "Appointment reminders",
    isArabic ? "تقييمات وآراء المرضى" : "Patient reviews and ratings",
    isArabic ? "دعم متعدد اللغات" : "Multi-language support",
  ];

  return (
    <div className="min-h-screen bg-background" dir={isArabic ? 'rtl' : 'ltr'}>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {isArabic ? "عن ميدلينك" : "About MEDLINK"}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {isArabic 
                  ? "ميدلينك هي منصتك الطبية الشاملة التي تربطك بأفضل الأطباء والمتخصصين في جميع المجالات الطبية. نسعى لجعل الرعاية الصحية في متناول الجميع."
                  : "MEDLINK is your comprehensive medical platform connecting you with the best doctors and specialists across all medical fields. We strive to make healthcare accessible to everyone."}
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="p-6 text-center bg-card hover:shadow-lg transition-shadow">
                    <div className="flex justify-center mb-4">
                      <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-foreground">{stat.value}</h3>
                    <p className="text-muted-foreground mt-1">{stat.label}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  {isArabic ? "مهمتنا" : "Our Mission"}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  {isArabic
                    ? "نسعى في ميدلينك لإحداث ثورة في طريقة وصول الناس إلى الرعاية الصحية. نؤمن بأن كل شخص يستحق الحصول على رعاية طبية عالية الجودة بسهولة ويسر."
                    : "At MEDLINK, we strive to revolutionize the way people access healthcare. We believe everyone deserves easy access to high-quality medical care."}
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {isArabic
                    ? "من خلال منصتنا المتطورة، نربط المرضى بالأطباء المتخصصين، ونوفر أدوات حديثة لإدارة الصحة والمواعيد الطبية."
                    : "Through our advanced platform, we connect patients with specialized doctors and provide modern tools for managing health and medical appointments."}
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl transform rotate-3"></div>
                <Card className="relative p-8 bg-card">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Heart className="h-8 w-8 text-white" fill="currentColor" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">MEDLINK</h3>
                      <p className="text-muted-foreground">
                        {isArabic ? "صحتك أولويتنا" : "Your Health, Our Priority"}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {isArabic ? "قيمنا" : "Our Values"}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {isArabic
                  ? "نلتزم بمجموعة من القيم الأساسية التي توجه كل ما نقوم به"
                  : "We are committed to a set of core values that guide everything we do"}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 bg-card">
                    <div className="flex justify-center mb-4">
                      <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-accent">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {isArabic ? "ابدأ رحلتك الصحية اليوم" : "Start Your Health Journey Today"}
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              {isArabic
                ? "انضم إلى آلاف المرضى الذين يثقون في ميدلينك لرعايتهم الصحية"
                : "Join thousands of patients who trust MEDLINK for their healthcare needs"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/doctors" 
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white text-primary font-semibold hover:bg-white/90 transition-colors"
              >
                {isArabic ? "ابحث عن طبيب" : "Find a Doctor"}
              </a>
              <a 
                href="/auth" 
                className="inline-flex items-center justify-center px-8 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
              >
                {isArabic ? "سجل الآن" : "Sign Up Now"}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
