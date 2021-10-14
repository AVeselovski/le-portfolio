// arveselovski.com/junkyard/[...slug]
import Head from "next/head";

import siteConf from "../../../data/config.json";
import en from "../../../locales/en.json";
import fi from "../../../locales/fi.json";
import { readAllTags, readFilteredJunk } from "../../../lib/api-utils";

import JunkHeader from "../../../components/junk/JunkHeader";
import JunkTags from "../../../components/junk/JunkTags";
import JunkList from "../../../components/junk/JunkList";

export default function FilteredJunk({ junk = [], tags = [], translation }) {
  const t = translation;

  let content;
  if (!junk.length) {
    content = <div>{t.postNoContent}</div>;
  } else {
    content = <JunkList junk={junk} />;
  }

  return (
    <>
      <Head>
        <title>
          {t.blogName} | {siteConf.name}
        </title>
        <meta description={t.blogDescription} />
      </Head>

      <div className="container">
        <JunkHeader>
          <JunkTags tags={tags} withAll />
        </JunkHeader>

        {content}
      </div>
    </>
  );
}

/** Server side rendering way. */
export async function getServerSideProps(context) {
  const {
    params: { slug },
    locale,
  } = context;

  const allTags = readAllTags();
  const filteredJunk = readFilteredJunk(slug[0]);
  const translation = locale === "en" ? en : fi;

  return {
    props: {
      junk: filteredJunk,
      tags: allTags,
      translation,
    },
  };
}
