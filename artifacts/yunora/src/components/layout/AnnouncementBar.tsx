import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const ITEMS = [
  { icon: "🚚", text: "Free Shipping on Orders Above ₹999" },
  { icon: "🔒", text: "Secure Payments" },
  { icon: "🛡️", text: "10 Year Warranty on Premium Products" },
  { icon: "✨", text: "Exclusive Collections" },
  { icon: "⭐", text: "Premium Quality" },
  { icon: "↩️", text: "Easy Returns" },
  { icon: "🎁", text: "Festive Offers — Up to 40% Off" },
  { icon: "💎", text: "Crafted in India · Luxury You Can Feel" },
];

const SPEED   = 0.38; /* px per frame — slow luxury scroll */
const ITEM_PX = 230;  /* approx px to jump per prev/next click */

export default function AnnouncementBar() {
  const trackRef   = useRef<HTMLDivElement>(null);
  const offsetRef  = useRef(0);
  const rafRef     = useRef<number>(0);
  const pausedRef  = useRef(false);
  const touchX     = useRef(0);
  const [isPaused, setIsPaused] = useState(false);

  /* ── 60fps scroll loop ── */
  useEffect(() => {
    const loop = () => {
      if (!pausedRef.current && trackRef.current) {
        offsetRef.current -= SPEED;
        const half = trackRef.current.scrollWidth / 2;
        if (offsetRef.current <= -half) offsetRef.current += half;
        trackRef.current.style.transform = `translate3d(${offsetRef.current}px,0,0)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const pause  = useCallback(() => { pausedRef.current = true;  setIsPaused(true);  }, []);
  const resume = useCallback(() => { pausedRef.current = false; setIsPaused(false); }, []);
  const toggle = useCallback(() => { if (pausedRef.current) resume(); else pause(); }, [pause, resume]);

  const jumpPrev = () => { offsetRef.current += ITEM_PX; };
  const jumpNext = () => { offsetRef.current -= ITEM_PX; };

  /* Touch swipe */
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; pause(); };
  const onTouchMove  = (e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - touchX.current;
    offsetRef.current += dx * 0.6;
    touchX.current = e.touches[0].clientX;
    if (trackRef.current) trackRef.current.style.transform = `translate3d(${offsetRef.current}px,0,0)`;
  };
  const onTouchEnd = () => resume();

  const DIVIDER = (
    <span className="mx-3 sm:mx-4 text-[#C4B09A]/70 select-none font-thin" aria-hidden>|</span>
  );

  return (
    <div
      className="sticky top-0 z-[60] flex items-center overflow-hidden select-none"
      style={{
        height: "clamp(28px, 4vw, 36px)",
        background: "rgba(252,249,245,0.88)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(216,195,165,0.55)",
        boxShadow: "0 1px 18px rgba(58,42,32,0.055)",
      }}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Left arrow (desktop only) ── */}
      <button
        onClick={jumpPrev} aria-label="Previous"
        className="hidden sm:flex items-center justify-center shrink-0 z-10 transition-all hover:opacity-70 active:scale-90"
        style={{ width: 28, height: "100%", paddingLeft: 6 }}>
        <ChevronLeft className="h-3.5 w-3.5 text-[#6B5744]" strokeWidth={2}/>
      </button>

      {/* ── Scrolling track ── */}
      <div className="flex-1 overflow-hidden relative" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)" }}>
        <div
          ref={trackRef}
          className="flex items-center whitespace-nowrap will-change-transform"
          style={{ transform: "translate3d(0,0,0)" }}>
          {/* Two copies for seamless loop */}
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center">
              <span className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-[12.5px] font-medium text-[#3A2A20] tracking-[0.02em]"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                <span className="text-sm" style={{ lineHeight: 1 }}>{item.icon}</span>
                {item.text}
              </span>
              {DIVIDER}
            </span>
          ))}
        </div>
      </div>

      {/* ── Right arrow + pause (desktop only) ── */}
      <div className="hidden sm:flex items-center shrink-0 z-10" style={{ paddingRight: 8, gap: 2 }}>
        <button onClick={jumpNext} aria-label="Next"
          className="flex items-center justify-center w-6 h-6 rounded-md transition-all hover:bg-[#E8DDD0]/60 active:scale-90">
          <ChevronRight className="h-3.5 w-3.5 text-[#6B5744]" strokeWidth={2}/>
        </button>
        <button onClick={toggle} aria-label={isPaused ? "Play" : "Pause"}
          className="flex items-center justify-center w-6 h-6 rounded-md transition-all hover:bg-[#E8DDD0]/60 active:scale-90">
          {isPaused
            ? <Play   className="h-3 w-3 text-[#6B5744]" strokeWidth={2}/>
            : <Pause  className="h-3 w-3 text-[#6B5744]" strokeWidth={2}/>}
        </button>
      </div>
    </div>
  );
}
