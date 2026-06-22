import { motion } from "framer-motion";
import { Check, ExternalLink, BadgeCheck } from "lucide-react";

const MARKETPLACES = [
  {
    name: "Amazon",
    href: "https://amazon.in",
    logo: (
      <svg viewBox="0 0 130 36" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="26" fontSize="26" fontWeight="800" fontFamily="Arial, sans-serif" fill="#232F3E">amazon</text>
        <path d="M6 31 Q34 40 66 33" stroke="#FF9900" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <text x="68" y="34" fontSize="11" fill="#FF9900" fontFamily="Arial, sans-serif">.in</text>
      </svg>
    ),
    verifiedColor: "#FF9900",
  },
  {
    name: "Flipkart",
    href: "https://flipkart.com",
    logo: (
      <svg viewBox="0 0 130 36" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="3" width="26" height="30" rx="5" fill="#2874F0"/>
        <text x="2" y="25" fontSize="20" fontWeight="900" fontFamily="Arial, sans-serif" fill="white">f</text>
        <text x="30" y="26" fontSize="22" fontWeight="800" fontFamily="Arial, sans-serif" fill="#2874F0">Flipkart</text>
      </svg>
    ),
    verifiedColor: "#2874F0",
  },
  {
    name: "Myntra",
    href: "https://myntra.com",
    logo: (
      <svg viewBox="0 0 120 36" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="26" fontSize="24" fontWeight="900" fontFamily="Arial, sans-serif" fill="#FF3F6C">M</text>
        <text x="22" y="26" fontSize="22" fontWeight="700" fontFamily="Arial, sans-serif" fill="#282C3F">yntra</text>
      </svg>
    ),
    verifiedColor: "#FF3F6C",
  },
  {
    name: "AJIO",
    href: "https://ajio.com",
    logo: (
      <svg viewBox="0 0 80 36" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="27" fontSize="26" fontWeight="900" fontFamily="Arial, sans-serif" letterSpacing="2" fill="#1D1D1B">AJIO</text>
      </svg>
    ),
    verifiedColor: "#1D1D1B",
  },
];

const TRUST_FEATURES = [
  { label: "Verified Listing",    sub: "100% Authentic" },
  { label: "Authentic Products",  sub: "Official Brand Stores" },
  { label: "Secure Checkout",     sub: "Safe & Protected" },
  { label: "Original Warranty",   sub: "Brand Assurance" },
];

export default function MarketplaceHome() {
  return (
    <section className="py-14 lg:py-20" style={{ background: "#FAF8F5" }}>
      <div className="max-w-[1320px] mx-auto px-4 lg:px-8">

        {/* Section header */}
        <div className="mb-8">
          <p className="text-[10px] tracking-[0.28em] font-bold text-[#D4AF37] mb-1">OFFICIAL LISTINGS</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#3A2A20] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Available On Trusted Marketplaces
          </h2>
          <p className="text-sm text-[#9E8A78] max-w-xl">
            Shop from YUNORA or your preferred marketplace with the same authentic quality.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* LEFT — Marketplace cards */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3">
            {MARKETPLACES.map((mp, i) => (
              <motion.a
                key={mp.name}
                href={mp.href} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(58,42,32,0.12)" }}
                className="group flex flex-col gap-4 p-5 rounded-2xl bg-white border border-[#E8DDD0] hover:border-[#D4AF37] transition-all duration-300 cursor-pointer">
                {/* Logo */}
                <div className="h-8 flex items-start">
                  {mp.logo}
                </div>
                {/* Verified badge */}
                <div className="flex items-center gap-1.5">
                  <BadgeCheck className="h-3.5 w-3.5 shrink-0" style={{ color: mp.verifiedColor }}/>
                  <span className="text-[10px] font-bold" style={{ color: mp.verifiedColor }}>Verified</span>
                </div>
                {/* CTA */}
                <div className="mt-auto flex items-center gap-1.5 text-[11px] font-semibold text-[#3A2A20] group-hover:text-[#D4AF37] transition-colors">
                  View on {mp.name} <ExternalLink className="h-3 w-3 shrink-0"/>
                </div>
              </motion.a>
            ))}
          </div>

          {/* RIGHT — Trust features */}
          <div className="lg:w-72 xl:w-80 flex flex-col justify-center gap-3 p-6 rounded-2xl bg-white border border-[#E8DDD0]">
            <p className="text-[9px] tracking-[0.28em] font-bold text-[#D4AF37] mb-1">WHY SHOP WITH US</p>
            {TRUST_FEATURES.map((f, i) => (
              <motion.div key={f.label}
                initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.07 }}
                className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#F5F0EA] flex items-center justify-center shrink-0">
                  <Check className="h-3.5 w-3.5 text-[#D4AF37]" strokeWidth={2.5}/>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#3A2A20]">{f.label}</p>
                  <p className="text-[10px] text-[#9E8A78]">{f.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
