import { useEffect, useRef, useState } from "react";

import { PostTagSelector } from "../posts/PostTags";

import type { IPost, ITranslation } from "../../types";

const DEFAULT_TAGS = ["JavaScript", "CSS", "React", "Node", "Next.js"];

type Props = {
  isSubmitting: boolean;
  post?: IPost;
  submitPost: (post: IPost) => void;
  submitTag: (tag: string) => void;
  tags: string[];
  t: ITranslation;
};

function Form(props: Props) {
  const { t } = props;

  const [tags, setTags] = useState<string[]>([]);
  // const [image, setImage] = useState<File>();
  // const [createObjectURL, setCreateObjectURL] = useState<string>();

  const titleRef = useRef<HTMLInputElement>(null);
  const slugRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const pinnedRef = useRef<HTMLInputElement>(null);
  // const imageRef = useRef<HTMLImageElement>(null);

  const allTags = (props.tags?.length && props.tags) || DEFAULT_TAGS;

  function handleTagSelect(
    selected: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();

    if (tags.includes(selected)) {
      const filteredTags = tags.filter((t) => t !== selected);
      setTags(filteredTags);
    } else {
      setTags([...tags, selected]);
    }
  }

  // function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
  //   e.preventDefault();

  //   const img = e.target?.files?.[0];
  //   setImage(img);
  //   setCreateObjectURL(URL.createObjectURL(img));
  // }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const post = {
      title: titleRef?.current?.value || "",
      slug: slugRef?.current?.value || "",
      body: bodyRef?.current?.value || "",
      description: descriptionRef?.current?.value || "",
      tags,
      pinned: pinnedRef?.current?.checked || false,
    };

    props.submitPost(post);
  }

  function handleTagSubmit(tag: string) {
    props.submitTag(tag);
  }

  useEffect(() => {
    if (props.post) {
      const { title, slug, body, description, pinned } = props.post;

      titleRef.current!.value = title;
      slugRef.current!.value = slug;
      bodyRef.current!.value = body;
      descriptionRef.current!.value = description;
      pinnedRef.current!.checked = pinned;

      setTags(props.post.tags);
    }
  }, []);

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="input-group">
        <label className="block mb-1 text-sm" htmlFor="postTitle">
          {t.postTitle}
        </label>
        <input
          className="input big w-full"
          disabled={props.isSubmitting}
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
          className="input big w-full"
          disabled={props.isSubmitting}
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
          className="input big w-full font-mono"
          disabled={props.isSubmitting}
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
          className="input big w-full rounded"
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
          onSubmit={handleTagSubmit}
        />
      </div>

      <div className="input-group">
        <label className="block mb-1 text-sm" htmlFor="postPinned">
          {t.postPinned}
        </label>
        <input
          disabled={props?.isSubmitting}
          id="postPinned"
          name="pinned"
          ref={pinnedRef}
          type="checkbox"
        />
      </div>

      {/*
      <div className="input-group">
        <label className="block mb-1 text-sm" htmlFor="postImage">
          {t.postImage}
        </label>
        <input
          disabled={props?.isSubmitting}
          id="postImage"
          name="image"
          onChange={handleFileSelect}
          type="file"
        />
      </div>
      <div className="w-full">
        <img id="#uploadedImage" ref={imageRef} src={createObjectURL} />
      </div> 
      */}

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
