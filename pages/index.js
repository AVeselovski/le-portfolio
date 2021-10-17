// domain.com/
import Head from "next/head";

import en from "../locales/en.json";
import fi from "../locales/fi.json";
import { readPinnedPosts, readPinnedProjects } from "../lib/api-utils";

import PostList from "../components/posts/PostList";
import ProjectList from "../components/projects/ProjectList";
import PinIcon from "../components/icons/PinIcon";

export default function Home({ posts = [], projects = [], translation }) {
  const t = translation;

  return (
    <>
      <Head>
        <meta description={t.siteDescription} />
      </Head>

      <div className="container">
        <div className="mb-4">
          <span className="text-2xl mb-4 text-indigo-500 block">
            <PinIcon />
          </span>
          <PostList posts={posts} />
        </div>
        <div className="mt-4">
          <span className="text-2xl mb-4 text-indigo-500 block">
            <PinIcon />
          </span>
          <ProjectList projects={projects} />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const pinnedPosts = readPinnedPosts();
  const pinnedProjects = readPinnedProjects();

  const translation = locale === "en" ? en : fi;

  return {
    props: { posts: pinnedPosts, projects: pinnedProjects, translation },
  };
}
