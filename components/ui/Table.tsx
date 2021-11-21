import styles from "./Table.module.css";

function TableHead({ children }: { children: JSX.Element }) {
  return <thead className={styles.tableHead}>{children}</thead>;
}

function TableBody({ children }: { children: JSX.Element[] }) {
  return <tbody className={styles.tableBody}>{children}</tbody>;
}

function Table({
  children,
  className,
}: {
  children: JSX.Element | JSX.Element[];
  className: string;
}) {
  return <table className={`${styles.table} ${className}`}>{children}</table>;
}

Table.Head = TableHead;
Table.Body = TableBody;

export default Table;
