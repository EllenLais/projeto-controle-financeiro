import { formatCurrency } from "../../utils/currency";
import "./dashboard.css";

export function SummaryCard({ title, value, tone = "neutral" }) {
  return (
    <article className={`summary-card summary-card--${tone}`}>
      <span>{title}</span>
      <strong>{formatCurrency(value)}</strong>
    </article>
  );
}
