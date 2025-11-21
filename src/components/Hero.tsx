import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-waffles.jpg";

const Hero = () => {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-chocolate/80 via-chocolate/60 to-golden/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] animate-fade-in">
          Waffles Land
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] max-w-2xl mx-auto font-medium">
          Where every waffle tells a story of warmth, flavor, and happiness
        </p>
        <Button 
          onClick={scrollToBooking}
          size="lg"
          className="bg-primary hover:bg-accent text-primary-foreground font-semibold px-8 py-6 text-lg shadow-warm transition-all hover:scale-105"
        >
          Reserve Your Table
        </Button>
      </div>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
