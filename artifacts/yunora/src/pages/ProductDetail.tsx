import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { useParams, Link } from "wouter";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Heart, Star, Truck, ShieldCheck, RefreshCcw } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id)) || products[0];
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href={`/category/${product.category}`} className="hover:text-foreground capitalize">{product.category}</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Images */}
            <div className="bg-muted/30 aspect-square lg:aspect-auto lg:h-[700px] flex items-center justify-center relative overflow-hidden">
              {product.badge && (
                <div className="absolute top-6 left-6 bg-card text-foreground text-xs font-medium tracking-widest px-3 py-1.5 z-10 shadow-sm uppercase">
                  {product.badge}
                </div>
              )}
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>

            {/* Details */}
            <div className="flex flex-col pt-4">
              <h1 className="font-serif text-3xl lg:text-4xl text-foreground mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex text-[#D4AF37]">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews} Customer Reviews)</span>
              </div>

              <div className="flex items-baseline gap-4 mb-8 pb-8 border-b border-border">
                <span className="text-2xl font-medium">₹{product.price.toLocaleString("en-IN")}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                )}
                <span className="text-xs text-muted-foreground ml-2">Inclusive of all taxes</span>
              </div>

              <p className="text-muted-foreground font-light leading-relaxed mb-8">
                Elevate your living space with our {product.name}. Crafted from premium materials with meticulous attention to detail, this piece offers both exceptional comfort and timeless elegance. The perfect addition to any modern luxury home.
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button 
                  onClick={addToCart}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-4 px-8 text-sm font-medium tracking-widest uppercase transition-colors"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className="flex items-center justify-center gap-2 border border-border hover:border-foreground text-foreground py-4 px-8 transition-colors"
                >
                  <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-primary text-primary" : ""}`} />
                  <span className="text-sm font-medium tracking-wider uppercase">Wishlist</span>
                </button>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                  <span>Free shipping on this item</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                  <span>1 Year Warranty against manufacturing defects</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <RefreshCcw className="h-5 w-5 text-muted-foreground" />
                  <span>Easy 7-day return policy</span>
                </div>
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
