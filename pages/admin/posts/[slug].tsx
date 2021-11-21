// domain.com/admin/posts/new
import Head from "next/head";
import router from "next/router";
import { useContext, useState } from "react";
import { getSession } from "next-auth/client";

import siteConf from "../../../data/config.json";
import { getLocale } from "../../../locales";
import { updatePost, createNewTag } from "../../../services/client";
import { getAllTags, getPostBySlug } from "../../../lib/api-utils";
import NotificationContext from "../../../store/notificatons";

import PostForm from "../../../components/admin/PostForm";

import type { GetServerSidePropsContext } from "next";
import { IPost, ITranslation } from "../../../types";

type Props = {
  post: IPost;
  tags: string[];
  translation: ITranslation;
};

export default function NewPost(props: Props) {
  const t = props.translation;

  const [allTags, setAllTags] = useState(props.tags);
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

    const postData = {
      ...props.post, // _id
      ...post,
    };

    try {
      const updatedPost = await updatePost(postData);

      showNotification({ message: "Post updated.", status: "success" });
      router.push(`/junkyard/${updatedPost.slug}`);
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

      setAllTags(newTags);

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
          post={props.post}
          submitPost={handleSubmitPost}
          submitTag={handleSubmitTag}
          tags={allTags}
          t={t}
        />
      </div>
    </>
  );
}

export async function getServerSideProps({
  locale,
  params,
  req,
}: GetServerSidePropsContext & { params: { slug: string } }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  const { slug } = params;

  const post = await getPostBySlug(slug);
  if (!post) {
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
    props: { post, tags, translation },
  };
}
