const Skills = ({ groups }) => {
  return (
    <section id="skills" className="container mx-auto scroll-mt-24 px-6 py-20">
      <h2 className="mb-12 text-5xl uppercase laptop:text-6xl">
        Skills &amp; <span className="lp-accent">Tools</span>
      </h2>

      <div className="grid gap-6 tablet:grid-cols-2 laptop:grid-cols-3">
        {groups.map((group) => (
          <div key={group.title} className="rounded-2xl lp-panel p-6 shadow-sm">
            <h3 className="lp-accent mb-4 text-2xl uppercase">{group.title}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="lp-soft-chip rounded-full px-3 py-1 text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
