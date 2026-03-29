export function formatDate(value) {
  if (!value) {
    return "--";
  }

  const date = new Date(`${value}T00:00:00`);

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(date);
}

export function getMonthKey(value) {
  const date = new Date(`${value}T00:00:00`);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
}

export function getMonthLabel(value) {
  const [year, month] = value.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);

  return new Intl.DateTimeFormat("pt-BR", {
    month: "short",
    year: "numeric"
  }).format(date);
}

export function getCurrentDateInput() {
  return new Date().toISOString().split("T")[0];
}
