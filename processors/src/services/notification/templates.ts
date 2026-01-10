export type TemplateKey = "TICKET_CREATED"
export type ChannelType = "email" | "push"

export const templates: Record<
    TemplateKey,
    Record<
        ChannelType,
        {
            title: string
            body: string
        }
    >
> = {
    TICKET_CREATED: {
        email: {
            title: "Seu ticket foi criado",
            body: `
Olá {{name}},

Recebemos sua solicitação de suporte.

Ticket: #{{ticketId}}
Título: {{title}}
Tipo: {{type}}

Nossa equipe irá analisá-lo em breve.
`
        },
        push: {
            title: "Ticket criado",
            body: "Seu ticket #{{ticketId}} foi registrado com sucesso."
        }
    }
}
