import { useState } from "react";
import { MonthlyChart } from "../components/dashboard/MonthlyChart";
import { SummaryCard } from "../components/dashboard/SummaryCard";
import { TransactionFilters } from "../components/dashboard/TransactionFilters";
import { TransactionForm } from "../components/dashboard/TransactionForm";
import { TransactionSkeleton } from "../components/dashboard/TransactionSkeleton";
import { TransactionTable } from "../components/dashboard/TransactionTable";
import { ToastMessage } from "../components/shared/ToastMessage";
import { useAuth } from "../hooks/useAuth";
import { useTransactions } from "../hooks/useTransactions";
import "./dashboard-page.css";

const initialFilters = {
  type: "",
  category: "",
  date: "",
  sortBy: "latest"
};

export function DashboardPage() {
  const { user } = useAuth();
  const [filters, setFilters] = useState(initialFilters);
  const [feedback, setFeedback] = useState({ type: "", text: "" });
  const {
    transactions,
    filteredTransactions,
    summary,
    overallSummary,
    loading,
    submitting,
    error,
    addTransaction,
    deleteTransaction
  } = useTransactions(user?.uid, filters);

  function updateFilter(name, value) {
    setFilters((current) => ({
      ...current,
      [name]: value
    }));
  }

  function resetFilters() {
    setFilters(initialFilters);
  }

  async function handleAddTransaction(data) {
    try {
      await addTransaction(data);
      setFeedback({ type: "success", text: "Transacao salva com sucesso." });
    } catch (currentError) {
      setFeedback({ type: "error", text: "Nao foi possivel salvar a transacao." });
    }
  }

  async function handleDeleteTransaction(transactionId) {
    try {
      await deleteTransaction(transactionId);
      setFeedback({ type: "success", text: "Transacao removida com sucesso." });
    } catch (currentError) {
      setFeedback({ type: "error", text: "Nao foi possivel excluir a transacao." });
    }
  }

  if (loading) {
    return <TransactionSkeleton />;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-page__release-badge">
        Ambiente atualizado: deploy automatico ativo em 07/04/2026
      </div>
      <section className="dashboard-page__header">
        <div>
          <span className="dashboard-page__eyebrow">Painel principal</span>
          <h2>Visão geral das suas finanças</h2>
          <p>
            Acompanhe seu saldo total, receitas, despesas e o comportamento mensal das
            movimentacoes.
          </p>
        </div>
        <div className="dashboard-page__insight">
          <span>Resumo total</span>
          <strong>{transactions.length} transacoes cadastradas</strong>
        </div>
      </section>

      <ToastMessage type={feedback.type || "success"} message={feedback.text || error} />

      <section className="summary-grid">
        <SummaryCard title="Saldo total" value={overallSummary.balance} tone="neutral" />
        <SummaryCard title="Receitas" value={overallSummary.income} tone="income" />
        <SummaryCard title="Despesas" value={overallSummary.expense} tone="expense" />
      </section>

      <section className="dashboard-grid">
        <TransactionForm onSubmit={handleAddTransaction} loading={submitting} />
        <MonthlyChart transactions={transactions} />
      </section>

      <section className="summary-grid summary-grid--compact">
        <SummaryCard title="Saldo filtrado" value={summary.balance} tone="neutral" />
        <SummaryCard title="Entradas filtradas" value={summary.income} tone="income" />
        <SummaryCard title="Saidas filtradas" value={summary.expense} tone="expense" />
      </section>

      <TransactionFilters filters={filters} onChange={updateFilter} onReset={resetFilters} />
      <TransactionTable
        transactions={filteredTransactions}
        onDelete={handleDeleteTransaction}
        loading={submitting}
      />
    </div>
  );
}
