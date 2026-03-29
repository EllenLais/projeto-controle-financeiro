import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { buildMonthlyChartData } from "../../utils/transaction";
import { EmptyState } from "../shared/EmptyState";
import "./dashboard.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export function MonthlyChart({ transactions }) {
  if (!transactions.length) {
    return (
      <EmptyState
        title="Sem dados para o grafico"
        description="Adicione transacoes para acompanhar entradas e saidas por mes."
      />
    );
  }

  const data = buildMonthlyChartData(transactions);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top"
      }
    }
  };

  return (
    <div className="chart-card">
      <div className="section-heading">
        <div>
          <span>Visao mensal</span>
          <h2>Entradas vs saídas por mês</h2>
        </div>
      </div>
      <div className="chart-card__canvas">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
