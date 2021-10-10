// arveselovski.com/junkyard
import Head from "next/head";

import { readAllJunk, readAllTags } from "../../lib/api-utils";

import JunkTags from "../../components/junk/JunkTags";
import JunkList from "../../components/junk/JunkList";

export default function Junkyard({ junk, tags }) {
  return (
    <>
      <Head>
        <title>Junkyard | Artur Veselovski</title>
        <meta
          description={`Just a source of "Might be useful" pieces, code snippets, "Gotchas" & "How to's" for quick reference.`}
        />
      </Head>

      <div className="max-w-3xl px-2">
        <header className="mb-8">
          <p className="text-lg mb-3">
            Just a source of "Might be useful" pieces, code snippets, "Gotchas"
            & "How to's" for quick reference.
          </p>
          <JunkTags tags={tags} />
        </header>
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
