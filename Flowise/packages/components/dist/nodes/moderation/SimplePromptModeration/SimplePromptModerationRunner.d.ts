import { Moderation } from '../Moderation';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
export declare class SimplePromptModerationRunner implements Moderation {
    private readonly denyList;
    private readonly moderationErrorMessage;
    private readonly model;
    constructor(denyList: string, moderationErrorMessage: string, model?: BaseChatModel);
    checkForViolations(input: string): Promise<string>;
}
