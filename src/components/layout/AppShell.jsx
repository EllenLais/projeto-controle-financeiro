import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { Button } from "../shared/Button";
import "./app-shell.css";

export function AppShell() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-shell">
      <aside className="app-shell__sidebar">
        <div>
          <span className="app-shell__brand-tag">FinanceTracker</span>
          <h1>Seu painel financeiro em um so lugar.</h1>
          <p>
            Monitore saldo, acompanhe o fluxo mensal e registre cada movimento com
            rapidez.
          </p>
        </div>

        <div className="app-shell__sidebar-card">
          <span>Conta conectada</span>
          <strong>{user?.email}</strong>
        </div>

        <div className="app-shell__status-badge">Ambiente online e atualizado</div>

        <div className="app-shell__sidebar-actions">
          <Button variant="secondary" onClick={toggleTheme}>
            {theme === "dark" ? "Modo claro" : "Modo escuro"}
          </Button>
          <Button variant="secondary" onClick={logout}>
            Sair
          </Button>
        </div>
      </aside>

      <main className="app-shell__content">
        <Outlet />
      </main>
    </div>
  );
}
