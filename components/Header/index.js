import { Popover } from "@headlessui/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import { track } from "../../utils/posthog";
// Local Data
import data from "../../data/portfolio.json";

const openContact = (location) => {
  track("contact_clicked", { method: "cal_com", location });
  window.open("https://cal.com/mirimad", "_blank", "noopener,noreferrer");
};

const Header = ({ handleWorkScroll, handleAboutScroll, isBlog }) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { name, showBlog, showResume } = data;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="block tablet:hidden mt-5">
        <Popover>
          {({ open }) => (
          <>
            <div className="flex items-center justify-between p-2 laptop:p-0">
              <Link href="/">
                <a className="font-medium p-2 laptop:p-0 link">{name}.</a>
              </Link>

              <div className="flex items-center">
                {mounted && data.darkMode && (
                  <Button
                    aria-label="Toggle color theme"
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                  >
                    <img
                      className="h-6"
                      alt=""
                      aria-hidden="true"
                      src={`/images/${
                        theme === "dark" ? "moon.svg" : "sun.svg"
                      }`}
                    ></img>
                  </Button>
                )}

                <Popover.Button aria-label={open ? "Close navigation menu" : "Open navigation menu"}>
                  <img
                    className="h-5"
                    alt=""
                    aria-hidden="true"
                    src={`/images/${
                      !mounted
                        ? "menu-white.svg"
                        : !open
                        ? theme === "dark"
                          ? "menu-white.svg"
                          : "menu.svg"
                        : theme === "light"
                        ? "cancel.svg"
                        : "cancel-white.svg"
                    }`}
                  ></img>
                </Popover.Button>
              </div>
            </div>
            <Popover.Panel
              className={`absolute right-0 z-10 w-11/12 p-4 ${
                theme === "dark" ? "bg-slate-800" : "bg-white"
              } shadow-md rounded-md`}
            >
              {!isBlog ? (
                <div className="grid grid-cols-1">
                  <Button onClick={handleAboutScroll}>About</Button>
                  {showBlog && (
                    <Button onClick={() => router.push("/blog")}>Blog</Button>
                  )}
                  {showResume && (
                    <Button
                      onClick={() => router.push("/resume")}
                    >
                      Resume
                    </Button>
                  )}

                  <Button
                    onClick={() => openContact("header_nav")}
                  >
                    Contact
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1">
                  <Button onClick={() => router.push("/")} classes="first:ml-1">
                    Home
                  </Button>
                  {showBlog && (
                    <Button onClick={() => router.push("/blog")}>Blog</Button>
                  )}
                  {showResume && (
                    <Button
                      onClick={() => router.push("/resume")}
                      classes="first:ml-1"
                    >
                      Resume
                    </Button>
                  )}

                  <Button
                    onClick={() => openContact("header_nav")}
                  >
                    Contact
                  </Button>
                </div>
              )}
            </Popover.Panel>
          </>
        )}
        </Popover>
      </div>
      <div className="mt-10 hidden tablet:block sticky top-0 z-10 dark:text-white">
        <div className="absolute inset-y-0 -left-[50vw] -right-[50vw] backdrop-blur-md bg-white/70 dark:bg-black/40 border-b border-black/5 dark:border-white/5" />
        <div className="relative flex flex-row items-center justify-between py-2">
        <Link href="/">
          <a className="font-medium cursor-pointer mob:p-2 laptop:p-0">{name}.</a>
        </Link>
        {!isBlog ? (
          <div className="flex">
            <Button onClick={handleAboutScroll}>About</Button>
            {showBlog && (
              <Button onClick={() => router.push("/blog")}>Blog</Button>
            )}
            {showResume && (
              <Button
                onClick={() => router.push("/resume")}
                classes="first:ml-1"
              >
                Resume
              </Button>
            )}

            <Button onClick={() => openContact("header_nav")}>
              Contact
            </Button>
            {mounted && theme && data.darkMode && (
              <Button
                aria-label="Toggle color theme"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <img
                  className="h-6"
                  alt=""
                  aria-hidden="true"
                  src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
                ></img>
              </Button>
            )}
          </div>
        ) : (
          <div className="flex">
            <Button onClick={() => router.push("/")}>Home</Button>
            {showBlog && (
              <Button onClick={() => router.push("/blog")}>Blog</Button>
            )}
            {showResume && (
              <Button
                onClick={() => router.push("/resume")}
                classes="first:ml-1"
              >
                Resume
              </Button>
            )}

            <Button onClick={() => openContact("header_nav")}>
              Contact
            </Button>

            {mounted && theme && data.darkMode && (
              <Button
                aria-label="Toggle color theme"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <img
                  className="h-6"
                  alt=""
                  aria-hidden="true"
                  src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
                ></img>
              </Button>
            )}
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default Header;
