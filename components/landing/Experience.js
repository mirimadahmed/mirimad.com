import Link from "next/link";

const Experience = ({ experiences }) => {
  return (
    <section id="experience" className="lp-invert scroll-mt-24 px-6 py-28 tablet:py-36">
      <div className="mx-auto max-w-5xl">
        <div className="lp-eyebrow mb-8">Experience · 2014—2026</div>

        <h2 className="lp-display text-[2.5rem] tablet:text-[4rem] laptop:text-[5rem]">
          A decade of shipping
          <br />
          things that matter.
        </h2>

        <ol className="mt-16 divide-y" style={{ borderColor: "var(--lp-invert-line)" }}>
          {experiences.map((exp) => (
            <li key={exp.id} className="grid gap-6 py-10 laptop:grid-cols-[1fr_2fr]">
              <div>
                <div className="lp-eyebrow">{exp.dates}</div>
                <h3 className="lp-display mt-3 text-2xl laptop:text-3xl">{exp.position}</h3>
                <p className="lp-muted lp-mono mt-2 text-xs uppercase tracking-[0.18em]">
                  {exp.company} · {exp.type}
                </p>
              </div>
              <ul className="space-y-3 text-base leading-relaxed laptop:text-lg" style={{ color: "var(--lp-invert-fg-soft)" }}>
                {exp.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3">
                    <span aria-hidden className="lp-dot mt-2 flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <Link href="/resume">
          <a className="lp-arrow-link lp-mono mt-12 inline-flex text-xs uppercase tracking-[0.18em]">
            See full résumé →
          </a>
        </Link>
      </div>
    </section>
  );
};

export default Experience;
