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
    <section id="work" className="container mx-auto scroll-mt-24 px-6 py-20">
      <h2 className="mb-12 text-5xl uppercase laptop:text-6xl">
        Selected <span className="lp-accent">Work</span>
      </h2>

      <div className="grid gap-6 tablet:grid-cols-2">
        {projects.map((project) => {
          const Wrapper = project.url ? "a" : "div";
          const wrapperProps = project.url
            ? {
                href: project.url,
                target: "_blank",
                rel: "noopener noreferrer",
                onClick: () => track("project_clicked", { project: project.name }),
                className: "link",
              }
            : {};
          return (
            <Wrapper key={project.name} {...wrapperProps}>
              <article className="flex h-full flex-col rounded-2xl lp-panel p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-3">
                  <p className="lp-accent text-xs uppercase tracking-widest">{project.category}</p>
                  <h3 className="mt-1 text-3xl uppercase">{project.name}</h3>
                </div>
                <p className="lp-muted mb-4 text-base leading-relaxed">{project.description}</p>
                <ul className="lp-muted mb-5 list-disc space-y-1 pl-5 text-sm">
                  {project.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="lp-soft-chip rounded-full px-3 py-1 text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            </Wrapper>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
