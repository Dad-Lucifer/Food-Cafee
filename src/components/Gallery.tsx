import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

import interior1 from "@/assets/gallery-interior-1.jpg";
import interior2 from "@/assets/gallery-interior-2.jpg";
import waffles1 from "@/assets/gallery-waffles-1.jpg";
import waffles2 from "@/assets/gallery-waffles-2.jpg";
import coffee from "@/assets/gallery-coffee.jpg";
import atmosphere from "@/assets/gallery-atmosphere.jpg";

const galleryImages = [
  { src: interior1, alt: "Cozy cafe interior with warm lighting" },
  { src: waffles1, alt: "Belgian waffles with fresh berries" },
  { src: interior2, alt: "Cafe counter and coffee bar" },
  { src: waffles2, alt: "Chocolate waffles with caramel" },
  { src: coffee, alt: "Cappuccino with latte art" },
  { src: atmosphere, alt: "Window seat with afternoon sunlight" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Gallery
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Take a visual journey through our cozy cafe, delicious creations, and warm atmosphere
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer shadow-warm hover:shadow-soft transition-all duration-300"
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-chocolate/0 group-hover:bg-chocolate/20 transition-colors duration-300" />
            </div>
          ))}
        </div>

        <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-7xl w-full p-0 bg-background/95 border-border">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-50 rounded-full p-2 bg-background/80 hover:bg-background transition-colors"
            >
              <X className="h-6 w-6 text-foreground" />
            </button>
            {selectedImage !== null && (
              <div className="relative w-full h-[80vh] flex items-center justify-center p-4">
                <img
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Gallery;
