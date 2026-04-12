import { Heart, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <Heart className="h-5 w-5 text-primary-foreground" fill="currentColor" />
              </div>
              <span className="text-xl font-bold text-foreground">MEDLINK</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted healthcare booking platform. Find and book appointments with top doctors near you.
            </p>
            <div className="flex gap-3">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">For Patients</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/doctors" className="text-muted-foreground transition-colors hover:text-primary">
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link to="/specialties" className="text-muted-foreground transition-colors hover:text-primary">
                  Specialties
                </Link>
              </li>
              <li>
                <Link to="/teleconsult" className="text-muted-foreground transition-colors hover:text-primary">
                  Teleconsultation
                </Link>
              </li>
              <li>
                <Link to="/pharmacy" className="text-muted-foreground transition-colors hover:text-primary">
                  Pharmacy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">For Doctors</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/join" className="text-muted-foreground transition-colors hover:text-primary">
                  Join as Doctor
                </Link>
              </li>
              <li>
                <Link to="/benefits" className="text-muted-foreground transition-colors hover:text-primary">
                  Benefits
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground transition-colors hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground transition-colors hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground transition-colors hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground transition-colors hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MEDLINK. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
