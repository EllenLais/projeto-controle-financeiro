import "./auth-layout.css";

export function AuthLayout({ children }) {
  return (
    <main className="auth-layout">
      <section className="auth-layout__hero">
        <span className="auth-layout__eyebrow">FinanceTracker</span>
        <h1>Controle financeiro pessoal com clareza, ritmo e previsibilidade.</h1>
        <p>
          Registre entradas e saídas, acompanhe gráficos mensais e mantenha sua vida
          financeira organizada em uma experiência moderna e responsiva.
        </p>
      </section>
      <section className="auth-layout__card">{children}</section>
    </main>
  );
}
