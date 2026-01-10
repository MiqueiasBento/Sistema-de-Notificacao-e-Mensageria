import { NotificationService } from "../services/notification/NotificationService";
import { TemplateLoader } from "../services/notification/TemplateLoader";
import { EmailProcessor } from "../services/notification/channels/EmailProcessor";
import { PushProcessor } from "../services/notification/channels/PushProcessor";
import { WhatsAppProcessor } from "../services/notification/channels/WhatsAppProcessor";
import { EmailAdapter } from "../services/notification/channels/adapters/EmailAdapter";
import { PushAdapter } from "../services/notification/channels/adapters/PushAdapter";
import { WhatsAppAdapter } from "../services/notification/channels/adapters/WhatsAppAdapter";

// Inicialização dos Adapters
const emailAdapter = new EmailAdapter();
const pushAdapter = new PushAdapter();
const whatsAppAdapter = new WhatsAppAdapter();

// Inicialização dos Processors
const emailProcessor = new EmailProcessor(emailAdapter);
const pushProcessor = new PushProcessor(pushAdapter);
const whatsAppProcessor = new WhatsAppProcessor(whatsAppAdapter);

// Inicialização do TemplateLoader
const templateLoader = new TemplateLoader();

// Inicialização do Serviço Principal
export const notificationService = new NotificationService(
  templateLoader,
  emailProcessor,
  pushProcessor,
  whatsAppProcessor
);
