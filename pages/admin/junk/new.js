// arveselovski.com/admin/junk
import Head from "next/head";
import router from "next/router";
import { useContext, useRef, useState } from "react";
import { JunkTagSelector } from "../../../components/junk/JunkTags";

import NotificationContext from "../../../store/notificatons";

import { postNewJunk } from "../../../services/client";
import { readAllTags } from "../../../services/server";

export default function NewJunk(props) {
  const [tags, setTags] = useState([]);

  const { showNotification } = useContext(NotificationContext);

  const titleRef = useRef();
  const descriptionRef = useRef();
  const pinnedRef = useRef();

  function handleTagSelect(selected, e) {
    e.preventDefault();

    if (tags.includes(selected)) {
      const filteredTags = tags.filter((t) => t !== selected);
      setTags(filteredTags);
    } else {
      setTags([...tags, selected]);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const body = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      pinned: pinnedRef.current.checked,
      tags: tags,
    };

    try {
      const { data } = await postNewJunk(body);

      showNotification("Added junk.", "success");
      router.push(`/junkyard/${data.id}`);
    } catch (error) {
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

          <div className="mt-6">
            <button
              className="w-full bg-indigo-400 text-white py-2 rounded-sm"
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
