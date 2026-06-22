import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const CURATED = [
  { name: "Luxury Collection",    desc: "Opulence crafted for your space",  href: "/collection/luxury" },
  { name: "Signature Collection", desc: "YUNORA's iconic designs",           href: "/collection/signature" },
  { name: "Premium Collection",   desc: "Best quality, best value",          href: "/collection/premium" },
  { name: "Classic Collection",   desc: "Timeless comfort, forever",         href: "/collection/classic" },
  { name: "Festive Collection",   desc: "Celebrate every occasion",          href: "/collection/festive" },
  { name: "Royal Heritage",       desc: "Inspired by royal palaces",         href: "/collection/royal" },
];

export default function Collections() {
  return (
    <section className="py-14 lg:py-20" style={{ background: "#FAF8F5" }}>
      <div className="max-w-[1320px] mx-auto px-4 lg:px-8">

        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[10px] tracking-[0.28em] font-bold text-[#D4AF37] mb-1">CURATED FOR YOU</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#3A2A20]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Curated Collections
            </h2>
          </div>
          <Link href="/collections"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] hover:text-[#b8932a] transition-colors">
            View All Collections <ArrowRight className="h-3.5 w-3.5"/>
          </Link>
        </div>

        {/* 3×2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {CURATED.map((col, i) => (
            <motion.div
              key={col.name}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link href={col.href}>
                <div className="group flex items-center gap-4 p-5 rounded-2xl border border-[#E8DDD0] bg-white hover:border-[#D4AF37] hover:shadow-lg transition-all duration-300">
                  {/* Gold circle checkmark */}
                  <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37]/40 group-hover:border-[#D4AF37] flex items-center justify-center shrink-0 transition-colors"
                    style={{ background: "#FFFBF0" }}>
                    <Check className="h-4 w-4 text-[#D4AF37]" strokeWidth={2.5}/>
                  </div>
                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#3A2A20] mb-0.5 group-hover:text-[#D4AF37] transition-colors">{col.name}</p>
                    <p className="text-[11px] text-[#9E8A78] leading-snug">{col.desc}</p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#D4AF37] mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <ArrowRight className="h-2.5 w-2.5"/>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile view all link */}
        <div className="sm:hidden mt-5 text-center">
          <Link href="/collections" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
            View All Collections <ArrowRight className="h-3.5 w-3.5"/>
          </Link>
        </div>

      </div>
    </section>
  );
}
