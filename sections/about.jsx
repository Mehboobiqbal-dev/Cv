"use client";
import React, { Fragment, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaBlackTie, FaUserCheck } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { IoPerson } from "react-icons/io5";
import { BsMenuAppFill } from "react-icons/bs";

const About = () => {
  const [isAbout, setIsAbout] = useState(false);

  const aboutRef = useRef();
  const profile2Ref = useRef(); // Profile 2 Reference
  const aboutInfoRef = useRef();

  // Scroll Animation
  useEffect(() => {
    if (aboutRef.current) {
      const getScreenWidth = () =>
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

      const aboutObserver = new IntersectionObserver(
        ([aboutEntry]) => {
          setIsAbout(aboutEntry.isIntersecting);
        },
        {
          rootMargin: `${getScreenWidth() <= 700 ? "-100px" : "-300px"}`,
        }
      );

      aboutObserver.observe(aboutRef.current);

      // Add or remove animation classes based on whether the section is in view
      if (isAbout) {
        if (profile2Ref.current) {
          profile2Ref.current.classList.add("slide-in");
        }
        aboutInfoRef.current.classList.add("slide-in");
      } else {
        if (profile2Ref.current) {
          profile2Ref.current.classList.remove("slide-in");
        }
        aboutInfoRef.current.classList.remove("slide-in");
      }
    }
  }, [isAbout]);

  return (
    <Fragment>
      <section
        className="shadow-zinc-300 dark:shadow-zinc-700 shadow-sm overflow-x-hidden"
        id="about"
        ref={aboutRef}
      >
        <h2 className="text-3xl font-bold text-center pt-4 pb-8 flex justify-center items-center gap-3">
          <FaUserCheck /> About me
        </h2>

        <div
          className="text-lg translate-x-[900px] opacity-0 transition-all duration-700 mt-4 md:mt-0 md:w-[50%] text-center md:text-left rounded"
          ref={aboutInfoRef}
        >
          {/* Full Name */}
          <p className="text-3xl text-center md:text-left font-semibold text-[#c72c6c] dark:text-[#07d0e5]">
            Mehboob Iqbal
          </p>
          {/* Profile Name */}
          <p className="text-center md:text-left text-red-600 mt-1">
            Full stack web developer
          </p>
          {/* Location, Age, Experience, Projects */}
          <div className="flex flex-wrap justify-center md:justify-normal gap-5">
            <div className="w-fit px-4 py-2 mt-5 border border-gray-400 rounded flex flex-col items-center gap-2">
              <div className="flex gap-3 items-center">
                <p className="text-center md:text-left text-[#c72c6c] dark:text-[#07d0e5]">
                  Location
                </p>
                <p>
                  <ImLocation />
                </p>
              </div>
              <p className="text-center md:text-left text-[#0b0c0c] dark:text-[#07d0e5]">
                Khanewale, Pakistan
              </p>
            </div>
            {/* Age */}
            <div className="w-fit px-4 py-2 mt-5 border border-gray-400 rounded flex flex-col items-center gap-2">
              <div className="flex gap-3 items-center">
                <p className="text-center md:text-left text-[#c72c6c] dark:text-[#07d0e5]">
                  Age
                </p>
                <p>
                  <IoPerson />
                </p>
              </div>
              <p className="text-center md:text-left text-[#c72c6c] dark:text-[#07d0e5]">
                22
              </p>
            </div>
            {/* Experience */}
            <div className="w-fit px-4 py-2 mt-5 border border-gray-400 rounded flex flex-col items-center gap-2">
              <div className="flex gap-3 items-center">
                <p className="text-center md:text-left text-[#c72c6c] dark:text-[#07d0e5]">
                  Experience
                </p>
                <p>
                  <FaBlackTie />
                </p>
              </div>
              <p className="text-center md:text-left text-[#c72c6c] dark:text-[#07d0e5]">
                1 Year
              </p>
            </div>
            {/* Projects */}
            <div className="w-fit px-4 py-2 mt-5 border border-gray-400 rounded flex flex-col items-center gap-2">
              <div className="flex gap-3 items-center">
                <p className="text-center md:text-left text-[#c72c6c] dark:text-[#07d0e5]">
                  Projects
                </p>
                <p>
                  <BsMenuAppFill />
                </p>
              </div>
              <p className="text-center md:text-left text-[#c72c6c] dark:text-[#07d0e5]">
                6
              </p>
            </div>
          </div>

          <div className="mt-5 justify-evenly text-justify">
            <p className="text-gray-600 dark:text-gray-300">
            I’m a passionate Full Stack Developer with hands-on experience building modern, scalable web applications using Next.js, React.js, Node.js, and FastAPI. I love crafting efficient, clean, and high-performance solutions that merge design with powerful backend logic.
              <br />
              On the frontend, I have a strong command of JavaScript and Tailwind CSS, allowing me to design responsive, user-friendly, and visually appealing interfaces. My approach to web development is focused on delivering seamless user experiences, with a strong emphasis on UI/UX principles.
              <br />
              My work focuses on building automation tools, intelligent web platforms, and AI-driven systems — combining creativity with technical depth. I enjoy turning complex ideas into seamless user experiences and bringing automation to life through smart APIs and integrations.
              <br />
              I am passionate about leveraging my skills to build innovative and impactful solutions while staying at the forefront of emerging web technologies.
            </p>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default About;
