import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { GoogleAnalytics } from '@next/third-parties/google';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <GoogleAnalytics gaId="G-34RN3QNNBT" />
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default App;
