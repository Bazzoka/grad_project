import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    home: "Home",
    findDoctors: "Find Doctors",
    specialties: "Specialties",
    pharmacy: "Pharmacy",
    about: "About",
    login: "Login",
    signup: "Sign Up",
    switchToArabic: "العربية",
    switchToEnglish: "English",
  },
  ar: {
    home: "الرئيسية",
    findDoctors: "ابحث عن طبيب",
    specialties: "التخصصات",
    pharmacy: "الصيدلية",
    about: "عن المنصة",
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    switchToArabic: "العربية",
    switchToEnglish: "English",
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
