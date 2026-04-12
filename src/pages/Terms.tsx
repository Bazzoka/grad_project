import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { FileText, Users, Calendar, AlertTriangle, Scale, RefreshCw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Terms = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const sections = [
    {
      icon: Users,
      title: isArabic ? "قبول الشروط" : "Acceptance of Terms",
      content: isArabic
        ? "باستخدامك لمنصة ميدلينك، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام خدماتنا."
        : "By using the MEDLINK platform, you agree to be bound by these terms and conditions. If you do not agree to any part of these terms, please do not use our services."
    },
    {
      icon: Calendar,
      title: isArabic ? "خدمات الحجز" : "Booking Services",
      content: isArabic
        ? "تتيح لك منصتنا حجز مواعيد مع الأطباء. يجب عليك تقديم معلومات صحيحة عند الحجز. نحتفظ بالحق في إلغاء المواعيد في حالة تقديم معلومات غير صحيحة أو سوء استخدام الخدمة."
        : "Our platform allows you to book appointments with doctors. You must provide accurate information when booking. We reserve the right to cancel appointments in case of incorrect information or misuse of the service."
    },
    {
      icon: AlertTriangle,
      title: isArabic ? "إخلاء المسؤولية الطبية" : "Medical Disclaimer",
      content: isArabic
        ? "المعلومات المقدمة على منصتنا هي لأغراض إعلامية فقط ولا تحل محل الاستشارة الطبية المهنية. استشر دائماً طبيباً مؤهلاً للحصول على المشورة الطبية."
        : "Information provided on our platform is for informational purposes only and does not replace professional medical advice. Always consult a qualified doctor for medical advice."
    },
    {
      icon: Scale,
      title: isArabic ? "حدود المسؤولية" : "Limitation of Liability",
      content: isArabic
        ? "ميدلينك ليست مسؤولة عن أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام خدماتنا. نحن نسهل الاتصال بين المرضى والأطباء ولكننا لسنا مقدمي رعاية صحية مباشرين."
        : "MEDLINK is not responsible for any direct or indirect damages resulting from the use of our services. We facilitate connection between patients and doctors but are not direct healthcare providers."
    },
    {
      icon: RefreshCw,
      title: isArabic ? "سياسة الإلغاء" : "Cancellation Policy",
      content: isArabic
        ? "يمكنك إلغاء أو إعادة جدولة موعدك قبل 24 ساعة على الأقل من الموعد المحدد. الإلغاء المتأخر قد يؤدي إلى رسوم إلغاء حسب سياسة الطبيب."
        : "You can cancel or reschedule your appointment at least 24 hours before the scheduled time. Late cancellation may result in cancellation fees according to the doctor's policy."
    },
    {
      icon: FileText,
      title: isArabic ? "تعديل الشروط" : "Modification of Terms",
      content: isArabic
        ? "نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إخطارك بأي تغييرات جوهرية. استمرارك في استخدام الخدمة بعد التعديلات يعني موافقتك على الشروط الجديدة."
        : "We reserve the right to modify these terms at any time. You will be notified of any material changes. Your continued use of the service after modifications means you accept the new terms."
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
                  <FileText className="h-10 w-10 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {isArabic ? "شروط الخدمة" : "Terms of Service"}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {isArabic 
                  ? "يرجى قراءة هذه الشروط بعناية قبل استخدام خدماتنا"
                  : "Please read these terms carefully before using our services"}
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                {isArabic ? "آخر تحديث: ديسمبر 2024" : "Last updated: December 2024"}
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto space-y-8">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Icon className="h-7 w-7 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                          {index + 1}. {section.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Agreement Notice */}
            <Card className="max-w-4xl mx-auto mt-12 p-8 bg-gradient-to-r from-primary/5 to-accent/5">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {isArabic ? "الموافقة على الشروط" : "Agreement to Terms"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {isArabic 
                    ? "باستخدامك لمنصة ميدلينك، فإنك تقر بأنك قد قرأت وفهمت ووافقت على هذه الشروط والأحكام."
                    : "By using the MEDLINK platform, you acknowledge that you have read, understood, and agree to these terms and conditions."}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isArabic 
                    ? "لأي استفسارات قانونية، تواصل معنا على: legal@medlink.com"
                    : "For any legal inquiries, contact us at: legal@medlink.com"}
                </p>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;