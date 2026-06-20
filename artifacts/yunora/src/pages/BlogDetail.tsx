import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Link } from "wouter";
import catCurtains from "@/assets/cat-curtains.png";
import catBedsheets from "@/assets/cat-bedsheets.png";
import catCushions from "@/assets/cat-cushions.png";

export default function BlogDetail() {
  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow pt-8 pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Journal", href: "/blogs" }, { label: "Article" }]} />
          
          <div className="text-center mt-8 mb-12">
            <span className="text-primary text-sm font-medium tracking-widest uppercase mb-6 block">Interior Design</span>
            <h1 className="font-serif text-4xl lg:text-6xl leading-tight mb-8">The Art of Layering Textures in Modern Living Spaces</h1>
            <p className="text-sm text-muted-foreground uppercase tracking-wider">By Sarah Jenkins • Oct 24, 2023</p>
          </div>
        </div>

        <div className="w-full max-w-6xl mx-auto px-4 lg:px-8 mb-16">
          <div className="aspect-[21/9] w-full overflow-hidden rounded-lg bg-muted/30">
            <img src={catCurtains} alt="Layered Textures" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="prose prose-lg prose-neutral prose-headings:font-serif prose-headings:font-normal prose-a:text-primary mx-auto">
            <p className="lead text-xl text-muted-foreground font-light mb-8">
              A beautifully designed room doesn't just rely on color or furniture placement—it's the interplay of textures that truly brings a space to life. Discover how mixing velvet, linen, and silk can create depth and warmth in minimalist interiors.
            </p>

            <h2 className="text-3xl mt-12 mb-6">Understanding Visual Weight</h2>
            <p className="mb-6 font-light">
              Every fabric has a visual weight. Heavy textures like velvet and boucle absorb light and ground a space, making it feel cozy and intimate. Conversely, sheer linens and silks reflect light, adding an airy, ethereal quality. The secret to a perfectly balanced room lies in contrasting these elements intentionally.
            </p>

            <p className="mb-6 font-light">
              When styling a living room, start with your foundational pieces. A heavy linen sofa provides a neutral, slightly textured base. From there, you can introduce high-contrast textures through your soft furnishings.
            </p>

            <blockquote className="border-l-4 border-primary pl-6 my-10 italic text-2xl font-serif text-foreground opacity-90">
              "Texture is the unsung hero of interior design. It's what makes a room feel lived-in, curated, and deeply personal."
            </blockquote>

            <h2 className="text-3xl mt-12 mb-6">The Rule of Three</h2>
            <p className="mb-6 font-light">
              For a foolproof approach to layering, adhere to the Rule of Three textures per vignette:
            </p>
            <ul className="list-disc pl-6 mb-8 space-y-4 font-light">
              <li><strong>The Anchor:</strong> A matte, durable fabric like structured cotton or linen for large pieces.</li>
              <li><strong>The Accent:</strong> A plush, light-absorbing material like velvet or faux fur for cushions or throws.</li>
              <li><strong>The Highlight:</strong> A smooth, light-reflecting surface like silk or satin to catch the eye.</li>
            </ul>

            <h2 className="text-3xl mt-12 mb-6">Window Treatments as Architectural Elements</h2>
            <p className="mb-6 font-light">
              Curtains offer a massive canvas for texture. Layering sheer curtains beneath heavy drapes not only provides functional light control but also creates a sophisticated, hotel-like atmosphere. At YUNORA, our dual-layer track systems are designed specifically to accommodate this aesthetic effortlessly.
            </p>

            <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
              <div className="flex gap-4">
                <span className="bg-muted px-3 py-1 text-xs uppercase tracking-wider rounded">Design</span>
                <span className="bg-muted px-3 py-1 text-xs uppercase tracking-wider rounded">Styling</span>
              </div>
              <div className="flex gap-4 text-sm font-medium">
                <button className="hover:text-primary transition-colors">Share</button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="bg-muted/10 py-20 mt-20 border-t border-border/50">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-serif text-3xl mb-12 text-center">More from the Journal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Link href="/blogs/thread-count" className="group">
                <div className="flex flex-col sm:flex-row gap-6 bg-card p-4 rounded-lg shadow-sm border border-border/30 hover:border-primary/50 transition-colors">
                  <div className="w-full sm:w-1/3 aspect-[4/3] sm:aspect-square overflow-hidden rounded bg-muted/30">
                    <img src={catBedsheets} alt="Bedsheets" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="w-full sm:w-2/3 flex flex-col justify-center">
                    <span className="text-primary text-xs font-medium tracking-widest uppercase mb-2">Buying Guide</span>
                    <h3 className="font-serif text-xl mb-2 group-hover:text-primary transition-colors">Choosing the Perfect Thread Count</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mt-auto">Oct 18, 2023</p>
                  </div>
                </div>
              </Link>
              <Link href="/blogs/color-trends" className="group">
                <div className="flex flex-col sm:flex-row gap-6 bg-card p-4 rounded-lg shadow-sm border border-border/30 hover:border-primary/50 transition-colors">
                  <div className="w-full sm:w-1/3 aspect-[4/3] sm:aspect-square overflow-hidden rounded bg-muted/30">
                    <img src={catCushions} alt="Cushions" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="w-full sm:w-2/3 flex flex-col justify-center">
                    <span className="text-primary text-xs font-medium tracking-widest uppercase mb-2">Trends</span>
                    <h3 className="font-serif text-xl mb-2 group-hover:text-primary transition-colors">Terracotta and Warm Neutrals</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mt-auto">Oct 12, 2023</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
