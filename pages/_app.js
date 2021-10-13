import Head from "next/head";

import { I18nProvider } from "../store/i18n";
import { NotificationProvider } from "../store/notificatons";
import { NavigationProvider } from "../store/navigation";

import "../styles/index.css";
import Layout from "../components/layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <I18nProvider>
      <NotificationProvider>
        <NavigationProvider>
          <Layout>
            <Head>
              <title>AV. | Portfolio & Blog</title>
              <meta description="Software developer..." />
              <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
              />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
          </Layout>
        </NavigationProvider>
      </NotificationProvider>
    </I18nProvider>
  );
}

export default MyApp;
