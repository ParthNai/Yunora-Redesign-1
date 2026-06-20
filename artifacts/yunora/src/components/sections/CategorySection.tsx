import { categories, products } from "@/data/products";
import CategoryCard from "@/components/ui/CategoryCard";
import ProductCard from "@/components/ui/ProductCard";
import { Link } from "wouter";

export default function CategorySection() {
  const featuredCategory = categories[0];
  const gridCategories = categories.slice(1, 5);
  const featuredProducts = products.slice(0, 2);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">Shop by Category</h2>
          </div>
          <Link href="/categories" className="text-sm font-medium tracking-widest text-primary hover:text-foreground transition-colors uppercase border-b border-primary pb-1">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left: Large Featured Category */}
          <div className="lg:col-span-5">
            <CategoryCard category={featuredCategory} featured />
          </div>

          {/* Right: Grid of categories & featured products */}
          <div className="lg:col-span-7 flex flex-col gap-6 lg:gap-8">
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              {gridCategories.slice(0, 2).map(cat => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              {featuredProducts.map((product, idx) => (
                <div key={product.id} className="hidden md:block">
                  <ProductCard product={product} index={idx} />
                </div>
              ))}
              {gridCategories.slice(2, 4).map(cat => (
                <div key={cat.id} className="md:hidden">
                  <CategoryCard category={cat} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
