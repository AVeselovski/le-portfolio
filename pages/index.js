// arveselovski.com/
import Head from "next/head";

import en from "../locales/en.json";
import fi from "../locales/fi.json";
import { readPinnedJunk, readPinnedProjects } from "../lib/api-utils";

import JunkList from "../components/junk/JunkList";
import ProjectList from "../components/projects/ProjectList";
import PinIcon from "../components/icons/PinIcon";

export default function Home({ junk = [], projects = [], translation }) {
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

export async function getStaticProps({ locale }) {
  const pinnedJunk = readPinnedJunk();
  const pinnedProjects = readPinnedProjects();

  const translation = locale === "en" ? en : fi;

  return {
    props: { junk: pinnedJunk, projects: pinnedProjects, translation },
  };
}
