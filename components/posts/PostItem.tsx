import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useContext } from "react";

import I18nContext from "../../store/i18n";
import styles from "./PostItem.module.css";

import { LinkTags } from "../ui/Tags";

import type { IPost } from "../../types";

function PostItem({ post }: { post: IPost }) {
  const { t } = useContext(I18nContext);

  const { description, slug, tags = [], title } = post;
  const postLink = `/junkyard/${slug}`;
  // const humanReadableDate = new Date(updatedAt).toLocaleDateString("fi-FI", {
  //   day: "numeric",
  //   month: "numeric",
  //   year: "numeric",
  // });

  return (
    <li className={styles.postItem}>
      <div>
        <header className={styles.header}>
          <Link href={postLink}>
            <a>
              <div>
                <h2>{title}</h2>
                {/* <span className="text-gray-500 text-sm">
                  {t.postLastUpdated}: {humanReadableDate}
                </span> */}
              </div>
              <div className={styles.linkArrow}>&rarr;</div>
            </a>
          </Link>
        </header>
        <div className="markdown mb-6">
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
        <footer className={styles.footer}>
          <LinkTags tags={tags} />
          <Link href={postLink}>
            <a className={styles.footerLink}>{t.postRead}...</a>
          </Link>
        </footer>
      </div>
    </li>
  );
}

export default PostItem;
