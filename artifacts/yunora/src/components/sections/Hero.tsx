import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";

import hero1      from "@/assets/hero-1.png";
import catBedsheets from "@/assets/cat-bedsheets.png";
import catCurtains  from "@/assets/cat-curtains.png";
import catCushions  from "@/assets/cat-cushions.png";
import catComforters from "@/assets/cat-comforters.png";

/* ─── Slide data ─── */
const SLIDES = [
  {
    id: 1,
    image: hero1,
    tag: "NEW ARRIVALS 2025",
    heading: "Artisan Fabrics\nMade For",
    headingItalic: "Elegant Spaces",
    sub: "Explore our latest arrivals — premium textiles inspired by the finest global traditions.",
    cta1: { label: "Shop Collection",      href: "/shop" },
    cta2: { label: "Explore Categories",   href: "/categories" },
    align: "left" as const,
    gradient: "from-black/65 via-black/30 to-transparent",
  },
  {
    id: 2,
    image: catBedsheets,
    tag: "LUXURY BEDROOM",
    heading: "Transform Your Bedroom\nInto A",
    headingItalic: "Luxury Retreat",
    sub: "Premium bedding and comfort designed for the modern home.",
    cta1: { label: "Shop Bedroom Collection", href: "/category/bedsheets" },
    cta2: null,
    align: "left" as const,
    gradient: "from-black/70 via-black/35 to-transparent",
  },
  {
    id: 3,
    image: catCurtains,
    tag: "DESIGNER CURTAINS",
    heading: "Curtains That\nElevate",
    headingItalic: "Every Interior",
    sub: "Premium textures and elegant finishes for every room in your home.",
    cta1: { label: "Explore Curtains", href: "/category/curtains" },
    cta2: { label: "View Collections", href: "/collections" },
    align: "left" as const,
    gradient: "from-black/65 via-black/25 to-transparent",
  },
  {
    id: 4,
    image: catCushions,
    tag: "CURATED LIVING",
    heading: "Curated Comfort For",
    headingItalic: "Sophisticated Living",
    sub: "Designer cushions and décor accents inspired by luxury homes worldwide.",
    cta1: { label: "Shop Living Collection", href: "/category/cushions" },
    cta2: null,
    align: "left" as const,
    gradient: "from-black/60 via-black/28 to-transparent",
  },
  {
    id: 5,
    image: catComforters,
    tag: "PREMIUM COMFORT",
    heading: "Dining Experiences\nCrafted",
    headingItalic: "Beautifully",
    sub: "Elegant table linen and dining essentials crafted for every occasion.",
    cta1: { label: "Explore Dining",      href: "/category/comforters" },
    cta2: { label: "All Collections",     href: "/collections" },
    align: "left" as const,
    gradient: "from-black/65 via-black/30 to-transparent",
  },
];

const INTERVAL_MS = 4000;

/* ─── Text animation variants ─── */
const textVariants = {
  hidden: { opacity: 0, y: 32, filter: "blur(4px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:   { opacity: 0, y: -16, filter: "blur(2px)", transition: { duration: 0.4 } },
};
const tagVariants = {
  hidden: { opacity: 0, x: -16 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.05 } },
  exit:   { opacity: 0, x: 8, transition: { duration: 0.3 } },
};
const h1Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(3px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:   { opacity: 0, y: -12, transition: { duration: 0.35 } },
};
const subVariants = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.3 } },
  exit:   { opacity: 0, transition: { duration: 0.3 } },
};
const btnVariants = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.45 } },
  exit:   { opacity: 0, transition: { duration: 0.25 } },
};

export default function Hero() {
  const [current,  setCurrent]  = useState(0);
  const [paused,   setPaused]   = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX  = useRef(0);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
    setProgress(0);
  }, []);
  const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo]);
  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);

  /* Auto-play */
  useEffect(() => {
    if (paused) { clearInterval(intervalRef.current!); clearInterval(progressRef.current!); return; }

    setProgress(0);
    intervalRef.current  = setInterval(() => { setCurrent(c => (c + 1) % SLIDES.length); setProgress(0); }, INTERVAL_MS);
    const tickMs = 50;
    progressRef.current  = setInterval(() => { setProgress(p => Math.min(100, p + (100 / (INTERVAL_MS / tickMs)))); }, tickMs);

    return () => { clearInterval(intervalRef.current!); clearInterval(progressRef.current!); };
  }, [current, paused]);

  /* Touch swipe */
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
  };

  const slide = SLIDES[current];

  return (
    <section
      className="relative w-full overflow-hidden select-none"
      style={{ height: "min(90vh, 780px)", minHeight: "480px" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Background images (crossfade) ── */}
      <div className="absolute inset-0">
        {SLIDES.map((s, i) => (
          <motion.div key={s.id} className="absolute inset-0"
            initial={{ opacity: 0 }} animate={{ opacity: i === current ? 1 : 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}>
            {/* Subtle slow zoom */}
            <motion.img
              src={s.image} alt="" loading={i === 0 ? "eager" : "lazy"}
              className="w-full h-full object-cover"
              animate={{ scale: i === current ? 1.06 : 1.0 }}
              transition={{ duration: INTERVAL_MS / 1000 + 1.2, ease: "linear" }}
            />
          </motion.div>
        ))}

        {/* Gradient overlay */}
        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }}
            className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}/>
        </AnimatePresence>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"/>
      </div>

      {/* ── Text content ── */}
      <div className="relative h-full flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="max-w-xl xl:max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div key={current} className="flex flex-col items-start">

              {/* Tag */}
              <motion.p variants={tagVariants} initial="hidden" animate="show" exit="exit"
                className="text-[#F47C4D] text-[10px] sm:text-xs tracking-[0.32em] font-bold mb-3 sm:mb-4 uppercase">
                {slide.tag}
              </motion.p>

              {/* Heading */}
              <motion.h1 variants={h1Variants} initial="hidden" animate="show" exit="exit"
                className="text-white leading-[1.05] mb-3 sm:mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                <span className="block text-[2.1rem] sm:text-5xl lg:text-[3.8rem] xl:text-[4.4rem] font-bold whitespace-pre-line">
                  {slide.heading}
                </span>
                <span className="block text-[2.1rem] sm:text-5xl lg:text-[3.8rem] xl:text-[4.4rem] font-light italic">
                  {slide.headingItalic}
                </span>
              </motion.h1>

              {/* Subtext */}
              <motion.p variants={subVariants} initial="hidden" animate="show" exit="exit"
                className="text-white/80 text-sm sm:text-base font-light leading-relaxed mb-6 sm:mb-8 max-w-sm">
                {slide.sub}
              </motion.p>

              {/* CTA buttons */}
              <motion.div variants={btnVariants} initial="hidden" animate="show" exit="exit"
                className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Link href={slide.cta1.href}
                  className="inline-flex items-center justify-center bg-[#F47C4D] hover:bg-[#e06840] text-white px-7 py-3.5 text-xs font-bold tracking-[0.14em] uppercase transition-all hover:scale-[1.02] active:scale-[0.98] rounded-sm">
                  {slide.cta1.label}
                </Link>
                {slide.cta2 && (
                  <Link href={slide.cta2.href}
                    className="inline-flex items-center justify-center bg-transparent border border-white/60 hover:bg-white/12 text-white px-7 py-3.5 text-xs font-bold tracking-[0.14em] uppercase transition-all rounded-sm hover:border-white">
                    {slide.cta2.label}
                  </Link>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Slide counter (top-right) ── */}
      <div className="absolute top-5 right-5 hidden lg:flex items-center gap-1.5 bg-black/25 backdrop-blur-sm px-3 py-1.5 rounded-full">
        <span className="text-white font-bold text-sm">{String(current + 1).padStart(2, "0")}</span>
        <span className="text-white/40 text-xs">/</span>
        <span className="text-white/50 text-xs">{String(SLIDES.length).padStart(2, "0")}</span>
      </div>

      {/* ── Left / Right arrows ── */}
      <button onClick={prev}
        className="hidden lg:flex absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm items-center justify-center text-white hover:bg-white/25 hover:border-white/60 transition-all hover:scale-110 active:scale-95">
        <ChevronLeft className="h-5 w-5"/>
      </button>
      <button onClick={next}
        className="hidden lg:flex absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm items-center justify-center text-white hover:bg-white/25 hover:border-white/60 transition-all hover:scale-110 active:scale-95">
        <ChevronRight className="h-5 w-5"/>
      </button>

      {/* ── Bottom controls ── */}
      <div className="absolute bottom-6 left-6 sm:left-10 lg:left-16 xl:left-20 right-6 flex items-center justify-between">
        {/* Dot indicators with progress */}
        <div className="flex items-center gap-3">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              className="relative h-[3px] rounded-full overflow-hidden transition-all duration-300"
              style={{ width: i === current ? 44 : 20, background: "rgba(255,255,255,0.3)" }}>
              {i === current && (
                <motion.div className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: "#F47C4D", width: `${progress}%` }}/>
              )}
              {i < current && (
                <div className="absolute inset-0 rounded-full" style={{ background: "rgba(255,255,255,0.7)" }}/>
              )}
            </button>
          ))}
        </div>

        {/* Pause/play hint */}
        {paused && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="hidden lg:block text-[10px] text-white/50 tracking-widest font-medium">
            PAUSED
          </motion.span>
        )}
      </div>
    </section>
  );
}
