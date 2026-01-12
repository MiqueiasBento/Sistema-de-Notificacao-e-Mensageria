import { useState } from "react";
import type { UserRole } from "../types";
import { register, registerSuporte } from "../services/auth";

export default function Register() {
  const [role, setRole] = useState<UserRole | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    // Validações básicas
    if (!role) {
      alert("Selecione um tipo de perfil");
      return;
    }
    if (!name.trim() || !email.trim() || !password) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }
    if (password !== confirmPassword) {
      alert("Senhas não conferem");
      setConfirmPassword("");
      return;
    }

    const payload = { name, email, password };

    try {
      if (role === "USUARIO") {
        await register(payload);
      }

      if (role === "SUPORTE") {
        await registerSuporte(payload);
      }

      alert("Registro efetuado com sucesso! Redirecionando para login...");
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
      alert("Erro de rede ao tentar registrar. Tente novamente mais tarde.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
        <h1 className="mb-8 text-center !text-8xl font-extrabold leading-none tracking-tight">
          Registro de perfil
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Tipo de Perfil
            </label>
            <div className="mt-1">
              <select
                id="role"
                value={role ?? ""}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              >
                <option value="" disabled>
                  Selecione um perfil
                </option>
                <option value="USUARIO">Usuário</option>
                <option value="SUPORTE">Suporte</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Registrar
          </button>

          <div className="mt-4 border-t pt-4 text-center">
            <p className="text-sm text-gray-600">
              Já tem cadastro?{" "}
              <a
                href="/login"
                className="text-blue-600 font-medium hover:underline"
              >
                Vá para a tela de login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
