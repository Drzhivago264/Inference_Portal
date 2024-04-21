"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HuggingFaceInference = void 0;
const llms_1 = require("@langchain/core/language_models/llms");
const utils_1 = require("../../../src/utils");
class HuggingFaceInference extends llms_1.LLM {
    get lc_secrets() {
        return {
            apiKey: 'HUGGINGFACEHUB_API_KEY'
        };
    }
    constructor(fields) {
        super(fields ?? {});
        this.model = 'gpt2';
        this.temperature = undefined;
        this.maxTokens = undefined;
        this.topP = undefined;
        this.topK = undefined;
        this.frequencyPenalty = undefined;
        this.apiKey = undefined;
        this.endpoint = undefined;
        this.model = fields?.model ?? this.model;
        this.temperature = fields?.temperature ?? this.temperature;
        this.maxTokens = fields?.maxTokens ?? this.maxTokens;
        this.topP = fields?.topP ?? this.topP;
        this.topK = fields?.topK ?? this.topK;
        this.frequencyPenalty = fields?.frequencyPenalty ?? this.frequencyPenalty;
        this.endpoint = fields?.endpoint ?? '';
        this.apiKey = fields?.apiKey ?? (0, utils_1.getEnvironmentVariable)('HUGGINGFACEHUB_API_KEY');
        if (!this.apiKey) {
            throw new Error('Please set an API key for HuggingFace Hub in the environment variable HUGGINGFACEHUB_API_KEY or in the apiKey field of the HuggingFaceInference constructor.');
        }
    }
    _llmType() {
        return 'hf';
    }
    /** @ignore */
    async _call(prompt, options) {
        const { HfInference } = await HuggingFaceInference.imports();
        const hf = new HfInference(this.apiKey);
        const obj = {
            parameters: {
                // make it behave similar to openai, returning only the generated text
                return_full_text: false,
                temperature: this.temperature,
                max_new_tokens: this.maxTokens,
                top_p: this.topP,
                top_k: this.topK,
                repetition_penalty: this.frequencyPenalty
            },
            inputs: prompt
        };
        if (this.endpoint) {
            hf.endpoint(this.endpoint);
        }
        else {
            obj.model = this.model;
        }
        const res = await this.caller.callWithOptions({ signal: options.signal }, hf.textGeneration.bind(hf), obj);
        return res.generated_text;
    }
    /** @ignore */
    static async imports() {
        try {
            const { HfInference } = await Promise.resolve().then(() => __importStar(require('@huggingface/inference')));
            return { HfInference };
        }
        catch (e) {
            throw new Error('Please install huggingface as a dependency with, e.g. `pnpm add @huggingface/inference`');
        }
    }
}
exports.HuggingFaceInference = HuggingFaceInference;
//# sourceMappingURL=core.js.map