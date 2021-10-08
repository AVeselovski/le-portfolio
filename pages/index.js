// arveselovski.com/
import Head from "next/head";

import { getPinnedJunk, getPinnedProjects } from "../services/client";
import { readPinnedJunk, readPinnedProjects } from "../services/server";

import JunkList from "../components/junk/JunkList";
import ProjectList from "../components/projects/ProjectList";

export default function Home({ junk, projects }) {
  return (
    <>
      <Head></Head>

      <div className="max-w-3xl">
        <div className="mb-4">
          <h2 className="text-2xl mb-4">Junk</h2>
          <JunkList junk={junk} />
        </div>
        <div className="mt-4">
          <h2 className="text-2xl mb-4">Projects</h2>
          <ProjectList projects={projects} />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const pinnedJunk = readPinnedJunk();
  const pinnedProjects = readPinnedProjects();

  return {
    props: { junk: pinnedJunk, projects: pinnedProjects },
  };
}
