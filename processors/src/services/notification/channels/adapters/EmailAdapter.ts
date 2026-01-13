import nodemailer from "nodemailer";

export class EmailAdapter {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    async sendEmail(to: string, subject: string, body: string): Promise<void> {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            text: body
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log(`[EmailAdapter] E-mail enviado com sucesso: ${info.messageId}`);
        } catch (err) {
            console.error("[EmailAdapter] Erro ao enviar e-mail:", err);
            throw err;
        }
    }
}
