"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChromaExtended = void 0;
const chroma_1 = require("@langchain/community/vectorstores/chroma");
const chromadb_1 = require("chromadb");
class ChromaExtended extends chroma_1.Chroma {
    constructor(embeddings, args) {
        super(embeddings, args);
        this.chromaApiKey = args.chromaApiKey;
    }
    static async fromExistingCollection(embeddings, dbConfig) {
        const instance = new this(embeddings, dbConfig);
        await instance.ensureCollection();
        return instance;
    }
    async ensureCollection() {
        if (!this.collection) {
            if (!this.index) {
                const obj = {
                    path: this.url
                };
                if (this.chromaApiKey) {
                    obj.fetchOptions = {
                        headers: {
                            Authorization: `Bearer ${this.chromaApiKey}`
                        }
                    };
                }
                this.index = new chromadb_1.ChromaClient(obj);
            }
            try {
                this.collection = await this.index.getOrCreateCollection({
                    name: this.collectionName,
                    ...(this.collectionMetadata && { metadata: this.collectionMetadata })
                });
            }
            catch (err) {
                throw new Error(`Chroma getOrCreateCollection error: ${err}`);
            }
        }
        return this.collection;
    }
}
exports.ChromaExtended = ChromaExtended;
//# sourceMappingURL=core.js.map