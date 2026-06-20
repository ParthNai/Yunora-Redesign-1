import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import AccountSidebar from "@/components/ui/AccountSidebar";
import PageHero from "@/components/ui/PageHero";
import { User, Package, Heart, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

export default function Profile() {
  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow">
        <PageHero 
          title="My Account" 
          breadcrumb={[{ label: "Home", href: "/" }, { label: "My Account" }]}
        />
        
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <aside className="w-full lg:w-64 flex-shrink-0">
              <AccountSidebar />
            </aside>
            
            <div className="flex-1 space-y-8">
              <div className="bg-card border border-border/30 rounded-lg p-8 shadow-sm flex items-center gap-6">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center border border-border">
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h2 className="font-serif text-3xl mb-1">Welcome back, John</h2>
                  <p className="text-muted-foreground">john.doe@example.com</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/profile/orders" className="bg-card border border-border/30 p-6 rounded-lg shadow-sm hover:border-primary transition-colors group">
                  <Package className="h-6 w-6 text-primary mb-4" />
                  <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
                  <p className="text-2xl font-serif">12</p>
                </Link>
                <Link href="/wishlist" className="bg-card border border-border/30 p-6 rounded-lg shadow-sm hover:border-primary transition-colors group">
                  <Heart className="h-6 w-6 text-primary mb-4" />
                  <p className="text-sm text-muted-foreground mb-1">Wishlist Items</p>
                  <p className="text-2xl font-serif">8</p>
                </Link>
                <Link href="/profile/warranty" className="bg-card border border-border/30 p-6 rounded-lg shadow-sm hover:border-primary transition-colors group">
                  <ShieldCheck className="h-6 w-6 text-primary mb-4" />
                  <p className="text-sm text-muted-foreground mb-1">Active Warranties</p>
                  <p className="text-2xl font-serif">3</p>
                </Link>
              </div>

              <div className="bg-card border border-border/30 rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border/50 flex justify-between items-center bg-muted/5">
                  <h3 className="font-serif text-xl">Recent Orders</h3>
                  <Link href="/profile/orders" className="text-sm text-primary hover:underline underline-offset-4">View All</Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-muted/10 border-b border-border/50 text-muted-foreground">
                      <tr>
                        <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Order #</th>
                        <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Date</th>
                        <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Status</th>
                        <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Total</th>
                        <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      <tr className="hover:bg-muted/5 transition-colors">
                        <td className="px-6 py-4 font-medium">#YUN12345678</td>
                        <td className="px-6 py-4 text-muted-foreground">Oct 24, 2023</td>
                        <td className="px-6 py-4">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium tracking-wide">Shipped</span>
                        </td>
                        <td className="px-6 py-4 font-medium">₹2,499</td>
                        <td className="px-6 py-4 text-right">
                          <Link href="/profile/orders/1" className="text-primary hover:underline underline-offset-4">View</Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
