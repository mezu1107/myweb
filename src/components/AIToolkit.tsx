import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Wand2,
  Gauge,
  Loader2,
  Copy,
  Check,
  Bot,
  Workflow,
  Search,
  BarChart3,
  Cpu,
  MessageSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Tool = "ad-copy" | "ad-optimizer";

const aiFeatures = [
  {
    title: "AI Chatbots",
    description: "24/7 AI assistants that qualify leads and answer customer questions instantly.",
    icon: MessageSquare,
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    title: "Workflow Automation",
    description: "Automate CRM pipelines, follow-ups, emails, and repetitive business tasks.",
    icon: Workflow,
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "AI SEO Optimization",
    description: "AI-powered keyword research, audits, and ranking optimization systems.",
    icon: Search,
    gradient: "from-emerald-500/20 to-green-500/20",
  },
  {
    title: "AI Analytics",
    description: "Smart dashboards with actionable insights and performance forecasting.",
    icon: BarChart3,
    gradient: "from-orange-500/20 to-yellow-500/20",
  },
  {
    title: "AI Content Generation",
    description: "Generate ad copy, captions, blogs, and high-converting marketing content.",
    icon: Sparkles,
    gradient: "from-fuchsia-500/20 to-rose-500/20",
  },
  {
    title: "AI SaaS Integrations",
    description: "Integrate OpenAI, Claude, Gemini, and custom AI workflows into your business.",
    icon: Cpu,
    gradient: "from-indigo-500/20 to-violet-500/20",
  },
];

export const AIToolkit = () => {
  const [tool, setTool] = useState<Tool>("ad-copy");
  const [busy, setBusy] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  // shared lead
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  // ad-copy
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [offer, setOffer] = useState("");
  const [platform, setPlatform] = useState("Google");

  // optimizer
  const [campaignSummary, setCampaignSummary] = useState("");
  const [metrics, setMetrics] = useState("");

  const run = async () => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid work email.");
      return;
    }

    if (tool === "ad-copy" && (!product || !audience)) {
      toast.error("Please fill required fields.");
      return;
    }

    if (tool === "ad-optimizer" && !campaignSummary) {
      toast.error("Please describe your campaign.");
      return;
    }

    setBusy(true);
    setOutput("");

    try {
      const { data, error } = await supabase.functions.invoke("ai-marketing-tools", {
        body: {
          tool,
          email,
          name,
          product,
          audience,
          offer,
          platform,
          campaign_summary: campaignSummary,
          metrics,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setOutput(data.message || "");

      toast.success("AI result generated successfully.");
    } catch (e: any) {
      toast.error(e.message || "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  const copy = async () => {
    if (!output) return;

    await navigator.clipboard.writeText(output);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1600);
  };

  return (
    <section
      id="ai-toolkit"
      className="relative overflow-hidden py-20 lg:py-28"
    >
      {/* Background */}
      <div className="absolute inset-0 gradient-hero opacity-40" aria-hidden />
      <div className="absolute inset-0 grid-bg opacity-20" aria-hidden />

      <div className="relative container mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="pill-tag mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Free AI Toolkit
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            AI Marketing Tools<br />
            Built For <span className="text-gradient text-3d">Modern Businesses</span>
          </h2>

          <p className="text-muted-foreground mt-5 text-sm md:text-base leading-relaxed">
            Generate high-converting ad copy, optimize campaigns, automate workflows,
            and scale faster using our AI-powered systems.
          </p>
        </div>

        {/* AI Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {aiFeatures.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group"
              >
                <div className="glass-card rounded-2xl p-6 h-full card-hover-glow relative overflow-hidden border border-border/50">
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${feature.gradient}`}
                  />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl icon-3d flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>

                    <h3 className="text-lg font-bold mb-2">
                      {feature.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Main Toolkit */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto glass-card rounded-3xl p-5 md:p-8 shadow-elegant border border-border/50"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl gradient-cta flex items-center justify-center shadow-glow">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-bold">
                AI Marketing Assistant
              </h3>

              <p className="text-sm text-muted-foreground">
                Generate ads and optimize campaigns instantly.
              </p>
            </div>
          </div>

          <Tabs value={tool} onValueChange={(v) => setTool(v as Tool)}>
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="ad-copy" className="gap-2">
                <Wand2 className="w-4 h-4" />
                Ad Copy Generator
              </TabsTrigger>

              <TabsTrigger value="ad-optimizer" className="gap-2">
                <Gauge className="w-4 h-4" />
                Campaign Optimizer
              </TabsTrigger>
            </TabsList>

            {/* Ad Copy */}
            <TabsContent value="ad-copy" className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <Label>Platform</Label>

                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="mt-2 w-full h-11 rounded-xl border border-border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option>Google</option>
                    <option>Meta</option>
                    <option>LinkedIn</option>
                    <option>TikTok</option>
                  </select>
                </div>

                <div>
                  <Label>Offer / CTA</Label>

                  <Input
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
                    placeholder="Free strategy call"
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label>Product or Service *</Label>

                <Input
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder="SEO services for dentists"
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Target Audience *</Label>

                <Input
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="Business owners in USA & Canada"
                  className="mt-2"
                />
              </div>
            </TabsContent>

            {/* Optimizer */}
            <TabsContent value="ad-optimizer" className="space-y-5">
              <div>
                <Label>Campaign Summary *</Label>

                <Textarea
                  value={campaignSummary}
                  onChange={(e) => setCampaignSummary(e.target.value)}
                  placeholder="Describe your campaign..."
                  rows={4}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Current Metrics</Label>

                <Input
                  value={metrics}
                  onChange={(e) => setMetrics(e.target.value)}
                  placeholder="CTR 3.2%, CPL $22..."
                  className="mt-2"
                />
              </div>
            </TabsContent>

            {/* Lead Form */}
            <div className="grid md:grid-cols-2 gap-5 mt-8 pt-8 border-t border-border">
              <div>
                <Label>Your Name</Label>

                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Smith"
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Work Email *</Label>

                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@company.com"
                  className="mt-2"
                />
              </div>
            </div>

            {/* CTA */}
            <Button
              onClick={run}
              disabled={busy}
              size="lg"
              className="gradient-cta text-primary-foreground shadow-glow w-full mt-7 h-12 text-base font-semibold"
            >
              {busy ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate With AI
                </>
              )}
            </Button>

            {/* Output */}
            {output && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 rounded-2xl border border-border bg-card/60 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    AI Result
                  </span>

                  <Button size="sm" variant="ghost" onClick={copy}>
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>

                <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans text-foreground">
                  {output}
                </pre>
              </motion.div>
            )}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};