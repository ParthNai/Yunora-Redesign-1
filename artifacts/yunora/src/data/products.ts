import hero1 from "@/assets/hero-1.png";
import catCurtains from "@/assets/cat-curtains.png";
import catBedsheets from "@/assets/cat-bedsheets.png";
import catCushions from "@/assets/cat-cushions.png";
import catSofaFabrics from "@/assets/cat-sofa-fabrics.png";
import catComforters from "@/assets/cat-comforters.png";
import catHomeDecor from "@/assets/cat-home-decor.png";
import colCurated from "@/assets/col-curated.png";
import colBedding from "@/assets/col-bedding.png";
import colCurtains from "@/assets/col-curtains.png";

export const categories = [
  { id: 1, name: "CURTAINS", count: "120+ Products", slug: "curtains", image: catCurtains },
  { id: 2, name: "BEDSHEETS", count: "200+ Products", slug: "bedsheets", image: catBedsheets },
  { id: 3, name: "CUSHIONS", count: "150+ Products", slug: "cushions", image: catCushions },
  { id: 4, name: "SOFA FABRICS", count: "80+ Products", slug: "sofa-fabrics", image: catSofaFabrics },
  { id: 5, name: "COMFORTERS", count: "100+ Products", slug: "comforters", image: catComforters },
  { id: 6, name: "HOME DECOR", count: "150+ Products", slug: "home-decor", image: catHomeDecor },
];

export const products = [
  { id: 1, name: "Royal Velvet Curtain", price: 2499, originalPrice: 3999, badge: "NEW", rating: 4.8, reviews: 125, category: "curtains", image: catCurtains },
  { id: 2, name: "Premium Cotton Bedsheet", price: 1899, originalPrice: 2699, badge: "-30%", rating: 4.5, reviews: 88, category: "bedsheets", image: catBedsheets },
  { id: 3, name: "Luxury Cushion Cover", price: 499, originalPrice: 699, badge: "-20%", rating: 4.6, reviews: 58, category: "cushions", image: catCushions },
  { id: 4, name: "Shera Comforter", price: 3299, originalPrice: 4399, badge: "-25%", rating: 4.7, reviews: 28, category: "comforters", image: catComforters },
  { id: 5, name: "Linen Sheer Curtain", price: 1899, originalPrice: 2499, badge: "-24%", rating: 4.4, reviews: 65, category: "curtains", image: catCurtains },
  { id: 6, name: "Egyptian Cotton Bedsheet", price: 2799, originalPrice: 3999, badge: "NEW", rating: 4.9, reviews: 42, category: "bedsheets", image: catBedsheets },
  { id: 7, name: "Velvet Cushion Set", price: 1299, originalPrice: 1799, badge: "-28%", rating: 4.5, reviews: 91, category: "cushions", image: catCushions },
  { id: 8, name: "Silk Sofa Fabric", price: 599, originalPrice: 799, badge: "-25%", rating: 4.3, reviews: 37, category: "sofa-fabrics", image: catSofaFabrics },
];

export const heroImages = [hero1];
export const collectionImages = { curated: colCurated, bedding: colBedding, curtains: colCurtains };
export const craftImages = [catCurtains, catBedsheets];
