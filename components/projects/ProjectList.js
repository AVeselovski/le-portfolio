import ProjectItem from "./ProjectItem";

function ProjectList({ projects }) {
  return (
    <ul className="flex flex-wrap gap-2 sm:w-full justify-between">
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </ul>
  );
}

export default ProjectList;
