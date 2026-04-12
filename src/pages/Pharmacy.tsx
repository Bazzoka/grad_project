import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Search, ShoppingCart, Plus, Minus, Pill, 
  FileText, X, CheckCircle, Truck, Package
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface Medicine {
  id: string;
  name: string;
  name_ar: string;
  description: string | null;
  description_ar: string | null;
  price: number;
  category: string;
  category_ar: string;
  stock: number;
  requires_prescription: boolean;
}

interface CartItem extends Medicine {
  quantity: number;
}

// Local medicine data - works offline without network
const localMedicines: Medicine[] = [
  { id: "1", name: "Paracetamol 500mg", name_ar: "باراسيتامول 500مج", description: "Pain reliever and fever reducer", description_ar: "مسكن للألم وخافض للحرارة", price: 5.99, category: "Pain Relief", category_ar: "مسكنات الألم", stock: 100, requires_prescription: false },
  { id: "2", name: "Ibuprofen 400mg", name_ar: "ايبوبروفين 400مج", description: "Anti-inflammatory pain reliever", description_ar: "مسكن مضاد للالتهابات", price: 8.99, category: "Pain Relief", category_ar: "مسكنات الألم", stock: 80, requires_prescription: false },
  { id: "3", name: "Amoxicillin 500mg", name_ar: "أموكسيسيلين 500مج", description: "Antibiotic for bacterial infections", description_ar: "مضاد حيوي للعدوى البكتيرية", price: 15.99, category: "Antibiotics", category_ar: "المضادات الحيوية", stock: 50, requires_prescription: true },
  { id: "4", name: "Omeprazole 20mg", name_ar: "أوميبرازول 20مج", description: "Reduces stomach acid", description_ar: "يقلل حمض المعدة", price: 12.99, category: "Digestive", category_ar: "الجهاز الهضمي", stock: 60, requires_prescription: false },
  { id: "5", name: "Cetirizine 10mg", name_ar: "سيتريزين 10مج", description: "Antihistamine for allergies", description_ar: "مضاد للهستامين للحساسية", price: 7.49, category: "Allergy", category_ar: "الحساسية", stock: 90, requires_prescription: false },
  { id: "6", name: "Metformin 500mg", name_ar: "ميتفورمين 500مج", description: "Controls blood sugar levels", description_ar: "يتحكم في مستويات السكر في الدم", price: 9.99, category: "Diabetes", category_ar: "السكري", stock: 70, requires_prescription: true },
  { id: "7", name: "Vitamin D3 1000IU", name_ar: "فيتامين د3 1000وحدة", description: "Supports bone health", description_ar: "يدعم صحة العظام", price: 11.99, category: "Vitamins", category_ar: "الفيتامينات", stock: 120, requires_prescription: false },
  { id: "8", name: "Vitamin C 1000mg", name_ar: "فيتامين سي 1000مج", description: "Immune system support", description_ar: "دعم جهاز المناعة", price: 8.49, category: "Vitamins", category_ar: "الفيتامينات", stock: 150, requires_prescription: false },
  { id: "9", name: "Aspirin 100mg", name_ar: "أسبرين 100مج", description: "Heart health and pain relief", description_ar: "صحة القلب وتسكين الألم", price: 6.99, category: "Heart Health", category_ar: "صحة القلب", stock: 100, requires_prescription: false },
  { id: "10", name: "Atorvastatin 20mg", name_ar: "أتورفاستاتين 20مج", description: "Lowers cholesterol levels", description_ar: "يخفض مستويات الكوليسترول", price: 18.99, category: "Heart Health", category_ar: "صحة القلب", stock: 40, requires_prescription: true },
  { id: "11", name: "Loratadine 10mg", name_ar: "لوراتادين 10مج", description: "Non-drowsy allergy relief", description_ar: "تخفيف الحساسية بدون نعاس", price: 6.99, category: "Allergy", category_ar: "الحساسية", stock: 85, requires_prescription: false },
  { id: "12", name: "Multivitamin Complex", name_ar: "مركب الفيتامينات المتعددة", description: "Daily nutritional supplement", description_ar: "مكمل غذائي يومي", price: 14.99, category: "Vitamins", category_ar: "الفيتامينات", stock: 200, requires_prescription: false },
];

const Pharmacy = () => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const [medicines] = useState<Medicine[]>(localMedicines);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [prescriptionCode, setPrescriptionCode] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const categories = [
    { value: "all", label: isArabic ? "الكل" : "All" },
    { value: "Pain Relief", label: isArabic ? "مسكنات الألم" : "Pain Relief" },
    { value: "Antibiotics", label: isArabic ? "المضادات الحيوية" : "Antibiotics" },
    { value: "Digestive", label: isArabic ? "الجهاز الهضمي" : "Digestive" },
    { value: "Allergy", label: isArabic ? "الحساسية" : "Allergy" },
    { value: "Diabetes", label: isArabic ? "السكري" : "Diabetes" },
    { value: "Vitamins", label: isArabic ? "الفيتامينات" : "Vitamins" },
    { value: "Heart Health", label: isArabic ? "صحة القلب" : "Heart Health" },
  ];

  const handlePrescriptionCode = () => {
    if (!prescriptionCode.trim()) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "الرجاء إدخال رمز الوصفة" : "Please enter a prescription code",
        variant: "destructive",
      });
      return;
    }

    // Demo prescription codes (local validation)
    const validCodes: { [key: string]: string[] } = {
      'RX001': ['3', '6'], // Amoxicillin, Metformin
      'RX002': ['10'], // Atorvastatin
    };

    const medicineIds = validCodes[prescriptionCode.toUpperCase()];
    
    if (!medicineIds) {
      toast({
        title: isArabic ? "رمز غير صالح" : "Invalid Code",
        description: isArabic ? "هذا الرمز غير صالح أو تم استخدامه. جرب: RX001 أو RX002" : "This code is invalid or has been used. Try: RX001 or RX002",
        variant: "destructive",
      });
      return;
    }

    const prescriptionMedicines = medicines.filter(m => medicineIds.includes(m.id));
    
    setCart(prev => {
      const updated = [...prev];
      prescriptionMedicines.forEach(newItem => {
        const existingIndex = updated.findIndex(i => i.id === newItem.id);
        if (existingIndex >= 0) {
          updated[existingIndex].quantity += 1;
        } else {
          updated.push({ ...newItem, quantity: 1 });
        }
      });
      return updated;
    });

    toast({
      title: isArabic ? "تمت الإضافة" : "Added Successfully",
      description: isArabic ? "تمت إضافة أدوية الوصفة إلى السلة" : "Prescription medicines added to cart",
    });

    setPrescriptionCode("");
  };

  const addToCart = (medicine: Medicine) => {
    if (medicine.requires_prescription) {
      toast({
        title: isArabic ? "وصفة مطلوبة" : "Prescription Required",
        description: isArabic ? "هذا الدواء يتطلب وصفة طبية. استخدم رمز الوصفة لإضافته" : "This medicine requires a prescription. Use a prescription code to add it",
        variant: "destructive",
      });
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.id === medicine.id);
      if (existing) {
        return prev.map(item => 
          item.id === medicine.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...medicine, quantity: 1 }];
    });

    toast({
      title: isArabic ? "تمت الإضافة" : "Added to Cart",
      description: isArabic ? `تمت إضافة ${medicine.name_ar} إلى السلة` : `${medicine.name} added to cart`,
    });
  };

  const updateQuantity = (medicineId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === medicineId) {
          const newQuantity = item.quantity + delta;
          if (newQuantity <= 0) return item;
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const removeFromCart = (medicineId: string) => {
    setCart(prev => prev.filter(item => item.id !== medicineId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: isArabic ? "السلة فارغة" : "Cart Empty",
        description: isArabic ? "أضف منتجات إلى السلة أولاً" : "Add products to cart first",
        variant: "destructive",
      });
      return;
    }

    setIsCheckingOut(true);

    // Simulate checkout (local only, no network)
    setTimeout(() => {
      toast({
        title: isArabic ? "تم الطلب بنجاح!" : "Order Placed Successfully!",
        description: isArabic ? "سيتم التواصل معك قريباً" : "We will contact you soon",
      });

      setCart([]);
      setIsCartOpen(false);
      setIsCheckingOut(false);
    }, 1000);
  };

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = 
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.name_ar.includes(searchQuery);
    const matchesCategory = selectedCategory === "all" || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background" dir={isArabic ? 'rtl' : 'ltr'}>
      <Navbar />
      
      <main className="pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-500/10 via-background to-primary/10 py-12">
          <div className="container">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-start max-w-xl">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {isArabic ? "صيدلية ميدلينك" : "MEDLINK Pharmacy"}
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  {isArabic 
                    ? "احصل على أدويتك بكل سهولة. استخدم رمز الوصفة الطبية للحصول على أدويتك مباشرة"
                    : "Get your medicines with ease. Use your prescription code to get your medicines directly"}
                </p>
                
                {/* Prescription Code Input */}
                <Card className="p-4 bg-card/50 backdrop-blur">
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        value={prescriptionCode}
                        onChange={(e) => setPrescriptionCode(e.target.value)}
                        placeholder={isArabic ? "أدخل رمز الوصفة الطبية (مثال: RX001)" : "Enter prescription code (e.g. RX001)"}
                        className="pl-10"
                      />
                    </div>
                    <Button onClick={handlePrescriptionCode}>
                      {isArabic ? "تطبيق" : "Apply"}
                    </Button>
                  </div>
                </Card>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-2">
                    <Truck className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-sm text-muted-foreground">{isArabic ? "توصيل سريع" : "Fast Delivery"}</p>
                </div>
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-2">
                    <Package className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-sm text-muted-foreground">{isArabic ? "منتجات أصلية" : "Genuine Products"}</p>
                </div>
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="h-8 w-8 text-purple-600" />
                  </div>
                  <p className="text-sm text-muted-foreground">{isArabic ? "آمن وموثوق" : "Safe & Trusted"}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 border-b border-border sticky top-0 bg-background/95 backdrop-blur z-40">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isArabic ? "ابحث عن دواء..." : "Search medicines..."}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2 flex-wrap justify-center">
                {categories.map(category => (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.value)}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Medicines Grid */}
        <section className="py-8">
          <div className="container">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredMedicines.map((medicine) => (
                <Card key={medicine.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-green-500/20 to-primary/20 flex items-center justify-center">
                        <Pill className="h-7 w-7 text-green-600" />
                      </div>
                      {medicine.requires_prescription && (
                        <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-700">
                          {isArabic ? "بوصفة" : "Rx"}
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="font-semibold text-foreground mb-1">
                      {isArabic ? medicine.name_ar : medicine.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {isArabic ? medicine.description_ar : medicine.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">
                        ${medicine.price.toFixed(2)}
                      </span>
                      <Button 
                        size="sm" 
                        onClick={() => addToCart(medicine)}
                        disabled={medicine.requires_prescription}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        {isArabic ? "أضف" : "Add"}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredMedicines.length === 0 && (
              <div className="text-center py-16">
                <Pill className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-xl text-muted-foreground">
                  {isArabic ? "لم يتم العثور على أدوية" : "No medicines found"}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Floating Cart Button */}
        <div className="fixed bottom-6 left-6 z-50">
          <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="h-16 w-16 rounded-full shadow-lg relative">
                <ShoppingCart className="h-7 w-7" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  {isArabic ? "سلة التسوق" : "Shopping Cart"}
                </DialogTitle>
              </DialogHeader>
              
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">
                    {isArabic ? "السلة فارغة" : "Cart is empty"}
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {isArabic ? item.name_ar : item.name}
                        </p>
                        <p className="text-primary font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-500"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {cart.length > 0 && (
                <div className="border-t border-border pt-4 mt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold">
                      {isArabic ? "الإجمالي:" : "Total:"}
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut 
                      ? (isArabic ? "جاري الطلب..." : "Processing...")
                      : (isArabic ? "إتمام الطلب" : "Checkout")}
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pharmacy;
