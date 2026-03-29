import { getMonthKey, getMonthLabel } from "./date";

export function calculateSummary(transactions) {
  return transactions.reduce(
    (summary, transaction) => {
      const amount = Number(transaction.amount) || 0;

      if (transaction.type === "entrada") {
        summary.income += amount;
      } else {
        summary.expense += amount;
      }

      summary.balance = summary.income - summary.expense;
      return summary;
    },
    { balance: 0, income: 0, expense: 0 }
  );
}

export function buildMonthlyChartData(transactions) {
  const grouped = transactions.reduce((accumulator, transaction) => {
    const key = getMonthKey(transaction.date);

    if (!accumulator[key]) {
      accumulator[key] = { income: 0, expense: 0 };
    }

    if (transaction.type === "entrada") {
      accumulator[key].income += Number(transaction.amount) || 0;
    } else {
      accumulator[key].expense += Number(transaction.amount) || 0;
    }

    return accumulator;
  }, {});

  const labels = Object.keys(grouped).sort();

  return {
    labels: labels.map(getMonthLabel),
    datasets: [
      {
        label: "Entradas",
        data: labels.map((label) => grouped[label].income),
        backgroundColor: "rgba(27, 172, 120, 0.85)",
        borderRadius: 10
      },
      {
        label: "Saidas",
        data: labels.map((label) => grouped[label].expense),
        backgroundColor: "rgba(225, 95, 65, 0.85)",
        borderRadius: 10
      }
    ]
  };
}

export function sortTransactions(transactions, sortBy) {
  const sorted = [...transactions];

  sorted.sort((current, next) => {
    if (sortBy === "oldest") {
      return new Date(current.date) - new Date(next.date);
    }

    if (sortBy === "highest") {
      return Number(next.amount) - Number(current.amount);
    }

    if (sortBy === "lowest") {
      return Number(current.amount) - Number(next.amount);
    }

    return new Date(next.date) - new Date(current.date);
  });

  return sorted;
}
