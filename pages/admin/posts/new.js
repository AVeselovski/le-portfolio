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

export default function NewPost(props) {
  const t = props.translation;

  const [allTags, setAllTags] = useState(props.tags);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { showNotification } = useContext(NotificationContext);

  function postIsValid(post) {
    if (
      post.title.length <= 3 ||
      post.slug.length <= 3 ||
      post.body.length <= 10 ||
      post.description.length <= 10
    ) {
      return false;
    } else return true;
  }

  async function handleSubmitPost(post) {
    if (!postIsValid(post)) {
      showNotification("Please fill the form properly.", "warning");
      return;
    }

    setIsSubmitting(true);

    try {
      const newPost = await createNewPost(post);

      showNotification("Post added.", "success");
      router.push(`/junkyard/${newPost.slug}`);
    } catch (error) {
      setIsSubmitting(false);
      console.error(error?.info?.message || error);
      showNotification(error?.info?.message || "Something went wrong!");
    }
  }

  async function handleSubmitTag(tag) {
    try {
      const newTags = await createNewTag(tag);

      setAllTags(newTags);

      showNotification("Tag added.", "success");
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
        <PostForm
          isSubmitting={isSubmitting}
          submitPost={handleSubmitPost}
          submitTag={handleSubmitTag}
          tags={allTags}
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
        destination: "/admin",
        permanent: false,
      },
    };
  }

  const translation = getLocale(locale);

  const allTags = await getAllTags();

  return {
    props: { tags: allTags, session, translation },
  };
}
