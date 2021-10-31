// domain.com/admin/auth
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { signIn, getSession } from "next-auth/client";

import siteConf from "../../data/config.json";
import { getLocale } from "../../locales";
import { createUser } from "../../services/client";
import NotificationContext from "../../store/notificatons";

import AuthForm from "../../components/admin/AuthForm";

export default function Auth(props) {
  const t = props.translation;

  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { showNotification } = useContext(NotificationContext);

  const router = useRouter();

  function toggleLogin(e) {
    e.preventDefault();

    setIsLogin((prev) => !prev);
  }

  async function handleLogin(credentials) {
    setIsSubmitting(true);

    const result = await signIn("credentials", {
      redirect: false,
      username: credentials.username,
      password: credentials.password,
    });

    if (!result.error) {
      router.replace("/admin");
    }
  }

  async function handleCreateUser(credentials) {
    setIsSubmitting(true);

    try {
      await createUser(credentials);

      showNotification("User created.", "success");
    } catch (error) {
      setIsSubmitting(false);
      console.error(error?.info?.message || error);
      showNotification(error?.info?.message || "Something went wrong!");
    }
  }

  function handleSubmitAuth(credentials) {
    if (isLogin) {
      handleLogin(credentials);
    } else {
      handleCreateUser(credentials);
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
        <h1 className="text-2xl mb-4">
          {isLogin ? t.adminLogin : t.adminSignup}
        </h1>
        <AuthForm
          isLogin={isLogin}
          isSubmitting={isSubmitting}
          submitAuth={handleSubmitAuth}
          toggleLogin={toggleLogin}
          t={t}
        />
      </div>
    </>
  );
}

export async function getServerSideProps({ locale, req }) {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  const translation = getLocale(locale);

  return {
    props: { session, translation },
  };
}
