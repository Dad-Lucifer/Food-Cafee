import { useState } from 'react';
import { Star, Clock, Heart, IndianRupee, ArrowLeft, ChefHat } from 'lucide-react';
import belgianWaffleImg from '../assets/menu/belgian-waffle.jpg';
import chocolateIndulgenceImg from '../assets/menu/chocolate-indulgence.jpg';
import berryBlissImg from '../assets/menu/berry-bliss.jpg';
import caramelDreamImg from '../assets/menu/caramel-dream.jpg';

const Specialties = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const items = [
    {
      id: 1,
      name: "Classic Belgian",
      description: "Light, crispy, and golden perfection with pearl sugar",
      price: "180",
      image: belgianWaffleImg,
      rating: 4.8,
      prepTime: "12 mins",
      isPopular: true,
      detailedDescription: "Our signature Belgian waffle is made from a family recipe passed down through generations. The dough is rested for 24 hours to develop complex flavors, then cooked to golden perfection.",
      whyTry: "Experience the authentic taste of Belgium with every bite - the crispy exterior gives way to a fluffy interior that melts in your mouth."
    },
    {
      id: 2,
      name: "Chocolate Dream",
      description: "Rich chocolate waffle with premium cocoa and chocolate chips",
      price: "108",
      image: chocolateIndulgenceImg,
      rating: 4.9,
      prepTime: "10 mins",
      detailedDescription: "Indulge in our decadent chocolate waffle made with single-origin Belgian cocoa and studded with gourmet chocolate chips. Each waffle is drizzled with our house-made chocolate sauce.",
      whyTry: "Perfect for chocolate lovers - this isn't just a waffle, it's a chocolate experience that will satisfy your deepest cocoa cravings."
    },
    {
      id: 3,
      name: "Berry Bliss",
      description: "Fresh strawberries, blueberries, and whipped cream",
      price: "119",
      image: berryBlissImg,
      rating: 4.7,
      prepTime: "15 mins",
      isPopular: true,
      detailedDescription: "A delightful combination of seasonal berries atop our classic waffle base. We use locally sourced strawberries and wild blueberries, topped with freshly whipped cream.",
      whyTry: "Taste the freshness of hand-picked berries in every bite - the perfect balance of tart and sweet that will brighten your day."
    },
    {
      id: 4,
      name: "Maple Pecan",
      description: "Toasted pecans with warm maple syrup drizzle",
      price: "120",
      image: caramelDreamImg,
      rating: 4.6,
      prepTime: "12 mins",
      detailedDescription: "Southern comfort meets Belgian tradition. Our pecans are toasted in-house to bring out their nutty aroma, then paired with pure Vermont maple syrup.",
      whyTry: "Experience the perfect harmony of crunchy, sweet, and savory - this waffle is like a warm hug on a cold morning."
    }
  ];

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const toggleCardFlip = (id: number) => {
    setFlippedCards(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-amber-900 font-serif">
            Our Waffle Specialties
          </h2>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Handcrafted with love using traditional recipes and the finest ingredients
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative h-96 perspective-1000"
            >
              <div
                className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${flippedCards.includes(item.id) ? 'rotate-y-180' : ''
                  }`}
                onClick={() => toggleCardFlip(item.id)}
              >
                {/* Front of card */}
                <div className="absolute w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white">
                  {item.isPopular && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">
                      Customer Favorite
                    </div>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full z-10 shadow-md hover:bg-white transition-colors"
                  >
                    <Heart
                      className={`h-5 w-5 ${favorites.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                    />
                  </button>

                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 font-serif">
                      {item.name}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-amber-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm ml-1 text-gray-600">{item.rating}</span>
                      </div>

                      <div className="flex items-center text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-xs">{item.prepTime}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center">

                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-amber-100 to-orange-100">
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-amber-900 font-serif">
                        {item.name}
                      </h3>
                      <ArrowLeft className="h-5 w-5 text-amber-700" />
                    </div>

                    <div className="flex items-center mb-4">
                      <ChefHat className="h-5 w-5 text-amber-600 mr-2" />
                      <span className="text-sm text-amber-700 font-medium">Chef's Special</span>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-amber-800 mb-2 uppercase tracking-wide">About this dish</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {item.detailedDescription}
                        </p>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-amber-800 mb-2 uppercase tracking-wide">Why you'll love it</h4>
                        <p className="text-sm text-gray-700 leading-relaxed italic">
                          "{item.whyTry}"
                        </p>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-amber-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <IndianRupee className="h-5 w-5 text-amber-600" />
                          <span className="text-2xl font-bold text-amber-600">
                            {item.price}
                          </span>
                        </div>

                        <button
                          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md text-sm font-medium"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Add to cart functionality
                          }}
                        >
                          <a href="/#booking">
                            Book Now !
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
            <a href="/menu">View Full Menu</a>
          </button>
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

export default Specialties;