import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { GoogleAnalytics } from '@next/third-parties/google';
import Intercom from '@intercom/messenger-js-sdk';

const App = ({ Component, pageProps }) => {
  Intercom({
    app_id: 'xlmcjj4v',
  });
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
