import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Nav from "../../components/landing/Nav";
import LandingFooter from "../../components/landing/LandingFooter";
import data from "../../data/portfolio.json";
import { ISOToDate } from "../../utils";
import { getAllPosts } from "../../utils/api";
import { SITE_URL, DEFAULT_OG_IMAGE } from "../../utils/seo";

const BLOG_INDEX_TITLE = `Blog | ${data.name}`;
const BLOG_INDEX_DESC =
  "Articles on software engineering, AI, and building products — from Mir Imad Ahmed.";

const Blog = ({ posts }) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!data.showBlog) router.push("/");
  }, [router]);

  const createBlog = () => {
    if (process.env.NODE_ENV === "development") {
      fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }).then(() => router.reload(window.location.pathname));
    } else {
      alert("This thing only works in development mode.");
    }
  };

  const deleteBlog = (slug) => {
    if (process.env.NODE_ENV === "development") {
      fetch("/api/blog", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      }).then(() => router.reload(window.location.pathname));
    } else {
      alert("This thing only works in development mode.");
    }
  };

  if (!data.showBlog) return null;

  return (
    <>
      <Head>
        <title>{BLOG_INDEX_TITLE}</title>
        <meta name="description" content={BLOG_INDEX_DESC} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={`${SITE_URL}/blog`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/blog`} />
        <meta property="og:title" content={BLOG_INDEX_TITLE} />
        <meta property="og:description" content={BLOG_INDEX_DESC} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content={data.name} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={BLOG_INDEX_TITLE} />
        <meta name="twitter:description" content={BLOG_INDEX_DESC} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Head>

      <div className="lp-root min-h-screen w-full">
        <Nav name="Mir" />

        <main>
          <section className="px-6 pt-40 pb-20 tablet:pt-48 tablet:pb-28">
            <div className="mx-auto max-w-5xl">
              <div className="lp-eyebrow mb-8">Blog · Writing</div>
              <h1 className="lp-display text-[3rem] tablet:text-[5rem] laptop:text-[6.5rem]">
                Field notes &amp;
                <br />
                long-form.
              </h1>
              <p className="lp-muted mt-8 max-w-2xl text-lg tablet:text-xl">
                Essays on AI, large-scale systems, and the discipline of
                shipping software that people actually rely on.
              </p>
            </div>
          </section>

          <section className="px-6 pb-32">
            <div className="mx-auto max-w-5xl">
              {posts && posts.length > 0 ? (
                <ul className="grid grid-cols-1 gap-12 tablet:grid-cols-2 laptop:gap-16">
                  {posts.map((post) => (
                    <li key={post.slug} className="relative">
                      <Link href={`/blog/${post.slug}`} passHref>
                        <a className="group block">
                          {post.image && (
                            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border lp-border">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={post.image}
                                alt={post.title}
                                loading="lazy"
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                              />
                            </div>
                          )}
                          <div className="mt-6 flex items-center gap-3">
                            <span className="lp-mono lp-muted text-xs uppercase tracking-[0.18em]">
                              {ISOToDate(post.date)}
                            </span>
                          </div>
                          <h2 className="lp-display mt-3 text-3xl laptop:text-4xl">
                            {post.title}
                          </h2>
                          {post.preview && (
                            <p className="lp-muted mt-3 text-base leading-relaxed laptop:text-lg">
                              {post.preview}
                            </p>
                          )}
                          <span className="lp-arrow-link lp-mono mt-5 inline-flex text-xs uppercase tracking-[0.18em]">
                            Read post →
                          </span>
                        </a>
                      </Link>

                      {process.env.NODE_ENV === "development" && mounted && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            deleteBlog(post.slug);
                          }}
                          className="lp-mono absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white hover:bg-black"
                        >
                          Delete
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="lp-muted text-lg">
                  No posts yet — come back soon.
                </p>
              )}
            </div>
          </section>
        </main>

        <LandingFooter name={data.name} socials={data.socials} />

        {process.env.NODE_ENV === "development" && mounted && (
          <div className="fixed bottom-6 right-6 z-30">
            <button
              type="button"
              onClick={createBlog}
              className="lp-pill lp-pill-primary lp-mono text-xs uppercase tracking-[0.18em]"
            >
              Add new post +
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export async function getStaticProps() {
  const posts = getAllPosts([
    "slug",
    "title",
    "image",
    "preview",
    "author",
    "date",
  ]);

  return { props: { posts: [...posts] } };
}

export default Blog;
