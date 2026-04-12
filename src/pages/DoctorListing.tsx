import { useState } from "react";
import { Star, MapPin, Calendar, CheckCircle2, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
  {
    id: 5,
    name: "Dr. Lisa Martinez",
    specialty: "Dermatologist",
    experience: "8 years",
    rating: 4.7,
    reviews: 213,
    location: "Skin Care Center",
    fee: 130,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    verified: true,
    availableToday: true,
  },
  {
    id: 6,
    name: "Dr. James Wilson",
    specialty: "Orthopedist",
    experience: "20 years",
    rating: 4.9,
    reviews: 389,
    location: "Bone & Joint Clinic",
    fee: 180,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop",
    verified: true,
    availableToday: false,
  },
];

const DoctorListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
            Find Your Doctor
          </h1>
          <p className="text-muted-foreground">
            Browse through our network of verified healthcare professionals
          </p>
        </div>

        <div className="mb-8 rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-4">
            <Input
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="md:col-span-2"
            />
            <Select value={specialty} onValueChange={setSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="dentistry">Dentistry</SelectItem>
                <SelectItem value="pediatrics">Pediatrics</SelectItem>
                <SelectItem value="neurology">Neurology</SelectItem>
                <SelectItem value="dermatology">Dermatology</SelectItem>
                <SelectItem value="orthopedics">Orthopedics</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="experience">Most Experienced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {doctors.length} doctors
          </p>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="group overflow-hidden border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="relative">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
                    View Profile & Book
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DoctorListing;
