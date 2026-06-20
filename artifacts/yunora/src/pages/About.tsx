import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import PageHero from "@/components/ui/PageHero";
import hero1 from "@/assets/hero-1.png";
import catCurtains from "@/assets/cat-curtains.png";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow">
        <PageHero 
          title="About YUNORA" 
          subtitle="Crafting luxury living spaces since 2008."
          breadcrumb={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        />
        
        {/* Brand Story */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-[4/5] lg:aspect-auto lg:h-[700px]">
                <img src={hero1} alt="YUNORA Heritage" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-8">
                <span className="text-primary text-sm font-medium tracking-widest uppercase">Our Heritage</span>
                <h2 className="font-serif text-4xl lg:text-5xl leading-tight">A Legacy of Exceptional Craftsmanship</h2>
                <p className="text-muted-foreground text-lg leading-relaxed font-light">
                  Founded with a vision to transform houses into deeply personal luxury homes, YUNORA has spent over a decade perfecting the art of home furnishings. What started as a small artisan workshop in Panipat has blossomed into India's premier luxury furnishing brand.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed font-light">
                  We believe that the textiles surrounding you should not only look exquisite but feel extraordinary. Every thread we weave, every pattern we design, and every product we finish carries our uncompromising commitment to quality and timeless aesthetics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x divide-primary-foreground/20">
              <div className="p-4">
                <p className="font-serif text-5xl lg:text-6xl mb-2">15+</p>
                <p className="text-sm tracking-widest uppercase opacity-80">Years Experience</p>
              </div>
              <div className="p-4">
                <p className="font-serif text-5xl lg:text-6xl mb-2">500+</p>
                <p className="text-sm tracking-widest uppercase opacity-80">Dealers</p>
              </div>
              <div className="p-4">
                <p className="font-serif text-5xl lg:text-6xl mb-2">10k+</p>
                <p className="text-sm tracking-widest uppercase opacity-80">Products</p>
              </div>
              <div className="p-4">
                <p className="font-serif text-5xl lg:text-6xl mb-2">98%</p>
                <p className="text-sm tracking-widest uppercase opacity-80">Satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 lg:py-32 bg-muted/20">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">Core Principles</span>
            <h2 className="font-serif text-4xl lg:text-5xl mb-16">The YUNORA Standard</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="h-16 w-16 mx-auto border border-foreground rounded-full flex items-center justify-center mb-6">
                  <span className="font-serif text-2xl">01</span>
                </div>
                <h3 className="font-serif text-2xl">Uncompromising Quality</h3>
                <p className="text-muted-foreground font-light leading-relaxed">We source only the finest raw materials globally, ensuring every product meets our rigorous standards for durability and comfort.</p>
              </div>
              <div className="space-y-4">
                <div className="h-16 w-16 mx-auto border border-foreground rounded-full flex items-center justify-center mb-6">
                  <span className="font-serif text-2xl">02</span>
                </div>
                <h3 className="font-serif text-2xl">Master Craftsmanship</h3>
                <p className="text-muted-foreground font-light leading-relaxed">Our artisans blend traditional techniques with modern innovation to create pieces that are technically flawless and aesthetically perfect.</p>
              </div>
              <div className="space-y-4">
                <div className="h-16 w-16 mx-auto border border-foreground rounded-full flex items-center justify-center mb-6">
                  <span className="font-serif text-2xl">03</span>
                </div>
                <h3 className="font-serif text-2xl">Sustainable Luxury</h3>
                <p className="text-muted-foreground font-light leading-relaxed">We are committed to ethical manufacturing processes that respect both our craftspeople and the environment we all share.</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
