import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { products } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";

export default function Shop() {
  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow pt-12 pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <h1 className="font-serif text-4xl lg:text-5xl mb-4 text-foreground">Shop All</h1>
            <p className="text-muted-foreground">Discover our complete collection of luxury home furnishings.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {products.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
