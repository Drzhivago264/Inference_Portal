"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReciprocalRankFusion = void 0;
const prompts_1 = require("@langchain/core/prompts");
const chains_1 = require("langchain/chains");
const document_compressors_1 = require("langchain/retrievers/document_compressors");
class ReciprocalRankFusion extends document_compressors_1.BaseDocumentCompressor {
    constructor(llm, baseRetriever, queryCount, topK, c) {
        super();
        this.queryCount = queryCount;
        this.llm = llm;
        this.baseRetriever = baseRetriever;
        this.topK = topK;
        this.c = c;
    }
    async compressDocuments(documents, query, _) {
        // avoid empty api call
        if (documents.length === 0) {
            return [];
        }
        const chatPrompt = prompts_1.ChatPromptTemplate.fromMessages([
            prompts_1.SystemMessagePromptTemplate.fromTemplate('You are a helpful assistant that generates multiple search queries based on a single input query.'),
            prompts_1.HumanMessagePromptTemplate.fromTemplate('Generate multiple search queries related to: {input}. Provide these alternative questions separated by newlines, do not add any numbers.'),
            prompts_1.HumanMessagePromptTemplate.fromTemplate('OUTPUT (' + this.queryCount + ' queries):')
        ]);
        const llmChain = new chains_1.LLMChain({
            llm: this.llm,
            prompt: chatPrompt
        });
        const multipleQueries = await llmChain.call({ input: query });
        const queries = [];
        queries.push(query);
        multipleQueries.text.split('\n').map((q) => {
            queries.push(q);
        });
        const docList = [];
        for (let i = 0; i < queries.length; i++) {
            const resultOne = await this.baseRetriever.vectorStore.similaritySearch(queries[i], 5);
            const docs = [];
            resultOne.forEach((doc) => {
                docs.push(doc);
            });
            docList.push(docs);
        }
        return this.reciprocalRankFunction(docList, this.c);
    }
    reciprocalRankFunction(docList, k) {
        docList.forEach((docs) => {
            docs.forEach((doc, index) => {
                let rank = index + 1;
                if (doc.metadata.relevancy_score) {
                    doc.metadata.relevancy_score += 1 / (rank + k);
                }
                else {
                    doc.metadata.relevancy_score = 1 / (rank + k);
                }
            });
        });
        const scoreArray = [];
        docList.forEach((docs) => {
            docs.forEach((doc) => {
                scoreArray.push(doc.metadata.relevancy_score);
            });
        });
        scoreArray.sort((a, b) => b - a);
        const rerankedDocuments = [];
        const seenScores = [];
        scoreArray.forEach((score) => {
            docList.forEach((docs) => {
                docs.forEach((doc) => {
                    if (doc.metadata.relevancy_score === score && seenScores.indexOf(score) === -1) {
                        rerankedDocuments.push(doc);
                        seenScores.push(doc.metadata.relevancy_score);
                    }
                });
            });
        });
        return rerankedDocuments.splice(0, this.topK);
    }
}
exports.ReciprocalRankFusion = ReciprocalRankFusion;
//# sourceMappingURL=ReciprocalRankFusion.js.map