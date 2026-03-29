import { TRANSACTION_CATEGORIES } from "../../constants/categories";
import { Button } from "../shared/Button";
import { InputField } from "../shared/InputField";
import { SelectField } from "../shared/SelectField";
import "./dashboard.css";

export function TransactionFilters({ filters, onChange, onReset }) {
  function handleChange(event) {
    const { name, value } = event.target;
    onChange(name, value);
  }

  return (
    <div className="panel filters-panel">
      <div className="section-heading section-heading--space-between">
        <div>
          <span>Explorar dados</span>
          <h2>Filtros e ordenação</h2>
        </div>
        <Button variant="secondary" onClick={onReset}>
          Limpar
        </Button>
      </div>

      <div className="filters-grid">
        <SelectField id="filter-type" label="Tipo" name="type" value={filters.type} onChange={handleChange}>
          <option value="">Todos</option>
          <option value="entrada">Entrada</option>
          <option value="saida">Saida</option>
        </SelectField>

        <SelectField
          id="filter-category"
          label="Categoria"
          name="category"
          value={filters.category}
          onChange={handleChange}
        >
          <option value="">Todas</option>
          {TRANSACTION_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </SelectField>

        <InputField
          id="filter-date"
          label="Data"
          name="date"
          type="date"
          value={filters.date}
          onChange={handleChange}
        />

        <SelectField id="filter-sort" label="Ordenar por" name="sortBy" value={filters.sortBy} onChange={handleChange}>
          <option value="latest">Mais recentes</option>
          <option value="oldest">Mais antigas</option>
          <option value="highest">Maior valor</option>
          <option value="lowest">Menor valor</option>
        </SelectField>
      </div>
    </div>
  );
}
