"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegions = exports.getModels = exports.MODEL_TYPE = void 0;
const axios_1 = __importDefault(require("axios"));
const MASTER_MODEL_LIST = 'https://raw.githubusercontent.com/FlowiseAI/Flowise/main/packages/components/models.json';
var MODEL_TYPE;
(function (MODEL_TYPE) {
    MODEL_TYPE["CHAT"] = "chat";
    MODEL_TYPE["LLM"] = "llm";
    MODEL_TYPE["EMBEDDING"] = "embedding";
})(MODEL_TYPE = exports.MODEL_TYPE || (exports.MODEL_TYPE = {}));
const getModelConfig = async (category, name) => {
    const modelFile = process.env.MODEL_LIST_CONFIG_JSON || MASTER_MODEL_LIST;
    if (!modelFile) {
        throw new Error('MODEL_LIST_CONFIG_JSON not set');
    }
    const resp = await axios_1.default.get(modelFile);
    const models = resp.data;
    const categoryModels = models[category];
    return categoryModels.find((model) => model.name === name);
};
const getModels = async (category, name) => {
    const returnData = [];
    try {
        const modelConfig = await getModelConfig(category, name);
        returnData.push(...modelConfig.models);
        return returnData;
    }
    catch (e) {
        throw new Error(`Error: getModels - ${e}`);
    }
};
exports.getModels = getModels;
const getRegions = async (category, name) => {
    const returnData = [];
    try {
        const modelConfig = await getModelConfig(category, name);
        returnData.push(...modelConfig.regions);
        return returnData;
    }
    catch (e) {
        throw new Error(`Error: getRegions - ${e}`);
    }
};
exports.getRegions = getRegions;
//# sourceMappingURL=modelLoader.js.map