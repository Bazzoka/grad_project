import { Star, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: "15 years",
    rating: 4.9,
    reviews: 287,
    location: "Downtown Medical Center",
    fee: 150,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    verified: true,
    availableToday: true,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Dentist",
    experience: "12 years",
    rating: 4.8,
    reviews: 342,
    location: "City Dental Clinic",
    fee: 100,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    verified: true,
    availableToday: true,
  },
  {
    id: 3,
    name: "Dr. Emily Roberts",
    specialty: "Pediatrician",
    experience: "10 years",
    rating: 5.0,
    reviews: 456,
    location: "Children's Health Center",
    fee: 120,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    verified: true,
    availableToday: false,
  },
  {
    id: 4,
    name: "Dr. Ahmed Hassan",
    specialty: "Neurologist",
    experience: "18 years",
    rating: 4.9,
    reviews: 198,
    location: "Brain & Spine Institute",
    fee: 200,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
    verified: true,
    availableToday: true,
  },
];

const TopDoctors = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
              Top Rated Doctors
            </h2>
            <p className="text-lg text-muted-foreground">
              Trusted by thousands of patients
            </p>
          </div>
          <Link to="/doctors">
            <Button variant="outline" className="hidden md:flex">
              View All Doctors
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="group overflow-hidden border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="relative">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {doctor.availableToday && (
                  <Badge className="absolute right-3 top-3 bg-accent">
                    Available Today
                  </Badge>
                )}
                {doctor.verified && (
                  <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-primary/90 px-2 py-1 text-xs font-medium text-primary-foreground backdrop-blur-sm">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified
                  </div>
                )}
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {doctor.name}
                  </h3>
                  <p className="text-sm text-primary font-medium">
                    {doctor.specialty}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {doctor.experience} experience
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-foreground">{doctor.rating}</span>
                    <span className="text-muted-foreground">({doctor.reviews})</span>
                  </div>
                  <div className="font-semibold text-primary">
                    ${doctor.fee}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span className="line-clamp-1">{doctor.location}</span>
                </div>

                <Link to={`/doctor/${doctor.id}`} className="block">
                  <Button className="w-full" size="sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link to="/doctors">
            <Button variant="outline">View All Doctors</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopDoctors;
