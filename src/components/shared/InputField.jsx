import "./shared.css";

export function InputField({
  id,
  label,
  error,
  hint,
  icon,
  className = "",
  ...rest
}) {
  return (
    <label className={`field ${className}`} htmlFor={id}>
      <span className="field__label">{label}</span>
      <div className={`field__control ${error ? "field__control--error" : ""}`}>
        {icon ? <span className="field__icon">{icon}</span> : null}
        <input id={id} className="field__input" {...rest} />
      </div>
      {error ? <span className="field__message field__message--error">{error}</span> : null}
      {!error && hint ? <span className="field__message">{hint}</span> : null}
    </label>
  );
}
