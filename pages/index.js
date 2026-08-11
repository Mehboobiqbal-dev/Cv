import { Fragment } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

// Importing sections and components dynamically
const Navbar = dynamic(() => import("@/layout/navbar/Navbar"));
const Footer = dynamic(() => import("@/layout/footer/Footer"));
const Intro = dynamic(() => import("@/sections/Intro"));
const About = dynamic(() => import("@/sections/about"));
const Skills = dynamic(() => import("@/sections/Skills"));
const Education = dynamic(() => import("@/sections/education"));
const Experience = dynamic(() => import("@/sections/experience"));
const Projects = dynamic(() => import("@/sections/Projects"));
const LatestBlogs = dynamic(() => import("@/sections/LatestBlogs"));
const Apps = dynamic(() => import("@/sections/Apps"));
const SendMail = dynamic(() => import("@/utils/SendMail"));
const SocialMedia = dynamic(() => import("@/utils/SocialMedia"));
const ChatSystem = dynamic(() => import("@/utils/ChatSystem"));
const Feedback = dynamic(() => import("@/utils/Feedback"));

const Home = () => {
  return (
    <Fragment>
      <Head>
        <title>Mehboob Iqbal | Full-Stack &amp; Mobile Developer</title>

        {/* Meta Tags */}
        <meta
          content="Mehboob Iqbal, full-stack developer, Next.js developer, PHP developer, Flutter developer, MySQL, React, e-commerce developer, Pakistan"
          name="keywords"
        />
        <meta content="Mehboob Iqbal" name="author" />
        <meta
          content="Portfolio of Mehboob Iqbal, a full-stack and mobile developer building production-ready web, e-commerce, AI, and Flutter experiences."
          name="description"
        />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />

        {/* Favicon */}
        <link href="/favicon.ico" rel="icon" type="image/x-icon" />
      </Head>
      
      <div>
        {/* Desktop Navbar */}
        <Navbar />

        {/* Portfolio Sections */}
        <Intro />
        <About />
        <Skills />
        <Education />
        <Experience />
        <Projects />
        <SocialMedia />
        <LatestBlogs />
        <Apps />
        <SendMail />

        {/* Footer */}
        <Footer />

        {/* Additional utilities */}
        <div className="z-40">
          {/* Chat System */}
          <ChatSystem />
        </div>
        
        {/* Feedback Modal */}
        <Feedback />
      </div>
    </Fragment>
  );
};

export default Home;
