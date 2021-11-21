// domain.com/admin/posts/new
import Head from "next/head";
import router from "next/router";
import { useContext, useState } from "react";
import { getSession } from "next-auth/client";

import siteConf from "../../../data/config.json";
import { getLocale } from "../../../locales";
import { createNewPost, createNewTag } from "../../../services/client";
import { getAllTags } from "../../../lib/api-utils";
import NotificationContext from "../../../store/notificatons";

import PostForm from "../../../components/admin/PostForm";

import type { GetServerSidePropsContext } from "next";
import { IPost, ITranslation } from "../../../types";

type Props = {
  tags: string[];
  translation: ITranslation;
};

export default function NewPost(props: Props) {
  const t = props.translation;

  const [tags, setTags] = useState(props.tags);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { showNotification } = useContext(NotificationContext);

  function postIsValid(post: IPost) {
    if (
      post.title.length <= 3 ||
      post.slug.length <= 3 ||
      post.body.length <= 10 ||
      post.description.length <= 10
    ) {
      return false;
    } else return true;
  }

  async function handleSubmitPost(post: IPost) {
    if (!postIsValid(post)) {
      showNotification({
        message: "Please fill the form properly.",
        status: "warning",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const newPost = await createNewPost(post);

      showNotification({ message: "Post added.", status: "success" });
      router.push(`/junkyard/${newPost.slug}`);
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

  return (
    <>
      <Head>
        <title>
          {t.adminName} | {siteConf.shortName}
        </title>
      </Head>

      <div className="container">
        <PostForm
          isSubmitting={isSubmitting}
          submitPost={handleSubmitPost}
          submitTag={handleSubmitTag}
          tags={tags}
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
        destination: "/admin",
        permanent: false,
      },
    };
  }

  const translation = getLocale(locale);

  const allTags = await getAllTags();

  return {
    props: { tags: allTags, translation },
  };
}
