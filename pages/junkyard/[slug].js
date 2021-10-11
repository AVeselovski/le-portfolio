// arveselovski.com/junkyard/:junkId
import Head from "next/head";

import { readJunkBySlug, readPinnedJunk } from "../../lib/api-utils";

import JunkDetails from "../../components/junk/details";

export default function Junk({ junk, error }) {
  let content;

  if (error) {
    content = error;
  } else if (!junk) {
    content = <div>Loading...</div>;
  } else {
    content = <JunkDetails junk={junk} />;
  }

  return (
    <>
      <Head>
        <title>{junk?.title || "404"} | Artur Veselovski</title>
        <meta description={junk?.description || "-"} />
      </Head>

      <div className="container">{content}</div>
    </>
  );
}

/** The static generation way - with dynamic pages. */
export async function getStaticProps(context) {
  const {
    params: { slug },
  } = context;

  const junk = readJunkBySlug(slug) || null;

  /***
   * Using alternative in component 404 handling,
   * as returning { notFound: true } causes next router error.
   ***/
  let error = "";
  if (!junk) {
    error = "404 | This page could not be found.";
  }

  return { props: { junk, error }, revalidate: 30 };
}

export async function getStaticPaths() {
  /** Only pre-generate "important" items. */
  const data = readPinnedJunk();
  const paths = data?.map((junk) => junk.slug);
  const pathsWithParams = paths.map((slug) => ({ params: { slug } }));

  return {
    paths: pathsWithParams,
    fallback: true,
  };
}
