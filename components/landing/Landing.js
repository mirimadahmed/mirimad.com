import { useEffect, useState } from "react";
import Nav from "./Nav";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";
import LandingFooter from "./LandingFooter";

const splashName = "MIR IMAD";
const typingDelayMs = 150;
const splashDurationMs = 1900;

const Splash = () => {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (typed.length === splashName.length) return;
    const t = setTimeout(() => setTyped(splashName.slice(0, typed.length + 1)), typingDelayMs);
    return () => clearTimeout(t);
  }, [typed]);

  return (
    <div className="lp-root flex min-h-screen items-center justify-center">
      <span
        className="lp-display lp-accent text-6xl uppercase laptop:text-9xl"
        role="status"
        aria-live="polite"
        aria-label="Mir Imad introduction"
      >
        {typed}
        <span className="animate-pulse">|</span>
      </span>
    </div>
  );
};

const Landing = ({ data }) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), splashDurationMs);
    return () => clearTimeout(t);
  }, []);

  if (showSplash) return <Splash />;

  const firstName = data.name.split(" ").slice(0, 2).join(" ");

  const aboutParagraphs = [
    data.aboutpara,
    "I care about scalable systems, reliability, and products that meaningfully advance how people use AI — from the model layer all the way to the experience people actually touch.",
  ];

  const experiences = data.resume.experiences.slice(0, 5);

  const skillGroups = [
    { title: "Languages", items: data.resume.languages },
    { title: "Frameworks", items: data.resume.frameworks },
    { title: "AI & Infra", items: data.resume.others },
  ];

  return (
    <div className="lp-root min-h-screen w-full">
      <Nav name="Mir" />
      <main className="flex flex-col">
        <Hero firstName={firstName} description={data.resume.description} />
        <About paragraphs={aboutParagraphs} />
        <Experience experiences={experiences} />
        <Skills groups={skillGroups} />
        <Projects />
        <Contact socials={data.socials} />
      </main>
      <LandingFooter name={data.name} />
    </div>
  );
};

export default Landing;
