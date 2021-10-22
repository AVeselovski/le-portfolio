import { useRouter } from "next/router";
import Link from "next/link";

export default function ContentHeader({ t = {} }) {
  const router = useRouter();

  return (
    <div className="content-header">
      <Link className="button" href="/junkyard">
        <a className="button">&larr; {t.back}</a>
      </Link>
    </div>
  );
}
