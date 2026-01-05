import { useState } from "react";
import { Headphones, Search, Send } from "lucide-react";
import type { Ticket, TicketStatus } from "../types";

interface SupportViewProps {
  tickets: Ticket[];
  onUpdateStatus: (ticketId: string, status: TicketStatus) => void;
  onCloseTicket: (ticketId: string, resposta: string) => void;
}

export function SupportView({
  tickets,
  onUpdateStatus,
  onCloseTicket,
}: SupportViewProps) {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [closeResponse, setCloseResponse] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusChanges, setStatusChanges] = useState<
    Record<string, TicketStatus>
  >({});
  const [activeTab, setActiveTab] = useState<"ativos" | "resolvidos">("ativos");

  const getStatusLabel = (status: string) => {
    const labels = {
      pendente: "Pendente",
      "em-andamento": "Em Andamento",
      resolvido: "Resolvido",
      fechado: "Fechado",
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pendente: "bg-yellow-100 text-yellow-800 border-yellow-200",
      "em-andamento": "bg-blue-100 text-blue-800 border-blue-200",
      resolvido: "bg-green-100 text-green-800 border-green-200",
      fechado: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getTipoLabel = (tipo: string) => {
    const labels = {
      tecnico: "Técnico",
      financeiro: "Financeiro",
      comercial: "Comercial",
      outro: "Outro",
    };
    return labels[tipo as keyof typeof labels] || tipo;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleClose = (ticketId: string) => {
    if (closeResponse.trim()) {
      onCloseTicket(ticketId, closeResponse);
      setCloseResponse("");
      setSelectedTicket(null);
      const newChanges = { ...statusChanges };
      delete newChanges[ticketId];
      setStatusChanges(newChanges);
    }
  };

  const handleStatusUpdate = (ticketId: string) => {
    const newStatus = statusChanges[ticketId];

    // Para outros status, atualiza normalmente
    onUpdateStatus(ticketId, newStatus);
    const newChanges = { ...statusChanges };
    delete newChanges[ticketId];
    setStatusChanges(newChanges);
  };

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.sobrenome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.includes(searchTerm)
  );

  const activeTickets = filteredTickets.filter(
    (ticket) => ticket.status !== "resolvido" && ticket.status !== "fechado"
  );

  const resolvedTickets = filteredTickets.filter(
    (ticket) => ticket.status === "resolvido" || ticket.status === "fechado"
  );

  const displayTickets =
    activeTab === "ativos" ? activeTickets : resolvedTickets;

  const ticketStats = {
    total: tickets.length,
    pendente: tickets.filter((t) => t.status === "pendente").length,
    emAndamento: tickets.filter((t) => t.status === "em-andamento").length,
    resolvido: tickets.filter((t) => t.status === "resolvido").length,
  };

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
              <p className="text-2xl text-yellow-800">{ticketStats.pendente}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-700">Em Andamento</p>
              <p className="text-2xl text-blue-800">
                {ticketStats.emAndamento}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-700">Resolvidos</p>
              <p className="text-2xl text-green-800">{ticketStats.resolvido}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex gap-4 mb-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("ativos")}
              className={`pb-3 px-4 transition-colors ${
                activeTab === "ativos"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Chamados Ativos ({activeTickets.length})
            </button>
            <button
              onClick={() => setActiveTab("resolvidos")}
              className={`pb-3 px-4 transition-colors ${
                activeTab === "resolvidos"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Chamados Resolvidos ({resolvedTickets.length})
            </button>
          </div>

          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome, e-mail ou ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            {displayTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-500 text-sm">
                        #{ticket.id}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs border ${getStatusColor(
                          ticket.status
                        )}`}
                      >
                        {getStatusLabel(ticket.status)}
                      </span>
                      <span className="text-sm text-gray-600">
                        {getTipoLabel(ticket.tipo)}
                      </span>
                    </div>
                    <p>
                      {ticket.nome} {ticket.sobrenome}
                    </p>
                    <p className="text-sm text-gray-500">{ticket.email}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {formatDate(ticket.createdAt)}
                  </p>
                </div>

                <div className="bg-gray-50 p-3 rounded mb-3">
                  <p className="text-sm text-gray-700">{ticket.mensagem}</p>
                </div>

                {activeTab === "ativos" && (
                  <>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="block text-sm text-gray-700 mb-1">
                          Alterar Status
                        </label>
                        <div className="flex gap-2">
                          <select
                            value={statusChanges[ticket.id] || ticket.status}
                            onChange={(e) => {
                              const newStatus = e.target.value as TicketStatus;
                              setStatusChanges({
                                ...statusChanges,
                                [ticket.id]: newStatus,
                              });
                              // Se mudou para resolvido, abre o campo de resposta
                              if (newStatus === "resolvido") {
                                setSelectedTicket(ticket.id);
                              }
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={ticket.status === "fechado"}
                          >
                            <option value="pendente">Pendente</option>
                            <option value="em-andamento">Em Andamento</option>
                            <option value="resolvido">Resolvido</option>
                          </select>
                          {statusChanges[ticket.id] &&
                            statusChanges[ticket.id] !== ticket.status &&
                            statusChanges[ticket.id] !== "resolvido" && (
                              <button
                                onClick={() => handleStatusUpdate(ticket.id)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                                title="Enviar atualização de status"
                              >
                                <Send className="w-4 h-4" />
                                Enviar
                              </button>
                            )}
                        </div>
                      </div>

                      {ticket.status !== "fechado" &&
                        ticket.status !== "resolvido" &&
                        !selectedTicket && <div className="flex-1"></div>}
                    </div>

                    {selectedTicket === ticket.id && (
                      <div className="mt-3">
                        <label className="block text-sm text-gray-700 mb-1">
                          Resposta de Fechamento
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Digite a resposta de fechamento..."
                            value={closeResponse}
                            onChange={(e) => setCloseResponse(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            autoFocus
                          />
                          <button
                            onClick={() => handleClose(ticket.id)}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                            disabled={!closeResponse.trim()}
                          >
                            Confirmar
                          </button>
                          <button
                            onClick={() => {
                              setSelectedTicket(null);
                              setCloseResponse("");
                              const newChanges = { ...statusChanges };
                              delete newChanges[ticket.id];
                              setStatusChanges(newChanges);
                            }}
                            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {ticket.respostaFechamento && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                    <p className="text-sm text-green-700">
                      Resposta: {ticket.respostaFechamento}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredTickets.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              Nenhum chamado encontrado.
            </p>
          )}

          {displayTickets.length === 0 && filteredTickets.length > 0 && (
            <p className="text-gray-500 text-center py-8">
              Nenhum chamado {activeTab === "ativos" ? "ativo" : "resolvido"}{" "}
              encontrado.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
