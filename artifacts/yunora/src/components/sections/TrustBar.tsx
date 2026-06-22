import { motion } from "framer-motion";
import { Truck, RefreshCcw, ShieldCheck, Award, BadgeCheck, MessageCircle } from "lucide-react";

const ITEMS = [
  { icon: Truck,          label: "Free Shipping",    sub: "On Orders Above ₹999" },
  { icon: RefreshCcw,     label: "Easy Returns",     sub: "Hassle-Free Returns" },
  { icon: ShieldCheck,    label: "Secure Payments",  sub: "100% Safe & Secure" },
  { icon: Award,          label: "Premium Quality",  sub: "Luxury You Can Trust" },
  { icon: BadgeCheck,     label: "10 Year Warranty", sub: "On Premium Products" },
  { icon: MessageCircle,  label: "24/7 Support",     sub: "We're Here to Help" },
];

export default function TrustBar() {
  return (
    <div className="bg-white border-y border-[#E8DDD0]">
      <div className="max-w-[1320px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-3 lg:grid-cols-6 divide-y lg:divide-y-0 lg:divide-x divide-[#E8DDD0]">
          {ITEMS.map((item, i) => (
            <motion.div key={item.label}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-center gap-3 px-4 py-4 lg:py-5 lg:px-5 lg:justify-center">
              <div className="w-9 h-9 rounded-full bg-[#F5F0EA] flex items-center justify-center shrink-0">
                <item.icon className="h-4 w-4 text-[#D4AF37]" strokeWidth={1.75}/>
              </div>
              <div>
                <p className="text-xs font-bold text-[#3A2A20] leading-tight">{item.label}</p>
                <p className="text-[10px] text-[#9E8A78] leading-tight hidden lg:block">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
