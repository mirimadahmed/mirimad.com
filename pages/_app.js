import "../styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ThemeProvider } from "next-themes";
import { GoogleAnalytics } from '@next/third-parties/google';
import posthog, { initPostHog } from "../utils/posthog";

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const ph = initPostHog();
    if (!ph) return;

    // Capture the initial pageview.
    ph.capture("$pageview");

    const handleRouteChange = (url) => {
      ph.capture("$pageview", { $current_url: url });
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <GoogleAnalytics gaId="G-34RN3QNNBT" />
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default App;
