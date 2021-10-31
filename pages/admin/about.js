// domain.com/admin/about
import Head from "next/head";
import router from "next/router";
import { useContext, useState } from "react";
import { getSession } from "next-auth/client";

import siteConf from "../../data/config.json";
import { getLocale } from "../../locales";
import { updateAbout } from "../../services/client";
import { getAboutContent } from "../../lib/api-utils";
import NotificationContext from "../../store/notificatons";

import AboutForm from "../../components/admin/AboutForm";

export default function About(props) {
  const t = props.translation;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { showNotification } = useContext(NotificationContext);

  async function handleSubmitAbout(content) {
    if (content.body.trim() === "") {
      showNotification("Please fill the form properly.", "warning");
      return;
    }

    setIsSubmitting(true);

    const data = {
      aboutContent: content.body,
    };

    try {
      await updateAbout(data);

      showNotification("About content updated.", "success");
      router.push("/about");
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
        <p className="text-lg mb-4 bg-gray-100 rounded-md p-2 px-3">
          {t.aboutWarning}
        </p>
        <AboutForm
          content={props.data?.raw}
          isSubmitting={isSubmitting}
          submitAbout={handleSubmitAbout}
          t={t}
        />
      </div>
    </>
  );
}

export async function getServerSideProps({ locale, req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/admin/auth",
        permanent: false,
      },
    };
  }

  const translation = getLocale(locale);

  const data = await getAboutContent();

  return {
    props: { data, session, translation },
  };
}
