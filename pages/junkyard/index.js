// arveselovski.com/junkyard
import Head from "next/head";

import siteConf from "../../data/config.json";
import { readAllJunk, readAllTags } from "../../lib/api-utils";

import JunkHeader from "../../components/junk/JunkHeader";
import JunkTags from "../../components/junk/JunkTags";
import JunkList from "../../components/junk/JunkList";

export default function Junkyard({ junk, tags }) {
  return (
    <>
      <Head>
        <title>Junkyard | {siteConf.name}</title>
        <meta description={siteConf.blogDescription} />
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
export async function getStaticProps(context) {
  /*** File based example:
   * const filePath = path.join(process.cwd(), "data", "dummy_data.json");
   * const jsonData = await fs.readFile(filePath);
   * const data = JSON.parse(jsonData);
   ***/

  const allTags = readAllTags();
  const allJunk = readAllJunk();

  if (!allJunk) {
    return {
      // notFound: true,
      redirect: {
        destination: "/",
      },
    };
  }

  return { props: { junk: allJunk, tags: allTags }, revalidate: 30 };
}
