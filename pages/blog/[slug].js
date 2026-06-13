import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Nav from "../../components/landing/Nav";
import LandingFooter from "../../components/landing/LandingFooter";
import ContentSection from "../../components/ContentSection";
import BlogEditor from "../../components/BlogEditor";
import data from "../../data/portfolio.json";
import { ISOToDate } from "../../utils";
import { getAllPosts, getPostBySlug } from "../../utils/api";
import { SITE_URL, absUrl } from "../../utils/seo";

const BlogPost = ({ post }) => {
  const [showEditor, setShowEditor] = useState(false);
  const router = useRouter();

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const ogImage = absUrl(post.image);
  const description =
    post.preview && post.preview.length > 160
      ? `${post.preview.slice(0, 157)}…`
      : post.preview || post.tagline;
  const pageTitle = `${post.title} | ${data.name} — Blog`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content={data.name} />
        {post.date && (
          <meta property="article:published_time" content={post.date} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      <div className="lp-root min-h-screen w-full">
        <Nav name="Mir" />

        <main>
          <article>
            <header className="px-6 pt-40 pb-12 tablet:pt-48 tablet:pb-16">
              <div className="mx-auto max-w-3xl">
                <Link href="/blog" passHref>
                  <a className="lp-arrow-link lp-mono inline-flex text-xs uppercase tracking-[0.18em]">
                    ← All posts
                  </a>
                </Link>
                <div className="lp-mono lp-muted mt-10 text-xs uppercase tracking-[0.18em]">
                  {ISOToDate(post.date)}
                </div>
                <h1 className="lp-display mt-4 text-[2.5rem] tablet:text-[4rem] laptop:text-[5rem]">
                  {post.title}
                </h1>
                {post.tagline && (
                  <p className="lp-muted mt-6 max-w-2xl text-lg tablet:text-xl">
                    {post.tagline}
                  </p>
                )}
              </div>
            </header>

            {post.image && (
              <div className="px-6">
                <div className="mx-auto max-w-4xl">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border lp-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="px-6 pt-12 pb-24">
              <div className="mx-auto max-w-3xl">
                <ContentSection content={post.content} />
              </div>
            </div>

            <div className="px-6 pb-24">
              <div className="mx-auto flex max-w-3xl items-center justify-between border-t lp-border pt-8">
                <Link href="/blog" passHref>
                  <a className="lp-arrow-link lp-mono text-xs uppercase tracking-[0.18em]">
                    ← Back to all posts
                  </a>
                </Link>
                <a
                  href="https://cal.com/mirimad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lp-pill lp-pill-primary lp-mono text-xs uppercase tracking-[0.18em]"
                >
                  Book a call
                </a>
              </div>
            </div>
          </article>
        </main>

        <LandingFooter name={data.name} socials={data.socials} />

        {process.env.NODE_ENV === "development" && (
          <div className="fixed bottom-6 right-6 z-30">
            <button
              type="button"
              onClick={() => setShowEditor(true)}
              className="lp-pill lp-pill-primary lp-mono text-xs uppercase tracking-[0.18em]"
            >
              Edit this post
            </button>
          </div>
        )}

        {showEditor && (
          <BlogEditor
            post={post}
            close={() => setShowEditor(false)}
            refresh={() => router.reload(window.location.pathname)}
          />
        )}
      </div>
    </>
  );
};

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    "date",
    "slug",
    "preview",
    "title",
    "tagline",
    "image",
    "content",
  ]);

  return { props: { post: { ...post } } };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export default BlogPost;
