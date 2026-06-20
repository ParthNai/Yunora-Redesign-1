import { motion } from "framer-motion";
import { Link } from "wouter";
import { heroImages } from "@/data/products";

export default function Hero() {
  return (
    <section className="relative w-full h-[85vh] lg:h-[90vh] bg-muted overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImages[0]} alt="Hero background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="relative container mx-auto px-4 lg:px-8 h-full flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl"
        >
          <p className="text-white/80 text-sm md:text-base tracking-[0.3em] uppercase font-medium mb-6">Welcome to YUNORA</p>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-white leading-[1.1] mb-8">
            Luxury Furnishing Crafted For <br/><span className="italic">Elegant Living</span>
          </h1>
          
          <p className="text-white/90 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10">
            Transforming homes with timeless designs, premium fabrics and exceptional craftsmanship.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/shop" 
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-sm font-medium tracking-widest transition-colors"
              data-testid="button-hero-shop"
            >
              SHOP COLLECTION
            </Link>
            <Link 
              href="/categories" 
              className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border border-white px-8 py-4 text-sm font-medium tracking-widest transition-colors"
              data-testid="button-hero-categories"
            >
              EXPLORE CATEGORIES
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
        <div className="w-12 h-1 bg-white"></div>
        <div className="w-12 h-1 bg-white/30"></div>
        <div className="w-12 h-1 bg-white/30"></div>
      </div>
    </section>
  );
}
