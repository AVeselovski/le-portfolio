import { useEffect, useState } from "react";

function TagsForm(props) {
  const { t } = props;

  const [tags, setTags] = useState(props.tags.join(", "));

  function handleTagsUpdate(e) {
    const value = e.target.value;

    setTags(value);
  }

  function handleSubmit(e) {
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
        rows="2"
        value={tags}
      ></textarea>
    </form>
  );
}

export default TagsForm;
