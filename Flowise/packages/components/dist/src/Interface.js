"use strict";
/**
 * Types
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowiseSummaryBufferMemory = exports.FlowiseSummaryMemory = exports.FlowiseWindowMemory = exports.FlowiseMemory = exports.VectorStoreRetriever = exports.PromptRetriever = exports.PromptTemplate = void 0;
/**
 * Classes
 */
const prompts_1 = require("@langchain/core/prompts");
class PromptTemplate extends prompts_1.PromptTemplate {
    constructor(input) {
        super(input);
    }
}
exports.PromptTemplate = PromptTemplate;
const fixedTemplate = `Here is a question:
{input}
`;
class PromptRetriever {
    constructor(fields) {
        this.name = fields.name;
        this.description = fields.description;
        this.systemMessage = `${fields.systemMessage}\n${fixedTemplate}`;
    }
}
exports.PromptRetriever = PromptRetriever;
class VectorStoreRetriever {
    constructor(fields) {
        this.name = fields.name;
        this.description = fields.description;
        this.vectorStore = fields.vectorStore;
    }
}
exports.VectorStoreRetriever = VectorStoreRetriever;
const memory_1 = require("langchain/memory");
class FlowiseMemory extends memory_1.BufferMemory {
}
exports.FlowiseMemory = FlowiseMemory;
class FlowiseWindowMemory extends memory_1.BufferWindowMemory {
}
exports.FlowiseWindowMemory = FlowiseWindowMemory;
class FlowiseSummaryMemory extends memory_1.ConversationSummaryMemory {
}
exports.FlowiseSummaryMemory = FlowiseSummaryMemory;
class FlowiseSummaryBufferMemory extends memory_1.ConversationSummaryBufferMemory {
}
exports.FlowiseSummaryBufferMemory = FlowiseSummaryBufferMemory;
//# sourceMappingURL=Interface.js.map