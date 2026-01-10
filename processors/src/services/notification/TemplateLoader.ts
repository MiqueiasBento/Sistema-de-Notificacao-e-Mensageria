import { templates, TemplateKey, ChannelType } from "./templates"

export class TemplateLoader {
    load(templateKey: TemplateKey, channel: "EMAIL" | "PUSH") {
        const channelKey = channel.toLowerCase() as ChannelType
        return templates[templateKey as keyof typeof templates][channelKey as keyof typeof templates[TemplateKey]]
    }
}