/**
 * GLOBAL SITE CONFIGURATION
 * Single source of truth for all contact info, links, and tracking
 * Update here and it reflects everywhere
 */

export const siteConfig = {
  // Brand
  brand: {
    name: "AM ENTERPRISES",
    tagline: ".TECH",
    description: "AI-powered marketing systems that help businesses in USA & Canada generate leads, scale ads, and automate growth.",
  },

  // Contact Information
  contact: {
    primaryEmail: "info@amenterprises.tech",
    secondaryEmail: "hello@amenterprises.tech",
    primaryPhone: "+92 3173712950",
    secondaryPhone: "+1 (302) 302-5609",
    ukPhone: "+447717229638",
    offices: [
      {
        name: "Islamabad HQ",
        address: "Rawat Technology Park, Islamabad, Pakistan",
      },
      {
        name: "USA & Canada",
        address: "North America",
      },
    ],
  },

  // Social Media
  social: {
    facebook: "https://facebook.com/amenterprises",
    instagram: "https://instagram.com/amenterprises",
    linkedin: "https://linkedin.com/company/amenterprises",
    twitter: "https://twitter.com/amenterprises",
    youtube: "https://youtube.com/@amenterprises",
    whatsapp: "https://wa.me/923173712950",
  },

  // Tracking Pixels & Analytics
  pixels: {
    facebook: {
      id: "YOUR_FACEBOOK_PIXEL_ID",
      enabled: false,
    },
    google: {
      id: "G-XXXXXXXXXX",
      enabled: false,
    },
    pinterest: {
      id: "YOUR_PINTEREST_TAG_ID",
      enabled: false,
    },
    tiktok: {
      id: "YOUR_TIKTOK_PIXEL_ID",
      enabled: false,
    },
    hotjar: {
      id: "YOUR_HOTJAR_ID",
      enabled: false,
    },
    microsoft: {
      id: "YOUR_MICROSOFT_CLARITY_ID",
      enabled: false,
    },
  },

  // Navigation
  navigation: {
    main: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "About", href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Blog", href: "/blog" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },

  // CTA Links (each CTA has its own page/form)
  cta: {
    bookNow: "/booking",
    getProposal: "/proposal",
    getQuote: "/quote",
    contact: "/contact",
    callUs: `tel:+923173712950`,
    emailUs: `mailto:info@amenterprises.tech`,
  },

  // URLs
  urls: {
    home: "/",
    services: "/services",
    about: "/about",
    portfolio: "/portfolio",
    blog: "/blog",
    pricing: "/pricing",
    contact: "/contact",
    booking: "/booking",
    proposal: "/proposal",
    quote: "/quote",
    gallery: "/gallery",
    faq: "/faq",
    careers: "/careers",
    testimonials: "/testimonials",
    caseStudies: "/case-studies",
    privacy: "/privacy-policy",
    terms: "/terms",
  },

  // Business Info
  business: {
    description: "AI-powered marketing systems for lead generation and growth automation",
    keywords: "digital marketing, AI automation, lead generation, SEO, Google Ads, social media marketing",
    year: new Date().getFullYear(),
  },
};

/**
 * Helper: Get display-ready email
 * Returns primary email, falls back to secondary if needed
 */
export const getEmail = () => siteConfig.contact.primaryEmail;

/**
 * Helper: Get display-ready phone
 * Returns primary phone, can be customized per region
 */
export const getPhone = (region: "pk" | "us" | "uk" = "pk") => {
  switch (region) {
    case "us":
      return siteConfig.contact.secondaryPhone;
    case "uk":
      return siteConfig.contact.ukPhone;
    default:
      return siteConfig.contact.primaryPhone;
  }
};

/**
 * Helper: Check if pixel is enabled
 */
export const isPixelEnabled = (pixelType: keyof typeof siteConfig.pixels) => {
  return siteConfig.pixels[pixelType].enabled;
};
