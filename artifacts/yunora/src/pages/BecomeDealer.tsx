import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import PageHero from "@/components/ui/PageHero";
import catCurtains from "@/assets/cat-curtains.png";
import catSofaFabrics from "@/assets/cat-sofa-fabrics.png";

export default function BecomeDealer() {
  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow">
        {/* Large Hero */}
        <div className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-foreground">
          <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
            <img src={catCurtains} alt="Become a Dealer" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <h1 className="font-serif text-5xl lg:text-7xl mb-6">Grow With YUNORA</h1>
            <p className="text-lg text-white/80 font-light max-w-2xl mx-auto mb-8">Join our network of premium retail partners and bring India's finest luxury home furnishings to your discerning customers.</p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            <div className="space-y-12 pr-0 lg:pr-12">
              <div>
                <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">Why Partner With Us</span>
                <h2 className="font-serif text-4xl mb-6">The YUNORA Advantage</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-8">
                  As a YUNORA dealer, you're not just selling products; you're offering an experience. We provide our partners with comprehensive support to ensure mutual growth and success in the luxury retail space.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-card p-6 border border-border/30 rounded-lg shadow-sm">
                  <h3 className="font-serif text-xl mb-3 text-primary">High Margins</h3>
                  <p className="text-sm text-muted-foreground font-light">Competitive wholesale pricing ensuring excellent profitability for your retail business.</p>
                </div>
                <div className="bg-card p-6 border border-border/30 rounded-lg shadow-sm">
                  <h3 className="font-serif text-xl mb-3 text-primary">Marketing Support</h3>
                  <p className="text-sm text-muted-foreground font-light">Access to high-quality visual assets, catalogs, and co-branded marketing materials.</p>
                </div>
                <div className="bg-card p-6 border border-border/30 rounded-lg shadow-sm">
                  <h3 className="font-serif text-xl mb-3 text-primary">Exclusive Products</h3>
                  <p className="text-sm text-muted-foreground font-light">Early access to new collections and dealer-exclusive product lines.</p>
                </div>
                <div className="bg-card p-6 border border-border/30 rounded-lg shadow-sm">
                  <h3 className="font-serif text-xl mb-3 text-primary">Training</h3>
                  <p className="text-sm text-muted-foreground font-light">Comprehensive product knowledge and sales training for your showroom staff.</p>
                </div>
              </div>

              <div className="relative aspect-[4/3] w-full hidden lg:block">
                <img src={catSofaFabrics} alt="Dealer Experience" className="w-full h-full object-cover rounded-lg shadow-sm" />
              </div>
            </div>

            <div className="bg-card border border-border/30 rounded-lg p-8 lg:p-12 shadow-sm sticky top-24">
              <h2 className="font-serif text-3xl mb-2">Dealer Application</h2>
              <p className="text-muted-foreground mb-8">Please fill out the form below to initiate the partnership process.</p>

              <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Business Name*</label>
                    <input type="text" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Company Name" required />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Owner Name*</label>
                    <input type="text" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Full Name" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Email Address*</label>
                    <input type="email" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Email" required />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Phone Number*</label>
                    <input type="tel" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Phone" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">City*</label>
                    <input type="text" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="City" required />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">State*</label>
                    <input type="text" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="State" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Business Type*</label>
                  <select className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" required>
                    <option value="" disabled selected>Select Business Type</option>
                    <option value="retail">Retail Showroom</option>
                    <option value="interior">Interior Designer</option>
                    <option value="distributor">Distributor</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Message (Optional)</label>
                  <textarea 
                    className="w-full border border-border/50 p-4 text-sm focus:outline-none focus:border-primary bg-transparent min-h-[120px] resize-none mt-2" 
                    placeholder="Tell us a bit about your current business and brands you carry..."
                  ></textarea>
                </div>

                <button type="submit" className="w-full bg-primary text-primary-foreground py-4 text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors mt-4">
                  Apply Now
                </button>
                <p className="text-xs text-muted-foreground text-center mt-4">Our partnership team will review your application and contact you within 2-3 business days.</p>
              </form>
            </div>

          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
