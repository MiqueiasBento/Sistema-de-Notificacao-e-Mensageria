import { useState } from "react";
import { login } from "../services/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: any) {
    e.preventDefault();

    if (!email || !password) {
      alert("Preencha email e senha.");
      return;
    }

    try {
      const data = await login({
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("email", data.email);

      console.log("Login OK:", data);

      window.location.href = "/home";
    } catch (error: any) {
      if (error.response) {
        // O servidor respondeu com status code fora de 2xx
        console.log("Erro no servidor:", error.response.status);
        console.log("Mensagem:", error.response.data);
        alert(`Erro: ${error.response.data.message || error.response.status}`);
      } else if (error.request) {
        console.log("Sem resposta:", error.request);
        alert("Servidor não respondeu.");
      } else {
        console.log("Erro Axios:", error.message);
        alert(error.message);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
        <h1 className="mb-8 text-center !text-8xl font-extrabold leading-none tracking-tight">
          Login
        </h1>
        <form onSubmit={handleLogin}>
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
          <div className="mt-4 text-center">
            <span className="text-gray-600">Ainda não está registrado? </span>
            <a
              href="/register"
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
            >
              Registre-se
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
