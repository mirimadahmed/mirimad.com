import Link from "next/link";

const Experience = ({ experiences }) => {
  return (
    <section id="experience" className="lp-invert scroll-mt-24 py-20">
      <div className="container mx-auto px-6">
        <h2 className="mb-12 text-5xl uppercase laptop:text-6xl">
          Experi<span className="lp-accent">ence</span>
        </h2>

        <div className="relative space-y-12 laptop:pl-10">
          <span aria-hidden className="absolute left-2 top-2 bottom-2 hidden w-px laptop:block" style={{ background: "var(--lp-accent)", opacity: 0.4 }} />
          {experiences.map((exp) => (
            <article key={exp.id} className="relative">
              <span aria-hidden className="absolute -left-10 top-2 hidden h-4 w-4 rounded-full laptop:block" style={{ background: "var(--lp-accent)" }} />
              <header className="mb-3">
                <h3 className="lp-accent text-2xl uppercase laptop:text-3xl">{exp.position}</h3>
                <p className="lp-muted mt-1 text-sm">
                  <span className="font-semibold" style={{ color: "var(--lp-invert-fg)" }}>
                    {exp.company}
                  </span>
                  {" · "}
                  {exp.dates}
                  {" · "}
                  {exp.type}
                </p>
              </header>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed laptop:text-base" style={{ color: "rgba(245,239,230,0.9)" }}>
                {exp.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <Link href="/resume">
          <a className="link mt-12 inline-flex items-center gap-2 rounded-full border-2 lp-invert-border px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-transform hover:scale-[1.03]">
            See full résumé →
          </a>
        </Link>
      </div>
    </section>
  );
};

export default Experience;
