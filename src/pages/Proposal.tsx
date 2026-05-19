import { PageHero } from "@/components/layout/PageHero";
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, Zap, FileText } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { siteConfig, getEmail } from "@/config/site";

const proposalSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(1, "Phone is required").max(30),
  company: z.string().trim().max(100).optional(),
  industry: z.string().trim().min(1, "Please select an industry").max(50),
  goal: z.string().trim().min(10, "Please describe your main goal").max(500),
  challenges: z.string().trim().min(10, "Please describe your challenges").max(1000),
  timeline: z.string().trim().min(1, "Please select a timeline").max(50),
});

const industries = [
  "E-Commerce",
  "SaaS",
  "Digital Agency",
  "Professional Services",
  "Healthcare",
  "Education",
  "Real Estate",
  "Hospitality",
  "Retail",
  "Manufacturing",
  "Other",
];

const timelines = [
  "Immediate (0-1 month)",
  "Short term (1-3 months)",
  "Medium term (3-6 months)",
  "Long term (6+ months)",
];

const steps = [
  {
    number: 1,
    title: "Tell Us About Your Business",
    description: "Share your industry, goals, and current challenges. More details = better proposal.",
  },
  {
    number: 2,
    title: "AI Analysis & Strategy",
    description: "Our system analyzes your info and generates a customized proposal with AI-powered insights.",
  },
  {
    number: 3,
    title: "Review & Discuss",
    description: "We send you the proposal and can discuss adjustments. No pressure, all options are open.",
  },
];

export default function ProposalPage() {
  const [step, setStep] = useState(1); // 1: Form, 2: Loading, 3: Complete
  const [busy, setBusy] = useState(false);
  const [proposalData, setProposalData] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd);

    const v = proposalSchema.safeParse(data);

    if (!v.success) {
      toast.error(v.error.issues[0].message);
      return;
    }

    setBusy(true);
    setFormData(v.data);
    setStep(2); // Loading step

    try {
      // Simulate AI generation with delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate AI Proposal
      const aiProposal = generateAIProposal(v.data);

      // Save to database
      const { error: insertError } = await supabase.from("proposals").insert({
        name: v.data.name,
        email: v.data.email,
        phone: v.data.phone,
        company: v.data.company || null,
        industry: v.data.industry,
        goal: v.data.goal,
        challenges: v.data.challenges,
        timeline: v.data.timeline,
        proposal_content: JSON.stringify(aiProposal),
        status: "generated",
      });

      setBusy(false);

      if (insertError) {
        toast.error(insertError.message);
        setStep(1);
        return;
      }

      // Send email
      try {
        await sendProposalEmail(v.data, aiProposal);
      } catch {
        console.error("[v0] Email send failed, but proposal was saved");
      }

      setProposalData(aiProposal);
      setStep(3); // Complete step

      toast.success("Proposal generated! Check your email for the details.");
    } catch (error: any) {
      setBusy(false);
      setStep(1);
      toast.error(error.message || "Failed to generate proposal. Please try again.");
    }
  };

  const generateAIProposal = (data: any) => {
    return {
      company: data.company || data.name,
      industry: data.industry,
      generatedAt: new Date().toISOString(),
      sections: [
        {
          title: "Executive Summary",
          content: `We understand ${data.company || data.name} is looking to ${data.goal}. Based on your ${data.industry} industry and current challenges, we've developed a comprehensive strategy.`,
        },
        {
          title: "Situation Analysis",
          content: `Your Business: Operating in the ${data.industry} space with focus on ${data.goal}.
          
Current Challenges: ${data.challenges}

Market Opportunity: Companies in your space that implement AI-powered automation see 40-60% increase in efficiency.`,
        },
        {
          title: "Proposed Strategy",
          content: `1. **Lead Generation System** - Automated funnel to capture and nurture leads
2. **AI-Powered Automation** - Streamline operations and reduce manual work
3. **Analytics & Optimization** - Real-time reporting and continuous improvement
4. **Team Training** - Ensure your team can manage and optimize the system`,
        },
        {
          title: "Expected Outcomes (${data.timeline})",
          content: `• 35-50% increase in qualified leads
• 25-40% reduction in manual work hours
• 20-30% improvement in conversion rates
• Full system documentation and team training
• Ongoing optimization support`,
        },
        {
          title: "Investment & Timeline",
          content: `Based on your needs, typical investment ranges from PKR 150,000 - 500,000.
Timeline: ${data.timeline}

We can discuss flexible payment options based on your budget.`,
        },
        {
          title: "Next Steps",
          content: `1. Schedule a strategy call to discuss the proposal details
2. Finalize scope and timeline
3. Begin implementation with weekly progress updates
4. Regular optimization and reporting`,
        },
      ],
    };
  };

  const sendProposalEmail = async (data: any, proposal: any) => {
    // In a real scenario, this would call an API to send email
    // For now, we just log it
    console.log("[v0] Sending proposal email to:", data.email, proposal);
  };

  // Step 1: Form
  if (step === 1) {
    return (
      <PageLayout
        title="Custom Proposal Generator — AM Enterprises"
        description="Get a personalized business proposal generated with AI insights. Answer a few questions and we'll create a strategy for you."
        canonical="/proposal"
      >
        <PageHero
          title="Get Your Custom Proposal"
          subtitle="AI-powered strategy tailored to your business. Generated in minutes."
        />

        <section className="py-12 md:py-20">
          <div className="container mx-auto max-w-5xl px-4">
            {/* Process Steps */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {steps.map((s) => (
                  <Card key={s.number} className="p-6">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center mb-4">
                      {s.number}
                    </div>
                    <h3 className="font-bold mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.description}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Form */}
            <Card className="p-6 md:p-10">
              <form onSubmit={onSubmit} className="space-y-6">
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
                      placeholder="Company Name (Optional)"
                      maxLength={100}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-bold mb-4 text-lg">Business Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Industry</label>
                      <select
                        name="industry"
                        required
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select your industry</option>
                        {industries.map((ind) => (
                          <option key={ind} value={ind}>
                            {ind}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">What&apos;s your main goal?</label>
                      <Input
                        name="goal"
                        required
                        placeholder="e.g., Increase sales by 50%, automate lead generation, improve customer retention"
                        maxLength={500}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">What are your main challenges?</label>
                      <Textarea
                        name="challenges"
                        required
                        placeholder="Describe your current challenges, pain points, or obstacles you're facing..."
                        rows={4}
                        maxLength={1000}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Timeline</label>
                      <select
                        name="timeline"
                        required
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">When do you need this?</option>
                        {timelines.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
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
                  <Zap className="w-4 h-4 mr-2" />
                  {busy ? "Generating..." : "Generate Proposal"}
                </Button>
              </form>
            </Card>
          </div>
        </section>
      </PageLayout>
    );
  }

  // Step 2: Loading
  if (step === 2) {
    return (
      <PageLayout
        title="Generating Your Proposal..."
        description="Please wait while we generate your custom proposal."
        canonical="/proposal"
      >
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="mb-6">
              <div className="inline-block relative">
                <Zap className="w-16 h-16 text-primary animate-pulse" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Generating Your Proposal</h2>
            <p className="text-muted-foreground mb-6">
              Our AI is analyzing your business and creating a personalized strategy...
            </p>
            <div className="w-full bg-border rounded-full h-2">
              <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: "65%" }} />
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  // Step 3: Complete
  return (
    <PageLayout
      title="Your Proposal is Ready!"
      description="Your custom proposal has been generated and sent to your email."
      canonical="/proposal"
    >
      <PageHero
        title="🎉 Your Proposal is Ready!"
        subtitle="Check your email for the complete strategy document."
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <Card className="p-6 md:p-10 mb-8 border-green-200 bg-green-50/50 dark:bg-green-950/20">
            <div className="flex gap-4 items-start">
              <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-lg font-bold text-green-900 dark:text-green-100 mb-2">
                  Proposal Generated Successfully!
                </h2>
                <p className="text-green-800 dark:text-green-200">
                  We've sent a detailed proposal to <strong>{formData?.email}</strong>. Check your inbox (and spam folder just in case).
                </p>
              </div>
            </div>
          </Card>

          {/* Proposal Preview */}
          {proposalData && (
            <Card className="p-6 md:p-10 mb-8">
              <div className="mb-6">
                <h3 className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Proposal Preview
                </h3>
                <h2 className="text-2xl font-bold">{proposalData.company} Growth Strategy</h2>
              </div>

              <div className="space-y-6">
                {proposalData.sections.map((section: any, i: number) => (
                  <div key={i}>
                    <h3 className="text-lg font-bold mb-3">{section.title}</h3>
                    <p className="text-muted-foreground whitespace-pre-line">{section.content}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Next Steps */}
          <Card className="p-6 md:p-10 bg-primary/5">
            <h3 className="text-lg font-bold mb-4">What&apos;s Next?</h3>
            <ol className="space-y-3">
              <li className="flex gap-3">
                <span className="font-bold text-primary">1.</span>
                <span>Review the proposal and ask any questions</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">2.</span>
                <span>Schedule a call to discuss the strategy</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">3.</span>
                <span>Agree on timeline and investment</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">4.</span>
                <span>Begin implementation with our team</span>
              </li>
            </ol>
          </Card>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild variant="hero" size="lg">
              <a href="/booking">Schedule Strategy Call</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/contact">Send Questions</a>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
