// arveselovski.com/admin/junk/new
import Head from "next/head";
import router from "next/router";
import { useContext, useRef, useState } from "react";
import { JunkTagSelector } from "../../../components/junk/JunkTags";

import NotificationContext from "../../../store/notificatons";

import { postNewJunk } from "../../../services/client";
import { readAllTags } from "../../../lib/api-utils";

export default function NewJunk(props) {
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

  function junkIsValid() {
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

    if (!junkIsValid()) {
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
      const { data } = await postNewJunk(body);

      showNotification("Junk added.", "success");
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

      <div className="max-w-3xl">
        <form className="w-96" onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="block mb-1 text-sm" htmlFor="junkTitle">
              Title
            </label>
            <input
              className="w-full border py-1 px-3"
              id="junkTitle"
              name="title"
              ref={titleRef}
              required
              type="text"
            />
          </div>

          <div className="input-group">
            <label className="block mb-1 text-sm" htmlFor="junkSlug">
              Slug
            </label>
            <input
              className="w-full border py-1 px-3"
              id="junkSlug"
              name="slug"
              ref={slugRef}
              required
              type="text"
            />
          </div>

          <div className="input-group">
            <label className="block mb-1 text-sm" htmlFor="junkBody">
              Content
            </label>
            <textarea
              className="w-full border py-1 px-3"
              id="junkBody"
              name="body"
              ref={bodyRef}
              rows={10}
              required
            ></textarea>
          </div>

          <div className="input-group">
            <label className="block mb-1 text-sm" htmlFor="junkDescription">
              Description
            </label>
            <textarea
              className="w-full border py-1 px-3"
              id="junkDescription"
              name="description"
              ref={descriptionRef}
              required
            ></textarea>
          </div>

          <div className="input-group">
            <label className="block mb-1 text-sm">Tags</label>
            <JunkTagSelector
              tags={props.tags}
              selected={tags}
              onSelect={handleTagSelect}
            />
          </div>

          <div className="input-group">
            <label className="block mb-1 text-sm" htmlFor="junkPinned">
              Pin this junk
            </label>
            <input
              className="rounded-sm border p-2"
              id="junkPinned"
              name="pinned"
              ref={pinnedRef}
              type="checkbox"
            />
          </div>

          <div className="input-group">
            <label className="block mb-1 text-sm" htmlFor="junkImage">
              Image
            </label>
            <input
              className="w-full rounded-sm border p-2"
              id="junkImage"
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
              className="w-full bg-indigo-400 text-white py-2 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
