import { useEffect } from "react";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { PhilosophySection } from "@/components/philosophy-section";
import { ProductsSection } from "@/components/products-section";
import { AboutSection } from "@/components/about-section";
import { BenefitsSection } from "@/components/benefits-section";
import { InteractiveDemo } from "@/components/interactive-demo";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(anchor.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Update URL without page reload
          window.history.pushState(null, '', anchor.hash);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="font-sans text-gray-900 bg-white">
      <Header />
      <main>
        <HeroSection />
        <PhilosophySection />
        <ProductsSection />
        <InteractiveDemo />
        <BenefitsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
