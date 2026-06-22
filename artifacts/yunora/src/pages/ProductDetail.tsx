import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, Heart, Share2, Truck, ShieldCheck, RefreshCcw, BadgeCheck,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, X, ZoomIn,
  MessageCircle, MapPin, Package, Award, Leaf, Sparkles, Wind,
  Check, Plus, Minus, ThumbsUp, Search, Send, ShoppingCart, Zap
} from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import ProductCard from "@/components/ui/ProductCard";
import CustomizeSection from "@/components/ui/CustomizeSection";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

/* ── Static enrichment ── */
const COLORS = [
  { name: "Olive Green", hex: "#7A8A5E" },
  { name: "Blush Rose",  hex: "#E8BCAD" },
  { name: "Navy Blue",   hex: "#3A5070" },
  { name: "Terracotta",  hex: "#C4614A" },
];
const SIZES = ["Single", "Double", "Queen", "King", "Super King"];
const SPECS = [
  { label: "Material",           value: "100% Long Staple Cotton" },
  { label: "Thread Count",       value: "300 TC Premium" },
  { label: "Fabric Type",        value: "Sateen Weave" },
  { label: "Dimensions (Queen)", value: "90×100 in (Sheet) | 60×78 in (Pillow)" },
  { label: "Weight",             value: "1.8 kg" },
  { label: "Wash Care",          value: "Machine Wash Cold, Tumble Dry Low" },
  { label: "Country of Origin",  value: "India" },
  { label: "Manufacturer",       value: "YUNORA Furnishing Pvt. Ltd." },
  { label: "Warranty",           value: "10 Years Against Manufacturing Defects" },
  { label: "Includes",           value: "1 Bedsheet + 2 Pillow Covers" },
];
const HIGHLIGHTS = [
  { icon: Leaf,        label: "100% Premium Cotton", desc: "Long Staple" },
  { icon: Award,       label: "300 Thread Count",    desc: "Premium Quality" },
  { icon: Wind,        label: "Breathable",          desc: "All Season Comfort" },
  { icon: Sparkles,    label: "Skin Friendly",       desc: "Soft & Gentle" },
  { icon: ShieldCheck, label: "Anti-Fade",           desc: "Long Lasting Color" },
  { icon: BadgeCheck,  label: "Made In India",       desc: "Ethically Crafted" },
];
const TRUST = [
  { icon: Truck,       label: "Free Shipping",    sub: "On all orders" },
  { icon: RefreshCcw,  label: "Easy Returns",     sub: "7-day hassle-free" },
  { icon: ShieldCheck, label: "Secure Payments",  sub: "100% safe & secure" },
  { icon: Award,       label: "10 Year Warranty", sub: "On premium products" },
  { icon: BadgeCheck,  label: "24/7 Support",     sub: "We're here to help" },
];
const REVIEWS_DATA = [
  { id: 1, name: "Priya S.",  date: "12 June 2025", rating: 5, title: "Absolutely Luxurious!", body: "The quality of this bedsheet is outstanding. It feels incredibly soft and the colors are vibrant even after multiple washes. Delivery was fast and the packaging was premium.", verified: true,  helpful: 42 },
  { id: 2, name: "Rahul M.",  date: "4 May 2025",   rating: 5, title: "Best Bedsheet I've Owned", body: "Super soft fabric, elegant design. Fits perfectly on our Queen bed. YUNORA has set the bar very high. Highly recommend to anyone looking for luxury without breaking the bank.", verified: true,  helpful: 31 },
  { id: 3, name: "Sneha K.",  date: "28 Apr 2025",  rating: 4, title: "Premium Quality",          body: "Very happy with the purchase. The fabric is breathable and comfortable. Slight delay in delivery but the product more than made up for it.", verified: true,  helpful: 18 },
  { id: 4, name: "Amit V.",   date: "15 Apr 2025",  rating: 5, title: "Great Value for Money",    body: "Received as a gift and absolutely loved it. The packaging was luxurious, almost like unboxing an Apple product. The bedsheet itself is silky smooth.", verified: true,  helpful: 27 },
  { id: 5, name: "Kavya R.",  date: "2 Apr 2025",   rating: 4, title: "Beautiful Design",         body: "The olive green color is exactly as shown. Great quality cotton that feels premium. Will definitely purchase more from YUNORA.", verified: false, helpful: 11 },
];
const FAQS = [
  { q: "What is included in the Luxe Cotton Bedsheet Set?",      a: "The set includes 1 fitted/flat bedsheet and 2 matching pillow covers in your selected size." },
  { q: "Is this bedsheet suitable for all weather conditions?",   a: "Yes! The breathable 100% cotton fabric ensures comfort in both summer and winter." },
  { q: "How do I care for this bedsheet?",                        a: "Machine wash cold on gentle cycle. Tumble dry low. Do not bleach. Iron on low heat." },
  { q: "Does the color fade after washing?",                      a: "No. Our Anti-Fade technology ensures colors remain vibrant wash after wash." },
  { q: "Is EMI available on this product?",                       a: "Yes! EMI available from ₹208/month with zero down payment via Razorpay, PhonePe & more." },
];
const RATING_BREAKDOWN = [
  { stars: 5, pct: 72 },
  { stars: 4, pct: 18 },
  { stars: 3, pct: 6  },
  { stars: 2, pct: 2  },
  { stars: 1, pct: 2  },
];
const BOUGHT_TOGETHER = [
  { id: 10, name: "Premium Cushion Cover",  price: 499,  originalPrice: 889  },
  { id: 11, name: "Quilted Comforter",      price: 2999, originalPrice: 5499 },
];
const AVG_RATING   = 4.8;
const TOTAL_REVIEWS = 128;

/* ── Helper Components ── */
function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(s => (
        <svg key={s} width={size} height={size} viewBox="0 0 24 24"
          fill={s <= Math.round(rating) ? "#D4AF37" : "none"}
          stroke="#D4AF37" strokeWidth="1.5">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#E8DDD0]">
      <button className="w-full flex items-center justify-between py-4 text-left" onClick={() => setOpen(o => !o)}>
        <span className="text-sm font-medium text-[#3A2A20] tracking-wide">{title}</span>
        {open ? <ChevronUp className="h-4 w-4 text-[#9E8A78] shrink-0" /> : <ChevronDown className="h-4 w-4 text-[#9E8A78] shrink-0" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }} className="overflow-hidden">
            <div className="pb-5 text-sm text-[#6B5744] leading-relaxed">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main Page ── */
export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id)) || products[1];
  const related  = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const gallery = [product.image, product.image, product.image, product.image, product.image, product.image];

  const [activeImg,    setActiveImg]    = useState(0);
  const [zoom,         setZoom]         = useState(false);
  const [zoomPos,      setZoomPos]      = useState({ x: 50, y: 50 });
  const [fullscreen,   setFullscreen]   = useState(false);
  const [selColor,     setSelColor]     = useState(COLORS[0].name);
  const [selSize,      setSelSize]      = useState("Queen");
  const [qty,          setQty]          = useState(1);
  const [activeTab,    setActiveTab]    = useState("details");
  const [pincode,      setPincode]      = useState("");
  const [deliveryInfo, setDeliveryInfo] = useState<string | null>(null);
  const [reviewFilter, setReviewFilter] = useState("all");
  const [faqSearch,    setFaqSearch]    = useState("");
  const [newQ,         setNewQ]         = useState("");
  const [stickyBar,    setStickyBar]    = useState(false);
  const [cartAnim,     setCartAnim]     = useState(false);
  const [wishAnim,     setWishAnim]     = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) setStickyBar(window.scrollY > heroRef.current.offsetHeight + 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setFullscreen(false); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoom) return;
    const r = e.currentTarget.getBoundingClientRect();
    setZoomPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  }, [zoom]);

  const handleAddToCart = () => {
    addToCart();
    setCartAnim(true);
    setTimeout(() => setCartAnim(false), 2500);
  };
  const handleWishlist = () => {
    toggleWishlist(product.id);
    setWishAnim(true);
    setTimeout(() => setWishAnim(false), 600);
  };
  const checkDelivery = () => {
    if (pincode.length === 6) {
      const d = Math.floor(Math.random() * 3) + 3;
      setDeliveryInfo(`✦ Estimated Delivery: ${d}–${d + 1} business days · Free Shipping · COD Available`);
    }
  };

  const disc = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const TABS = [
    { id: "details",  label: "Product Details" },
    { id: "specs",    label: "Specifications" },
    { id: "care",     label: "Care Instructions" },
    { id: "shipping", label: "Shipping & Returns" },
    { id: "reviews",  label: `Reviews (${TOTAL_REVIEWS})` },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF8F5", fontFamily: "'Inter', sans-serif" }}>
      <AnnouncementBar />
      <Header />

      {/* ═══ DESKTOP STICKY BAR ═══ */}
      <AnimatePresence>
        {stickyBar && (
          <motion.div
            initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -70, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-[200] bg-white/96 backdrop-blur-md border-b border-[#E8DDD0] shadow-sm hidden lg:block"
          >
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <img src={product.image} className="h-10 w-10 object-cover rounded" alt="" />
                <div>
                  <p className="text-sm font-semibold text-[#3A2A20] leading-tight">{product.name}</p>
                  <StarRow rating={AVG_RATING} size={11} />
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-[#3A2A20]">₹{product.price.toLocaleString("en-IN")}</span>
                  {product.originalPrice && <span className="text-sm text-[#9E8A78] line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>}
                  {disc > 0 && <span className="text-xs font-bold text-[#F47C4D]">{disc}% OFF</span>}
                </div>
                <div className="flex gap-3">
                  <button onClick={handleAddToCart} className={`h-9 px-6 text-xs font-bold tracking-wider rounded transition-colors ${cartAnim ? "bg-[#6B9E6E] text-white" : "bg-[#3A2A20] text-white hover:bg-[#4a3830]"}`}>
                    {cartAnim ? "✓ ADDED" : "ADD TO CART"}
                  </button>
                  <button className="h-9 px-6 bg-[#D4AF37] text-[#1a0f06] text-xs font-bold tracking-wider rounded hover:bg-[#b8932a] transition-colors">
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ FULLSCREEN GALLERY ═══ */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/96 flex items-center justify-center"
            onClick={() => setFullscreen(false)}
          >
            <button className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors" onClick={() => setFullscreen(false)}>
              <X className="h-8 w-8" />
            </button>
            <button className="absolute left-5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white" onClick={e => { e.stopPropagation(); setActiveImg(i => (i - 1 + gallery.length) % gallery.length); }}>
              <ChevronLeft className="h-10 w-10" />
            </button>
            <motion.img key={activeImg} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} src={gallery[activeImg]} alt="" className="max-h-[88vh] max-w-[88vw] object-contain" onClick={e => e.stopPropagation()} />
            <button className="absolute right-5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white" onClick={e => { e.stopPropagation(); setActiveImg(i => (i + 1) % gallery.length); }}>
              <ChevronRight className="h-10 w-10" />
            </button>
            <div className="absolute bottom-6 flex gap-2">
              {gallery.map((_, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); setActiveImg(i); }} className={`h-1.5 rounded-full transition-all ${i === activeImg ? "w-6 bg-[#D4AF37]" : "w-1.5 bg-white/35"}`} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pb-20 lg:pb-0">

        {/* ─── Breadcrumb ─── */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-5 pb-2">
          <nav className="flex items-center gap-1.5 text-[11px] text-[#9E8A78]">
            <Link href="/" className="hover:text-[#3A2A20] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/category/bedsheets" className="hover:text-[#3A2A20] transition-colors">Bedsheets</Link>
            <span>/</span>
            <span className="text-[#3A2A20]">{product.name}</span>
          </nav>
        </div>

        {/* ═══ HERO SECTION ═══ */}
        <div ref={heroRef} className="max-w-7xl mx-auto px-4 lg:px-8 py-6 lg:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[58%_42%] gap-8 lg:gap-12">

            {/* LEFT — Gallery */}
            <div className="flex gap-3 lg:gap-4">
              {/* Vertical thumbnails desktop */}
              <div className="hidden lg:flex flex-col gap-2 w-[68px] shrink-0">
                {gallery.map((img, i) => (
                  <button
                    key={i} onClick={() => setActiveImg(i)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${i === activeImg ? "border-[#D4AF37] shadow-md" : "border-transparent hover:border-[#D8C3A5]"}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Main image */}
              <div className="flex-1 flex flex-col gap-3">
                <div
                  className="relative overflow-hidden rounded-2xl bg-[#F0EBE3] cursor-zoom-in aspect-[4/5] lg:aspect-[3/4] select-none"
                  onMouseEnter={() => setZoom(true)}
                  onMouseLeave={() => setZoom(false)}
                  onMouseMove={onMouseMove}
                  onClick={() => setFullscreen(true)}
                >
                  <motion.img
                    key={activeImg}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}
                    src={gallery[activeImg]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-200"
                    style={zoom ? { transform: "scale(1.7)", transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
                    {product.isBestSeller && <span className="bg-[#3A2A20] text-white text-[9px] font-extrabold tracking-[0.18em] px-3 py-1 rounded-sm uppercase">Bestseller</span>}
                    {product.isNew       && <span className="bg-[#D4AF37] text-[#1a0f06] text-[9px] font-extrabold tracking-[0.18em] px-3 py-1 rounded-sm uppercase">New</span>}
                    <span className="bg-[#F47C4D] text-white text-[9px] font-extrabold tracking-[0.18em] px-3 py-1 rounded-sm uppercase">🔥 Trending</span>
                  </div>

                  {/* Action buttons */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    {[
                      { icon: Heart,  action: (e: React.MouseEvent) => { e.stopPropagation(); handleWishlist(); },  active: isInWishlist(product.id), activeClass: "fill-red-500 text-red-500" },
                      { icon: Share2, action: (e: React.MouseEvent) => e.stopPropagation(), active: false, activeClass: "" },
                      { icon: ZoomIn, action: () => {}, active: false, activeClass: "" },
                    ].map(({ icon: Icon, action, active, activeClass }, i) => (
                      <button key={i} onClick={action} className="w-9 h-9 rounded-full bg-white/92 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all hover:scale-110">
                        <Icon className={`h-4 w-4 ${active ? activeClass : "text-[#3A2A20]"}`} />
                      </button>
                    ))}
                  </div>

                  {/* Nav arrows */}
                  {[
                    { side: "left-2", dir: -1, Icon: ChevronLeft },
                    { side: "right-2", dir: 1, Icon: ChevronRight },
                  ].map(({ side, dir, Icon }) => (
                    <button key={side} className={`absolute ${side} top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/82 flex items-center justify-center hover:bg-white transition-all shadow-sm`}
                      onClick={e => { e.stopPropagation(); setActiveImg(i => (i + dir + gallery.length) % gallery.length); }}>
                      <Icon className="h-4 w-4 text-[#3A2A20]" />
                    </button>
                  ))}

                  {/* Dot indicators */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {gallery.map((_, i) => (
                      <button key={i} onClick={e => { e.stopPropagation(); setActiveImg(i); }} className={`rounded-full transition-all ${i === activeImg ? "w-5 h-1.5 bg-[#D4AF37]" : "w-1.5 h-1.5 bg-white/60"}`} />
                    ))}
                  </div>
                </div>

                {/* Mobile thumbnails */}
                <div className="flex lg:hidden gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {gallery.map((img, i) => (
                    <button key={i} onClick={() => setActiveImg(i)} className={`w-14 h-14 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${i === activeImg ? "border-[#D4AF37]" : "border-transparent"}`}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — Product Info */}
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-[10px] tracking-[0.28em] font-bold text-[#D4AF37] mb-1.5 uppercase">YUNORA Signature Collection</p>
                <h1 className="text-[1.75rem] lg:text-[2.1rem] font-bold text-[#3A2A20] leading-tight mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {product.name}
                </h1>
                <p className="text-xs text-[#9E8A78] tracking-wide">Premium 300 TC · 100% Long Staple Cotton</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <StarRow rating={AVG_RATING} size={15} />
                <span className="text-sm font-bold text-[#3A2A20]">{AVG_RATING}</span>
                <span className="text-sm text-[#9E8A78]">({TOTAL_REVIEWS} Reviews)</span>
                <span className="text-xs text-[#6B9E6E] font-semibold flex items-center gap-1"><BadgeCheck className="h-3.5 w-3.5" /> Verified</span>
                <span className="text-xs text-[#F47C4D] font-semibold">· 450+ sold this month</span>
              </div>

              {/* Price block */}
              <div className="bg-[#F5F0EA] rounded-2xl p-4 border border-[#E8DDD0]">
                <div className="flex items-baseline gap-3 flex-wrap mb-1.5">
                  <span className="text-3xl font-bold text-[#3A2A20]">₹{product.price.toLocaleString("en-IN")}</span>
                  {product.originalPrice && <span className="text-lg text-[#9E8A78] line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>}
                  {disc > 0 && <span className="bg-[#F47C4D] text-white text-xs font-bold px-2 py-0.5 rounded">{disc}% OFF</span>}
                </div>
                <p className="text-xs text-[#9E8A78]">Inclusive of all taxes · <span className="text-[#6B9E6E] font-semibold">Free Shipping</span></p>
                <p className="text-xs text-[#6B5744] mt-1.5">No Cost EMI from <strong>₹208/month</strong></p>
              </div>

              {/* Description teaser */}
              <p className="text-sm text-[#6B5744] leading-relaxed">
                Indulge in unmatched comfort with our Luxe Cotton Bedsheet Set. Crafted from premium long staple cotton with a silky soft finish that gets better with every wash.
              </p>

              {/* Color */}
              <div>
                <p className="text-[11px] font-bold text-[#3A2A20] tracking-widest mb-2.5">
                  SELECT COLOR: <span className="font-normal text-[#6B5744]">{selColor}</span>
                </p>
                <div className="flex gap-3 flex-wrap">
                  {COLORS.map(c => (
                    <button key={c.name} onClick={() => setSelColor(c.name)} title={c.name}
                      className={`w-9 h-9 rounded-full border-[3px] transition-all relative ${selColor === c.name ? "border-[#D4AF37] scale-110 shadow-lg" : "border-transparent hover:border-[#D8C3A5]"}`}
                      style={{ background: c.hex }}
                    >
                      {selColor === c.name && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <Check className="h-3.5 w-3.5 text-white drop-shadow" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <p className="text-[11px] font-bold text-[#3A2A20] tracking-widest">SELECT SIZE</p>
                  <button className="text-xs text-[#D4AF37] border-b border-[#D4AF37] pb-px hover:text-[#b8932a] hover:border-[#b8932a] transition-colors">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map(s => (
                    <button key={s} onClick={() => setSelSize(s)}
                      className={`px-4 py-2.5 rounded-lg text-xs font-semibold border-2 transition-all ${selSize === s ? "border-[#3A2A20] bg-[#3A2A20] text-white" : "border-[#D8C3A5] text-[#3A2A20] hover:border-[#3A2A20]"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Qty + CTAs */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border-2 border-[#D8C3A5] rounded-lg overflow-hidden">
                    <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-[#3A2A20] hover:bg-[#F5F0EA] transition-colors">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-[#3A2A20]">{qty}</span>
                    <button onClick={() => setQty(q => q + 1)} className="w-10 h-10 flex items-center justify-center text-[#3A2A20] hover:bg-[#F5F0EA] transition-colors">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-[#6B9E6E] font-semibold">✓ In Stock · Ships in 24 hrs</p>
                </div>

                <div className="flex gap-3">
                  <button onClick={handleAddToCart}
                    className={`flex-1 h-13 rounded-xl flex items-center justify-center gap-2 text-sm font-bold tracking-wider transition-all ${cartAnim ? "bg-[#6B9E6E] text-white" : "bg-[#3A2A20] text-white hover:bg-[#4a3830]"}`}
                    style={{ height: "52px" }}>
                    <ShoppingCart className="h-4 w-4" />
                    {cartAnim ? "ADDED TO CART ✓" : "ADD TO CART"}
                  </button>
                  <button className="flex-1 h-13 rounded-xl bg-[#D4AF37] text-[#1a0f06] text-sm font-bold tracking-wider hover:bg-[#b8932a] transition-all flex items-center justify-center gap-2"
                    style={{ height: "52px" }}>
                    <Zap className="h-4 w-4" />
                    BUY NOW
                  </button>
                </div>

                <div className="flex gap-2">
                  <button onClick={handleWishlist}
                    className={`flex-1 h-10 rounded-xl border-2 text-xs font-semibold flex items-center justify-center gap-2 transition-all ${isInWishlist(product.id) ? "border-red-200 bg-red-50 text-red-500" : "border-[#D8C3A5] text-[#6B5744] hover:border-[#3A2A20]"}`}>
                    <motion.span animate={wishAnim ? { scale: [1, 1.45, 1] } : {}} transition={{ duration: 0.35 }}>
                      <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-red-500" : ""}`} />
                    </motion.span>
                    {isInWishlist(product.id) ? "Saved to Wishlist" : "Add to Wishlist"}
                  </button>
                  <button className="h-10 px-4 rounded-xl border-2 border-[#D8C3A5] text-[#6B5744] text-xs font-semibold flex items-center gap-1.5 hover:border-[#25D366] hover:text-[#25D366] transition-all">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </button>
                  <button className="h-10 w-10 rounded-xl border-2 border-[#D8C3A5] text-[#6B5744] flex items-center justify-center hover:border-[#3A2A20] transition-all">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Highlights grid */}
              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-[#E8DDD0]">
                {HIGHLIGHTS.map(h => (
                  <div key={h.label} className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-[#F5F0EA] hover:bg-[#EDE5D8] transition-colors">
                    <h.icon className="h-5 w-5 text-[#D4AF37]" />
                    <p className="text-[10px] font-bold text-[#3A2A20] leading-tight">{h.label}</p>
                    <p className="text-[9px] text-[#9E8A78]">{h.desc}</p>
                  </div>
                ))}
              </div>

              {/* Delivery Checker */}
              <div className="border-2 border-[#E8DDD0] rounded-2xl p-4 bg-white">
                <p className="text-xs font-bold text-[#3A2A20] mb-3 flex items-center gap-2 tracking-wide">
                  <MapPin className="h-4 w-4 text-[#D4AF37]" /> Check Delivery
                </p>
                <div className="flex gap-2">
                  <input value={pincode} onChange={e => { setPincode(e.target.value.slice(0, 6)); setDeliveryInfo(null); }}
                    placeholder="Enter 6-digit pincode" maxLength={6}
                    className="flex-1 h-9 px-3 border-2 border-[#D8C3A5] rounded-lg text-xs outline-none focus:border-[#3A2A20] transition-colors" />
                  <button onClick={checkDelivery} className="h-9 px-4 bg-[#3A2A20] text-white text-xs font-bold rounded-lg hover:bg-[#4a3830] transition-colors">CHECK</button>
                </div>
                <AnimatePresence>
                  {deliveryInfo && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-[#6B9E6E] font-semibold mt-2.5">
                      {deliveryInfo}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ TRUST STRIP ═══ */}
        <div className="bg-white border-y border-[#E8DDD0]">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-0 lg:divide-x divide-[#E8DDD0]">
              {TRUST.map(t => (
                <div key={t.label} className="flex items-center gap-3 lg:justify-center lg:px-6">
                  <t.icon className="h-5 w-5 text-[#D4AF37] shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-[#3A2A20]">{t.label}</p>
                    <p className="text-[10px] text-[#9E8A78]">{t.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ CUSTOMIZE SECTION ═══ */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 lg:py-14">
          <CustomizeSection productName={product.name} productType={product.category?.toLowerCase().replace(/\s+/g, "-")} />
        </div>

        {/* ═══ TABS ═══ */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 lg:py-16">
          <div className="overflow-x-auto border-b border-[#E8DDD0] mb-10">
            <div className="flex gap-0 min-w-max">
              {TABS.map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  className={`px-5 py-3.5 text-[11px] font-bold tracking-wider border-b-2 transition-all whitespace-nowrap ${activeTab === t.id ? "border-[#3A2A20] text-[#3A2A20]" : "border-transparent text-[#9E8A78] hover:text-[#3A2A20]"}`}>
                  {t.label.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          {activeTab === "details" && (
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-[10px] tracking-[0.25em] text-[#D4AF37] font-bold mb-3">CRAFTED FOR COMFORT</p>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#3A2A20] mb-5 leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif" }}>The Art of Luxurious Sleep</h2>
                <p className="text-sm text-[#6B5744] leading-relaxed mb-6">Experience the perfect blend of luxury and comfort with our Luxe Cotton Bedsheet Set. Made from 100% long staple cotton with 300 thread count, this set offers a soft, smooth and breathable feel for a restful sleep every night.</p>
                <ul className="space-y-3 mb-8">
                  {["100% Premium Long Staple Cotton","300 Thread Count for Superior Comfort","Soft, Smooth & Breathable Fabric","Fade Resistant & Long Lasting","Includes: 1 Bedsheet, 2 Pillow Covers","OEKO-TEX Certified — Safe for Skin"].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm text-[#6B5744]">
                      <div className="w-5 h-5 rounded-full bg-[#D4AF37]/15 flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 text-[#D4AF37]" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[product.image, product.image, product.image, product.image].map((img, i) => (
                  <div key={i} className={`overflow-hidden rounded-xl ${i === 0 ? "col-span-2 aspect-video" : "aspect-square"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Specs */}
          {activeTab === "specs" && (
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold text-[#3A2A20] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Product Specifications</h2>
              <div className="border border-[#E8DDD0] rounded-2xl overflow-hidden">
                {SPECS.map((s, i) => (
                  <div key={s.label} className={`flex text-sm ${i % 2 === 0 ? "bg-white" : "bg-[#FAF8F5]"}`}>
                    <div className="w-48 lg:w-56 shrink-0 px-5 py-4 font-semibold text-[#3A2A20] border-r border-[#E8DDD0]">{s.label}</div>
                    <div className="px-5 py-4 text-[#6B5744]">{s.value}</div>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <h3 className="text-lg font-bold text-[#3A2A20] mb-5" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Fabric Technology</h3>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                  {[
                    { label: "Thread Count", value: "300 TC",     color: "#D4AF37" },
                    { label: "Breathability", value: "★★★★★",     color: "#6B9E6E" },
                    { label: "Durability",   value: "10 Years",   color: "#F47C4D" },
                    { label: "Softness",     value: "Ultra Soft", color: "#3A2A20" },
                    { label: "Color Guard",  value: "Anti-Fade",  color: "#9E8A78" },
                  ].map(item => (
                    <div key={item.label} className="flex flex-col items-center text-center p-4 rounded-xl bg-white border border-[#E8DDD0]">
                      <div className="w-10 h-10 rounded-full mb-3 flex items-center justify-center" style={{ background: item.color + "22" }}>
                        <div className="w-4 h-4 rounded-full" style={{ background: item.color }} />
                      </div>
                      <p className="text-sm font-bold text-[#3A2A20]">{item.value}</p>
                      <p className="text-[10px] text-[#9E8A78] mt-0.5">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Care */}
          {activeTab === "care" && (
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold text-[#3A2A20] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Care Instructions</h2>
              <div className="grid gap-4">
                {[
                  { icon: "🌊", title: "Machine Wash Cold",  desc: "Use cold water (30°C) on a gentle cycle. Avoid hot water which can shrink fabric." },
                  { icon: "🚫", title: "Do Not Bleach",      desc: "Bleach will damage the fabric and fade the color. Use mild detergent only." },
                  { icon: "💨", title: "Tumble Dry Low",     desc: "Dry on low heat setting. Remove promptly to avoid wrinkles." },
                  { icon: "🔥", title: "Iron on Low Heat",   desc: "Iron while slightly damp on low heat. Avoid ironing directly on prints." },
                  { icon: "❄️", title: "Store Clean & Dry",  desc: "Store in a cool, dry place. Avoid plastic bags — fabric needs to breathe." },
                ].map(item => (
                  <div key={item.title} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#E8DDD0]">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="text-sm font-bold text-[#3A2A20] mb-1">{item.title}</p>
                      <p className="text-xs text-[#6B5744] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Shipping */}
          {activeTab === "shipping" && (
            <div className="max-w-2xl space-y-4">
              <h2 className="text-xl font-bold text-[#3A2A20]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Shipping & Returns</h2>
              {[
                { title: "Free Shipping",      icon: Truck,       desc: "Free shipping on all orders above ₹499. Standard delivery: 3–7 business days. Express delivery available at checkout." },
                { title: "Easy 7-Day Returns", icon: RefreshCcw,  desc: "Not happy? Return within 7 days of delivery for a full refund. Item must be unused and in original packaging." },
                { title: "10-Year Warranty",   icon: ShieldCheck, desc: "All YUNORA premium products come with a 10-year warranty against manufacturing defects. Claim online in 2 minutes." },
                { title: "Cash on Delivery",   icon: Package,     desc: "COD available on most pincodes. A small COD convenience fee of ₹49 applies." },
              ].map(item => (
                <div key={item.title} className="flex items-start gap-4 p-5 rounded-xl bg-white border border-[#E8DDD0]">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                    <item.icon className="h-5 w-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#3A2A20] mb-1">{item.title}</p>
                    <p className="text-xs text-[#6B5744] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Reviews */}
          {activeTab === "reviews" && (
            <div>
              <div className="grid lg:grid-cols-[260px_1fr] gap-10 mb-8">
                {/* Summary */}
                <div className="bg-white border border-[#E8DDD0] rounded-2xl p-6 h-fit">
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-[#3A2A20] mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{AVG_RATING}</div>
                    <StarRow rating={AVG_RATING} size={16} />
                    <p className="text-xs text-[#9E8A78] mt-2">{TOTAL_REVIEWS} verified reviews</p>
                  </div>
                  <div className="space-y-2">
                    {RATING_BREAKDOWN.map(rb => (
                      <div key={rb.stars} className="flex items-center gap-2">
                        <span className="text-xs text-[#9E8A78] w-5">{rb.stars}★</span>
                        <div className="flex-1 h-2 bg-[#F5F0EA] rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} whileInView={{ width: `${rb.pct}%` }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }} className="h-full bg-[#D4AF37] rounded-full" />
                        </div>
                        <span className="text-xs text-[#9E8A78] w-8 text-right">{rb.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* List */}
                <div>
                  <div className="flex items-center gap-2 mb-6 flex-wrap">
                    {["all","5","4","with photos"].map(f => (
                      <button key={f} onClick={() => setReviewFilter(f)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all ${reviewFilter === f ? "border-[#3A2A20] bg-[#3A2A20] text-white" : "border-[#D8C3A5] text-[#6B5744] hover:border-[#3A2A20]"}`}>
                        {f === "all" ? "All Reviews" : f === "with photos" ? "With Photos" : `${f} Stars`}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {REVIEWS_DATA.map((r, idx) => (
                      <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.07 }}
                        className="bg-white border border-[#E8DDD0] rounded-2xl p-5">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-sm font-bold text-[#3A2A20]">{r.name[0]}</div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-bold text-[#3A2A20]">{r.name}</p>
                                {r.verified && <span className="text-[10px] text-[#6B9E6E] font-semibold flex items-center gap-0.5"><BadgeCheck className="h-3 w-3" /> Verified</span>}
                              </div>
                              <p className="text-[10px] text-[#9E8A78]">{r.date}</p>
                            </div>
                          </div>
                          <StarRow rating={r.rating} size={12} />
                        </div>
                        <p className="text-sm font-bold text-[#3A2A20] mb-1.5">{r.title}</p>
                        <p className="text-xs text-[#6B5744] leading-relaxed mb-3">{r.body}</p>
                        <button className="flex items-center gap-1.5 text-[10px] text-[#9E8A78] hover:text-[#3A2A20] transition-colors">
                          <ThumbsUp className="h-3 w-3" /> Helpful ({r.helpful})
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ═══ WHY YUNORA ═══ */}
        <div className="bg-[#3A2A20] py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-[10px] tracking-[0.3em] text-[#D4AF37] font-bold mb-2">OUR PROMISE</p>
              <h2 className="text-2xl lg:text-3xl font-bold text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Why Choose YUNORA</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { icon: Award,       title: "Premium Materials",  desc: "Finest ethically sourced cotton" },
                { icon: Sparkles,    title: "Luxury Designs",     desc: "Inspired by global trends" },
                { icon: BadgeCheck,  title: "Trusted Brand",      desc: "10+ years of excellence" },
                { icon: Truck,       title: "Fast Delivery",      desc: "Delivered in 3–5 days" },
                { icon: ShieldCheck, title: "Long Warranty",      desc: "10 years guarantee" },
              ].map(item => (
                <div key={item.title} className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-11 h-11 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-[#D4AF37]" />
                  </div>
                  <p className="text-sm font-bold text-white">{item.title}</p>
                  <p className="text-[11px] text-white/50">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ FREQUENTLY BOUGHT TOGETHER ═══ */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14 lg:py-20">
          <h2 className="text-2xl font-bold text-[#3A2A20] mb-1.5" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Frequently Bought Together</h2>
          <p className="text-sm text-[#9E8A78] mb-8">Customers who bought this also loved</p>
          <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-5">
            {/* Main product */}
            <div className="flex items-center gap-4 p-4 rounded-2xl border-2 border-[#D4AF37] bg-[#FAF8F5]">
              <img src={product.image} className="w-20 h-20 rounded-xl object-cover" alt="" />
              <div>
                <p className="text-[10px] font-bold text-[#D4AF37] mb-1 tracking-wider">THIS ITEM</p>
                <p className="text-sm font-bold text-[#3A2A20] leading-tight mb-1.5">{product.name}</p>
                <p className="text-base font-bold text-[#3A2A20]">₹{product.price.toLocaleString("en-IN")}</p>
              </div>
            </div>
            {BOUGHT_TOGETHER.map((item, i) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="text-2xl text-[#D4AF37] font-bold hidden lg:block">+</div>
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-[#E8DDD0] bg-white flex-1">
                  <img src={product.image} className="w-20 h-20 rounded-xl object-cover" alt="" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#3A2A20] leading-tight mb-1">{item.name}</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-sm font-bold text-[#3A2A20]">₹{item.price.toLocaleString("en-IN")}</span>
                      <span className="text-xs text-[#9E8A78] line-through">₹{item.originalPrice.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-[#F5F0EA] border border-[#D8C3A5] min-w-[175px]">
              <p className="text-[11px] text-[#9E8A78] font-semibold">BUNDLE TOTAL</p>
              <p className="text-xl font-bold text-[#3A2A20]">₹{(product.price + BOUGHT_TOGETHER.reduce((a,b) => a + b.price, 0)).toLocaleString("en-IN")}</p>
              <p className="text-xs text-[#F47C4D] font-bold">Save ₹{(((product.originalPrice || product.price) - product.price) + BOUGHT_TOGETHER.reduce((a,b) => a + (b.originalPrice - b.price), 0)).toLocaleString("en-IN")}</p>
              <button className="w-full h-10 bg-[#3A2A20] text-white text-xs font-bold tracking-wider rounded-xl hover:bg-[#4a3830] transition-colors">ADD ALL TO CART</button>
            </div>
          </div>
        </div>

        {/* ═══ WARRANTY ═══ */}
        <div className="bg-white border-t border-[#E8DDD0] py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-[10px] tracking-[0.3em] text-[#D4AF37] font-bold mb-2">PEACE OF MIND</p>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#3A2A20]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>10-Year Warranty Coverage</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {[
                { step: "01", title: "Purchase",      desc: "Warranty begins on purchase date. Keep your invoice safe." },
                { step: "02", title: "Raise a Claim", desc: "Visit yunora.in/warranty or call our 24/7 helpline." },
                { step: "03", title: "Verification",  desc: "Our team verifies the defect within 48 hours." },
                { step: "04", title: "Resolution",    desc: "Free replacement or full refund. Your choice." },
              ].map(item => (
                <div key={item.step} className="flex flex-col gap-3 p-5 bg-[#FAF8F5] border border-[#E8DDD0] rounded-2xl">
                  <div className="text-3xl font-bold text-[#D4AF37]/30" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{item.step}</div>
                  <p className="text-sm font-bold text-[#3A2A20]">{item.title}</p>
                  <p className="text-xs text-[#6B5744] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ FAQs ═══ */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14 lg:py-20">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12">
            <div>
              <p className="text-[10px] tracking-[0.3em] text-[#D4AF37] font-bold mb-3">Q & A</p>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#3A2A20] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Frequently Asked Questions</h2>
              <p className="text-sm text-[#9E8A78] leading-relaxed mb-6">Have a question? Search below or ask us directly and we'll respond within 24 hours.</p>
              <div className="relative mb-5">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9E8A78]" />
                <input value={faqSearch} onChange={e => setFaqSearch(e.target.value)} placeholder="Search questions..."
                  className="w-full pl-9 pr-4 py-3 border-2 border-[#D8C3A5] rounded-xl text-sm outline-none focus:border-[#3A2A20] transition-colors bg-white" />
              </div>
              <div className="flex gap-2">
                <input value={newQ} onChange={e => setNewQ(e.target.value)} placeholder="Ask a new question..."
                  className="flex-1 px-3 py-2.5 border-2 border-[#D8C3A5] rounded-xl text-sm outline-none focus:border-[#3A2A20] transition-colors bg-white" />
                <button className="w-10 h-10 bg-[#3A2A20] text-white rounded-xl flex items-center justify-center hover:bg-[#4a3830] transition-colors">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div>
              {FAQS.filter(f => !faqSearch || f.q.toLowerCase().includes(faqSearch.toLowerCase())).map((faq, i) => (
                <Accordion key={i} title={faq.q} defaultOpen={i === 0}>{faq.a}</Accordion>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ SIMILAR PRODUCTS ═══ */}
        <div className="bg-white border-t border-[#E8DDD0] py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[10px] tracking-[0.3em] text-[#D4AF37] font-bold mb-2">YOU MAY ALSO LIKE</p>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#3A2A20]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Similar Products</h2>
              </div>
              <Link href="/shop" className="text-xs font-bold text-[#3A2A20] border-b-2 border-[#3A2A20] pb-0.5 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors">View All →</Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {(related.length > 0 ? related : products.slice(0, 4)).map((p, idx) => (
                <ProductCard key={p.id} product={p} index={idx} />
              ))}
            </div>
          </div>
        </div>

        {/* ═══ INSTAGRAM GALLERY ═══ */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14 lg:py-20">
          <div className="text-center mb-8">
            <p className="text-[10px] tracking-[0.3em] text-[#D4AF37] font-bold mb-2">REAL HOMES, REAL LUXURY</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#3A2A20] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>As Seen In Our Customers' Homes</h2>
            <p className="text-sm text-[#9E8A78]">Tag <span className="text-[#3A2A20] font-semibold">@yunora.furnishing</span> on Instagram</p>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-xl relative group cursor-pointer">
                <img src={product.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-[#3A2A20]/0 group-hover:bg-[#3A2A20]/45 transition-colors flex items-center justify-center">
                  <span className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity tracking-wide">View Post</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
      <MobileNav />

      {/* ═══ MOBILE STICKY BOTTOM BAR ═══ */}
      <div className="fixed bottom-0 left-0 right-0 z-[150] lg:hidden bg-white border-t border-[#E8DDD0] px-4 py-3 flex gap-3 shadow-xl">
        <button onClick={handleAddToCart}
          className={`flex-1 h-12 rounded-xl flex items-center justify-center gap-2 text-sm font-bold tracking-wide transition-all ${cartAnim ? "bg-[#6B9E6E] text-white" : "bg-[#3A2A20] text-white"}`}>
          <ShoppingCart className="h-4 w-4" />
          {cartAnim ? "ADDED ✓" : "ADD TO CART"}
        </button>
        <button className="flex-1 h-12 rounded-xl bg-[#D4AF37] text-[#1a0f06] text-sm font-bold tracking-wide flex items-center justify-center gap-2">
          <Zap className="h-4 w-4" />
          BUY NOW
        </button>
      </div>
    </div>
  );
}
