import { products } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";

export default function BestSellers() {
  const displayProducts = products.slice(4, 8);

  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl lg:text-5xl text-foreground">Best Sellers</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">Loved by thousands of homes across India.</p>
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
