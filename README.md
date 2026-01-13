# Sistema de Notificação e Mensageria [Event-driven Architecture]
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

---
  
## 🎯 Objetivo

O propósito deste projeto é desenvolver uma plataforma de **notificação e mensageria** para um ambiente de **HelpDesk**, adotando uma arquitetura **Event-driven (EDA)** robusta e escalável.
O sistema permite que eventos críticos do fluxo de atendimento — como criação de tickets, mudanças de status e fechamentos — sejam processados de forma assíncrona, garantindo o envio preciso de notificações multicanal (Email, Push, WhatsApp) para usuários e agentes.

---

## 📌 Sobre o Projeto

O sistema é composto por microserviços desacoplados que se comunicam através de mensageria assíncrona, utilizando **Amazon SQS** como broker principal. Esta abordagem elimina a dependência de funções serverless, antes previstas para o projeto, em favor de processadores resilientes e de alta performance.

### Diferenciais Técnicos:
* **Arquitetura Orientada a Eventos:** Desacoplamento total entre o produtor (API) e o consumidor (Processor).
* **Escalabilidade Horizontal:** Processadores baseados em containers que podem escalar conforme a demanda da fila.
* **Resiliência:** Garantia de entrega com mecanismos de retry e processamento atômico de mensagens.
* **Documentação Viva:** Arquitetura detalhada utilizando o modelo **C4** (Context, Container, Component, Code).

---

## 🛠 Tecnologias e Padrões

### Stack Tecnológica:
* **Frontend:** JavaScript e React.
* **Backend (Producer API):** Spring Boot, Java e Docker.
* **Mensageria:** Amazon SQS (Simple Queue Service).
* **Processor:** Node.js, TypeScript (Consumidor Assíncrono).
* **Infraestrutura:** AWS SDK (SES, SQS), Firebase (Push).

### Padrões de Projeto (Design Patterns):
* **Strategy Pattern:** Utilizado para alternar dinamicamente entre diferentes canais de notificação.
* **Adapter Pattern:** Isolamento de fornecedores externos (AWS SES, FCM, WhatsApp API).
* **Dependency Injection:** Sistema modularizado e altamente testável via injeção de dependências.
* **Repository Pattern:** Abstração da camada de persistência para logs e templates.

---

## 📁 Estrutura do Repositório

```
/
/
├── producer/                # API responsável por publicar eventos
│   └── src/
│
├── frontend/                # Interface em React para simular o uso do HelpDesk e geração de eventos
│   └── src/
│
├── processors/              # Serviço que processa os eventos e executa ações de notificação
│   └── sendNotification/
│
└── docs/                    # Documentação arquitetural (C4 Model), decisões e diagramas, requisitos e decrições
    └── architecture/
```
## Documentação
### Diagramas C4

Abaixo estão os diagramas que representam a arquitetura do sistema seguindo o modelo C4:

**1. Diagrama de Contexto**  
![Diagrama de Contexto](https://github.com/MiqueiasBento/Sistema-de-Notificacao-e-Mensageria/blob/main/documentacao/C4/diagramas/context-diagram.svg)

**2. Diagrama de Contêiner**  
![Diagrama de Contêiner](https://github.com/MiqueiasBento/Sistema-de-Notificacao-e-Mensageria/blob/main/documentacao/C4/diagramas/container-diagram.svg)

**3. Diagrama de Componente**  
![Diagrama de Componente](https://github.com/MiqueiasBento/Sistema-de-Notificacao-e-Mensageria/blob/main/documentacao/C4/diagramas/component-diagram.svg)

**4. Diagrama de Código**  
![Diagrama de Código](https://github.com/MiqueiasBento/Sistema-de-Notificacao-e-Mensageria/blob/main/documentacao/C4/diagramas/code-diagram.svg)

###

---

## 👥 Equipe

A equipe é formada pelos seguintes membros que cursam a disciplina de Arquitetura de Software:
  
- Anaildo Silva
- Antônio Rewelli
- Debora Viana
- Douglas Sousa
- Miquéias Bento
  
