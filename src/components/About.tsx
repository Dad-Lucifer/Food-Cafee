import { Coffee, Heart, Award } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Coffee,
      title: "Freshly Made",
      description: "Every waffle is made to order with premium ingredients"
    },
    {
      icon: Heart,
      title: "Made with Love",
      description: "Crafted with passion and care in every bite"
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized for excellence in taste and quality"
    }
  ];

  return (
    <section className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Welcome to Waffles Land
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A cozy corner where golden waffles meet warm smiles. We believe in creating 
            moments of joy, one waffle at a time.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-card p-8 rounded-2xl shadow-soft hover:shadow-warm transition-all hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
