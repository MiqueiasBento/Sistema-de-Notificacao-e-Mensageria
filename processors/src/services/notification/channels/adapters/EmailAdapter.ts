export class EmailAdapter {
    async sendEmail(to: string, subject: string, body: string): Promise<void> {
        // TODO: Implementar Amazon SES aqui
        console.log(`[EmailAdapter] --- Simulando envio com Amazon SES ---`);
        console.log(`To: ${to}`);
        console.log(`Subject: ${subject}`);
        console.log(`Body: ${body}\n------------------------------------------------`);
        return Promise.resolve();
    }
}
