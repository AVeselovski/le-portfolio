// arveselovski.com/
import Head from "next/head";

import { readPinnedJunk, readPinnedProjects } from "../lib/api-utils";

import JunkList from "../components/junk/JunkList";
import ProjectList from "../components/projects/ProjectList";
import PinIcon from "../components/icons/PinIcon";

export default function Home({ junk, projects }) {
  return (
    <>
      <Head></Head>

      <div className="container">
        <div className="mb-4">
          <span className="text-2xl mb-4 text-indigo-500 block">
            <PinIcon />
          </span>
          <JunkList junk={junk} />
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

export async function getStaticProps() {
  const pinnedJunk = readPinnedJunk();
  const pinnedProjects = readPinnedProjects();

  return {
    props: { junk: pinnedJunk, projects: pinnedProjects },
  };
}
