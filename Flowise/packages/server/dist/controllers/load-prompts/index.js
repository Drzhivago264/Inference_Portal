"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const load_prompts_1 = __importDefault(require("../../services/load-prompts"));
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const http_status_codes_1 = require("http-status-codes");
const createPrompt = async (req, res, next) => {
    try {
        if (typeof req.body === 'undefined' || !req.body.promptName) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: loadPromptsController.createPrompt - promptName not provided!`);
        }
        const apiResponse = await load_prompts_1.default.createPrompt(req.body.promptName);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    createPrompt
};
//# sourceMappingURL=index.js.map