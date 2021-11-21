import Image from "next/image";
import ReactMarkdown from "react-markdown";

import styles from "./ProjectItem.module.css";

import Tags from "../ui/Tags";

import type { IProject, ITranslation } from "../../types";

type Props = {
  project: IProject;
  t: ITranslation;
};

function ProjectItem({ project, t = {} }: Props) {
  const {
    title,
    // slug,
    description,
    tags,
    image,
    liveUrl = "#",
    sourceUrl = "#",
  } = project;

  // const imagePath = `/images/projects/${slug}/${image?.src}`;
  const aspectRatio = image && image.width / image.height;
  const imageWidth = 452;
  const imageHeight = aspectRatio && imageWidth / aspectRatio;

  return (
    <li className={styles.projectItem}>
      {/* <a className={styles.imageLink} href={sourceUrl} target="_blank"></a> */}
      {!!image && (
        <div className={styles.projectImage}>
          <Image
            alt={title}
            height={imageHeight}
            width={imageWidth}
            src=""
            // src={imagePath}
          />
        </div>
      )}
      <div className={styles.projectContent}>
        <header>
          <a href={sourceUrl} target="_blank">
            <div className={styles.headerContent}>
              <h2>{title}</h2>
              <div>&rarr;</div>
            </div>
          </a>
        </header>
        <div className={styles.body}>
          <ReactMarkdown>{description}</ReactMarkdown>
          <a className={`${styles.link} mr-4`} href={sourceUrl} target="_blank">
            {t.projectSourceUrl} &rarr;
          </a>
          <a className={styles.link} href={liveUrl} target="_blank">
            {t.projectLiveUrl} &rarr;
          </a>
        </div>
        <footer className={styles.footer}>
          <Tags darkTags={tags} />
        </footer>
      </div>
    </li>
  );
}

export default ProjectItem;
