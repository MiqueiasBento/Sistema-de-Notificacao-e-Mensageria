import { useState } from "react";
import { User, Headphones, Settings, UserCircle2 } from "lucide-react";
import type {
  UserRole,
  Ticket,
  Template,
  TicketType,
  TicketStatus,
} from "./types";
import { mockTickets, mockTemplates } from "./data/mockData";
import { ClientView } from "./components/ClientView";
import { SupportView } from "./components/SupportView";
import { AdminView } from "./components/AdminView";

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);

  const handleCreateTicket = (data: {
    nome: string;
    sobrenome: string;
    email: string;
    tipo: TicketType;
    mensagem: string;
  }) => {
    const newTicket: Ticket = {
      id: String(tickets.length + 1),
      ...data,
      status: "pendente",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTickets([...tickets, newTicket]);
  };

  const handleUpdateStatus = (ticketId: string, status: TicketStatus) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, status, updatedAt: new Date() }
          : ticket
      )
    );
  };

  const handleCloseTicket = (ticketId: string, resposta: string) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              status: "fechado",
              respostaFechamento: resposta,
              updatedAt: new Date(),
            }
          : ticket
      )
    );
  };

  const handleCreateTemplate = (template: Omit<Template, "id">) => {
    const newTemplate: Template = {
      id: String(templates.length + 1),
      ...template,
    };
    setTemplates([...templates, newTemplate]);
  };

  const handleUpdateTemplate = (id: string, template: Omit<Template, "id">) => {
    setTemplates(templates.map((t) => (t.id === id ? { ...template, id } : t)));
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter((t) => t.id !== id));
  };

  if (!currentRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
          <h1 className="text-center mb-8">Sistema de Helpdesk</h1>
          <p className="text-center text-gray-600 mb-8">
            Selecione seu perfil de acesso
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setCurrentRole("cliente")}
              className="flex flex-col items-center gap-4 p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-center">
                <h2>Cliente</h2>
                <p className="text-sm text-gray-600">
                  Abrir e acompanhar chamados
                </p>
              </div>
            </button>

            <button
              onClick={() => setCurrentRole("suporte")}
              className="flex flex-col items-center gap-4 p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Headphones className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-center">
                <h2>Suporte</h2>
                <p className="text-sm text-gray-600">Gerenciar chamados</p>
              </div>
            </button>

            <button
              onClick={() => setCurrentRole("admin")}
              className="flex flex-col items-center gap-4 p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <Settings className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-center">
                <h2>Administrador</h2>
                <p className="text-sm text-gray-600">Gestão de templates</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Logado como:</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm capitalize">
            {currentRole}
          </span>
        </div>
        <button
          onClick={() => setCurrentRole(null)}
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
        >
          <UserCircle2 className="w-4 h-4" />
          Trocar Perfil
        </button>
      </div>

      {currentRole === "cliente" && (
        <ClientView tickets={tickets} onCreateTicket={handleCreateTicket} />
      )}

      {currentRole === "suporte" && (
        <SupportView
          tickets={tickets}
          onUpdateStatus={handleUpdateStatus}
          onCloseTicket={handleCloseTicket}
        />
      )}

      {currentRole === "admin" && (
        <AdminView
          templates={templates}
          onCreateTemplate={handleCreateTemplate}
          onUpdateTemplate={handleUpdateTemplate}
          onDeleteTemplate={handleDeleteTemplate}
        />
      )}
    </div>
  );
}
