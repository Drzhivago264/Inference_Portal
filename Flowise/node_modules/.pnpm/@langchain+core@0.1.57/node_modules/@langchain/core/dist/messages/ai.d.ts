import { BaseMessage, BaseMessageChunk, type MessageType, BaseMessageFields } from "./base.js";
import { InvalidToolCall, ToolCall, ToolCallChunk } from "./tool.js";
export type AIMessageFields = BaseMessageFields & {
    tool_calls?: ToolCall[];
    invalid_tool_calls?: InvalidToolCall[];
};
/**
 * Represents an AI message in a conversation.
 */
export declare class AIMessage extends BaseMessage {
    tool_calls?: ToolCall[];
    invalid_tool_calls?: InvalidToolCall[];
    get lc_aliases(): Record<string, string>;
    constructor(fields: string | AIMessageFields, 
    /** @deprecated */
    kwargs?: Record<string, unknown>);
    static lc_name(): string;
    _getType(): MessageType;
}
export declare function isAIMessage(x: BaseMessage): x is AIMessage;
export type AIMessageChunkFields = AIMessageFields & {
    tool_call_chunks?: ToolCallChunk[];
};
/**
 * Represents a chunk of an AI message, which can be concatenated with
 * other AI message chunks.
 */
export declare class AIMessageChunk extends BaseMessageChunk {
    tool_calls?: ToolCall[];
    invalid_tool_calls?: InvalidToolCall[];
    tool_call_chunks?: ToolCallChunk[];
    constructor(fields: string | AIMessageChunkFields);
    get lc_aliases(): Record<string, string>;
    static lc_name(): string;
    _getType(): MessageType;
    concat(chunk: AIMessageChunk): AIMessageChunk;
}
