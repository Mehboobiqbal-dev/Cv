import React, { Fragment } from "react";

const Resume = () => {
  return (
    <Fragment>
      <div className="dark:bg-[#0ab0c2] m-auto mt-6 py-2 px-6 rounded w-fit dark:hover:bg-[#078795] bg-[#f91071] hover:bg-[#c72c6c] text-white font-bold z-10">
        <a href="/assets/Mehboob-Iqbal-CV.pdf" download="Mehboob-Iqbal-CV.pdf">
          Download CV
        </a>
      </div>
    </Fragment>
  );
};

export default Resume;
