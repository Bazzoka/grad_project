import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Phone, Mail, MapPin, Clock, 
  MessageSquare, Send, Building
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast({
        title: isArabic ? "تم الإرسال بنجاح" : "Message Sent!",
        description: isArabic 
          ? "سنتواصل معك قريباً" 
          : "We'll get back to you soon.",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: isArabic ? "اتصل بنا" : "Call Us",
      details: ["+20 123 456 7890", "+966 50 123 4567"],
    },
    {
      icon: Mail,
      title: isArabic ? "راسلنا" : "Email Us",
      details: ["support@medlink.com", "info@medlink.com"],
    },
    {
      icon: MapPin,
      title: isArabic ? "مكاتبنا" : "Our Offices",
      details: [
        isArabic ? "القاهرة، مصر" : "Cairo, Egypt",
        isArabic ? "الرياض، السعودية" : "Riyadh, Saudi Arabia",
      ],
    },
    {
      icon: Clock,
      title: isArabic ? "ساعات العمل" : "Working Hours",
      details: [
        isArabic ? "الأحد - الخميس: 9ص - 6م" : "Sun - Thu: 9AM - 6PM",
        isArabic ? "الجمعة - السبت: 10ص - 4م" : "Fri - Sat: 10AM - 4PM",
      ],
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
                  <MessageSquare className="h-10 w-10 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {isArabic ? "تواصل معنا" : "Contact Us"}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {isArabic 
                  ? "نحن هنا للإجابة على جميع استفساراتك ومساعدتك في رحلتك الصحية"
                  : "We're here to answer all your questions and help you on your health journey"}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 bg-secondary/30">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card key={index} className="p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 bg-card">
                    <div className="flex justify-center mb-4">
                      <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">{info.title}</h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground text-sm">{detail}</p>
                    ))}
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  {isArabic ? "أرسل لنا رسالة" : "Send Us a Message"}
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  {isArabic
                    ? "هل لديك استفسار أو اقتراح؟ لا تتردد في التواصل معنا. فريقنا جاهز لمساعدتك."
                    : "Have a question or suggestion? Don't hesitate to reach out. Our team is ready to help you."}
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        {isArabic ? "الاسم الكامل" : "Full Name"}
                      </label>
                      <Input 
                        placeholder={isArabic ? "أدخل اسمك" : "Enter your name"} 
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        {isArabic ? "البريد الإلكتروني" : "Email"}
                      </label>
                      <Input 
                        type="email" 
                        placeholder={isArabic ? "أدخل بريدك الإلكتروني" : "Enter your email"} 
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {isArabic ? "رقم الهاتف" : "Phone Number"}
                    </label>
                    <Input 
                      type="tel" 
                      placeholder={isArabic ? "أدخل رقم هاتفك" : "Enter your phone number"} 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {isArabic ? "الموضوع" : "Subject"}
                    </label>
                    <Input 
                      placeholder={isArabic ? "موضوع الرسالة" : "Message subject"} 
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {isArabic ? "الرسالة" : "Message"}
                    </label>
                    <Textarea 
                      placeholder={isArabic ? "اكتب رسالتك هنا..." : "Write your message here..."} 
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                    <Send className="h-4 w-4 mr-2" />
                    {isSubmitting 
                      ? (isArabic ? "جاري الإرسال..." : "Sending...") 
                      : (isArabic ? "إرسال الرسالة" : "Send Message")}
                  </Button>
                </form>
              </div>

              <div className="relative">
                <Card className="p-8 bg-gradient-to-br from-primary to-accent text-white">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                      <Building className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">MEDLINK</h3>
                      <p className="text-white/80">
                        {isArabic ? "صحتك أولويتنا" : "Your Health, Our Priority"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-white/90">
                      {isArabic 
                        ? "نحن نخدم منطقة الشرق الأوسط وشمال أفريقيا مع التركيز على مصر والسعودية والأردن."
                        : "We serve the MENA region with a focus on Egypt, Saudi Arabia, and Jordan."}
                    </p>
                    <div className="pt-4 border-t border-white/20">
                      <p className="text-sm text-white/70 mb-2">
                        {isArabic ? "للاستفسارات العاجلة:" : "For urgent inquiries:"}
                      </p>
                      <p className="text-lg font-semibold">+20 123 456 7890</p>
                    </div>
                  </div>
                </Card>

                {/* Map placeholder */}
                <Card className="mt-6 overflow-hidden">
                  <div className="h-64 bg-secondary/50 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
                      <p className="text-muted-foreground">
                        {isArabic ? "القاهرة، مصر" : "Cairo, Egypt"}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;