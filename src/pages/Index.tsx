import Navbar from "@/components/Navbar";
import HeroSearch from "@/components/HeroSearch";
import HomepageSpecialties from "@/components/HomepageSpecialties";
import TopDoctors from "@/components/TopDoctors";
import FeaturesSection from "@/components/FeaturesSection";
import PharmacyAd from "@/components/PharmacyAd";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSearch />
        <HomepageSpecialties />
        <PharmacyAd />
        <TopDoctors />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
