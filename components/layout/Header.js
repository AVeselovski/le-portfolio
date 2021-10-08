import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between w-full h-16 border-b shadow-sm">
      <div className="p-2 pl-5 text-3xl">
        <Link href="/">AV.</Link>
      </div>
      <nav className="p-2 pr-5">
        <ul className="flex gap-4">
          <li>
            <Link href="/junkyard">
              <a className="hover:text-blue-500">Junkyard</a>
            </Link>
          </li>
          <li>
            <Link href="/projects">
              <a className="hover:text-blue-500">Projects</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a className="hover:text-blue-500">About me</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
