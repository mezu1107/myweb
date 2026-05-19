import { motion } from "framer-motion";
import {
  Workflow,
  MousePointerClick,
  MessageSquare,
  Mail,
  PhoneCall,
  Bot,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Database,
  Send,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Step = {
  icon: any;
  title: string;
  desc: string;
  color: string;
};

const steps: Step[] = [
  {
    icon: MousePointerClick,
    title: "Lead Capture",
    desc: "User fills form, clicks ad or lands on your page. We capture their data instantly.",
    color: "text-blue-500",
  },
  {
    icon: Bot,
    title: "AI Lead Qualification",
    desc: "AI filters low-quality leads and scores high-intent prospects automatically.",
    color: "text-purple-500",
  },
  {
    icon: MessageSquare,
    title: "Instant Engagement",
    desc: "Chatbot or WhatsApp bot responds within seconds to keep lead warm.",
    color: "text-green-500",
  },
  {
    icon: Mail,
    title: "Email Nurture Sequence",
    desc: "Automated emails educate, build trust, and push toward conversion.",
    color: "text-yellow-500",
  },
  {
    icon: PhoneCall,
    title: "Sales Notification",
    desc: "Hot leads are instantly sent to your sales team or CRM.",
    color: "text-pink-500",
  },
  {
    icon: CheckCircle2,
    title: "Conversion Tracking",
    desc: "Every action is tracked so you know exactly what’s working.",
    color: "text-emerald-500",
  },
];

export const WorkflowAutomation = () => {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 gradient-hero opacity-40" />

      <div className="relative container mx-auto">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="pill-tag mb-4 inline-flex items-center gap-2">
            <Workflow className="w-4 h-4" />
            AI Workflow Automation
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            Turn Visitors Into Customers<br />
            With <span className="text-gradient">AI Automation System</span>
          </h2>

          <p className="text-muted-foreground mt-4 text-sm md:text-base">
            A complete end-to-end system that captures leads, qualifies them, nurtures them,
            and converts them into paying customers — automatically.
          </p>
        </div>

        {/* FLOW GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 relative overflow-hidden group hover:shadow-glow transition-all"
            >
              {/* step number */}
              <div className="absolute top-4 right-4 text-xs text-muted-foreground">
                0{i + 1}
              </div>

              {/* icon */}
              <div className="w-12 h-12 rounded-xl icon-3d flex items-center justify-center mb-4">
                <step.icon className={`w-5 h-5 ${step.color}`} />
              </div>

              {/* content */}
              <h3 className="font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.desc}
              </p>

              {/* hover glow line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </motion.div>
          ))}
        </div>

        {/* FLOW ARROW SECTION */}
        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-2 text-muted-foreground text-sm mb-6">
            <ArrowRight className="w-4 h-4" />
            Fully Automated Marketing Funnel
          </div>

          <div className="glass-card rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <Database className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h4 className="font-bold">Data Collection</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Every click, lead & action tracked
                </p>
              </div>

              <div>
                <Bot className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h4 className="font-bold">AI Processing</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  AI scores & filters leads
                </p>
              </div>

              <div>
                <Send className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h4 className="font-bold">Auto Conversion</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Leads sent to sales instantly
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10">
            <Button
              asChild
              size="lg"
              className="gradient-cta text-primary-foreground shadow-glow"
            >
             <button
  onClick={() => {
    const event = new CustomEvent("open-chatbot");
    window.dispatchEvent(event);
  }}
  className="flex items-center gap-2"
>
  <Sparkles className="w-4 h-4" />
  Get This Automation System
</button>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};