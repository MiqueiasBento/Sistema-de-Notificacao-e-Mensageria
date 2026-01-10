export type UserRole = 'cliente' | 'suporte' | 'admin';

export type TicketStatus = 'pendente' | 'em-andamento' | 'resolvido' | 'fechado';

export type TicketType = 'tecnico' | 'financeiro' | 'comercial' | 'outro';

export type NotificationChannel = 'email' | 'push';

export type NotificationEvent = 
  | 'chamado-aberto'
  | 'chamado-em-andamento'
  | 'chamado-resolvido'
  | 'chamado-fechado';

export interface Ticket {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  tipo: TicketType;
  mensagem: string;
  status: TicketStatus;
  createdAt: Date;
  updatedAt: Date;
  respostaFechamento?: string;
}

export interface Template {
  id: string;
  nome: string;
  evento: NotificationEvent;
  canal: NotificationChannel;
  assunto: string;
  conteudo: string;
  ativo: boolean;
}
