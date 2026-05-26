import React from "react";
import Socials from "../Socials";
import Link from "next/link";
import Button from "../Button";
import { track } from "../../utils/posthog";

const Footer = ({}) => {
  return (
    <>
      <div className="mt-20 laptop:mt-40 p-2 laptop:p-0">
        <div>
          <h2 className="text-2xl font-bold">Contact.</h2>
          <div className="mt-10">
            <p className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl font-bold leading-tight">
              LET&apos;S WORK
            </p>
            <p className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl font-bold text-gradient leading-tight">
              TOGETHER.
            </p>
            <div className="mt-6">
              <Button
                type="primary"
                onClick={() => {
                  track("contact_clicked", {
                    method: "cal_com",
                    location: "footer",
                  });
                  window.open("https://cal.com/mirimad", "_blank", "noopener,noreferrer");
                }}
              >
                Schedule a call
              </Button>
            </div>
            <div className="mt-8">
              <Socials />
            </div>
          </div>
        </div>
      </div>
      <p className="text-sm font-bold mt-10 laptop:mt-16 p-2 laptop:p-0 opacity-60">
        © {new Date().getFullYear()} · Made with ❤ by{" "}
        <Link href="https://mirimad.com">
          <a className="underline underline-offset-2">Mir Imad</a>
        </Link>
      </p>
    </>
  );
};

export default Footer;
