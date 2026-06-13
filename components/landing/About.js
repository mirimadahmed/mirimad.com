const About = ({ paragraphs }) => {
  return (
    <section id="about" className="scroll-mt-24 px-6 py-28 tablet:py-36">
      <div className="mx-auto max-w-5xl">
        <div className="lp-eyebrow mb-8">About · Today</div>

        <h2 className="lp-display text-[2.5rem] tablet:text-[4rem] laptop:text-[5rem]">
          Calm systems.
          <br />
          Quietly intelligent products.
        </h2>

        <div className="mt-12 max-w-3xl space-y-6 text-lg leading-relaxed laptop:text-xl">
          {paragraphs.map((p, i) => (
            <p key={i} className="lp-muted">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
