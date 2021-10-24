// domain.com/admin/posts/new
import Head from "next/head";
import router from "next/router";
import { useContext, useRef, useState } from "react";

import en from "../../../locales/en.json";
import fi from "../../../locales/fi.json";
import siteConf from "../../../data/config.json";
import NotificationContext from "../../../store/notificatons";
import { postNewPost, postNewTag } from "../../../services/client";
import { getAllTags } from "../../../lib/api-utils";

import Form from "../../../components/posts/admin/Form";

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

  async function submitPost(post) {
    if (!postIsValid(post)) {
      showNotification("Please fill the form properly.", "warning");
      return;
    }

    setIsSubmitting(true);

    try {
      const newPost = await postNewPost(post);

      showNotification("Post added.", "success");
      router.push(`/junkyard/${newPost.slug}`);
    } catch (error) {
      setIsSubmitting(false);
      console.error(error?.info?.message || error);
      showNotification(error?.info?.message || "Something went wrong!");
    }
  }

  async function submitTag(tag) {
    try {
      const newTags = await postNewTag(tag);

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
        <Form
          isSubmitting={isSubmitting}
          submitPost={submitPost}
          submitTag={submitTag}
          tags={allTags}
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
