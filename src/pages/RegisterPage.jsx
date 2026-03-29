import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/shared/Button";
import { InputField } from "../components/shared/InputField";
import { ToastMessage } from "../components/shared/ToastMessage";
import "./auth-pages.css";

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (formData.password.length < 6) {
      setMessage({ type: "error", text: "A senha deve ter pelo menos 6 caracteres." });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", text: "As senhas nao conferem." });
      return;
    }

    try {
      setLoading(true);
      setMessage({ type: "", text: "" });
      await register(formData.email, formData.password);
      navigate("/", { replace: true });
    } catch (error) {
      setMessage({ type: "error", text: "Nao foi possivel criar a conta." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-form">
      <div>
        <span className="auth-form__eyebrow">Cadastro</span>
        <h2>Crie sua conta</h2>
        <p>Comece a controlar receitas e despesas com seguranca e simplicidade.</p>
      </div>

      <ToastMessage type={message.type} message={message.text} />

      <form className="auth-form__body" onSubmit={handleSubmit}>
        <InputField
          id="register-email"
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="voce@email.com"
          required
        />
        <InputField
          id="register-password"
          label="Senha"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Minimo de 6 caracteres"
          required
        />
        <InputField
          id="register-confirm-password"
          label="Confirmar senha"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Repita a senha"
          required
        />
        <Button type="submit" fullWidth disabled={loading}>
          {loading ? "Criando..." : "Criar conta"}
        </Button>
      </form>

      <p className="auth-form__footer">
        Ja possui conta? <Link to="/login">Entrar</Link>
      </p>
    </div>
  );
}
