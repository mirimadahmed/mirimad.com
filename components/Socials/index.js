import React from "react";
import Button from "../Button";
import { track } from "../../utils/posthog";

import yourData from "../../data/portfolio.json";

const Socials = ({ className }) => {
  return (
    <div className={`${className} flex flex-wrap mob:flex-nowrap link`}>
      {yourData.socials.map((social, index) => (
        <Button
          key={index}
          onClick={() => {
            track("social_clicked", {
              network: social.title,
              link: social.link,
            });
            window.open(social.link);
          }}
        >
          {social.title}
        </Button>
      ))}
    </div>
  );
};

export default Socials;
