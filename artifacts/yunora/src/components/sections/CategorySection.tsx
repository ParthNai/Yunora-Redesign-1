import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import catCurtains from "@/assets/cat-curtains.png";

const ROOMS = [
  { name: "Bedroom",     href: "/category/bedroom" },
  { name: "Living Room", href: "/category/living-room" },
  { name: "Dining Room", href: "/category/dining-room" },
  { name: "Kids Room",   href: "/category/kids-room" },
  { name: "Guest Room",  href: "/category/guest-room" },
  { name: "Outdoor",     href: "/category/outdoor" },
  { name: "Office",      href: "/category/office" },
  { name: "Hotel",       href: "/category/hotel" },
];

export default function CategorySection() {
  const { data: apiCats } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.categories(),
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });

  const categories = (apiCats ?? []).filter(c => c.name && c.slug).map(c => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    image: c.imageUrl || catCurtains,
    count: c.productCount ?? 0,
  }));

  return (
    <section className="py-14 lg:py-20 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 lg:px-8">

        {/* ── SHOP BY ROOM ── */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[10px] tracking-[0.28em] font-bold text-[#D4AF37] mb-1">BROWSE</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#3A2A20]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Shop by Room
            </h2>
          </div>
          <Link href="/categories"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] hover:text-[#b8932a] transition-colors">
            View All Rooms <ArrowRight className="h-3.5 w-3.5"/>
          </Link>
        </div>

        {/* Room photo card strip */}
        <div className="flex gap-3 lg:gap-4 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-none snap-x snap-mandatory lg:grid lg:grid-cols-8">
          {categories.length > 0 ? categories.map((cat, i) => (
            <motion.div key={cat.id}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
              className="shrink-0 w-36 lg:w-auto snap-start">
              <Link href={`/category/${cat.slug}`}>
                <div className="group cursor-pointer rounded-xl overflow-hidden border border-[#E8DDD0] hover:border-[#D4AF37] hover:shadow-lg transition-all duration-300">
                  <div className="aspect-square overflow-hidden bg-[#F5F0EA]">
                    <img src={cat.image} alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                  </div>
                  <div className="px-2.5 py-2 bg-white">
                    <p className="text-[11px] font-semibold text-[#3A2A20] leading-tight truncate">{cat.name}</p>
                    <p className="text-[9px] text-[#9E8A78] mt-0.5">{cat.count > 0 ? `${cat.count} products` : ""}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          )) : (
            <p className="text-sm text-[#9E8A78] col-span-8 py-4">Categories will appear here once added from the admin panel.</p>
          )}
        </div>

        {/* Mobile view all */}
        <div className="sm:hidden mt-4 text-center">
          <Link href="/categories" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
            View All Rooms <ArrowRight className="h-3.5 w-3.5"/>
          </Link>
        </div>

        {/* ── SHOP BY CATEGORY — desktop list ── */}
        {categories.length > 0 && (
          <div className="hidden lg:block mt-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[10px] tracking-[0.28em] font-bold text-[#D4AF37] mb-1">CATEGORIES</p>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#3A2A20]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Shop by Category
                </h2>
              </div>
              <Link href="/categories"
                className="flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] hover:text-[#b8932a] transition-colors">
                View All Categories <ArrowRight className="h-3.5 w-3.5"/>
              </Link>
            </div>

            <div className="grid grid-cols-4 xl:grid-cols-8 gap-3">
              {categories.map((cat, i) => (
                <motion.div key={cat.id}
                  initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }}>
                  <Link href={`/category/${cat.slug}`}>
                    <div className="group cursor-pointer rounded-xl overflow-hidden border border-[#E8DDD0] hover:border-[#D4AF37] hover:shadow-md transition-all duration-300">
                      <div className="aspect-[3/4] overflow-hidden bg-[#F5F0EA]">
                        <img src={cat.image} alt={cat.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                      </div>
                      <div className="p-2 bg-white">
                        <p className="text-[11px] font-bold text-[#3A2A20] leading-tight truncate">{cat.name}</p>
                        <p className="text-[9px] text-[#9E8A78]">{cat.count > 0 ? `${cat.count} products` : ""}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
