import "../shared/shared.css";

export function FullscreenLoader({ label = "Carregando..." }) {
  return (
    <div className="fullscreen-loader">
      <div className="spinner" />
      <span>{label}</span>
    </div>
  );
}
