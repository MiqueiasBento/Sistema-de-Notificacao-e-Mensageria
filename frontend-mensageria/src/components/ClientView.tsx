import { useEffect, useState } from "react";
import { Plus, Clock, ChevronDown, ChevronUp } from "lucide-react";
import type { Ticket, TicketType } from "../types";
import { TicketModal } from "./TicketModal";
import { getTickets, createTicket } from "../services/chamados";

export function ClientView() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const userEmail = localStorage.getItem("email");

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

  async function handleCreateTicket(data: {
    nome: string;
    sobrenome: string;
    email: string;
    tipo: TicketType;
    mensagem: string;
  }) {
    try {
      const newTicket = await createTicket({
        username: `${data.nome} ${data.sobrenome}`,
        email: data.email,
        type: data.tipo,
        description: data.mensagem,
      });

      alert("Chamado criado com sucesso!");

      setTickets((prev) => [newTicket, ...prev]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar chamado", error);
    }
  }

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
      PENDENTE: "bg-yellow-100 text-yellow-800",
      EM_ANDAMENTO: "bg-blue-100 text-blue-800",
      RESOLVIDO: "bg-green-100 text-green-800",
      FECHADO: "bg-gray-100 text-gray-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getTipoLabel = (tipo: string) => {
    const labels = {
      TECNICO: "Técnico",
      FINANCEIRO: "Financeiro",
      COMERCIAL: "Comercial",
      OUTRO: "Outro",
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>Carregando chamados...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="mb-4">Portal do Cliente</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Abrir Chamado
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-gray-600" />
            <h2>Histórico de Chamados</h2>
          </div>

          {tickets.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Você ainda não possui chamados abertos.
            </p>
          ) : (
            <div className="space-y-3">
              {tickets.map((ticket) => {
                return (
                  <div
                    key={ticket.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setExpandedTicket(
                          expandedTicket === ticket.id ? null : ticket.id
                        )
                      }
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-gray-500 text-sm">
                          #{ticket.id}
                        </span>

                        <span className="flex-1 text-left">
                          {getTipoLabel(ticket.type)}
                        </span>

                        <span
                          className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                            ticket.status
                          )}`}
                        >
                          {getStatusLabel(ticket.status)}
                        </span>
                      </div>

                      {expandedTicket === ticket.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-400 ml-2" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 ml-2" />
                      )}
                    </button>

                    {expandedTicket === ticket.id && (
                      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-500">Solicitante</p>
                            <p>{ticket.userName}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">E-mail</p>
                            <p>{userEmail}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Descrição</p>
                            <p className="text-gray-700">
                              {ticket.description}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">
                              Data de Abertura
                            </p>
                            <p>{formatDate(ticket.createAt)}</p>
                          </div>

                          {ticket.respostaFechamento && (
                            <div>
                              <p className="text-sm text-gray-500">
                                Resposta de Fechamento
                              </p>
                              <p className="text-gray-700">
                                {ticket.respostaFechamento}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <TicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTicket}
      />
    </div>
  );
}
