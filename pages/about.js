// domain.com/about
import Head from "next/head";

import siteConf from "../data/config.json";
import { getLocale } from "../locales";
import { getAboutContent } from "../lib/api-utils";

import Content from "../components/about/Content";

export default function About(props) {
  const t = props.translation;

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
          content={props.content}
          hardSkills={props.hardSkills}
          softSkills={props.softSkills}
        />
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const translation = getLocale(locale);

  const data = await getAboutContent();
  const { content, hardSkills, softSkills } = data;

  return {
    props: {
      content,
      hardSkills,
      softSkills,
      translation,
    },
  };
}
