import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Share2, Truck, ShieldCheck, RefreshCcw, BadgeCheck,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, X, ZoomIn,
  MessageCircle, MapPin, Award, Leaf, Sparkles, Wind,
  Check, Plus, Minus, ThumbsUp, Search, Send, ShoppingCart, Zap,
  ExternalLink, Eye, Package, Star, Wand2, Phone
} from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import ProductCard from "@/components/ui/ProductCard";
import CustomizeModal from "@/components/ui/CustomizeModal";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

/* ─── Static data ─── */
const COLORS = [
  { name: "Olive Green", hex: "#7A8A5E" },
  { name: "Ivory White", hex: "#F2EDE4" },
  { name: "Navy Blue",   hex: "#3A5070" },
  { name: "Terracotta",  hex: "#C4614A" },
];
const SIZES = ["Single", "Queen", "King", "Super King"];
const HIGHLIGHTS = [
  { icon: Leaf,        label: "100% Cotton",      desc: "Long Staple" },
  { icon: Award,       label: "300 Thread Count", desc: "Premium Quality" },
  { icon: Wind,        label: "Breathable",       desc: "All Season Comfort" },
  { icon: Sparkles,    label: "Skin Friendly",    desc: "Soft & Gentle" },
];
const TRUST_STRIP = [
  { icon: Truck,       label: "Free Shipping",    sub: "On all orders" },
  { icon: RefreshCcw,  label: "Easy Returns",     sub: "Hassle-free returns" },
  { icon: ShieldCheck, label: "Secure Payments",  sub: "100% safe & secure" },
  { icon: Award,       label: "10 Year Warranty", sub: "On premium products" },
  { icon: Package,     label: "Fabric Sample",    sub: "Order swatches" },
  { icon: MessageCircle, label: "24/7 Support",   sub: "We're here to help" },
];
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
const REVIEWS_DATA = [
  { id: 1, name: "Priya S.",  date: "12 June 2025", rating: 5, title: "Absolutely Luxurious!", body: "The quality of this bedsheet is outstanding. It feels incredibly soft and the colors are vibrant even after multiple washes. Delivery was fast and packaging was premium.", verified: true,  helpful: 42 },
  { id: 2, name: "Rahul M.",  date: "4 May 2025",   rating: 5, title: "Best Bedsheet I've Owned", body: "Super soft fabric, elegant design. Fits perfectly on our Queen bed. YUNORA has set the bar very high.", verified: true,  helpful: 31 },
  { id: 3, name: "Sneha K.",  date: "28 Apr 2025",  rating: 4, title: "Premium Quality",          body: "Very happy with the purchase. The fabric is breathable and comfortable. Product more than made up for the slight delay.", verified: true,  helpful: 18 },
  { id: 4, name: "Amit V.",   date: "15 Apr 2025",  rating: 5, title: "Great Value for Money",    body: "The packaging was luxurious, almost like unboxing an Apple product. The bedsheet itself is silky smooth.", verified: true,  helpful: 27 },
  { id: 5, name: "Kavya R.",  date: "2 Apr 2025",   rating: 4, title: "Beautiful Design",         body: "The olive green color is exactly as shown. Great quality cotton that feels premium. Will buy more.", verified: false, helpful: 11 },
];
const RATING_BREAKDOWN = [
  { stars: 5, pct: 72 }, { stars: 4, pct: 18 }, { stars: 3, pct: 6 }, { stars: 2, pct: 2 }, { stars: 1, pct: 2 },
];
const AVG_RATING = 4.8;
const TOTAL_REVIEWS = 128;
const FAQS = [
  { q: "What is included in the set?",                       a: "1 fitted/flat bedsheet and 2 matching pillow covers in your selected size." },
  { q: "Suitable for all weather conditions?",               a: "Yes! Breathable 100% cotton fabric ensures comfort in both summer and winter." },
  { q: "How do I care for this bedsheet?",                   a: "Machine wash cold on gentle cycle. Tumble dry low. Do not bleach. Iron on low heat." },
  { q: "Does the color fade after washing?",                 a: "No. Our Anti-Fade technology ensures colors remain vibrant wash after wash." },
  { q: "Is EMI available?",                                  a: "Yes! EMI available from ₹208/month with zero down payment via Razorpay, PhonePe & more." },
  { q: "Can I return if not satisfied?",                     a: "Yes, we offer hassle-free 7-day returns. Product must be unused in original packaging." },
];
const BOUGHT_TOGETHER = [
  { id: 10, name: "Premium Cushion Cover",  price: 499,  originalPrice: 889  },
  { id: 11, name: "Quilted Comforter",      price: 2999, originalPrice: 5499 },
];
const MP_CONFIG = [
  { id: "amazon",   name: "Amazon",   color: "#FF9900", bg: "#FFFBF2", logo: <span style={{ fontSize: 20, fontWeight: 900, fontFamily: "Arial", color: "#232F3E" }}>amazon</span> },
  { id: "flipkart", name: "Flipkart", color: "#2874F0", bg: "#F0F5FF", logo: <span style={{ fontSize: 20, fontWeight: 900, fontFamily: "Arial", color: "#2874F0" }}>Flipkart</span> },
  { id: "myntra",   name: "Myntra",   color: "#FF3F6C", bg: "#FFF0F4", logo: <span style={{ fontSize: 20, fontWeight: 900, fontFamily: "Arial", color: "#FF3F6C" }}>Myntra</span> },
  { id: "ajio",     name: "AJIO",     color: "#1D1D1B", bg: "#F5F5F3", logo: <span style={{ fontSize: 18, fontWeight: 900, fontFamily: "Arial", letterSpacing: 2, color: "#1D1D1B" }}>AJIO</span> },
  { id: "snapdeal", name: "Snapdeal", color: "#E40000", bg: "#FFF3F3", logo: <span style={{ fontSize: 18, fontWeight: 700, fontFamily: "Arial", color: "#E40000" }}>Snapdeal</span> },
] as const;
type MPKey = "amazon" | "flipkart" | "myntra" | "ajio" | "snapdeal";
const WHY_YUNORA = [
  "Exclusive Website Offers",
  "Customization Available",
  "Priority Customer Support",
  "Reward Points",
  "Extended Warranty",
  "Better Pricing",
  "Premium Packaging",
];

/* ─── Helpers ─── */
function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(s => (
        <svg key={s} width={size} height={size} viewBox="0 0 24 24"
          fill={s <= Math.round(rating) ? "#D4AF37" : "none"} stroke="#D4AF37" strokeWidth="1.5">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
        </svg>
      ))}
    </span>
  );
}

function Accordion({ title, children, open: controlledOpen }: { title: string; children: React.ReactNode; open?: boolean }) {
  const [open, setOpen] = useState(controlledOpen ?? false);
  return (
    <div className="border-b border-[#E8DDD0]">
      <button className="w-full flex items-center justify-between py-4 text-left" onClick={() => setOpen(o => !o)}>
        <span className="text-sm font-medium text-[#3A2A20]">{title}</span>
        {open ? <ChevronUp className="h-4 w-4 text-[#9E8A78] shrink-0"/> : <ChevronDown className="h-4 w-4 text-[#9E8A78] shrink-0"/>}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="pb-5 text-sm text-[#6B5744] leading-relaxed">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Component ─── */
export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id)) || products[1];
  const related  = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const gallery = [product.image, product.image, product.image, product.image, product.image, product.image, product.image, product.image];
  const activeMarketplaces = MP_CONFIG.filter(mp => product.marketplaces?.[mp.id as MPKey]);

  /* State */
  const [activeImg,      setActiveImg]      = useState(0);
  const [zoom,           setZoom]           = useState(false);
  const [zoomPos,        setZoomPos]        = useState({ x: 50, y: 50 });
  const [fullscreen,     setFullscreen]     = useState(false);
  const [selColor,       setSelColor]       = useState(COLORS[0].name);
  const [selSize,        setSelSize]        = useState("Queen");
  const [qty,            setQty]            = useState(1);
  const [activeTab,      setActiveTab]      = useState("details");
  const [pincode,        setPincode]        = useState("");
  const [deliveryInfo,   setDeliveryInfo]   = useState<null | { date: string; cod: boolean; express: boolean }>(null);
  const [stickyBar,      setStickyBar]      = useState(false);
  const [cartAnim,       setCartAnim]       = useState(false);
  const [wishAnim,       setWishAnim]       = useState(false);
  const [customizeOpen,  setCustomizeOpen]  = useState(false);
  const [reviewFilter,   setReviewFilter]   = useState("all");
  const [faqSearch,      setFaqSearch]      = useState("");
  const [sampleOrdered,  setSampleOrdered]  = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => { if (heroRef.current) setStickyBar(window.scrollY > heroRef.current.offsetHeight + 40); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setFullscreen(false); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoom) return;
    const r = e.currentTarget.getBoundingClientRect();
    setZoomPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  }, [zoom]);

  const handleAddToCart = () => { addToCart(); setCartAnim(true); setTimeout(() => setCartAnim(false), 2200); };
  const handleWishlist  = () => { toggleWishlist(product.id); setWishAnim(true); setTimeout(() => setWishAnim(false), 600); };

  const checkDelivery = () => {
    if (pincode.length !== 6) return;
    const days = 3 + Math.floor(Math.random() * 3);
    const now = new Date(); now.setDate(now.getDate() + days);
    setDeliveryInfo({
      date: now.toLocaleDateString("en-IN", { day: "numeric", month: "short" }) + " – " + new Date(now.getTime() + 86400000).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      cod: true,
      express: days <= 4,
    });
  };

  const openWhatsApp = (msg?: string) => {
    const text = msg || encodeURIComponent(`Hello YUNORA Team! 👋\n\nI'm interested in: *${product.name}*\nSize: ${selSize}\nColor: ${selColor}\n\nPlease assist me.`);
    window.open(`https://wa.me/919999999999?text=${typeof msg === "string" ? msg : text}`, "_blank");
  };

  const disc = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const TABS = [
    { id: "details",     label: "Product Details" },
    { id: "specs",       label: "Specifications" },
    { id: "care",        label: "Care Instructions" },
    { id: "reviews",     label: `Reviews (${TOTAL_REVIEWS})` },
    { id: "qa",          label: "Q&A" },
    { id: "visualizer",  label: "Room Visualizer" },
    { id: "sizeguide",   label: "Size Guide" },
    { id: "compare",     label: "Compare" },
    { id: "warranty",    label: "Warranty" },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF8F5", fontFamily: "'Inter', sans-serif" }}>
      <AnnouncementBar />
      <Header />

      {/* Customize Modal */}
      <CustomizeModal open={customizeOpen} onClose={() => setCustomizeOpen(false)} productName={product.name} productType={product.category?.toLowerCase().replace(/\s+/g, "-")} />

      {/* ─── Sticky Top Bar ─── */}
      <AnimatePresence>
        {stickyBar && (
          <motion.div initial={{ y: -64 }} animate={{ y: 0 }} exit={{ y: -64 }} transition={{ duration: 0.25 }}
            className="fixed top-0 inset-x-0 z-[200] bg-white/97 backdrop-blur-md border-b border-[#E8DDD0] shadow-sm hidden lg:block">
            <div className="max-w-[1320px] mx-auto px-6 h-14 flex items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <img src={product.image} className="h-9 w-9 object-cover rounded-lg" alt=""/>
                <div>
                  <p className="text-sm font-semibold text-[#3A2A20] leading-tight">{product.name}</p>
                  <div className="flex items-center gap-1.5"><Stars rating={AVG_RATING} size={11}/><span className="text-[10px] text-[#9E8A78]">({TOTAL_REVIEWS})</span></div>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-[#3A2A20]">₹{product.price.toLocaleString("en-IN")}</span>
                  {product.originalPrice && <span className="text-sm text-[#9E8A78] line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>}
                  {disc > 0 && <span className="text-xs font-bold text-[#F47C4D]">{disc}% OFF</span>}
                </div>
                <div className="flex gap-2">
                  <button onClick={handleAddToCart} className={`h-9 px-5 text-xs font-bold tracking-wider rounded-lg transition-colors ${cartAnim ? "bg-[#6B9E6E] text-white" : "bg-[#3A2A20] text-white hover:bg-[#4a3830]"}`}>{cartAnim ? "✓ ADDED" : "ADD TO CART"}</button>
                  <button className="h-9 px-5 bg-[#D4AF37] text-[#1a0f06] text-xs font-bold tracking-wider rounded-lg hover:bg-[#b8932a] transition-colors">BUY NOW</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Fullscreen Gallery ─── */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center" onClick={() => setFullscreen(false)}>
            <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors" onClick={() => setFullscreen(false)}>
              <X className="h-5 w-5"/>
            </button>
            <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors" onClick={e => { e.stopPropagation(); setActiveImg(i => (i - 1 + gallery.length) % gallery.length); }}>
              <ChevronLeft className="h-6 w-6"/>
            </button>
            <motion.img key={activeImg} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} src={gallery[activeImg]} alt="" className="max-h-[88vh] max-w-[88vw] object-contain rounded-xl" onClick={e => e.stopPropagation()}/>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors" onClick={e => { e.stopPropagation(); setActiveImg(i => (i + 1) % gallery.length); }}>
              <ChevronRight className="h-6 w-6"/>
            </button>
            <div className="absolute bottom-5 flex gap-1.5">
              {gallery.map((_,i) => (
                <button key={i} onClick={e => { e.stopPropagation(); setActiveImg(i); }} className={`rounded-full transition-all ${i === activeImg ? "w-5 h-1.5 bg-[#D4AF37]" : "w-1.5 h-1.5 bg-white/40"}`}/>
              ))}
            </div>
            <div className="absolute bottom-5 right-6 text-white/50 text-xs">{activeImg + 1} / {gallery.length}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pb-20 lg:pb-0">

        {/* ─── Breadcrumb ─── */}
        <div className="max-w-[1320px] mx-auto px-4 lg:px-8 pt-4 pb-1">
          <nav className="flex items-center gap-1.5 text-[11px] text-[#9E8A78]">
            <Link href="/" className="hover:text-[#3A2A20] transition-colors">Home</Link>
            <span>›</span>
            <Link href={`/category/${product.category}`} className="hover:text-[#3A2A20] transition-colors capitalize">{product.category}</Link>
            <span>›</span>
            <span className="text-[#3A2A20] font-medium">{product.name}</span>
          </nav>
        </div>

        {/* ═══════════════════════════════════════
            HERO — 3-column on desktop
            [gallery] [product-info] [sidebar]
        ════════════════════════════════════════ */}
        <div ref={heroRef} className="max-w-[1320px] mx-auto px-4 lg:px-8 py-4 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr_300px] gap-5 lg:gap-6 xl:grid-cols-[460px_1fr_300px]">

            {/* ── COL 1: Gallery ── */}
            <div className="flex gap-2.5">
              {/* Vertical thumbnails */}
              <div className="hidden lg:flex flex-col gap-2 w-[58px] shrink-0">
                {gallery.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`w-full aspect-square rounded-lg overflow-hidden border-2 transition-all ${i === activeImg ? "border-[#D4AF37] shadow-sm" : "border-transparent hover:border-[#D8C3A5]"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover"/>
                  </button>
                ))}
              </div>

              {/* Main image */}
              <div className="flex-1 flex flex-col gap-2">
                <div
                  className="relative overflow-hidden rounded-2xl bg-[#EDE8E0] select-none cursor-zoom-in"
                  style={{ aspectRatio: "3/4" }}
                  onMouseEnter={() => setZoom(true)}
                  onMouseLeave={() => setZoom(false)}
                  onMouseMove={onMouseMove}
                  onClick={() => setFullscreen(true)}
                >
                  <motion.img key={activeImg} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.22 }}
                    src={gallery[activeImg]} alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-200"
                    style={zoom ? { transform: "scale(1.75)", transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}/>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
                    {product.isBestSeller && <span className="bg-[#3A2A20] text-white text-[9px] font-extrabold tracking-[0.16em] px-2.5 py-1 rounded-sm">BESTSELLER</span>}
                    {product.isNew        && <span className="bg-[#D4AF37] text-[#1a0f06] text-[9px] font-extrabold tracking-[0.16em] px-2.5 py-1 rounded-sm">NEW</span>}
                  </div>

                  {/* Top-right actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                    <button onClick={e => { e.stopPropagation(); handleWishlist(); }}
                      className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-sm hover:scale-110">
                      <Heart className={`h-3.5 w-3.5 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-[#3A2A20]"}`}/>
                    </button>
                    <button onClick={e => e.stopPropagation()} className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-sm hover:scale-110">
                      <Share2 className="h-3.5 w-3.5 text-[#3A2A20]"/>
                    </button>
                    <button onClick={e => e.stopPropagation()} className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-sm hover:scale-110">
                      <ZoomIn className="h-3.5 w-3.5 text-[#3A2A20]"/>
                    </button>
                  </div>

                  {/* Arrow nav */}
                  <button className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center shadow-sm hover:bg-white transition-all"
                    onClick={e => { e.stopPropagation(); setActiveImg(i => (i - 1 + gallery.length) % gallery.length); }}>
                    <ChevronLeft className="h-4 w-4 text-[#3A2A20]"/>
                  </button>
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center shadow-sm hover:bg-white transition-all"
                    onClick={e => { e.stopPropagation(); setActiveImg(i => (i + 1) % gallery.length); }}>
                    <ChevronRight className="h-4 w-4 text-[#3A2A20]"/>
                  </button>

                  {/* View in Your Room */}
                  <button className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-[#3A2A20] hover:bg-white transition-all shadow-sm"
                    onClick={e => { e.stopPropagation(); setActiveTab("visualizer"); }}>
                    <Eye className="h-3 w-3"/> View in Your Room
                  </button>

                  {/* Counter */}
                  <span className="absolute bottom-3 right-3 bg-black/40 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                    {activeImg + 1} / {gallery.length}
                  </span>
                </div>

                {/* Mobile thumbnail row */}
                <div className="flex lg:hidden gap-1.5 overflow-x-auto scrollbar-none">
                  {gallery.map((img, i) => (
                    <button key={i} onClick={() => setActiveImg(i)} className={`w-12 h-12 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${i === activeImg ? "border-[#D4AF37]" : "border-transparent"}`}>
                      <img src={img} alt="" className="w-full h-full object-cover"/>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── COL 2: Product Info ── */}
            <div className="flex flex-col gap-4">
              {/* Brand + Title */}
              <div>
                <p className="text-[10px] tracking-[0.26em] font-bold text-[#D4AF37] mb-1.5">YUNORA SIGNATURE</p>
                <h1 className="text-2xl lg:text-[1.85rem] font-bold text-[#3A2A20] leading-tight mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {product.name}
                </h1>
                <p className="text-xs text-[#9E8A78]">Premium 300 TC | 100% Long Staple Cotton</p>
              </div>

              {/* Rating row */}
              <div className="flex items-center gap-2 flex-wrap">
                <Stars rating={AVG_RATING} size={14}/>
                <span className="text-sm font-bold text-[#3A2A20]">{AVG_RATING}</span>
                <button onClick={() => setActiveTab("reviews")} className="text-sm text-[#9E8A78] hover:text-[#D4AF37] transition-colors">({TOTAL_REVIEWS} Reviews)</button>
                <div className="w-px h-3 bg-[#D8C3A5]"/>
                <span className="text-xs text-[#F47C4D] font-semibold flex items-center gap-1">
                  <Package className="h-3 w-3"/> 450+ Sold this month
                </span>
                <span className="text-xs text-[#6B9E6E] font-semibold flex items-center gap-1">
                  <BadgeCheck className="h-3 w-3"/> Verified Purchase
                </span>
              </div>

              {/* Price */}
              <div>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-3xl font-bold text-[#3A2A20]">₹{product.price.toLocaleString("en-IN")}</span>
                  {product.originalPrice && <span className="text-lg text-[#9E8A78] line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>}
                  {disc > 0 && <span className="bg-[#F47C4D] text-white text-xs font-bold px-2 py-0.5 rounded">{disc}% OFF</span>}
                </div>
                <p className="text-xs text-[#9E8A78] mt-1">Inclusive of all taxes | <span className="text-[#6B9E6E] font-semibold">Free Shipping</span></p>
              </div>

              {/* Description */}
              <p className="text-sm text-[#6B5744] leading-relaxed">
                Indulge in unmatched comfort with our {product.name}. Crafted from premium long staple cotton with a silky soft finish that gets better with every wash.
              </p>

              {/* Color */}
              <div>
                <p className="text-[11px] font-bold text-[#3A2A20] tracking-widest mb-2">
                  Select Color: <span className="font-normal text-[#6B5744]">{selColor}</span>
                </p>
                <div className="flex gap-2.5 flex-wrap">
                  {COLORS.map(c => (
                    <button key={c.name} onClick={() => setSelColor(c.name)} title={c.name}
                      className={`w-8 h-8 rounded-full border-[3px] transition-all relative ${selColor === c.name ? "border-[#D4AF37] scale-110 shadow-md" : "border-[#E8DDD0] hover:border-[#D8C3A5]"}`}
                      style={{ background: c.hex }}>
                      {selColor === c.name && <Check className="absolute inset-0 m-auto h-3 w-3 text-white drop-shadow"/>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <p className="text-[11px] font-bold text-[#3A2A20] tracking-widest mb-2">Select Size:</p>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map(s => (
                    <button key={s} onClick={() => setSelSize(s)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold border-2 transition-all ${selSize === s ? "border-[#3A2A20] bg-[#3A2A20] text-white" : "border-[#D8C3A5] text-[#3A2A20] hover:border-[#3A2A20]"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feature highlights — horizontal 4 tiles */}
              <div className="grid grid-cols-4 gap-2 py-3 border-y border-[#E8DDD0]">
                {HIGHLIGHTS.map(h => (
                  <div key={h.label} className="flex flex-col items-center text-center gap-1 p-2 rounded-xl bg-[#F8F5F0]">
                    <h.icon className="h-5 w-5 text-[#D4AF37]"/>
                    <p className="text-[9px] font-bold text-[#3A2A20] leading-tight">{h.label}</p>
                    <p className="text-[8px] text-[#9E8A78]">{h.desc}</p>
                  </div>
                ))}
              </div>

              {/* Qty + CTAs */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border-2 border-[#D8C3A5] rounded-xl overflow-hidden">
                    <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center text-[#3A2A20] hover:bg-[#F5F0EA] transition-colors"><Minus className="h-3.5 w-3.5"/></button>
                    <span className="w-9 text-center text-sm font-bold text-[#3A2A20]">{qty}</span>
                    <button onClick={() => setQty(q => q + 1)} className="w-9 h-9 flex items-center justify-center text-[#3A2A20] hover:bg-[#F5F0EA] transition-colors"><Plus className="h-3.5 w-3.5"/></button>
                  </div>
                  <p className="text-xs text-[#6B9E6E] font-semibold">✓ In Stock · Ships in 24 hrs</p>
                </div>

                <div className="flex gap-2.5">
                  <button onClick={handleAddToCart}
                    className={`flex-1 h-12 rounded-xl flex items-center justify-center gap-2 text-sm font-bold tracking-wide transition-all ${cartAnim ? "bg-[#6B9E6E] text-white" : "bg-[#3A2A20] text-white hover:bg-[#4a3830]"}`}>
                    <ShoppingCart className="h-4 w-4"/>
                    {cartAnim ? "ADDED TO CART ✓" : "Add to Cart"}
                  </button>
                  <button className="flex-1 h-12 rounded-xl bg-[#D4AF37] text-[#1a0f06] text-sm font-bold tracking-wide hover:bg-[#c9a030] transition-all flex items-center justify-center gap-2">
                    <Zap className="h-4 w-4"/> Buy Now
                  </button>
                </div>

                <div className="flex gap-2">
                  <motion.button onClick={handleWishlist}
                    className={`flex-1 h-9 rounded-xl border-2 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${isInWishlist(product.id) ? "border-red-200 bg-red-50 text-red-500" : "border-[#D8C3A5] text-[#6B5744] hover:border-[#3A2A20]"}`}>
                    <motion.span animate={wishAnim ? { scale: [1, 1.5, 1] } : {}} transition={{ duration: 0.3 }}>
                      <Heart className={`h-3.5 w-3.5 ${isInWishlist(product.id) ? "fill-red-500" : ""}`}/>
                    </motion.span>
                    {isInWishlist(product.id) ? "Wishlisted" : "Add to Wishlist"}
                  </motion.button>
                  <button onClick={() => openWhatsApp()}
                    className="h-9 px-3 rounded-xl border-2 border-[#D8C3A5] text-[#6B5744] text-xs font-semibold flex items-center gap-1.5 hover:border-[#25D366] hover:text-[#25D366] transition-all">
                    <MessageCircle className="h-3.5 w-3.5"/> WhatsApp
                  </button>
                  <button className="h-9 w-9 rounded-xl border-2 border-[#D8C3A5] text-[#6B5744] flex items-center justify-center hover:border-[#3A2A20] transition-all">
                    <Share2 className="h-3.5 w-3.5"/>
                  </button>
                </div>
              </div>

              {/* EMI note */}
              <p className="text-xs text-[#9E8A78]">No Cost EMI from <strong className="text-[#3A2A20]">₹208/month</strong> · <a href="#" className="text-[#D4AF37] hover:underline">View EMI Plans</a></p>
            </div>

            {/* ── COL 3: Right Sidebar ── */}
            <div className="flex flex-col gap-4">

              {/* ── Customize This Product Card ── */}
              <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(160deg, #2e1d11 0%, #3a2a20 100%)", boxShadow: "0 8px 30px rgba(58,42,32,0.25)" }}>
                <div className="p-5">
                  <p className="text-[10px] tracking-[0.22em] font-bold text-[#D4AF37] mb-1.5">MADE TO ORDER</p>
                  <h3 className="text-base font-bold text-white mb-2 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Customize This Product
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed mb-4">
                    Create a perfect made-to-order version according to your size, fabric, color & design as per your space.
                  </p>
                  <button onClick={() => setCustomizeOpen(true)}
                    className="w-full h-10 bg-[#D4AF37] text-[#1a0f06] text-xs font-bold tracking-wider rounded-xl hover:bg-[#e8c84a] transition-all flex items-center justify-center gap-2 mb-2.5">
                    <Wand2 className="h-3.5 w-3.5"/> Customize Now
                  </button>
                  <button onClick={() => openWhatsApp(encodeURIComponent(`Hello YUNORA Team! 👋\n\nI want to customize: *${product.name}*\nPlease guide me through options.\n\nThank you!`))}
                    className="w-full h-10 bg-[#25D366] text-white text-xs font-bold tracking-wider rounded-xl hover:bg-[#1da855] transition-all flex items-center justify-center gap-2">
                    <MessageCircle className="h-3.5 w-3.5"/>
                    <div className="text-left">
                      <p className="text-xs font-bold leading-none">Chat on WhatsApp</p>
                      <p className="text-[9px] text-white/70 mt-0.5">Get expert guidance for custom orders</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* ── Check Delivery Card ── */}
              <div className="rounded-2xl border border-[#E8DDD0] bg-white p-5">
                <p className="text-sm font-bold text-[#3A2A20] mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#D4AF37]"/> Check Delivery
                </p>
                <div className="flex gap-2 mb-2">
                  <input value={pincode} onChange={e => { setPincode(e.target.value.replace(/\D/g, "").slice(0, 6)); setDeliveryInfo(null); }}
                    placeholder="Enter Pincode" maxLength={6}
                    className="flex-1 h-9 px-3 border-2 border-[#D8C3A5] rounded-xl text-xs outline-none focus:border-[#3A2A20] transition-colors bg-[#FAF8F5]"/>
                  <button onClick={checkDelivery}
                    className="h-9 px-4 bg-[#3A2A20] text-white text-xs font-bold rounded-xl hover:bg-[#4a3830] transition-colors">Check</button>
                </div>
                <AnimatePresence>
                  {deliveryInfo && (
                    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#9E8A78]">Estimated Delivery</span>
                        <span className="font-bold text-[#3A2A20]">{deliveryInfo.date}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#9E8A78]">Cash on Delivery</span>
                        <span className={`font-bold ${deliveryInfo.cod ? "text-[#6B9E6E]" : "text-[#F47C4D]"}`}>{deliveryInfo.cod ? "Available" : "Not Available"}</span>
                      </div>
                      {deliveryInfo.express && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#9E8A78]">Express Delivery</span>
                          <span className="font-bold text-[#D4AF37]">Available</span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
                {!deliveryInfo && <p className="text-[10px] text-[#9E8A78]">Enter pincode to check delivery date & options</p>}
              </div>

              {/* ── Fabric Sample Card ── */}
              <div className="rounded-2xl border border-[#E8DDD0] bg-white p-4 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center shrink-0">
                  <Package className="h-4.5 w-4.5 text-[#D4AF37]" style={{ width: 18, height: 18 }}/>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#3A2A20] mb-0.5">Order Fabric Sample</p>
                  <p className="text-[10px] text-[#9E8A78] leading-snug mb-2">Get fabric swatches before purchasing.</p>
                  <button onClick={() => setSampleOrdered(true)}
                    className={`h-7 px-3 rounded-lg text-[10px] font-bold transition-all ${sampleOrdered ? "bg-[#6B9E6E] text-white" : "bg-[#3A2A20] text-white hover:bg-[#4a3830]"}`}>
                    {sampleOrdered ? "✓ Ordered" : "Order Sample"}
                  </button>
                </div>
              </div>

              {/* ── Quick contact ── */}
              <div className="rounded-2xl border border-[#E8DDD0] bg-[#FAF8F5] p-4">
                <p className="text-[10px] font-bold text-[#9E8A78] tracking-widest mb-3">NEED HELP?</p>
                <div className="space-y-2">
                  <button onClick={() => openWhatsApp()} className="w-full flex items-center gap-2.5 text-xs text-[#25D366] font-semibold hover:opacity-80 transition-opacity">
                    <div className="w-7 h-7 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0"><MessageCircle className="h-3.5 w-3.5"/></div>
                    Chat on WhatsApp
                  </button>
                  <a href="tel:+919999999999" className="w-full flex items-center gap-2.5 text-xs text-[#6B5744] font-semibold hover:text-[#3A2A20] transition-colors">
                    <div className="w-7 h-7 rounded-full bg-[#3A2A20]/08 flex items-center justify-center shrink-0"><Phone className="h-3.5 w-3.5"/></div>
                    +91 99999 99999
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ MARKETPLACE + WHY YUNORA ═══ */}
        {activeMarketplaces.length > 0 && (
          <div className="max-w-[1320px] mx-auto px-4 lg:px-8 pb-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="rounded-2xl border border-[#E8DDD0] overflow-hidden"
              style={{ background: "#FDFCFA", boxShadow: "0 4px 24px rgba(58,42,32,0.07)" }}
            >
              <div className="grid lg:grid-cols-[1fr_280px]">
                {/* Left: marketplace cards */}
                <div className="p-5 lg:p-6 border-b lg:border-b-0 lg:border-r border-[#E8DDD0]">
                  <div className="mb-4">
                    <p className="text-[10px] tracking-[0.22em] font-bold text-[#D4AF37] mb-1">OFFICIAL LISTINGS</p>
                    <h3 className="text-base font-bold text-[#3A2A20]">Available On Trusted Marketplaces</h3>
                    <p className="text-xs text-[#9E8A78] mt-1">Shop from YUNORA or your preferred marketplace with the same authentic quality.</p>
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none lg:flex-wrap">
                    {activeMarketplaces.map((mp, i) => (
                      <motion.a key={mp.id} href={product.marketplaces?.[mp.id as MPKey]} target="_blank" rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                        whileHover={{ y: -3 }}
                        className="flex flex-col items-center gap-2.5 p-4 rounded-xl border-2 border-[#E8DDD0] shrink-0 w-[130px] lg:w-[140px] group transition-all hover:border-[#D8C3A5] hover:shadow-md cursor-pointer"
                        style={{ background: mp.bg }}>
                        <div className="h-7 flex items-center">{mp.logo}</div>
                        <div className="flex items-center gap-1">
                          <BadgeCheck className="h-3 w-3" style={{ color: mp.color }}/>
                          <span className="text-[9px] font-bold" style={{ color: mp.color }}>Verified</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-[#3A2A20] group-hover:underline">
                          View on {mp.name} <ExternalLink className="h-2.5 w-2.5 shrink-0"/>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#E8DDD0] flex items-center gap-4 flex-wrap">
                    {["Verified Listing", "Authentic Product", "Secure Checkout"].map(t => (
                      <span key={t} className="flex items-center gap-1 text-[10px] text-[#9E8A78]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6B9E6E] shrink-0"/>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Why Shop on YUNORA */}
                <div className="p-5 lg:p-6" style={{ background: "linear-gradient(160deg, #FAF8F5 0%, #F0EBE2 100%)" }}>
                  <p className="text-[10px] tracking-[0.22em] font-bold text-[#D4AF37] mb-1">BEST CHOICE</p>
                  <h3 className="text-sm font-bold text-[#3A2A20] mb-3">Why Shop on YUNORA?</h3>
                  <div className="space-y-2">
                    {WHY_YUNORA.map(item => (
                      <div key={item} className="flex items-center gap-2 text-xs text-[#6B5744]">
                        <div className="w-4 h-4 rounded-full bg-[#D4AF37]/15 flex items-center justify-center shrink-0">
                          <Check className="h-2.5 w-2.5 text-[#D4AF37]"/>
                        </div>
                        {item}
                      </div>
                    ))}
                  </div>
                  <button onClick={handleAddToCart}
                    className="mt-4 w-full h-9 bg-[#3A2A20] text-white text-xs font-bold rounded-xl hover:bg-[#4a3830] transition-colors flex items-center justify-center gap-2">
                    <ShoppingCart className="h-3.5 w-3.5"/> Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* ═══ TRUST STRIP ═══ */}
        <div className="bg-white border-y border-[#E8DDD0]">
          <div className="max-w-[1320px] mx-auto px-4 lg:px-8 py-4">
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-0 lg:divide-x divide-[#E8DDD0]">
              {TRUST_STRIP.map(t => (
                <div key={t.label} className="flex items-center gap-2 lg:justify-center lg:px-4">
                  <t.icon className="h-5 w-5 text-[#D4AF37] shrink-0"/>
                  <div>
                    <p className="text-xs font-bold text-[#3A2A20] leading-tight">{t.label}</p>
                    <p className="text-[10px] text-[#9E8A78]">{t.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ TABS ═══ */}
        <div className="max-w-[1320px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
          <div className="overflow-x-auto border-b border-[#E8DDD0] mb-8">
            <div className="flex min-w-max">
              {TABS.map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  className={`px-4 py-3 text-[11px] font-bold tracking-wider border-b-2 transition-all whitespace-nowrap ${activeTab === t.id ? "border-[#3A2A20] text-[#3A2A20]" : "border-transparent text-[#9E8A78] hover:text-[#6B5744]"}`}>
                  {t.label.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          {activeTab === "details" && (
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-[10px] tracking-[0.24em] text-[#D4AF37] font-bold mb-2">CRAFTED FOR COMFORT</p>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#3A2A20] mb-4 leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Luxury You Can Feel</h2>
                <p className="text-sm text-[#6B5744] leading-relaxed mb-5">Crafted with 100% long staple cotton and a 300 thread count, this {product.category.replace("-"," ")} offers unmatched softness, breathability, and durability.</p>
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {[
                    { icon: "✓", label: "Soft & Smooth" },
                    { icon: "✓", label: "Fade Resistant" },
                    { icon: "✓", label: "Durable Quality" },
                    { icon: "✓", label: "All Season Comfort" },
                    { icon: "✓", label: "OEKO-TEX Certified" },
                    { icon: "✓", label: "Made In India" },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-1.5 text-xs text-[#6B5744]">
                      <span className="text-[#6B9E6E] font-bold">{item.icon}</span> {item.label}
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[0,1,2,3].map(i => (
                  <div key={i} className={`overflow-hidden rounded-xl ${i === 0 ? "col-span-2 aspect-video" : "aspect-square"}`}>
                    <img src={product.image} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"/>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Specifications */}
          {activeTab === "specs" && (
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold text-[#3A2A20] mb-5" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Product Specifications</h2>
              <div className="border border-[#E8DDD0] rounded-2xl overflow-hidden">
                {SPECS.map((s, i) => (
                  <div key={s.label} className={`flex text-sm ${i % 2 === 0 ? "bg-white" : "bg-[#FAF8F5]"}`}>
                    <div className="w-48 lg:w-56 shrink-0 px-4 py-3.5 font-semibold text-[#3A2A20] border-r border-[#E8DDD0]">{s.label}</div>
                    <div className="px-4 py-3.5 text-[#6B5744]">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Care */}
          {activeTab === "care" && (
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold text-[#3A2A20] mb-5" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Care Instructions</h2>
              <div className="grid gap-3">
                {[
                  { e: "🌊", t: "Machine Wash Cold",  d: "Use cold water (30°C) on gentle cycle. Avoid hot water which shrinks fabric." },
                  { e: "🚫", t: "Do Not Bleach",      d: "Bleach damages fabric and fades color. Use mild detergent only." },
                  { e: "💨", t: "Tumble Dry Low",     d: "Dry on low heat. Remove promptly to avoid wrinkles." },
                  { e: "🔥", t: "Iron on Low Heat",   d: "Iron while slightly damp on low heat. Do not iron directly on prints." },
                  { e: "❄️", t: "Store Clean & Dry",  d: "Store in cool, dry place. Avoid plastic bags — fabric needs to breathe." },
                ].map(item => (
                  <div key={item.t} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#E8DDD0]">
                    <span className="text-xl">{item.e}</span>
                    <div><p className="text-sm font-bold text-[#3A2A20] mb-0.5">{item.t}</p><p className="text-xs text-[#6B5744] leading-relaxed">{item.d}</p></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          {activeTab === "reviews" && (
            <div>
              <div className="grid lg:grid-cols-[240px_1fr] gap-8 mb-6">
                <div className="bg-white border border-[#E8DDD0] rounded-2xl p-5 h-fit">
                  <div className="text-center mb-5">
                    <div className="text-5xl font-bold text-[#3A2A20] mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{AVG_RATING}</div>
                    <Stars rating={AVG_RATING} size={16}/>
                    <p className="text-xs text-[#9E8A78] mt-1.5">{TOTAL_REVIEWS} verified reviews</p>
                  </div>
                  <div className="space-y-2">
                    {RATING_BREAKDOWN.map(rb => (
                      <div key={rb.stars} className="flex items-center gap-2">
                        <span className="text-xs text-[#9E8A78] w-4">{rb.stars}★</span>
                        <div className="flex-1 h-1.5 bg-[#F5F0EA] rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} whileInView={{ width: `${rb.pct}%` }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="h-full bg-[#D4AF37] rounded-full"/>
                        </div>
                        <span className="text-xs text-[#9E8A78] w-7 text-right">{rb.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex gap-2 mb-5 flex-wrap">
                    {["all","5","4"].map(f => (
                      <button key={f} onClick={() => setReviewFilter(f)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all ${reviewFilter === f ? "border-[#3A2A20] bg-[#3A2A20] text-white" : "border-[#D8C3A5] text-[#6B5744] hover:border-[#3A2A20]"}`}>
                        {f === "all" ? "All Reviews" : `${f} Stars`}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {REVIEWS_DATA.map((r, i) => (
                      <motion.div key={r.id} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                        className="bg-white border border-[#E8DDD0] rounded-xl p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-sm font-bold text-[#3A2A20]">{r.name[0]}</div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <p className="text-xs font-bold text-[#3A2A20]">{r.name}</p>
                                {r.verified && <span className="text-[9px] text-[#6B9E6E] font-semibold flex items-center gap-0.5"><BadgeCheck className="h-2.5 w-2.5"/> Verified</span>}
                              </div>
                              <p className="text-[10px] text-[#9E8A78]">{r.date}</p>
                            </div>
                          </div>
                          <Stars rating={r.rating} size={11}/>
                        </div>
                        <p className="text-xs font-bold text-[#3A2A20] mb-1">{r.title}</p>
                        <p className="text-xs text-[#6B5744] leading-relaxed mb-2">{r.body}</p>
                        <button className="flex items-center gap-1 text-[10px] text-[#9E8A78] hover:text-[#3A2A20] transition-colors">
                          <ThumbsUp className="h-3 w-3"/> Helpful ({r.helpful})
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Q&A */}
          {activeTab === "qa" && (
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10">
              <div>
                <p className="text-[10px] tracking-[0.24em] text-[#D4AF37] font-bold mb-2">Q & A</p>
                <h2 className="text-xl font-bold text-[#3A2A20] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Frequently Asked Questions</h2>
                <p className="text-sm text-[#9E8A78] mb-4 leading-relaxed">Have a question? Search or ask us directly.</p>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9E8A78]"/>
                  <input value={faqSearch} onChange={e => setFaqSearch(e.target.value)} placeholder="Search questions..."
                    className="w-full pl-9 pr-4 py-2.5 border-2 border-[#D8C3A5] rounded-xl text-sm outline-none focus:border-[#3A2A20] transition-colors bg-white"/>
                </div>
                <div className="flex gap-2">
                  <input placeholder="Ask a question..." className="flex-1 px-3 py-2.5 border-2 border-[#D8C3A5] rounded-xl text-sm outline-none focus:border-[#3A2A20] bg-white"/>
                  <button className="w-10 h-10 bg-[#3A2A20] text-white rounded-xl flex items-center justify-center hover:bg-[#4a3830] transition-colors"><Send className="h-4 w-4"/></button>
                </div>
              </div>
              <div>
                {FAQS.filter(f => !faqSearch || f.q.toLowerCase().includes(faqSearch.toLowerCase())).map((faq, i) => (
                  <Accordion key={i} title={faq.q} open={i === 0}>{faq.a}</Accordion>
                ))}
              </div>
            </div>
          )}

          {/* Room Visualizer */}
          {activeTab === "visualizer" && (
            <div className="text-center py-10">
              <div className="inline-flex flex-col items-center gap-4 p-8 rounded-3xl border-2 border-dashed border-[#D8C3A5] bg-white max-w-md w-full">
                <Eye className="h-12 w-12 text-[#D4AF37]"/>
                <h2 className="text-xl font-bold text-[#3A2A20]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>View In Your Room</h2>
                <p className="text-sm text-[#9E8A78] leading-relaxed">Upload a photo of your room to preview how this product will look in your space.</p>
                <label className="cursor-pointer w-full h-10 bg-[#3A2A20] text-white text-sm font-bold rounded-xl hover:bg-[#4a3830] transition-colors flex items-center justify-center gap-2">
                  <Eye className="h-4 w-4"/> Upload Room Photo
                  <input type="file" accept="image/*" className="hidden"/>
                </label>
                <p className="text-xs text-[#9E8A78]">Supports JPG, PNG · Max 10MB</p>
              </div>
            </div>
          )}

          {/* Size Guide */}
          {activeTab === "sizeguide" && (
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold text-[#3A2A20] mb-5" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Size Guide</h2>
              <div className="border border-[#E8DDD0] rounded-2xl overflow-hidden">
                <div className="grid grid-cols-4 bg-[#F5F0EA] border-b border-[#E8DDD0]">
                  {["Size", "Bedsheet", "Pillow Cover", "Fits Mattress"].map(h => (
                    <div key={h} className="px-4 py-3 text-xs font-bold text-[#3A2A20] text-center">{h}</div>
                  ))}
                </div>
                {[
                  ["Single",     '60"×90"', '17"×27"', '36"×72"'],
                  ["Queen",      '90"×100"', '18"×27"', '60"×78"'],
                  ["King",       '108"×100"', '20"×30"', '72"×78"'],
                  ["Super King", '108"×108"', '20"×30"', '72"×84"'],
                ].map(([sz, ...vals], i) => (
                  <div key={sz} className={`grid grid-cols-4 border-b border-[#E8DDD0] ${selSize === sz ? "bg-[#D4AF37]/08 font-semibold" : i % 2 === 0 ? "bg-white" : "bg-[#FAF8F5]"}`}>
                    <div className={`px-4 py-3 text-sm text-[#3A2A20] flex items-center gap-1.5 ${selSize === sz ? "font-bold" : ""}`}>
                      {selSize === sz && <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"/>}
                      {sz}
                    </div>
                    {vals.map(v => <div key={v} className="px-4 py-3 text-sm text-[#6B5744] text-center">{v}</div>)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Compare */}
          {activeTab === "compare" && (
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold text-[#3A2A20] mb-5" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Compare with Similar Products</h2>
              <div className="border border-[#E8DDD0] rounded-2xl overflow-hidden">
                <div className="grid grid-cols-3 bg-[#F5F0EA] border-b border-[#E8DDD0]">
                  {["Feature", product.name, "Standard Cotton"].map(h => (
                    <div key={h} className="px-4 py-3 text-xs font-bold text-[#3A2A20] text-center border-r last:border-r-0 border-[#E8DDD0]">{h}</div>
                  ))}
                </div>
                {[
                  ["Thread Count", "300 TC", "180 TC"],
                  ["Fabric", "Long Staple", "Regular"],
                  ["Breathability", "★★★★★", "★★★☆☆"],
                  ["Color Retention", "Anti-Fade", "Standard"],
                  ["Warranty", "10 Years", "1 Year"],
                  ["Softness", "Ultra Soft", "Average"],
                ].map(([label, p1, p2], i) => (
                  <div key={label} className={`grid grid-cols-3 border-b border-[#E8DDD0] ${i % 2 === 0 ? "bg-white" : "bg-[#FAF8F5]"}`}>
                    <div className="px-4 py-3 text-xs font-semibold text-[#3A2A20] border-r border-[#E8DDD0]">{label}</div>
                    <div className="px-4 py-3 text-xs text-[#6B9E6E] font-semibold text-center border-r border-[#E8DDD0]">{p1}</div>
                    <div className="px-4 py-3 text-xs text-[#9E8A78] text-center">{p2}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warranty */}
          {activeTab === "warranty" && (
            <div className="max-w-2xl">
              <p className="text-[10px] tracking-[0.24em] text-[#D4AF37] font-bold mb-2">PEACE OF MIND</p>
              <h2 className="text-2xl font-bold text-[#3A2A20] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>10-Year Warranty Coverage</h2>
              <div className="grid gap-3 mb-6">
                {[
                  { n: "01", t: "Purchase",      d: "Warranty activates on purchase date. Keep your invoice." },
                  { n: "02", t: "Raise a Claim", d: "Visit yunora.in/warranty or call our 24/7 helpline." },
                  { n: "03", t: "Verification",  d: "Our team verifies the defect within 48 hours." },
                  { n: "04", t: "Resolution",    d: "Free replacement or full refund — your choice." },
                ].map(item => (
                  <div key={item.n} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#E8DDD0]">
                    <span className="text-2xl font-bold text-[#D4AF37]/30" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{item.n}</span>
                    <div><p className="text-sm font-bold text-[#3A2A20] mb-0.5">{item.t}</p><p className="text-xs text-[#6B5744]">{item.d}</p></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ═══ FREQUENTLY BOUGHT TOGETHER ═══ */}
        <div className="bg-white border-t border-[#E8DDD0]">
          <div className="max-w-[1320px] mx-auto px-4 lg:px-8 py-10 lg:py-14">
            <div className="mb-6">
              <p className="text-[10px] tracking-[0.24em] text-[#D4AF37] font-bold mb-1">COMPLETE THE LOOK</p>
              <h2 className="text-2xl font-bold text-[#3A2A20]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Frequently Bought Together</h2>
            </div>
            <div className="flex flex-col lg:flex-row items-stretch gap-4">
              <div className="flex items-center gap-3 p-4 rounded-2xl border-2 border-[#D4AF37] bg-[#FAF8F5]">
                <img src={product.image} className="w-16 h-16 rounded-xl object-cover shrink-0" alt=""/>
                <div>
                  <p className="text-[9px] font-bold text-[#D4AF37] mb-0.5 tracking-wider">THIS ITEM</p>
                  <p className="text-sm font-bold text-[#3A2A20] leading-tight mb-1">{product.name}</p>
                  <p className="text-base font-bold text-[#3A2A20]">₹{product.price.toLocaleString("en-IN")}</p>
                </div>
              </div>
              {BOUGHT_TOGETHER.map(item => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="text-xl font-bold text-[#D4AF37] hidden lg:block">+</div>
                  <div className="flex items-center gap-3 p-4 rounded-2xl border border-[#E8DDD0] bg-white flex-1">
                    <img src={product.image} className="w-16 h-16 rounded-xl object-cover shrink-0" alt=""/>
                    <div>
                      <p className="text-sm font-bold text-[#3A2A20] leading-tight mb-1">{item.name}</p>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-bold text-[#3A2A20]">₹{item.price.toLocaleString("en-IN")}</span>
                        <span className="text-xs text-[#9E8A78] line-through">₹{item.originalPrice.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex flex-col items-center justify-center gap-2.5 p-4 rounded-2xl bg-[#F5F0EA] border border-[#D8C3A5] min-w-[160px]">
                <p className="text-[10px] text-[#9E8A78] font-semibold">BUNDLE TOTAL</p>
                <p className="text-xl font-bold text-[#3A2A20]">₹{(product.price + BOUGHT_TOGETHER.reduce((a, b) => a + b.price, 0)).toLocaleString("en-IN")}</p>
                <button className="w-full h-9 bg-[#3A2A20] text-white text-xs font-bold rounded-xl hover:bg-[#4a3830] transition-colors">ADD ALL TO CART</button>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ SIMILAR PRODUCTS ═══ */}
        <div className="max-w-[1320px] mx-auto px-4 lg:px-8 py-10 lg:py-14">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-[10px] tracking-[0.24em] text-[#D4AF37] font-bold mb-1">YOU MAY ALSO LIKE</p>
              <h2 className="text-2xl font-bold text-[#3A2A20]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Similar Products</h2>
            </div>
            <Link href="/shop" className="text-xs font-bold text-[#3A2A20] border-b border-[#3A2A20] pb-px hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors">View All →</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {(related.length > 0 ? related : products.slice(0, 4)).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i}/>
            ))}
          </div>
        </div>

      </main>

      <Footer />
      <MobileNav />

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 z-[150] lg:hidden bg-white border-t border-[#E8DDD0] px-4 py-2.5 flex gap-2.5 shadow-xl">
        <button onClick={() => setCustomizeOpen(true)}
          className="h-11 px-3 rounded-xl bg-[#F5F0EA] border border-[#D8C3A5] text-[#3A2A20] text-xs font-bold flex items-center gap-1.5">
          <Wand2 className="h-3.5 w-3.5"/>
        </button>
        <button onClick={handleAddToCart}
          className={`flex-1 h-11 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all ${cartAnim ? "bg-[#6B9E6E] text-white" : "bg-[#3A2A20] text-white"}`}>
          <ShoppingCart className="h-4 w-4"/>
          {cartAnim ? "ADDED ✓" : "ADD TO CART"}
        </button>
        <button className="flex-1 h-11 rounded-xl bg-[#D4AF37] text-[#1a0f06] text-sm font-bold flex items-center justify-center gap-2">
          <Zap className="h-4 w-4"/> BUY NOW
        </button>
      </div>
    </div>
  );
}
