import styles from "./ProjectsHeader.module.css";

import type { ITranslation } from "../../types";

type Props = {
  children?: JSX.Element | null;
  t: ITranslation;
};

export default function ProjectsHeader({ children, t }: Props) {
  return (
    <header className={styles.header}>
      <p>{t.projectsDescription}</p>
      {children}
    </header>
  );
}
