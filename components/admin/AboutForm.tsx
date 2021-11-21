import { useEffect, useRef } from "react";

import type { ITranslation } from "../../types";

const DEFAULT_CONTENT = `---
hardSkills: "JavaScript,Next.js,React"
softSkills: "Agile,Front-end"
---

General Kenobi!
`;

type Props = {
  content: string;
  isSubmitting: boolean;
  submitAbout: ({ body }: { body: string }) => void;
  t: ITranslation;
};

function Form(props: Props) {
  const { t } = props;

  // const [image, setImage] = useState<File>();
  // const [createObjectURL, setCreateObjectURL] = useState<string>();

  const bodyRef = useRef<HTMLTextAreaElement>(null);
  // const imageRef = useRef<HTMLImageElement>(null);

  // function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
  //   e.preventDefault();

  //   const img = e.target?.files?.[0];
  //   setImage(img);
  //   setCreateObjectURL(URL.createObjectURL(img));
  // }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const body = {
      body: bodyRef?.current?.value || "",
    };

    props.submitAbout(body);
  }

  useEffect(() => {
    bodyRef.current!.value = props.content ? props.content : DEFAULT_CONTENT;
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
