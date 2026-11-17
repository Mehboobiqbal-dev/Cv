import { Fragment } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

// Sections are server-rendered (dynamic() keeps SSR on) and split into their own chunks.
const Navbar = dynamic(() => import("@/layout/navbar/Navbar"));
const Footer = dynamic(() => import("@/layout/footer/Footer"));
const Intro = dynamic(() => import("@/sections/Intro"));
const StackMarquee = dynamic(() => import("@/sections/StackMarquee"));
const CaseStudies = dynamic(() => import("@/sections/CaseStudies"));
const Projects = dynamic(() => import("@/sections/Projects"));
const Experience = dynamic(() => import("@/sections/experience"));
const About = dynamic(() => import("@/sections/about"));
const Skills = dynamic(() => import("@/sections/Skills"));
const Education = dynamic(() => import("@/sections/education"));
const WhyWorkWithMe = dynamic(() => import("@/sections/LatestBlogs"));
const SendMail = dynamic(() => import("@/utils/SendMail"));
const SocialMedia = dynamic(() => import("@/utils/SocialMedia"));
const ChatSystem = dynamic(() => import("@/utils/ChatSystem"), { ssr: false });

const SITE = "https://www.mehboobiqbal.site";
const DESCRIPTION =
  "Mehboob Iqbal, web developer: runs two live Arabic e-commerce stores and their Flutter app, and built Wordmark Remover, 239 free file tools with a public API. React, Next.js, TypeScript, Node.js, PHP, MySQL.";

// Structured data so search engines show his name, role and profiles correctly.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mehboob Iqbal",
  jobTitle: "Web Developer",
  url: SITE,
  address: { "@type": "PostalAddress", addressLocality: "Hail", addressCountry: "SA" },
  knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "PHP", "MySQL", "Flutter", "E-commerce"],
  sameAs: ["https://www.linkedin.com/in/mehboob-iqbal-3b1263190", "https://github.com/Mehboobiqbal-dev"],
};

const Home = () => {
  return (
    <Fragment>
      <Head>
        <title>Mehboob Iqbal | Web Developer — React, Next.js, Node.js, PHP</title>
        <meta content={DESCRIPTION} name="description" />
        <meta content="Mehboob Iqbal" name="author" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta content="#09090b" name="theme-color" />
        <meta content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" name="robots" />
        <link
          href="/llms.txt"
          rel="alternate"
          title="Profile for AI assistants"
          type="text/plain"
        />
        <link href={SITE} rel="canonical" />

        {/* Link previews (LinkedIn, WhatsApp, Slack, email) */}
        <meta content="website" property="og:type" />
        <meta content={SITE} property="og:url" />
        <meta content="Mehboob Iqbal | Web Developer" property="og:title" />
        <meta
          content="Live e-commerce stores, a Flutter app with 5,000+ downloads and 239 free file tools. Available for remote work."
          property="og:description"
        />
        <meta content={`${SITE}/og-cover.jpg`} property="og:image" />
        <meta content="1200" property="og:image:width" />
        <meta content="630" property="og:image:height" />
        <meta content="summary_large_image" name="twitter:card" />

        <link href="/favicon.ico" rel="icon" type="image/x-icon" />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          type="application/ld+json"
        />
      </Head>

      <Navbar />

      <main>
        {/* Proof first: who he is, then the work, then the history */}
        <Intro />
        <StackMarquee />
        <CaseStudies />
        <Projects />
        <Experience />
        <About />
        <Skills />
        <Education />
        <WhyWorkWithMe />
        <SendMail />
      </main>

      <Footer />
      <SocialMedia />
      <ChatSystem />
    </Fragment>
  );
};

export default Home;
