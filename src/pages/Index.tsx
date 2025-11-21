import { useState, useEffect, Suspense, lazy } from 'react';
import { Loader } from 'lucide-react';

// Lazy load components with React.lazy for code splitting
const Navigation = lazy(() => import('@/components/Navigation'));
const Hero = lazy(() => import('@/components/Hero'));
const About = lazy(() => import('@/components/About'));
const Specialties = lazy(() => import('@/components/Specialties'));
const Gallery = lazy(() => import('@/components/Gallery'));
const BookingForm = lazy(() => import('@/components/BookingForm'));
const Footer = lazy(() => import('@/components/Footer'));

// Loading component for lazy loaded components
const SectionLoader = ({ height = 'h-96' }) => (
  <div className={`w-full ${height} flex items-center justify-center bg-gradient-to-b from-amber-50 to-orange-50`}>
    <div className="text-center">
      <Loader className="animate-spin h-8 w-8 text-amber-500 mx-auto" />
      <p className="mt-2 text-amber-700">Loading...</p>
    </div>
  </div>
);

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    // Set page title and meta tags
    document.title = "Waffle House - Delicious Belgian Waffles in Your City";

    // Add meta tags dynamically
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'Experience the finest Belgian waffles at Waffle House. Handcrafted with love using traditional recipes and the finest ingredients.';
    document.head.appendChild(metaDescription);

    const metaViewport = document.createElement('meta');
    metaViewport.name = 'viewport';
    metaViewport.content = 'width=device-width, initial-scale=1.0';
    document.head.appendChild(metaViewport);

    // Add favicon if not already present
    if (!document.querySelector('link[rel="icon"]')) {
      const favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.href = '/favicon.ico';
      document.head.appendChild(favicon);
    }

    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Handle scroll for parallax effects and active section tracking
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Determine which section is currently in view
      const sections = ['hero', 'about', 'specialties', 'gallery', 'booking'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href')?.substring(1);
        if (targetId) {
          const target = document.getElementById(targetId);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    // Observe all sections for animation
    setTimeout(() => {
      document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-amber-200 rounded-full animate-pulse"></div>
            <div className="absolute top-0 left-0 w-24 h-24 border-4 border-transparent border-t-amber-500 rounded-full animate-spin"></div>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-amber-900 font-serif">Waffle House</h2>
          <p className="mt-2 text-amber-700">Loading delicious waffles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Add CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .scroll-mt-16 {
          scroll-margin-top: 4rem;
        }
      `}</style>

      <Suspense fallback={<SectionLoader height="h-16" />}>
        <Navigation activeSection={activeSection} />
      </Suspense>

      <main>
        <section id="hero" className="scroll-mt-16">
          <Suspense fallback={<SectionLoader height="h-screen" />}>
            <Hero />
          </Suspense>
        </section>

        <section id="about" className="scroll-mt-16">
          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>
        </section>

        <section id="specialties" className="scroll-mt-16">
          <Suspense fallback={<SectionLoader />}>
            <Specialties />
          </Suspense>
        </section>

        <section id="gallery" className="scroll-mt-16">
          <Suspense fallback={<SectionLoader />}>
            <Gallery />
          </Suspense>
        </section>

        <section id="booking" className="scroll-mt-16">
          <Suspense fallback={<SectionLoader />}>
            <BookingForm />
          </Suspense>
        </section>
      </main>

      <footer>
        <Suspense fallback={<SectionLoader height="h-32" />}>
          <Footer />
        </Suspense>
      </footer>

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50 ${scrollY > 300 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
        aria-label="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default Index;