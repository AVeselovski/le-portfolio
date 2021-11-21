// domain.com/about
import Head from "next/head";

import siteConf from "../data/config.json";
import { getLocale } from "../locales";
import { getAboutContent } from "../lib/api-utils";

import Content from "../components/about/Content";

import type { GetStaticPropsContext } from "next";
import type { ITranslation } from "../types";

type Props = {
  content: string;
  hardSkills: string[];
  softSkills: string[];
  metaDescription: string;
  translation: ITranslation;
};

export default function About(props: Props) {
  const t = props.translation;

  return (
    <>
      <Head>
        <title>
          {t.aboutName} | {siteConf.name}
        </title>
        <meta name="description" content={props.metaDescription} />
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

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const translation = getLocale(locale);

  const data = await getAboutContent();
  const { content, hardSkills, softSkills, metaDescription } = data;

  console.log(hardSkills, metaDescription);

  return {
    props: {
      content,
      hardSkills,
      softSkills,
      metaDescription,
      translation,
    },
    revalidate: 60,
  };
}
