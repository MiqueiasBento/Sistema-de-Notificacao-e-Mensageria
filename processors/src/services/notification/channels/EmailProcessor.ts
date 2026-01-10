import { EmailAdapter } from "./adapters/EmailAdapter"
import { ChannelProcessor } from "./ChannelProcessor"

export class EmailProcessor implements ChannelProcessor {
    constructor(private adapter: EmailAdapter) { }

    async send(to: string, message: { subject: string; body: string }) {
        await this.adapter.sendEmail(to, message.subject, message.body)
    }
}
