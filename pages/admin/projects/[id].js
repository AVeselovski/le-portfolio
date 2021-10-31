// domain.com/admin/posts/new
import Head from "next/head";
import router from "next/router";
import { useContext, useEffect, useState } from "react";
import { getSession } from "next-auth/client";

import siteConf from "../../../data/config.json";
import { getLocale } from "../../../locales";
import { updateProject } from "../../../services/client";
import { getAllTags, getProjectById } from "../../../lib/api-utils";
import NotificationContext from "../../../store/notificatons";

import ProjectForm from "../../../components/admin/ProjectForm";

export default function NewProject(props) {
  const t = props.translation;

  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { showNotification } = useContext(NotificationContext);

  function projectIsValid(project) {
    if (
      project.title.length <= 3 ||
      project.description.length <= 10 ||
      !project.tags.length ||
      !project.sourceUrl ||
      !project.liveUrl
    ) {
      return false;
    } else return true;
  }

  async function handleSubmitProject(project) {
    if (!projectIsValid(project)) {
      showNotification("Please fill the form properly.", "warning");
      return;
    }

    setIsSubmitting(true);

    const projectData = {
      ...props.project, // _id
      ...project,
    };

    try {
      await updateProject(projectData);

      showNotification("Project updated.", "success");
      router.push("/projects");
    } catch (error) {
      setIsSubmitting(false);
      console.error(error?.info?.message || error);
      showNotification(error?.info?.message || "Something went wrong!");
    }
  }

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        showNotification("Unauthorized!");

        window.location.href = "/admin";
      } else {
        setIsLoadingSession(false);
      }
    });
  }, []);

  let content;

  if (isLoadingSession) {
    content = <p className="text-center">Loading...</p>;
  } else {
    content = (
      <ProjectForm
        isSubmitting={isSubmitting}
        project={props.project}
        submitProject={handleSubmitProject}
        tags={props.tags}
        t={t}
      />
    );
  }

  return (
    <>
      <Head>
        <title>
          {t.adminName} | {siteConf.shortName}
        </title>
      </Head>

      <div className="container">{content}</div>
    </>
  );
}

export async function getServerSideProps({ locale, params, req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  const { id } = params;

  const project = await getProjectById(id);
  if (!project) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  const translation = getLocale(locale);
  const tags = await getAllTags();

  return {
    props: { project, tags, translation },
  };
}
