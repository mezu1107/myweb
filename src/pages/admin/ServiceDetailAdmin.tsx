import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Loader2, Plus, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  long_description: string;
  detailed_content: string;
  meta_description: string;
  meta_keywords: string;
  icon: string;
  cover_image_url: string;
  pricing_model: "fixed" | "tiered" | "custom";
  base_price: number;
  price_currency: string;
  pricing_tiers: any[];
  benefits: any[];
  features: any[];
  tech_stack: string[];
  process_steps: any[];
  why_us_content: any[];
  faqs: any[];
  gallery_images: any[];
  featured_testimonial_id: string;
  related_service_ids: string[];
  sort_order: number;
  is_active: boolean;
}

const ServiceDetailAdmin = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [tab, setTab] = useState("basic");
  const [form, setForm] = useState<Partial<Service>>({});

  const { data: service, isLoading } = useQuery({
    queryKey: ["service", slug],
    queryFn: async () => {
      if (!slug) return null;
      const { data } = await supabase
        .from("services")
        .select("*")
        .eq("slug", slug)
        .single();
      return data as Service;
    },
  });

  useEffect(() => {
    if (service) setForm(service);
  }, [service]);

  const save = useMutation({
    mutationFn: async () => {
      if (!form.id) throw new Error("No service ID");
      const { error } = await supabase
        .from("services")
        .update(form)
        .eq("id", form.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["service", slug] });
      qc.invalidateQueries({ queryKey: ["services"] });
      toast.success("Service updated");
    },
    onError: (e: any) => toast.error(e.message),
  });

  if (isLoading) return <div className="text-center py-12">Loading...</div>;
  if (!service) return <div className="text-center py-12">Service not found</div>;

  const updateArrayField = (field: string, index: number, data: any) => {
    const arr = (form as any)[field] || [];
    arr[index] = { ...arr[index], ...data };
    setForm({ ...form, [field]: arr });
  };

  const removeArrayItem = (field: string, index: number) => {
    const arr = (form as any)[field] || [];
    setForm({ ...form, [field]: arr.filter((_: any, i: number) => i !== index) });
  };

  const addArrayItem = (field: string, item: any) => {
    const arr = (form as any)[field] || [];
    setForm({ ...form, [field]: [...arr, item] });
  };

  return (
    <div className="max-w-5xl">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/services")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{form.title}</h1>
          <p className="text-xs text-muted-foreground">slug: {form.slug}</p>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="mb-6">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="process">Process</TabsTrigger>
          <TabsTrigger value="why_us">Why Us</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="related">Related</TabsTrigger>
        </TabsList>

        {/* Basic Tab */}
        <TabsContent value="basic" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div>
              <Label>Title</Label>
              <Input value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Icon</Label>
                <Input value={form.icon || ""} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="lucide icon name" />
              </div>
              <div>
                <Label>Cover Image URL</Label>
                <Input value={form.cover_image_url || ""} onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })} />
              </div>
            </div>
            <div>
              <Label>Short Description</Label>
              <Textarea value={form.short_description || ""} onChange={(e) => setForm({ ...form, short_description: e.target.value })} />
            </div>
            <div>
              <Label>Full Description</Label>
              <Textarea value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={5} />
            </div>
            <div>
              <Label>Detailed Content (HTML)</Label>
              <Textarea value={form.detailed_content || ""} onChange={(e) => setForm({ ...form, detailed_content: e.target.value })} rows={6} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Sort Order</Label>
                <Input type="number" value={form.sort_order || 0} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) })} />
              </div>
              <div>
                <Label>Active</Label>
                <select className="w-full border rounded px-2 py-2" value={form.is_active ? "true" : "false"} onChange={(e) => setForm({ ...form, is_active: e.target.value === "true" })}>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* SEO Tab */}
        <TabsContent value="seo" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div>
              <Label>Meta Description</Label>
              <Textarea value={form.meta_description || ""} onChange={(e) => setForm({ ...form, meta_description: e.target.value })} placeholder="155-160 characters" />
            </div>
            <div>
              <Label>Meta Keywords</Label>
              <Input value={form.meta_keywords || ""} onChange={(e) => setForm({ ...form, meta_keywords: e.target.value })} placeholder="comma, separated, keywords" />
            </div>
          </Card>
        </TabsContent>

        {/* Pricing Tab */}
        <TabsContent value="pricing" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Pricing Model</Label>
                <select className="w-full border rounded px-2 py-2" value={form.pricing_model || "fixed"} onChange={(e) => setForm({ ...form, pricing_model: e.target.value as any })}>
                  <option value="fixed">Fixed</option>
                  <option value="tiered">Tiered</option>
                  <option value="custom">Custom Quote</option>
                </select>
              </div>
              <div>
                <Label>Base Price</Label>
                <Input type="number" value={form.base_price || 0} onChange={(e) => setForm({ ...form, base_price: parseFloat(e.target.value) })} />
              </div>
              <div>
                <Label>Currency</Label>
                <Input value={form.price_currency || "USD"} onChange={(e) => setForm({ ...form, price_currency: e.target.value })} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <Label>Pricing Tiers</Label>
                <Button size="sm" onClick={() => addArrayItem("pricing_tiers", { name: "New Tier", price: 0, features: [] })}>
                  <Plus className="w-4 h-4 mr-1" /> Add Tier
                </Button>
              </div>
              <div className="space-y-3">
                {(form.pricing_tiers || []).map((tier, i) => (
                  <Card key={i} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{tier.name || "Tier"}</h4>
                      <Button variant="ghost" size="sm" onClick={() => removeArrayItem("pricing_tiers", i)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Input placeholder="Tier name" value={tier.name || ""} onChange={(e) => updateArrayField("pricing_tiers", i, { name: e.target.value })} />
                      <Input type="number" placeholder="Price" value={tier.price || 0} onChange={(e) => updateArrayField("pricing_tiers", i, { price: parseFloat(e.target.value) })} />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Benefits Tab */}
        <TabsContent value="benefits" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between mb-3">
              <Label>Benefits</Label>
              <Button size="sm" onClick={() => addArrayItem("benefits", { title: "New Benefit", description: "", icon: "Check" })}>
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-3">
              {(form.benefits || []).map((benefit, i) => (
                <Card key={i} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{benefit.title}</h4>
                    <Button variant="ghost" size="sm" onClick={() => removeArrayItem("benefits", i)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <Input placeholder="Title" value={benefit.title || ""} onChange={(e) => updateArrayField("benefits", i, { title: e.target.value })} />
                    <Input placeholder="Icon" value={benefit.icon || ""} onChange={(e) => updateArrayField("benefits", i, { icon: e.target.value })} />
                    <Input placeholder="Description" value={benefit.description || ""} onChange={(e) => updateArrayField("benefits", i, { description: e.target.value })} />
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Features Tab */}
        <TabsContent value="features" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between mb-3">
              <Label>Features</Label>
              <Button size="sm" onClick={() => addArrayItem("features", { title: "Feature", description: "" })}>
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-3">
              {(form.features || []).map((feature, i) => (
                <Card key={i} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{feature.title}</h4>
                    <Button variant="ghost" size="sm" onClick={() => removeArrayItem("features", i)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Input placeholder="Title" value={feature.title || ""} onChange={(e) => updateArrayField("features", i, { title: e.target.value })} className="mb-2" />
                  <Textarea placeholder="Description" value={feature.description || ""} onChange={(e) => updateArrayField("features", i, { description: e.target.value })} rows={2} />
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Process Tab */}
        <TabsContent value="process" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between mb-3">
              <Label>Process Steps</Label>
              <Button size="sm" onClick={() => addArrayItem("process_steps", { step: (form.process_steps || []).length + 1, title: "Step", description: "" })}>
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-3">
              {(form.process_steps || []).map((step, i) => (
                <Card key={i} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="default">Step {step.step}</Badge>
                    <Button variant="ghost" size="sm" onClick={() => removeArrayItem("process_steps", i)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Input placeholder="Title" value={step.title || ""} onChange={(e) => updateArrayField("process_steps", i, { title: e.target.value })} className="mb-2" />
                  <Textarea placeholder="Description" value={step.description || ""} onChange={(e) => updateArrayField("process_steps", i, { description: e.target.value })} rows={2} />
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Why Us Tab */}
        <TabsContent value="why_us" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between mb-3">
              <Label>Why Choose Us</Label>
              <Button size="sm" onClick={() => addArrayItem("why_us_content", { title: "Reason", value: "" })}>
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-3">
              {(form.why_us_content || []).map((item, i) => (
                <Card key={i} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{item.title}</h4>
                    <Button variant="ghost" size="sm" onClick={() => removeArrayItem("why_us_content", i)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Input placeholder="Title" value={item.title || ""} onChange={(e) => updateArrayField("why_us_content", i, { title: e.target.value })} className="mb-2" />
                  <Textarea placeholder="Value/Description" value={item.value || ""} onChange={(e) => updateArrayField("why_us_content", i, { value: e.target.value })} rows={2} />
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* FAQs Tab */}
        <TabsContent value="faqs" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between mb-3">
              <Label>Frequently Asked Questions</Label>
              <Button size="sm" onClick={() => addArrayItem("faqs", { question: "Q", answer: "" })}>
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-3">
              {(form.faqs || []).map((faq, i) => (
                <Card key={i} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-sm line-clamp-1">{faq.question}</h4>
                    <Button variant="ghost" size="sm" onClick={() => removeArrayItem("faqs", i)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Input placeholder="Question" value={faq.question || ""} onChange={(e) => updateArrayField("faqs", i, { question: e.target.value })} className="mb-2" />
                  <Textarea placeholder="Answer" value={faq.answer || ""} onChange={(e) => updateArrayField("faqs", i, { answer: e.target.value })} rows={2} />
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Gallery Tab */}
        <TabsContent value="gallery" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between mb-3">
              <Label>Gallery Images</Label>
              <Button size="sm" onClick={() => addArrayItem("gallery_images", { url: "", caption: "" })}>
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-3">
              {(form.gallery_images || []).map((img, i) => (
                <Card key={i} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-sm">Image {i + 1}</h4>
                    <Button variant="ghost" size="sm" onClick={() => removeArrayItem("gallery_images", i)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Input placeholder="Image URL" value={img.url || ""} onChange={(e) => updateArrayField("gallery_images", i, { url: e.target.value })} className="mb-2" />
                  <Input placeholder="Caption" value={img.caption || ""} onChange={(e) => updateArrayField("gallery_images", i, { caption: e.target.value })} />
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Related Tab */}
        <TabsContent value="related" className="space-y-4">
          <Card className="p-6 space-y-4">
            <Label>Tech Stack</Label>
            <Textarea
              value={(form.tech_stack || []).join("\n")}
              onChange={(e) => setForm({ ...form, tech_stack: e.target.value.split("\n").filter((s) => s.trim()) })}
              placeholder="One per line (e.g., React, Node.js, PostgreSQL)"
              rows={4}
            />
          </Card>
        </TabsContent>
      </Tabs>

      <Button size="lg" onClick={() => save.mutate()} disabled={save.isPending} className="w-full">
        {save.isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving…</> : <><Save className="w-4 h-4 mr-2" /> Save Service</>}
      </Button>
    </div>
  );
};

export default ServiceDetailAdmin;
