import { useState, useEffect } from "react";
import { UserCircle2 } from "lucide-react";
import type {
  UserRole,
  Ticket,
  Template,
  TicketStatus,
} from "../types";
import { ClientView } from "../components/ClientView";
import { SupportView } from "../components/SupportView";
import { AdminView } from "../components/AdminView";

export default function Home() {
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) {
      setCurrentRole(role as UserRole);
    }
  }, []);

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
              status: "FECHADO",
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
          onClick={() => {
            localStorage.removeItem("role");
            setCurrentRole(null);
            window.location.href = "/";
          }}
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
        >
          <UserCircle2 className="w-4 h-4" />
          Trocar Perfil
        </button>
      </div>

      {currentRole === "USUARIO" && (
        <ClientView/>
      )}

      {currentRole === "SUPORTE" && (
        <SupportView
          tickets={tickets}
          onUpdateStatus={handleUpdateStatus}
          onCloseTicket={handleCloseTicket}
        />
      )}

      {currentRole === "ADMIN" && (
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
