import { track } from "../../utils/posthog";

const displayValue = (link) => link.replace(/^mailto:/, "").replace(/^tel:/, "").replace(/^https?:\/\//, "").replace(/\/$/, "");

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
    <section id="contact" className="lp-invert scroll-mt-24 py-20">
      <div className="container mx-auto grid gap-10 px-6 laptop:grid-cols-2">
        <div>
          <h2 className="text-5xl uppercase laptop:text-6xl">
            Let&apos;s <span className="lp-accent">Talk</span>
          </h2>
          <p className="lp-muted mt-6 max-w-xl text-base leading-relaxed laptop:text-lg">
            I&apos;m always happy to chat about AI, scalable systems, or building something ambitious together. Grab a slot
            on my calendar or reach out directly — I&apos;ll get back to you.
          </p>
          <button
            type="button"
            onClick={bookCall}
            className="link mt-8 inline-flex items-center gap-3 rounded-full lp-accent-bg px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-transform hover:scale-[1.03]"
          >
            Book a Call →
          </button>
        </div>

        <ul className="space-y-5">
          {contactLinks.map((item) => (
            <li key={item.label} className="border-b lp-invert-border pb-4 last:border-0">
              <div className="lp-accent text-xs uppercase tracking-widest">{item.label}</div>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  onClick={() => track("contact_link_clicked", { label: item.label })}
                  className="link lp-link mt-1 inline-block text-lg"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-1 text-lg">{item.value}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Contact;
