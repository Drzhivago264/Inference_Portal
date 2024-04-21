import { Moderation } from '../Moderation';
export declare class OpenAIModerationRunner implements Moderation {
    private openAIApiKey;
    private moderationErrorMessage;
    constructor(openAIApiKey: string);
    checkForViolations(input: string): Promise<string>;
    setErrorMessage(message: string): void;
}
