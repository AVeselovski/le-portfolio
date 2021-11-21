import React, { useEffect, useState } from "react";

import type { ITranslation } from "../../types";

type Props = {
  isSubmitting: boolean;
  submitTags: (tags: string[]) => void;
  tags: string[];
  t: ITranslation;
};

function TagsForm(props: Props) {
  const { t } = props;

  const [tags, setTags] = useState(props.tags.join(", "));

  function handleTagsUpdate(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;

    setTags(value);
  }

  function handleSubmit(
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    e.preventDefault();

    const cleanValue = tags.replace(/\s/g, "");
    const joinedTags = cleanValue.split(",");
    const updatedTags = joinedTags.filter(Boolean);

    props.submitTags(updatedTags);
  }

  useEffect(() => {
    setTags(props.tags.join(", "));
  }, [props.tags]);

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="input big w-full h-auto"
        disabled={props.isSubmitting}
        onChange={handleTagsUpdate}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
        placeholder={`${t.adminAllTags}...`}
        rows={2}
        value={tags}
      ></textarea>

      <div>
        <button
          className="submit-button"
          disabled={props?.isSubmitting}
          type="submit"
        >
          {t.adminUpdateTags}
        </button>
      </div>
    </form>
  );
}

export default TagsForm;
