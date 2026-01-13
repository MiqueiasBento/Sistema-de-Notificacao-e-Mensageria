export class PushAdapter {
    async sendPush(to: string, title: string, body: string): Promise<void> {
        // TODO: Implementar Firebase FCM aqui
        console.log(`[PushAdapter] --- Simulando envio com Firebase FCM ---`);
        console.log(`To: ${to}`);
        console.log(`Title: ${title}`);
        console.log(`Body: ${body}\n------------------------------------------------`);
        return Promise.resolve();
    }
}
