// domain.com/junkyard/[slug]
import Head from "next/head";

import siteConf from "../../data/config.json";
import { useTranslation } from "../../store/i18n";
import { readPostBySlug, readAllPosts } from "../../lib/api-utils";

import PostDetails from "../../components/posts/details";
import ContentHeader from "../../components/ui/ContentHeader";

export default function Post({ post = null, error }) {
  const { t } = useTranslation();

  let content;
  if (error) {
    content = error;
  } else if (!post) {
    content = <div>{t.loading}...</div>;
  } else {
    content = <PostDetails post={post} />;
  }

  return (
    <>
      <Head>
        <title>
          {post?.title || "404"} | {siteConf.name}
        </title>
        <meta description={post?.description || "-"} />
      </Head>

      <div className="container content-container pt-8 md:pt-0">
        <ContentHeader t={t} />
        {content}
      </div>
    </>
  );
}

/** The static generation way - with dynamic pages. */
export async function getStaticProps(context) {
  const {
    params: { slug },
  } = context;

  const post = readPostBySlug(slug) || null;

  /***
   * Using alternative in component 404 handling,
   * as returning { notFound: true } causes next router error.
   ***/
  let error = "";
  if (!post) {
    error = "404 | This page could not be found.";
  }

  return { props: { post, error }, revalidate: 30 };
}

export async function getStaticPaths() {
  /** Only pre-generate "important" items. */
  const data = readAllPosts();
  const paths = data?.map((post) => post.slug);
  const pathsWithParams = paths.map((slug) => ({ params: { slug } }));

  return {
    paths: pathsWithParams,
    fallback: true,
  };
}
