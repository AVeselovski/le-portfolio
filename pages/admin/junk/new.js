// arveselovski.com/admin/junk
import Head from "next/head";
import router from "next/router";
import { useRef, useState } from "react";
import { JunkSlugSelector } from "../../../components/junk/JunkSlugs";

import { postNewJunk } from "../../../services/client";
import { readAllSlugs } from "../../../services/server";

export default function NewJunk(props) {
  const [slugs, setSlugs] = useState([]);

  const titleRef = useRef();
  const descriptionRef = useRef();
  const pinnedRef = useRef();

  function handleSlugSelect(selected, e) {
    e.preventDefault();

    if (slugs.includes(selected)) {
      const filteredSlugs = slugs.filter((s) => s !== selected);
      setSlugs(filteredSlugs);
    } else {
      setSlugs([...slugs, selected]);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const body = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      pinned: pinnedRef.current.checked,
      slugs: slugs,
    };
    const { data } = await postNewJunk(body);

    router.push(`/junkyard/${data.id}`);
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
            <label className="block mb-1 text-sm">Slugs</label>
            <JunkSlugSelector
              slugs={props.slugs}
              selected={slugs}
              onSelect={handleSlugSelect}
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
  const allSlugs = readAllSlugs();

  return {
    props: { slugs: allSlugs },
  };
}
