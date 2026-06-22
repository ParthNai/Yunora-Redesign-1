import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import PageHero from "@/components/ui/PageHero";
import { useState } from "react";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { api, type ApiOrder } from "@/lib/api";

export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState("");
  const [order, setOrder]     = useState<ApiOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    const num = orderNumber.trim();
    if (!num) return;
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      const data = await api.trackOrder(num);
      setOrder(data);
    } catch {
      setError("Order not found. Please check the order number and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setOrder(null);
    setOrderNumber("");
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow">
        <PageHero
          title="Track Your Order"
          subtitle="Enter your order number to see the current delivery status."
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Track Order" }]}
        />

        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto">

            {!order ? (
              <div className="bg-card border border-border/30 p-8 rounded-lg shadow-sm">
                <form onSubmit={handleTrack} className="space-y-6">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Order Number</label>
                    <input
                      type="text"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent"
                      placeholder="e.g. YUN-XXXXXXXX"
                      required
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded px-4 py-3">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-primary-foreground py-4 text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors mt-4 disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Tracking...</> : "Track Now"}
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="bg-card border border-border/30 p-8 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start mb-8 border-b border-border/50 pb-6">
                    <div>
                      <h2 className="font-serif text-2xl">Order #{order.orderNumber}</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                      {order.trackingNumber && (
                        <p className="text-xs text-muted-foreground mt-1">Tracking: {order.trackingNumber}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Order Total</p>
                      <p className="font-medium">₹{order.total.toLocaleString("en-IN")}</p>
                      <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full capitalize">
                        {order.status.replace(/_/g, " ")}
                      </span>
                    </div>
                  </div>

                  {order.timeline && order.timeline.length > 0 && (
                    <div className="relative pl-4 border-l border-border ml-4 space-y-10">
                      {order.timeline.map((step, idx) => (
                        <div key={idx} className="relative">
                          <div className="absolute -left-[25px] bg-card w-4 h-4 flex items-center justify-center">
                            {step.completed ? (
                              <CheckCircle2 className="w-6 h-6 text-primary bg-card" />
                            ) : step.active ? (
                              <Circle className="w-5 h-5 text-primary bg-card" />
                            ) : (
                              <Circle className="w-5 h-5 text-muted-foreground bg-card" />
                            )}
                          </div>
                          <div className="pl-6">
                            <p className={`font-medium ${step.completed || step.active ? "text-foreground" : "text-muted-foreground"}`}>
                              {step.label}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <button
                    onClick={handleReset}
                    className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
                  >
                    Track Another Order
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
