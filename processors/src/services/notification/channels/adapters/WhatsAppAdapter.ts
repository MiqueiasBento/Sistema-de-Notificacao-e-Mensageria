import { ChannelProcessor } from "../ChannelProcessor";

export class WhatsAppAdapter implements ChannelProcessor {
    async send(to: string, message: any): Promise<void> {
        console.warn(`[WhatsAppAdapter] Envio para ${to} não implementado.`);
        console.log(`[WhatsAppAdapter] Payload:`, message);
        return Promise.resolve();
    }
}
