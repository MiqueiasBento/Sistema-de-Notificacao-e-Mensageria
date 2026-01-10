import { Notification } from "./Notification"
import { TemplateLoader } from "./TemplateLoader"
import { EmailProcessor } from "./channels/EmailProcessor"
import { PushProcessor } from "./channels/PushProcessor"

export class NotificationService {
    constructor(
        private templateLoader: TemplateLoader,
        private emailProcessor: EmailProcessor,
        private pushProcessor: PushProcessor
    ) { }

    async send(notification: Notification) {
        const template = this.templateLoader.load(
            notification.templateKey,
            notification.channel
        )

        const filledPush = {
            title: this.fill(template.title, notification.data),
            body: this.fill(template.body, notification.data)
        }

        const filledEmail = {
            subject: this.fill(template.title, notification.data),
            body: this.fill(template.body, notification.data)
        }

        if (notification.channel === "EMAIL") {
            await this.emailProcessor.send(notification.recipient, filledEmail)
        }

        if (notification.channel === "PUSH") {
            await this.pushProcessor.send(notification.recipient, filledPush)
        }
    }

    private fill(template: string, data: any) {
        return template.replace(/\{\{(.*?)\}\}/g, (_, key) => data[key.trim()])
    }
}
