// domain.com/junkyard
import Head from "next/head";

import siteConf from "../../data/config.json";
import { getLocale } from "../../locales";
import { getAllPosts, extractAllTags } from "../../lib/api-utils";

import PostsHeader from "../../components/posts/PostsHeader";
import PostTags from "../../components/posts/PostTags";
import PostList from "../../components/posts/PostList";

export default function Junkyard(props) {
  const t = props.translation;

  return (
    <>
      <Head>
        <title>
          {t.blogName} | {siteConf.name}
        </title>
        <meta description={t.blogDescription} />
      </Head>

      <div className="container">
        <PostsHeader>
          <PostTags tags={props.tags} />
        </PostsHeader>

        <PostList posts={props.posts} />
      </div>
    </>
  );
}

/** The static generation way. */
export async function getStaticProps({ locale }) {
  const translation = getLocale(locale);

  const allPosts = (await getAllPosts()) || [];
  const allTags = (await extractAllTags()) || [];

  // if (!allPosts) {
  //   return {
  //     // notFound: true,
  //     redirect: {
  //       destination: "/",
  //     },
  //   };
  // }

  return {
    props: { posts: allPosts, tags: allTags, translation },
    revalidate: 60,
  };
}
