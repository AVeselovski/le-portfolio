// domain.com/
import Head from "next/head";

import { getLocale } from "../locales";
import { getPinnedPosts, getPinnedProjects } from "../lib/api-utils";

import PostList from "../components/posts/PostList";
import ProjectList from "../components/projects/ProjectList";
import PinIcon from "../components/icons/PinIcon";
import React from "react";

import type { GetStaticPropsContext } from "next";
import type { IPost, IProject, ITranslation } from "../types";

type Props = {
  posts: IPost[];
  projects: IProject[];
  translation: ITranslation;
};

export default function Home(props: Props) {
  const t = props.translation;

  return (
    <>
      <Head>
        <meta name="description" content={t.siteDescription} />
      </Head>

      <div className="container">
        <div className="mb-4">
          <span className="text-2xl mb-4 block text-blue-500">
            <PinIcon className="-rotate-12" />
          </span>
          <PostList posts={props.posts} />
        </div>
        <div className="mt-4">
          <span className="text-2xl mb-4 text-red-500 block">
            <PinIcon className="-rotate-12" />
          </span>
          <ProjectList projects={props.projects} t={t} />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const translation = getLocale(locale);

  const pinnedPosts = await getPinnedPosts();
  const pinnedProjects = await getPinnedProjects();

  return {
    props: { posts: pinnedPosts, projects: pinnedProjects, translation },
    revalidate: 60,
  };
}
