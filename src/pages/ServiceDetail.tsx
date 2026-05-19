import { PageHero } from "@/components/layout/PageHero";
import { useParams, Link, Navigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, ArrowRight, Award, Zap, Users, BarChart3, TrendingUp, Shield } from "lucide-react";
import { services as fallback } from "@/data/services";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";
import { siteConfig } from "@/config/site";

const ServiceDetail = () => {
  const { slug } = useParams();
  const { data, isLoading } = useRealtimeTable<any>({ table: "services", filters: [{ column: "slug", value: slug }], limit: 1 });
  const dbService = data?.[0];
  const fb = fallback.find((x) => x.slug === slug);
  if (isLoading) return <div className="min-h-screen" />;
  if (!dbService && !fb) return <Navigate to="/services" replace />;

  const s = dbService ? {
    title: dbService.title,
    short: dbService.description || dbService.short_description,
    description: dbService.long_description || dbService.description,
    detailed_content: dbService.detailed_content || "",
    benefits: dbService.benefits || (fb?.benefits ?? []),
    features: dbService.features || [],
    process: dbService.process_steps || (fb?.process ?? []),
    pricing: dbService.base_price || (fb?.pricing ?? ""),
    pricing_tiers: dbService.pricing_tiers || [],
    faqs: dbService.faqs || (fb?.faqs ?? []),
    why_us: dbService.why_us_content || [],
    tech_stack: dbService.tech_stack || [],
    gallery_images: dbService.gallery_images || [],
    slug: dbService.slug,
  } : fb!;

  return (
    <PageLayout title={`${s.title} — AM Enterprises`} description={s.short} canonical={`/services/${s.slug}`}>
      <PageHero title={s.title} subtitle={s.short} />
      <div className="container mx-auto -mt-8 relative z-10 mb-12 text-center flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild variant="accent" size="lg"><Link to={siteConfig.cta.getQuote}>Get a Quote</Link></Button>
        <Button asChild variant="outline" size="lg"><Link to={siteConfig.cta.bookNow}>Book Consultation</Link></Button>
      </div>

      <section className="py-16">
        <div className="container mx-auto max-w-4xl">
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">{s.description}</p>

          {/* Key Benefits */}
          {Array.isArray(s.benefits) && s.benefits.length > 0 && (<>
            <h2 className="text-3xl font-bold mb-8">Key Benefits</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-16">
              {s.benefits.map((b: any, idx: number) => (
                <Card key={idx} className="p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-1 shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">{typeof b === 'string' ? b : b.title}</h4>
                      {typeof b !== 'string' && b.description && <p className="text-sm text-muted-foreground">{b.description}</p>}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>)}

          {/* Features */}
          {Array.isArray(s.features) && s.features.length > 0 && (<>
            <h2 className="text-3xl font-bold mb-8">Comprehensive Features</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-16">
              {s.features.map((f: any, idx: number) => (
                <Card key={idx} className="p-5">
                  <h4 className="font-semibold mb-2">{f.title}</h4>
                  <p className="text-sm text-muted-foreground">{f.description}</p>
                </Card>
              ))}
            </div>
          </>)}

          {/* Our Process - Timeline */}
          {Array.isArray(s.process) && s.process.length > 0 && (<>
            <h2 className="text-3xl font-bold mb-8">Our Process</h2>
            <div className="mb-16">
              {s.process.map((p: any, i: number) => (
                <div key={p.step || i} className="flex gap-6 mb-6 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold shrink-0">
                      {p.step || i + 1}
                    </div>
                    {i < (s.process?.length ?? 0) - 1 && <div className="w-1 bg-accent/30 flex-grow mt-2" style={{ height: "60px" }} />}
                  </div>
                  <div className="pt-2 pb-6">
                    <h4 className="text-lg font-semibold mb-2">{p.step || p.title}</h4>
                    <p className="text-muted-foreground">{p.description || p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </>)}

          {/* Why Choose Us */}
          {Array.isArray(s.why_us) && s.why_us.length > 0 && (<>
            <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>
            <div className="grid md:grid-cols-3 gap-4 mb-16">
              {s.why_us.map((item: any, idx: number) => (
                <Card key={idx} className="p-6 text-center">
                  <Zap className="w-8 h-8 text-accent mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </Card>
              ))}
            </div>
          </>)}

          {/* Pricing */}
          {(Array.isArray(s.pricing_tiers) && s.pricing_tiers.length > 0) ? (
            <>
              <h2 className="text-3xl font-bold mb-8">Pricing Plans</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-16">
                {s.pricing_tiers.map((tier: any, idx: number) => (
                  <Card key={idx} className={`p-6 ${idx === 1 ? 'ring-2 ring-accent' : ''}`}>
                    <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                    <div className="text-3xl font-bold text-accent mb-4">${tier.price}</div>
                    <ul className="space-y-2 mb-6">
                      {Array.isArray(tier.features) && tier.features.map((feat: string, fi: number) => (
                        <li key={fi} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full"><Link to={siteConfig.cta.getQuote}>Get Started</Link></Button>
                  </Card>
                ))}
              </div>
            </>
          ) : s.pricing ? (
            <Card className="p-8 gradient-primary text-primary-foreground mb-16">
              <div className="text-sm uppercase tracking-wider opacity-80 mb-2">Pricing</div>
              <div className="text-3xl font-bold mb-4">{s.pricing}</div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild variant="accent" size="lg"><Link to={siteConfig.cta.getQuote}>Request Quote</Link></Button>
                <Button asChild variant="outline" size="lg" className="text-foreground"><Link to={siteConfig.cta.getProposal}>See Proposal</Link></Button>
              </div>
            </Card>
          ) : null}

          {/* Tech Stack */}
          {Array.isArray(s.tech_stack) && s.tech_stack.length > 0 && (<>
            <h2 className="text-3xl font-bold mb-8">Technology Stack</h2>
            <div className="flex flex-wrap gap-2 mb-16">
              {s.tech_stack.map((tech: string, idx: number) => (
                <Badge key={idx} variant="secondary">{tech}</Badge>
              ))}
            </div>
          </>)}

          {/* Gallery */}
          {Array.isArray(s.gallery_images) && s.gallery_images.length > 0 && (<>
            <h2 className="text-3xl font-bold mb-8">Gallery</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-16">
              {s.gallery_images.map((img: any, idx: number) => (
                <Card key={idx} className="overflow-hidden">
                  <img src={img.url} alt={img.caption} className="w-full h-48 object-cover" />
                  {img.caption && <p className="p-4 text-sm">{img.caption}</p>}
                </Card>
              ))}
            </div>
          </>)}

          {/* FAQs */}
          {Array.isArray(s.faqs) && s.faqs.length > 0 && (<>
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible>
              {s.faqs.map((f: any, i: number) => (
                <AccordionItem key={i} value={`q${i}`}>
                  <AccordionTrigger>{typeof f === 'string' ? f : f.question || f.q}</AccordionTrigger>
                  <AccordionContent>{typeof f === 'string' ? "See admin for answer" : f.answer || f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </>)}
        </div>
      </section>
    </PageLayout>
  );
};

export default ServiceDetail;
