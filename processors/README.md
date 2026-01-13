# Relatório do Serviço de Processamento (Processors)

Este documento detalha o estado atual do implementação do serviço `processors`, responsável por consumir eventos da fila SQS e enviar notificações.

## 📋 Visão Geral
O serviço foi projetado para:
1. Ler mensagens de uma fila AWS SQS.
2. Identificar o tipo de evento (atualmente suporta `TICKET_CREATED`).
3. Roteamento de notificações para canais específicos (ex: EMAIL).
4. (Planejado) Utilizar templates dinâmicos para compor as mensagens.

## 🚀 Como Rodar

### Pré-requisitos
- Node.js instalado.
- Acesso à fila SQS configurada.

### Instalação
No diretório `processors`, instale as dependências:
```bash
npm install
```

### Configuração
Crie um arquivo `.env` baseado no `.env.example`:
```bash
cp .env.example .env
```
**Nota:** Certifique-se de configurar `QUEUE_URL` e as credenciais AWS corretamente.

### Execução
O projeto não possui scripts `start` definidos no `package.json`, mas pode ser executado diretamente via `ts-node`:

**Modo Produção (Sqs Listener):**
```bash
npx ts-node src/index.ts
```

**Modo Teste Local (Sem SQS):**
```bash
npx ts-node src/test-local.ts
```
Este modo simula um evento de ticket e imprime o resultado no console.

## 🔍 Estado da Implementação

### O que está funcionando:
- **Consumo de SQS:** O arquivo `src/messaging/SqsListener.ts` conecta corretamente e busca mensagens.
- **Roteamento:** O `src/messaging/eventRouter.ts` direciona eventos do tipo `TICKET_CREATED`.
- **Mock de Email:** O `src/services/emailService.ts` simula o envio logando no terminal.

### ⚠️ Problemas Encontrados e Oportunidades de Melhoria

#### 1. Duplicidade de Lógica / Código Morto (Crítico)
Existe uma desconexão entre a lógica que está sendo executada e a arquitetura planejada para templates.
- **Lógica Atual (Hardcoded):** O arquivo `src/handlers/TicketCreatedHandler.ts` constrói o corpo do email via strings "hardcoded" diretamente no código.
- **Lógica Planejada (Templates):** Existe uma estrutura robusta em `src/services/notification` (incluindo `NotificationService`, `TemplateLoader`, `templates.ts`) que **não está sendo utilizada**. Esta estrutura implementa corretamente o requisito de "banco de templates" e substituição de variáveis (`{{name}}`), mas está desconectada do fluxo principal.

**Recomendação:** Refatorar o `eventRouter.ts` e o `TicketCreatedHandler.ts` para utilizarem o `NotificationService` em vez de montarem strings manualmente.

#### 2. Segurança
- O arquivo `.env.example` contém credenciais reais da AWS e URLs de fila. **Recomendação:** Revogar estas credenciais imediatamente e limpar o arquivo de exemplo.

#### 3. Scripts NPM
- O `package.json` carece de scripts padrão como `start`, `dev` ou `build`.

#### 4. Suporte a Canais
- Embora o código mencione "WHATSAPP" e "PUSH", apenas o fluxo de "EMAIL" (simulado) está parcialmente conectado. O `EventRouter` loga avisos para canais desconhecidos.

## 📂 Arquivos Chave Mencionados
- `src/index.ts`: Ponto de entrada.
- `src/messaging/eventRouter.ts`: Decide o que fazer com a mensagem.
- `src/handlers/TicketCreatedHandler.ts`: Onde a mensagem é construída (precisa ser refatorado).
- `src/services/notification/`: Pasta contendo a engine de templates não utilizada.
