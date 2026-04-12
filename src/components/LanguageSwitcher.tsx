import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Languages } from "lucide-react";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
      className="gap-2"
    >
      <Languages className="h-4 w-4" />
      {language === 'en' ? 'العربية' : 'English'}
    </Button>
  );
};

export default LanguageSwitcher;
