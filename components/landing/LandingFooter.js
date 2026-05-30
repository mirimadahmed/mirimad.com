const LandingFooter = ({ name }) => {
  const year = new Date().getFullYear();
  return (
    <footer className="lp-invert">
      <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-6 py-6 text-sm tablet:flex-row">
        <p className="lp-muted">
          © {year} {name}. All rights reserved.
        </p>
        <p className="lp-muted">Built with Next.js &amp; Tailwind CSS.</p>
      </div>
    </footer>
  );
};

export default LandingFooter;
