import ProjectItem from "./ProjectItem";

import styles from "./ProjectList.module.css";

import type { IProject, ITranslation } from "../../types";

type Props = {
  projects: IProject[];
  t: ITranslation;
};

function ProjectList({ projects, t }: Props) {
  return (
    <ul className={styles.projectList}>
      {projects.map((project, i) => (
        <ProjectItem key={project._id} project={project} t={t} />
      ))}
    </ul>
  );
}

export default ProjectList;
