// arveselovski.com/about
import Head from "next/head";

import siteConf from "../data/config.json";
import { readAbout } from "../lib/api-utils";

import Content from "../components/about/Content";

export default function About({ content }) {
  return (
    <>
      <Head>
        <title>About | {siteConf.name}</title>
        <meta description="Software developer..." />
      </Head>

      <div className="container content-container">
        <Content content={content} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const content = await readAbout();

  return {
    props: {
      content,
    },
  };
}
