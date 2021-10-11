// arveselovski.com/junkyard/[...slug]
import Head from "next/head";

import siteConf from "../../../data/config.json";
import { readAllTags, readFilteredJunk } from "../../../lib/api-utils";

import JunkHeader from "../../../components/junk/JunkHeader";
import JunkTags from "../../../components/junk/JunkTags";
import JunkList from "../../../components/junk/JunkList";

export default function FilteredJunk({ junk, tags }) {
  let content;

  if (!junk.length) {
    content = <div>No junk here yet!</div>;
  } else {
    content = <JunkList junk={junk} />;
  }

  return (
    <>
      <Head>
        <title>Junkyard | {siteConf.name}</title>
        <meta description={siteConf.blogDescription} />
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
  } = context;

  const allTags = readAllTags();
  const filteredJunk = readFilteredJunk(slug[0]);

  return {
    props: {
      junk: filteredJunk,
      tags: allTags,
    },
  };
}
