const LandingFooter = ({ name }) => {
  const year = new Date().getFullYear();
  return (
    <footer className="px-6 pt-16 pb-10">
      <div className="mx-auto max-w-5xl">
        <div
          className="lp-display select-none whitespace-nowrap text-[14vw] leading-[0.82] tracking-[-0.07em]"
          aria-hidden
        >
          {name.split(" ").slice(0, 2).join(" ")}
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t lp-border pt-6 tablet:flex-row tablet:items-center">
          <p className="lp-mono lp-muted text-xs uppercase tracking-[0.18em]">
            © {year} {name}
          </p>
          <p className="lp-mono lp-muted text-xs uppercase tracking-[0.18em]">
            Built with Next.js · Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
