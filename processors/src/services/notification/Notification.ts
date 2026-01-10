export type TemplateKey = "TICKET_CREATED"

export interface Notification {
    channel: "EMAIL" | "PUSH"
    recipient: string
    templateKey: TemplateKey
    data: Record<string, any>
}
