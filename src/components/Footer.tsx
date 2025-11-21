import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Waffles Land</h3>
            <p className="text-secondary-foreground/80">
              Your destination for the most delicious waffles in town.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Location
            </h4>
            <p className="text-secondary-foreground/80">
              123 Waffle Street<br />
              Sweet City, SC 12345
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Hours
            </h4>
            <p className="text-secondary-foreground/80">
              Monday - Friday: 8am - 8pm<br />
              Saturday - Sunday: 9am - 9pm
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-secondary-foreground/80">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +91 654987321
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                hello@wafflesland.com
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8 text-center text-secondary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Waffles Land. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
