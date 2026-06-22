import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import PageHero from "@/components/ui/PageHero";
import { Search, MapPin, Phone, Navigation2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const STATIC_STORES = [
  { businessName: "YUNORA Flagship - Delhi", city: "New Delhi", phone: "+91 98111 22233" },
  { businessName: "Luxury Interiors - Mumbai", city: "Mumbai", phone: "+91 98222 33344" },
  { businessName: "Premium Decor - Bangalore", city: "Bangalore", phone: "+91 98333 44455" },
  { businessName: "YUNORA Studio - Hyderabad", city: "Hyderabad", phone: "+91 98444 55566" },
];

export default function StoreLocator() {
  const [cityInput, setCityInput] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  const { data: dealers, isLoading } = useQuery({
    queryKey: ["dealers", cityFilter],
    queryFn: () => api.dealers(cityFilter || undefined),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const stores = dealers && dealers.length > 0 ? dealers : STATIC_STORES;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCityFilter(cityInput.trim());
  };

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow">
        <PageHero
          title="Store Locator"
          subtitle="Find an authorized YUNORA dealer or flagship store near you."
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Store Locator" }]}
        />

        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
          <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-12 relative">
            <input
              type="text"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              className="w-full bg-card border border-border/50 py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary shadow-sm rounded-lg"
              placeholder="Search by city..."
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-2 text-xs font-medium uppercase tracking-widest rounded hover:bg-primary/90 transition-colors"
            >
              Search
            </button>
          </form>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 h-[600px]">

            <div className="w-full lg:w-1/3 flex flex-col h-full overflow-y-auto border border-border/30 rounded-lg bg-card shadow-sm">
              <div className="p-4 border-b border-border/50 bg-muted/10 sticky top-0 z-10">
                {isLoading ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="font-serif text-lg">Searching...</span>
                  </div>
                ) : (
                  <p className="font-serif text-lg">{stores.length} Store{stores.length !== 1 ? "s" : ""} Found</p>
                )}
              </div>
              <div className="divide-y divide-border/50">
                {stores.map((store, idx) => (
                  <div key={idx} className="p-6 hover:bg-muted/5 transition-colors cursor-pointer group">
                    <h3 className="font-serif text-xl mb-3 group-hover:text-primary transition-colors">{store.businessName}</h3>
                    <div className="space-y-2 text-sm text-muted-foreground font-light mb-4">
                      <div className="flex gap-3 items-center">
                        <MapPin className="h-4 w-4 shrink-0" />
                        <span>{store.city}</span>
                      </div>
                      {store.phone && (
                        <div className="flex gap-3 items-center">
                          <Phone className="h-4 w-4 shrink-0" />
                          <span>{store.phone}</span>
                        </div>
                      )}
                    </div>
                    <button className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-primary border border-primary px-4 py-2 rounded hover:bg-primary hover:text-primary-foreground transition-colors w-full justify-center">
                      <Navigation2 className="h-3 w-3" /> Get Directions
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 bg-[#EFE9E1] rounded-lg border border-border/30 relative overflow-hidden hidden lg:block">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CgkJPHBhdGggZD0iTTAgMGg0MHY0MEgwem0yMCAyMGM1LjUgMCAxMC00LjUgMTAtMTBTMjUuNSAwIDIwIDAgMTAgNC41IDEwIDEwczQuNSAxMCAxMCAxMHoiIGZpbGw9IiNkNGQ0ZDQiIGZpbGwtb3BhY2l0eT0iLjIiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgoJPC9zdmc+')] opacity-50" />
              <div className="absolute top-[30%] left-[40%] flex flex-col items-center group cursor-pointer">
                <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded shadow-md mb-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Delhi</div>
                <MapPin className="h-8 w-8 text-primary fill-primary/20 drop-shadow-md" />
              </div>
              <div className="absolute top-[60%] left-[30%] flex flex-col items-center group cursor-pointer">
                <div className="bg-foreground text-background text-xs px-2 py-1 rounded shadow-md mb-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Mumbai</div>
                <MapPin className="h-8 w-8 text-foreground fill-foreground/20 drop-shadow-md" />
              </div>
              <div className="absolute top-[40%] left-[60%] flex flex-col items-center group cursor-pointer">
                <div className="bg-foreground text-background text-xs px-2 py-1 rounded shadow-md mb-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Bangalore</div>
                <MapPin className="h-8 w-8 text-foreground fill-foreground/20 drop-shadow-md" />
              </div>
              <div className="absolute top-[70%] left-[50%] flex flex-col items-center group cursor-pointer">
                <div className="bg-foreground text-background text-xs px-2 py-1 rounded shadow-md mb-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Hyderabad</div>
                <MapPin className="h-8 w-8 text-foreground fill-foreground/20 drop-shadow-md" />
              </div>
              <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-border/50 text-xs text-muted-foreground flex gap-4">
                <div className="flex items-center gap-2"><MapPin className="h-3 w-3 text-primary" /> Flagship</div>
                <div className="flex items-center gap-2"><MapPin className="h-3 w-3 text-foreground" /> Authorized Dealer</div>
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
