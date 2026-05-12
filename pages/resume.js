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
import { name, showResume } from "../data/portfolio.json";
import { resume } from "../data/portfolio.json";
import data from "../data/portfolio.json";
import { SITE_URL, DEFAULT_OG_IMAGE } from "../utils/seo";

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
                mount && theme.theme === "dark" ? "bg-slate-800" : "bg-gray-50"
              } max-w-4xl p-20 mob:p-5 desktop:p-20 rounded-lg shadow-sm`}
            >
              <h1 className="text-3xl font-bold">{name}</h1>
              <p className="text-xl mt-5 font-medium">{resume.tagline}</p>
              <p className="w-4/5 text-xl mt-5 opacity-50">{resume.description}</p>
              <div className="mt-2">
                <Socials />
              </div>
              <div className="mt-5">
                <h2 className="text-2xl font-bold">Experience</h2>

                {resume.experiences.map(
                  ({ id, dates, type, position, bullets }) => (
                    <ProjectResume
                      key={id}
                      dates={dates}
                      type={type}
                      position={position}
                      bullets={bullets}
                    ></ProjectResume>
                  )
                )}
              </div>
              <div className="mt-5">
                <h2 className="text-2xl font-bold">Education</h2>
                <div className="mt-2">
                  <h3 className="text-lg">{resume.education.universityName}</h3>
                  <p className="text-sm opacity-75">
                    {resume.education.universityDate}
                  </p>
                  <p className="text-sm mt-2 opacity-50">
                    {resume.education.universityPara}
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <h2 className="text-2xl font-bold">Skills</h2>
                <div className="flex mob:flex-col desktop:flex-row justify-between">
                  {resume.languages && (
                    <div className="mt-2 mob:mt-5">
                      <h3 className="text-lg">Languages</h3>
                      <ul className="list-disc">
                        {resume.languages.map((language, index) => (
                          <li key={index} className="ml-5 py-2">
                            {language}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {resume.frameworks && (
                    <div className="mt-2 mob:mt-5">
                      <h3 className="text-lg">Frameworks</h3>
                      <ul className="list-disc">
                        {resume.frameworks.map((framework, index) => (
                          <li key={index} className="ml-5 py-2">
                            {framework}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {resume.others && (
                    <div className="mt-2 mob:mt-5">
                      <h3 className="text-lg">Others</h3>
                      <ul className="list-disc">
                        {resume.others.map((other, index) => (
                          <li key={index} className="ml-5 py-2">
                            {other}
                          </li>
                        ))}
                      </ul>
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
