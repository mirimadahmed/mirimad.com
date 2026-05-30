import { useEffect, useState } from "react";
import { track } from "../../utils/posthog";

const roles = ["Senior Software Engineer", "AI Engineer", "Backend Architect", "Systems Builder"];
const typingDelayMs = 90;
const pauseDelayMs = 1300;
const fadeDurationMs = 400;

const openContact = () => {
  track("contact_clicked", { method: "cal_com", location: "hero" });
  window.open("https://cal.com/mirimad", "_blank", "noopener,noreferrer");
};

const Hero = ({ firstName, description }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    if (fading) return;
    if (typed === current) {
      const t = setTimeout(() => setFading(true), pauseDelayMs);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), typingDelayMs);
    return () => clearTimeout(t);
  }, [typed, roleIndex, fading]);

  useEffect(() => {
    if (!fading) return;
    const t = setTimeout(() => {
      setTyped("");
      setFading(false);
      setRoleIndex((p) => (p + 1) % roles.length);
    }, fadeDurationMs);
    return () => clearTimeout(t);
  }, [fading]);

  return (
    <section id="top" className="container mx-auto grid items-center gap-10 px-6 py-16 laptop:grid-cols-2 laptop:py-24">
      <div className="flex flex-col gap-5">
        <span className="inline-flex w-fit items-center gap-2 rounded-full lp-chip px-4 py-1.5 text-xs font-medium uppercase tracking-wide">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
          </span>
          Currently building AI at Microsoft · London
        </span>

        <h1 className="lp-display flex flex-wrap items-center gap-x-4 text-5xl leading-none laptop:text-7xl">
          <span>Hi, I&apos;m</span>
          <span className="lp-accent">{firstName}</span>
          <span className="lp-wave" role="img" aria-label="Waving hand">
            👋
          </span>
        </h1>

        <p className="flex flex-wrap items-center gap-2 text-xl font-medium laptop:text-2xl">
          <span>I&apos;m a</span>
          <span className={`lp-accent font-semibold transition-opacity duration-300 ${fading ? "opacity-0" : "opacity-100"}`} aria-live="polite">
            {typed}
            <span className="ml-0.5 inline-block animate-pulse">|</span>
          </span>
        </p>

        <p className="lp-muted max-w-xl text-base leading-relaxed laptop:text-lg">{description}</p>

        <div className="mt-3 flex flex-wrap gap-4">
          <a
            href="#work"
            className="link inline-flex items-center gap-2 rounded-full lp-invert px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-transform hover:scale-[1.03]"
          >
            View Work →
          </a>
          <button
            type="button"
            onClick={openContact}
            className="link inline-flex items-center gap-2 rounded-full border-2 lp-border px-6 py-3 text-sm font-semibold uppercase tracking-wide lp-hover-chip"
          >
            Get in Touch
          </button>
        </div>
      </div>

      <div className="hidden items-center justify-center laptop:flex">
        <div className="relative h-80 w-80 rounded-full"
          style={{ background: "radial-gradient(circle at 30% 30%, var(--lp-accent-soft), transparent 70%)" }}
        >
          <div className="absolute inset-0 rounded-full border-2 border-dashed" style={{ borderColor: "var(--lp-accent)" }} />
          <img
            src="/images/profile.jpeg"
            alt="Mir Imad Ahmed"
            className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] rounded-full object-cover shadow-lg"
            style={{ objectPosition: "center 25%", boxShadow: "0 12px 40px -12px var(--lp-accent)" }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
