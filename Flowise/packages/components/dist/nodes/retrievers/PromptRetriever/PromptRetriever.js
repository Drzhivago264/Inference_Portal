"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Interface_1 = require("../../../src/Interface");
class PromptRetriever_Retrievers {
    constructor() {
        this.label = 'Prompt Retriever';
        this.name = 'promptRetriever';
        this.version = 1.0;
        this.type = 'PromptRetriever';
        this.icon = 'promptretriever.svg';
        this.category = 'Retrievers';
        this.description = 'Store prompt template with name & description to be later queried by MultiPromptChain';
        this.baseClasses = [this.type];
        this.inputs = [
            {
                label: 'Prompt Name',
                name: 'name',
                type: 'string',
                placeholder: 'physics-qa'
            },
            {
                label: 'Prompt Description',
                name: 'description',
                type: 'string',
                rows: 3,
                description: 'Description of what the prompt does and when it should be used',
                placeholder: 'Good for answering questions about physics'
            },
            {
                label: 'Prompt System Message',
                name: 'systemMessage',
                type: 'string',
                rows: 4,
                placeholder: `You are a very smart physics professor. You are great at answering questions about physics in a concise and easy to understand manner. When you don't know the answer to a question you admit that you don't know.`
            }
        ];
    }
    async init(nodeData) {
        const name = nodeData.inputs?.name;
        const description = nodeData.inputs?.description;
        const systemMessage = nodeData.inputs?.systemMessage;
        const obj = {
            name,
            description,
            systemMessage
        };
        const retriever = new Interface_1.PromptRetriever(obj);
        return retriever;
    }
}
module.exports = { nodeClass: PromptRetriever_Retrievers };
//# sourceMappingURL=PromptRetriever.js.map