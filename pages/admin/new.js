// domain.com/admin/posts/new
import Head from "next/head";
import router from "next/router";
import { useContext, useRef, useState } from "react";
import { PostTagSelector } from "../../../components/posts/PostTags";

import NotificationContext from "../../../store/notificatons";

import { postNewPost } from "../../../services/client";
import { readAllTags } from "../../../lib/api-utils";

export default function NewPost(props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const { showNotification } = useContext(NotificationContext);

  const titleRef = useRef();
  const slugRef = useRef();
  const bodyRef = useRef();
  const descriptionRef = useRef();
  const pinnedRef = useRef();
  const imageRef = useRef();

  function postIsValid() {
    if (
      titleRef.current?.value?.length < 5 ||
      slugRef.current?.value?.length < 5 ||
      bodyRef.current?.value?.length < 10 ||
      descriptionRef.current?.value?.length < 10
    ) {
      return false;
    } else return true;
  }

  function handleTagSelect(selected, e) {
    e.preventDefault();

    if (tags.includes(selected)) {
      const filteredTags = tags.filter((t) => t !== selected);
      setTags(filteredTags);
    } else {
      setTags([...tags, selected]);
    }
  }

  function handleFileSelect(e) {
    e.preventDefault();

    const img = e.target?.files?.[0];
    setImage(img);
    setCreateObjectURL(URL.createObjectURL(img));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!postIsValid()) {
      showNotification("Please fill the form properly.", "warning");

      return;
    }

    const imageData = {
      height: imageRef.current?.naturalHeight,
      width: imageRef.current?.naturalWidth,
    };

    const body = new FormData();
    body.append("file", image);
    body.append("title", titleRef.current.value);
    body.append("slug", slugRef.current.value);
    body.append("body", bodyRef.current.value);
    body.append("description", descriptionRef.current.value);
    body.append("pinned", pinnedRef.current.checked);
    body.append("tags", tags);
    body.append("image", JSON.stringify(imageData));

    setIsSubmitting(true);
    try {
      const { data } = await postNewPost(body);

      showNotification("Post added.", "success");
      router.push(`/junkyard/${data.slug}`);
    } catch (error) {
      setIsSubmitting(false);
      console.error(error?.info?.message || error);
      showNotification(error?.info?.message || "Something went wrong!");
    }
  }

  return (
    <>
      <Head>
        <title>Admin | AV.</title>
      </Head>

      <div className="container">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="block mb-1 text-sm" htmlFor="postTitle">
              Title
            </label>
            <input
              className="w-full border py-1 px-3 rounded"
              id="postTitle"
              name="title"
              ref={titleRef}
              required
              type="text"
            />
          </div>

          <div className="input-group">
            <label className="block mb-1 text-sm" htmlFor="postSlug">
              Slug
            </label>
            <input
              className="w-full border py-1 px-3 rounded"
              id="postSlug"
              name="slug"
              ref={slugRef}
              required
              type="text"
            />
          </div>

          <div className="input-group">
            <label className="block mb-1 text-sm" htmlFor="postBody">
              Content
            </label>
            <textarea
              className="w-full border py-1 px-3 rounded"
              id="postBody"
              name="body"
              ref={bodyRef}
              rows={16}
              required
            ></textarea>
          </div>

          <div className="input-group">
            <label className="block mb-1 text-sm" htmlFor="postDescription">
              Description
            </label>
            <textarea
              className="w-full border py-1 px-3 rounded"
              id="postDescription"
              name="description"
              ref={descriptionRef}
              rows={4}
              required
            ></textarea>
          </div>

          <div className="input-group">
            <label className="block mb-1 text-sm">Tags</label>
            <PostTagSelector
              tags={props.tags}
              selected={tags}
              onSelect={handleTagSelect}
            />
          </div>

          <div className="input-group">
            <label className="block mb-1 text-sm" htmlFor="postPinned">
              Pin this post
            </label>
            <input
              className="rounded-sm border p-2"
              id="postPinned"
              name="pinned"
              ref={pinnedRef}
              type="checkbox"
            />
          </div>

          <div className="input-group">
            <label className="block mb-1 text-sm" htmlFor="postImage">
              Image
            </label>
            <input
              className="w-full rounded border p-2"
              id="postImage"
              name="image"
              onChange={handleFileSelect}
              // style={{ display: "none" }}
              type="file"
            />
            {/* 
              <button
                onClick={(e) => {
                  e.preventDefault();
                  imageRef.current.click();
                }}
              >
                Pick image...
              </button>
            */}
          </div>
          <div className="w-full">
            <img id="#uploadedImage" ref={imageRef} src={createObjectURL} />
          </div>

          <div className="mt-6">
            <button
              className="w-full bg-indigo-400 text-white py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const allTags = readAllTags();

  return {
    props: { tags: allTags },
  };
}
