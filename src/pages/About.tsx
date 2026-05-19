import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Eye, Heart, Users, MapPin, Award, Zap, Shield, ImageIcon } from "lucide-react";
import { siteConfig } from "@/config/site";

const About = () => (
  <PageLayout title="About AM Enterprises — Digital Agency in Islamabad" description="Founded in 2022 by Moez Rehman, AM Enterprises is a full-service digital marketing & software agency in Pakistan." canonical="/about">
    <PageHero title="About AM Enterprises" subtitle="Building Pakistan's digital future — one brand at a time." />

    <section className="py-20">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Our Story</span>
          <h2 className="text-3xl md:text-4xl mt-3 mb-6">From a vision to a leading agency</h2>
          <p className="text-muted-foreground mb-4">AM Enterprises was founded in <strong>2022 by Moez Rehman</strong> with a simple mission: help Pakistani businesses harness world-class digital tools to grow faster, smarter, and more profitably.</p>
          <p className="text-muted-foreground mb-4">Today, we're a team of strategists, designers, developers, and marketers serving clients from our offices in <strong>Islamabad and Rawat Technology Park</strong>.</p>
          <p className="text-muted-foreground">We've delivered 150+ projects across e-commerce, SaaS, real estate, healthcare, and education — and we're just getting started.</p>
        </div>
        <Card className="p-8 shadow-elegant gradient-primary text-primary-foreground">
          <div className="space-y-6">
            <div className="flex gap-4"><Target className="w-8 h-8 shrink-0" /><div><h3 className="text-xl mb-1">Our Mission</h3><p className="opacity-90 text-sm">Empower every business with smart, scalable digital solutions that drive measurable growth.</p></div></div>
            <div className="flex gap-4"><Eye className="w-8 h-8 shrink-0" /><div><h3 className="text-xl mb-1">Our Vision</h3><p className="opacity-90 text-sm">To be South Asia's most trusted partner for digital transformation.</p></div></div>
            <div className="flex gap-4"><Heart className="w-8 h-8 shrink-0" /><div><h3 className="text-xl mb-1">Our Values</h3><p className="opacity-90 text-sm">Transparency, results, and long-term partnerships over short-term wins.</p></div></div>
          </div>
        </Card>
      </div>
    </section>

    <section className="py-20 bg-secondary">
      <div className="container mx-auto">
        <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl mb-3">Why Choose Us</h2><p className="text-muted-foreground">Four reasons brands trust us with their growth.</p></div>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: Award, t: "Proven Results", d: "150+ delivered projects with measurable ROI." },
            { icon: Users, t: "Senior Team", d: "Strategists, devs & creatives — no juniors on your account." },
            { icon: Zap, t: "Fast Delivery", d: "Agile sprints with weekly progress demos." },
            { icon: Shield, t: "Transparent Pricing", d: "No hidden fees. Clear scope, clear deliverables." },
          ].map((f) => (
            <Card key={f.t} className="p-6">
              <f.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg mb-2">{f.t}</h3>
              <p className="text-sm text-muted-foreground">{f.d}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-3">Our Gallery</h2>
          <p className="text-muted-foreground mb-8">See our latest work across all services</p>
        </div>
        <div className="mb-12">
          <Card className="p-12 text-center bg-muted/50 border-2 border-dashed">
            <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold mb-2">Featured Work</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Browse our portfolio of successful projects. From digital marketing campaigns to full-stack applications, we're proud of the impact we've created for our clients.</p>
            <Button asChild variant="hero" size="lg"><Link to="/gallery">View Gallery</Link></Button>
          </Card>
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl mb-3">Our Offices</h2>
        <p className="text-muted-foreground mb-12">Two locations, one mission.</p>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <Card className="p-8 text-left"><MapPin className="w-8 h-8 text-primary mb-3" /><h3 className="text-xl mb-2">Islamabad HQ</h3><p className="text-muted-foreground">Our main creative and strategy hub serving the federal capital region.</p></Card>
          <Card className="p-8 text-left"><MapPin className="w-8 h-8 text-primary mb-3" /><h3 className="text-xl mb-2">Rawat Technology Park</h3><p className="text-muted-foreground">Our engineering hub for software, app, and platform development.</p></Card>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
          <Button asChild variant="hero" size="lg"><Link to={siteConfig.cta.bookNow}>Book a Call</Link></Button>
          <Button asChild variant="outline" size="lg"><Link to={siteConfig.cta.contact}>Get in Touch</Link></Button>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default About;
