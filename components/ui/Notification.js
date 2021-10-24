import ReactDOM from "react-dom";
import { useTranslation } from "../../store/i18n";

export default function Notification(props) {
  const { status = "error", message = "" } = props;

  const { t } = useTranslation();

  const titles = {
    error: `${t.error}:`,
    success: `${t.success}:`,
    warning: `${t.warning}:`,
  };

  return ReactDOM.createPortal(
    <div className="notification-overlay">
      <div className={`notification ${status}`}>
        <span className="font-semibold">{titles[status]}</span>{" "}
        <span>{message}</span>
      </div>
    </div>,
    document.body
  );
}
