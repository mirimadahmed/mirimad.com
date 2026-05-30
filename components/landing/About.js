const stats = [
  { value: "13M+", label: "Daily AI conversations shipped" },
  { value: "30k+", label: "Businesses powered by AI agents" },
  { value: "10+", label: "Years building & scaling software" },
];

const About = ({ paragraphs }) => {
  return (
    <section id="about" className="container mx-auto scroll-mt-24 px-6 py-20">
      <h2 className="mb-10 text-5xl uppercase laptop:text-6xl">
        About <span className="lp-accent">Me</span>
      </h2>

      <div className="grid gap-10 laptop:grid-cols-3">
        <div className="space-y-5 text-base leading-relaxed laptop:col-span-2 laptop:text-lg">
          {paragraphs.map((p, i) => (
            <p key={i} className="lp-muted">
              {p}
            </p>
          ))}
        </div>

        <div className="flex flex-col gap-5">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl lp-panel p-6 shadow-sm">
              <div className="lp-display lp-accent text-5xl">{s.value}</div>
              <div className="lp-muted mt-2 text-sm uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
