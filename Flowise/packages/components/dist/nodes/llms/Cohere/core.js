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
exports.Cohere = void 0;
const llms_1 = require("@langchain/core/language_models/llms");
class Cohere extends llms_1.LLM {
    constructor(fields) {
        super(fields ?? {});
        this.temperature = 0;
        this.maxTokens = 250;
        const apiKey = fields?.apiKey ?? undefined;
        if (!apiKey) {
            throw new Error('Please set the COHERE_API_KEY environment variable or pass it to the constructor as the apiKey field.');
        }
        this.apiKey = apiKey;
        this.maxTokens = fields?.maxTokens ?? this.maxTokens;
        this.temperature = fields?.temperature ?? this.temperature;
        this.model = fields?.model ?? this.model;
    }
    _llmType() {
        return 'cohere';
    }
    /** @ignore */
    async _call(prompt, options) {
        const { cohere } = await Cohere.imports();
        cohere.init(this.apiKey);
        // Hit the `generate` endpoint on the `large` model
        const generateResponse = await this.caller.callWithOptions({ signal: options.signal }, cohere.generate.bind(cohere), {
            prompt,
            model: this.model,
            max_tokens: this.maxTokens,
            temperature: this.temperature,
            end_sequences: options.stop
        });
        try {
            return generateResponse.body.generations[0].text;
        }
        catch {
            throw new Error('Could not parse response.');
        }
    }
    /** @ignore */
    static async imports() {
        try {
            const { default: cohere } = await Promise.resolve().then(() => __importStar(require('cohere-ai')));
            return { cohere };
        }
        catch (e) {
            throw new Error('Please install cohere-ai as a dependency with, e.g. `pnpm install cohere-ai`');
        }
    }
}
exports.Cohere = Cohere;
//# sourceMappingURL=core.js.map