export class PushAdapter {
    async sendPush(to: string, title: string, body: string): Promise<void> {
        console.log(`[PushAdapter] Simulando push`);
        console.log(`Para: ${to}`);
        console.log(`Título: ${title}`);
        console.log(`Mensagem: ${body}`);
        return Promise.resolve();
    }
}
