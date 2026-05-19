import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, X } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const ServiceComparison = ({ serviceSlug }: { serviceSlug: string }) => {
  const { data: services } = useQuery({
    queryKey: ["services-for-comparison"],
    queryFn: async () => {
      const { data } = await supabase.from("services").select("id, title, slug, features, pricing_tiers").limit(4);
      return data || [];
    },
  });

  const { ref, isVisible } = useScrollAnimation();

  if (!services || services.length < 2) return null;

  const features = Array.from(
    new Set(services.flatMap((s: any) => (s.features || []).map((f: any) => f.title)))
  ) as string[];

  return (
    <section ref={ref} className="py-16">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-4 text-center">Compare Our Services</h2>
        <p className="text-center text-muted-foreground mb-12">Find the perfect plan for your needs</p>

        <div className={`overflow-x-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <table className="w-full">
            <thead>
              <tr className="border-b-2">
                <th className="text-left p-4 font-semibold">Feature</th>
                {services.map((s: any) => (
                  <th key={s.id} className="text-center p-4">
                    <div className="font-semibold">{s.title}</div>
                    <Badge variant="secondary" className="mt-2">${s.pricing_tiers?.[0]?.price || "Custom"}</Badge>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-4 font-medium">{feature}</td>
                  {services.map((service: any) => {
                    const hasFeature = service.features?.some((f: any) => f.title === feature);
                    return (
                      <td key={service.id} className="text-center p-4">
                        {hasFeature ? (
                          <CheckCircle2 className="w-5 h-5 text-accent mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground mx-auto" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
