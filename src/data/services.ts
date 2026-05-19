import {
  Globe,
  Search,
  Megaphone,
  ShoppingCart,
  Smartphone,
  Palette,
  BarChart3,
  Code2,
  Bot,
  MonitorSmartphone,
  ClipboardCheck,
  PenTool,
  Rocket,
  LineChart,
  ShieldCheck,
  Users,
  Database,
  LayoutDashboard,
  Settings,
  Zap,
} from "lucide-react";

export interface ServiceData {
  slug: string;
  title: string;
  short: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  canonical: string;
  pricing: string;

  benefits: string[];

  process: {
    step: string;
    desc: string;
    icon: any;
  }[];

  faqs: {
    q: string;
    a: string;
  }[];
}

export const services: ServiceData[] = [
  {
    slug: "custom-web-development",
    title: "Custom Web Development",
    short:
      "Modern high-performance websites and web applications built for growth.",

    metaTitle:
      "Custom Web Development Services Pakistan | AM Enterprises",

    metaDescription:
      "Professional custom web development services using Next.js, React, and modern technologies for scalable and SEO-friendly business websites.",

    canonical:
      "https://amenterprises.tech/services/custom-web-development",

    description:
      "AM Enterprises provides professional custom web development services for startups, businesses, and enterprises looking to establish a powerful online presence. We build scalable, fast, secure, and SEO-optimized websites using modern technologies like Next.js and React. Our solutions focus on performance, user experience, responsiveness, and conversion optimization to help businesses grow digitally. Whether you need a corporate website, portal, SaaS platform, or custom dashboard, we create tailored solutions that align with your business goals. Every project is designed with modern UI/UX principles, speed optimization, and future scalability in mind.",

    pricing: "Starting from PKR 120,000",

    benefits: [
      "SEO-friendly architecture",
      "Lightning-fast performance",
      "Modern responsive design",
      "Secure scalable codebase",
      "Custom business solutions",
      "Optimized user experience",
    ],

    process: [
      {
        step: "Requirement Analysis",
        desc: "We understand your business goals and technical requirements.",
        icon: ClipboardCheck,
      },
      {
        step: "UI/UX Planning",
        desc: "Modern user-focused layouts and wireframes are created.",
        icon: PenTool,
      },
      {
        step: "Development",
        desc: "We build scalable applications using modern frameworks.",
        icon: Code2,
      },
      {
        step: "Testing & Optimization",
        desc: "Complete speed, responsiveness, and security testing.",
        icon: ShieldCheck,
      },
      {
        step: "Launch & Support",
        desc: "Professional deployment and long-term support services.",
        icon: Rocket,
      },
    ],

    faqs: [
      {
        q: "Which technologies do you use?",
        a: "We use Next.js, React, TypeScript, Node.js, and Tailwind CSS.",
      },
      {
        q: "Will my website be mobile responsive?",
        a: "Yes, every website is fully responsive across all devices.",
      },
      {
        q: "Do you provide SEO optimization?",
        a: "Yes, all websites follow technical SEO best practices.",
      },
      {
        q: "Can you redesign existing websites?",
        a: "Yes, we modernize outdated websites professionally.",
      },
      {
        q: "Do you provide maintenance services?",
        a: "Yes, we offer ongoing maintenance and support packages.",
      },
    ],
  },

  {
    slug: "wordpress-development",
    title: "WordPress Development",
    short:
      "Professional WordPress websites designed for performance and scalability.",

    metaTitle: "WordPress Development Services | AM Enterprises",

    metaDescription:
      "Custom WordPress websites with SEO optimization, responsive design, WooCommerce integration, and high-speed performance.",

    canonical:
      "https://amenterprises.tech/services/wordpress-development",

    description:
      "Our WordPress development services help businesses create professional and easy-to-manage websites with modern designs and optimized performance. We develop custom WordPress websites, landing pages, WooCommerce stores, and business portals tailored to your requirements. Every project is built with speed optimization, responsive design, SEO structure, and secure coding standards. Whether you need a simple business website or a powerful content platform, AM Enterprises delivers scalable WordPress solutions that support long-term business growth and digital visibility.",

    pricing: "Starting from PKR 25,000",

    benefits: [
      "Easy content management",
      "Custom WordPress themes",
      "WooCommerce integration",
      "SEO optimization",
      "Fast loading speed",
      "Secure website setup",
    ],

    process: [
      {
        step: "Consultation",
        desc: "Understanding business requirements and project goals.",
        icon: Users,
      },
      {
        step: "Design",
        desc: "Creating responsive and modern WordPress layouts.",
        icon: Palette,
      },
      {
        step: "Development",
        desc: "Building custom WordPress functionality and pages.",
        icon: Globe,
      },
      {
        step: "Optimization",
        desc: "Improving speed, SEO, and website security.",
        icon: Zap,
      },
      {
        step: "Deployment",
        desc: "Launching the website professionally with testing.",
        icon: Rocket,
      },
    ],

    faqs: [
      {
        q: "Can I manage the website myself?",
        a: "Yes, WordPress allows easy content management.",
      },
      {
        q: "Do you provide WooCommerce stores?",
        a: "Yes, we build professional WooCommerce stores.",
      },
      {
        q: "Will the website be SEO optimized?",
        a: "Yes, we implement technical SEO best practices.",
      },
      {
        q: "Do you create custom themes?",
        a: "Yes, we create fully custom WordPress themes.",
      },
      {
        q: "Do you provide maintenance support?",
        a: "Yes, we offer updates and long-term support.",
      },
    ],
  },

  {
    slug: "seo-services",
    title: "SEO Services",
    short:
      "Rank higher on Google and generate long-term organic traffic.",

    metaTitle: "Professional SEO Services Pakistan | AM Enterprises",

    metaDescription:
      "White-hat SEO services including technical SEO, keyword research, on-page optimization, and authority building.",

    canonical: "https://amenterprises.tech/services/seo-services",

    description:
      "AM Enterprises provides result-driven SEO services designed to improve your search engine rankings, organic visibility, and long-term business growth. Our SEO experts focus on technical SEO, content optimization, keyword strategy, and authority building to help businesses dominate search results. We use ethical white-hat techniques, performance analysis, and data-driven strategies to increase traffic and conversions. From local SEO to enterprise-level optimization, our solutions are tailored to your business goals and industry competition.",

    pricing: "Starting from PKR 40,000/month",

    benefits: [
      "Higher Google rankings",
      "Long-term organic traffic",
      "Improved website authority",
      "Better conversion rates",
      "Increased online visibility",
      "Sustainable business growth",
    ],

    process: [
      {
        step: "SEO Audit",
        desc: "Analyzing technical and on-page SEO issues.",
        icon: Search,
      },
      {
        step: "Keyword Research",
        desc: "Finding high-converting search keywords.",
        icon: LineChart,
      },
      {
        step: "On-Page Optimization",
        desc: "Improving content and technical structure.",
        icon: Settings,
      },
      {
        step: "Link Building",
        desc: "Building high-quality authority backlinks.",
        icon: Globe,
      },
      {
        step: "Reporting",
        desc: "Monthly ranking and traffic performance reports.",
        icon: BarChart3,
      },
    ],

    faqs: [
      {
        q: "How long does SEO take?",
        a: "SEO usually shows significant results within 3 to 6 months.",
      },
      {
        q: "Do you guarantee rankings?",
        a: "We follow best practices but no ethical agency guarantees rankings.",
      },
      {
        q: "Do you provide local SEO?",
        a: "Yes, we provide local and international SEO services.",
      },
      {
        q: "Will SEO increase sales?",
        a: "Yes, targeted SEO helps generate qualified traffic and leads.",
      },
      {
        q: "Do you optimize existing websites?",
        a: "Yes, we optimize both new and existing websites.",
      },
    ],
  },

  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    short:
      "Full-service digital marketing strategies focused on growth and conversions.",

    metaTitle: "Digital Marketing Agency Pakistan | AM Enterprises",

    metaDescription:
      "Complete digital marketing services including SEO, social media, paid ads, and lead generation strategies.",

    canonical:
      "https://amenterprises.tech/services/digital-marketing",

    description:
      "Our digital marketing services help businesses attract customers, increase brand visibility, and drive measurable growth through multi-channel strategies. AM Enterprises combines SEO, paid advertising, social media marketing, content marketing, and analytics to create scalable marketing campaigns tailored to your business goals. We focus on ROI-driven strategies, audience targeting, and conversion optimization to maximize results and help businesses succeed in the competitive digital landscape.",

    pricing: "Starting from PKR 50,000/month",

    benefits: [
      "Higher lead generation",
      "Improved online visibility",
      "ROI-focused strategies",
      "Multi-channel marketing",
      "Targeted audience reach",
      "Scalable campaigns",
    ],

    process: [
      {
        step: "Market Research",
        desc: "Understanding your industry and competitors.",
        icon: Search,
      },
      {
        step: "Strategy Planning",
        desc: "Creating custom digital marketing roadmaps.",
        icon: LayoutDashboard,
      },
      {
        step: "Campaign Launch",
        desc: "Launching optimized digital campaigns.",
        icon: Megaphone,
      },
      {
        step: "Optimization",
        desc: "Improving campaign performance continuously.",
        icon: LineChart,
      },
      {
        step: "Reporting",
        desc: "Transparent monthly reporting and analysis.",
        icon: BarChart3,
      },
    ],

    faqs: [
      {
        q: "Which marketing channels do you manage?",
        a: "We manage SEO, Google Ads, Meta Ads, LinkedIn, and content marketing.",
      },
      {
        q: "Can digital marketing increase sales?",
        a: "Yes, our campaigns focus on generating qualified leads and conversions.",
      },
      {
        q: "Do you provide monthly reports?",
        a: "Yes, detailed monthly performance reports are included.",
      },
      {
        q: "Is digital marketing suitable for startups?",
        a: "Yes, we create scalable solutions for startups and enterprises.",
      },
      {
        q: "Do you manage ad budgets?",
        a: "Yes, we professionally manage and optimize ad spending.",
      },
    ],
  },
  {
  slug: "ai-automation",
  title: "AI Automation Services",
  short:
    "Smart AI automation solutions that save time, reduce costs, and improve business productivity.",

  metaTitle: "AI Automation Services Pakistan | AM Enterprises",

  metaDescription:
    "Professional AI automation services for businesses including workflow automation, AI chatbots, CRM automation, and process optimization.",

  canonical:
    "https://amenterprises.tech/services/ai-automation",

  description:
    "AM Enterprises provides advanced AI automation services designed to streamline business operations, reduce repetitive tasks, and improve overall efficiency. We create intelligent automation systems using modern AI tools, workflow integrations, CRM automation, chatbot systems, and process optimization strategies tailored to your business needs. Our automation solutions help businesses improve productivity, enhance customer support, reduce operational costs, and scale efficiently. Whether you need AI-powered workflows, automated lead management, or smart customer interaction systems, our team delivers reliable and scalable automation solutions for long-term growth.",

  pricing: "Starting from PKR 150,000",

  benefits: [
    "Reduced manual workload",
    "Improved operational efficiency",
    "Faster customer support",
    "Smart workflow automation",
    "Scalable business systems",
    "Increased productivity",
  ],

  process: [
    {
      step: "Business Analysis",
      desc: "We identify repetitive tasks and automation opportunities.",
      icon: ClipboardCheck,
    },
    {
      step: "Workflow Planning",
      desc: "Creating optimized AI automation strategies and systems.",
      icon: LayoutDashboard,
    },
    {
      step: "AI Integration",
      desc: "Implementing AI tools, APIs, and automation platforms.",
      icon: Bot,
    },
    {
      step: "Testing & Optimization",
      desc: "Ensuring smooth performance and accurate automation flows.",
      icon: Settings,
    },
    {
      step: "Deployment & Support",
      desc: "Launching automation systems with long-term support.",
      icon: Rocket,
    },
  ],

  faqs: [
    {
      q: "What types of businesses can use AI automation?",
      a: "AI automation works for startups, agencies, e-commerce stores, and enterprise businesses.",
    },
    {
      q: "Can AI automation reduce operational costs?",
      a: "Yes, automation minimizes repetitive work and improves overall efficiency.",
    },
    {
      q: "Do you create AI chatbots?",
      a: "Yes, we build AI-powered chatbots for websites and customer support systems.",
    },
    {
      q: "Can automation integrate with CRMs?",
      a: "Yes, we integrate automation with popular CRM and marketing platforms.",
    },
    {
      q: "Do you provide maintenance support?",
      a: "Yes, we provide ongoing optimization and support services.",
    },
  ],
},

{
  slug: "mobile-app-development",
  title: "Mobile App Development",
  short:
    "Modern mobile applications for Android and iOS built for performance and scalability.",

  metaTitle: "Mobile App Development Services | AM Enterprises",

  metaDescription:
    "Professional mobile app development services using Flutter and React Native for scalable Android and iOS applications.",

  canonical:
    "https://amenterprises.tech/services/mobile-app-development",

  description:
    "AM Enterprises develops high-performance mobile applications for startups, businesses, and enterprises looking to expand their digital presence. We create modern Android and iOS applications with intuitive user experiences, scalable architecture, secure systems, and optimized performance. Our app development services include UI/UX design, API integration, testing, deployment, and long-term maintenance support. Whether you need a customer-facing mobile app, e-commerce application, booking platform, or business management solution, we deliver professional mobile experiences that drive engagement and business growth.",

  pricing: "Starting from PKR 250,000",

  benefits: [
    "Cross-platform app development",
    "Modern user-friendly UI",
    "Fast and scalable performance",
    "Secure mobile architecture",
    "App Store & Play Store deployment",
    "Long-term maintainability",
  ],

  process: [
    {
      step: "Requirement Planning",
      desc: "Understanding app features, users, and business objectives.",
      icon: ClipboardCheck,
    },
    {
      step: "UI/UX Design",
      desc: "Designing engaging and intuitive mobile interfaces.",
      icon: Smartphone,
    },
    {
      step: "App Development",
      desc: "Building scalable applications using modern frameworks.",
      icon: Code2,
    },
    {
      step: "Testing & QA",
      desc: "Complete testing for performance, security, and usability.",
      icon: ShieldCheck,
    },
    {
      step: "Launch & Maintenance",
      desc: "Publishing apps and providing ongoing support.",
      icon: Rocket,
    },
  ],

  faqs: [
    {
      q: "Do you build apps for both Android and iOS?",
      a: "Yes, we build apps for both platforms using cross-platform technologies.",
    },
    {
      q: "Which frameworks do you use?",
      a: "We use Flutter and React Native for modern app development.",
    },
    {
      q: "Can you publish apps on app stores?",
      a: "Yes, we handle deployment on Google Play Store and Apple App Store.",
    },
    {
      q: "Will the app be scalable for future growth?",
      a: "Yes, our applications are designed with scalability and performance in mind.",
    },
    {
      q: "Do you provide post-launch support?",
      a: "Yes, we provide updates, maintenance, and optimization services.",
    },
  ],
},

{
  slug: "ui-ux-design",
  title: "UI/UX Design Services",
  short:
    "Modern UI/UX design solutions focused on user experience and conversions.",

  metaTitle: "UI UX Design Services Pakistan | AM Enterprises",

  metaDescription:
    "Professional UI and UX design services for websites, dashboards, SaaS products, and mobile applications with modern user experiences.",

  canonical:
    "https://amenterprises.tech/services/ui-ux-design",

  description:
    "AM Enterprises provides premium UI/UX design services focused on creating visually appealing, user-friendly, and conversion-focused digital experiences. Our design process combines creativity, usability research, modern design systems, and responsive layouts to deliver interfaces that improve user engagement and business growth. Whether you need website designs, SaaS dashboards, mobile app interfaces, or custom product experiences, we create modern and intuitive solutions tailored to your audience and goals. Every design is optimized for usability, branding consistency, responsiveness, and seamless interaction across devices.",

  pricing: "Starting from PKR 90,000",

  benefits: [
    "Modern and clean interfaces",
    "Improved user engagement",
    "Conversion-focused design",
    "Responsive layouts",
    "Better usability experience",
    "Professional brand consistency",
  ],

  process: [
    {
      step: "Research & Strategy",
      desc: "Understanding user behavior and project requirements.",
      icon: Search,
    },
    {
      step: "Wireframing",
      desc: "Creating structured user flows and layouts.",
      icon: LayoutDashboard,
    },
    {
      step: "UI Design",
      desc: "Designing visually engaging and modern interfaces.",
      icon: Palette,
    },
    {
      step: "Prototype & Testing",
      desc: "Testing usability and interaction experiences.",
      icon: MonitorSmartphone,
    },
    {
      step: "Final Delivery",
      desc: "Providing complete design systems and assets.",
      icon: Rocket,
    },
  ],

  faqs: [
    {
      q: "Do you design websites and mobile apps?",
      a: "Yes, we design websites, dashboards, SaaS products, and mobile applications.",
    },
    {
      q: "Which tools do you use for design?",
      a: "We primarily use Figma and other modern design tools.",
    },
    {
      q: "Do you provide responsive designs?",
      a: "Yes, all designs are fully responsive for all devices.",
    },
    {
      q: "Can you redesign an old interface?",
      a: "Yes, we modernize outdated designs professionally.",
    },
    {
      q: "Do you provide development-ready assets?",
      a: "Yes, developers receive organized and optimized design files.",
    },
  ],
},
{
  slug: "google-ads-management",
  title: "Google Ads Management",
  short:
    "High-converting Google Ads campaigns designed to generate leads and maximize ROI.",

  metaTitle: "Google Ads Management Services | AM Enterprises",

  metaDescription:
    "Professional Google Ads management services including search ads, display campaigns, YouTube ads, and conversion optimization.",

  canonical:
    "https://amenterprises.tech/services/google-ads-management",

  description:
    "AM Enterprises provides professional Google Ads management services focused on generating high-quality leads, increasing sales, and maximizing advertising ROI. Our certified advertising specialists create and optimize search, display, shopping, and YouTube campaigns tailored to your business goals. We focus on audience targeting, keyword strategy, conversion optimization, and performance tracking to ensure every advertising campaign delivers measurable results. Whether you want to increase website traffic, generate inquiries, or scale your online sales, our data-driven advertising strategies help businesses grow efficiently in competitive markets.",

  pricing: "Starting from PKR 45,000/month",

  benefits: [
    "Instant targeted traffic",
    "High-quality lead generation",
    "Better conversion tracking",
    "Optimized ad spending",
    "Scalable advertising campaigns",
    "Improved business visibility",
  ],

  process: [
    {
      step: "Campaign Research",
      desc: "Analyzing keywords, competitors, and target audience behavior.",
      icon: Search,
    },
    {
      step: "Campaign Setup",
      desc: "Creating optimized ad groups, targeting, and conversion tracking.",
      icon: Settings,
    },
    {
      step: "Ad Creation",
      desc: "Writing compelling ad copies and designing creatives.",
      icon: PenTool,
    },
    {
      step: "Optimization",
      desc: "Improving bids, audiences, and campaign performance regularly.",
      icon: LineChart,
    },
    {
      step: "Reporting",
      desc: "Providing transparent performance reports and ROI analysis.",
      icon: BarChart3,
    },
  ],

  faqs: [
    {
      q: "How quickly can Google Ads generate results?",
      a: "Google Ads can start generating traffic and leads within days after launch.",
    },
    {
      q: "Do you manage advertising budgets?",
      a: "Yes, we professionally manage and optimize ad budgets for maximum ROI.",
    },
    {
      q: "Can you create YouTube advertising campaigns?",
      a: "Yes, we manage YouTube video advertising campaigns professionally.",
    },
    {
      q: "Do you provide conversion tracking setup?",
      a: "Yes, we configure advanced conversion and analytics tracking.",
    },
    {
      q: "Can Google Ads work for local businesses?",
      a: "Yes, local targeting strategies help businesses generate nearby customers.",
    },
  ],
},

{
  slug: "social-media-marketing",
  title: "Social Media Marketing",
  short:
    "Professional social media marketing strategies that grow engagement and drive sales.",

  metaTitle: "Social Media Marketing Services | AM Enterprises",

  metaDescription:
    "Professional social media marketing services for Facebook, Instagram, LinkedIn, TikTok, and other platforms focused on growth and engagement.",

  canonical:
    "https://amenterprises.tech/services/social-media-marketing",

  description:
    "AM Enterprises provides result-driven social media marketing services designed to increase brand awareness, audience engagement, and business growth. Our team creates customized content strategies, paid advertising campaigns, community management systems, and performance-driven marketing solutions across major social platforms. We focus on audience targeting, creative content creation, engagement optimization, and conversion-focused campaigns to help businesses establish a strong digital presence. Whether you are building a personal brand, promoting products, or scaling a business, our social media experts deliver strategies that generate measurable results.",

  pricing: "Starting from PKR 35,000/month",

  benefits: [
    "Improved brand awareness",
    "Higher audience engagement",
    "Consistent social presence",
    "Lead generation campaigns",
    "Creative content strategies",
    "Better customer interaction",
  ],

  process: [
    {
      step: "Brand Research",
      desc: "Understanding your audience, competitors, and brand voice.",
      icon: Users,
    },
    {
      step: "Content Planning",
      desc: "Creating strategic monthly content calendars and campaigns.",
      icon: LayoutDashboard,
    },
    {
      step: "Content Creation",
      desc: "Designing high-quality visuals, reels, and engaging content.",
      icon: Palette,
    },
    {
      step: "Publishing & Engagement",
      desc: "Managing posting schedules and audience interactions.",
      icon: Megaphone,
    },
    {
      step: "Analytics & Growth",
      desc: "Tracking performance and optimizing campaign strategies.",
      icon: BarChart3,
    },
  ],

  faqs: [
    {
      q: "Which social media platforms do you manage?",
      a: "We manage Facebook, Instagram, LinkedIn, TikTok, YouTube, and X.",
    },
    {
      q: "Do you create social media content?",
      a: "Yes, we create graphics, captions, reels, and marketing campaigns.",
    },
    {
      q: "Can social media marketing increase sales?",
      a: "Yes, targeted campaigns help improve engagement and lead generation.",
    },
    {
      q: "Do you manage paid social advertising?",
      a: "Yes, we create and optimize Meta and social advertising campaigns.",
    },
    {
      q: "Will I receive monthly reports?",
      a: "Yes, detailed analytics and growth reports are provided every month.",
    },
  ],
},

{
  slug: "branding-and-identity",
  title: "Branding & Identity Design",
  short:
    "Professional branding solutions that make your business memorable and trusted.",

  metaTitle: "Branding & Identity Design Services | AM Enterprises",

  metaDescription:
    "Professional branding services including logo design, brand identity systems, marketing assets, and visual identity development.",

  canonical:
    "https://amenterprises.tech/services/branding-and-identity",

  description:
    "AM Enterprises provides complete branding and identity design services to help businesses establish a strong and professional visual presence. We create modern logos, brand systems, typography guidelines, color palettes, social branding assets, and marketing materials tailored to your business identity. Our branding strategies focus on creating memorable customer experiences, improving brand recognition, and building trust across digital and offline platforms. Whether you are launching a startup or rebranding an established company, our creative team develops impactful branding solutions that align with your vision and business goals.",

  pricing: "Starting from PKR 70,000",

  benefits: [
    "Professional brand identity",
    "Improved brand recognition",
    "Consistent visual communication",
    "Modern logo and design systems",
    "Stronger customer trust",
    "Better marketing presentation",
  ],

  process: [
    {
      step: "Brand Discovery",
      desc: "Understanding your business values, audience, and positioning.",
      icon: Search,
    },
    {
      step: "Creative Strategy",
      desc: "Planning visual direction and branding concepts.",
      icon: PenTool,
    },
    {
      step: "Design Creation",
      desc: "Designing logos, brand assets, and visual systems.",
      icon: Palette,
    },
    {
      step: "Refinement",
      desc: "Improving and finalizing professional branding materials.",
      icon: Settings,
    },
    {
      step: "Brand Delivery",
      desc: "Delivering complete branding files and guidelines.",
      icon: Rocket,
    },
  ],

  faqs: [
    {
      q: "What is included in branding services?",
      a: "Logo design, typography, color palette, brand guidelines, and visual assets.",
    },
    {
      q: "Can you redesign an existing brand?",
      a: "Yes, we provide complete rebranding and modernization services.",
    },
    {
      q: "Do you provide social media branding assets?",
      a: "Yes, we create banners, templates, and digital branding materials.",
    },
    {
      q: "Will I receive editable source files?",
      a: "Yes, all professional source files are included in delivery.",
    },
    {
      q: "How long does branding take?",
      a: "Typical branding projects take around 1 to 3 weeks depending on scope.",
    },
  ],
},
{
  slug: "crm-development",
  title: "CRM Development Services",
  short:
    "Custom CRM systems designed to streamline operations, sales, and customer management.",

  metaTitle: "Custom CRM Development Services | AM Enterprises",

  metaDescription:
    "Professional CRM development services for businesses including customer management, sales automation, workflow systems, and reporting dashboards.",

  canonical:
    "https://amenterprises.tech/services/crm-development",

  description:
    "AM Enterprises provides custom CRM development services designed to help businesses manage customers, automate workflows, improve team collaboration, and increase sales efficiency. Our CRM solutions are tailored according to your business operations, allowing you to track leads, manage customer interactions, automate follow-ups, generate reports, and optimize internal processes from a single platform. We build scalable and secure CRM systems with modern interfaces, analytics dashboards, role management, and automation features that improve productivity and support long-term business growth.",

  pricing: "Starting from PKR 220,000",

  benefits: [
    "Centralized customer management",
    "Sales and workflow automation",
    "Improved team productivity",
    "Custom analytics dashboards",
    "Better lead tracking",
    "Scalable CRM architecture",
  ],

  process: [
    {
      step: "Business Analysis",
      desc: "Understanding your workflow, sales process, and CRM requirements.",
      icon: Database,
    },
    {
      step: "CRM Planning",
      desc: "Designing modules, user roles, and automation workflows.",
      icon: LayoutDashboard,
    },
    {
      step: "Development",
      desc: "Building secure and scalable CRM systems with custom functionality.",
      icon: Code2,
    },
    {
      step: "Testing & Optimization",
      desc: "Testing performance, security, and automation systems.",
      icon: ShieldCheck,
    },
    {
      step: "Deployment",
      desc: "Launching the CRM platform with training and support.",
      icon: Rocket,
    },
  ],

  faqs: [
    {
      q: "Can the CRM be customized for my business?",
      a: "Yes, every CRM system is tailored according to your workflow and operations.",
    },
    {
      q: "Will the CRM support multiple users?",
      a: "Yes, we provide role-based multi-user systems with permissions.",
    },
    {
      q: "Can you integrate third-party APIs?",
      a: "Yes, we integrate payment gateways, email systems, and external APIs.",
    },
    {
      q: "Do you provide cloud-based CRM solutions?",
      a: "Yes, we develop cloud-based scalable CRM systems.",
    },
    {
      q: "Will I receive maintenance support?",
      a: "Yes, we provide ongoing updates and support services.",
    },
  ],
},

{
  slug: "saas-development",
  title: "SaaS Development Services",
  short:
    "Scalable SaaS platforms built for startups, businesses, and enterprise growth.",

  metaTitle: "SaaS Development Company Pakistan | AM Enterprises",

  metaDescription:
    "Professional SaaS application development services including dashboards, subscriptions, APIs, authentication systems, and scalable cloud solutions.",

  canonical:
    "https://amenterprises.tech/services/saas-development",

  description:
    "AM Enterprises develops powerful SaaS applications designed for scalability, performance, and modern user experiences. Our SaaS development services help startups and enterprises build cloud-based software platforms with secure authentication systems, subscription management, admin dashboards, APIs, and automation tools. We focus on responsive interfaces, optimized backend architecture, security standards, and scalable infrastructure to ensure long-term growth and product stability. Whether you are launching a startup MVP or scaling an enterprise SaaS product, our development team creates high-quality digital solutions tailored to your business goals.",

  pricing: "Starting from PKR 450,000",

  benefits: [
    "Scalable cloud architecture",
    "Subscription-based systems",
    "Secure authentication setup",
    "Modern responsive dashboards",
    "API integration support",
    "Long-term scalability",
  ],

  process: [
    {
      step: "Product Strategy",
      desc: "Defining SaaS features, users, and business objectives.",
      icon: ClipboardCheck,
    },
    {
      step: "System Architecture",
      desc: "Planning scalable backend and cloud infrastructure.",
      icon: Database,
    },
    {
      step: "Development",
      desc: "Building secure SaaS applications with modern technologies.",
      icon: Code2,
    },
    {
      step: "Testing & Security",
      desc: "Ensuring performance, security, and scalability standards.",
      icon: ShieldCheck,
    },
    {
      step: "Launch & Scaling",
      desc: "Deploying the platform with optimization and support.",
      icon: Rocket,
    },
  ],

  faqs: [
    {
      q: "Can you build subscription-based SaaS products?",
      a: "Yes, we build complete subscription and billing systems.",
    },
    {
      q: "Which technologies do you use for SaaS development?",
      a: "We use Next.js, Node.js, PostgreSQL, Prisma, and cloud infrastructure.",
    },
    {
      q: "Will the SaaS platform be scalable?",
      a: "Yes, all SaaS systems are built with scalability and performance in mind.",
    },
    {
      q: "Do you provide admin dashboards?",
      a: "Yes, we create advanced admin and analytics dashboards.",
    },
    {
      q: "Can you develop MVPs for startups?",
      a: "Yes, we help startups launch scalable MVP solutions quickly.",
    },
  ],
},

{
  slug: "website-maintenance",
  title: "Website Maintenance Services",
  short:
    "Reliable website maintenance and support services for performance, security, and stability.",

  metaTitle: "Website Maintenance Services | AM Enterprises",

  metaDescription:
    "Professional website maintenance services including updates, backups, security monitoring, bug fixing, and performance optimization.",

  canonical:
    "https://amenterprises.tech/services/website-maintenance",

  description:
    "AM Enterprises provides professional website maintenance services to ensure your website remains secure, fast, updated, and fully functional at all times. Our maintenance solutions include regular updates, security monitoring, malware protection, backups, performance optimization, bug fixing, uptime monitoring, and technical support. We help businesses avoid downtime, improve website performance, and maintain a professional online presence. Whether you manage a corporate website, e-commerce store, or custom web application, our maintenance team ensures smooth and reliable operation for long-term business continuity.",

  pricing: "Starting from PKR 25,000/month",

  benefits: [
    "Regular website updates",
    "Security monitoring and protection",
    "Performance optimization",
    "Automatic backups",
    "Bug fixing and support",
    "Reduced downtime risks",
  ],

  process: [
    {
      step: "Website Audit",
      desc: "Analyzing current performance, security, and technical issues.",
      icon: Search,
    },
    {
      step: "Maintenance Planning",
      desc: "Creating custom maintenance and monitoring strategies.",
      icon: LayoutDashboard,
    },
    {
      step: "Optimization & Updates",
      desc: "Implementing updates, speed improvements, and bug fixes.",
      icon: Settings,
    },
    {
      step: "Security Monitoring",
      desc: "Monitoring threats, malware, and vulnerabilities regularly.",
      icon: ShieldCheck,
    },
    {
      step: "Reporting & Support",
      desc: "Providing reports, backups, and ongoing technical assistance.",
      icon: BarChart3,
    },
  ],

  faqs: [
    {
      q: "Why is website maintenance important?",
      a: "Maintenance keeps your website secure, updated, and performing efficiently.",
    },
    {
      q: "Do you provide backup services?",
      a: "Yes, regular automated backups are included in maintenance plans.",
    },
    {
      q: "Can you maintain WordPress websites?",
      a: "Yes, we maintain WordPress, custom websites, and web applications.",
    },
    {
      q: "Do you fix website bugs and errors?",
      a: "Yes, we provide technical troubleshooting and bug fixing services.",
    },
    {
      q: "Will maintenance improve website speed?",
      a: "Yes, optimization services help improve loading speed and performance.",
    },
  ],
},
];