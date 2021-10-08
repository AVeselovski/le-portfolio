// arveselovski.com/junkyard/:junkId
import Head from "next/head";

import { readJunkById, readPinnedJunk } from "../../services/server";

import JunkDetails from "../../components/junk/details";

export default function Junk({ junk, error }) {
  let content;

  if (error) {
    content = error;
  } else if (!junk) {
    content = <div>Loading...</div>;
  } else {
    content = (
      <JunkDetails
        title={junk.title}
        description={junk.description}
        image={junk.image}
        updatedAt={junk.updatedAt}
        slugs={junk.slugs}
      />
    );
  }

  return (
    <>
      <Head>
        <title>{junk?.title || "404"} | Artur Veselovski</title>
        <meta description={junk?.description || "-"} />
      </Head>

      <div className="max-w-3xl px-2">{content}</div>
    </>
  );
}

/** The static generation way - with dynamic pages. */
export async function getStaticProps(context) {
  const {
    params: { junkId },
  } = context;

  const junk = readJunkById(junkId) || null;

  /*** Using alternative in component 404 handling,
   * as returning { notFound: true } causes next router error.
   */
  let error = "";
  if (!junk) {
    error = "404 | This page could not be found.";
  }

  return { props: { junk, error }, revalidate: 30 };
}

export async function getStaticPaths() {
  /** Only pre-generate "important" items. */
  const data = readPinnedJunk();
  const ids = data?.map((junk) => junk.id);
  const pathsWithParams = ids.map((id) => ({ params: { junkId: id } }));

  return {
    paths: pathsWithParams,
    fallback: true,
  };
}
