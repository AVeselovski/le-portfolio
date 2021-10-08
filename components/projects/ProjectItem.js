import Link from "next/link";

function ProjectItem({ id, title, description }) {
  const projectLink = `/projects/${id}`;

  return (
    <li className="project-item">
      <div>
        <header className="mb-5">
          <Link href={projectLink}>
            <a className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl">{title}</h2>
              </div>
              <div className="text-3xl">&rarr;</div>
            </a>
          </Link>
        </header>
        <div className="mb-5">{description}</div>
      </div>
    </li>
  );
}

export default ProjectItem;
