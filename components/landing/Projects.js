import { track } from "../../utils/posthog";

const projects = [
  {
    name: "Microsoft AI",
    category: "Frontier AI · Current",
    description:
      "Bringing Microsoft AI models — text, image, audio, video — to millions of people as part of the Super Intelligence team.",
    highlights: [
      "Productising cutting-edge models into real-world experiences",
      "Model adaptation, productisation, and broad adoption",
    ],
    stack: ["AI", "LLMs", "Model Adaptation", "Scale"],
    url: null,
  },
  {
    name: "Intercom AI Agent",
    category: "Conversational AI",
    description:
      "Large-scale conversational AI infrastructure for chat, email, and voice automation powering 30,000+ businesses worldwide.",
    highlights: [
      "Autonomous, context-aware agents on top of advanced LLMs",
      "Reliable, human-like interactions backed by robust backends",
    ],
    stack: ["Ruby on Rails", "Golang", "TypeScript", "AWS", "RAG"],
    url: "https://www.intercom.com/",
  },
  {
    name: "respond.io AI Messaging",
    category: "Messaging Infra",
    description:
      "AI agent messaging infrastructure supporting 13M+ daily conversations across multiple channels for enterprise customer support.",
    highlights: [
      "Cut response time from 700ms to 100ms; +30% satisfaction",
      "Push delivery optimised from 10s to 2s via batching",
    ],
    stack: ["Node.js", "Golang", "DynamoDB", "SQS", "Redis"],
    url: "https://respond.io/",
  },
  {
    name: "Spacesly",
    category: "Marketplace · Co-Founder",
    description:
      "A premier event-space booking marketplace in Pakistan — architected from scratch and scaled through NIC & NSTP incubations.",
    highlights: [
      "Grew to 10M+ PKR revenue, 100+ customers, 50+ venues",
      "Built & led a 10-person cross-functional team",
    ],
    stack: ["Node.js", "Vue.js", "MySQL", "AWS"],
    url: "https://spacesly.online/",
  },
  {
    name: "Hyyp",
    category: "Web3 · Social Impact",
    description:
      "A social impact network for Web 3.0 users — led product engineering at Nimblebot serving industry leaders and governments.",
    highlights: [
      "Spearheaded the Hyyp mobile application",
      "Scalable architectures for web and mobile",
    ],
    stack: ["React Native", "Node.js", "Web3"],
    url: null,
  },
  {
    name: "Mission Healthcare",
    category: "Healthcare SaaS",
    description:
      "Healthcare portal for families to track vitals, appointments and prescriptions — used by millions of families in Canada.",
    highlights: [
      "Built core flows with Vue.js, Node.js and Jest",
      "Part of a multi-product SaaS suite at Mission.dev",
    ],
    stack: ["Vue.js", "Node.js", "Jest"],
    url: null,
  },
];

const Projects = () => {
  return (
    <section id="work" className="scroll-mt-24 px-6 py-28 tablet:py-36">
      <div className="mx-auto max-w-5xl">
        <div className="lp-eyebrow mb-8">Work · Selected</div>

        <h2 className="lp-display text-[2.5rem] tablet:text-[4rem] laptop:text-[5rem]">
          Where the ideas
          <br />
          have shipped.
        </h2>

        <ul className="mt-16 divide-y lp-border" style={{ borderColor: "var(--lp-line)" }}>
          {projects.map((project) => {
            const Wrapper = project.url ? "a" : "div";
            const wrapperProps = project.url
              ? {
                  href: project.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onClick: () => track("project_clicked", { project: project.name }),
                  className: "link group block",
                }
              : { className: "block" };
            return (
              <li key={project.name} className="border-t lp-border first:border-t-0">
                <Wrapper {...wrapperProps}>
                  <article className="grid gap-6 py-10 laptop:grid-cols-[1fr_2fr] laptop:gap-10">
                    <div>
                      <div className="lp-eyebrow">{project.category}</div>
                      <h3 className="lp-display mt-3 text-3xl laptop:text-4xl">
                        {project.name}
                        {project.url ? (
                          <span className="lp-mono ml-2 align-middle text-base opacity-0 transition-opacity group-hover:opacity-100">
                            →
                          </span>
                        ) : null}
                      </h3>
                    </div>
                    <div>
                      <p className="lp-muted text-base leading-relaxed laptop:text-lg">
                        {project.description}
                      </p>
                      <ul className="mt-4 space-y-2 text-sm leading-relaxed laptop:text-base">
                        {project.highlights.map((h, i) => (
                          <li key={i} className="flex gap-3">
                            <span aria-hidden className="lp-dot mt-2 flex-shrink-0" />
                            <span className="lp-muted">{h}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="lp-mono lp-muted mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs uppercase tracking-[0.15em]">
                        {project.stack.map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Wrapper>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Projects;
