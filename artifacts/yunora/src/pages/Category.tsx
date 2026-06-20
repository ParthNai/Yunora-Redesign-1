import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import PageHero from "@/components/ui/PageHero";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import { useParams } from "wouter";

export default function Category() {
  const { slug } = useParams();
  
  const category = categories.find(c => c.slug === slug) || categories[0];
  const categoryProducts = products.filter(p => p.category === category.slug);
  const displayProducts = categoryProducts.length > 0 ? categoryProducts : products.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow">
        {/* Category Hero with image background */}
        <div className="relative h-64 lg:h-96 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          <div className="relative z-10 text-center text-white">
            <p className="text-sm font-medium tracking-widest uppercase mb-2">Category</p>
            <h1 className="font-serif text-5xl lg:text-7xl">{category.name}</h1>
          </div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Minimal Sidebar for Category */}
            <aside className="w-full lg:w-64 flex-shrink-0 space-y-10 hidden lg:block">
              <div>
                <h3 className="font-serif text-xl mb-4 pb-2 border-b border-border/50">Subcategories</h3>
                <ul className="space-y-3">
                  <li><button className="text-primary font-medium hover:text-primary transition-colors">All {category.name}</button></li>
                  <li><button className="text-muted-foreground hover:text-foreground transition-colors">Premium</button></li>
                  <li><button className="text-muted-foreground hover:text-foreground transition-colors">Everyday</button></li>
                </ul>
              </div>
            </aside>
            
            {/* Product Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8">
                {displayProducts.map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={idx} />
                ))}
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
