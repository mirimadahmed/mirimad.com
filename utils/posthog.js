import posthog from "posthog-js";

let initialized = false;

export const initPostHog = () => {
  if (typeof window === "undefined") return null;
  if (initialized) return posthog;

  const key = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  if (!key) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[PostHog] NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is not set — analytics disabled."
      );
    }
    return null;
  }

  posthog.init(key, {
    api_host:
      process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: false,
    capture_pageleave: true,
    loaded: (ph) => {
      if (process.env.NODE_ENV === "development") ph.debug(false);
    },
  });
  initialized = true;
  return posthog;
};

export const track = (event, properties = {}) => {
  if (typeof window === "undefined") return;
  try {
    if (!initialized) initPostHog();
    posthog.capture(event, properties);
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[PostHog] capture failed", e);
    }
  }
};

export default posthog;
