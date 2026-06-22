import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import ProductCard from "@/components/ui/ProductCard";
import { api, toProductCard } from "@/lib/api";
import {
  Search as SearchIcon, X, SlidersHorizontal, ChevronDown,
  ArrowRight, Loader2, Tag
} from "lucide-react";
import catBedsheets from "@/assets/cat-bedsheets.png";

/* ─────────────────────────────────────────
   Natural language query parser
   Examples:
     "sofa rate 500"         → { keyword:"sofa", maxPrice:500 }
     "curtains under 1500"   → { keyword:"curtains", maxPrice:1500 }
     "bedsheet 500 to 2000"  → { keyword:"bedsheet", minPrice:500, maxPrice:2000 }
     "above 1000 pillow"     → { keyword:"pillow", minPrice:1000 }
     "sofa ₹800"             → { keyword:"sofa", maxPrice:800 }
───────────────────────────────────────── */
interface ParsedQuery {
  keyword: string;
  minPrice?: number;
  maxPrice?: number;
}

function parseQuery(raw: string): ParsedQuery {
  let s = raw.trim();

  let minPrice: number | undefined;
  let maxPrice: number | undefined;

  // "500 to 2000" / "500-2000"
  const rangeMatch = s.match(/(\d[\d,]*)\s*(?:to|-)\s*(\d[\d,]*)/i);
  if (rangeMatch) {
    minPrice = parseInt(rangeMatch[1].replace(/,/g, ""), 10);
    maxPrice = parseInt(rangeMatch[2].replace(/,/g, ""), 10);
    s = s.replace(rangeMatch[0], " ").trim();
  }

  // "under / below / at / rate / for / ₹ / rs / inr" followed by number
  if (!maxPrice) {
    const maxMatch = s.match(/(?:under|below|at|rate|for|₹|rs\.?|inr\.?|upto|up\s*to|max(?:imum)?)\s*(\d[\d,]*)/i);
    if (maxMatch) {
      maxPrice = parseInt(maxMatch[1].replace(/,/g, ""), 10);
      s = s.replace(maxMatch[0], " ").trim();
    }
  }

  // number followed by "rate / rs / ₹ / inr"
  if (!maxPrice) {
    const maxMatch2 = s.match(/(\d[\d,]*)\s*(?:rate|rs\.?|₹|inr\.?)/i);
    if (maxMatch2) {
      maxPrice = parseInt(maxMatch2[1].replace(/,/g, ""), 10);
      s = s.replace(maxMatch2[0], " ").trim();
    }
  }

  // standalone number at end/start that looks like a price (> 100)
  if (!maxPrice && !minPrice) {
    const numMatch = s.match(/\b(\d{3,})\b/);
    if (numMatch) {
      const n = parseInt(numMatch[1], 10);
      if (n >= 100) {
        maxPrice = n;
        s = s.replace(numMatch[0], " ").trim();
      }
    }
  }

  // "above / over / min / minimum / from" followed by number
  if (!minPrice) {
    const minMatch = s.match(/(?:above|over|min(?:imum)?|from|greater\s*than|more\s*than)\s*(\d[\d,]*)/i);
    if (minMatch) {
      minPrice = parseInt(minMatch[1].replace(/,/g, ""), 10);
      s = s.replace(minMatch[0], " ").trim();
    }
  }

  // clean leftover punctuation / connector words
  const keyword = s
    .replace(/\b(?:price|cost|buy|show|find|get|want|need|search|looking|product|products|item|items)\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  return { keyword, minPrice, maxPrice };
}

function priceLabel(parsed: ParsedQuery): string {
  if (parsed.minPrice && parsed.maxPrice)
    return `₹${parsed.minPrice.toLocaleString("en-IN")} – ₹${parsed.maxPrice.toLocaleString("en-IN")}`;
  if (parsed.maxPrice) return `under ₹${parsed.maxPrice.toLocaleString("en-IN")}`;
  if (parsed.minPrice) return `above ₹${parsed.minPrice.toLocaleString("en-IN")}`;
  return "";
}

/* ─── Skeleton card ─── */
function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/5] bg-[#EDE7DF] rounded-xl mb-3" />
      <div className="h-4 bg-[#EDE7DF] rounded w-3/4 mb-2" />
      <div className="h-4 bg-[#EDE7DF] rounded w-1/2" />
    </div>
  );
}

/* ─── Main page ─── */
export default function SearchPage() {
  const [location, navigate] = useLocation();

  // Parse ?q= from the URL
  const rawQ = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("q") ?? ""
    : "";

  const [inputValue, setInputValue] = useState(rawQ);
  const [submittedQ, setSubmittedQ] = useState(rawQ);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep input in sync when URL q changes (browser back/forward)
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q") ?? "";
    setInputValue(q);
    setSubmittedQ(q);
  }, [location]);

  const parsed = parseQuery(submittedQ);

  // Build API params
  const apiParams: Record<string, string | number> = { limit: 100, page: 1 };
  if (parsed.keyword) apiParams.search = parsed.keyword;
  if (parsed.minPrice) apiParams.minPrice = parsed.minPrice;
  if (parsed.maxPrice) apiParams.maxPrice = parsed.maxPrice;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["search", parsed.keyword, parsed.minPrice, parsed.maxPrice],
    queryFn: () => api.products(apiParams),
    enabled: submittedQ.length > 0,
    staleTime: 2 * 60 * 1000,
    retry: 1,
  });

  // Filter out backend bug entries (user record disguised as product)
  const rawItems = (data?.items ?? []).filter(p => p.name && p.price && !("email" in p));

  // Client-side price guard (in case backend ignores price params)
  const items = rawItems.filter(p => {
    const price = p.salePrice ?? p.price;
    if (parsed.minPrice && price < parsed.minPrice) return false;
    if (parsed.maxPrice && price > parsed.maxPrice) return false;
    return true;
  });

  // Sort client-side
  const sorted = [...items].sort((a, b) => {
    if (sortBy === "price-low") return (a.salePrice ?? a.price) - (b.salePrice ?? b.price);
    if (sortBy === "price-high") return (b.salePrice ?? b.price) - (a.salePrice ?? a.price);
    return 0;
  });

  const products = sorted.map(p => toProductCard(p, catBedsheets));

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = inputValue.trim();
    if (!q) return;
    setSubmittedQ(q);
    navigate(`/search?q=${encodeURIComponent(q)}`);
  }

  const loading = isLoading || isFetching;

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-[#FDFAF7]">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow pt-10 pb-24">
        <div className="max-w-[1320px] mx-auto px-4 lg:px-8">

          {/* ── Search bar ── */}
          <div className="max-w-2xl mx-auto mb-10">
            <form onSubmit={handleSearch} className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9E8A78]" />
              <input
                ref={inputRef}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder='Try "curtains", "sofa under 2000", "bedsheet rate 1500"…'
                className="w-full border-2 border-[#E8DDD0] focus:border-[#D4AF37] rounded-2xl py-4 pl-12 pr-24 text-[#3A2A20] text-base bg-white outline-none transition-colors shadow-sm placeholder:text-[#C4B09A]"
              />
              {inputValue && (
                <button type="button" onClick={() => setInputValue("")}
                  className="absolute right-14 top-1/2 -translate-y-1/2 text-[#9E8A78] hover:text-[#3A2A20] transition-colors">
                  <X className="h-4 w-4" />
                </button>
              )}
              <button type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#3A2A20] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#4A3A30] transition-colors">
                Search
              </button>
            </form>

            {/* Parsed query chips */}
            {submittedQ && (parsed.keyword || parsed.maxPrice || parsed.minPrice) && (
              <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap gap-2 mt-3 px-1">
                {parsed.keyword && (
                  <span className="flex items-center gap-1.5 bg-[#3A2A20] text-white text-xs px-3 py-1 rounded-full font-medium">
                    <Tag className="h-3 w-3" /> {parsed.keyword}
                  </span>
                )}
                {(parsed.minPrice || parsed.maxPrice) && (
                  <span className="flex items-center gap-1.5 bg-[#D4AF37] text-[#1A0F08] text-xs px-3 py-1 rounded-full font-semibold">
                    {priceLabel(parsed)}
                  </span>
                )}
              </motion.div>
            )}
          </div>

          {/* ── Results header ── */}
          {submittedQ && (
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                {loading ? (
                  <p className="text-sm text-[#9E8A78]">Searching…</p>
                ) : (
                  <p className="font-serif text-xl text-[#3A2A20]">
                    {products.length === 0
                      ? `No results for "${submittedQ}"`
                      : `${products.length} result${products.length === 1 ? "" : "s"} for "${submittedQ}"`}
                  </p>
                )}
              </div>
              {products.length > 0 && (
                <div className="flex items-center gap-3">
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="border border-[#E8DDD0] rounded-lg px-3 py-2 text-sm text-[#3A2A20] bg-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {/* ── Results grid ── */}
          {!submittedQ ? (
            <EmptySearchPrompt />
          ) : loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : products.length === 0 ? (
            <NoResults query={submittedQ} parsed={parsed} />
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
            >
              <AnimatePresence>
                {products.map((p, i) => (
                  <motion.div key={p.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}>
                    <ProductCard product={p} index={i} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}

/* ─── Empty prompt (no query yet) ─── */
function EmptySearchPrompt() {
  const suggestions = [
    "Bedsheets", "Curtains", "Cushion Covers", "Comforters",
    "Sofa Fabric", "Table Linen", "Blankets", "Quilts",
  ];
  const priceSuggestions = [
    "Curtains under 1500", "Bedsheet rate 1000", "Sofa fabric 500 to 2000",
  ];
  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <SearchIcon className="h-12 w-12 text-[#D4AF37] mx-auto mb-5 opacity-60" />
      <h2 className="font-serif text-2xl text-[#3A2A20] mb-2">What are you looking for?</h2>
      <p className="text-sm text-[#9E8A78] mb-8">
        Search by product name, category, or add a price — like <span className="font-medium text-[#6B5744]">"sofa rate 500"</span>
      </p>
      <div className="mb-6">
        <p className="text-[10px] tracking-[0.24em] font-bold text-[#9E8A78] uppercase mb-3">Popular Categories</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {suggestions.map(s => (
            <Link key={s} href={`/search?q=${encodeURIComponent(s)}`}
              className="px-3 py-1.5 rounded-full border border-[#E8DDD0] text-xs font-medium text-[#3A2A20] hover:border-[#D4AF37] hover:bg-[#FAF8F5] transition-all">
              {s}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[10px] tracking-[0.24em] font-bold text-[#9E8A78] uppercase mb-3">Try a price search</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {priceSuggestions.map(s => (
            <Link key={s} href={`/search?q=${encodeURIComponent(s)}`}
              className="px-3 py-1.5 rounded-full border border-[#D4AF37]/50 bg-[#FDF8EE] text-xs font-medium text-[#6B5744] hover:bg-[#D4AF37]/20 transition-all">
              {s}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── No results ─── */
function NoResults({ query, parsed }: { query: string; parsed: ParsedQuery }) {
  const suggestions = ["Bedsheets", "Curtains", "Cushion Covers", "Comforters"];
  return (
    <div className="max-w-xl mx-auto text-center py-16">
      <div className="w-16 h-16 rounded-full bg-[#F5F0EA] flex items-center justify-center mx-auto mb-5">
        <SearchIcon className="h-7 w-7 text-[#9E8A78]" />
      </div>
      <h2 className="font-serif text-2xl text-[#3A2A20] mb-2">No results found</h2>
      <p className="text-sm text-[#9E8A78] mb-2">
        We couldn't find any products matching <span className="font-medium text-[#3A2A20]">"{query}"</span>
        {parsed.maxPrice ? ` under ₹${parsed.maxPrice.toLocaleString("en-IN")}` : ""}
        {parsed.minPrice ? ` above ₹${parsed.minPrice.toLocaleString("en-IN")}` : ""}.
      </p>
      <p className="text-xs text-[#9E8A78] mb-8">Try a different keyword, adjust the price, or browse a category.</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {suggestions.map(s => (
          <Link key={s} href={`/search?q=${encodeURIComponent(s)}`}
            className="px-3 py-1.5 rounded-full border border-[#E8DDD0] text-xs font-medium text-[#3A2A20] hover:border-[#D4AF37] hover:bg-[#FAF8F5] transition-all">
            {s}
          </Link>
        ))}
      </div>
      <Link href="/shop"
        className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-[#D4AF37] hover:text-[#b8932a] transition-colors">
        Browse all products <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
