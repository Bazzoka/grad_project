import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill, Truck, Shield, Percent } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PharmacyAd = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <section className="py-16 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10">
      <div className="container">
        <Card className="relative overflow-hidden border-2 border-green-500/20 bg-card">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-500/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl" />
          
          <div className="relative p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Left Side - Content */}
              <div className="flex-1 text-center lg:text-start">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-700 font-medium text-sm mb-4">
                  <Pill className="h-4 w-4" />
                  {isArabic ? "صيدلية ميدلينك" : "MEDLINK Pharmacy"}
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {isArabic 
                    ? "احصل على أدويتك بسهولة"
                    : "Get Your Medicines with Ease"}
                </h2>
                
                <p className="text-lg text-muted-foreground mb-6 max-w-xl">
                  {isArabic
                    ? "اطلب أدويتك عبر الإنترنت واستخدم رمز الوصفة الطبية للحصول على أدويتك مباشرة دون عناء البحث"
                    : "Order your medicines online and use your prescription code to get your medicines directly without the hassle of searching"}
                </p>

                <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Truck className="h-5 w-5 text-green-600" />
                    {isArabic ? "توصيل سريع" : "Fast Delivery"}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-5 w-5 text-green-600" />
                    {isArabic ? "منتجات أصلية" : "Genuine Products"}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Percent className="h-5 w-5 text-green-600" />
                    {isArabic ? "أسعار تنافسية" : "Competitive Prices"}
                  </div>
                </div>

                <Link to="/pharmacy">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8">
                    {isArabic ? "تسوق الآن" : "Shop Now"}
                  </Button>
                </Link>
              </div>

              {/* Right Side - Visual */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-teal-500 rounded-3xl blur-xl opacity-30" />
                  <div className="relative h-48 w-48 md:h-64 md:w-64 rounded-3xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Pill className="h-16 w-16 md:h-20 md:w-20 mx-auto mb-2" />
                      <p className="font-bold text-lg md:text-xl">
                        {isArabic ? "خصم 20%" : "20% OFF"}
                      </p>
                      <p className="text-sm opacity-90">
                        {isArabic ? "على الطلب الأول" : "First Order"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default PharmacyAd;
