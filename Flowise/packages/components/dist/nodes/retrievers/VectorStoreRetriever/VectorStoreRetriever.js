"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Interface_1 = require("../../../src/Interface");
class VectorStoreRetriever_Retrievers {
    constructor() {
        this.label = 'Vector Store Retriever';
        this.name = 'vectorStoreRetriever';
        this.version = 1.0;
        this.type = 'VectorStoreRetriever';
        this.icon = 'vectorretriever.svg';
        this.category = 'Retrievers';
        this.description = 'Store vector store as retriever to be later queried by MultiRetrievalQAChain';
        this.baseClasses = [this.type];
        this.inputs = [
            {
                label: 'Vector Store',
                name: 'vectorStore',
                type: 'VectorStore'
            },
            {
                label: 'Retriever Name',
                name: 'name',
                type: 'string',
                placeholder: 'netflix movies'
            },
            {
                label: 'Retriever Description',
                name: 'description',
                type: 'string',
                rows: 3,
                description: 'Description of when to use the vector store retriever',
                placeholder: 'Good for answering questions about netflix movies'
            }
        ];
    }
    async init(nodeData) {
        const name = nodeData.inputs?.name;
        const description = nodeData.inputs?.description;
        const vectorStore = nodeData.inputs?.vectorStore;
        const obj = {
            name,
            description,
            vectorStore
        };
        const retriever = new Interface_1.VectorStoreRetriever(obj);
        return retriever;
    }
}
module.exports = { nodeClass: VectorStoreRetriever_Retrievers };
//# sourceMappingURL=VectorStoreRetriever.js.map