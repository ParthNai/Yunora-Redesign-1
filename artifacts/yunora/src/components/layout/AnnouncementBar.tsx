import { useRef } from "react";

const ITEMS = [
  { icon: "🎁", text: "Up to 40% Off on Selected Products" },
  { icon: "⭐", text: "Premium Quality • Trusted by 50,000+ Homes" },
  { icon: "🔒", text: "Secure Payments • 100% Safe & Verified" },
  { icon: "↩️", text: "Easy Returns • Hassle-Free Returns" },
  { icon: "🚚", text: "Free Shipping on Orders Above ₹999" },
  { icon: "🛡️", text: "10 Year Warranty on Premium Products" },
  { icon: "✨", text: "Exclusive Festive Collection — Now Available" },
  { icon: "💎", text: "Crafted in India • Luxury You Can Feel" },
];

export default function AnnouncementBar() {
  const trackRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
  };
  const handleMouseLeave = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running";
  };

  return (
    <div
      className="sticky top-0 z-[60] h-9 md:h-10 flex items-center overflow-hidden"
      style={{ background: "linear-gradient(90deg, #3A2A20 0%, #4a3830 50%, #3A2A20 100%)" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={trackRef} className="flex items-center whitespace-nowrap" style={{ animation: "marquee-track 40s linear infinite" }}>
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 mx-8 text-[11px] md:text-xs font-medium text-white/90 tracking-wide">
            <span className="text-sm">{item.icon}</span>
            {item.text}
            <span className="text-white/30 ml-4">|</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee-track {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
