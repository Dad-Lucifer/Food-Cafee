import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import belgianWaffle from "@/assets/menu/belgian-waffle.jpg";
import powerBowl from "@/assets/menu/power-bowl.jpg";
import berryBliss from "@/assets/menu/berry-bliss.jpg";
import chickenWaffle from "@/assets/menu/chicken-waffle.jpg";
import veggieWaffle from "@/assets/menu/veggie-waffle.jpg";
import bbqPork from "@/assets/menu/bbq-pork.jpg";
import chocolateIndulgence from "@/assets/menu/chocolate-indulgence.jpg";
import caramelDream from "@/assets/menu/caramel-dream.jpg";
import strawberryCheesecake from "@/assets/menu/strawberry-cheesecake.jpg";

const menuItems = {
  breakfast: [
    {
      name: "Classic Belgian Waffle",
      price: "₹299",
      description: "Light and fluffy Belgian waffle served with maple syrup, butter, and fresh seasonal fruits",
      image: belgianWaffle,
      featured: true,
      detailedDescription: "Our signature Belgian waffle is made from a family recipe passed down through generations. The dough is rested for 24 hours to develop complex flavors, then cooked to golden perfection.",
      whyTry: "Experience the authentic taste of Belgium with every bite - the crispy exterior gives way to a fluffy interior that melts in your mouth."
    },
    {
      name: "Breakfast Power Bowl",
      price: "₹349",
      description: "Waffle base topped with scrambled eggs, crispy bacon, avocado, and hollandaise sauce",
      image: powerBowl,
      detailedDescription: "Start your day with this protein-packed breakfast bowl. Our waffle base is topped with farm-fresh eggs, crispy bacon, creamy avocado, and a house-made hollandaise sauce.",
      whyTry: "The perfect balance of carbs, protein, and healthy fats to fuel your day - this isn't just breakfast, it's a power boost."
    },
    {
      name: "Berry Bliss Waffle",
      price: "₹329",
      description: "Golden waffle with mixed berries, whipped cream, and honey drizzle",
      image: berryBliss,
      detailedDescription: "A delightful combination of seasonal berries atop our classic waffle base. We use locally sourced strawberries and wild blueberries, topped with freshly whipped cream.",
      whyTry: "Taste the freshness of hand-picked berries in every bite - the perfect balance of tart and sweet that will brighten your day."
    },
    {
      name: "Morning Coffee & Waffle Combo",
      price: "₹399",
      description: "Choice of waffle with premium coffee or fresh orange juice",
      image: belgianWaffle,
      detailedDescription: "The perfect morning pairing. Choose any of our classic waffles with a cup of our premium coffee, freshly brewed from single-origin beans, or a glass of freshly squeezed orange juice.",
      whyTry: "Start your morning right with this perfect combination - the caffeine kick and sugar rush you need to conquer your day."
    },
    {
      name: "Savory Herb Waffle",
      price: "₹319",
      description: "Herb-infused waffle with cream cheese, smoked salmon, and capers",
      image: powerBowl,
      detailedDescription: "Our herb-infused waffle is topped with creamy cream cheese, premium smoked salmon, and tangy capers. The herbs are sourced from our rooftop garden for maximum freshness.",
      whyTry: "For those who prefer savory over sweet - this sophisticated breakfast option will transport you to a Parisian café."
    }
  ],
  lunch: [
    {
      name: "Chicken & Waffle Supreme",
      price: "₹449",
      description: "Crispy fried chicken tenders on buttermilk waffles with spicy maple glaze",
      image: chickenWaffle,
      featured: true,
      detailedDescription: "Southern comfort meets Belgian tradition. Our chicken is marinated for 24 hours, double-fried for extra crispiness, and served on fluffy buttermilk waffles with our signature spicy maple glaze.",
      whyTry: "Experience the perfect harmony of crispy, tender, sweet, and spicy - this is the ultimate comfort food that will satisfy all your cravings."
    },
    {
      name: "Garden Veggie Waffle",
      price: "₹379",
      description: "Whole grain waffle topped with grilled vegetables, feta cheese, and balsamic reduction",
      image: veggieWaffle,
      detailedDescription: "A healthy yet delicious option featuring our whole grain waffle topped with a medley of grilled seasonal vegetables, crumbled feta cheese, and a drizzle of aged balsamic reduction.",
      whyTry: "Who said healthy can't be delicious? This colorful creation is packed with nutrients and flavors that will leave you feeling satisfied and energized."
    },
    {
      name: "BBQ Pulled Pork Waffle",
      price: "₹499",
      description: "Slow-cooked pulled pork on cornbread waffle with coleslaw and BBQ sauce",
      image: bbqPork,
      detailedDescription: "Our pulled pork is slow-cooked for 12 hours with a secret blend of spices, then served on a savory cornbread waffle with creamy coleslaw and our house-made BBQ sauce.",
      whyTry: "Tender, juicy, and full of flavor - this Southern-inspired dish will transport you to a backyard BBQ with every bite."
    },
    {
      name: "Mediterranean Delight",
      price: "₹419",
      description: "Waffle topped with hummus, grilled halloumi, olives, and sun-dried tomatoes",
      image: veggieWaffle,
      detailedDescription: "A Mediterranean twist on the classic waffle. Our savory waffle is topped with creamy hummus, grilled halloumi cheese, Kalamata olives, and sun-dried tomatoes.",
      whyTry: "Escape to the Mediterranean with this flavorful combination - the salty halloumi and tangy olives create a taste sensation like no other."
    },
    {
      name: "Waffle Club Sandwich",
      price: "₹389",
      description: "Two waffle halves with turkey, bacon, lettuce, tomato, and avocado mayo",
      image: chickenWaffle,
      detailedDescription: "Our take on the classic club sandwich uses two waffle halves instead of bread, layered with roasted turkey, crispy bacon, fresh lettuce, tomato, and our signature avocado mayo.",
      whyTry: "The best of both worlds - the comfort of a club sandwich with the deliciousness of waffles. It's a meal that will keep you coming back for more."
    }
  ],
  desserts: [
    {
      name: "Chocolate Indulgence",
      price: "₹279",
      description: "Double chocolate waffle with Nutella, chocolate chips, and vanilla ice cream",
      image: chocolateIndulgence,
      featured: true,
      detailedDescription: "For the ultimate chocolate lover, our double chocolate waffle is made with rich cocoa and studded with chocolate chips. Topped with warm Nutella and a scoop of premium vanilla ice cream.",
      whyTry: "This isn't just a dessert, it's a chocolate experience that will satisfy your deepest cocoa cravings and leave you in a state of pure bliss."
    },
    {
      name: "Caramel Dream",
      price: "₹259",
      description: "Waffle drizzled with salted caramel sauce, pecans, and caramel ice cream",
      image: caramelDream,
      detailedDescription: "Our golden waffle is drizzled with house-made salted caramel sauce, sprinkled with toasted pecans, and served with a scoop of rich caramel ice cream.",
      whyTry: "The perfect balance of sweet and salty - this dessert will satisfy your sweet tooth while delighting your taste buds with its complex flavors."
    },
    {
      name: "Strawberry Cheesecake Waffle",
      price: "₹299",
      description: "Waffle topped with cream cheese frosting, fresh strawberries, and graham cracker crumbs",
      image: strawberryCheesecake,
      detailedDescription: "A delightful fusion of two beloved desserts. Our waffle is topped with sweet cream cheese frosting, fresh strawberries, and a sprinkle of graham cracker crumbs.",
      whyTry: "Why choose between cheesecake and waffles when you can have both? This dessert combines the best of both worlds in one delicious bite."
    },
    {
      name: "Banana Foster Waffle",
      price: "₹329",
      description: "Waffle with caramelized bananas, rum sauce, and whipped cream",
      image: caramelDream,
      detailedDescription: "Our waffle is topped with bananas caramelized in butter, brown sugar, and a hint of rum, then finished with a dollop of fresh whipped cream.",
      whyTry: "A classic dessert with a waffle twist - the warm, caramelized bananas combined with our fluffy waffle create a dessert experience like no other."
    },
    {
      name: "S'mores Waffle",
      price: "₹289",
      description: "Chocolate waffle with marshmallow fluff, graham crackers, and chocolate drizzle",
      image: chocolateIndulgence,
      detailedDescription: "Recreate the campfire experience with our s'mores waffle. A chocolate waffle topped with gooey marshmallow fluff, crushed graham crackers, and a drizzle of chocolate sauce.",
      whyTry: "All the nostalgia of s'mores without the campfire - this dessert will transport you back to childhood summers with every bite."
    },
    {
      name: "Lemon Blueberry Delight",
      price: "₹269",
      description: "Light waffle with lemon curd, fresh blueberries, and powdered sugar",
      image: strawberryCheesecake,
      detailedDescription: "A refreshing dessert featuring our light and fluffy waffle topped with tangy lemon curd, fresh blueberries, and a dusting of powdered sugar.",
      whyTry: "The perfect balance of tart and sweet - this light dessert will cleanse your palate and leave you feeling refreshed and satisfied."
    }
  ]
};

// Lazy load images component
const LazyImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const imgElement = imgRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgElement) {
      observer.observe(imgElement);
    }

    return () => {
      if (imgElement) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
        />
      )}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
};

const Menu = () => {
  const [activeTab, setActiveTab] = useState("breakfast");
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [orientation, setOrientation] = useState("portrait");
  const [flippedCards, setFlippedCards] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
      setOrientation(window.innerHeight > window.innerWidth ? "portrait" : "landscape");
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Listen for orientation change
    window.addEventListener("orientationchange", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  const toggleCardFlip = (id) => {
    setFlippedCards(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section - Responsive for all screen sizes */}
      <section className="relative pt-24 md:pt-32 lg:pt-40 pb-12 md:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-block mb-4 md:mb-6">
            <span className="text-xs md:text-sm font-semibold tracking-wider text-primary uppercase px-3 md:px-4 py-1 md:py-2 bg-primary/10 rounded-full">
              Our Delicious Menu
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 md:mb-6 animate-fade-in">
            Crafted with <span className="text-primary">Love</span>
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-4">
            Every waffle is a masterpiece, handcrafted with premium ingredients and served with passion.
            From sunrise to sunset, we've got your cravings covered.
          </p>
        </div>
      </section>

      {/* Menu Content - Fully responsive */}
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="container mx-auto max-w-7xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Responsive Tab Design */}
            <div className="flex justify-center mb-8 md:mb-12 lg:mb-16">
              <TabsList className={`inline-flex bg-card/50 backdrop-blur-sm p-1 md:p-2 rounded-xl md:rounded-2xl shadow-warm border border-border/50 h-auto ${isMobile ? 'flex-col w-full max-w-xs' : 'flex-row'
                }`}>
                <TabsTrigger
                  value="breakfast"
                  className={`text-sm md:text-base lg:text-lg px-4 md:px-6 lg:px-8 py-3 md:py-4 rounded-lg md:rounded-xl data-[state=active]:bg-gradient-hero data-[state=active]:text-white data-[state=active]:shadow-warm transition-all ${isMobile ? 'w-full justify-start' : ''
                    }`}
                >
                  <span className="mr-2">🌅</span>
                  <span className={isMobile ? 'block' : 'inline'}>Breakfast</span>
                </TabsTrigger>
                <TabsTrigger
                  value="lunch"
                  className={`text-sm md:text-base lg:text-lg px-4 md:px-6 lg:px-8 py-3 md:py-4 rounded-lg md:rounded-xl data-[state=active]:bg-gradient-hero data-[state=active]:text-white data-[state=active]:shadow-warm transition-all ${isMobile ? 'w-full justify-start' : ''
                    }`}
                >
                  <span className="mr-2">🍽️</span>
                  <span className={isMobile ? 'block' : 'inline'}>Lunch</span>
                </TabsTrigger>
                <TabsTrigger
                  value="desserts"
                  className={`text-sm md:text-base lg:text-lg px-4 md:px-6 lg:px-8 py-3 md:py-4 rounded-lg md:rounded-xl data-[state=active]:bg-gradient-hero data-[state=active]:text-white data-[state=active]:shadow-warm transition-all ${isMobile ? 'w-full justify-start' : ''
                    }`}
                >
                  <span className="mr-2">🍰</span>
                  <span className={isMobile ? 'block' : 'inline'}>Desserts</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Breakfast Menu - Responsive Grid */}
            <TabsContent value="breakfast" className="mt-0">
              <div className={`grid gap-6 md:gap-8 ${isMobile ? 'grid-cols-1' :
                isTablet ? 'grid-cols-2' :
                  'lg:grid-cols-3'
                }`}>
                {menuItems.breakfast.map((item, index) => (
                  <div
                    key={index}
                    className={`relative h-96 md:h-[28rem] perspective-1000 ${item.featured ? (
                      isMobile ? 'col-span-1' :
                        isTablet ? 'md:col-span-2' :
                          'lg:col-span-2'
                    ) : ''
                      }`}
                  >
                    <div
                      className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${flippedCards.includes(`breakfast-${index}`) ? 'rotate-y-180' : ''
                        }`}
                      onClick={() => toggleCardFlip(`breakfast-${index}`)}
                    >
                      {/* Front of card */}
                      <div className="absolute w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-card">
                        <div className={`relative ${item.featured ? 'h-64 md:h-72 lg:h-80' : 'h-48 md:h-56 lg:h-64'} overflow-hidden`}>
                          <LazyImage
                            src={item.image}
                            alt={item.name}
                            className="group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2">
                              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                                {item.name}
                              </h3>
                              <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary bg-white px-3 py-1 rounded-full shadow-lg self-start sm:self-auto">
                                {item.price}
                              </span>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-4 md:p-6">
                          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                          <div className="mt-4 text-center">
                            <span className="text-xs text-primary font-medium">Click to learn more</span>
                          </div>
                        </CardContent>
                      </div>

                      {/* Back of card */}
                      <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-amber-100 to-orange-100">
                        <div className="p-6 h-full flex flex-col">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-amber-900 font-serif">
                              {item.name}
                            </h3>
                            <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary bg-white px-3 py-1 rounded-full shadow-lg">
                              {item.price}
                            </span>
                          </div>

                          <div className="flex items-center mb-4">
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
                            <div className="text-center">
                              <span className="text-xs text-amber-700">Click to go back</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Lunch Menu - Responsive Grid */}
            <TabsContent value="lunch" className="mt-0">
              <div className={`grid gap-6 md:gap-8 ${isMobile ? 'grid-cols-1' :
                isTablet ? 'grid-cols-2' :
                  'lg:grid-cols-3'
                }`}>
                {menuItems.lunch.map((item, index) => (
                  <div
                    key={index}
                    className={`relative h-96 md:h-[28rem] perspective-1000 ${item.featured ? (
                      isMobile ? 'col-span-1' :
                        isTablet ? 'md:col-span-2' :
                          'lg:col-span-2'
                    ) : ''
                      }`}
                  >
                    <div
                      className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${flippedCards.includes(`lunch-${index}`) ? 'rotate-y-180' : ''
                        }`}
                      onClick={() => toggleCardFlip(`lunch-${index}`)}
                    >
                      {/* Front of card */}
                      <div className="absolute w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-card">
                        <div className={`relative ${item.featured ? 'h-64 md:h-72 lg:h-80' : 'h-48 md:h-56 lg:h-64'} overflow-hidden`}>
                          <LazyImage
                            src={item.image}
                            alt={item.name}
                            className="group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2">
                              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                                {item.name}
                              </h3>
                              <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary bg-white px-3 py-1 rounded-full shadow-lg self-start sm:self-auto">
                                {item.price}
                              </span>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-4 md:p-6">
                          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                          <div className="mt-4 text-center">
                            <span className="text-xs text-primary font-medium">Click to learn more</span>
                          </div>
                        </CardContent>
                      </div>

                      {/* Back of card */}
                      <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-amber-100 to-orange-100">
                        <div className="p-6 h-full flex flex-col">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-amber-900 font-serif">
                              {item.name}
                            </h3>
                            <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary bg-white px-3 py-1 rounded-full shadow-lg">
                              {item.price}
                            </span>
                          </div>

                          <div className="flex items-center mb-4">
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
                            <div className="text-center">
                              <span className="text-xs text-amber-700">Click to go back</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Desserts Menu - Responsive Grid */}
            <TabsContent value="desserts" className="mt-0">
              <div className={`grid gap-6 md:gap-8 ${isMobile ? 'grid-cols-1' :
                isTablet ? 'grid-cols-2' :
                  'lg:grid-cols-3'
                }`}>
                {menuItems.desserts.map((item, index) => (
                  <div
                    key={index}
                    className={`relative h-96 md:h-[28rem] perspective-1000 ${item.featured ? (
                      isMobile ? 'col-span-1' :
                        isTablet ? 'md:col-span-2' :
                          'lg:col-span-2'
                    ) : ''
                      }`}
                  >
                    <div
                      className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${flippedCards.includes(`desserts-${index}`) ? 'rotate-y-180' : ''
                        }`}
                      onClick={() => toggleCardFlip(`desserts-${index}`)}
                    >
                      {/* Front of card */}
                      <div className="absolute w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-card">
                        <div className={`relative ${item.featured ? 'h-64 md:h-72 lg:h-80' : 'h-48 md:h-56 lg:h-64'} overflow-hidden`}>
                          <LazyImage
                            src={item.image}
                            alt={item.name}
                            className="group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2">
                              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                                {item.name}
                              </h3>
                              <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary bg-white px-3 py-1 rounded-full shadow-lg self-start sm:self-auto">
                                {item.price}
                              </span>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-4 md:p-6">
                          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                          <div className="mt-4 text-center">
                            <span className="text-xs text-primary font-medium">Click to learn more</span>
                          </div>
                        </CardContent>
                      </div>

                      {/* Back of card */}
                      <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-amber-100 to-orange-100">
                        <div className="p-6 h-full flex flex-col">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-amber-900 font-serif">
                              {item.name}
                            </h3>
                            <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary bg-white px-3 py-1 rounded-full shadow-lg">
                              {item.price}
                            </span>
                          </div>

                          <div className="flex items-center mb-4">
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
                            <div className="text-center">
                              <span className="text-xs text-amber-700">Click to go back</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action - Responsive */}
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-hero text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            Ready to Experience Pure Waffle Bliss?
          </h2>
          <p className="text-base md:text-lg mb-6 md:mb-8 text-white/90 px-4">
            Reserve your table now and treat yourself to an unforgettable dining experience
          </p>
          <a
            href="/#booking"
            className="inline-block bg-white text-primary px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-base md:text-lg hover:bg-background hover:scale-105 transition-all shadow-lg"
          >
            Book Your Table
          </a>
        </div>
      </section>

      <Footer />

      {/* CSS for flip animation */}
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
    </div>
  );
};

export default Menu;