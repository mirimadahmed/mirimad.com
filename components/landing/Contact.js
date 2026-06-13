import { track } from "../../utils/posthog";

const displayValue = (link) =>
  link.replace(/^mailto:/, "").replace(/^tel:/, "").replace(/^https?:\/\//, "").replace(/\/$/, "");

const Contact = ({ socials }) => {
  const contactLinks = [
    ...socials.map((s) => ({ label: s.title, value: displayValue(s.link), href: s.link })),
    { label: "Location", value: "London, United Kingdom", href: null },
  ];

  const bookCall = () => {
    track("contact_clicked", { method: "cal_com", location: "contact_section" });
    window.open("https://cal.com/mirimad", "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="lp-invert scroll-mt-24 px-6 py-28 tablet:py-36">
      <div className="mx-auto max-w-5xl">
        <div className="lp-eyebrow mb-8">Contact · Always open</div>

        <h2 className="lp-display text-[2.5rem] tablet:text-[4rem] laptop:text-[5rem]">
          Got an idea worth
          <br />
          building? Let&apos;s talk.
        </h2>

        <div className="mt-12 grid gap-12 laptop:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="lp-muted max-w-xl text-lg leading-relaxed laptop:text-xl">
              I&apos;m always happy to chat about AI, scalable systems, or building something
              ambitious together. Grab a slot on my calendar or reach me directly.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={bookCall}
                className="lp-pill lp-pill-primary lp-mono text-xs uppercase tracking-[0.18em]"
              >
                Book a call
              </button>
              <a
                href="mailto:mirimadahmed@outlook.com"
                className="lp-arrow-link lp-mono text-xs uppercase tracking-[0.18em]"
              >
                Email instead →
              </a>
            </div>
          </div>

          <ul className="space-y-6">
            {contactLinks.map((item) => (
              <li key={item.label} className="border-t pt-4" style={{ borderColor: "var(--lp-invert-line)" }}>
                <div className="lp-eyebrow">{item.label}</div>
                {item.href ? (
                  <a
                    href={item.href}
                    {...(item.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    onClick={() => track("contact_link_clicked", { label: item.label })}
                    className="lp-link mt-2 inline-block text-lg"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-2 text-lg">{item.value}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Contact;
