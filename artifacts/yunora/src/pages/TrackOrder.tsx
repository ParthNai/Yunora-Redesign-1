import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import PageHero from "@/components/ui/PageHero";
import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { products } from "@/data/products";

export default function TrackOrder() {
  const [tracked, setTracked] = useState(false);
  const item = products[0];

  const steps = [
    { label: "Ordered", date: "Oct 24, 2023 10:00 AM", completed: true },
    { label: "Processing", date: "Oct 25, 2023 09:30 AM", completed: true },
    { label: "Shipped", date: "Oct 26, 2023 02:15 PM", completed: true },
    { label: "Out for Delivery", date: "Pending", completed: false },
    { label: "Delivered", date: "Pending", completed: false },
  ];

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow">
        <PageHero 
          title="Track Your Order" 
          subtitle="Enter your order details to see current status."
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Track Order" }]}
        />
        
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto">
            
            {!tracked ? (
              <div className="bg-card border border-border/30 p-8 rounded-lg shadow-sm">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Order ID</label>
                    <input type="text" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="e.g. YUN12345678" />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Phone Number / Email</label>
                    <input type="text" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Enter phone or email used for order" />
                  </div>
                  <button 
                    onClick={() => setTracked(true)}
                    className="w-full bg-primary text-primary-foreground py-4 text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors mt-4"
                  >
                    Track Now
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="bg-card border border-border/30 p-8 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-8 border-b border-border/50 pb-6">
                    <div>
                      <h2 className="font-serif text-2xl">Order #YUN12345678</h2>
                      <p className="text-sm text-muted-foreground mt-1">Placed on Oct 24, 2023</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Estimated Delivery</p>
                      <p className="font-medium">Oct 28, 2023</p>
                    </div>
                  </div>

                  <div className="relative pl-4 border-l border-border ml-4 space-y-10">
                    {steps.map((step, idx) => (
                      <div key={idx} className="relative">
                        <div className={`absolute -left-[25px] bg-card w-4 h-4 flex items-center justify-center`}>
                          {step.completed ? (
                            <CheckCircle2 className="w-6 h-6 text-primary bg-card" />
                          ) : (
                            <Circle className="w-5 h-5 text-muted-foreground bg-card" />
                          )}
                        </div>
                        <div className="pl-6">
                          <p className={`font-medium ${step.completed ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
                          <p className="text-xs text-muted-foreground mt-1">{step.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card border border-border/30 p-8 rounded-lg shadow-sm">
                  <h3 className="font-serif text-xl mb-6">Items in this shipment</h3>
                  <div className="flex gap-4">
                    <div className="w-20 h-24 bg-muted/30">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-serif text-lg">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: 1</p>
                      <p className="text-sm font-medium mt-1">₹{item.price.toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button onClick={() => setTracked(false)} className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
                    Track Another Order
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
