import App from "next/app";
import { NextIntlProvider } from "next-intl";
import "../styles/global.css";

const MyApp = ({ Component, pageProps }) => (
  <NextIntlProvider messages={pageProps.messages}>
    <Component {...pageProps} />
  </NextIntlProvider>
);
MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};
export default MyApp;
