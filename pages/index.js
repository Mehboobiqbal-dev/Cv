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
        <title>Mehboob Iqbal&apos;s Portfolio</title>

        {/* Meta Tags */}
        <meta
          content="portfolio, Next.js, React.js, web development, dark theme, light theme, best portfolio github, best next js portfolio, how to make a portfolio, best react js portfolio github, best react js portfolio, best next js portfolio, react js developer in khanewale, react js developer in Jaipur, react js developer in India, react js developer in Rajasthan"
          name="keywords"
        />
        <meta content="Shivraj Gurjar" name="author" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />

        {/* Favicon */}
        <link href="https://shiv-s-portfolio.vercel.app/favicon.ico" rel="icon" type="image/x-icon" />
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
