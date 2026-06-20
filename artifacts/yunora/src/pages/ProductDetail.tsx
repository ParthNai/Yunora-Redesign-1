import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { useParams, Link } from "wouter";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Heart, Star, Truck, ShieldCheck, RefreshCcw, Minus, Plus } from "lucide-react";
import { useState } from "react";
import ProductCard from "@/components/ui/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id)) || products[0];
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("Medium");

  const sizes = ["Small", "Medium", "Large", "King"];

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link href={`/category/${product.category}`} className="hover:text-foreground capitalize transition-colors">{product.category}</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24">
            {/* Images */}
            <div className="space-y-4">
              <div className="bg-muted/30 aspect-square lg:aspect-[4/5] flex items-center justify-center relative overflow-hidden">
                {product.badge && (
                  <div className="absolute top-6 left-6 bg-card text-foreground text-xs font-medium tracking-widest px-3 py-1.5 z-10 shadow-sm uppercase">
                    {product.badge}
                  </div>
                )}
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="aspect-square bg-muted/30 overflow-hidden cursor-pointer border border-transparent hover:border-primary transition-colors">
                    <img src={product.image} alt={`${product.name} thumbnail ${i}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
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

              {/* Options */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium">Select Size</span>
                  <button className="text-xs text-muted-foreground underline">Size Guide</button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {sizes.map(s => (
                    <button 
                      key={s}
                      onClick={() => setSize(s)}
                      className={`py-3 text-sm border transition-colors ${
                        size === s 
                          ? 'border-foreground bg-foreground text-background' 
                          : 'border-border/50 text-foreground hover:border-foreground'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 mb-10">
                <div className="flex items-center border border-border h-14">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 text-muted-foreground hover:text-foreground transition-colors"><Minus className="h-4 w-4" /></button>
                  <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 text-muted-foreground hover:text-foreground transition-colors"><Plus className="h-4 w-4" /></button>
                </div>
                <button 
                  onClick={addToCart}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-sm font-medium tracking-widest uppercase transition-colors"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className="flex items-center justify-center border border-border hover:border-foreground text-foreground h-14 w-14 transition-colors shrink-0"
                >
                  <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-primary text-primary" : ""}`} />
                </button>
              </div>

              {/* Features */}
              <div className="space-y-4 pt-8 border-t border-border">
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

          <div className="pt-16 border-t border-border/50">
            <h2 className="font-serif text-3xl mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              {products.slice(0, 4).map((p, idx) => (
                <ProductCard key={p.id} product={p} index={idx} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
