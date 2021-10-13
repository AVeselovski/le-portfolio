// arveselovski.com/about
import Head from "next/head";
import { useContext } from "react";

import siteConf from "../data/config.json";
import { readAbout } from "../lib/api-utils";
import I18nContext from "../store/i18n";

import Content from "../components/about/Content";

export default function About({ content, hardSkills, softSkills }) {
  const { t } = useContext(I18nContext);

  return (
    <>
      <Head>
        <title>
          {t.aboutName} | {siteConf.name}
        </title>
        <meta description="Software developer..." />
      </Head>

      <div className="container content-container">
        <Content
          content={content}
          hardSkills={hardSkills}
          softSkills={softSkills}
        />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const data = await readAbout();
  const { content, hardSkills, softSkills } = data;

  return {
    props: {
      content,
      hardSkills,
      softSkills,
    },
  };
}
