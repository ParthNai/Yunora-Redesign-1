import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Wand2, Check, Star, Ruler, Palette, ShieldCheck, Sparkles } from "lucide-react";
import CustomizeModal from "./CustomizeModal";

interface CustomizeSectionProps {
  productName: string;
  productType?: string;
}

const BENEFITS = [
  "Perfect Size Fit",
  "Custom Colors & Fabrics",
  "Design Personalization",
  "Expert Consultation",
  "Made To Order",
  "10-Year Warranty",
];

const WHY_ITEMS = [
  { icon: Ruler,       title: "Perfect Fit Guarantee",    desc: "Crafted exactly to your dimensions" },
  { icon: Palette,     title: "Premium Fabric Selection", desc: "50+ luxury fabrics available" },
  { icon: Star,        title: "Expert Design Team",       desc: "15+ years of furnishing expertise" },
  { icon: Sparkles,    title: "Handcrafted Production",   desc: "Each piece made with care" },
  { icon: ShieldCheck, title: "Luxury Finish",            desc: "Premium quality guaranteed" },
  { icon: MessageCircle, title: "Dedicated Support",      desc: "Expert guidance at every step" },
];

export default function CustomizeSection({ productName, productType }: CustomizeSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const openWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hello YUNORA Team! 🌟\n\nI'm interested in customizing: *${productName}*\n\nPlease guide me through the customization options.\n\nThank you!`
    );
    window.open(`https://wa.me/919999999999?text=${msg}`, "_blank");
  };

  return (
    <>
      <CustomizeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        productName={productName}
        productType={productType}
      />

      {/* ─── Customization Banner ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mt-8"
      >
        {/* Section intro */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-[#E8DDD0]" />
          <span className="text-[10px] tracking-[0.28em] font-bold text-[#D4AF37]">BESPOKE SERVICE</span>
          <div className="flex-1 h-px bg-[#E8DDD0]" />
        </div>

        {/* Main card */}
        <div className="rounded-3xl overflow-hidden border border-[#D4AF37]/25"
          style={{ background: "linear-gradient(135deg, #2e1d11 0%, #3a2a20 50%, #291a10 100%)", boxShadow: "0 20px 60px rgba(58,42,32,0.25), 0 0 0 1px rgba(212,175,55,0.15)" }}>
          <div className="grid lg:grid-cols-2">

            {/* Left — content */}
            <div className="p-7 lg:p-8 flex flex-col gap-5">
              <div>
                <p className="text-[10px] tracking-[0.28em] font-bold text-[#D4AF37] mb-2">MADE-TO-MEASURE</p>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Customize This Product
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Need a perfect fit? Create a custom-made version designed exactly for your space — any size, any color, any fabric.
                </p>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 gap-2">
                {BENEFITS.map(b => (
                  <div key={b} className="flex items-center gap-2 text-sm text-white/80">
                    <div className="w-4 h-4 rounded-full bg-[#D4AF37]/20 flex items-center justify-center shrink-0">
                      <Check className="h-2.5 w-2.5 text-[#D4AF37]" />
                    </div>
                    {b}
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex-1 h-12 flex items-center justify-center gap-2 bg-[#D4AF37] text-[#1a0f06] text-sm font-bold tracking-wide rounded-xl hover:bg-[#e8c84a] transition-all hover:shadow-lg hover:shadow-[#D4AF37]/30 hover:scale-[1.02]"
                >
                  <Wand2 className="h-4 w-4" />
                  Customize Now
                </button>
                <button
                  onClick={openWhatsApp}
                  className="flex-1 h-12 flex items-center justify-center gap-2 bg-[#25D366] text-white text-sm font-bold tracking-wide rounded-xl hover:bg-[#1da855] transition-all hover:scale-[1.02]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </button>
              </div>

              <p className="text-[10px] text-white/35 text-center">
                100% Custom Made · Perfect Fit · Premium Quality
              </p>
            </div>

            {/* Right — quick form preview */}
            <div className="relative hidden lg:flex flex-col justify-center p-8 border-l border-white/10">
              {/* Frosted quick form preview */}
              <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-bold text-white">Create Your Perfect {productType === "curtains" ? "Curtains" : "Product"}</p>
                  <span className="text-[10px] text-[#D4AF37] font-semibold bg-[#D4AF37]/15 px-2 py-1 rounded-full">Get Custom Quote</span>
                </div>

                <div className="space-y-3">
                  <MiniField label="Product Type" value={productType ? productType.charAt(0).toUpperCase() + productType.slice(1) : "Select..."} />
                  <div className="grid grid-cols-2 gap-2">
                    <MiniField label="Width (inches)" value="Enter width" />
                    <MiniField label="Height (inches)" value="Enter height" />
                  </div>
                  <MiniField label="Fabric" value="Linen Sheer ▾" />
                  <MiniField label="Color" value="Ivory White ▾" />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button onClick={openWhatsApp}
                    className="flex items-center justify-center gap-1.5 h-9 bg-[#25D366] text-white text-xs font-bold rounded-lg hover:bg-[#1da855] transition-colors">
                    <MessageCircle className="h-3.5 w-3.5" />
                    WhatsApp Quote
                  </button>
                  <button onClick={() => setModalOpen(true)}
                    className="flex items-center justify-center gap-1.5 h-9 bg-[#D4AF37] text-[#1a0f06] text-xs font-bold rounded-lg hover:bg-[#b8932a] transition-colors">
                    <Wand2 className="h-3.5 w-3.5" />
                    Customize Now
                  </button>
                </div>

                <p className="text-[10px] text-white/40 text-center mt-3">
                  We will contact you within 30 minutes with the best quote.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Why Customize with YUNORA ─── */}
        <div className="mt-10">
          <div className="text-center mb-6">
            <p className="text-[10px] tracking-[0.28em] font-bold text-[#D4AF37] mb-2">OUR PROMISE</p>
            <h3 className="text-xl lg:text-2xl font-bold text-[#3A2A20]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Why Customize With YUNORA
            </h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {WHY_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#E8DDD0] hover:border-[#D4AF37]/50 hover:shadow-md transition-all cursor-default"
              >
                <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <item.icon className="h-4.5 w-4.5 text-[#D4AF37]" style={{ width: "18px", height: "18px" }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#3A2A20] leading-tight mb-0.5">{item.title}</p>
                  <p className="text-xs text-[#9E8A78] leading-snug">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}

function MiniField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] text-white/50 font-semibold mb-1 tracking-wide">{label.toUpperCase()}</p>
      <div className="h-8 px-3 rounded-lg flex items-center text-xs text-white/60" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
        {value}
      </div>
    </div>
  );
}
