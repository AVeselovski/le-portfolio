import styles from "./Table.module.css";

function TableHead({ children }) {
  return <thead className={styles.tableHead}>{children}</thead>;
}

function TableBody({ children }) {
  return <tbody className={styles.tableBody}>{children}</tbody>;
}

function Table({ children, className }) {
  return <table className={`${styles.table} ${className}`}>{children}</table>;
}

Table.Head = TableHead;
Table.Body = TableBody;

export default Table;
