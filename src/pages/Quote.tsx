import { PageHero } from "@/components/layout/PageHero";
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DollarSign, Package, FileText } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { siteConfig, getEmail } from "@/config/site";

const quoteSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(1, "Phone is required").max(30),
  company: z.string().trim().max(100).optional(),
  service: z.string().trim().min(1, "Please select a service").max(100),
  budget: z.string().trim().max(50).optional(),
  description: z.string().trim().min(10, "Please describe your project").max(2000),
});

const services = [
  "Digital Marketing",
  "SEO Services",
  "Google Ads Management",
  "Social Media Marketing",
  "Web Development",
  "E-Commerce Development",
  "Mobile App Development",
  "Branding & Design",
  "Other",
];

const budgets = [
  "Under PKR 50,000",
  "PKR 50,000 - 200,000",
  "PKR 200,000 - 500,000",
  "PKR 500,000 - 1,000,000",
  "Above PKR 1,000,000",
];

export default function QuotePage() {
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd);

    const v = quoteSchema.safeParse(data);

    if (!v.success) {
      toast.error(v.error.issues[0].message);
      return;
    }

    setBusy(true);

    try {
      const { error } = await supabase.from("quote_requests").insert({
        name: v.data.name,
        email: v.data.email,
        phone: v.data.phone,
        company: v.data.company || null,
        service: v.data.service,
        budget: v.data.budget || null,
        description: v.data.description,
        status: "new",
      });

      setBusy(false);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Quote request submitted! We'll review it and get back to you within 24 hours.");
      e.currentTarget.reset();
    } catch (error: any) {
      setBusy(false);
      toast.error(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <PageLayout
      title="Get a Quote — AM Enterprises"
      description="Request a custom quote for your project. Tell us about your needs and budget."
      canonical="/quote"
    >
      <PageHero
        title="Get Your Custom Quote"
        subtitle="Share your project details and we'll provide a tailored estimate within 24 hours."
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto max-w-5xl px-4">
          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <Card className="p-6 text-center">
              <DollarSign className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-bold mb-2">Transparent Pricing</h3>
              <p className="text-sm text-muted-foreground">No hidden fees. You know exactly what you&apos;re paying for.</p>
            </Card>

            <Card className="p-6 text-center">
              <FileText className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-bold mb-2">Detailed Breakdown</h3>
              <p className="text-sm text-muted-foreground">Every quote includes scope, timeline, and deliverables.</p>
            </Card>

            <Card className="p-6 text-center">
              <Package className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-bold mb-2">Flexible Options</h3>
              <p className="text-sm text-muted-foreground">Customize packages to fit your needs and budget.</p>
            </Card>
          </div>

          {/* Form */}
          <Card className="p-6 md:p-10">
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Contact Info */}
              <div>
                <h3 className="font-bold mb-4 text-lg">Your Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    name="name"
                    required
                    placeholder="Full Name"
                    maxLength={100}
                  />
                  <Input
                    name="email"
                    required
                    type="email"
                    placeholder="Email Address"
                    maxLength={255}
                  />
                  <Input
                    name="phone"
                    required
                    placeholder="Phone Number"
                    maxLength={30}
                  />
                  <Input
                    name="company"
                    placeholder="Company (Optional)"
                    maxLength={100}
                  />
                </div>
              </div>

              {/* Project Details */}
              <div>
                <h3 className="font-bold mb-4 text-lg">Project Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Service Type</label>
                    <select
                      name="service"
                      required
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select a service</option>
                      {services.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Budget Range</label>
                    <select
                      name="budget"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select your budget (Optional)</option>
                      {budgets.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Project Description</label>
                    <Textarea
                      name="description"
                      required
                      placeholder="Tell us about your project. What are your goals? What do you need? Any specific requirements?"
                      rows={6}
                      maxLength={2000}
                      className="resize-none"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={busy}
              >
                {busy ? "Sending..." : "Request Quote"}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                We promise to get back to you within 24 hours with a detailed quote.
              </p>
            </form>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold mb-2">How long does it take to receive a quote?</h3>
              <p className="text-sm text-muted-foreground">We typically provide quotes within 24 business hours. Complex projects may take longer.</p>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-2">Is the quote obligation-free?</h3>
              <p className="text-sm text-muted-foreground">Yes, absolutely. You can review the quote and decide if it&apos;s right for you without any commitment.</p>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-2">Do you offer payment plans?</h3>
              <p className="text-sm text-muted-foreground">We can discuss flexible payment arrangements for larger projects. Get in touch to learn more.</p>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-2">Can I modify the quote after receiving it?</h3>
              <p className="text-sm text-muted-foreground">Absolutely. After you receive your quote, we can discuss adjustments to scope, timeline, or budget.</p>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
