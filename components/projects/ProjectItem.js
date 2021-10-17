import Image from "next/image";
import ReactMarkdown from "react-markdown";

import Tags from "./Tags";

function ProjectItem({ project }) {
  const {
    title,
    slug,
    description,
    tags,
    image,
    liveUrl = "#",
    sourceUrl = "#",
  } = project;

  const imagePath = `/images/projects/${slug}/${image?.src}`;
  const aspectRatio = image?.width / image?.height;
  const imageWidth = 752;
  const imageHeight = imageWidth / aspectRatio;

  return (
    <li className="project-item">
      <a className="image-link" href={sourceUrl} target="_blank">
        {!!image?.height && (
          <div className="project-image border-b">
            <Image
              alt={title}
              height={imageHeight}
              width={imageWidth}
              src={imagePath}
            />
          </div>
        )}
        <div className="project-item-body">
          <header className="mb-5">
            <div className="flex items-center justify-between mt-2">
              <h2 className="text-3xl">{title}</h2>
              <div className="text-3xl">&rarr;</div>
            </div>
          </header>
          <div className="mb-5">
            <ReactMarkdown>{description}</ReactMarkdown>
            <a className="link" href={liveUrl} target="_blank">
              Live...
            </a>
          </div>
          <footer className="flex justify-between items-center flex-wrap">
            <Tags tags={tags} />
          </footer>
        </div>
      </a>
    </li>
  );
}

export default ProjectItem;
