import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { useParams } from "wouter";
import { categories, products } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";

export default function Category() {
  const { slug } = useParams();
  const category = categories.find(c => c.slug === slug) || categories[0];
  const categoryProducts = products.filter(p => p.category === slug);
  
  const displayProducts = categoryProducts.length > 0 ? categoryProducts : products;

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow pt-12 pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="font-serif text-4xl lg:text-5xl mb-4 text-foreground capitalize">{category.name}</h1>
            <p className="text-muted-foreground">Explore our curated collection of premium {category.name.toLowerCase()}.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {displayProducts.map((product, idx) => (
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
