import ReactDOM from "react-dom";

import { useTranslation } from "../../store/i18n";
import styles from "./Notification.module.css";

import type { INotification } from "../../types";

type Props = {
  message: INotification["message"];
  status: INotification["status"];
};

export default function Notification(props: Props) {
  const { status = "error", message = "" } = props;

  const { t } = useTranslation();

  const titles = {
    error: `${t.error}:`,
    success: `${t.success}:`,
    warning: `${t.warning}:`,
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={`${styles.notification} ${styles[status]}`}>
        <span className="font-semibold">{titles[status]}</span>{" "}
        <span>{message}</span>
      </div>
    </div>,
    document.body
  );
}
