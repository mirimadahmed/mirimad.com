const Skills = ({ groups }) => {
  return (
    <section id="skills" className="scroll-mt-24 px-6 py-28 tablet:py-36">
      <div className="mx-auto max-w-5xl">
        <div className="lp-eyebrow mb-8">Stack · Tools of the trade</div>

        <h2 className="lp-display text-[2.5rem] tablet:text-[4rem] laptop:text-[5rem]">
          The toolkit behind
          <br />
          the work.
        </h2>

        <div className="mt-16 grid gap-10 tablet:grid-cols-3">
          {groups.map((group) => (
            <div key={group.title} className="border-t lp-border pt-6">
              <h3 className="lp-eyebrow mb-5">{group.title}</h3>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="lp-mono text-base">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
