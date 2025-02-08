"use client";
import React, { Fragment, useRef, useState, useEffect } from "react";
import { FaBriefcase } from "react-icons/fa";

// Importing ExperienceData
import { ExperienceData } from "@/constants/ExperienceData";

const Experience = () => {
  const [isExperience, setIsExperience] = useState(false);
  const experienceRef = useRef(null);
  const experienceBoxesRef = useRef(null);

  useEffect(() => {
    const getScreenWidth = () =>
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    // Creating the observer and adding it when the component mounts
    const experienceObserver = new IntersectionObserver(
      ([experienceEntry]) => {
        setIsExperience(experienceEntry.isIntersecting);  // Update state when section is in view
      },
      {
        rootMargin: `${getScreenWidth() <= 700 ? "-100px" : "-300px"}`,  // Adjust margin based on screen size
      }
    );

    // Observe the experience section
    if (experienceRef.current) {
      experienceObserver.observe(experienceRef.current);
    }

    return () => {
      // Clean up observer on component unmount
      if (experienceRef.current) {
        experienceObserver.unobserve(experienceRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isExperience) {
      // Add class when section is in view
      experienceBoxesRef.current?.classList.add("pop-up-child");
    } else {
      // Remove class when section is out of view
      experienceBoxesRef.current?.classList.remove("pop-up-child");
    }
  }, [isExperience]);  // This effect runs only when `isExperience` changes

  return (
    <Fragment>
      <section
        className="shadow-zinc-300 dark:shadow-zinc-700 shadow-sm overflow-x-hidden"
        id="experience"
        ref={experienceRef}
      >
        <h2 className="text-3xl font-bold text-center p-4 flex justify-center items-center gap-3">
          <FaBriefcase /> Experience
        </h2>

        <div
          className="pop-down-child pb-[30px] px-[20px] md:px-[100px] lg:px-[200px] flex flex-col gap-[20px] md:gap-[50px]"
          ref={experienceBoxesRef}
        >
          {ExperienceData.map((experience, index) => (
            <div
              className="transition-all duration-700 flex border border-zinc-300 dark:border-zinc-700 shadow-md shadow-zinc-300 dark:shadow-zinc-700 rounded gap-6"
              key={index}
            >
              <div className="flex flex-col gap-2 p-3 md:p-1">
                <p className="text-xl md:text-2xl font-bold text-red-600">
                  {experience.role}
                </p>
                <p>{experience.companyName}</p>
                <p className="text-blue-600">
                  {experience.fromTo} &nbsp; | &nbsp; {experience.location}
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {experience.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Fragment>
  );
};

export default Experience;
