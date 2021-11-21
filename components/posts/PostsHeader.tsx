import styles from "./PostsHeader.module.css";

import type { ITranslation } from "../../types";

type Props = {
  children: JSX.Element;
  t: ITranslation;
};

function PostsHeader({ children, t = {} }: Props) {
  return (
    <header className={styles.header}>
      <p>{t.blogDescription}</p>
      {children}
    </header>
  );
}

export default PostsHeader;
