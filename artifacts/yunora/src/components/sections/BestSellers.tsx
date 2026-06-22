import { useQuery } from "@tanstack/react-query";
import { api, toProductCard } from "@/lib/api";
import { products as staticProducts } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import catBedsheets from "@/assets/cat-bedsheets.png";

export default function BestSellers() {
  const { data, isLoading } = useQuery({
    queryKey: ["products", "bestsellers"],
    queryFn: () => api.products({ limit: 4, page: 2 }),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const displayProducts = data && data.items.length > 0
    ? data.items.slice(0, 4).map((p) => toProductCard(p, catBedsheets))
    : staticProducts.slice(4, 8);

  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl lg:text-5xl text-foreground">Best Sellers</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">Loved by thousands of homes across India.</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-muted/40 rounded mb-3" />
                <div className="h-4 bg-muted/40 rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted/40 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {displayProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
