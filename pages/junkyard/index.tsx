// domain.com/junkyard
import Head from "next/head";

import siteConf from "../../data/config.json";
import { getLocale } from "../../locales";
import { getAllPosts, extractAllTags } from "../../lib/api-utils";

import { LinkTags } from "../../components/ui/Tags";
import PostsHeader from "../../components/posts/PostsHeader";
import PostList from "../../components/posts/PostList";

import type { GetStaticPropsContext } from "next";
import type { IPost, ITranslation } from "../../types";

type Props = {
  posts: IPost[];
  tags: string[];
  translation: ITranslation;
};

export default function Junkyard(props: Props) {
  const t = props.translation;

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
          <LinkTags tags={props.tags} />
        </PostsHeader>

        <PostList posts={props.posts} />
      </div>
    </>
  );
}

/** The static generation way. */
export async function getStaticProps({ locale }: GetStaticPropsContext) {
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
