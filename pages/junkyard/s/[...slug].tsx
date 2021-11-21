// domain.com/junkyard/[...slug]
import Head from "next/head";

import siteConf from "../../../data/config.json";
import { getLocale } from "../../../locales";
import { extractAllTags, getFilteredPosts } from "../../../lib/api-utils";

import PostsHeader from "../../../components/posts/PostsHeader";
import PostTags from "../../../components/posts/PostTags";
import PostList from "../../../components/posts/PostList";

import type { GetServerSidePropsContext } from "next";
import type { IPost, ITranslation } from "../../../types";

type Props = {
  posts: IPost[];
  tags: string[];
  translation: ITranslation;
};

export default function FilteredPosts(props: Props) {
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
        <meta name="description" content={t.blogDescription} />
      </Head>

      <div className="container">
        <PostsHeader t={t}>
          <PostTags tags={props.tags} withAll />
        </PostsHeader>

        {content}
      </div>
    </>
  );
}

/** Server side rendering way. */
export async function getServerSideProps({
  locale,
  params,
}: GetServerSidePropsContext & { params: { slug: string } }) {
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
