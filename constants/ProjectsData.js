// Only projects that are live today (checked 17 Nov 2026). Every image is a full-page capture of the
// live site hosted in this repo (public/assets/projects), so a card never breaks because an outside
// image host goes down, and the card can scroll through the whole page on hover.
// Projects with a `caseStudy` are shown in the Case Studies section; the rest in "More live work".
export const ProjectsData = [
  {
    projectName: "Wordmark Remover",
    eyebrow: "My own product",
    liveUrl: "https://www.wordmarkremover.com/#toolbox",
    projectImage: {
      imageUrl: "/assets/projects/wordmark-remover.jpg",
      alt: "Wordmark Remover home page with free PDF, image and document tools",
    },
    description:
      "239 free PDF, image, video and document tools: conversion, OCR in 100+ languages, watermark and hidden-character removal, with a free public API. No sign-up, and files are deleted after processing. I built it end to end and run the hosting and the self-hosted AI image models myself.",
    techs: ["Next.js", "Node.js", "FastAPI", "Python", "AI models", "Public API"],
    featured: true,
    caseStudy: {
      problem:
        "Most online file tools hide the download behind a sign-up or a paywall, or stamp their own watermark on the result. People who just need to fix a PDF, an image or a document have nowhere simple to go.",
      built: [
        "Designed and built the whole product: a Next.js front end on Node.js and FastAPI services.",
        "Self-hosted AI image models for clean-up and inpainting; OCR in 100+ languages.",
        "A free public API, no sign-up, and files deleted after processing.",
        "I run the hosting and the inference myself.",
      ],
      metrics: [
        { to: 239, label: "free tools live" },
        { to: 100, suffix: "+", label: "OCR languages" },
        { text: "Free", label: "public API" },
      ],
    },
  },
  {
    projectName: "Road Biker",
    eyebrow: "Live e-commerce · current job",
    liveUrl: "https://road-biker.com/",
    appUrl: "https://apps.apple.com/app/id1438971004",
    projectImage: {
      imageUrl: "/assets/projects/road-biker.jpg",
      alt: "Road Biker Arabic motorcycle e-commerce storefront",
    },
    description:
      "Arabic-first motorcycle e-commerce store in Saudi Arabia with about 7,000 products and over a million visits. Rebuilt on OpenCart 3 and PHP 8.1, with Apple Pay, instalment payments, shipping integrations and a full catalogue migration done while the shop kept trading.",
    techs: ["PHP 8.1", "OpenCart 3", "MySQL", "Flutter", "Arabic RTL", "Payments", "Linux"],
    featured: true,
    caseStudy: {
      problem:
        "A Saudi motorcycle-parts retailer sells online in Arabic. Its two stores need right-to-left layouts, local payment options and shipping, a mobile app, and they have to keep selling while they change.",
      built: [
        "Rebuilt the OpenCart 3 storefront on PHP 8.1 and MySQL with right-to-left layouts and SEO-friendly URLs.",
        "Integrated Apple Pay, instalment payments, shipping and abandoned-cart flows.",
        "Migrated products, customers, orders and SEO URLs to a new server while the shop kept trading.",
        "Develop the Flutter shopping app on the same backend, and tune the Linux servers behind it.",
      ],
      metrics: [
        { to: 7000, label: "products" },
        { to: 1, suffix: "M+", label: "visits" },
        { to: 5000, suffix: "+", label: "app downloads" },
      ],
    },
  },
  {
    projectName: "Road Biker app",
    eyebrow: "Flutter · App Store and Google Play",
    liveUrl: "https://apps.apple.com/app/id1438971004",
    projectImage: {
      imageUrl: "/assets/projects/road-biker-app.jpg",
      alt: "Road Biker shopping app on the App Store",
    },
    description:
      "The Road Biker shopping app, 5,000+ downloads, which I develop and maintain in Flutter on the same commerce backend as the web store: product browsing, cart and checkout over REST.",
    techs: ["Flutter", "Dart", "REST APIs", "Arabic RTL"],
  },
  {
    projectName: "ILM Road Biker",
    eyebrow: "Live e-commerce · current job",
    liveUrl: "https://ilm-roadbiker.com/",
    projectImage: {
      imageUrl: "/assets/projects/ilm-roadbiker.jpg",
      alt: "ILM Road Biker Arabic e-commerce storefront",
    },
    description:
      "A second live Arabic-first storefront on the same stack, with localized navigation, product search and customer accounts.",
    techs: ["PHP", "OpenCart", "MySQL", "Localization", "Responsive UI"],
  },
  {
    projectName: "CertifiedSkill",
    eyebrow: "Full-stack web app",
    liveUrl: "https://get-certified-3x6j.vercel.app/",
    githubUrl: "https://github.com/Mehboobiqbal-dev/certifiedskill.org",
    projectImage: {
      imageUrl: "/assets/projects/certified-skill.jpg",
      alt: "CertifiedSkill free certification exams platform",
    },
    description:
      "Free online certification exams with digital certificates that anyone can verify: sign-up, dashboard, exams and certificate checks.",
    techs: ["Next.js", "React", "Tailwind CSS", "MongoDB", "Redux Toolkit"],
  },
  {
    projectName: "Raska Mon",
    eyebrow: "Client project",
    liveUrl: "https://raskamon.com/",
    projectImage: {
      imageUrl: "/assets/projects/raska-mon.jpg",
      alt: "Raska Mon online therapy and mental wellness platform",
    },
    description:
      "An online therapy and mental-wellness platform: therapist profiles and session booking, a mood tracker and self-assessments. Delivered to production for a client.",
    techs: ["React", "Vite", "Responsive UI"],
  },
  {
    projectName: "The Health Clinic Stockholm",
    eyebrow: "Client project",
    liveUrl: "https://thehealthclinicstockholm.com/",
    projectImage: {
      imageUrl: "/assets/projects/health-clinic-stockholm.jpg",
      alt: "The Health Clinic Stockholm website",
    },
    description:
      "Bilingual English and Swedish website for a concierge clinic in central Stockholm: specialties, health screenings and appointment booking. Delivered to production for a client.",
    techs: ["WordPress", "PHP", "Bilingual EN / SV", "SEO"],
  },
];
