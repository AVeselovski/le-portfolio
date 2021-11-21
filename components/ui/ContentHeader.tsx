import Link from "next/link";

import type { ITranslation } from "../../types";

export default function ContentHeader({ t = {} }: { t: ITranslation }) {
  return (
    <div className="content-header">
      <Link href="/junkyard">
        <a className="button">&larr; {t.back}</a>
      </Link>
    </div>
  );
}
