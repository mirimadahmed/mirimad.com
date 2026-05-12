import { useRef } from "react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import Footer from "../components/Footer";
import Head from "next/head";
import Button from "../components/Button";
import Link from "next/link";
import Cursor from "../components/Cursor";

// Local Data
import data from "../data/portfolio.json";
import {
  SITE_URL,
  DEFAULT_OG_IMAGE,
  buildPersonJsonLd,
} from "../utils/seo";

const HOME_TITLE =
  "Mir Imad Ahmed | Senior Software Engineer, Microsoft AI — Portfolio";

const HOME_DESCRIPTION =
  "Mir Imad Ahmed is a Senior Software Engineer on the Super Intelligence team at Microsoft AI (London). Previously: Product Engineer on Intercom's AI Agent Team; Senior AI Engineer at respond.io (13M+ daily conversations). AI, LLMs, Ruby on Rails, Go, TypeScript, AWS.";

export default function Home() {
  // Ref
  const workRef = useRef();
  const aboutRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();

  // Handling Scroll
  const handleWorkScroll = () => {
    window.scrollTo({
      top: workRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleAboutScroll = () => {
    window.scrollTo({
      top: aboutRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      {data.showCursor && <Cursor />}
      <Head>
        <title>{HOME_TITLE}</title>
        <meta name="description" content={HOME_DESCRIPTION} />
        <meta
          name="keywords"
          content="Mir Imad Ahmed, Microsoft AI, AI engineer, conversational AI, LLM, RAG, Intercom, respond.io, Ruby on Rails, Golang, Go, TypeScript, React, AWS, microservices, London, software engineer portfolio"
        />
        <meta name="author" content={data.name} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <meta name="googlebot" content="index,follow" />
        <meta name="theme-color" content="#0f172a" />

        <link rel="canonical" href={SITE_URL + "/"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Mir Imad Ahmed" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:url" content={SITE_URL + "/"} />
        <meta property="og:title" content={HOME_TITLE} />
        <meta property="og:description" content={HOME_DESCRIPTION} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content={`${data.name} — portfolio and resume`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={HOME_TITLE} />
        <meta name="twitter:description" content={HOME_DESCRIPTION} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: buildPersonJsonLd({
              name: data.name,
              description: HOME_DESCRIPTION,
              sameAs: data.socials
                .map((s) => s.link)
                .filter(
                  (link) =>
                    typeof link === "string" &&
                    (link.startsWith("https://") || link.startsWith("http://"))
                ),
            }),
          }}
        />
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10">
        <Header
          handleWorkScroll={handleWorkScroll}
          handleAboutScroll={handleAboutScroll}
        />
        <div className="laptop:mt-20 mt-10">
          <div className="mt-5">
            <p
              ref={textOne}
              className="text-2xl tablet:text-4xl laptop:text-5xl laptopl:text-6xl p-1 tablet:p-2 text-bold w-4/5 mob:w-full laptop:w-4/5"
            >
              {data.headerTaglineOne}
            </p>
            <h1
              ref={textTwo}
              className="text-2xl tablet:text-4xl laptop:text-5xl laptopl:text-6xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineTwo}
            </h1>
            <h2
              ref={textThree}
              className="text-2xl tablet:text-4xl laptop:text-5xl laptopl:text-6xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineThree}
            </h2>
            <h2
              ref={textFour}
              className="text-2xl tablet:text-4xl laptop:text-5xl laptopl:text-6xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineFour}
            </h2>
          </div>

          <Socials className="mt-2 laptop:mt-5" />
        </div>
        {/* <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={workRef}>
          <h1 className="text-2xl text-bold">Work.</h1>

          <div className="mt-5 laptop:mt-10 grid grid-cols-1 tablet:grid-cols-2 gap-4">
            {data.projects.map((project) => (
              <WorkCard
                key={project.id}
                img={project.imageSrc}
                name={project.title}
                description={project.description}
                onClick={() => window.open(project.url)}
              />
            ))}
          </div>
        </div> */}

        {/* Tech Stack Section */}
        <div className="mt-20 laptop:mt-40 p-2 laptop:p-0">
          <h2 className="text-2xl text-bold mb-8">Tech Stack.</h2>
          <div className="grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 gap-4">
            {["Ruby on Rails", "Golang", "TypeScript", "React", "AWS", "Redis", "Docker", "LLMs & RAG", "Terraform", "Node.js", "Microservices", "PostgreSQL"].map((tech, index) => (
              <div
                key={index}
                className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-200 text-center font-medium"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 laptop:mt-40 p-2 laptop:p-0">
          <h2 className="tablet:m-10 text-2xl text-bold">Services.</h2>
          <div className="mt-5 tablet:m-10 grid grid-cols-1 laptop:grid-cols-2 gap-6">
            {data.services.map((service, index) => (
              <ServiceCard
                key={index}
                name={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
        {/* This button should not go into production */}
        {process.env.NODE_ENV === "development" && (
          <div className="fixed bottom-5 right-5">
            <Link href="/edit">
              <Button type="primary">Edit Data</Button>
            </Link>
          </div>
        )}
        <section
          className="mt-10 laptop:mt-40 p-2 laptop:p-0"
          ref={aboutRef}
          aria-labelledby="about-heading"
        >
          <h2 id="about-heading" className="tablet:m-10 text-2xl text-bold">
            About.
          </h2>
          <p className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5">
            {data.aboutpara}
          </p>
        </section>
        <Footer />
      </div>
    </div>
  );
}
