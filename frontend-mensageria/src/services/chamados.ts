import { api } from '../api/api';
import type { Ticket, TicketType } from "../types/index";

export interface CreateTicketDTO {
  username: string;
  email: string;
  type: TicketType;
  description: string;
}

export async function createTicket(data: CreateTicketDTO) {
  const response = await api.post<Ticket>("/tickets", data);
  return response.data;
}

export async function getTickets() {
  const response = await api.get<Ticket[]>("/tickets");
  return response.data;
}

export async function getTicketById(id: string) {
  const response = await api.get<Ticket>(`/tickets/${id}`);
  return response.data;
}