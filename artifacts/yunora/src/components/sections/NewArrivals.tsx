import { products } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";

export default function NewArrivals() {
  // Show first 4 products
  const displayProducts = [...products].reverse().slice(0, 4);

  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl lg:text-5xl text-foreground">New Arrivals</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {displayProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
