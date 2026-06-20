import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { Search as SearchIcon } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";

export default function Search() {
  const query = "curtains"; // Hardcoded for demo purposes
  const results = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow pt-12 pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h1 className="font-serif text-4xl mb-8">Search Results</h1>
            <div className="relative">
              <input 
                type="text" 
                defaultValue={query}
                className="w-full border-b-2 border-foreground py-4 pl-12 pr-4 text-xl focus:outline-none bg-transparent" 
                placeholder="Search products..." 
              />
              <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
            </div>
          </div>

          <div className="mb-8 border-b border-border/50 pb-4">
            <p className="font-serif text-xl">{results.length} results for "{query}"</p>
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              {results.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/20 border border-border rounded-lg max-w-2xl mx-auto">
              <p className="text-muted-foreground text-lg mb-4">No results found for your search.</p>
              <p className="text-sm font-light">Try checking your spelling or using more general terms.</p>
            </div>
          )}

        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
