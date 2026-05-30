import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { track } from "../../utils/posthog";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

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
      className="link flex h-10 w-10 items-center justify-center rounded-full lp-panel transition-transform hover:scale-105"
    >
      <img className="h-5 w-5" alt="" aria-hidden="true" src={`/images/${isDark ? "moon.svg" : "sun.svg"}`} />
    </button>
  );
};

const Nav = ({ name }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="lp-glass sticky top-0 z-40 w-full border-b lp-border">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a href="#top" className="lp-display lp-accent text-2xl uppercase tracking-wide link" aria-label="Home">
          {name}
        </a>

        <nav className="hidden items-center gap-7 tablet:flex" aria-label="Primary">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="link lp-link text-sm font-medium uppercase tracking-wide">
              {l.label}
            </a>
          ))}
          <Link href="/resume">
            <a className="link lp-link text-sm font-medium uppercase tracking-wide">Résumé</a>
          </Link>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 tablet:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen((p) => !p)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            className="link relative flex h-10 w-10 items-center justify-center"
          >
            <span className={`lp-accent-bar ${isOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"}`} />
            <span className={`lp-accent-bar ${isOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"}`} />
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="container mx-auto flex flex-col gap-1 px-6 pb-4 tablet:hidden" aria-label="Mobile">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setIsOpen(false)}
              className="link lp-hover-chip rounded-lg px-3 py-2 text-base font-medium uppercase tracking-wide"
            >
              {l.label}
            </a>
          ))}
          <Link href="/resume">
            <a className="link lp-hover-chip rounded-lg px-3 py-2 text-base font-medium uppercase tracking-wide">
              Résumé
            </a>
          </Link>
        </nav>
      )}

      <style jsx>{`
        .lp-accent-bar {
          position: absolute;
          height: 3px;
          width: 24px;
          border-radius: 9999px;
          background: var(--lp-accent);
          transition: all 0.3s ease;
        }
      `}</style>
    </header>
  );
};

export default Nav;
