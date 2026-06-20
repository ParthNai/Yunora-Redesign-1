import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import AccountSidebar from "@/components/ui/AccountSidebar";
import PageHero from "@/components/ui/PageHero";
import { UploadCloud } from "lucide-react";

export default function Warranty() {
  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow">
        <PageHero 
          title="Warranty Verification" 
          subtitle="Register your premium YUNORA products for hassle-free warranty claims."
          breadcrumb={[{ label: "Home", href: "/" }, { label: "My Account", href: "/profile" }, { label: "Warranty" }]}
        />
        
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <aside className="w-full lg:w-64 flex-shrink-0">
              <AccountSidebar />
            </aside>
            
            <div className="flex-1">
              
              <div className="bg-card border border-border/30 rounded-lg p-8 shadow-sm max-w-2xl">
                <h2 className="font-serif text-2xl mb-6 border-b border-border/50 pb-4">Register New Product</h2>
                
                <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Product Name or SKU</label>
                    <input type="text" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="e.g. Royal Velvet Curtain" />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Purchase Date</label>
                      <input type="date" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent text-foreground" />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Order ID (if bought online)</label>
                      <input type="text" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="e.g. YUN12345678" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Upload Invoice</label>
                    <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer bg-muted/5">
                      <UploadCloud className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground">PDF, JPG or PNG (max. 5MB)</p>
                    </div>
                  </div>

                  <button className="w-full bg-primary text-primary-foreground py-4 text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors mt-4">
                    Verify Product
                  </button>
                </form>
              </div>

              <div className="mt-12">
                <h2 className="font-serif text-2xl mb-6">Registered Products</h2>
                <div className="text-center py-16 bg-card border border-border/30 rounded-lg shadow-sm">
                  <p className="text-muted-foreground">You haven't registered any products yet.</p>
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
