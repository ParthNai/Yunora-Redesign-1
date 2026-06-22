import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Heart, User, ShoppingBag, X, ChevronDown, ChevronRight,
  Menu, ArrowRight, Truck, RefreshCcw, ShieldCheck, Award, BadgeCheck,
  MapPin, Package, Zap, Star, ChevronUp,
  Home, Phone, Mail, MessageCircle, LogOut, Gift, Layers, LayoutGrid,
  BookOpen, Briefcase, Settings, Info, Crown, Tag, Instagram, Facebook,
  Youtube, Bookmark, Sparkles
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import logo from "@assets/02_1781943228013.png";

/* ─── Navigation data ─── */
const SHOP_CATEGORIES = [
  { label: "Bedsheets",           href: "/category/bedsheets",           icon: "🛏️" },
  { label: "Curtains",            href: "/category/curtains",            icon: "🪟" },
  { label: "Cushion Covers",      href: "/category/cushion-covers",      icon: "🪑" },
  { label: "Comforters",          href: "/category/comforters",          icon: "☁️" },
  { label: "Quilts & Dohars",     href: "/category/quilts",              icon: "🎀" },
  { label: "Table Linen",         href: "/category/table-linen",         icon: "🍽️" },
  { label: "Blankets",            href: "/category/blankets",            icon: "🧣" },
  { label: "Mattress Protectors", href: "/category/mattress-protectors", icon: "🛡️" },
  { label: "View All Categories", href: "/categories",                   icon: "→",  isLink: true },
];
const SHOP_ROOMS = [
  { label: "Bedroom",     href: "/category/bedroom",     img: "🛏️" },
  { label: "Living Room", href: "/category/living-room", img: "🛋️" },
  { label: "Dining Room", href: "/category/dining-room", img: "🍽️" },
  { label: "Kids Room",   href: "/category/kids-room",   img: "🧸" },
  { label: "Guest Room",  href: "/category/guest-room",  img: "🏡" },
  { label: "Outdoor",     href: "/category/outdoor",     img: "🌿" },
];
const SHOP_COLLECTIONS = [
  { label: "Luxury Collection",    href: "/collection/luxury" },
  { label: "Signature Collection", href: "/collection/signature" },
  { label: "Premium Collection",   href: "/collection/premium" },
  { label: "Classic Collection",   href: "/collection/classic" },
  { label: "Festive Collection",   href: "/collection/festive" },
  { label: "New Collection",       href: "/collection/new" },
];
const CATEGORIES_GRID = [
  { label: "Bedsheets",    href: "/category/bedsheets",           count: "48 Products" },
  { label: "Curtains",     href: "/category/curtains",            count: "32 Products" },
  { label: "Cushion Covers",href: "/category/cushion-covers",     count: "56 Products" },
  { label: "Comforters",   href: "/category/comforters",          count: "24 Products" },
  { label: "Quilts",       href: "/category/quilts",              count: "18 Products" },
  { label: "Table Linen",  href: "/category/table-linen",         count: "21 Products" },
  { label: "Blankets",     href: "/category/blankets",            count: "15 Products" },
  { label: "Dining",       href: "/category/dining-room",         count: "12 Products" },
];
const COLLECTIONS_LIST = [
  { label: "Luxury Collection",    href: "/collection/luxury",    desc: "Opulence crafted for your space" },
  { label: "Signature Collection", href: "/collection/signature", desc: "YUNORA's iconic designs" },
  { label: "Premium Collection",   href: "/collection/premium",   desc: "Best quality, best value" },
  { label: "Classic Collection",   href: "/collection/classic",   desc: "Timeless comfort, forever" },
  { label: "Festive Collection",   href: "/collection/festive",   desc: "Celebrate every occasion" },
  { label: "Royal Heritage",       href: "/collection/royal",     desc: "Inspired by royal palaces" },
];
const NAV_ITEMS = [
  { id: "home",         label: "Home",            href: "/" },
  { id: "shop",         label: "Shop",            href: "/shop",         hasMega: true },
  { id: "categories",   label: "Categories",      href: "/categories",   hasMega: true },
  { id: "collections",  label: "Collections",     href: "/collections",  hasMega: true },
  { id: "new",          label: "New Arrivals",     href: "/new-arrivals" },
  { id: "sellers",      label: "Best Sellers",     href: "/best-sellers" },
  { id: "mfg",          label: "Manufacturing",    href: "/manufacturing" },
  { id: "about",        label: "About Us",         href: "/about" },
  { id: "contact",      label: "Contact Us",       href: "/contact" },
];
const MOBILE_MENU_ITEMS = [
  { label: "Home",                 href: "/",              sub: null },
  { label: "Shop",                 href: "/shop",          sub: SHOP_CATEGORIES.slice(0, -1) },
  { label: "Categories",           href: "/categories",    sub: CATEGORIES_GRID.map(c => ({ label: c.label, href: c.href })) },
  { label: "Collections",          href: "/collections",   sub: COLLECTIONS_LIST.map(c => ({ label: c.label, href: c.href })) },
  { label: "New Arrivals",         href: "/new-arrivals",  sub: null },
  { label: "Best Sellers",         href: "/best-sellers",  sub: null },
  { label: "Manufacturing",        href: "/manufacturing", sub: null },
  { label: "About Us",             href: "/about",         sub: null },
  { label: "Contact Us",           href: "/contact",       sub: null },
  { label: "Blogs",                href: "/blogs",         sub: null },
  { label: "Become Dealer",        href: "/become-dealer", sub: null },
  { label: "Track Order",          href: "/track-order",   sub: null },
  { label: "Feedback",             href: "/profile/feedback", sub: null },
];
const POPULAR_SEARCHES = ["Luxury Bedsheets", "Curtains", "Comforters", "Cushion Covers", "Festive Collection"];
const MOBILE_TRUST = [
  { icon: Truck,       text: "Free Shipping on Orders Above ₹999" },
  { icon: RefreshCcw,  text: "Easy Returns · Hassle-Free Returns" },
  { icon: ShieldCheck, text: "Secure Payments · 100% Safe & Secure" },
  { icon: Award,       text: "Premium Quality · Luxury You Can Trust" },
  { icon: BadgeCheck,  text: "10 Year Warranty on Premium Products" },
];

/* ─── Mega Menu ─── */
function ShopMegaMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute top-full left-0 right-0 z-[100] shadow-2xl" style={{ background: "#FDFCFA", borderTop: "1px solid #E8DDD0" }}>
      <div className="max-w-[1320px] mx-auto px-8 py-8">
        <div className="grid grid-cols-4 gap-8">
          {/* Col 1: By Category */}
          <div>
            <p className="text-[9px] tracking-[0.3em] font-bold text-[#D4AF37] mb-4 uppercase">Shop By Category</p>
            <ul className="space-y-1">
              {SHOP_CATEGORIES.map(c => (
                <li key={c.label}>
                  <Link href={c.href} onClick={onClose}
                    className={`flex items-center gap-2.5 py-1.5 px-2 rounded-lg text-sm transition-all hover:bg-[#F5F0EA] group ${c.isLink ? "text-[#D4AF37] font-semibold text-xs mt-2" : "text-[#3A2A20]"}`}>
                    <span className="text-base">{c.icon}</span>
                    <span className={c.isLink ? "border-b border-[#D4AF37]" : ""}>{c.label}</span>
                    {c.isLink && <ArrowRight className="h-3 w-3 ml-auto"/>}
                    {!c.isLink && <ChevronRight className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-40 transition-opacity"/>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: By Room */}
          <div>
            <p className="text-[9px] tracking-[0.3em] font-bold text-[#D4AF37] mb-4 uppercase">Shop By Room</p>
            <ul className="space-y-1">
              {SHOP_ROOMS.map(r => (
                <li key={r.label}>
                  <Link href={r.href} onClick={onClose}
                    className="flex items-center gap-2.5 py-1.5 px-2 rounded-lg text-sm text-[#3A2A20] transition-all hover:bg-[#F5F0EA] group">
                    <span className="text-base">{r.img}</span>
                    {r.label}
                    <ChevronRight className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-40 transition-opacity"/>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Collections */}
          <div>
            <p className="text-[9px] tracking-[0.3em] font-bold text-[#D4AF37] mb-4 uppercase">Shop By Collection</p>
            <ul className="space-y-1">
              {SHOP_COLLECTIONS.map(c => (
                <li key={c.label}>
                  <Link href={c.href} onClick={onClose}
                    className="flex items-center gap-2.5 py-1.5 px-2 rounded-lg text-sm text-[#3A2A20] transition-all hover:bg-[#F5F0EA] group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D8C3A5] group-hover:bg-[#D4AF37] transition-colors shrink-0"/>
                    {c.label}
                    <ChevronRight className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-40 transition-opacity"/>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Featured */}
          <div>
            <p className="text-[9px] tracking-[0.3em] font-bold text-[#D4AF37] mb-4 uppercase">Featured</p>
            <div className="rounded-2xl overflow-hidden border border-[#E8DDD0] group cursor-pointer relative" onClick={onClose}>
              <div className="aspect-[4/3] bg-gradient-to-br from-[#D8C3A5] to-[#9E8A78] flex items-center justify-center">
                <div className="text-center p-5">
                  <p className="text-[#3A2A20] text-base font-bold leading-tight mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Luxury That Complements Your Home
                  </p>
                  <p className="text-[#3A2A20]/70 text-xs leading-relaxed mb-3">Explore our premium range crafted for comfort and elegance.</p>
                  <Link href="/collections" onClick={onClose}
                    className="inline-flex items-center gap-1.5 bg-[#3A2A20] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#4a3830] transition-colors">
                    Shop Now <ArrowRight className="h-3 w-3"/>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoriesMegaMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute top-full left-0 right-0 z-[100] shadow-2xl" style={{ background: "#FDFCFA", borderTop: "1px solid #E8DDD0" }}>
      <div className="max-w-[1320px] mx-auto px-8 py-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[9px] tracking-[0.3em] font-bold text-[#D4AF37] mb-1 uppercase">Browse</p>
            <h3 className="text-xl font-bold text-[#3A2A20]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>All Categories</h3>
          </div>
          <Link href="/categories" onClick={onClose} className="text-xs font-bold text-[#D4AF37] flex items-center gap-1 hover:underline">
            View All <ArrowRight className="h-3 w-3"/>
          </Link>
        </div>
        <div className="grid grid-cols-8 gap-3">
          {CATEGORIES_GRID.map((cat, i) => (
            <Link key={cat.label} href={cat.href} onClick={onClose}
              className="group flex flex-col items-center text-center p-3 rounded-2xl border border-[#E8DDD0] hover:border-[#D4AF37] hover:shadow-md transition-all bg-white">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D8C3A5] to-[#9E8A78] mb-2 flex items-center justify-center text-lg">
                {["🛏️","🪟","🪑","☁️","🎀","🍽️","🧣","🛡️"][i]}
              </div>
              <p className="text-xs font-bold text-[#3A2A20] leading-tight mb-0.5">{cat.label}</p>
              <p className="text-[9px] text-[#9E8A78]">{cat.count}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function CollectionsMegaMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute top-full left-0 right-0 z-[100] shadow-2xl" style={{ background: "#FDFCFA", borderTop: "1px solid #E8DDD0" }}>
      <div className="max-w-[1320px] mx-auto px-8 py-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[9px] tracking-[0.3em] font-bold text-[#D4AF37] mb-1 uppercase">Curated</p>
            <h3 className="text-xl font-bold text-[#3A2A20]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Our Collections</h3>
          </div>
          <Link href="/collections" onClick={onClose} className="text-xs font-bold text-[#D4AF37] flex items-center gap-1 hover:underline">
            View All <ArrowRight className="h-3 w-3"/>
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {COLLECTIONS_LIST.map((col, i) => (
            <Link key={col.label} href={col.href} onClick={onClose}
              className="group flex items-center gap-3 p-4 rounded-2xl border border-[#E8DDD0] hover:border-[#D4AF37] hover:shadow-md transition-all bg-white">
              <div className="w-14 h-14 rounded-xl shrink-0 flex items-center justify-center text-2xl"
                style={{ background: `hsl(${30 + i * 18}, 30%, ${85 - i * 3}%)` }}>
                {["✨","🌟","💎","🎀","🪄","👑"][i]}
              </div>
              <div>
                <p className="text-sm font-bold text-[#3A2A20] group-hover:text-[#D4AF37] transition-colors">{col.label}</p>
                <p className="text-[11px] text-[#9E8A78] mt-0.5 leading-snug">{col.desc}</p>
                <span className="text-[10px] text-[#D4AF37] flex items-center gap-1 mt-1 font-semibold">
                  Explore <ArrowRight className="h-2.5 w-2.5"/>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Search Overlay ─── */
function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 80); }, []);
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[400] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
      onClick={onClose}>
      <motion.div initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }} transition={{ duration: 0.22 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}>
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E8DDD0]">
          <Search className="h-5 w-5 text-[#9E8A78] shrink-0"/>
          <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search for bedsheets, curtains, cushions..."
            className="flex-1 text-base text-[#3A2A20] outline-none placeholder:text-[#C4B09A] bg-transparent"
            onKeyDown={e => { if (e.key === "Enter" && query.trim()) { window.location.href = `/search?q=${encodeURIComponent(query)}`; onClose(); }}}
          />
          {query && <button onClick={() => setQuery("")} className="text-[#9E8A78] hover:text-[#3A2A20] transition-colors"><X className="h-4 w-4"/></button>}
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#F5F0EA] flex items-center justify-center text-[#6B5744] hover:bg-[#E8DDD0] transition-colors ml-1">
            <X className="h-4 w-4"/>
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Popular searches */}
          <div>
            <p className="text-[10px] tracking-[0.24em] font-bold text-[#9E8A78] mb-3 uppercase">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map(s => (
                <Link key={s} href={`/search?q=${encodeURIComponent(s)}`} onClick={onClose}
                  className="px-3 py-1.5 rounded-full border border-[#E8DDD0] text-xs font-medium text-[#3A2A20] hover:border-[#D4AF37] hover:bg-[#FAF8F5] transition-all">
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-[10px] tracking-[0.24em] font-bold text-[#9E8A78] mb-3 uppercase">Browse</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "New Arrivals",     href: "/new-arrivals",  icon: Zap },
                { label: "Best Sellers",     href: "/best-sellers",  icon: Star },
                { label: "Festive Collection", href: "/collection/festive", icon: Award },
                { label: "All Collections",  href: "/collections",   icon: Package },
              ].map(item => (
                <Link key={item.label} href={item.href} onClick={onClose}
                  className="flex items-center gap-2.5 p-3 rounded-xl border border-[#E8DDD0] text-sm text-[#3A2A20] hover:border-[#D4AF37] hover:bg-[#FAF8F5] transition-all group">
                  <item.icon className="h-4 w-4 text-[#D4AF37]"/>
                  {item.label}
                  <ArrowRight className="h-3 w-3 ml-auto text-[#9E8A78] opacity-0 group-hover:opacity-100 transition-opacity"/>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Mobile Premium Left-Slide Menu ─── */
const MOBILE_NAV = [
  { label: "Home",                   href: "/",               icon: Home,      sub: null },
  { label: "Shop",                   href: "/shop",           icon: ShoppingBag, sub: SHOP_CATEGORIES.slice(0,-1).map(c => ({ label: c.label, href: c.href, emoji: c.icon })) },
  { label: "Categories",             href: "/categories",     icon: LayoutGrid,  sub: CATEGORIES_GRID.map(c => ({ label: c.label, href: c.href, emoji: ["🛏️","🪟","🪑","☁️","🎀","🍽️","🧣","🛡️"][CATEGORIES_GRID.indexOf(c)] })) },
  { label: "Collections",            href: "/collections",    icon: Layers,      sub: COLLECTIONS_LIST.map(c => ({ label: c.label, href: c.href, emoji: ["✨","🌟","💎","🎀","🪄","👑"][COLLECTIONS_LIST.indexOf(c)] })) },
  { label: "New Arrivals",           href: "/new-arrivals",   icon: Sparkles,  sub: null },
  { label: "Best Sellers",           href: "/best-sellers",   icon: Star,      sub: null },
  { label: "Manufacturing Excellence", href: "/manufacturing", icon: Award,     sub: null },
  { label: "About Us",               href: "/about",          icon: Info,      sub: null },
  { label: "Contact Us",             href: "/contact",        icon: Phone,     sub: null },
  { label: "Blogs",                  href: "/blogs",          icon: BookOpen,  sub: null },
  { label: "Become Dealer",          href: "/become-dealer",  icon: Briefcase, sub: null },
  { label: "Track Order",            href: "/track-order",    icon: Package,   sub: null },
  { label: "Feedback",               href: "/profile/feedback", icon: MessageCircle, sub: null },
];
const ACCOUNT_LINKS = [
  { label: "My Account",       href: "/profile",           icon: User },
  { label: "My Wishlist",      href: "/wishlist",          icon: Heart },
  { label: "My Orders",        href: "/profile/orders",    icon: Package },
  { label: "Rewards",          href: "/profile/rewards",   icon: Gift },
  { label: "Settings",         href: "/profile/settings",  icon: Settings },
];
const QUICK_ACTIONS = [
  { label: "WhatsApp",  icon: MessageCircle, color: "#25D366", action: () => window.open("https://wa.me/919999999999","_blank") },
  { label: "Call",      icon: Phone,         color: "#3A2A20", action: () => window.open("tel:+919999999999") },
  { label: "Email",     icon: Mail,          color: "#D4AF37", action: () => window.open("mailto:support@yunora.in") },
  { label: "Location",  icon: MapPin,        color: "#F47C4D", action: () => {} },
];
const SOCIAL = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook,  href: "#", label: "Facebook" },
  { icon: Youtube,   href: "#", label: "YouTube" },
];
const TRUST_ITEMS = [
  { icon: Truck,       label: "Free Shipping" },
  { icon: RefreshCcw,  label: "Easy Returns" },
  { icon: ShieldCheck, label: "Secure Pay" },
  { icon: BadgeCheck,  label: "10Yr Warranty" },
  { icon: Award,       label: "Premium Quality" },
];

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [location] = useLocation();
  const touchStartX = useRef(0);

  useEffect(() => { if (!open) setExpanded(null); }, [open]);
  useEffect(() => { onClose(); }, [location]);
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* Swipe left to close */
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => { if (touchStartX.current - e.changedTouches[0].clientX > 80) onClose(); };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[250] bg-black/60"
            style={{ backdropFilter: "blur(6px)" }}
            onClick={onClose}/>

          {/* Panel — slides from LEFT */}
          <motion.div
            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34, mass: 0.9 }}
            className="fixed top-0 left-0 bottom-0 z-[260] flex flex-col overflow-hidden"
            style={{ width: "90vw", maxWidth: 400, background: "#FDFCFA", boxShadow: "8px 0 60px rgba(58,42,32,0.25)" }}
            onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>

            {/* ── HEADER PANEL ── */}
            <div className="relative shrink-0 overflow-hidden" style={{ background: "linear-gradient(135deg, #3A2A20 0%, #5c3d2a 60%, #3A2A20 100%)" }}>
              {/* Decorative circles */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5 pointer-events-none"/>
              <div className="absolute -bottom-6 -left-4 w-24 h-24 rounded-full bg-[#D4AF37]/10 pointer-events-none"/>

              <div className="relative flex items-center gap-4 px-5 pt-10 pb-5">
                {/* Logo circle */}
                <div className="w-14 h-14 rounded-2xl border-2 border-[#D4AF37]/50 flex items-center justify-center shrink-0"
                  style={{ background: "rgba(212,175,55,0.12)" }}>
                  <span className="text-2xl font-black text-[#D4AF37]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Y</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#D4AF37] font-black text-lg leading-none tracking-wider" style={{ fontFamily: "'Cormorant Garamond', serif" }}>YUNORA</p>
                  <p className="text-white/70 text-[10px] tracking-[0.2em] mt-0.5">LUXURY FURNISHING</p>
                  <p className="text-white/40 text-[9px] mt-0.5 italic">Crafting Elegant Living Spaces</p>
                </div>
                {/* Close button */}
                <button onClick={onClose}
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all active:scale-90"
                  style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <X className="h-4.5 w-4.5 text-white" style={{ width: 18, height: 18 }}/>
                </button>
              </div>

              {/* Promo Banner */}
              <div className="mx-4 mb-4 rounded-xl overflow-hidden relative" style={{ background: "linear-gradient(120deg, rgba(212,175,55,0.22) 0%, rgba(244,124,77,0.18) 100%)", border: "1px solid rgba(212,175,55,0.3)" }}>
                <div className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-[#D4AF37] text-xs font-black tracking-wider">UP TO 40% OFF</p>
                    <p className="text-white/80 text-[10px]">Luxury Furnishings — Limited Time</p>
                  </div>
                  <Link href="/shop" onClick={onClose}
                    className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-[#3A2A20] transition-all active:scale-95"
                    style={{ background: "#D4AF37" }}>
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>

            {/* ── SCROLLABLE BODY ── */}
            <div className="flex-1 overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: "touch" }}>

              {/* ── MAIN NAV ── */}
              <div className="py-2">
                {MOBILE_NAV.map(item => (
                  <div key={item.label}>
                    {item.sub ? (
                      /* Accordion item */
                      <>
                        <button
                          onClick={() => setExpanded(s => s === item.label ? null : item.label)}
                          className="w-full flex items-center gap-4 px-5 transition-colors active:bg-[#F0EAE0]"
                          style={{ minHeight: 56, background: expanded === item.label ? "#F5F0EA" : "transparent" }}>
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: expanded === item.label ? "#3A2A20" : "#F0EAE0" }}>
                            <item.icon className="h-4 w-4" style={{ color: expanded === item.label ? "#D4AF37" : "#6B5744" }}/>
                          </div>
                          <span className="flex-1 text-left text-sm font-semibold text-[#3A2A20]">{item.label}</span>
                          <motion.span animate={{ rotate: expanded === item.label ? 180 : 0 }} transition={{ duration: 0.22 }}>
                            <ChevronDown className="h-4 w-4 text-[#9E8A78] shrink-0"/>
                          </motion.span>
                        </button>

                        <AnimatePresence>
                          {expanded === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                              className="overflow-hidden"
                              style={{ background: "#F8F5F0" }}>
                              <div className="py-1">
                                {item.sub.map((sub, si) => (
                                  <Link key={sub.label} href={sub.href} onClick={onClose}
                                    className="flex items-center gap-3.5 px-6 py-2.5 transition-colors active:bg-[#EDE8E0]"
                                    style={{ minHeight: 44 }}>
                                    <span className="text-base w-6 text-center">{sub.emoji}</span>
                                    <span className="text-sm text-[#3A2A20] font-medium">{sub.label}</span>
                                  </Link>
                                ))}
                                <Link href={item.href} onClick={onClose}
                                  className="flex items-center gap-2 px-6 py-3 border-t border-[#E8DDD0] mt-1">
                                  <span className="text-xs font-bold text-[#D4AF37]">View All {item.label}</span>
                                  <ArrowRight className="h-3 w-3 text-[#D4AF37]"/>
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      /* Plain nav link */
                      <Link href={item.href} onClick={onClose}
                        className="flex items-center gap-4 px-5 transition-colors active:bg-[#F0EAE0]"
                        style={{ minHeight: 56 }}>
                        <div className="w-9 h-9 rounded-xl bg-[#F0EAE0] flex items-center justify-center shrink-0">
                          <item.icon className="h-4 w-4 text-[#6B5744]"/>
                        </div>
                        <span className="flex-1 text-sm font-semibold text-[#3A2A20]">{item.label}</span>
                        <ChevronRight className="h-4 w-4 text-[#C4B09A] shrink-0"/>
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="h-px bg-[#E8DDD0] mx-5 my-3"/>

              {/* ── YUNORA ELITE CARD ── */}
              <div className="mx-4 mb-4 rounded-2xl overflow-hidden relative"
                style={{ background: "linear-gradient(135deg, #FFF8EC 0%, #FFF0D9 100%)", border: "1px solid #E8C97E" }}>
                <div className="flex items-center gap-3 p-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg, #D4AF37, #b8932a)" }}>
                    <Crown className="h-5 w-5 text-white"/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#3A2A20] text-sm">YUNORA Elite</p>
                    <p className="text-[#6B5744] text-[11px] leading-snug mt-0.5">Join our loyalty program &amp; unlock exclusive benefits.</p>
                  </div>
                  <Link href="/profile" onClick={onClose}
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all active:scale-90"
                    style={{ background: "#D4AF37" }}>
                    <ArrowRight className="h-4 w-4 text-white"/>
                  </Link>
                </div>
              </div>

              {/* ── MY ACCOUNT ── */}
              <div className="px-5 mb-1">
                <p className="text-[9px] tracking-[0.28em] font-bold text-[#9E8A78] mb-2">MY ACCOUNT</p>
              </div>
              {ACCOUNT_LINKS.map(item => (
                <Link key={item.label} href={item.href} onClick={onClose}
                  className="flex items-center gap-4 px-5 transition-colors active:bg-[#F0EAE0]"
                  style={{ minHeight: 50 }}>
                  <div className="w-8 h-8 rounded-lg bg-[#F0EAE0] flex items-center justify-center shrink-0">
                    <item.icon className="h-3.5 w-3.5 text-[#6B5744]"/>
                  </div>
                  <span className="flex-1 text-sm text-[#3A2A20] font-medium">{item.label}</span>
                  <ChevronRight className="h-3.5 w-3.5 text-[#C4B09A] shrink-0"/>
                </Link>
              ))}
              <button
                onClick={() => onClose()}
                className="flex items-center gap-4 px-5 w-full transition-colors active:bg-red-50"
                style={{ minHeight: 50 }}>
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                  <LogOut className="h-3.5 w-3.5 text-red-500"/>
                </div>
                <span className="flex-1 text-left text-sm text-red-500 font-medium">Logout</span>
              </button>

              <div className="h-px bg-[#E8DDD0] mx-5 my-3"/>

              {/* ── QUICK ACTIONS ── */}
              <div className="px-5 mb-2">
                <p className="text-[9px] tracking-[0.28em] font-bold text-[#9E8A78] mb-3">QUICK ACTIONS</p>
                <div className="grid grid-cols-4 gap-2">
                  {QUICK_ACTIONS.map(a => (
                    <button key={a.label} onClick={() => { a.action(); onClose(); }}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all active:scale-95"
                      style={{ background: "#F5F0EA" }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: `${a.color}18` }}>
                        <a.icon className="h-4 w-4" style={{ color: a.color }}/>
                      </div>
                      <span className="text-[9px] font-semibold text-[#6B5744]">{a.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-[#E8DDD0] mx-5 my-3"/>

              {/* ── TRUST STRIP ── */}
              <div className="mx-4 mb-4 rounded-2xl p-3" style={{ background: "#F5F0EA", border: "1px solid #E8DDD0" }}>
                <p className="text-[8px] tracking-[0.3em] font-bold text-[#D4AF37] mb-2.5 text-center">YUNORA PROMISE</p>
                <div className="grid grid-cols-5 gap-1">
                  {TRUST_ITEMS.map(t => (
                    <div key={t.label} className="flex flex-col items-center gap-1 text-center">
                      <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
                        <t.icon className="h-3.5 w-3.5 text-[#D4AF37]"/>
                      </div>
                      <span className="text-[8px] text-[#6B5744] font-medium leading-tight">{t.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── SOCIAL + LEGAL FOOTER ── */}
              <div className="px-5 pb-8">
                <div className="flex items-center gap-3 mb-3">
                  {SOCIAL.map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                      className="w-9 h-9 rounded-xl bg-[#F0EAE0] flex items-center justify-center transition-all active:scale-90 hover:bg-[#E8DDD0]">
                      <s.icon className="h-4 w-4 text-[#6B5744]"/>
                    </a>
                  ))}
                  <div className="flex-1"/>
                  <span className="text-[9px] text-[#C4B09A]">Follow us</span>
                </div>
                <div className="flex items-center gap-3">
                  {["Terms","Privacy","Sitemap"].map(l => (
                    <Link key={l} href="#" onClick={onClose} className="text-[9px] text-[#9E8A78] hover:text-[#3A2A20] transition-colors">{l}</Link>
                  ))}
                  <span className="text-[9px] text-[#C4B09A] ml-auto">© 2025 YUNORA</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── Main Header ─── */
export default function Header() {
  const [location] = useLocation();
  const { cartCount, wishlistCount } = useCart();

  const [scrolled,       setScrolled]       = useState(false);
  const [activeMenu,     setActiveMenu]     = useState<string | null>(null);
  const [searchOpen,     setSearchOpen]     = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const menuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setActiveMenu(null); setMobileOpen(false); }, [location]);

  const openMenu = useCallback((id: string) => {
    if (menuTimeout.current) clearTimeout(menuTimeout.current);
    setActiveMenu(id);
  }, []);

  const closeMenu = useCallback(() => {
    menuTimeout.current = setTimeout(() => setActiveMenu(null), 120);
  }, []);

  const keepMenu = useCallback(() => {
    if (menuTimeout.current) clearTimeout(menuTimeout.current);
  }, []);

  return (
    <>
      {/* ─── Main Header ─── */}
      <header
        className="sticky top-9 md:top-10 z-[50] w-full transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(253,252,250,0.97)"
            : "rgba(253,252,250,1)",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          boxShadow: scrolled ? "0 2px 24px rgba(58,42,32,0.10)" : "0 1px 0 #E8DDD0",
        }}
      >
        <div
          className="max-w-[1320px] mx-auto px-4 lg:px-8 flex items-center justify-between transition-all duration-300"
          style={{ height: scrolled ? "60px" : "72px" }}
        >
          {/* Mobile Hamburger */}
          <button onClick={() => setMobileOpen(true)}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl hover:bg-[#F5F0EA] transition-colors text-[#3A2A20]">
            <Menu className="h-5 w-5"/>
          </button>

          {/* Logo */}
          <Link href="/" className="flex flex-col items-start justify-center shrink-0 group">
            <img src={logo} alt="YUNORA" className="object-contain group-hover:opacity-90 transition-opacity"
              style={{ height: scrolled ? "32px" : "38px", width: "auto", maxWidth: scrolled ? "150px" : "180px", transition: "all 0.3s" }}/>
            <span className="text-[8px] tracking-[0.28em] font-medium text-[#9E8A78] mt-0.5 hidden lg:block">LUXURY FURNISHING</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center" onMouseLeave={closeMenu}>
            {NAV_ITEMS.map(item => (
              <div key={item.id} className="relative"
                onMouseEnter={() => item.hasMega ? openMenu(item.id) : setActiveMenu(null)}
              >
                <Link href={item.href}
                  className={`flex items-center gap-0.5 px-3 xl:px-3.5 py-2 text-[11px] xl:text-xs font-semibold tracking-[0.1em] transition-colors whitespace-nowrap rounded-lg
                    ${location === item.href
                      ? "text-[#F47C4D] border-b-2 border-[#F47C4D] rounded-none pb-1.5"
                      : "text-[#3A2A20] hover:text-[#F47C4D]"
                    }`}>
                  {item.label.toUpperCase()}
                  {item.hasMega && (
                    <motion.span animate={{ rotate: activeMenu === item.id ? 180 : 0 }} transition={{ duration: 0.18 }}>
                      <ChevronDown className="h-3 w-3 ml-0.5"/>
                    </motion.span>
                  )}
                </Link>
              </div>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-1.5 lg:gap-2">
            {/* Search */}
            <button onClick={() => setSearchOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-[#3A2A20] hover:bg-[#F5F0EA] transition-colors group relative">
              <Search className="h-4.5 w-4.5" style={{ width: 18, height: 18 }}/>
              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-[#3A2A20] text-white text-[9px] font-medium px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Search</span>
            </button>

            {/* Wishlist */}
            <Link href="/wishlist"
              className="w-9 h-9 hidden lg:flex items-center justify-center rounded-xl text-[#3A2A20] hover:bg-[#F5F0EA] transition-colors group relative">
              <Heart className="h-4.5 w-4.5" style={{ width: 18, height: 18 }}/>
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#F47C4D] text-white text-[9px] flex items-center justify-center font-bold">{wishlistCount}</span>
              )}
              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-[#3A2A20] text-white text-[9px] font-medium px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Wishlist</span>
            </Link>

            {/* Profile */}
            <Link href="/profile"
              className="w-9 h-9 hidden lg:flex items-center justify-center rounded-xl text-[#3A2A20] hover:bg-[#F5F0EA] transition-colors group relative">
              <User className="h-4.5 w-4.5" style={{ width: 18, height: 18 }}/>
              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-[#3A2A20] text-white text-[9px] font-medium px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Account</span>
            </Link>

            {/* Cart */}
            <Link href="/cart"
              className="flex items-center gap-1.5 h-9 px-3 rounded-xl bg-[#3A2A20] text-white hover:bg-[#4a3830] transition-colors group relative">
              <ShoppingBag className="h-4 w-4"/>
              <span className="text-xs font-bold hidden lg:block">Cart</span>
              {cartCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#F47C4D] text-white text-[9px] flex items-center justify-center font-bold">{cartCount}</span>
              )}
            </Link>
          </div>
        </div>

        {/* ─── Mega Menu Panels ─── */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              onMouseEnter={keepMenu}
              onMouseLeave={closeMenu}
            >
              {activeMenu === "shop"        && <ShopMegaMenu        onClose={() => setActiveMenu(null)}/>}
              {activeMenu === "categories"  && <CategoriesMegaMenu  onClose={() => setActiveMenu(null)}/>}
              {activeMenu === "collections" && <CollectionsMegaMenu onClose={() => setActiveMenu(null)}/>}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── Search Overlay ─── */}
      <AnimatePresence>
        {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)}/>}
      </AnimatePresence>

      {/* ─── Mobile Menu ─── */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)}/>
    </>
  );
}
