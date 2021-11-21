import Link from "next/link";

import styles from "./ContentHeader.module.css";

import type { ITranslation } from "../../types";

export default function ContentHeader({ t = {} }: { t: ITranslation }) {
  return (
    <div className={styles.contentHeader}>
      <Link href="/junkyard">
        <a className={styles.button}>&larr; {t.back}</a>
      </Link>
    </div>
  );
}
