import { 
  Activity, Brain, Eye, Heart, Pill, Stethoscope, Syringe, Bone,
  Baby, Ear, Droplet, Microscope, Thermometer, Dna, Zap,
  User, Users, Clock, Leaf, Wind, Smile, HeartPulse, Shell, Drumstick
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const specialtiesData = [
  { name: "Cardiology", nameAr: "القلب", icon: Heart, color: "text-red-500", count: 245 },
  { name: "Dentistry", nameAr: "الأسنان", icon: Activity, color: "text-blue-500", count: 312 },
  { name: "Neurology", nameAr: "الأعصاب", icon: Brain, color: "text-purple-500", count: 189 },
  { name: "Ophthalmology", nameAr: "العيون", icon: Eye, color: "text-cyan-500", count: 156 },
  { name: "Orthopedics", nameAr: "العظام", icon: Bone, color: "text-orange-500", count: 278 },
  { name: "Pediatrics", nameAr: "الأطفال", icon: Baby, color: "text-pink-500", count: 401 },
  { name: "Dermatology", nameAr: "الجلدية", icon: Pill, color: "text-green-500", count: 223 },
  { name: "Psychiatry", nameAr: "الطب النفسي", icon: Syringe, color: "text-indigo-500", count: 134 },
  { name: "ENT", nameAr: "الأنف والأذن والحنجرة", icon: Ear, color: "text-teal-500", count: 198 },
  { name: "Nephrology", nameAr: "الكلى", icon: Droplet, color: "text-amber-500", count: 142 },
  { name: "Hematology", nameAr: "أمراض الدم", icon: Droplet, color: "text-rose-500", count: 167 },
  { name: "Pathology", nameAr: "علم الأمراض", icon: Microscope, color: "text-violet-500", count: 125 },
  { name: "Endocrinology", nameAr: "الغدد الصماء", icon: Thermometer, color: "text-lime-500", count: 189 },
  { name: "Genetics", nameAr: "علم الوراثة", icon: Dna, color: "text-fuchsia-500", count: 98 },
  { name: "Radiology", nameAr: "الأشعة", icon: Zap, color: "text-sky-500", count: 234 },
  { name: "Geriatrics", nameAr: "طب المسنين", icon: Users, color: "text-emerald-500", count: 176 },
  { name: "Emergency Medicine", nameAr: "الطوارئ", icon: Clock, color: "text-red-600", count: 312 },
  { name: "Internal Medicine", nameAr: "الباطنة", icon: Stethoscope, color: "text-blue-600", count: 445 },
  { name: "Rheumatology", nameAr: "أمراض الروماتيزم", icon: Leaf, color: "text-green-600", count: 134 },
  { name: "Pulmonology", nameAr: "أمراض الصدر", icon: Wind, color: "text-cyan-600", count: 198 },
  { name: "Gastroenterology", nameAr: "الجهاز الهضمي", icon: Shell, color: "text-orange-600", count: 223 },
  { name: "Oncology", nameAr: "الأورام", icon: HeartPulse, color: "text-purple-600", count: 267 },
  { name: "Urology", nameAr: "المسالك البولية", icon: User, color: "text-indigo-600", count: 189 },
  { name: "Plastic Surgery", nameAr: "التجميل", icon: Smile, color: "text-pink-600", count: 156 },
];

const PopularSpecialties = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <section className="bg-secondary/30 py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
            {isArabic ? "التخصصات الشائعة" : "Medical Specialties"}
          </h2>
          <p className="text-lg text-muted-foreground">
            {isArabic ? "ابحث عن الطبيب المناسب لاحتياجاتك الصحية" : "Find the right specialist for your health needs"}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {specialtiesData.map((specialty) => {
            const Icon = specialty.icon;
            return (
              <Link key={specialty.name} to={`/doctors?specialty=${specialty.name.toLowerCase()}`}>
                <Card className="group cursor-pointer overflow-hidden border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 transition-transform duration-300 group-hover:scale-110`}>
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
      </div>
    </section>
  );
};

export default PopularSpecialties;
