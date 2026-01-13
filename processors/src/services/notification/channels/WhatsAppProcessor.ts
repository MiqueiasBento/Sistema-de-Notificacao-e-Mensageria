import { ChannelProcessor } from "./ChannelProcessor";
import { WhatsAppAdapter } from "./adapters/WhatsAppAdapter";

export class WhatsAppProcessor implements ChannelProcessor {
    constructor(private adapter: WhatsAppAdapter) {}

    async send(to: string, message: { body: string }) {
        await this.adapter.send(to, message);
    }
}
