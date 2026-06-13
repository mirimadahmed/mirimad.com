/** Canonical site origin — no trailing slash */
export const SITE_URL = "https://mirimad.com";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-image.png`;

export const absUrl = (path) => {
  if (!path) return SITE_URL;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
};

export const buildPersonJsonLd = ({ name, description, sameAs }) =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    description,
    url: SITE_URL,
    image: DEFAULT_OG_IMAGE,
    jobTitle: "Member of Technical Staff",
    worksFor: {
      "@type": "Organization",
      name: "Microsoft",
      url: "https://www.microsoft.com",
    },
    sameAs: sameAs.filter(Boolean),
  });
