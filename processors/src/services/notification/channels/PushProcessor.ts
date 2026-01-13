import { PushAdapter } from "./adapters/PushAdapter"
import { ChannelProcessor } from "./ChannelProcessor"

export class PushProcessor implements ChannelProcessor {
    constructor(private adapter: PushAdapter) { }

    async send(to: string, message: { title: string; body: string }) {
        await this.adapter.sendPush(to, message.title, message.body)
    }
}
