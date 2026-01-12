export type UserRole = 'USUARIO' | 'SUPORTE' | 'ADMIN';

export type TicketStatus = 'PENDENTE' | 'EM-ANDAMENTO' | 'RESOLVIDO' | 'FECHADO';

export type TicketType = 'TECNICO' | 'FINANCEIRO' | 'COMERCIAL' | 'OUTRO';

export type NotificationChannel = 'EMAIL' | 'PUSH';

export type NotificationEvent = 
  | 'chamado-aberto'
  | 'chamado-em-andamento'
  | 'chamado-resolvido'
  | 'chamado-fechado';

export interface Ticket {
  id: string;
  username: string;
  email: string;
  type: TicketType;
  description: string;
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
