import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { track } from "../../utils/posthog";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const openContact = (location) => () => {
  track("contact_clicked", { method: "cal_com", location });
  window.open("https://cal.com/mirimad", "_blank", "noopener,noreferrer");
};

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";
  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={() => {
        const next = isDark ? "light" : "dark";
        setTheme(next);
        track("theme_toggled", { theme: next });
      }}
      className="link flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10"
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      )}
    </button>
  );
};

const Nav = ({ name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 tablet:px-6 tablet:pt-6">
      <div className="mx-auto w-full max-w-5xl">
        <div
          className={`flex items-center justify-between gap-3 rounded-full border lp-border bg-[color:var(--lp-bg)]/85 px-3 py-2 backdrop-blur transition-shadow tablet:px-4 ${
            scrolled ? "shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)]" : ""
          }`}
        >
          <a
            href="#top"
            className="lp-mono ml-2 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em]"
            aria-label="Home"
          >
            <span aria-hidden className="lp-dot" />
            {name}
          </a>

          <nav className="hidden items-center gap-6 tablet:flex" aria-label="Primary">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="lp-mono lp-muted lp-link text-xs uppercase tracking-[0.18em]"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden tablet:block">
              <ThemeToggle />
            </div>
            <button
              type="button"
              onClick={openContact("nav")}
              className="lp-pill lp-pill-primary lp-mono text-xs uppercase tracking-[0.18em]"
            >
              Book a call
            </button>
            <button
              type="button"
              onClick={() => setIsOpen((p) => !p)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              className="link relative ml-1 flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 tablet:hidden"
            >
              <span aria-hidden className={`lp-bar ${isOpen ? "rotate-45 translate-y-0" : "-translate-y-1"}`} />
              <span aria-hidden className={`lp-bar ${isOpen ? "-rotate-45 translate-y-0" : "translate-y-1"}`} />
            </button>
          </div>
        </div>

        {isOpen && (
          <nav
            className="mt-2 flex flex-col gap-1 rounded-3xl border lp-border bg-[color:var(--lp-bg)]/95 p-3 backdrop-blur tablet:hidden"
            aria-label="Mobile"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setIsOpen(false)}
                className="lp-mono rounded-2xl px-3 py-2 text-xs uppercase tracking-[0.18em] hover:bg-black/5 dark:hover:bg-white/10"
              >
                {l.label}
              </a>
            ))}
            <div className="flex items-center justify-end px-2 py-1">
              <ThemeToggle />
            </div>
          </nav>
        )}
      </div>

      <style jsx>{`
        .lp-bar {
          position: absolute;
          height: 1.5px;
          width: 16px;
          border-radius: 9999px;
          background: var(--lp-fg);
          transition: all 0.25s ease;
        }
      `}</style>
    </header>
  );
};

export default Nav;
