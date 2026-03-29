import "./shared.css";

export function SelectField({ id, label, error, children, ...rest }) {
  return (
    <label className="field" htmlFor={id}>
      <span className="field__label">{label}</span>
      <div className={`field__control ${error ? "field__control--error" : ""}`}>
        <select id={id} className="field__input" {...rest}>
          {children}
        </select>
      </div>
      {error ? <span className="field__message field__message--error">{error}</span> : null}
    </label>
  );
}
