import "./dashboard.css";

export function TransactionSkeleton() {
  return (
    <div className="skeleton-grid">
      <div className="skeleton-card" />
      <div className="skeleton-card" />
      <div className="skeleton-card" />
      <div className="skeleton-panel" />
      <div className="skeleton-panel skeleton-panel--wide" />
    </div>
  );
}
