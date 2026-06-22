import { useState } from "react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import catCurtains from "@/assets/cat-curtains.png";
import catSofaFabrics from "@/assets/cat-sofa-fabrics.png";
import { api } from "@/lib/api";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function BecomeDealer() {
  const [form, setForm] = useState({
    businessName: "", contactName: "", email: "", phone: "", city: "", state: "",
    businessType: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.businessName.trim()) e.businessName = "Required";
    if (!form.contactName.trim()) e.contactName = "Required";
    if (!form.email.trim()) e.email = "Required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.city.trim()) e.city = "Required";
    return e;
  };

  const handleChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((p) => ({ ...p, [k]: e.target.value }));
    setErrors((p) => ({ ...p, [k]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setStatus("sending");
    try {
      await api.applyDealer({
        businessName: form.businessName,
        contactName: form.contactName,
        email: form.email,
        phone: form.phone,
        city: form.city,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow">
        <div className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-foreground">
          <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
            <img src={catCurtains} alt="Become a Dealer" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <h1 className="font-serif text-5xl lg:text-7xl mb-6">Grow With YUNORA</h1>
            <p className="text-lg text-white/80 font-light max-w-2xl mx-auto mb-8">Join our network of premium retail partners and bring India's finest luxury home furnishings to your discerning customers.</p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            <div className="space-y-12 pr-0 lg:pr-12">
              <div>
                <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">Why Partner With Us</span>
                <h2 className="font-serif text-4xl mb-6">The YUNORA Advantage</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-8">
                  As a YUNORA dealer, you're not just selling products; you're offering an experience. We provide our partners with comprehensive support to ensure mutual growth and success in the luxury retail space.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: "High Margins", desc: "Competitive wholesale pricing ensuring excellent profitability for your retail business." },
                  { title: "Marketing Support", desc: "Access to high-quality visual assets, catalogs, and co-branded marketing materials." },
                  { title: "Exclusive Products", desc: "Early access to new collections and dealer-exclusive product lines." },
                  { title: "Training", desc: "Comprehensive product knowledge and sales training for your showroom staff." },
                ].map((item) => (
                  <div key={item.title} className="bg-card p-6 border border-border/30 rounded-lg shadow-sm">
                    <h3 className="font-serif text-xl mb-3 text-primary">{item.title}</h3>
                    <p className="text-sm text-muted-foreground font-light">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="relative aspect-[4/3] w-full hidden lg:block">
                <img src={catSofaFabrics} alt="Dealer Experience" className="w-full h-full object-cover rounded-lg shadow-sm" />
              </div>
            </div>

            <div className="bg-card border border-border/30 rounded-lg p-8 lg:p-12 shadow-sm sticky top-24">
              <h2 className="font-serif text-3xl mb-2">Dealer Application</h2>
              <p className="text-muted-foreground mb-8">Please fill out the form below to initiate the partnership process.</p>

              {status === "success" ? (
                <div className="flex flex-col items-center text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-serif text-2xl mb-2">Application Submitted!</h3>
                  <p className="text-muted-foreground text-sm">Our partnership team will review your application and contact you within 2–3 business days.</p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Business Name*</label>
                      <input value={form.businessName} onChange={handleChange("businessName")} type="text" className={`w-full border-b py-3 text-sm focus:outline-none bg-transparent ${errors.businessName ? "border-red-400" : "border-border focus:border-primary"}`} placeholder="Company Name" />
                      {errors.businessName && <p className="text-xs text-red-500 mt-1">{errors.businessName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Owner Name*</label>
                      <input value={form.contactName} onChange={handleChange("contactName")} type="text" className={`w-full border-b py-3 text-sm focus:outline-none bg-transparent ${errors.contactName ? "border-red-400" : "border-border focus:border-primary"}`} placeholder="Full Name" />
                      {errors.contactName && <p className="text-xs text-red-500 mt-1">{errors.contactName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Email Address*</label>
                      <input value={form.email} onChange={handleChange("email")} type="email" className={`w-full border-b py-3 text-sm focus:outline-none bg-transparent ${errors.email ? "border-red-400" : "border-border focus:border-primary"}`} placeholder="Email" />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Phone Number*</label>
                      <input value={form.phone} onChange={handleChange("phone")} type="tel" className={`w-full border-b py-3 text-sm focus:outline-none bg-transparent ${errors.phone ? "border-red-400" : "border-border focus:border-primary"}`} placeholder="Phone" />
                      {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">City*</label>
                      <input value={form.city} onChange={handleChange("city")} type="text" className={`w-full border-b py-3 text-sm focus:outline-none bg-transparent ${errors.city ? "border-red-400" : "border-border focus:border-primary"}`} placeholder="City" />
                      {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">State</label>
                      <input value={form.state} onChange={handleChange("state")} type="text" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="State" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Business Type</label>
                    <select value={form.businessType} onChange={handleChange("businessType")} className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent">
                      <option value="" disabled>Select Business Type</option>
                      <option value="retail">Retail Showroom</option>
                      <option value="interior">Interior Designer</option>
                      <option value="distributor">Distributor</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Message (Optional)</label>
                    <textarea
                      value={form.message}
                      onChange={handleChange("message")}
                      className="w-full border border-border/50 p-4 text-sm focus:outline-none focus:border-primary bg-transparent min-h-[120px] resize-none mt-2"
                      placeholder="Tell us a bit about your current business and brands you carry..."
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded px-4 py-3">Something went wrong. Please try again.</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-primary text-primary-foreground py-4 text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors mt-4 disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : "Apply Now"}
                  </button>
                  <p className="text-xs text-muted-foreground text-center mt-4">Our partnership team will review your application and contact you within 2–3 business days.</p>
                </form>
              )}
            </div>

          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
