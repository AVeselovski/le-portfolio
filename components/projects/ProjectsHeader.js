export default function ProjectsHeader({ children, t }) {
  return (
    <header className="mb-8">
      <p className="text-lg mb-10 bg-gray-100 rounded-md p-2 px-3">
        {t.projectsDescription}
      </p>
      {children}
    </header>
  );
}
