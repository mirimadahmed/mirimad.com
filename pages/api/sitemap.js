import { getAllPosts } from "../../utils/api";
import { SITE_URL } from "../../utils/seo";
import portfolio from "../../data/portfolio.json";

const urlEntry = (loc, priority, changefreq) => `  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

const handler = (req, res) => {
  const staticUrls = [
    { path: "/", priority: "1.0", changefreq: "weekly" },
    { path: "/resume", priority: "0.9", changefreq: "monthly" },
  ];

  if (portfolio.showBlog) {
    staticUrls.push({
      path: "/blog",
      priority: "0.7",
      changefreq: "monthly",
    });
  }

  const posts = portfolio.showBlog ? getAllPosts(["slug"]) : [];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls
  .map(({ path, priority, changefreq }) =>
    urlEntry(`${SITE_URL}${path === "/" ? "" : path}`, priority, changefreq)
  )
  .join("\n")}
${posts
  .map((post) =>
    urlEntry(
      `${SITE_URL}/blog/${post.slug}`,
      "0.6",
      "monthly"
    )
  )
  .join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  res.status(200).send(body);
};

export default handler;
