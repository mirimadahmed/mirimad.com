import { track } from "../../utils/posthog";

const stats = [
  { value: "13M+", label: "Daily AI conversations shipped" },
  { value: "30k+", label: "Businesses powered by AI agents" },
  { value: "10+", label: "Years building & scaling software" },
];

const openContact = () => {
  track("contact_clicked", { method: "cal_com", location: "hero" });
  window.open("https://cal.com/mirimad", "_blank", "noopener,noreferrer");
};

const Hero = ({ firstName, description }) => {
  return (
    <section id="top" className="scroll-mt-24 px-6 pt-36 pb-24 tablet:pt-44 laptop:pt-52 laptop:pb-32">
      <div className="mx-auto max-w-5xl">
        <div className="lp-eyebrow mb-8 flex items-center gap-2">
          <span aria-hidden className="lp-dot" />
          Mir Imad · Senior Software Engineer · Microsoft AI
        </div>

        <h1 className="lp-display text-[3rem] leading-[0.95] tablet:text-[5rem] laptop:text-[6.75rem]">
          Engineering AI of
          <br />
          the future,
          <br />
          one system at a time.
        </h1>

        <p className="lp-muted mt-10 max-w-2xl text-lg leading-relaxed laptop:text-xl">
          {description}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-5">
          <button
            type="button"
            onClick={openContact}
            className="lp-pill lp-pill-primary lp-mono text-xs uppercase tracking-[0.18em]"
          >
            Book a call
          </button>
          <a
            href="#work"
            className="lp-arrow-link lp-mono text-xs uppercase tracking-[0.18em]"
          >
            See selected work →
          </a>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-y-10 border-t lp-border pt-10 tablet:grid-cols-3 tablet:gap-x-10">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="lp-display text-5xl laptop:text-6xl">{s.value}</div>
              <div className="lp-eyebrow mt-3">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
