// domain.com/junkyard/[slug]
import Head from "next/head";

import siteConf from "../../data/config.json";
import en from "../../locales/en.json";
import fi from "../../locales/fi.json";
import { getPostBySlug, getAllPosts } from "../../lib/api-utils";

import PostDetails from "../../components/posts/details";
import ContentHeader from "../../components/ui/ContentHeader";

export default function Post({ post, translation }) {
  const t = translation;

  return (
    <>
      <Head>
        <title>
          {post?.title || "-"} | {siteConf.name}
        </title>
        <meta description={post?.description || "-"} />
      </Head>

      <div className="container content-container pt-8 md:pt-0">
        <ContentHeader t={t} />
        <PostDetails post={post} />
      </div>
    </>
  );
}

/** The static generation way - with dynamic pages. */
export async function getStaticProps({ locale, params }) {
  const { slug } = params;
  const translation = locale === "en" ? en : fi;

  const post = await getPostBySlug(slug);

  return { props: { post, translation }, revalidate: 60 };
}

export async function getStaticPaths(con) {
  const allPosts = await getAllPosts();
  const paths = allPosts?.map((post) => post.slug);
  const pathsWithParams = paths.map((slug) => ({ params: { slug } }));

  return {
    paths: pathsWithParams,
    fallback: "blocking",
  };
}
