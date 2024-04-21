"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompts_lists_1 = __importDefault(require("../../services/prompts-lists"));
// Prompt from Hub
const createPromptsList = async (req, res, next) => {
    try {
        const apiResponse = await prompts_lists_1.default.createPromptsList(req.body);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    createPromptsList
};
//# sourceMappingURL=index.js.map