import Head from "next/head";
import { AppProps } from "next/app";
import { Provider as AuthProvider } from "next-auth/client";

import siteConf from "../data/config.json";
import { I18nProvider } from "../store/i18n";
import { NotificationProvider } from "../store/notificatons";
import { NavigationProvider } from "../store/navigation";

import "../styles/index.css";
import "../styles/admin.css";
import Layout from "../components/layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider session={pageProps.session}>
      <I18nProvider>
        <NotificationProvider>
          <NavigationProvider>
            <Layout>
              <Head>
                <title>{siteConf.name}</title>
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
    </AuthProvider>
  );
}

export default MyApp;
