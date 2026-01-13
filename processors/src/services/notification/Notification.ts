export type TemplateKey = "TICKET_CREATED" | "TICKET_STATUS_CHANGED" | "TICKET_CLOSED";

export interface Notification {
    channel: "EMAIL" | "PUSH" | "WHATSAPP";
    recipient: string;
    templateKey: TemplateKey;
    data: Record<string, any>;
}
