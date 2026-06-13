import { track } from "../../utils/posthog";

const PLATFORM_LABEL = {
  youtube: "YouTube",
  tiktok: "TikTok",
  instagram: "Instagram",
};

const extractYouTubeId = (url) => {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/embed\/)([\w-]{11})/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return m[1];
  }
  return null;
};

const resolveThumbnail = (video) => {
  if (video.thumbnail) return video.thumbnail;
  if (video.platform === "youtube") {
    const id = extractYouTubeId(video.url);
    if (id) return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  }
  return null;
};

const VideoCard = ({ video }) => {
  const platformLabel = PLATFORM_LABEL[video.platform] || video.platform;
  const thumb = resolveThumbnail(video);

  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("video_clicked", { platform: video.platform, id: video.id })}
      className="group flex flex-col"
    >
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl border lp-border bg-black">
        {thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb}
            alt={video.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[color:var(--lp-fg)] p-6 text-center">
            <div>
              <div className="lp-eyebrow" style={{ color: "rgba(247,245,242,0.65)" }}>
                {platformLabel}
              </div>
              <div
                className="lp-display mt-3 text-2xl leading-tight"
                style={{ color: "var(--lp-bg)" }}
              >
                {video.title}
              </div>
            </div>
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-between">
          <span className="lp-mono rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur">
            {platformLabel}
          </span>
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black transition-transform duration-300 group-hover:scale-110"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <p className="text-base leading-snug laptop:text-lg">{video.title}</p>
        <span className="lp-mono lp-muted whitespace-nowrap text-xs uppercase tracking-[0.16em]">
          {video.posted}
        </span>
      </div>
    </a>
  );
};

const Lately = ({ videos, youtubeUrl }) => {
  if (!videos || videos.length === 0) return null;

  return (
    <section id="lately" className="scroll-mt-24 px-6 py-28 tablet:py-36">
      <div className="mx-auto max-w-5xl">
        <div className="lp-eyebrow mb-8">Lately · Talking about the craft</div>

        <div className="grid gap-8 tablet:grid-cols-[2fr_1fr] tablet:items-end">
          <h2 className="lp-display text-[2.5rem] tablet:text-[4rem] laptop:text-[5rem]">
            Notes from the
            <br />
            field, in motion.
          </h2>
          {youtubeUrl && (
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("video_clicked", { platform: "youtube", id: "channel" })}
              className="lp-arrow-link lp-mono justify-self-start text-xs uppercase tracking-[0.18em] tablet:justify-self-end"
            >
              Subscribe on YouTube →
            </a>
          )}
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-8 tablet:grid-cols-2 laptop:grid-cols-4">
          {videos.map((video) => (
            <li key={video.id}>
              <VideoCard video={video} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Lately;
