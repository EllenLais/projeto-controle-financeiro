import "./shared.css";

export function Button({
  children,
  type = "button",
  variant = "primary",
  fullWidth = false,
  disabled = false,
  ...rest
}) {
  return (
    <button
      type={type}
      className={`button button--${variant} ${fullWidth ? "button--full" : ""}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
