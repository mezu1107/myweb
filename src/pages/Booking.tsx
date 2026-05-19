import { PageHero } from "@/components/layout/PageHero";
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { siteConfig, getEmail, getPhone } from "@/config/site";

const bookingSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(1, "Phone is required").max(30),
  service: z.string().trim().min(1, "Service is required").max(100),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
});

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
];

const services = [
  "Digital Marketing Consultation",
  "SEO Strategy Call",
  "Google Ads Audit",
  "Social Media Consultation",
  "Web Development Discussion",
  "E-Commerce Strategy",
  "Branding & Design Consultation",
  "Custom Service",
];

export default function BookingPage() {
  const [busy, setBusy] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Generate available dates (next 30 days, excluding weekends)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const v = bookingSchema.safeParse({
      ...Object.fromEntries(fd),
      date: selectedDate,
      time: selectedTime,
    });

    if (!v.success) {
      toast.error(v.error.issues[0].message);
      return;
    }

    setBusy(true);

    try {
      const appointmentDateTime = new Date(`${v.data.date}T${v.data.time}`);

      const { error } = await supabase.from("appointments").insert({
        name: v.data.name,
        email: v.data.email,
        phone: v.data.phone,
        service: v.data.service,
        appointment_date: v.data.date,
        appointment_time: v.data.time,
        status: "pending",
      });

      setBusy(false);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Booking confirmed! We'll send you a confirmation email shortly.");
      e.currentTarget.reset();
      setSelectedDate("");
      setSelectedTime("");
    } catch (error: any) {
      setBusy(false);
      toast.error(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <PageLayout
      title="Book Free Strategy Call — AM Enterprises"
      description="Schedule a free 30-minute consultation with our team. Choose your preferred date and time."
      canonical="/booking"
    >
      <PageHero
        title="Book Your Free Strategy Call"
        subtitle="Schedule a 30-minute consultation with our team. No obligation, 100% free."
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Form */}
            <Card className="md:col-span-2 p-6 md:p-8">
              <form onSubmit={onSubmit} className="space-y-6">
                {/* Contact Info */}
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Your Information
                  </h3>
                  <div className="space-y-3">
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
                  </div>
                </div>

                {/* Service Selection */}
                <div>
                  <h3 className="font-semibold mb-4">Service Type</h3>
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

                {/* Date & Time */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Select Date
                    </h3>
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Choose a date</option>
                      {availableDates.map((date) => (
                        <option key={date.toISOString()} value={date.toISOString().split("T")[0]}>
                          {date.toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Select Time
                    </h3>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Choose a time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={busy}
                >
                  {busy ? "Confirming..." : "Confirm Booking"}
                </Button>
              </form>
            </Card>

            {/* Sidebar Info */}
            <div className="space-y-4">
              <Card className="p-6 bg-gradient-to-b from-primary/5 to-transparent">
                <h3 className="font-bold mb-3">What to Expect</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="font-bold text-primary">✓</span>
                    <span>30-minute discovery call</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-primary">✓</span>
                    <span>Personalized recommendations</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-primary">✓</span>
                    <span>No sales pitch</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-primary">✓</span>
                    <span>Zoom or Phone call</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold mb-4">Questions?</h3>
                <div className="space-y-3 text-sm">
                  <a
                    href={`tel:${getPhone('pk')}`}
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Phone className="w-4 h-4" />
                    {getPhone('pk')}
                  </a>
                  <a
                    href={`mailto:${getEmail()}`}
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Mail className="w-4 h-4" />
                    {getEmail()}
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
