import Image from "next/image";
import ReactMarkdown from "react-markdown";

import Tags from "./Tags";

function ProjectItem({ project, t = {} }) {
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
  const imageWidth = 452;
  const imageHeight = imageWidth / aspectRatio;

  return (
    <li className="project-item">
      {/* <a className="image-link" href={sourceUrl} target="_blank"></a> */}
      {!!image?.height && (
        <div className="project-image">
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
          <a className="image-link" href={sourceUrl} target="_blank">
            <div className="flex items-center justify-between mt-2">
              <h2 className="text-3xl">{title}</h2>
              <div className="text-3xl">&rarr;</div>
            </div>
          </a>
        </header>
        <div className="mb-5 self-stretch flex-1">
          <ReactMarkdown>{description}</ReactMarkdown>
          <a
            className="link inline-block mr-4 mt-4"
            href={sourceUrl}
            target="_blank"
          >
            {t.projectSourceUrl} &rarr;
          </a>
          <a className="link inline-block mt-4" href={liveUrl} target="_blank">
            {t.projectLiveUrl} &rarr;
          </a>
        </div>
        <footer className="flex justify-between items-center flex-wrap">
          <Tags tags={tags} />
        </footer>
      </div>
    </li>
  );
}

export default ProjectItem;
