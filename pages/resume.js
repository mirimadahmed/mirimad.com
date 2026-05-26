import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Cursor from "../components/Cursor";
import Header from "../components/Header";
import ProjectResume from "../components/ProjectResume";
import Socials from "../components/Socials";
import Button from "../components/Button";
import { useTheme } from "next-themes";
// Data
import data from "../data/portfolio.json";
const { name, showResume, resume } = data;
import { SITE_URL, DEFAULT_OG_IMAGE } from "../utils/seo";
import { track } from "../utils/posthog";

const Resume = () => {
  const router = useRouter();
  const theme = useTheme();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
    if (!showResume) {
      router.push("/");
    }
  }, []);

  const resumeTitle = `${name} — Resume | Software engineer (Microsoft AI, Intercom)`;
  const resumeDesc =
    resume.description.length > 165
      ? `${resume.description.slice(0, 162)}…`
      : resume.description;

  return (
    <>
      <Head>
        <title>{resumeTitle}</title>
        <meta name="description" content={resumeDesc} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={`${SITE_URL}/resume`} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={`${SITE_URL}/resume`} />
        <meta property="og:title" content={resumeTitle} />
        <meta property="og:description" content={resumeDesc} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:locale" content="en_GB" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={resumeTitle} />
        <meta name="twitter:description" content={resumeDesc} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Head>
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-6 right-6">
          <Button onClick={() => router.push("/edit")} type={"primary"}>
            Edit Resume
          </Button>
        </div>
      )}
      {data.showCursor && <Cursor />}
      <div
        className={`container mx-auto mb-10 ${
          data.showCursor && "cursor-none"
        }`}
      >
        <Header isBlog />
        {mount && (
          <div className="mt-10 w-full flex flex-col items-center">
            <div
              className={`w-full ${
                mount && theme.theme === "dark" ? "bg-slate-800/60 backdrop-blur-sm border border-slate-700/50" : "bg-gray-50 border border-gray-100"
              } max-w-4xl p-10 mob:p-6 desktop:p-16 rounded-2xl shadow-sm`}
            >
              <div className="flex flex-col tablet:flex-row tablet:items-start tablet:justify-between gap-4">
                <div>
                  <h1 className="text-3xl laptop:text-4xl font-bold tracking-tight">{name}</h1>
                  <p className="text-lg laptop:text-xl mt-3 font-medium">{resume.tagline}</p>
                </div>
                <div className="flex flex-wrap gap-2 self-start">
                  <a
                    href="/MIR_IMAD_AHMED_RESUME.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      track("resume_pdf_viewed", {
                        file: "MIR_IMAD_AHMED_RESUME.pdf",
                      })
                    }
                    className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg border border-purple-500/40 text-purple-700 dark:text-purple-200 hover:bg-purple-500/10 transition-all link"
                  >
                    View PDF ↗
                  </a>
                  <a
                    href="/MIR_IMAD_AHMED_RESUME.pdf"
                    download
                    onClick={() =>
                      track("resume_pdf_downloaded", {
                        file: "MIR_IMAD_AHMED_RESUME.pdf",
                        location: "resume_page",
                      })
                    }
                    className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 active:scale-100 transition-all shadow-md shadow-purple-500/20 link"
                  >
                    ↓ Download PDF
                  </a>
                </div>
              </div>
              <p className="w-full tablet:w-4/5 text-base laptop:text-lg mt-5 opacity-70 leading-relaxed">{resume.description}</p>
              <div className="mt-4">
                <Socials />
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold mb-6">Experience</h2>
                <div>
                  {resume.experiences.map(
                    (exp, idx) => (
                      <ProjectResume
                        key={exp.id}
                        dates={exp.dates}
                        type={exp.type}
                        position={exp.position}
                        company={exp.company}
                        bullets={exp.bullets}
                        current={exp.current}
                        isLast={idx === resume.experiences.length - 1}
                      />
                    )
                  )}
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Education</h2>
                <div className="p-4 rounded-xl border border-gray-200 dark:border-slate-700">
                  <h3 className="text-lg font-semibold">{resume.education.universityName}</h3>
                  <p className="text-sm opacity-60 mt-1">
                    {resume.education.universityDate}
                  </p>
                  <p className="text-sm mt-2 opacity-70">
                    {resume.education.universityPara}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Skills</h2>
                <div className="grid grid-cols-1 tablet:grid-cols-3 gap-6">
                  {resume.languages && (
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider opacity-60 mb-3">Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        {resume.languages.map((language, index) => (
                          <span
                            key={index}
                            className="text-xs font-medium px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20"
                          >
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {resume.frameworks && (
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider opacity-60 mb-3">Frameworks</h3>
                      <div className="flex flex-wrap gap-2">
                        {resume.frameworks.map((framework, index) => (
                          <span
                            key={index}
                            className="text-xs font-medium px-3 py-1.5 rounded-full bg-pink-500/10 text-pink-700 dark:text-pink-300 border border-pink-500/20"
                          >
                            {framework}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {resume.others && (
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider opacity-60 mb-3">Cloud, AI & Tools</h3>
                      <div className="flex flex-wrap gap-2">
                        {resume.others.map((other, index) => (
                          <span
                            key={index}
                            className="text-xs font-medium px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20"
                          >
                            {other}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Resume;
