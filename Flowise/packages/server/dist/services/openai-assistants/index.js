"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../../utils");
const getRunningExpressApp_1 = require("../../utils/getRunningExpressApp");
const Credential_1 = require("../../database/entities/Credential");
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const utils_2 = require("../../errors/utils");
// ----------------------------------------
// Assistants
// ----------------------------------------
// List available assistants
const getAllOpenaiAssistants = async (credentialId) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const credential = await appServer.AppDataSource.getRepository(Credential_1.Credential).findOneBy({
            id: credentialId
        });
        if (!credential) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Credential ${credentialId} not found in the database!`);
        }
        // Decrpyt credentialData
        const decryptedCredentialData = await (0, utils_1.decryptCredentialData)(credential.encryptedData);
        const openAIApiKey = decryptedCredentialData['openAIApiKey'];
        if (!openAIApiKey) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `OpenAI ApiKey not found`);
        }
        const openai = new openai_1.default({ apiKey: openAIApiKey });
        const retrievedAssistants = await openai.beta.assistants.list();
        const dbResponse = retrievedAssistants.data;
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: openaiAssistantsService.getAllOpenaiAssistants - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
// Get assistant object
const getSingleOpenaiAssistant = async (credentialId, assistantId) => {
    var _a;
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const credential = await appServer.AppDataSource.getRepository(Credential_1.Credential).findOneBy({
            id: credentialId
        });
        if (!credential) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Credential ${credentialId} not found in the database!`);
        }
        // Decrpyt credentialData
        const decryptedCredentialData = await (0, utils_1.decryptCredentialData)(credential.encryptedData);
        const openAIApiKey = decryptedCredentialData['openAIApiKey'];
        if (!openAIApiKey) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `OpenAI ApiKey not found`);
        }
        const openai = new openai_1.default({ apiKey: openAIApiKey });
        const dbResponse = await openai.beta.assistants.retrieve(assistantId);
        const resp = await openai.files.list();
        const existingFiles = (_a = resp.data) !== null && _a !== void 0 ? _a : [];
        if (dbResponse.file_ids && dbResponse.file_ids.length) {
            ;
            dbResponse.files = existingFiles.filter((file) => dbResponse.file_ids.includes(file.id));
        }
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: openaiAssistantsService.getSingleOpenaiAssistant - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
exports.default = {
    getAllOpenaiAssistants,
    getSingleOpenaiAssistant
};
//# sourceMappingURL=index.js.map