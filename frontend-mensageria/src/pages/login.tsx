import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!email || !password) {
        alert("Preencha email e senha.");
        return;
    }

    try {
        const payload: Record<string, unknown> = { email, password };
     
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({ message: res.statusText }));
            alert(err.message || "Erro no login");
            return;
        }

        const data = await res.json();
        if (data.token) localStorage.setItem("token", data.token);
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

        // redirecionar para a página principal ou dashboard
        window.location.href = "/";
    } catch (error) {
        console.error(error);
        alert("Erro ao conectar com o servidor.");
    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
        <h1 className="mb-8 text-center !text-8xl font-extrabold leading-none tracking-tight">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
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
