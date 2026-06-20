import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { products } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import { useCart } from "@/context/CartContext";

export default function Wishlist() {
  const { isInWishlist, wishlistCount } = useCart();
  const wishlistedProducts = products.filter(p => isInWishlist(p.id));

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow pt-12 pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <h1 className="font-serif text-4xl lg:text-5xl mb-4 text-foreground">Wishlist</h1>
            <p className="text-muted-foreground">{wishlistCount} items saved to your wishlist.</p>
          </div>

          {wishlistedProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              {wishlistedProducts.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/20 border border-border rounded-lg">
              <p className="text-muted-foreground text-lg">Your wishlist is empty.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
