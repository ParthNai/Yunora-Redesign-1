import { Truck, ShieldCheck, CreditCard, HeadphonesIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function TrustBar() {
  const features = [
    { icon: Truck, title: "Free Shipping", subtitle: "On orders above ₹999" },
    { icon: ShieldCheck, title: "Premium Quality", subtitle: "Crafted to perfection" },
    { icon: CreditCard, title: "Secure Payments", subtitle: "100% secure checkout" },
    { icon: HeadphonesIcon, title: "24/7 Support", subtitle: "Dedicated assistance" },
  ];

  return (
    <div className="bg-card border-y border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-foreground text-lg">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground">{feature.subtitle}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
