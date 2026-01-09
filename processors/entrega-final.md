# Entrega Final - Notification Processor

## 1. O que foi implementado

Foi desenvolvida a lógica de tratamento de eventos `TicketCreated` no serviço de processamento (SQS Consumer).

### Componentes Criados/Alterados:
*   **`events/ticket.ts`**: Contrato do evento `TicketCreated`.
*   **`services/emailService.ts`**: Serviço responsável pelo envio de e-mails (mock implementado).
*   **`handlers/TicketCreatedHandler.ts`**: Atualizado para consumir o `EmailService` e disparar a notificação real ao receber o evento.
*   **`tsconfig.json`**: Configuração do TypeScript adicionada ao pacote `processors` para garantir a execução correta.
*   **`test-local.ts`**: Script para validar o fluxo localmente sem depender da infraestrutura AWS.

## 2. Como Rodar

### Pré-requisitos
*   Node.js instalado.
*   Dependências instaladas (`npm install` dentro de `processors`).

### Teste Local
Para verificar o funcionamento da lógica de notificação:

```bash
cd processors
npx ts-node src/test-local.ts
```

### Execução Completa (com AWS)
Para rodar integrado com a AWS, você precisa configurar as credenciais e a URL da fila.

1.  Crie um arquivo `.env` na pasta `processors` (use o `.env.example` como base):
    ```env
    QUEUE_URL=https://sqs.us-east-2.amazonaws.com/SEU_ID/SUA_FILA
    AWS_REGION=us-east-2
    AWS_ACCESS_KEY_ID=AKIA...
    AWS_SECRET_ACCESS_KEY=segredo...
    ```
2.  Instale o `dotenv` para carregar essas variáveis automaticamente (opcional, mas recomendado para dev):
    ```bash
    npm install dotenv
    ```
    *E adicione `require('dotenv').config()` no topo do `src/index.ts`.*

3.  Execute o processador:
    ```bash
    npm start
    ```

## 3. Plano de Versionamento

Seguindo o **Semantic Versioning (SemVer)**:

*   **Atual (v1.0.0)**:
    *   Estrutura inicial do processador.
    *   Suporte básico a `TicketCreated`.
    *   Mock de envio de e-mail.

*   **Próxima Versão (v1.1.0 - Features)**:
    *   Implementação real do `EmailService` (ex: AWS SES ou SendGrid).
    *   Adição de templates de e-mail HTML.
    *   Suporte a novos tipos de eventos (ex: `TicketUpdated`).

*   **Versão Major (v2.0.0 - Breaking Changes)**:
    *   Mudança na estrutura do evento JSON (se necessário).
    *   Refatoração para arquitetura desacoplada (se extrair contratos para lib externa).

---
*Gerado por Antigravity*
