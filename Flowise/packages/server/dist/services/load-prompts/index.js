"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const langchainhub_1 = require("langchainhub");
const http_status_codes_1 = require("http-status-codes");
const hub_1 = require("../../utils/hub");
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const utils_1 = require("../../errors/utils");
const createPrompt = async (promptName) => {
    try {
        let hub = new langchainhub_1.Client();
        const prompt = await hub.pull(promptName);
        const templates = (0, hub_1.parsePrompt)(prompt);
        const dbResponse = {
            status: 'OK',
            prompt: promptName,
            templates: templates
        };
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: loadPromptsService.createPrompt - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
exports.default = {
    createPrompt
};
//# sourceMappingURL=index.js.map