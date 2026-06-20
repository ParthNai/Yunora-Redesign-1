import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";

import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import Category from "@/pages/Category";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Wishlist from "@/pages/Wishlist";

const queryClient = new QueryClient();

// Placeholder components for routes not fully implemented
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <h1 className="text-3xl font-serif">{title} - Coming Soon</h1>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/categories" component={Shop} />
      <Route path="/collections" component={Shop} />
      <Route path="/new-arrivals" component={Shop} />
      <Route path="/best-sellers" component={Shop} />
      
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/category/:slug" component={Category} />
      
      <Route path="/cart" component={Cart} />
      <Route path="/wishlist" component={Wishlist} />
      
      <Route path="/about"><PlaceholderPage title="About Us" /></Route>
      <Route path="/manufacturing"><PlaceholderPage title="Manufacturing" /></Route>
      <Route path="/contact"><PlaceholderPage title="Contact Us" /></Route>
      <Route path="/search"><PlaceholderPage title="Search" /></Route>
      <Route path="/profile"><PlaceholderPage title="My Profile" /></Route>
      <Route path="/login"><PlaceholderPage title="Login" /></Route>
      <Route path="/register"><PlaceholderPage title="Register" /></Route>

      <Route component={() => <PlaceholderPage title="404 Not Found" />} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </CartProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
