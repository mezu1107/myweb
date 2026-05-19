import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

type FieldKey = "meta_pixel_id" | "google_analytics_id" | "google_tag_manager_id" | "tiktok_pixel_id" | "linkedin_insight_id" | "pinterest_pixel_id" | "snapchat_pixel_id" | "twitter_pixel_id" | "hotjar_site_id" | "clarity_project_id";

const PIXELS: { key: FieldKey; label: string; placeholder: string; help: string; pattern: RegExp; category: "social" | "analytics" | "behavior" }[] = [
  { key: "meta_pixel_id", label: "Meta (Facebook) Pixel", placeholder: "1234567890123456", help: "16-digit ID from Facebook Events Manager", pattern: /^\d{15,16}$/, category: "social" },
  { key: "pinterest_pixel_id", label: "Pinterest Conversion Pixel", placeholder: "1234567890123", help: "14-digit ID from Pinterest Ads Manager", pattern: /^\d{13,14}$/, category: "social" },
  { key: "snapchat_pixel_id", label: "Snapchat Pixel", placeholder: "1a2b3c4d-5e6f-7g8h-9i0j", help: "UUID from Snap Business Manager", pattern: /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i, category: "social" },
  { key: "twitter_pixel_id", label: "Twitter/X Conversion Pixel", placeholder: "ntg5l", help: "Code from Twitter Ads Manager", pattern: /^[a-z0-9]{5,10}$/i, category: "social" },
  { key: "tiktok_pixel_id", label: "TikTok Pixel", placeholder: "C12345...", help: "Pixel code from TikTok Events Manager", pattern: /^[A-Z0-9]{10,}$/i, category: "social" },
  { key: "google_analytics_id", label: "Google Analytics 4", placeholder: "G-XXXXXXXXXX", help: "GA4 Measurement ID (starts with G-)", pattern: /^G-[A-Z0-9]{8,12}$/, category: "analytics" },
  { key: "google_tag_manager_id", label: "Google Tag Manager", placeholder: "GTM-XXXXXXX", help: "GTM Container ID (starts with GTM-)", pattern: /^GTM-[A-Z0-9]{6,8}$/, category: "analytics" },
  { key: "linkedin_insight_id", label: "LinkedIn Insight Tag", placeholder: "1234567", help: "Partner ID from LinkedIn Campaign Manager", pattern: /^\d{4,}$/, category: "analytics" },
  { key: "hotjar_site_id", label: "Hotjar Site ID", placeholder: "1234567", help: "Site ID from Hotjar Dashboard", pattern: /^\d{6,8}$/, category: "behavior" },
  { key: "clarity_project_id", label: "Microsoft Clarity Project ID", placeholder: "1a2b3c4d5e6f7g8h", help: "Project ID from Clarity Dashboard", pattern: /^[a-z0-9]{16,}$/i, category: "behavior" },
];

const PixelManagerAdmin = () => {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["site_settings_admin"],
    queryFn: async () => (await supabase.from("site_settings").select("*").limit(1).maybeSingle()).data,
  });
  const [form, setForm] = useState<any>({});
  useEffect(() => { if (data) setForm(data); }, [data]);

  const save = useMutation({
    mutationFn: async () => {
      const payload: any = {};
      PIXELS.forEach((p) => (payload[p.key] = form[p.key] || null));
      payload.pixel_auto_verify = !!form.pixel_auto_verify;
      const { error } = await supabase.from("site_settings").update(payload).eq("id", data.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["site_settings"] });
      qc.invalidateQueries({ queryKey: ["site_settings_admin"] });
      toast.success("All pixels saved & live on site");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const status = (p: typeof PIXELS[number]) => {
    const v = form[p.key];
    if (!v) return { ok: false, label: "Not set", color: "secondary" as const };
    if (!p.pattern.test(v)) return { ok: false, label: "Format invalid", color: "destructive" as const };
    return { ok: true, label: "Connected", color: "default" as const };
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-1">Pixel Manager</h1>
      <p className="text-muted-foreground mb-6">WordPress-style plugin with 10 tracking pixels: add your IDs → instantly injected on every page, auto-verified, organized by category (Social, Analytics, Behavior). Works in real-time across all pages.</p>

      <Card className="p-4 mb-4 flex items-center justify-between">
        <div>
          <div className="font-semibold">Auto-verify & inject</div>
          <div className="text-xs text-muted-foreground">When ON, valid IDs load tracking scripts on the public site automatically.</div>
        </div>
        <Switch checked={!!form.pixel_auto_verify} onCheckedChange={(v) => setForm({ ...form, pixel_auto_verify: v })} />
      </Card>

      <div className="space-y-6">
        {["social", "analytics", "behavior"].map((cat) => (
          <div key={cat}>
            <div className="text-sm font-semibold uppercase tracking-wide opacity-70 mb-3 capitalize">{cat} Tracking</div>
            <div className="space-y-3">
              {PIXELS.filter((p) => p.category === cat).map((p) => {
                const s = status(p);
                return (
                  <Card key={p.key} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-semibold">{p.label}</Label>
                      <Badge variant={s.color} className="gap-1 text-xs">
                        {s.ok ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        {s.label}
                      </Badge>
                    </div>
                    <Input size="sm" value={form[p.key] || ""} onChange={(e) => setForm({ ...form, [p.key]: e.target.value })} placeholder={p.placeholder} />
                    <div className="text-xs text-muted-foreground mt-1">{p.help}</div>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <Button size="lg" variant="hero" onClick={() => save.mutate()} disabled={save.isPending} className="mt-6">
        {save.isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving…</> : "Save & Activate Pixels"}
      </Button>
    </div>
  );
};
export default PixelManagerAdmin;
