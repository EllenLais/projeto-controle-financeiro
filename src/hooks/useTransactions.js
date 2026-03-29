import { useEffect, useMemo, useState } from "react";
import { createTransaction, removeTransaction, subscribeToTransactions } from "../services/transactionService";
import { calculateSummary, sortTransactions } from "../utils/transaction";

function getTransactionErrorMessage(error, action) {
  const code = error?.code || "";

  if (code === "permission-denied") {
    return `Sem permissao para ${action} a transacao. Verifique as regras do Firestore.`;
  }

  if (code === "unavailable") {
    return `Nao foi possivel ${action} a transacao agora. Verifique sua conexao.`;
  }

  if (code === "deadline-exceeded") {
    return `A operacao demorou demais para ${action} a transacao.`;
  }

  if (error?.message) {
    return error.message;
  }

  return `Nao foi possivel ${action} a transacao.`;
}

export function useTransactions(userId, filters) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      setTransactions([]);
      setLoading(false);
      return undefined;
    }

    setLoading(true);
    setError("");

    // Mantem a lista em tempo real sincronizada com o Firestore.
    const unsubscribe = subscribeToTransactions(
      userId,
      (data) => {
        setTransactions(data);
        setLoading(false);
      },
      (currentError) => {
        setError(getTransactionErrorMessage(currentError, "carregar"));
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [userId]);

  const filteredTransactions = useMemo(() => {
    const result = transactions.filter((transaction) => {
      const matchesType = filters.type ? transaction.type === filters.type : true;
      const matchesCategory = filters.category ? transaction.category === filters.category : true;
      const matchesDate = filters.date ? transaction.date === filters.date : true;

      return matchesType && matchesCategory && matchesDate;
    });

    return sortTransactions(result, filters.sortBy);
  }, [transactions, filters]);

  const summary = useMemo(() => calculateSummary(filteredTransactions), [filteredTransactions]);
  const overallSummary = useMemo(() => calculateSummary(transactions), [transactions]);

  async function addTransaction(data) {
    try {
      setSubmitting(true);
      setError("");
      await createTransaction(userId, data);
    } catch (currentError) {
      setError(getTransactionErrorMessage(currentError, "salvar"));
      throw currentError;
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteTransaction(transactionId) {
    try {
      setSubmitting(true);
      setError("");
      await removeTransaction(transactionId);
    } catch (currentError) {
      setError(getTransactionErrorMessage(currentError, "excluir"));
      throw currentError;
    } finally {
      setSubmitting(false);
    }
  }

  return {
    transactions,
    filteredTransactions,
    summary,
    overallSummary,
    loading,
    submitting,
    error,
    addTransaction,
    deleteTransaction
  };
}
