import { Search, MapPin, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-medical.jpg";

const HeroSearch = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
      
      <div className="container relative py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
              <Stethoscope className="h-4 w-4" />
              Trusted Healthcare Platform
            </div>
            
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Find & Book
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Top Doctors
              </span>
              Near You
            </h1>
            
            <p className="text-lg text-muted-foreground md:text-xl">
              Search from thousands of verified doctors. Book appointments instantly and get the care you deserve.
            </p>

            <div className="rounded-2xl border border-border bg-card p-4 shadow-lg backdrop-blur-sm md:p-6">
              <div className="space-y-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="relative">
                    <Stethoscope className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      placeholder="Specialty or doctor name" 
                      className="h-12 pl-10"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      placeholder="Location" 
                      className="h-12 pl-10"
                    />
                  </div>
                </div>
                <Button size="lg" className="w-full text-base font-semibold">
                  <Search className="mr-2 h-5 w-5" />
                  Search Doctors
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                  <span className="text-lg font-bold text-accent">10K+</span>
                </div>
                <span className="text-muted-foreground">Verified Doctors</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-lg font-bold text-primary">50K+</span>
                </div>
                <span className="text-muted-foreground">Happy Patients</span>
              </div>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img 
                src={heroImage} 
                alt="Healthcare professionals" 
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 h-40 w-40 rounded-full bg-accent/20 blur-3xl"></div>
            <div className="absolute -left-6 -top-6 h-40 w-40 rounded-full bg-primary/20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSearch;
