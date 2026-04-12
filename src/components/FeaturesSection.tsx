import { Calendar, Shield, Clock, Headphones } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Calendar,
    title: "Easy Booking",
    description: "Book appointments with just a few clicks. View available slots and confirm instantly.",
    color: "text-blue-500",
  },
  {
    icon: Shield,
    title: "Verified Doctors",
    description: "All our doctors are verified professionals with proven credentials and experience.",
    color: "text-green-500",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Our support team is available around the clock to assist with your healthcare needs.",
    color: "text-purple-500",
  },
  {
    icon: Headphones,
    title: "Teleconsultation",
    description: "Consult with doctors from the comfort of your home via video or phone calls.",
    color: "text-orange-500",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-gradient-to-b from-background to-secondary/30 py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
            Why Choose MEDLINK?
          </h2>
          <p className="text-lg text-muted-foreground">
            Your health is our priority. Here's what makes us different.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10">
                    <Icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
