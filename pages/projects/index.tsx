// domain.com/projects
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";

import siteConf from "../../data/config.json";
import { getLocale } from "../../locales";
import { getAllProjects } from "../../services/client";
import { getAllProjects as _getAllProjects } from "../../lib/api-utils";

import NotificationContext from "../../store/notificatons";
import ProjectList from "../../components/projects/ProjectList";
import ProjectsHeader from "../../components/projects/ProjectsHeader";

import type { GetStaticPropsContext } from "next";
import type { IProject, ITranslation } from "../../types";

type Props = {
  projects: IProject[];
  translation: ITranslation;
};

export default function Projects(props: Props) {
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
      showNotification({ message: error?.info?.message || error });
      console.error(error?.info?.message);
    }
  }, [error]);

  let content: JSX.Element | null;
  if (error && !projects) {
    content = <div>{t.projectsApiFail}</div>;
  } else if (!data && !projects) {
    content = <div>{t.loading}...</div>;
  } else {
    content = (
      <>
        <ProjectsHeader t={t} />
        {!projects.length && t.projectsNoContent}
        <ProjectList projects={projects} t={t} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>
          {t.projectsName} | {siteConf.name}
        </title>
        <meta name="description" content={t.projectsDescription} />
      </Head>

      <div className="container">{content}</div>
    </>
  );
}

/** Hybrid way - prepare some data with static generation, then update clientside. */
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const translation = getLocale(locale);

  const allProjects = await _getAllProjects();

  return {
    props: {
      projects: allProjects,
      translation,
    },
    revalidate: 60,
  };
}
