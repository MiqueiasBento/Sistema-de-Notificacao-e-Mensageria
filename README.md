# Sistema de Notificação e Mensageria [Event-driven & Serveless]
  
## 🎯 Objetivo

O propósito deste projeto é desenvolver uma plataforma de **notificação e mensageria** para um ambiente de **HelpDesk**, adotando uma arquitetura **event-driven** e utilizando recursos **serverless**.
O sistema permitirá que eventos provenientes do fluxo de atendimento — como abertura de chamados, mudança de status, atribuição de técnico e resolução — sejam publicados e processados automaticamente, resultando no envio de notificações para usuários e agentes de suporte.

---

## 📌 Sobre o Projeto

O sistema será composto por uma aplicação responsável pela **publicação de eventos** (producer), um front-end simples para interação do usuário e um conjunto de **funções serverless** para processamento dos eventos.
O foco principal está em demonstrar:

* A utilização de **arquitetura orientada a eventos**;
* A capacidade de integrar múltiplas fontes de dados e operações do domínio de HelpDesk;
* O uso de serviços gerenciados para escalabilidade e desacoplamento;
* Uma documentação arquitetural baseada nos modelos **C4** e **4+1**.

O backend poderá ser desenvolvido em **Spring Boot** ou **Node.js**, conforme decisão da equipe.
O front-end será implementado em **React**, permitindo simulação da criação e atualização de chamados que geram eventos para o sistema.

---

## 🛠 Tecnologias (a definir)

As tecnologias listadas abaixo representam o conjunto previsto para desenvolvimento:

* **Frontend:** React
* **Backend (Producer API):** Spring Boot ou Node.js, Docker
* **Arquitetura Serverless:** AWS Lambda, AWS EventBridge, AWS SNS/SQS (dependendo da definição)
* **Processadores de Eventos:** Funções Lambda
* **Documentação Arquitetural:** C4 Model, 4+1 Views
* **Controle de Versão:** GitHub

*As tecnologias definitivas serão alinhadas entre os membros da equipe.*

---

## 📁 Estrutura do Repositório

A organização inicial do repositório será:

```
/
├── producer/                # API responsável por publicar eventos (Spring Boot ou Node.js)
│   └── src/
│
├── frontend/                # Interface em React para simular o uso do HelpDesk e geração de eventos
│   └── src/
│
├── serverless/              # Código das funções Lambda e templates de implantação
│   ├── eventHandlers/
│   ├── template.yaml        # ou serverless.yml
│   └── utils/
│
├── processors/              # Serviços/lambdas que processam os eventos e executam ações (ex.: enviar notificações)
│   └── sendNotification/
│
└── docs/                    # Documentação arquitetural (C4 + 4+1), decisões e diagramas, requisitos e decrições
    └── architecture/
```

---

## 👥 Equipe

A equipe é formada pelos seguintes membros que cursam a disciplina de Arquitetura de Software:
  
- Anaildo Silva
- Antônio Rewelli
- Debora Viana
- Douglas Sousa
- Miquéias Bento
  
