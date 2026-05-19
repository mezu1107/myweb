import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";

const galleryImages = [
  {
    id: 1,
    title: "Digital Marketing Campaign",
    category: "Marketing",
    image: "/api/placeholder?w=400&h=300&text=Campaign+1",
    description: "Successful paid ads campaign with 300% ROI increase",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    category: "Development",
    image: "/api/placeholder?w=400&h=300&text=Ecommerce",
    description: "Custom e-commerce platform with integrated inventory management",
  },
  {
    id: 3,
    title: "Brand Identity Design",
    category: "Branding",
    image: "/api/placeholder?w=400&h=300&text=Branding",
    description: "Complete brand identity system with guidelines",
  },
  {
    id: 4,
    title: "SEO Success Story",
    category: "SEO",
    image: "/api/placeholder?w=400&h=300&text=SEO+Results",
    description: "Achieved #1 rankings for 15+ high-intent keywords",
  },
  {
    id: 5,
    title: "Mobile App Development",
    category: "Development",
    image: "/api/placeholder?w=400&h=300&text=Mobile+App",
    description: "Cross-platform mobile app with 50K+ downloads",
  },
  {
    id: 6,
    title: "Social Media Growth",
    category: "Social",
    image: "/api/placeholder?w=400&h=300&text=Social+Growth",
    description: "Built audience from 0 to 100K followers in 12 months",
  },
];

const categories = ["All", "Marketing", "Development", "Branding", "SEO", "Social"];

export default function GalleryPage() {
  const allWork = galleryImages;

  return (
    <PageLayout
      title="Our Portfolio Gallery — AM Enterprises"
      description="See our latest work across digital marketing, web development, branding, and more."
      canonical="/gallery"
    >
      <PageHero
        title="Our Latest Work"
        subtitle="A showcase of projects we're proud of across all our services."
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="mb-12 flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={cat === "All" ? "hero" : "outline"}
                size="sm"
                className="rounded-full"
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allWork.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden group cursor-pointer hover:shadow-lg transition-smooth"
              >
                {/* Image */}
                <div className="w-full h-64 bg-muted overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="text-white">
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="text-sm opacity-90">{item.description}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                    {item.category}
                  </div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Want to see your business featured here?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Let&apos;s create something amazing together. Get in touch with our team to discuss your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="lg">
                <Link to={siteConfig.cta.bookNow}>Schedule a Call</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to={siteConfig.cta.getQuote}>Get a Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
