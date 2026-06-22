import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import PageHero from "@/components/ui/PageHero";
import { Link } from "wouter";
import catCurtains from "@/assets/cat-curtains.png";
import catBedsheets from "@/assets/cat-bedsheets.png";
import catCushions from "@/assets/cat-cushions.png";
import catSofaFabrics from "@/assets/cat-sofa-fabrics.png";
import catComforters from "@/assets/cat-comforters.png";
import catHomeDecor from "@/assets/cat-home-decor.png";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const FALLBACK_IMAGES = [catCurtains, catBedsheets, catCushions, catSofaFabrics, catComforters, catHomeDecor];

const STATIC_BLOGS = [
  { id: 1, title: "The Art of Layering Textures in Modern Living Spaces", slug: "the-art-of-layering", category: "Interior Design", createdAt: "2023-10-24", imageUrl: catCurtains, excerpt: "Discover how mixing velvet, linen, and silk can create depth and warmth in minimalist interiors." },
  { id: 2, title: "Choosing the Perfect Thread Count for Your Climate", slug: "thread-count-guide", category: "Buying Guide", createdAt: "2023-10-18", imageUrl: catBedsheets, excerpt: "A comprehensive guide to understanding thread counts and selecting the ideal bedding for different seasons." },
  { id: 3, title: "Color Trends: Terracotta and Warm Neutrals for 2024", slug: "color-trends-2024", category: "Trends", createdAt: "2023-10-12", imageUrl: catCushions, excerpt: "Explore the resurgence of earthy tones in high-end residential design and how to incorporate them." },
  { id: 4, title: "Maintaining Your Luxury Upholstery Fabrics", slug: "upholstery-care", category: "Care Guide", createdAt: "2023-09-30", imageUrl: catSofaFabrics, excerpt: "Expert tips on cleaning, protecting, and extending the life of your premium sofa fabrics." },
  { id: 5, title: "The Psychology of Bedroom Aesthetics for Better Sleep", slug: "bedroom-psychology", category: "Wellness", createdAt: "2023-09-22", imageUrl: catComforters, excerpt: "How color palettes, textures, and lighting in your bedroom impact your rest quality." },
  { id: 6, title: "Elevating Small Spaces with Strategic Window Treatments", slug: "window-treatments", category: "Styling Tips", createdAt: "2023-09-15", imageUrl: catHomeDecor, excerpt: "Learn how to use curtains to make compact rooms feel taller, wider, and more luxurious." },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function Blogs() {
  const { data } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => api.blogs({ limit: 12, page: 1 }),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const posts = data && data.items.length > 0
    ? data.items.map((b, i) => ({
        id: b.id,
        title: b.title,
        slug: b.slug,
        category: b.category || "Article",
        createdAt: b.createdAt,
        imageUrl: b.imageUrl || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length],
        excerpt: b.excerpt || "",
      }))
    : STATIC_BLOGS;

  const featured = posts[0];
  const gridPosts = posts.slice(1);

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow">
        <PageHero
          title="The Journal"
          subtitle="Insights, trends, and inspiration for luxury living."
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Blogs" }]}
        />

        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">

          {/* Featured Post */}
          <div className="mb-20">
            <Link href={`/blogs/${featured.slug}`}>
              <div className="group relative overflow-hidden rounded-lg shadow-sm border border-border/30 bg-card flex flex-col lg:flex-row">
                <div className="w-full lg:w-3/5 h-[400px] lg:h-[500px] overflow-hidden">
                  <img src={featured.imageUrl} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="w-full lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
                  <span className="text-primary text-xs font-medium tracking-widest uppercase mb-4 block">{featured.category}</span>
                  <h2 className="font-serif text-3xl lg:text-4xl mb-4 group-hover:text-primary transition-colors">{featured.title}</h2>
                  <p className="text-sm text-muted-foreground mb-6 uppercase tracking-wider">{formatDate(featured.createdAt)}</p>
                  <p className="text-muted-foreground font-light leading-relaxed mb-8">{featured.excerpt}</p>
                  <span className="text-sm font-medium uppercase tracking-widest border-b border-foreground pb-1 self-start group-hover:border-primary transition-colors">Read Article</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
            {gridPosts.map((post) => (
              <Link key={post.id} href={`/blogs/${post.slug}`}>
                <div className="group cursor-pointer">
                  <div className="overflow-hidden mb-5 rounded-lg aspect-[4/3]">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <span className="text-primary text-[10px] font-medium tracking-widest uppercase mb-3 block">{post.category}</span>
                  <h3 className="font-serif text-xl mb-3 group-hover:text-primary transition-colors leading-snug">{post.title}</h3>
                  <p className="text-muted-foreground text-sm font-light leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <p className="text-xs text-muted-foreground mt-4">{formatDate(post.createdAt)}</p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
