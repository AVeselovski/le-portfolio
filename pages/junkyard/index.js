// arveselovski.com/junkyard
import Head from "next/head";

import siteConf from "../../data/config.json";
import en from "../../locales/en.json";
import fi from "../../locales/fi.json";
import { readAllJunk, readAllTags } from "../../lib/api-utils";

import JunkHeader from "../../components/junk/JunkHeader";
import JunkTags from "../../components/junk/JunkTags";
import JunkList from "../../components/junk/JunkList";

export default function Junkyard({ junk = [], tags = [], translation }) {
  const t = translation;

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
          <JunkTags tags={tags} />
        </JunkHeader>

        <JunkList junk={junk} />
      </div>
    </>
  );
}

/** The static generation way. */
export async function getStaticProps({ locale }) {
  /*** File based example:
   * const filePath = path.join(process.cwd(), "data", "dummy_data.json");
   * const jsonData = await fs.readFile(filePath);
   * const data = JSON.parse(jsonData);
   ***/

  const allTags = readAllTags();
  const allJunk = readAllJunk();
  const translation = locale === "en" ? en : fi;

  if (!allJunk) {
    return {
      // notFound: true,
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: { junk: allJunk, tags: allTags, translation },
    revalidate: 30,
  };
}
