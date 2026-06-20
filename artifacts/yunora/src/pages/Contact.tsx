import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import PageHero from "@/components/ui/PageHero";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow">
        <PageHero 
          title="Contact Us" 
          subtitle="We're here to assist you with any inquiries about our collections."
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
        />
        
        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Form */}
            <div>
              <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">Get In Touch</span>
              <h2 className="font-serif text-4xl mb-8">Send a Message</h2>
              
              <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Name*</label>
                    <input type="text" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Your Name" required />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Email*</label>
                    <input type="email" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Your Email" required />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Phone</label>
                  <input type="tel" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Your Phone Number" />
                </div>
                
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Subject*</label>
                  <select className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" required>
                    <option value="" disabled selected>Select a subject</option>
                    <option value="order">Order Inquiry</option>
                    <option value="product">Product Information</option>
                    <option value="warranty">Warranty Claim</option>
                    <option value="business">Business Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Message*</label>
                  <textarea 
                    className="w-full border border-border/50 p-4 text-sm focus:outline-none focus:border-primary bg-transparent min-h-[150px] resize-none mt-2" 
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="bg-primary text-primary-foreground px-10 py-4 text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors mt-4">
                  Send Message
                </button>
              </form>
            </div>

            {/* Info & Map */}
            <div className="space-y-12">
              <div>
                <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">Contact Details</span>
                <h2 className="font-serif text-4xl mb-8">Our Headquarters</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="flex gap-4">
                    <MapPin className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h3 className="font-serif text-xl mb-2">Address</h3>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed">
                        YUNORA Luxury Furnishings<br />
                        123 Luxury Lane, Phase 1<br />
                        Panipat, Haryana 132103<br />
                        India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Phone className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h3 className="font-serif text-xl mb-2">Phone</h3>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed">
                        +91 98765 43210<br />
                        +91 98765 43211
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Mail className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h3 className="font-serif text-xl mb-2">Email</h3>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed">
                        support@yunora.com<br />
                        sales@yunora.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Clock className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h3 className="font-serif text-xl mb-2">Hours</h3>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed">
                        Mon-Sat: 9:00 AM - 6:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-[#EFE9E1] w-full h-[300px] rounded-lg border border-border/30 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CgkJPHBhdGggZD0iTTAgMGg0MHY0MEgwem0yMCAyMGM1LjUgMCAxMC00LjUgMTAtMTBTMjUuNSAwIDIwIDAgMTAgNC41IDEwIDEwczQuNSAxMCAxMCAxMHoiIGZpbGw9IiNkNGQ0ZDQiIGZpbGwtb3BhY2l0eT0iLjIiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgoJPC9zdmc+')] opacity-50"></div>
                <div className="text-center z-10">
                  <MapPin className="h-10 w-10 text-primary mx-auto mb-2" />
                  <p className="font-serif text-lg text-foreground">YUNORA Headquarters</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
