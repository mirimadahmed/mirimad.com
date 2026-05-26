import React from "react";

const ProjectResume = ({ dates, type, position, company, bullets, current, isLast }) => {
  return (
    <div className="relative pl-8 mob:pl-10 pb-10 last:pb-0">
      {/* Vertical line */}
      {!isLast && (
        <span
          aria-hidden
          className="absolute left-[7px] mob:left-[9px] top-3 bottom-0 w-px bg-gradient-to-b from-purple-500/60 via-gray-300 dark:via-gray-700 to-transparent"
        />
      )}
      {/* Dot */}
      <span
        aria-hidden
        className={`absolute left-0 top-1.5 h-4 w-4 mob:h-[18px] mob:w-[18px] rounded-full border-2 ${
          current
            ? "border-purple-500 bg-purple-500 shadow-[0_0_0_4px_rgba(168,85,247,0.18)] animate-pulse"
            : "border-gray-400 dark:border-gray-600 bg-white dark:bg-slate-800"
        }`}
      />

      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-lg laptop:text-xl font-bold leading-tight">
          {position}
          {company && (
            <span className="opacity-60 font-medium"> · {company}</span>
          )}
        </h3>
        {current && (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/30">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
            Current
          </span>
        )}
      </div>

      <p className="mt-1 text-sm opacity-60">
        <span className="font-medium">{dates}</span>
        {type && <span> · {type}</span>}
      </p>

      {bullets && bullets.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {bullets.map((bullet, index) => (
            <li
              key={index}
              className="text-sm laptop:text-[15px] leading-relaxed opacity-80 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-purple-500/60"
            >
              {bullet}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectResume;
