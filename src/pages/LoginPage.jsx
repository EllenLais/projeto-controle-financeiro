import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/shared/Button";
import { InputField } from "../components/shared/InputField";
import { ToastMessage } from "../components/shared/ToastMessage";
import "./auth-pages.css";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setMessage({ type: "", text: "" });
      await login(formData.email, formData.password);
      navigate("/", { replace: true });
    } catch (error) {
      setMessage({ type: "error", text: "Email ou senha invalidos." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-form">
      <div>
        <span className="auth-form__eyebrow">Entrar</span>
        <h2>Acesse sua conta</h2>
        <p>Faça login para visualizar seu painel financeiro em tempo real.</p>
      </div>

      <ToastMessage type={message.type} message={message.text} />

      <form className="auth-form__body" onSubmit={handleSubmit}>
        <InputField
          id="email"
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="voce@email.com"
          required
        />
        <InputField
          id="password"
          label="Senha"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Digite sua senha"
          required
        />
        <Button type="submit" fullWidth disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      <p className="auth-form__footer">
        Ainda nao tem conta? <Link to="/cadastro">Criar cadastro</Link>
      </p>
    </div>
  );
}
