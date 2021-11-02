// domain.com/junkyard/[...slug]
import Head from "next/head";

import siteConf from "../../../data/config.json";
import { getLocale } from "../../../locales";
import { extractAllTags, getFilteredPosts } from "../../../lib/api-utils";

import PostsHeader from "../../../components/posts/PostsHeader";
import PostTags from "../../../components/posts/PostTags";
import PostList from "../../../components/posts/PostList";

export default function FilteredPosts(props) {
  const t = props.translation;

  let content;
  if (!props.posts?.length) {
    content = <div>{t.postNoContent}</div>;
  } else {
    content = <PostList posts={props.posts} />;
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
          <PostTags tags={props.tags} withAll />
        </PostsHeader>

        {content}
      </div>
    </>
  );
}

/** Server side rendering way. */
export async function getServerSideProps({ locale, params }) {
  const { slug } = params;
  const translation = getLocale(locale);

  const filteredPosts = (await getFilteredPosts(slug[0])) || [];
  const allTags = (await extractAllTags()) || [];

  return {
    props: {
      posts: filteredPosts,
      tags: allTags,
      translation,
    },
    revalidate: 60,
  };
}
