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

import type { GetServerSidePropsContext } from "next";
import type { ITranslation } from "../../types";

type Props = {
  data: string;
  translation: ITranslation;
};

export default function About(props: Props) {
  console.log(props.data);
  const t = props.translation;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { showNotification } = useContext(NotificationContext);

  async function handleSubmitAbout(content: { body: string }) {
    if (content.body.trim() === "") {
      showNotification({
        message: "Please fill the form properly.",
        status: "warning",
      });
      return;
    }

    setIsSubmitting(true);

    const data = {
      aboutContent: content.body,
    };

    try {
      await updateAbout(data);

      showNotification({
        message: "About content updated.",
        status: "success",
      });
      router.push("/about");
    } catch (error: any) {
      setIsSubmitting(false);
      console.error(error?.info?.message || error);
      showNotification({
        message: error?.info?.message || "Something went wrong!",
      });
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
          content={props.data}
          isSubmitting={isSubmitting}
          submitAbout={handleSubmitAbout}
          t={t}
        />
      </div>
    </>
  );
}

export async function getServerSideProps({
  locale,
  req,
}: GetServerSidePropsContext) {
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
    props: { data: data.raw, translation },
  };
}
