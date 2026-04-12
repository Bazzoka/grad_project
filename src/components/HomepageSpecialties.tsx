import { Link } from "react-router-dom";
import { 
  Heart, Brain, Eye, Bone, Baby, Stethoscope, Pill, Ear
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const featuredSpecialties = [
  { name: "Cardiology", nameAr: "القلب", icon: Heart, color: "text-red-500", count: 245 },
  { name: "Neurology", nameAr: "الأعصاب", icon: Brain, color: "text-purple-500", count: 189 },
  { name: "Ophthalmology", nameAr: "العيون", icon: Eye, color: "text-cyan-500", count: 156 },
  { name: "Orthopedics", nameAr: "العظام", icon: Bone, color: "text-orange-500", count: 278 },
  { name: "Pediatrics", nameAr: "الأطفال", icon: Baby, color: "text-pink-500", count: 401 },
  { name: "Internal Medicine", nameAr: "الباطنة", icon: Stethoscope, color: "text-blue-600", count: 445 },
  { name: "Dermatology", nameAr: "الجلدية", icon: Pill, color: "text-green-500", count: 223 },
  { name: "ENT", nameAr: "الأنف والأذن والحنجرة", icon: Ear, color: "text-teal-500", count: 198 },
];

const HomepageSpecialties = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <section className="bg-secondary/30 py-16 md:py-24" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
            {isArabic ? "التخصصات الشائعة" : "Popular Specialties"}
          </h2>
          <p className="text-lg text-muted-foreground">
            {isArabic ? "ابحث عن الطبيب المناسب لاحتياجاتك الصحية" : "Find the right specialist for your health needs"}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredSpecialties.map((specialty) => {
            const Icon = specialty.icon;
            return (
              <Link key={specialty.name} to={`/doctors?specialty=${specialty.name.toLowerCase()}`}>
                <Card className="group cursor-pointer overflow-hidden border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 transition-transform duration-300 group-hover:scale-110">
                        <Icon className={`h-7 w-7 ${specialty.color}`} />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">
                        {specialty.count}+ {isArabic ? "طبيب" : "doctors"}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {isArabic ? specialty.nameAr : specialty.name}
                    </h3>
                  </div>
                  <div className="h-1 w-0 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full"></div>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link to="/specialties">
            <Button size="lg" variant="outline" className="px-8">
              {isArabic ? "عرض جميع التخصصات" : "View All Specialties"}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomepageSpecialties;
