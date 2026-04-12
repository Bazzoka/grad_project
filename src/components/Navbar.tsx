import { Button } from "@/components/ui/button";
import { Heart, Menu, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocalAuth } from "@/contexts/LocalAuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const Navbar = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const isArabic = language === 'ar';
  const { user, loading, signOut } = useLocalAuth();

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  const handleProfileClick = () => {
    if (user?.role === 'doctor') {
      navigate('/dashboard');
    } else {
      navigate('/profile');
    }
  };

  const navLinks = [
    { to: "/", label: t('home') },
    { to: "/doctors", label: t('findDoctors') },
    { to: "/specialties", label: t('specialties') },
    { to: "/pharmacy", label: t('pharmacy') },
    { to: "/teleconsultation", label: isArabic ? "الاستشارات" : "Teleconsult" },
    { to: "/chatbot", label: isArabic ? "المساعد الذكي" : "AI Assistant" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <Heart className="h-5 w-5 text-primary-foreground" fill="currentColor" />
          </div>
          <span className="text-xl font-bold text-foreground">MEDLINK</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.to}
              to={link.to} 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          
          {!loading && (
            <>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="hidden md:flex">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleProfileClick}>
                      {user.role === 'doctor' 
                        ? (isArabic ? "لوحة التحكم" : "Dashboard")
                        : (isArabic ? "السجل الطبي" : "Medical Profile")
                      }
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      {isArabic ? "تسجيل الخروج" : "Sign Out"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="icon" className="hidden md:flex" asChild>
                  <Link to="/auth">
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
              )}
              
              {user ? (
                <Button className="hidden md:flex" onClick={handleSignOut}>
                  {isArabic ? "تسجيل الخروج" : "Sign Out"}
                </Button>
              ) : (
                <Button className="hidden md:flex" asChild>
                  <Link to="/auth">{t('login')}</Link>
                </Button>
              )}
            </>
          )}
          
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={isArabic ? "right" : "left"} className="w-[280px] sm:w-[320px]">
              <div className="flex flex-col gap-6 mt-6">
                <div className="flex items-center gap-2 pb-4 border-b">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                    <Heart className="h-5 w-5 text-primary-foreground" fill="currentColor" />
                  </div>
                  <span className="text-xl font-bold text-foreground">MEDLINK</span>
                </div>
                
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.to}>
                      <Link 
                        to={link.to} 
                        className="flex items-center py-3 px-4 rounded-lg text-foreground hover:bg-secondary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                <div className="border-t pt-4 space-y-2">
                  {!loading && (
                    <>
                      {user ? (
                        <>
                          <SheetClose asChild>
                            <Button 
                              variant="outline" 
                              className="w-full justify-start gap-2"
                              onClick={handleProfileClick}
                            >
                              <User className="h-4 w-4" />
                              {user.role === 'doctor' 
                                ? (isArabic ? "لوحة التحكم" : "Dashboard")
                                : (isArabic ? "السجل الطبي" : "Medical Profile")
                              }
                            </Button>
                          </SheetClose>
                          <SheetClose asChild>
                            <Button 
                              variant="destructive" 
                              className="w-full justify-start gap-2"
                              onClick={handleSignOut}
                            >
                              <LogOut className="h-4 w-4" />
                              {isArabic ? "تسجيل الخروج" : "Sign Out"}
                            </Button>
                          </SheetClose>
                        </>
                      ) : (
                        <SheetClose asChild>
                          <Button className="w-full" asChild>
                            <Link to="/auth">{t('login')}</Link>
                          </Button>
                        </SheetClose>
                      )}
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
