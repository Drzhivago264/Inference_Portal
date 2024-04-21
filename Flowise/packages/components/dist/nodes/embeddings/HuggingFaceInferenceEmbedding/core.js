"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HuggingFaceInferenceEmbeddings = void 0;
const inference_1 = require("@huggingface/inference");
const embeddings_1 = require("@langchain/core/embeddings");
const utils_1 = require("../../../src/utils");
class HuggingFaceInferenceEmbeddings extends embeddings_1.Embeddings {
    constructor(fields) {
        super(fields ?? {});
        this.model = fields?.model ?? 'sentence-transformers/distilbert-base-nli-mean-tokens';
        this.apiKey = fields?.apiKey ?? (0, utils_1.getEnvironmentVariable)('HUGGINGFACEHUB_API_KEY');
        this.endpoint = fields?.endpoint ?? '';
        this.client = new inference_1.HfInference(this.apiKey);
        if (this.endpoint)
            this.client.endpoint(this.endpoint);
    }
    async _embed(texts) {
        // replace newlines, which can negatively affect performance.
        const clean = texts.map((text) => text.replace(/\n/g, ' '));
        const hf = new inference_1.HfInference(this.apiKey);
        const obj = {
            inputs: clean
        };
        if (this.endpoint) {
            hf.endpoint(this.endpoint);
        }
        else {
            obj.model = this.model;
        }
        const res = await this.caller.callWithOptions({}, hf.featureExtraction.bind(hf), obj);
        return res;
    }
    async embedQuery(document) {
        const res = await this._embed([document]);
        return res[0];
    }
    async embedDocuments(documents) {
        return this._embed(documents);
    }
}
exports.HuggingFaceInferenceEmbeddings = HuggingFaceInferenceEmbeddings;
//# sourceMappingURL=core.js.map