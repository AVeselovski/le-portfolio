// domain.com/junkyard
import Head from "next/head";

import siteConf from "../../data/config.json";
import en from "../../locales/en.json";
import fi from "../../locales/fi.json";
import { getAllPosts, extractAllTags } from "../../lib/api-utils";

import PostsHeader from "../../components/posts/PostsHeader";
import PostTags from "../../components/posts/PostTags";
import PostList from "../../components/posts/PostList";

export default function Junkyard({ posts = [], tags = [], translation }) {
  const t = translation;

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
          <PostTags tags={tags} />
        </PostsHeader>

        <PostList posts={posts} />
      </div>
    </>
  );
}

/** The static generation way. */
export async function getStaticProps({ locale }) {
  const translation = locale === "en" ? en : fi;

  const allPosts = await getAllPosts();
  const allTags = await extractAllTags();

  if (!allPosts) {
    return {
      // notFound: true,
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: { posts: allPosts, tags: allTags, translation },
    revalidate: 60,
  };
}
