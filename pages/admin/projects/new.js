// domain.com/admin/posts/new
import Head from "next/head";
import router from "next/router";
import { useContext, useState } from "react";

import en from "../../../locales/en.json";
import fi from "../../../locales/fi.json";
import siteConf from "../../../data/config.json";
import NotificationContext from "../../../store/notificatons";
import { postNewProject } from "../../../services/client";
import { getAllTags } from "../../../lib/api-utils";

import Form from "../../../components/projects/admin/Form";

export default function NewProject(props) {
  const t = props.translation;

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

  async function submitProject(project) {
    if (!projectIsValid(project)) {
      showNotification("Please fill the form properly.", "warning");
      return;
    }

    setIsSubmitting(true);

    try {
      await postNewProject(project);

      showNotification("Project added.", "success");
      router.push("/projects");
    } catch (error) {
      setIsSubmitting(false);
      console.error(error?.info?.message || error);
      showNotification(error?.info?.message || "Something went wrong!");
    }
  }

  return (
    <>
      <Head>
        <title>
          {t.adminName} | {siteConf.shortName}
        </title>
      </Head>

      <div className="container">
        <Form
          isSubmitting={isSubmitting}
          submitProject={submitProject}
          tags={props?.tags}
          t={t}
        />
      </div>
    </>
  );
}

export async function getServerSideProps({ locale }) {
  const translation = locale === "en" ? en : fi;

  const allTags = await getAllTags();

  return {
    props: { tags: allTags, translation },
  };
}
