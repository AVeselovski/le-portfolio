import { useContext, useRef, useState } from "react";

import { PostTagSelector } from "../PostTags";

const DEFAULT_TAGS = ["JavaScript", "CSS", "React", "Node", "Next.js"];

function Form(props) {
  const t = props.t;
  const allTags = (props?.tags?.length && props.tags) || DEFAULT_TAGS;

  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const titleRef = useRef();
  const slugRef = useRef();
  const bodyRef = useRef();
  const descriptionRef = useRef();
  const pinnedRef = useRef();
  const imageRef = useRef();

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

    /**
     * 1. Image upload to some cloud here...
     * 2. Set image data { src, height, width }
     */

    const img = e.target?.files?.[0];
    setImage(img);
    setCreateObjectURL(URL.createObjectURL(img));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const body = {
      title: titleRef.current.value,
      slug: slugRef.current.value,
      body: bodyRef.current.value,
      description: descriptionRef.current.value,
      tags,
      pinned: pinnedRef.current.checked,
    };

    props.submitPost(body);
  }

  function handleSubmitTag(tag) {
    props.submitTag(tag);
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="input-group">
        <label className="block mb-1 text-sm" htmlFor="postTitle">
          {t.postTitle}
        </label>
        <input
          className="w-full border py-1 px-3 rounded"
          disabled={props?.isSubmitting}
          id="postTitle"
          name="title"
          ref={titleRef}
          required
          type="text"
        />
      </div>

      <div className="input-group">
        <label className="block mb-1 text-sm" htmlFor="postSlug">
          {t.postSlug}
        </label>
        <input
          className="w-full border py-1 px-3 rounded"
          disabled={props?.isSubmitting}
          id="postSlug"
          name="slug"
          ref={slugRef}
          required
          type="text"
        />
      </div>

      <div className="input-group">
        <label className="block mb-1 text-sm" htmlFor="postBody">
          {t.postBody}
        </label>
        <textarea
          className="w-full border py-1 px-3 rounded font-mono"
          disabled={props?.isSubmitting}
          id="postBody"
          name="body"
          ref={bodyRef}
          rows={16}
          required
        ></textarea>
      </div>

      <div className="input-group">
        <label className="block mb-1 text-sm" htmlFor="postDescription">
          {t.postDescription}
        </label>
        <textarea
          className="w-full border py-1 px-3 rounded"
          disabled={props?.isSubmitting}
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
          tags={allTags}
          selected={tags}
          onSelect={handleTagSelect}
          onSubmit={handleSubmitTag}
        />
      </div>

      <div className="input-group">
        <label className="block mb-1 text-sm" htmlFor="postPinned">
          {t.postPinned}
        </label>
        <input
          className="rounded-sm border p-2"
          disabled={props?.isSubmitting}
          id="postPinned"
          name="pinned"
          ref={pinnedRef}
          type="checkbox"
        />
      </div>

      <div className="input-group">
        <label className="block mb-1 text-sm" htmlFor="postImage">
          {t.postImage}
        </label>
        <input
          className="w-full rounded border p-2"
          disabled={props?.isSubmitting}
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
          disabled={props?.isSubmitting}
          type="submit"
        >
          {t.postSave}
        </button>
      </div>
    </form>
  );
}

export default Form;
