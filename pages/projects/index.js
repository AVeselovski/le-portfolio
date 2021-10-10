// arveselovski.com/projects
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";

import { getAllProjects } from "../../services/client";
import { readAllProjects } from "../../lib/api-utils";

import NotificationContext from "../../store/notificatons";
import ProjectList from "../../components/projects/ProjectList";

export default function Projects(props) {
  const [projects, setProjects] = useState(props.projects);
  const { showNotification } = useContext(NotificationContext);

  const { data, error } = useSWR("api/projects", getAllProjects);

  useEffect(() => {
    if (data) {
      console.log(data);
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
    content = <div>Failed to fetch projects...</div>;
  } else if (!data && !projects) {
    content = <div>Loading...</div>;
  } else {
    content = (
      <>
        {!projects.length && "No projects yet!"}
        <ProjectList projects={projects} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Projects | Artur Veselovski</title>
        <meta description="A bunch of projects." />
      </Head>

      <div className="max-w-3xl">{content}</div>
    </>
  );
}

/** Hybrid way - prepare some data with static generation, then update clientside. */
export async function getStaticProps() {
  const allProjects = readAllProjects();

  return {
    props: {
      projects: allProjects,
    },
  };
}
