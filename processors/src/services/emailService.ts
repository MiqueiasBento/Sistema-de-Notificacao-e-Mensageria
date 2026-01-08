export class EmailService {
  // Envio de um email (simulado por enquanto)
  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    // Simulação de envio
    console.log(`[EmailService] Simulando envio para ${to}`);
    console.log(`[EmailService] Assunto: ${subject}`);
    console.log(`[EmailService] Corpo: ${body}`);
    
    // Aqui entraria a implementação real com Nodemailer ou SES
    return Promise.resolve();
  }
}

export const emailService = new EmailService();
