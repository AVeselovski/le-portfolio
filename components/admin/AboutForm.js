import { useEffect, useRef, useState } from "react";

const DEFAULT_CONTENT = `---
hardSkills: "JavaScript,Next.js,React"
softSkills: "Agile,Front-end"
---

General Kenobi!
`;

function Form(props) {
  const { t } = props;

  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const bodyRef = useRef();
  const imageRef = useRef();

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
      body: bodyRef.current.value,
    };

    props.submitAbout(body);
  }

  useEffect(() => {
    bodyRef.current.value = props.content ? props.content : DEFAULT_CONTENT;
  }, []);

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="input-group">
        <label className="block mb-1 text-sm" htmlFor="aboutBody">
          {t.aboutBody}
        </label>
        <textarea
          className="input big w-full font-mono"
          disabled={props.isSubmitting}
          id="aboutBody"
          name="body"
          ref={bodyRef}
          rows={16}
          required
        ></textarea>
      </div>

      {/* 
      <div className="input-group">
        <label className="block mb-1 text-sm" htmlFor="aboutImage">
          {t.aboutImage}
        </label>
        <input
          disabled={props.isSubmitting}
          id="aboutImage"
          name="image"
          onChange={handleFileSelect}
          // style={{ display: "none" }}
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
          disabled={props.isSubmitting}
          type="submit"
        >
          {t.postSave}
        </button>
      </div>
    </form>
  );
}

export default Form;
