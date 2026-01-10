import type { Ticket, Template } from "../types";

export const mockTickets: Ticket[] = [
  {
    id: "1",
    nome: "João",
    sobrenome: "Silva",
    email: "joao.silva@email.com",
    tipo: "tecnico",
    mensagem: "Não consigo acessar o sistema. Aparece erro 404.",
    status: "em-andamento",
    createdAt: new Date("2024-12-20T10:30:00"),
    updatedAt: new Date("2024-12-20T14:20:00"),
  },
  {
    id: "2",
    nome: "Maria",
    sobrenome: "Santos",
    email: "maria.santos@email.com",
    tipo: "financeiro",
    mensagem: "Preciso de segunda via da fatura de novembro.",
    status: "resolvido",
    createdAt: new Date("2024-12-19T09:15:00"),
    updatedAt: new Date("2024-12-19T16:45:00"),
    respostaFechamento: "Fatura enviada por e-mail.",
  },
  {
    id: "3",
    nome: "Pedro",
    sobrenome: "Oliveira",
    email: "pedro.oliveira@email.com",
    tipo: "comercial",
    mensagem: "Gostaria de informações sobre o plano empresarial.",
    status: "pendente",
    createdAt: new Date("2024-12-21T11:00:00"),
    updatedAt: new Date("2024-12-21T11:00:00"),
  },
];

export const mockTemplates: Template[] = [
  {
    id: "1",
    nome: "Confirmação de Abertura",
    evento: "chamado-aberto",
    canal: "email",
    assunto: "Chamado #{id} aberto com sucesso",
    conteudo:
      "Olá {nome}, seu chamado foi registrado e será analisado em breve.",
    ativo: true,
  },
  {
    id: "2",
    nome: "Chamado em Andamento",
    evento: "chamado-em-andamento",
    canal: "email",
    assunto: "Seu chamado está sendo processado",
    conteudo: "Olá {nome}, nossa equipe está trabalhando no seu chamado #{id}.",
    ativo: true,
  },
  {
    id: "3",
    nome: "Notificação Push - Resolvido",
    evento: "chamado-resolvido",
    canal: "push",
    assunto: "Chamado Resolvido",
    conteudo: "Seu chamado #{id} foi resolvido!",
    ativo: false,
  },
];
