import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Shield, Lock, Eye, Database, Bell, UserCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Privacy = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const sections = [
    {
      icon: Database,
      title: isArabic ? "جمع البيانات" : "Data Collection",
      content: isArabic
        ? "نقوم بجمع المعلومات التي تقدمها لنا مباشرة، مثل اسمك وبريدك الإلكتروني ورقم هاتفك والمعلومات الطبية اللازمة لتقديم خدماتنا. نستخدم هذه البيانات فقط لتحسين تجربتك وتقديم الرعاية الصحية المناسبة."
        : "We collect information you provide directly to us, such as your name, email, phone number, and medical information necessary to provide our services. We use this data only to improve your experience and provide appropriate healthcare."
    },
    {
      icon: Lock,
      title: isArabic ? "حماية البيانات" : "Data Protection",
      content: isArabic
        ? "نستخدم أحدث تقنيات التشفير وأنظمة الأمان لحماية بياناتك الشخصية والطبية. جميع الاتصالات مشفرة ونلتزم بأعلى معايير الأمان في الصناعة."
        : "We use the latest encryption technologies and security systems to protect your personal and medical data. All communications are encrypted and we adhere to the highest industry security standards."
    },
    {
      icon: Eye,
      title: isArabic ? "استخدام البيانات" : "Data Usage",
      content: isArabic
        ? "نستخدم بياناتك لتوفير وتحسين خدماتنا، والتواصل معك بشأن المواعيد، وإرسال تحديثات مهمة. لن نبيع أو نشارك بياناتك مع أطراف ثالثة دون موافقتك الصريحة."
        : "We use your data to provide and improve our services, communicate with you about appointments, and send important updates. We will never sell or share your data with third parties without your explicit consent."
    },
    {
      icon: UserCheck,
      title: isArabic ? "حقوقك" : "Your Rights",
      content: isArabic
        ? "لديك الحق في الوصول إلى بياناتك وتصحيحها أو حذفها في أي وقت. يمكنك أيضاً طلب نسخة من بياناتك أو الاعتراض على معالجتها. نحترم خصوصيتك ونلتزم بتنفيذ طلباتك."
        : "You have the right to access, correct, or delete your data at any time. You can also request a copy of your data or object to its processing. We respect your privacy and are committed to fulfilling your requests."
    },
    {
      icon: Bell,
      title: isArabic ? "الإشعارات" : "Notifications",
      content: isArabic
        ? "قد نرسل لك إشعارات تتعلق بمواعيدك الطبية أو تحديثات مهمة لخدماتنا. يمكنك إدارة تفضيلات الإشعارات من إعدادات حسابك في أي وقت."
        : "We may send you notifications regarding your medical appointments or important updates to our services. You can manage your notification preferences from your account settings at any time."
    },
    {
      icon: Shield,
      title: isArabic ? "ملفات تعريف الارتباط" : "Cookies",
      content: isArabic
        ? "نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح وتذكر تفضيلاتك. يمكنك تعطيل ملفات تعريف الارتباط من إعدادات المتصفح، لكن ذلك قد يؤثر على بعض وظائف الموقع."
        : "We use cookies to improve your browsing experience and remember your preferences. You can disable cookies from your browser settings, but this may affect some website functionality."
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
                  <Shield className="h-10 w-10 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {isArabic ? "سياسة الخصوصية" : "Privacy Policy"}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {isArabic 
                  ? "نحن نأخذ خصوصيتك على محمل الجد. تعرف على كيفية جمعنا واستخدامنا وحمايتنا لبياناتك."
                  : "We take your privacy seriously. Learn how we collect, use, and protect your data."}
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
                          {section.title}
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

            {/* Contact for Privacy */}
            <Card className="max-w-4xl mx-auto mt-12 p-8 bg-gradient-to-r from-primary/5 to-accent/5">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {isArabic ? "أسئلة حول الخصوصية؟" : "Questions About Privacy?"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {isArabic 
                    ? "إذا كان لديك أي أسئلة حول سياسة الخصوصية أو كيفية التعامل مع بياناتك، تواصل معنا."
                    : "If you have any questions about our privacy policy or how we handle your data, contact us."}
                </p>
                <a 
                  href="mailto:privacy@medlink.com" 
                  className="text-primary hover:underline font-medium"
                >
                  privacy@medlink.com
                </a>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;