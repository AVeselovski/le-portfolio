// domain.com/admin/posts/new
import Head from "next/head";
import router from "next/router";
import { useContext, useEffect, useState } from "react";
import { getSession } from "next-auth/client";

import siteConf from "../../../data/config.json";
import { getLocale } from "../../../locales";
import { createNewProject, createNewTag } from "../../../services/client";
import { getAllTags } from "../../../lib/api-utils";
import NotificationContext from "../../../store/notificatons";

import ProjectForm from "../../../components/admin/ProjectForm";

import type { GetServerSidePropsContext } from "next";
import type { IProject, ITranslation } from "../../../types";

type Props = {
  tags: string[];
  translation: ITranslation;
};

export default function NewProject(props: Props) {
  const t = props.translation;

  const [tags, setTags] = useState(props.tags);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { showNotification } = useContext(NotificationContext);

  function projectIsValid(project: IProject) {
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

  async function handleSubmitProject(project: IProject) {
    if (!projectIsValid(project)) {
      showNotification({
        message: "Please fill the form properly.",
        status: "warning",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await createNewProject(project);

      showNotification({ message: "Project added.", status: "success" });
      router.push("/projects");
    } catch (error: any) {
      setIsSubmitting(false);
      console.error(error?.info?.message || error);
      showNotification({
        message: error?.info?.message || error || "Something went wrong!",
      });
    }
  }

  async function handleSubmitTag(tag: string) {
    try {
      const newTags = await createNewTag(tag);

      setTags(newTags);

      showNotification({ message: "Tag added.", status: "success" });
    } catch (error: any) {
      setIsSubmitting(false);
      console.error(error?.info?.message || error);
      showNotification({
        message: error?.info?.message || error || "Something went wrong!",
      });
    }
  }

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        showNotification({ message: "Unauthorized!" });

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
        submitProject={handleSubmitProject}
        submitTag={handleSubmitTag}
        tags={tags}
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

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  // const session = await getSession({ req });

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/admin",
  //       permanent: false,
  //     },
  //   };
  // }

  const translation = getLocale(locale);

  const allTags = await getAllTags();

  return {
    props: { tags: allTags, translation },
  };
}
