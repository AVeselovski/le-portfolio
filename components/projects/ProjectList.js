import ProjectItem from "./ProjectItem";

function ProjectList({ projects, t }) {
  return (
    <ul className="flex flex-wrap gap-2 sm:w-full justify-center sm:justify-between">
      {projects.map((project, i) => (
        <ProjectItem key={`${i}-${project.slug}`} project={project} t={t} />
      ))}
    </ul>
  );
}

export default ProjectList;
