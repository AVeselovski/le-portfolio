import Link from "next/link";
import ReactDOM from "react-dom";
import React, { useRef, useState } from "react";

import styles from "./Tags.module.css";

import type { ITranslation } from "../../types";

function Tags({
  lightTags = [],
  darkTags = [],
}: {
  lightTags?: string[];
  darkTags: string[];
}) {
  return (
    <ul className={styles.tagContainer}>
      {lightTags.map((s, i) => (
        <li key={`${i}-${s}`}>
          <span className={`${styles.tag} ${styles.lightTag}`}>{s}</span>
        </li>
      ))}
      {darkTags.map((s, i) => (
        <li key={`${i}-${s}`}>
          <span className={`${styles.tag} ${styles.darkTag}`}>{s}</span>
        </li>
      ))}
    </ul>
  );
}

export default Tags;

export function LinkTags({
  tags,
  tagBaseUrl = "/junkyard/s",
  showAll = "",
  showAllLink = "/junkyard",
}: {
  tags: string[];
  tagBaseUrl?: string;
  showAll?: string;
  showAllLink?: string;
}) {
  return (
    <div className={styles.tagContainer}>
      {showAll && (
        <Link href={showAllLink} key="all">
          <a>
            <span className={`${styles.tag}`}>{showAll}...</span>
          </a>
        </Link>
      )}
      {tags.map((tag) => (
        <Link href={`${tagBaseUrl}/${tag}`} key={tag}>
          <a>
            <span className={`${styles.tag} ${styles.active}`}>{tag}</span>
          </a>
        </Link>
      ))}
    </div>
  );
}

type TagSelectorProps = {
  tags: string[];
  selected: string[];
  onSelect: (tag: string, e: React.MouseEvent<HTMLButtonElement>) => void;
  onSubmit: (tag: string) => void;
  t: ITranslation;
};

export function TagSelector({
  tags = [],
  selected = [],
  onSelect = () => {},
  onSubmit = () => {},
  t = {},
}: TagSelectorProps) {
  const [showInput, setShowInput] = useState(false);

  const tagContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function getClass(tag: string) {
    return selected.includes(tag) ? styles.active : styles.inactive;
  }

  function toggleInput(
    e: React.FocusEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();

    setShowInput((val) => !val);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (inputRef?.current?.value) {
      onSubmit(inputRef.current.value);
      setShowInput((val) => !val);
    }
  }

  return (
    <div className={styles.tagContainer} ref={tagContainerRef}>
      {tags.map((tag) => (
        <button key={tag} onClick={onSelect.bind(null, tag)}>
          <span className={`${styles.tag} ${getClass(tag)}`}>{tag}</span>
        </button>
      ))}
      {showInput ? (
        ReactDOM.createPortal(
          <form onSubmit={handleSubmit}>
            <input
              autoFocus
              className="input"
              onBlur={toggleInput}
              ref={inputRef}
              type="text"
            />
          </form>,
          tagContainerRef.current!
        )
      ) : (
        <button key="new-tag" onClick={toggleInput}>
          <span className={styles.tag}>+ {t.adminAddTag}</span>
        </button>
      )}
    </div>
  );
}
