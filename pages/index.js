import Head from "next/head";
import Cursor from "../components/Cursor";
import Landing from "../components/landing/Landing";

// Local Data
import data from "../data/portfolio.json";
import { SITE_URL, DEFAULT_OG_IMAGE, buildPersonJsonLd } from "../utils/seo";

const HOME_TITLE =
  "Mir Imad Ahmed | Member of Technical Staff, Microsoft AI — Portfolio";

const HOME_DESCRIPTION =
  "Mir Imad Ahmed is a Member of Technical Staff on the Super Intelligence team at Microsoft AI (London). Previously: Product Engineer on Intercom's AI Agent Team; Senior AI Engineer at respond.io (13M+ daily conversations). AI, LLMs, Ruby on Rails, Go, TypeScript, AWS.";

export default function Home() {
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
        <meta name="theme-color" content="#0a0e1a" />

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

      <Landing data={data} />
    </div>
  );
}
