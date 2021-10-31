// domain.com/junkyard/[slug]
import Head from "next/head";

import siteConf from "../../data/config.json";
import { getLocale } from "../../locales";
import { getPostBySlug, getAllPosts } from "../../lib/api-utils";

import PostDetails from "../../components/posts/details";
import ContentHeader from "../../components/ui/ContentHeader";

export default function Post(props) {
  const t = props.translation;

  return (
    <>
      <Head>
        <title>
          {props.post?.title || "-"} | {siteConf.name}
        </title>
        <meta description={props.post?.description || "-"} />
      </Head>

      <div className="container content-container pt-8 md:pt-0">
        <ContentHeader t={t} />
        <PostDetails post={props.post} />
      </div>
    </>
  );
}

/** The static generation way - with dynamic pages. */
export async function getStaticProps({ locale, params }) {
  const { slug } = params;
  const translation = getLocale(locale);

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
