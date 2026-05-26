import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { track } from "../../utils/posthog";

const ServiceCard = ({ name, description, icon }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState();

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div
      onClick={() => track("service_card_clicked", { service: name })}
      className={`group relative w-full p-6 mob:p-7 rounded-2xl border transition-all ease-out duration-300 ${
        mounted && theme === "dark"
          ? "border-slate-800 hover:border-purple-500/60 hover:bg-slate-800/40"
          : "border-gray-200 hover:border-purple-500/60 hover:bg-white"
      } hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10 link`}
    >
      {icon && (
        <div className="text-3xl mb-4 inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500/15 to-pink-500/15 border border-purple-500/20">
          <span>{icon}</span>
        </div>
      )}
      <h3 className="text-xl laptop:text-2xl font-bold tracking-tight">
        {name ? name : "Heading"}
      </h3>
      <p className="mt-3 opacity-60 text-base laptop:text-lg leading-relaxed">
        {description ? description : ""}
      </p>
    </div>
  );
};

export default ServiceCard;
