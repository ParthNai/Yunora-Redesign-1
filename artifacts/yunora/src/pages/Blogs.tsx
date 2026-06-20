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

const blogPosts = [
  { id: 1, title: "The Art of Layering Textures in Modern Living Spaces", tag: "Interior Design", date: "Oct 24, 2023", image: catCurtains, excerpt: "Discover how mixing velvet, linen, and silk can create depth and warmth in minimalist interiors." },
  { id: 2, title: "Choosing the Perfect Thread Count for Your Climate", tag: "Buying Guide", date: "Oct 18, 2023", image: catBedsheets, excerpt: "A comprehensive guide to understanding thread counts and selecting the ideal bedding for different seasons." },
  { id: 3, title: "Color Trends: Terracotta and Warm Neutrals for 2024", tag: "Trends", date: "Oct 12, 2023", image: catCushions, excerpt: "Explore the resurgence of earthy tones in high-end residential design and how to incorporate them." },
  { id: 4, title: "Maintaining Your Luxury Upholstery Fabrics", tag: "Care Guide", date: "Sep 30, 2023", image: catSofaFabrics, excerpt: "Expert tips on cleaning, protecting, and extending the life of your premium sofa fabrics." },
  { id: 5, title: "The Psychology of Bedroom Aesthetics for Better Sleep", tag: "Wellness", date: "Sep 22, 2023", image: catComforters, excerpt: "How color palettes, textures, and lighting in your bedroom impact your rest quality." },
  { id: 6, title: "Elevating Small Spaces with Strategic Window Treatments", tag: "Styling Tips", date: "Sep 15, 2023", image: catHomeDecor, excerpt: "Learn how to use curtains to make compact rooms feel taller, wider, and more luxurious." },
];

export default function Blogs() {
  const featured = blogPosts[0];
  const gridPosts = blogPosts.slice(1);

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
            <Link href="/blogs/the-art-of-layering">
              <div className="group relative overflow-hidden rounded-lg shadow-sm border border-border/30 bg-card flex flex-col lg:flex-row">
                <div className="w-full lg:w-3/5 h-[400px] lg:h-[500px] overflow-hidden">
                  <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="w-full lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
                  <span className="text-primary text-xs font-medium tracking-widest uppercase mb-4 block">{featured.tag}</span>
                  <h2 className="font-serif text-3xl lg:text-4xl mb-4 group-hover:text-primary transition-colors">{featured.title}</h2>
                  <p className="text-sm text-muted-foreground mb-6 uppercase tracking-wider">{featured.date}</p>
                  <p className="text-muted-foreground font-light leading-relaxed mb-8">{featured.excerpt}</p>
                  <span className="text-sm font-medium uppercase tracking-widest border-b border-foreground pb-1 self-start group-hover:border-primary transition-colors">Read Article</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
            {gridPosts.map((post) => (
              <Link key={post.id} href={`/blogs/${post.title.toLowerCase().replace(/ /g, '-')}`}>
                <div className="group h-full flex flex-col">
                  <div className="w-full aspect-[4/3] overflow-hidden rounded-lg mb-6 bg-muted/30">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="flex-grow flex flex-col">
                    <span className="text-primary text-xs font-medium tracking-widest uppercase mb-3 block">{post.tag}</span>
                    <h3 className="font-serif text-2xl mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">{post.date}</p>
                    <p className="text-muted-foreground text-sm font-light leading-relaxed mb-6 line-clamp-3">{post.excerpt}</p>
                    <div className="mt-auto">
                      <span className="text-xs font-medium uppercase tracking-widest border-b border-border pb-1 group-hover:border-primary group-hover:text-primary transition-colors">Read More</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <button className="border border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-4 text-sm font-medium tracking-widest uppercase transition-colors">
              Load More Articles
            </button>
          </div>

        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
