const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

export function formatCurrency(value = 0) {
  return currencyFormatter.format(Number(value) || 0);
}

export function parseCurrencyInput(value = "") {
  const digits = value.replace(/\D/g, "");
  return Number(digits) / 100;
}

export function formatCurrencyInput(value = 0) {
  return formatCurrency(value);
}
