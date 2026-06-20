import { Search, Heart, User, ShoppingBag, Menu } from "lucide-react";
import { Link } from "wouter";
import { useCart } from "@/context/CartContext";
import logo from "@assets/02_1781943228013.png";

export default function Header() {
  const { cartCount, wishlistCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4 lg:hidden">
          <button className="p-2" data-testid="button-mobile-menu">
            <Menu className="h-6 w-6 text-foreground" />
          </button>
        </div>

        <Link href="/" className="flex flex-col items-center justify-center cursor-pointer group" data-testid="link-home-logo">
          <img src={logo} alt="YUNORA" className="h-8 lg:h-10 object-contain group-hover:opacity-90 transition-opacity" />
          <span className="text-[0.6rem] lg:text-xs tracking-[0.2em] font-medium text-foreground/80 mt-1">LUXURY FURNISHING</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide">
          <Link href="/" className="hover:text-primary transition-colors">HOME</Link>
          <Link href="/shop" className="hover:text-primary transition-colors">SHOP</Link>
          <div className="relative group cursor-pointer">
            <Link href="/categories" className="hover:text-primary transition-colors">CATEGORIES</Link>
          </div>
          <Link href="/collections" className="hover:text-primary transition-colors">COLLECTIONS</Link>
          <Link href="/new-arrivals" className="hover:text-primary transition-colors">NEW ARRIVALS</Link>
          <Link href="/about" className="hover:text-primary transition-colors">ABOUT US</Link>
          <Link href="/manufacturing" className="hover:text-primary transition-colors">MANUFACTURING</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">CONTACT US</Link>
        </nav>

        <div className="flex items-center gap-4 lg:gap-6">
          <Link href="/search" className="hidden lg:block text-foreground hover:text-primary transition-colors" data-testid="link-search">
            <Search className="h-5 w-5" />
          </Link>
          <Link href="/profile" className="hidden lg:block text-foreground hover:text-primary transition-colors" data-testid="link-profile">
            <User className="h-5 w-5" />
          </Link>
          <Link href="/wishlist" className="relative text-foreground hover:text-primary transition-colors hidden lg:block" data-testid="link-wishlist">
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link href="/cart" className="relative text-foreground hover:text-primary transition-colors" data-testid="link-cart">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
