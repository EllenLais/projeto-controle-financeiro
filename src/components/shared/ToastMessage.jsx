import "./shared.css";

export function ToastMessage({ type = "success", message }) {
  if (!message) {
    return null;
  }

  return <div className={`toast toast--${type}`}>{message}</div>;
}
