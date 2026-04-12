import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, MapPin, Calendar, Clock, CheckCircle2, Award, Briefcase, GraduationCap, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const doctor = {
  id: 1,
  name: "Dr. Sarah Johnson",
  specialty: "Cardiologist",
  title: "MD, FACC",
  experience: "15 years",
  rating: 4.9,
  reviews: 287,
  location: "Downtown Medical Center",
  address: "123 Medical Plaza, Suite 400, New York, NY 10001",
  fee: 150,
  image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=600&fit=crop",
  verified: true,
  about: "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating cardiovascular diseases. She specializes in preventive cardiology, heart failure, and interventional procedures. Dr. Johnson completed her medical degree at Johns Hopkins University and her fellowship at Massachusetts General Hospital.",
  education: [
    { degree: "MD - Doctor of Medicine", institution: "Johns Hopkins University", year: "2006" },
    { degree: "Cardiology Fellowship", institution: "Massachusetts General Hospital", year: "2011" },
  ],
  experience_list: [
    { position: "Senior Cardiologist", institution: "Downtown Medical Center", period: "2015 - Present" },
    { position: "Interventional Cardiologist", institution: "City General Hospital", period: "2011 - 2015" },
  ],
  services: [
    "Cardiac Consultation",
    "ECG & Stress Testing",
    "Echocardiography",
    "Heart Disease Management",
    "Preventive Cardiology",
    "Interventional Procedures",
  ],
};

const timeSlots = [
  { day: "Today", date: "Dec 20", slots: ["10:00 AM", "2:00 PM", "4:00 PM"] },
  { day: "Tomorrow", date: "Dec 21", slots: ["9:00 AM", "11:00 AM", "3:00 PM", "5:00 PM"] },
  { day: "Fri", date: "Dec 22", slots: ["10:00 AM", "1:00 PM", "3:00 PM"] },
  { day: "Sat", date: "Dec 23", slots: ["9:00 AM", "12:00 PM"] },
];

const reviews = [
  {
    id: 1,
    name: "John Miller",
    rating: 5,
    date: "2 weeks ago",
    comment: "Dr. Johnson is exceptional! Very thorough and took the time to explain everything. Highly recommend.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    name: "Emma Davis",
    rating: 5,
    date: "1 month ago",
    comment: "Best cardiologist I've ever visited. Professional, caring, and knowledgeable.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    name: "Robert Chen",
    rating: 4,
    date: "2 months ago",
    comment: "Great experience overall. The wait time was a bit long but worth it for the quality of care.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  },
];

const DoctorProfile = () => {
  const { id } = useParams();
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string } | null>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");

  const handleBooking = () => {
    if (!selectedSlot) {
      toast.error("Please select a time slot");
      return;
    }
    setBookingStep(2);
  };

  const handleConfirmBooking = () => {
    if (!patientName || !patientPhone || !patientEmail) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    toast.success("Appointment booked successfully! You will receive a confirmation via email.");
    setBookingStep(1);
    setSelectedSlot(null);
    setPatientName("");
    setPatientPhone("");
    setPatientEmail("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8">
        <Link to="/doctors" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to Doctors
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden border-border bg-card">
              <div className="relative h-64 bg-gradient-to-r from-primary/10 to-accent/10">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="absolute bottom-0 left-8 h-48 w-48 rounded-t-2xl border-4 border-card object-cover shadow-xl"
                />
              </div>

              <div className="px-8 pb-6 pt-24">
                <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <h1 className="text-3xl font-bold text-foreground">{doctor.name}</h1>
                      {doctor.verified && (
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <p className="mb-1 text-lg font-medium text-primary">
                      {doctor.specialty} - {doctor.title}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {doctor.experience} experience
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {doctor.location}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="mb-1 flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-2xl font-bold text-foreground">{doctor.rating}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{doctor.reviews} reviews</p>
                  </div>
                </div>

                <Tabs defaultValue="about" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="services">Services</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="location">Location</TabsTrigger>
                  </TabsList>

                  <TabsContent value="about" className="space-y-6 pt-6">
                    <div>
                      <h3 className="mb-3 text-lg font-semibold text-foreground">About</h3>
                      <p className="text-muted-foreground">{doctor.about}</p>
                    </div>

                    <div>
                      <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
                        <GraduationCap className="h-5 w-5 text-primary" />
                        Education
                      </h3>
                      <div className="space-y-3">
                        {doctor.education.map((edu, index) => (
                          <div key={index} className="rounded-lg border border-border bg-secondary/30 p-4">
                            <p className="font-medium text-foreground">{edu.degree}</p>
                            <p className="text-sm text-muted-foreground">{edu.institution}</p>
                            <p className="text-xs text-muted-foreground">{edu.year}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
                        <Award className="h-5 w-5 text-primary" />
                        Experience
                      </h3>
                      <div className="space-y-3">
                        {doctor.experience_list.map((exp, index) => (
                          <div key={index} className="rounded-lg border border-border bg-secondary/30 p-4">
                            <p className="font-medium text-foreground">{exp.position}</p>
                            <p className="text-sm text-muted-foreground">{exp.institution}</p>
                            <p className="text-xs text-muted-foreground">{exp.period}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="services" className="space-y-4 pt-6">
                    <h3 className="text-lg font-semibold text-foreground">Services Offered</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {doctor.services.map((service, index) => (
                        <div key={index} className="flex items-center gap-2 rounded-lg border border-border bg-secondary/30 p-3">
                          <CheckCircle2 className="h-5 w-5 text-accent" />
                          <span className="text-sm text-foreground">{service}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews" className="space-y-4 pt-6">
                    <h3 className="text-lg font-semibold text-foreground">Patient Reviews</h3>
                    {reviews.map((review) => (
                      <Card key={review.id} className="border-border bg-secondary/30 p-4">
                        <div className="mb-3 flex items-start gap-3">
                          <Avatar>
                            <AvatarImage src={review.avatar} />
                            <AvatarFallback>{review.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="mb-1 flex items-center justify-between">
                              <p className="font-medium text-foreground">{review.name}</p>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-semibold">{review.rating}</span>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="location" className="space-y-4 pt-6">
                    <h3 className="text-lg font-semibold text-foreground">Clinic Location</h3>
                    <div className="rounded-lg border border-border bg-secondary/30 p-4">
                      <p className="mb-2 font-medium text-foreground">{doctor.location}</p>
                      <p className="text-sm text-muted-foreground">{doctor.address}</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </Card>
          </div>

          <div className="lg:sticky lg:top-24 lg:h-fit">
            <Card className="border-border bg-card p-6">
              <div className="mb-4 text-center">
                <p className="mb-1 text-sm text-muted-foreground">Consultation Fee</p>
                <p className="text-3xl font-bold text-primary">${doctor.fee}</p>
              </div>

              {bookingStep === 1 ? (
                <>
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                    <Calendar className="h-5 w-5 text-primary" />
                    Select Time Slot
                  </h3>
                  <div className="mb-6 space-y-4">
                    {timeSlots.map((daySlot) => (
                      <div key={daySlot.date}>
                        <p className="mb-2 text-sm font-medium text-foreground">
                          {daySlot.day} - {daySlot.date}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {daySlot.slots.map((time) => (
                            <Button
                              key={time}
                              variant={
                                selectedSlot?.day === daySlot.date && selectedSlot?.time === time
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() => setSelectedSlot({ day: daySlot.date, time })}
                              className="justify-start"
                            >
                              <Clock className="mr-2 h-3 w-3" />
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full" size="lg" onClick={handleBooking}>
                    Continue Booking
                  </Button>
                </>
              ) : (
                <>
                  <h3 className="mb-4 text-lg font-semibold text-foreground">
                    Patient Information
                  </h3>
                  <div className="mb-4 rounded-lg bg-secondary/50 p-3 text-sm">
                    <p className="text-muted-foreground">Selected slot:</p>
                    <p className="font-medium text-foreground">
                      {selectedSlot?.day} at {selectedSlot?.time}
                    </p>
                  </div>
                  <div className="mb-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full" size="lg" onClick={handleConfirmBooking}>
                      Confirm Booking
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setBookingStep(1)}
                    >
                      Back
                    </Button>
                  </div>
                </>
              )}
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DoctorProfile;
