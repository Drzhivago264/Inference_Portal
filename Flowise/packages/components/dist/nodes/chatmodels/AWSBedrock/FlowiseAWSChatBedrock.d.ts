import { BaseChatModelParams } from '@langchain/core/language_models/chat_models';
import { BedrockChat as LCBedrockChat } from '@langchain/community/chat_models/bedrock';
import { BaseBedrockInput } from '@langchain/community/dist/utils/bedrock';
import { IVisionChatModal, IMultiModalOption } from '../../../src';
export declare class BedrockChat extends LCBedrockChat implements IVisionChatModal {
    configuredModel: string;
    configuredMaxToken?: number;
    multiModalOption: IMultiModalOption;
    id: string;
    constructor(id: string, fields: BaseBedrockInput & BaseChatModelParams);
    revertToOriginalModel(): void;
    setMultiModalOption(multiModalOption: IMultiModalOption): void;
    setVisionModel(): void;
}
