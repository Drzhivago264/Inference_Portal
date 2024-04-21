"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../base");
class SimpleResponseBuilder_LlamaIndex {
    constructor() {
        this.label = 'Simple Response Builder';
        this.name = 'simpleResponseBuilderLlamaIndex';
        this.version = 1.0;
        this.type = 'SimpleResponseBuilder';
        this.icon = 'simplerb.svg';
        this.category = 'Response Synthesizer';
        this.description = `Apply a query to a collection of text chunks, gathering the responses in an array, and return a combined string of all responses. Useful for individual queries on each text chunk.`;
        this.baseClasses = [this.type, 'ResponseSynthesizer'];
        this.tags = ['LlamaIndex'];
        this.inputs = [];
    }
    async init() {
        return new base_1.ResponseSynthesizerClass({ type: 'SimpleResponseBuilder' });
    }
}
module.exports = { nodeClass: SimpleResponseBuilder_LlamaIndex };
//# sourceMappingURL=SimpleResponseBuilder.js.map