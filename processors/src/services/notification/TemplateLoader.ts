import * as fs from 'fs/promises';
import * as path from 'path';

export class TemplateLoader {
    private templatesDir = path.join(__dirname, '../../templates');

    async load(templateKey: string, channel: string): Promise<{ title: string, body: string }> {
        const filePath = path.join(this.templatesDir, `${templateKey}.json`);
        
        try {
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const templateData = JSON.parse(fileContent);
            
            const channelKey = channel.toLowerCase();
            const channelTemplate = templateData[channelKey];

            if (!channelTemplate) {
                throw new Error(`Template for channel ${channel} not found in ${templateKey}`);
            }

            return channelTemplate;
        } catch (error) {
            console.error(`Error loading template ${templateKey}:`, error);
            throw new Error(`Failed to load template: ${templateKey}`);
        }
    }
}
