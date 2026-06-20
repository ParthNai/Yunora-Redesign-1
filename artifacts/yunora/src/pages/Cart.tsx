import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { Link } from "wouter";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const { cartCount } = useCart();

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow pt-12 pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h1 className="font-serif text-4xl mb-8 text-foreground">Shopping Cart</h1>
          
          {cartCount === 0 ? (
            <div className="text-center py-16 bg-muted/20 border border-border rounded-lg">
              <p className="text-muted-foreground mb-6">Your cart is currently empty.</p>
              <Link href="/shop" className="inline-block bg-primary text-primary-foreground px-8 py-3 text-sm font-medium uppercase tracking-widest">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="text-center py-16 bg-muted/20 border border-border rounded-lg">
              <p className="text-foreground mb-2 text-xl font-serif">You have {cartCount} items in your cart.</p>
              <p className="text-muted-foreground mb-6">Checkout functionality is not available in this preview.</p>
              <Link href="/shop" className="inline-block border border-foreground text-foreground px-8 py-3 text-sm font-medium uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors">
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
