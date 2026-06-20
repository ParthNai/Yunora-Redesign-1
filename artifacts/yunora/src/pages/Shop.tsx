import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import PageHero from "@/components/ui/PageHero";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import { Filter, ChevronDown } from "lucide-react";

export default function Shop() {
  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow">
        <PageHero 
          title="Shop All" 
          subtitle="Discover our complete collection of luxury home furnishings."
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Shop All" }]}
        />
        
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 flex-shrink-0 space-y-10">
              <div className="flex items-center justify-between lg:hidden border-b border-border pb-4">
                <span className="font-serif text-xl">Filters</span>
                <Filter className="h-5 w-5" />
              </div>
              
              <div className="hidden lg:block space-y-10">
                <div>
                  <h3 className="font-serif text-xl mb-4 pb-2 border-b border-border/50">Categories</h3>
                  <ul className="space-y-3">
                    {categories.map(cat => (
                      <li key={cat.id}>
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input type="checkbox" className="accent-primary w-4 h-4 rounded-sm border-border/50 bg-transparent" />
                          <span className="text-muted-foreground group-hover:text-foreground transition-colors">{cat.name}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-serif text-xl mb-4 pb-2 border-b border-border/50">Price Range</h3>
                  <div className="space-y-4">
                    <input type="range" min="0" max="5000" className="w-full accent-primary" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>₹0</span>
                      <span>₹5000+</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-xl mb-4 pb-2 border-b border-border/50">Sort By</h3>
                  <div className="relative">
                    <select className="w-full appearance-none bg-transparent border border-border/50 py-2 pl-3 pr-10 text-sm focus:outline-none focus:border-primary">
                      <option>Featured</option>
                      <option>New Arrivals</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>
            </aside>
            
            {/* Product Grid */}
            <div className="flex-1">
              <div className="hidden lg:flex justify-between items-center mb-8 pb-4 border-b border-border/50">
                <p className="text-muted-foreground text-sm">Showing {products.length} products</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort:</span>
                  <select className="bg-transparent text-sm focus:outline-none cursor-pointer">
                    <option>Featured</option>
                    <option>Newest</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8">
                {products.map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={idx} />
                ))}
              </div>
              
              {/* Pagination */}
              <div className="mt-16 flex justify-center items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center border border-border/50 text-muted-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-50" disabled>&lt;</button>
                <button className="w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground">1</button>
                <button className="w-10 h-10 flex items-center justify-center border border-border/50 text-muted-foreground hover:bg-foreground hover:text-background transition-colors">2</button>
                <button className="w-10 h-10 flex items-center justify-center border border-border/50 text-muted-foreground hover:bg-foreground hover:text-background transition-colors">&gt;</button>
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
