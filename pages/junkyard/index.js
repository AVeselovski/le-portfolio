// arveselovski.com/junkyard
import Head from "next/head";

import { readAllJunk, readAllSlugs } from "../../services/server";

import JunkSlugs from "../../components/junk/JunkSlugs";
import JunkList from "../../components/junk/JunkList";

export default function Junkyard({ junk, slugs }) {
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
          <JunkSlugs slugs={slugs} />
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
   */

  const allSlugs = readAllSlugs();
  const allJunk = readAllJunk();

  if (!allJunk) {
    return {
      // notFound: true,
      redirect: {
        destination: "/",
      },
    };
  }

  return { props: { junk: allJunk, slugs: allSlugs }, revalidate: 30 };
}
