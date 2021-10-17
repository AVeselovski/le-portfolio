// domain.com/projects
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";

import { getAllProjects } from "../../services/client";
import { readAllProjects } from "../../lib/api-utils";

import siteConf from "../../data/config.json";
import en from "../../locales/en.json";
import fi from "../../locales/fi.json";

import NotificationContext from "../../store/notificatons";
import ProjectList from "../../components/projects/ProjectList";
import ProjectsHeader from "../../components/projects/ProjectsHeader";

export default function Projects(props) {
  const t = props.translation;
  const [projects, setProjects] = useState(props.projects);
  const { showNotification } = useContext(NotificationContext);

  const { data, error } = useSWR("api/projects", getAllProjects);

  useEffect(() => {
    if (data) {
      setProjects(data);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      showNotification(error?.info?.message);
      console.error(error?.info?.message);
    }
  }, [error]);

  let content;
  if (error && !projects) {
    content = <div>{t.showcaseApiFail}</div>;
  } else if (!data && !projects) {
    content = <div>{t.loading}...</div>;
  } else {
    content = (
      <>
        <ProjectsHeader />
        {!projects.length && t.showcaseNoContent}
        <ProjectList projects={projects} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>
          {t.showcaseName} | {siteConf.name}
        </title>
        <meta description={t.showcaseDescription} />
      </Head>

      <div className="container">{content}</div>
    </>
  );
}

/** Hybrid way - prepare some data with static generation, then update clientside. */
export async function getStaticProps({ locale }) {
  const allProjects = readAllProjects();

  const translation = locale === "en" ? en : fi;

  return {
    props: {
      projects: allProjects,
      translation,
    },
  };
}
