# Arquitetura do Sistema de Notificação e Mensageria

Este documento descreve a arquitetura do sistema, detalhando o funcionamento do **Producer** (Produtor) e do **Processor** (Processador), além de identificar pontos de melhoria e boas práticas.

## 1. Visão Geral
O sistema é baseado em uma **Arquitetura Orientada a Eventos (EDA)**, utilizando o **AWS SQS** como mediador para desacoplar a criação de tickets (negócio) do envio de notificações (comunicação).

### Fluxo de Dados:
1.  **Producer (Java)**: Realiza operações de negócio (ex: criar ticket) e publica um evento no SQS.
2.  **AWS SQS**: Armazena a mensagem de forma persistente e assíncrona.
3.  **Processor (Node.js)**: Monitora a fila (polling), processa o evento, gera a notificação e envia pelos canais configurados.

---

## 2. Componentes

### 2.1 Producer (Java / Spring Boot)
Responsável pelo domínio principal do sistema.
-   **Tecnologias**: Java 17+, Spring Boot, Spring Cloud AWS.
-   **Publicação de Eventos**: Utiliza SqsTemplate para enviar objetos POJO convertidos para JSON.
-   **Padrões Utilizados**:
    -   **Strategy/Adapter**: A interface EventPublisher permite trocar o destino das mensagens (SQS, RabbitMQ, Memória) sem alterar o código de negócio.
    -   **Mapper**: Uso de TicketEventMapper para converter entidades de banco de dados em payloads de eventos (decoupling de modelos).

### 2.2 Mensageria (AWS SQS)
-   **Função**: Fila de mensagens padrão para garantir que nenhuma notificação seja perdida caso o processador esteja offline.
-   **Configuração**: Utiliza visibilidade de mensagem e Receipt Handles para controle de consumo.

### 2.3 Processor (Node.js / TypeScript)
Responsável pela lógica de roteamento e envio de notificações.
-   **Tecnologias**: Node.js, TypeScript, Nodemailer (Email), AWS SDK.
-   **Estrutura de Camadas**:
    -   **Messaging/Listener**: SqsListener faz o polling e deleta mensagens após sucesso.
    -   **Messaging/Router**: EventRouter interpreta o tipo de evento e distribui para os handlers.
    -   **Handlers**: Transformam o evento bruto do SQS em um objeto Notification genérico.
    -   **NotificationService**: Orquestrador que carrega templates e preenche variáveis.
    -   **Processors (Email/Push)**: Lógica específica por canal.
    -   **Adapters**: Integração com serviços externos (Nodemailer, FCM).
-   **Padrões Utilizados**:
    -   **Dependency Injection**: config/container.ts centraliza a criação de instâncias.
    -   **Adapter Pattern**: Isola o sistema da biblioteca específica de envio (ex: Gmail via Nodemailer).

---

## 3. Análise de Qualidade e Boas Práticas

### Pontos Positivos
-   **Desacoplamento Total**: O Producer não sabe como o e-mail é enviado, e o Processor não conhece as regras de criação de tickets.
-   **Resiliência**: O mecanismo de deleção apenas após o processamento bem-sucedido evita perda de mensagens.
-   **Extensibilidade**: Adicionar um novo canal (ex: SMS) exige apenas a criação de um novo Processor/Adapter.
-   **Tipagem Forte**: Uso de TypeScript no processor e Java no producer garante contratos mais seguros.

---

## 4. Sugestões de Melhoria

### 4.1 Arquitetura e Engenharia
1.  **Dead Letter Queue (DLQ)**: Configurar uma fila de mensagens mortas no SQS. Se uma mensagem falhar 3 vezes (ex: erro no Gmail), ela deve ir para a DLQ para análise manual, evitando o consumo infinito de recursos.
2.  **Idempotência**: Implementar um controle de "Message ID" processado no banco de dados do Processor. Isso evita envios duplicados caso o processo de deleção no SQS falhe.
3.  **Batch Polling**: Atualmente o SqsListener busca 1 mensagem por vez. Aumentar para 10 (limite do SQS) melhora a performance e reduz custos de API da AWS.
4.  **Schema Registry**: Compartilhar os modelos de eventos entre Java e TS usando algo como JSON Schema ou Protobuf para evitar duplicar interfaces manualmente.

### 4.2 Segurança e Observabilidade
1.  **Distributed Tracing**: Implementar Correlation IDs. O Producer gera um ID que viaja na mensagem e é logado pelo Processor. Isso permite rastrear o ciclo de vida completo de uma notificação.
2.  **Secret Management**: Mover as senhas do .env para o **AWS Secrets Manager**, aumentando a segurança em ambiente de produção.
3.  **Circuit Breaker**: Adicionar um Circuit Breaker (ex: biblioteca Opossum) nos Adapters de Email/Push. Se o serviço de e-mail cair, o sistema para de tentar imediatamente, preservando recursos.

---

## 5. Conclusão
A arquitetura atual é robusta e segue padrões modernos de desenvolvimento para sistemas distribuídos. A transição do Amazon SES para Nodemailer (Gmail) no processor foi feita de forma isolada no EmailAdapter, provando que o design em camadas está funcionando corretamente.
