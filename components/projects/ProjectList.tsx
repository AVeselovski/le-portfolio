import ProjectItem from "./ProjectItem";

import type { IProject, ITranslation } from "../../types";

type Props = {
  projects: IProject[];
  t: ITranslation;
};

function ProjectList({ projects, t }: Props) {
  return (
    <ul className="flex flex-wrap gap-2 sm:w-full justify-center sm:justify-between">
      {projects.map((project, i) => (
        <ProjectItem key={project._id} project={project} t={t} />
      ))}
    </ul>
  );
}

export default ProjectList;
