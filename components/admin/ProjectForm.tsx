import { useEffect, useRef, useState } from "react";

import { PostTagSelector } from "../posts/PostTags";

import type { IProject, ITranslation } from "../../types";

const DEFAULT_TAGS = ["JavaScript", "CSS", "React", "Node", "Next.js"];

type Props = {
  isSubmitting: boolean;
  project?: IProject;
  submitProject: (project: IProject) => void;
  submitTag: (tag: string) => void;
  tags: string[];
  t: ITranslation;
};

function ProjectForm(props: Props) {
  const { t } = props;

  const [tags, setTags] = useState<string[]>([]);
  // const [image, setImage] = useState<File>();
  // const [createObjectURL, setCreateObjectURL] = useState<string>();

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const sourceUrlRef = useRef<HTMLInputElement>(null);
  const liveUrlRef = useRef<HTMLInputElement>(null);
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const project = {
      title: titleRef?.current?.value || "",
      description: descriptionRef?.current?.value || "",
      tags,
      sourceUrl: sourceUrlRef?.current?.value || "",
      liveUrl: liveUrlRef?.current?.value || "",
      pinned: pinnedRef?.current?.checked || false,
    };

    props.submitProject(project);
  }

  function handleTagSubmit(tag: string) {
    props.submitTag(tag);
  }

  useEffect(() => {
    if (props.project) {
      const { title, description, sourceUrl, liveUrl, pinned } = props.project;

      titleRef.current!.value = title;
      descriptionRef.current!.value = description;
      sourceUrlRef.current!.value = sourceUrl;
      liveUrlRef.current!.value = liveUrl;
      pinnedRef.current!.checked = pinned;

      setTags(props.project.tags);
    }
  }, []);

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="input-group">
        <label className="block mb-1 text-sm" htmlFor="projectTitle">
          {t.projectTitle}
        </label>
        <input
          className="input big w-full"
          disabled={props?.isSubmitting}
          id="projectTitle"
          name="title"
          ref={titleRef}
          required
          type="text"
        />
      </div>

      <div className="input-group">
        <label className="block mb-1 text-sm" htmlFor="projectDescription">
          {t.projectDescription}
        </label>
        <textarea
          className="input big w-full font-mono"
          disabled={props?.isSubmitting}
          id="projectDescription"
          name="description"
          ref={descriptionRef}
          rows={4}
          required
        ></textarea>
      </div>

      <div className="input-group">
        <label className="block mb-1 text-sm">{t.projectTags}</label>
        <PostTagSelector
          tags={allTags}
          selected={tags}
          onSelect={handleTagSelect}
          onSubmit={handleTagSubmit}
        />
      </div>

      <div className="input-group">
        <label className="block mb-1 text-sm" htmlFor="projectSourceUrl">
          {t.projectSourceUrl}
        </label>
        <input
          className="input big w-full"
          disabled={props?.isSubmitting}
          id="projectSourceUrl"
          name="sourceUrl"
          ref={sourceUrlRef}
          required
          type="text"
        />
      </div>

      <div className="input-group">
        <label className="block mb-1 text-sm" htmlFor="projectLiveUrl">
          {t.projectLiveUrl}
        </label>
        <input
          className="input big w-full"
          disabled={props?.isSubmitting}
          id="projectLiveUrl"
          name="liveUrl"
          ref={liveUrlRef}
          required
          type="text"
        />
      </div>

      <div className="input-group">
        <label className="block mb-1 text-sm" htmlFor="projectPinned">
          {t.projectPinned}
        </label>
        <input
          disabled={props?.isSubmitting}
          id="projectPinned"
          name="pinned"
          ref={pinnedRef}
          type="checkbox"
        />
      </div>

      {/* 
      <div className="input-group">
        <label className="block mb-1 text-sm" htmlFor="projectImage">
          {t.projectImage}
        </label>
        <input
          disabled={props?.isSubmitting}
          id="projectImage"
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
          {t.projectSave}
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;
