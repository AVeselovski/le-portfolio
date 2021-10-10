import ReactDOM from "react-dom";

export default function Notification(props) {
  const { status = "error", message = "" } = props;

  const titles = {
    error: "Error:",
    success: "Success:",
    warning: "Warning:",
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
