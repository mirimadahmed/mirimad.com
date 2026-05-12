import React from "react";

const ProjectResume = ({ dates, type, position, bullets }) => {

  return (
    <div className="mt-5 w-full flex mob:flex-col desktop:flex-row justify-between">
      <div className="text-lg w-2/5">
        <p className="font-semibold">{dates}</p>
        <p className="text-sm opacity-50">{type}</p>
      </div>
      <div className="w-3/5">
        <h3 className="text-lg font-bold">{position}</h3>
        {bullets && bullets.length > 0 && (
          <ul className="list-disc">
            {bullets.map((bullet, index) => (
              <li key={index} className="text-sm my-1 opacity-70">
                {bullet}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProjectResume;
