import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Link } from "wouter";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function Checkout() {
  const { cartCount } = useCart();
  const [step, setStep] = useState(1);
  const cartItems = products.slice(0, cartCount > 0 ? 2 : 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const total = subtotal;

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow pt-8 pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
          
          <h1 className="font-serif text-4xl mb-8 text-foreground">Checkout</h1>
          
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-grow">
              
              {/* Stepper */}
              <div className="flex items-center mb-12">
                <div className="flex items-center text-primary">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">1</div>
                  <span className="ml-3 font-medium hidden sm:inline">Address</span>
                </div>
                <div className={`h-px flex-grow mx-4 ${step > 1 ? "bg-primary" : "bg-border"}`}></div>
                <div className={`flex items-center ${step > 1 ? "text-primary" : "text-muted-foreground"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ${step > 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>2</div>
                  <span className="ml-3 font-medium hidden sm:inline">Payment</span>
                </div>
                <div className={`h-px flex-grow mx-4 ${step > 2 ? "bg-primary" : "bg-border"}`}></div>
                <div className={`flex items-center ${step > 2 ? "text-primary" : "text-muted-foreground"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ${step > 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>3</div>
                  <span className="ml-3 font-medium hidden sm:inline">Review</span>
                </div>
              </div>

              {step === 1 && (
                <div className="bg-card border border-border/30 rounded-lg p-6 lg:p-8 shadow-sm">
                  <h2 className="font-serif text-2xl mb-6">Shipping Address</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">First Name</label>
                      <input type="text" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Enter first name" />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Last Name</label>
                      <input type="text" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Enter last name" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-muted-foreground mb-2">Address</label>
                      <input type="text" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Enter full address" />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">City</label>
                      <input type="text" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="City" />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">State</label>
                      <input type="text" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="State" />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Pincode</label>
                      <input type="text" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Pincode" />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Phone</label>
                      <input type="text" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Phone number" />
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button onClick={() => setStep(2)} className="bg-primary text-primary-foreground px-8 py-3 text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors">
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="bg-card border border-border/30 rounded-lg p-6 lg:p-8 shadow-sm">
                  <h2 className="font-serif text-2xl mb-6">Payment Method</h2>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-4 border border-primary bg-primary/5 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="payment" defaultChecked className="accent-primary w-4 h-4" />
                        <span className="font-medium">Razorpay (Cards, UPI, NetBanking)</span>
                      </div>
                      <img src="https://razorpay.com/assets/razorpay-logo.svg" alt="Razorpay" className="h-6" />
                    </label>
                    <label className="flex items-center justify-between p-4 border border-border/50 hover:border-border cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="payment" className="accent-primary w-4 h-4" />
                        <span className="font-medium">Cash on Delivery</span>
                      </div>
                    </label>
                  </div>
                  <div className="mt-8 flex justify-between">
                    <button onClick={() => setStep(1)} className="text-muted-foreground hover:text-foreground text-sm font-medium tracking-widest uppercase transition-colors">
                      Back
                    </button>
                    <button onClick={() => setStep(3)} className="bg-primary text-primary-foreground px-8 py-3 text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors">
                      Review Order
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="bg-card border border-border/30 rounded-lg p-6 lg:p-8 shadow-sm">
                  <h2 className="font-serif text-2xl mb-6">Review Your Order</h2>
                  
                  <div className="mb-8">
                    <h3 className="text-sm text-muted-foreground uppercase tracking-wider mb-4 border-b border-border/50 pb-2">Shipping To</h3>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-sm text-muted-foreground">123 Luxury Lane, Apt 4B<br />New Delhi, Delhi 110001<br />+91 98765 43210</p>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-sm text-muted-foreground uppercase tracking-wider mb-4 border-b border-border/50 pb-2">Payment Method</h3>
                    <p className="text-sm font-medium">Razorpay</p>
                  </div>

                  <div className="mt-8 flex justify-between items-center">
                    <button onClick={() => setStep(2)} className="text-muted-foreground hover:text-foreground text-sm font-medium tracking-widest uppercase transition-colors">
                      Back
                    </button>
                    <Link href="/order-success" className="bg-primary text-primary-foreground px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors inline-block text-center">
                      Place Order
                    </Link>
                  </div>
                </div>
              )}

            </div>
            
            <div className="w-full lg:w-96 flex-shrink-0">
              <div className="bg-card border border-border/30 rounded-lg p-6 shadow-sm sticky top-24">
                <h2 className="font-serif text-xl mb-6 border-b border-border/50 pb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-20 bg-muted/30 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm font-serif line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: 1</p>
                        <p className="text-sm font-medium mt-1">₹{item.price.toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 mb-6 text-sm border-t border-border/50 pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span>Free</span>
                  </div>
                </div>
                
                <div className="border-t border-border/50 pt-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Total</span>
                    <span className="text-xl font-medium">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-right">Inclusive of all taxes</p>
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
