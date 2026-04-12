import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Activity, Brain, Eye, Heart, Pill, Stethoscope, Syringe, Bone,
  Baby, Ear, Droplet, Microscope, Thermometer, Dna, Zap,
  User, Users, Clock, Leaf, Wind, Smile, HeartPulse, Shell, Search
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const specialtiesData = [
  { name: "Cardiology", nameAr: "القلب", icon: Heart, color: "text-red-500", bgColor: "bg-red-500/10", count: 245, description: "Heart and cardiovascular system", descriptionAr: "القلب والجهاز الدوري" },
  { name: "Dentistry", nameAr: "الأسنان", icon: Activity, color: "text-blue-500", bgColor: "bg-blue-500/10", count: 312, description: "Teeth and oral health", descriptionAr: "الأسنان وصحة الفم" },
  { name: "Neurology", nameAr: "الأعصاب", icon: Brain, color: "text-purple-500", bgColor: "bg-purple-500/10", count: 189, description: "Brain and nervous system", descriptionAr: "الدماغ والجهاز العصبي" },
  { name: "Ophthalmology", nameAr: "العيون", icon: Eye, color: "text-cyan-500", bgColor: "bg-cyan-500/10", count: 156, description: "Eye care and vision", descriptionAr: "العناية بالعيون والرؤية" },
  { name: "Orthopedics", nameAr: "العظام", icon: Bone, color: "text-orange-500", bgColor: "bg-orange-500/10", count: 278, description: "Bones, joints and muscles", descriptionAr: "العظام والمفاصل والعضلات" },
  { name: "Pediatrics", nameAr: "الأطفال", icon: Baby, color: "text-pink-500", bgColor: "bg-pink-500/10", count: 401, description: "Children's health", descriptionAr: "صحة الأطفال" },
  { name: "Dermatology", nameAr: "الجلدية", icon: Pill, color: "text-green-500", bgColor: "bg-green-500/10", count: 223, description: "Skin, hair and nails", descriptionAr: "الجلد والشعر والأظافر" },
  { name: "Psychiatry", nameAr: "الطب النفسي", icon: Syringe, color: "text-indigo-500", bgColor: "bg-indigo-500/10", count: 134, description: "Mental health", descriptionAr: "الصحة النفسية" },
  { name: "ENT", nameAr: "الأنف والأذن والحنجرة", icon: Ear, color: "text-teal-500", bgColor: "bg-teal-500/10", count: 198, description: "Ear, nose and throat", descriptionAr: "الأذن والأنف والحنجرة" },
  { name: "Nephrology", nameAr: "الكلى", icon: Droplet, color: "text-amber-500", bgColor: "bg-amber-500/10", count: 142, description: "Kidney care", descriptionAr: "العناية بالكلى" },
  { name: "Hematology", nameAr: "أمراض الدم", icon: Droplet, color: "text-rose-500", bgColor: "bg-rose-500/10", count: 167, description: "Blood disorders", descriptionAr: "اضطرابات الدم" },
  { name: "Pathology", nameAr: "علم الأمراض", icon: Microscope, color: "text-violet-500", bgColor: "bg-violet-500/10", count: 125, description: "Disease diagnosis", descriptionAr: "تشخيص الأمراض" },
  { name: "Endocrinology", nameAr: "الغدد الصماء", icon: Thermometer, color: "text-lime-500", bgColor: "bg-lime-500/10", count: 189, description: "Hormones and metabolism", descriptionAr: "الهرمونات والتمثيل الغذائي" },
  { name: "Genetics", nameAr: "علم الوراثة", icon: Dna, color: "text-fuchsia-500", bgColor: "bg-fuchsia-500/10", count: 98, description: "Genetic disorders", descriptionAr: "الاضطرابات الوراثية" },
  { name: "Radiology", nameAr: "الأشعة", icon: Zap, color: "text-sky-500", bgColor: "bg-sky-500/10", count: 234, description: "Medical imaging", descriptionAr: "التصوير الطبي" },
  { name: "Geriatrics", nameAr: "طب المسنين", icon: Users, color: "text-emerald-500", bgColor: "bg-emerald-500/10", count: 176, description: "Elderly care", descriptionAr: "رعاية كبار السن" },
  { name: "Emergency Medicine", nameAr: "الطوارئ", icon: Clock, color: "text-red-600", bgColor: "bg-red-600/10", count: 312, description: "Emergency care", descriptionAr: "رعاية الطوارئ" },
  { name: "Internal Medicine", nameAr: "الباطنة", icon: Stethoscope, color: "text-blue-600", bgColor: "bg-blue-600/10", count: 445, description: "General internal medicine", descriptionAr: "الطب الباطني العام" },
  { name: "Rheumatology", nameAr: "أمراض الروماتيزم", icon: Leaf, color: "text-green-600", bgColor: "bg-green-600/10", count: 134, description: "Joint and autoimmune diseases", descriptionAr: "أمراض المفاصل والمناعة الذاتية" },
  { name: "Pulmonology", nameAr: "أمراض الصدر", icon: Wind, color: "text-cyan-600", bgColor: "bg-cyan-600/10", count: 198, description: "Lung and respiratory system", descriptionAr: "الرئتين والجهاز التنفسي" },
  { name: "Gastroenterology", nameAr: "الجهاز الهضمي", icon: Shell, color: "text-orange-600", bgColor: "bg-orange-600/10", count: 223, description: "Digestive system", descriptionAr: "الجهاز الهضمي" },
  { name: "Oncology", nameAr: "الأورام", icon: HeartPulse, color: "text-purple-600", bgColor: "bg-purple-600/10", count: 267, description: "Cancer treatment", descriptionAr: "علاج السرطان" },
  { name: "Urology", nameAr: "المسالك البولية", icon: User, color: "text-indigo-600", bgColor: "bg-indigo-600/10", count: 189, description: "Urinary system", descriptionAr: "الجهاز البولي" },
  { name: "Plastic Surgery", nameAr: "التجميل", icon: Smile, color: "text-pink-600", bgColor: "bg-pink-600/10", count: 156, description: "Reconstructive and cosmetic surgery", descriptionAr: "الجراحة التجميلية والترميمية" },
];

const Specialties = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSpecialties = specialtiesData.filter(specialty => 
    specialty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    specialty.nameAr.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-background" dir={isArabic ? 'rtl' : 'ltr'}>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {isArabic ? "التخصصات الطبية" : "Medical Specialties"}
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                {isArabic 
                  ? "اكتشف جميع التخصصات الطبية المتاحة واحجز موعدك مع أفضل الأطباء"
                  : "Discover all available medical specialties and book your appointment with the best doctors"}
              </p>
              
              {/* Search */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isArabic ? "ابحث عن تخصص..." : "Search specialties..."}
                  className="pl-12 h-12 text-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Specialties Grid */}
        <section className="py-16">
          <div className="container">
            <div className="mb-8 flex items-center justify-between">
              <p className="text-muted-foreground">
                {isArabic 
                  ? `${filteredSpecialties.length} تخصص متاح`
                  : `${filteredSpecialties.length} specialties available`}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredSpecialties.map((specialty) => {
                const Icon = specialty.icon;
                return (
                  <Link key={specialty.name} to={`/doctors?specialty=${specialty.name.toLowerCase()}`}>
                    <Card className="group cursor-pointer overflow-hidden border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-xl h-full">
                      <div className="p-6">
                        <div className="mb-4 flex items-start justify-between">
                          <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${specialty.bgColor} transition-transform duration-300 group-hover:scale-110`}>
                            <Icon className={`h-8 w-8 ${specialty.color}`} />
                          </div>
                          <span className="text-sm font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                            {specialty.count}+ {isArabic ? "طبيب" : "doctors"}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {isArabic ? specialty.nameAr : specialty.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {isArabic ? specialty.descriptionAr : specialty.description}
                        </p>
                      </div>
                      <div className="h-1 w-0 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full"></div>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {filteredSpecialties.length === 0 && (
              <div className="text-center py-16">
                <Search className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-xl text-muted-foreground">
                  {isArabic ? "لم يتم العثور على تخصصات" : "No specialties found"}
                </p>
                <p className="text-muted-foreground mt-2">
                  {isArabic ? "حاول البحث بكلمات مختلفة" : "Try searching with different keywords"}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Specialties;
