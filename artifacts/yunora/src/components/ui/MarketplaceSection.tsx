import { motion } from "framer-motion";
import { ExternalLink, BadgeCheck, ShieldCheck, Star, Zap, Gift, Headphones, Award } from "lucide-react";

/* ─── Types ─── */
interface Marketplaces {
  amazon?: string;
  flipkart?: string;
  myntra?: string;
  ajio?: string;
  snapdeal?: string;
}

interface MarketplaceSectionProps {
  productName: string;
  price: number;
  marketplaces?: Marketplaces;
}

/* ─── Marketplace config ─── */
const MP_CONFIG = [
  {
    id: "amazon" as keyof Marketplaces,
    name: "Amazon",
    tagline: "Fast Delivery · Easy Returns",
    badge: "Amazon's Choice",
    badgeColor: "#FF9900",
    bg: "#FFFBF0",
    border: "#FFE0A0",
    logo: (
      <svg viewBox="0 0 120 36" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="26" fontSize="26" fontWeight="800" fontFamily="Arial, sans-serif" fill="#232F3E">amazon</text>
        <path d="M8 30 Q32 38 60 32" stroke="#FF9900" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <text x="62" y="34" fontSize="10" fill="#FF9900" fontFamily="Arial, sans-serif">.in</text>
      </svg>
    ),
  },
  {
    id: "flipkart" as keyof Marketplaces,
    name: "Flipkart",
    tagline: "SuperCoins · Flipkart Plus",
    badge: "Plus Benefits",
    badgeColor: "#2874F0",
    bg: "#F0F5FF",
    border: "#C0D4FF",
    logo: (
      <svg viewBox="0 0 120 36" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="4" width="24" height="28" rx="4" fill="#2874F0"/>
        <text x="2" y="24" fontSize="18" fontWeight="900" fontFamily="Arial, sans-serif" fill="white">f</text>
        <text x="28" y="26" fontSize="22" fontWeight="800" fontFamily="Arial, sans-serif" fill="#2874F0">Flipkart</text>
      </svg>
    ),
  },
  {
    id: "myntra" as keyof Marketplaces,
    name: "Myntra",
    tagline: "Fashion & Home · Style Pass",
    badge: "Insider Deals",
    badgeColor: "#FF3F6C",
    bg: "#FFF0F4",
    border: "#FFB8C9",
    logo: (
      <svg viewBox="0 0 110 36" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="26" fontSize="24" fontWeight="900" fontFamily="Arial, sans-serif" fill="#FF3F6C">M</text>
        <text x="20" y="26" fontSize="22" fontWeight="700" fontFamily="Arial, sans-serif" fill="#282C3F">yntra</text>
      </svg>
    ),
  },
  {
    id: "ajio" as keyof Marketplaces,
    name: "AJIO",
    tagline: "Premium Lifestyle · AJIO Luxe",
    badge: "Luxe Collection",
    badgeColor: "#1D1D1B",
    bg: "#F5F5F3",
    border: "#DDDDD8",
    logo: (
      <svg viewBox="0 0 80 36" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="27" fontSize="26" fontWeight="900" fontFamily="Arial, sans-serif" letterSpacing="2" fill="#1D1D1B">AJIO</text>
      </svg>
    ),
  },
  {
    id: "snapdeal" as keyof Marketplaces,
    name: "Snapdeal",
    tagline: "Value Deals · Snap Deals",
    badge: "Best Value",
    badgeColor: "#E40000",
    bg: "#FFF3F3",
    border: "#FFC8C8",
    logo: (
      <svg viewBox="0 0 130 36" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="18" r="12" fill="#E40000"/>
        <text x="10" y="23" fontSize="14" fontWeight="900" fontFamily="Arial, sans-serif" fill="white">S</text>
        <text x="30" y="25" fontSize="20" fontWeight="700" fontFamily="Arial, sans-serif" fill="#E40000">napdeal</text>
      </svg>
    ),
  },
];

/* ─── YUNORA vs Others comparison ─── */
const YUNORA_BENEFITS = [
  { icon: Zap,        label: "Lowest Price Guaranteed" },
  { icon: Gift,       label: "Exclusive Website Offers" },
  { icon: Award,      label: "Free Customization" },
  { icon: Headphones, label: "Priority Customer Support" },
  { icon: Star,       label: "Reward Points on Every Order" },
  { icon: ShieldCheck,label: "Extended 10-Year Warranty" },
];

const TRUST_BADGES = [
  { icon: BadgeCheck, label: "100% Genuine Products" },
  { icon: ShieldCheck, label: "Official Marketplace Listings" },
  { icon: Star,       label: "Secure Shopping" },
  { icon: Award,      label: "Verified Seller" },
];

export default function MarketplaceSection({ productName, price, marketplaces }: MarketplaceSectionProps) {
  /* Only show cards for platforms that have a URL */
  const activeMarketplaces = MP_CONFIG.filter(mp => marketplaces?.[mp.id]);

  if (activeMarketplaces.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="mt-6"
      aria-label="Available on trusted marketplaces"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D8C3A5] to-transparent" />
        <span className="text-[10px] tracking-[0.25em] font-bold text-[#9E8A78] whitespace-nowrap">ALSO AVAILABLE ON</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D8C3A5] to-transparent" />
      </div>

      {/* Main card */}
      <div
        className="rounded-3xl overflow-hidden border"
        style={{ background: "#FDFCFA", borderColor: "#E8DDD0", boxShadow: "0 8px 40px rgba(58,42,32,0.07), 0 2px 8px rgba(58,42,32,0.04)" }}
      >
        <div className="grid lg:grid-cols-[300px_1fr]">

          {/* LEFT — Trust Message */}
          <div className="flex flex-col gap-4 p-6 lg:p-7 lg:border-r border-[#E8DDD0]"
            style={{ background: "linear-gradient(160deg, #F8F5F0 0%, #F0EBE2 100%)" }}>
            <div>
              <p className="text-[10px] tracking-[0.22em] font-bold text-[#D4AF37] mb-2">TRUSTED PLATFORMS</p>
              <h3 className="text-lg font-bold text-[#3A2A20] leading-snug mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Trusted Across Leading Shopping Platforms
              </h3>
              <p className="text-xs text-[#6B5744] leading-relaxed">
                YUNORA products are available on trusted online marketplaces. Choose the platform you prefer and enjoy the same authentic quality.
              </p>
            </div>

            {/* Trust badges */}
            <div className="space-y-2">
              {TRUST_BADGES.map(tb => (
                <div key={tb.label} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#D4AF37]/15 flex items-center justify-center shrink-0">
                    <tb.icon className="h-3 w-3 text-[#D4AF37]" />
                  </div>
                  <span className="text-xs font-semibold text-[#6B5744]">{tb.label}</span>
                </div>
              ))}
            </div>

            {/* Official tag */}
            <div className="flex items-center gap-2 pt-2 border-t border-[#E8DDD0]">
              <BadgeCheck className="h-4 w-4 text-[#6B9E6E] shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-[#3A2A20]">Official YUNORA Product</p>
                <p className="text-[10px] text-[#9E8A78]">Authenticity Guaranteed on all platforms</p>
              </div>
            </div>
          </div>

          {/* RIGHT — Marketplace cards */}
          <div className="p-5 lg:p-6">
            {/* Scrollable row on mobile, wrap on desktop */}
            <div className="flex gap-3 overflow-x-auto pb-1 lg:pb-0 lg:flex-wrap scrollbar-none">
              {activeMarketplaces.map((mp, i) => (
                <motion.a
                  key={mp.id}
                  href={marketplaces![mp.id]}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(58,42,32,0.14)" }}
                  className="flex flex-col gap-3 p-4 rounded-2xl border-2 transition-all duration-300 shrink-0 w-[160px] lg:w-[175px] group cursor-pointer"
                  style={{ background: mp.bg, borderColor: mp.border }}
                  aria-label={`Buy ${productName} on ${mp.name}`}
                >
                  {/* Logo */}
                  <div className="h-8 flex items-center">
                    {mp.logo}
                  </div>

                  {/* Badge */}
                  <div className="flex items-center gap-1">
                    <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0" style={{ background: mp.badgeColor + "22" }}>
                      <BadgeCheck className="h-2.5 w-2.5" style={{ color: mp.badgeColor }} />
                    </div>
                    <span className="text-[9px] font-bold" style={{ color: mp.badgeColor }}>{mp.badge}</span>
                  </div>

                  {/* Tagline */}
                  <p className="text-[10px] text-[#9E8A78] leading-snug">{mp.tagline}</p>

                  {/* CTA button */}
                  <div
                    className="flex items-center justify-between gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all group-hover:opacity-90"
                    style={{ background: mp.badgeColor, color: "#fff" }}
                  >
                    <span>Buy on {mp.name}</span>
                    <ExternalLink className="h-3 w-3 shrink-0" />
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Bottom strip */}
            <div className="mt-4 pt-4 border-t border-[#E8DDD0] flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-4 flex-wrap">
                {["Verified Listing", "Authentic Product", "Secure Checkout"].map(tag => (
                  <div key={tag} className="flex items-center gap-1 text-[10px] text-[#9E8A78] font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#6B9E6E]" />
                    {tag}
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-[#9E8A78]">
                Sold by <span className="font-bold text-[#3A2A20]">YUNORA Furnishing</span> on all platforms
              </p>
            </div>
          </div>
        </div>

        {/* ─── YUNORA vs Others Comparison ─── */}
        <div className="border-t border-[#E8DDD0] bg-white p-5 lg:p-6">
          <div className="grid lg:grid-cols-2 gap-5 items-center">
            {/* Why buy from YUNORA */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center">
                  <Star className="h-3.5 w-3.5 text-[#D4AF37]" />
                </div>
                <p className="text-sm font-bold text-[#3A2A20]">Why Buy Directly From YUNORA.in</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {YUNORA_BENEFITS.map(b => (
                  <div key={b.label} className="flex items-center gap-2 text-xs text-[#6B5744]">
                    <div className="w-4 h-4 rounded-full bg-[#D4AF37]/12 flex items-center justify-center shrink-0">
                      <b.icon className="h-2.5 w-2.5 text-[#D4AF37]" />
                    </div>
                    {b.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison table */}
            <div className="rounded-2xl overflow-hidden border border-[#E8DDD0]">
              <div className="grid grid-cols-3 bg-[#F5F0EA]">
                <div className="p-2.5 text-[10px] font-bold text-[#9E8A78] tracking-wider border-r border-[#E8DDD0]">FEATURE</div>
                <div className="p-2.5 text-[10px] font-bold text-[#D4AF37] tracking-wider border-r border-[#E8DDD0] text-center">YUNORA.in</div>
                <div className="p-2.5 text-[10px] font-bold text-[#9E8A78] tracking-wider text-center">Others</div>
              </div>
              {[
                ["Lowest Price",       true,  false],
                ["Customization",      true,  false],
                ["Reward Points",      true,  false],
                ["10-Yr Warranty",     true,  false],
                ["Priority Support",   true,  false],
                ["Exclusive Offers",   true,  false],
              ].map(([label, yunora, others]) => (
                <div key={label as string} className="grid grid-cols-3 border-t border-[#E8DDD0] bg-white hover:bg-[#FAF8F5] transition-colors">
                  <div className="p-2.5 text-xs text-[#6B5744] border-r border-[#E8DDD0]">{label as string}</div>
                  <div className="p-2.5 flex justify-center items-center border-r border-[#E8DDD0]">
                    {yunora ? <span className="text-[#6B9E6E] text-sm font-bold">✓</span> : <span className="text-[#D8C3A5] text-sm">—</span>}
                  </div>
                  <div className="p-2.5 flex justify-center items-center">
                    {others ? <span className="text-[#6B9E6E] text-sm font-bold">✓</span> : <span className="text-[#D8C3A5] text-sm">—</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
