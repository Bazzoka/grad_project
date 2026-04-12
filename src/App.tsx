import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LocalAuthProvider } from "@/contexts/LocalAuthContext";
import Index from "./pages/Index";
import DoctorListing from "./pages/DoctorListing";
import DoctorProfile from "./pages/DoctorProfile";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientProfile from "./pages/PatientProfile";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Specialties from "./pages/Specialties";
import Pharmacy from "./pages/Pharmacy";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import JoinAsDoctor from "./pages/JoinAsDoctor";
import Benefits from "./pages/Benefits";
import Teleconsultation from "./pages/Teleconsultation";
import Chatbot from "./pages/Chatbot";
import NotFound from "./pages/NotFound";
import AIChatbot from "@/components/AIChatbot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <LocalAuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/doctors" element={<DoctorListing />} />
              <Route path="/doctor/:id" element={<DoctorProfile />} />
              <Route path="/dashboard" element={<DoctorDashboard />} />
              <Route path="/profile" element={<PatientProfile />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/about" element={<About />} />
              <Route path="/specialties" element={<Specialties />} />
              <Route path="/pharmacy" element={<Pharmacy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/join" element={<JoinAsDoctor />} />
              <Route path="/benefits" element={<Benefits />} />
              <Route path="/teleconsultation" element={<Teleconsultation />} />
              <Route path="/chatbot" element={<Chatbot />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <AIChatbot />
          </BrowserRouter>
        </TooltipProvider>
      </LocalAuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
