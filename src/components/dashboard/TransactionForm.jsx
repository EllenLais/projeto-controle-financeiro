import { useState } from "react";
import { TRANSACTION_CATEGORIES, TRANSACTION_TYPES } from "../../constants/categories";
import { formatCurrencyInput, parseCurrencyInput } from "../../utils/currency";
import { getCurrentDateInput } from "../../utils/date";
import { Button } from "../shared/Button";
import { InputField } from "../shared/InputField";
import { SelectField } from "../shared/SelectField";
import "./dashboard.css";

const initialFormState = {
  type: "entrada",
  amount: 0,
  category: TRANSACTION_CATEGORIES[0],
  date: getCurrentDateInput()
};

export function TransactionForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value
    }));
  }

  function handleAmountChange(event) {
    setFormData((current) => ({
      ...current,
      amount: parseCurrencyInput(event.target.value)
    }));
  }

  function validate() {
    const nextErrors = {};

    if (!formData.amount || formData.amount <= 0) {
      nextErrors.amount = "Informe um valor maior que zero.";
    }

    if (!formData.date) {
      nextErrors.date = "Informe a data da transacao.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    await onSubmit(formData);
    setFormData({
      ...initialFormState,
      date: getCurrentDateInput()
    });
    setErrors({});
  }

  return (
    <form className="panel form-panel" onSubmit={handleSubmit}>
      <div className="section-heading">
        <div>
          <span>Nova movimentacao</span>
          <h2>Adicionar transação</h2>
        </div>
      </div>

      <div className="form-grid">
        <SelectField id="type" label="Tipo" name="type" value={formData.type} onChange={handleChange}>
          {TRANSACTION_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </SelectField>

        <SelectField
          id="category"
          label="Categoria"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          {TRANSACTION_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </SelectField>

        <InputField
          id="amount"
          label="Valor"
          name="amount"
          value={formatCurrencyInput(formData.amount)}
          onChange={handleAmountChange}
          error={errors.amount}
          inputMode="numeric"
          placeholder="R$ 0,00"
        />

        <InputField
          id="date"
          label="Data"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          error={errors.date}
        />
      </div>

      <Button type="submit" fullWidth disabled={loading}>
        {loading ? "Salvando..." : "Salvar transacao"}
      </Button>
    </form>
  );
}
