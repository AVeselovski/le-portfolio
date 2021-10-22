// domain.com/junkyard/[...slug]
import Head from "next/head";

import siteConf from "../../../data/config.json";
import en from "../../../locales/en.json";
import fi from "../../../locales/fi.json";
import { readAllTags, readFilteredPosts } from "../../../lib/api-utils";

import PostsHeader from "../../../components/posts/PostsHeader";
import PostTags from "../../../components/posts/PostTags";
import PostList from "../../../components/posts/PostList";

export default function FilteredPosts({ posts = [], tags = [], translation }) {
  const t = translation;

  let content;
  if (!posts.length) {
    content = <div>{t.postNoContent}</div>;
  } else {
    content = <PostList posts={posts} />;
  }

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
          <PostTags tags={tags} withAll />
        </PostsHeader>

        {content}
      </div>
    </>
  );
}

/** Server side rendering way. */
export async function getServerSideProps(context) {
  const {
    params: { slug },
    locale,
  } = context;

  const allTags = readAllTags();
  const filteredPosts = readFilteredPosts(slug[0]);
  const translation = locale === "en" ? en : fi;

  return {
    props: {
      posts: filteredPosts,
      tags: allTags,
      translation,
    },
  };
}