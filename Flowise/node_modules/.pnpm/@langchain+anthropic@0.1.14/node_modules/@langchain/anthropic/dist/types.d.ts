export type AnthropicToolResponse = {
    type: "tool_use";
    id: string;
    name: string;
    input: Record<string, any>;
};
