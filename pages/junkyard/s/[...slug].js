// arveselovski.com/junkyard/[...slug]
import Head from "next/head";

import { readAllSlugs, readFilteredJunk } from "../../../services/server";

import JunkSlugs from "../../../components/junk/JunkSlugs";
import JunkList from "../../../components/junk/JunkList";

export default function FilteredJunk({ slugs, junk }) {
  let content;

  if (!junk.length) {
    content = <div>No junk here yet!</div>;
  } else {
    content = <JunkList junk={junk} />;
  }

  return (
    <>
      <Head>
        <title>Junkyard | Artur Veselovski</title>
        <meta
          description={`Just a source of "Might be useful" pieces, code snippets, "Gotchas" & "How to's" for quick reference.`}
        />
      </Head>

      <div className="max-w-3xl w-full px-2">
        <header className="mb-8">
          <p className="text-lg mb-3">
            Just a source of "Might be useful" pieces, code snippets, "Gotchas"
            & "How to's" for quick reference.
          </p>

          <JunkSlugs slugs={slugs} />
        </header>

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

  const allSlugs = readAllSlugs();
  const filteredJunk = readFilteredJunk(slug[0]);

  return {
    props: {
      slugs: allSlugs,
      junk: filteredJunk,
    },
  };
}
