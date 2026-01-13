import { useEffect, useState } from "react";
import { Headphones, Search } from "lucide-react";
import type { Ticket, TicketStatus } from "../types";
import { getTickets, updateTicketStatus } from "../services/chamados";

export function SupportView() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"ativos" | "resolvidos">("ativos");

  const [editingStatusId, setEditingStatusId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<TicketStatus>("PENDENTE");

  useEffect(() => {
    loadTickets();
  }, []);

  async function loadTickets() {
    try {
      setLoading(true);
      const data = await getTickets();
      setTickets(data);
    } catch (error) {
      console.error("Erro ao buscar chamados", error);
    } finally {
      setLoading(false);
    }
  }

  /* =========================
     HELPERS
  ========================== */

  const getStatusLabel = (status: string) => {
    const labels = {
      PENDENTE: "Pendente",
      EM_ANDAMENTO: "Em Andamento",
      RESOLVIDO: "Resolvido",
      FECHADO: "Fechado",
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      PENDENTE: "bg-yellow-100 text-yellow-800 border-yellow-300",
      EM_ANDAMENTO: "bg-blue-100 text-blue-800 border-blue-300",
      RESOLVIDO: "bg-green-100 text-green-800 border-green-300",
      FECHADO: "bg-gray-100 text-gray-800 border-gray-300",
    };
    return colors[status as keyof typeof colors];
  };

  const formatDate = (value: Date | string) => {
    const date = value instanceof Date ? value : new Date(value);
    if (isNaN(date.getTime())) return "Data inválida";

    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };


  async function handleUpdateStatus(ticketId: string) {
    try {
      const updated = await updateTicketStatus(ticketId, {
        status: newStatus,
      });

      setTickets((prev) =>
        prev.map((t) => (t.id === ticketId ? updated : t))
      );

      setEditingStatusId(null);
    } catch (error) {
      console.error("Erro ao atualizar status", error);
      alert("Erro ao atualizar status do chamado");
    }
  }

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toString().includes(searchTerm)
  );

  const activeTickets = filteredTickets.filter(
    (t) => t.status !== "RESOLVIDO" && t.status !== "FECHADO"
  );

  const resolvedTickets = filteredTickets.filter(
    (t) => t.status === "RESOLVIDO" || t.status === "FECHADO"
  );

  const displayTickets =
    activeTab === "ativos" ? activeTickets : resolvedTickets;

  const ticketStats = {
    total: tickets.length,
    pendente: tickets.filter((t) => t.status === "PENDENTE").length,
    emAndamento: tickets.filter((t) => t.status === "EM_ANDAMENTO").length,
    resolvido: tickets.filter((t) => t.status === "RESOLVIDO").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando chamados...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Headphones className="w-6 h-6 text-blue-600" />
            <h1>Painel de Suporte</h1>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-2xl">{ticketStats.total}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-700">Pendentes</p>
              <p className="text-2xl text-yellow-800">
                {ticketStats.pendente}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-700">Em Andamento</p>
              <p className="text-2xl text-blue-800">
                {ticketStats.emAndamento}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-700">Resolvidos</p>
              <p className="text-2xl text-green-800">
                {ticketStats.resolvido}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex gap-4 mb-4 border-b">
            <button
              onClick={() => setActiveTab("ativos")}
              className={`pb-2 px-4 ${
                activeTab === "ativos"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              Ativos ({activeTickets.length})
            </button>
            <button
              onClick={() => setActiveTab("resolvidos")}
              className={`pb-2 px-4 ${
                activeTab === "resolvidos"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              Resolvidos ({resolvedTickets.length})
            </button>
          </div>

          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome, e-mail ou ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md"
            />
          </div>

          <div className="space-y-4">
            {displayTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="border rounded-lg p-4 bg-white"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm text-gray-500">#{ticket.id}</p>
                    <p>{ticket.userName}</p>
                    <p className="text-sm text-gray-500">{ticket.email}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="text-sm text-gray-500">
                      {formatDate(ticket.createAt)}
                    </span>

                    {editingStatusId === ticket.id ? (
                      <div className="flex gap-2">
                        <select
                          value={newStatus}
                          onChange={(e) =>
                            setNewStatus(e.target.value as TicketStatus)
                          }
                          className="border rounded px-2 py-1 text-sm"
                        >
                          <option value="PENDENTE">Pendente</option>
                          <option value="EM_ANDAMENTO">Em Andamento</option>
                          <option value="RESOLVIDO">Resolvido</option>
                          <option value="FECHADO">Fechado</option>
                        </select>
                        <button
                          onClick={() => handleUpdateStatus(ticket.id)}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                        >
                          Salvar
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingStatusId(ticket.id);
                          setNewStatus(ticket.status);
                        }}
                        className={`px-2 py-1 text-xs border rounded ${getStatusColor(
                          ticket.status
                        )}`}
                      >
                        {getStatusLabel(ticket.status)}
                      </button>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                  {ticket.description}
                </div>

                {ticket.respostaFechamento && (
                  <div className="mt-2 bg-green-50 border border-green-200 p-3 rounded text-sm">
                    Resposta: {ticket.respostaFechamento}
                  </div>
                )}
              </div>
            ))}
          </div>

          {displayTickets.length === 0 && (
            <p className="text-center text-gray-500 py-6">
              Nenhum chamado encontrado.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
