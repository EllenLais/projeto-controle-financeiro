import { formatCurrency } from "../../utils/currency";
import { formatDate } from "../../utils/date";
import { EmptyState } from "../shared/EmptyState";
import { Button } from "../shared/Button";
import "./dashboard.css";

export function TransactionTable({ transactions, onDelete, loading }) {
  if (!loading && !transactions.length) {
    return (
      <EmptyState
        title="Nenhuma transação encontrada"
        description="Ajuste os filtros ou cadastre uma nova movimentacao para ver os dados aqui."
      />
    );
  }

  return (
    <div className="panel table-panel">
      <div className="section-heading">
        <div>
          <span>Historico</span>
          <h2>Lista de transações</h2>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Categoria</th>
              <th>Data</th>
              <th>Valor</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>
                  <span className={`pill pill--${transaction.type}`}>
                    {transaction.type === "entrada" ? "Entrada" : "Saida"}
                  </span>
                </td>
                <td>{transaction.category}</td>
                <td>{formatDate(transaction.date)}</td>
                <td className={transaction.type === "entrada" ? "value-positive" : "value-negative"}>
                  {transaction.type === "entrada" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </td>
                <td className="transaction-table__actions">
                  <Button variant="danger" onClick={() => onDelete(transaction.id)} disabled={loading}>
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
