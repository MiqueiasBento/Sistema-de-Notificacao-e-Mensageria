export interface ChannelProcessor {
    send(to: string, message: any): Promise<void>
}
