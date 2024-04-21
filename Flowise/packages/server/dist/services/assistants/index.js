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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs"));
const http_status_codes_1 = require("http-status-codes");
const lodash_1 = require("lodash");
const getRunningExpressApp_1 = require("../../utils/getRunningExpressApp");
const Assistant_1 = require("../../database/entities/Assistant");
const Credential_1 = require("../../database/entities/Credential");
const utils_1 = require("../../utils");
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const utils_2 = require("../../errors/utils");
const createAssistant = async (requestBody) => {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        if (!requestBody.details) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Invalid request body`);
        }
        const assistantDetails = JSON.parse(requestBody.details);
        try {
            const credential = await appServer.AppDataSource.getRepository(Credential_1.Credential).findOneBy({
                id: requestBody.credential
            });
            if (!credential) {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Credential ${requestBody.credential} not found`);
            }
            // Decrpyt credentialData
            const decryptedCredentialData = await (0, utils_1.decryptCredentialData)(credential.encryptedData);
            const openAIApiKey = decryptedCredentialData['openAIApiKey'];
            if (!openAIApiKey) {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `OpenAI ApiKey not found`);
            }
            const openai = new openai_1.default({ apiKey: openAIApiKey });
            let tools = [];
            if (assistantDetails.tools) {
                for (const tool of (_a = assistantDetails.tools) !== null && _a !== void 0 ? _a : []) {
                    tools.push({
                        type: tool
                    });
                }
            }
            if (assistantDetails.uploadFiles) {
                // Base64 strings
                let files = [];
                const fileBase64 = assistantDetails.uploadFiles;
                if (fileBase64.startsWith('[') && fileBase64.endsWith(']')) {
                    files = JSON.parse(fileBase64);
                }
                else {
                    files = [fileBase64];
                }
                const uploadedFiles = [];
                for (const file of files) {
                    const splitDataURI = file.split(',');
                    const filename = (_c = (_b = splitDataURI.pop()) === null || _b === void 0 ? void 0 : _b.split(':')[1]) !== null && _c !== void 0 ? _c : '';
                    const bf = Buffer.from(splitDataURI.pop() || '', 'base64');
                    const filePath = path_1.default.join((0, utils_1.getUserHome)(), '.flowise', 'openai-assistant', filename);
                    if (!fs.existsSync(path_1.default.join((0, utils_1.getUserHome)(), '.flowise', 'openai-assistant'))) {
                        fs.mkdirSync(path_1.default.dirname(filePath), { recursive: true });
                    }
                    if (!fs.existsSync(filePath)) {
                        fs.writeFileSync(filePath, bf);
                    }
                    const createdFile = await openai.files.create({
                        file: fs.createReadStream(filePath),
                        purpose: 'assistants'
                    });
                    uploadedFiles.push(createdFile);
                    fs.unlinkSync(filePath);
                }
                assistantDetails.files = [...assistantDetails.files, ...uploadedFiles];
            }
            if (!assistantDetails.id) {
                const newAssistant = await openai.beta.assistants.create({
                    name: assistantDetails.name,
                    description: assistantDetails.description,
                    instructions: assistantDetails.instructions,
                    model: assistantDetails.model,
                    tools,
                    file_ids: ((_d = assistantDetails.files) !== null && _d !== void 0 ? _d : []).map((file) => file.id)
                });
                assistantDetails.id = newAssistant.id;
            }
            else {
                const retrievedAssistant = await openai.beta.assistants.retrieve(assistantDetails.id);
                let filteredTools = (0, lodash_1.uniqWith)([...retrievedAssistant.tools, ...tools], lodash_1.isEqual);
                filteredTools = filteredTools.filter((tool) => !(tool.type === 'function' && !tool.function));
                await openai.beta.assistants.update(assistantDetails.id, {
                    name: assistantDetails.name,
                    description: (_e = assistantDetails.description) !== null && _e !== void 0 ? _e : '',
                    instructions: (_f = assistantDetails.instructions) !== null && _f !== void 0 ? _f : '',
                    model: assistantDetails.model,
                    tools: filteredTools,
                    file_ids: (0, lodash_1.uniqWith)([...retrievedAssistant.file_ids, ...((_g = assistantDetails.files) !== null && _g !== void 0 ? _g : []).map((file) => file.id)], lodash_1.isEqual)
                });
            }
            const newAssistantDetails = Object.assign({}, assistantDetails);
            if (newAssistantDetails.uploadFiles)
                delete newAssistantDetails.uploadFiles;
            requestBody.details = JSON.stringify(newAssistantDetails);
        }
        catch (error) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error creating new assistant - ${(0, utils_2.getErrorMessage)(error)}`);
        }
        const newAssistant = new Assistant_1.Assistant();
        Object.assign(newAssistant, requestBody);
        const assistant = await appServer.AppDataSource.getRepository(Assistant_1.Assistant).create(newAssistant);
        const dbResponse = await appServer.AppDataSource.getRepository(Assistant_1.Assistant).save(assistant);
        await appServer.telemetry.sendTelemetry('assistant_created', {
            version: await (0, utils_1.getAppVersion)(),
            assistantId: dbResponse.id
        });
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: assistantsService.createAssistant - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const deleteAssistant = async (assistantId, isDeleteBoth) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const assistant = await appServer.AppDataSource.getRepository(Assistant_1.Assistant).findOneBy({
            id: assistantId
        });
        if (!assistant) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Assistant ${assistantId} not found`);
        }
        try {
            const assistantDetails = JSON.parse(assistant.details);
            const credential = await appServer.AppDataSource.getRepository(Credential_1.Credential).findOneBy({
                id: assistant.credential
            });
            if (!credential) {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Credential ${assistant.credential} not found`);
            }
            // Decrpyt credentialData
            const decryptedCredentialData = await (0, utils_1.decryptCredentialData)(credential.encryptedData);
            const openAIApiKey = decryptedCredentialData['openAIApiKey'];
            if (!openAIApiKey) {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `OpenAI ApiKey not found`);
            }
            const openai = new openai_1.default({ apiKey: openAIApiKey });
            const dbResponse = await appServer.AppDataSource.getRepository(Assistant_1.Assistant).delete({ id: assistantId });
            if (isDeleteBoth)
                await openai.beta.assistants.del(assistantDetails.id);
            return dbResponse;
        }
        catch (error) {
            if (error.status === 404 && error.type === 'invalid_request_error') {
                return 'OK';
            }
            else {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error deleting assistant - ${(0, utils_2.getErrorMessage)(error)}`);
            }
        }
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: assistantsService.deleteAssistant - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const getAllAssistants = async () => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const dbResponse = await appServer.AppDataSource.getRepository(Assistant_1.Assistant).find();
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: assistantsService.getAllAssistants - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const getAssistantById = async (assistantId) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const dbResponse = await appServer.AppDataSource.getRepository(Assistant_1.Assistant).findOneBy({
            id: assistantId
        });
        if (!dbResponse) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Assistant ${assistantId} not found`);
        }
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: assistantsService.getAssistantById - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const updateAssistant = async (assistantId, requestBody) => {
    var _a, _b, _c, _d, _e;
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const assistant = await appServer.AppDataSource.getRepository(Assistant_1.Assistant).findOneBy({
            id: assistantId
        });
        if (!assistant) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Assistant ${assistantId} not found`);
        }
        try {
            const openAIAssistantId = (_a = JSON.parse(assistant.details)) === null || _a === void 0 ? void 0 : _a.id;
            const body = requestBody;
            const assistantDetails = JSON.parse(body.details);
            const credential = await appServer.AppDataSource.getRepository(Credential_1.Credential).findOneBy({
                id: body.credential
            });
            if (!credential) {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Credential ${body.credential} not found`);
            }
            // Decrpyt credentialData
            const decryptedCredentialData = await (0, utils_1.decryptCredentialData)(credential.encryptedData);
            const openAIApiKey = decryptedCredentialData['openAIApiKey'];
            if (!openAIApiKey) {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `OpenAI ApiKey not found`);
            }
            const openai = new openai_1.default({ apiKey: openAIApiKey });
            let tools = [];
            if (assistantDetails.tools) {
                for (const tool of (_b = assistantDetails.tools) !== null && _b !== void 0 ? _b : []) {
                    tools.push({
                        type: tool
                    });
                }
            }
            if (assistantDetails.uploadFiles) {
                // Base64 strings
                let files = [];
                const fileBase64 = assistantDetails.uploadFiles;
                if (fileBase64.startsWith('[') && fileBase64.endsWith(']')) {
                    files = JSON.parse(fileBase64);
                }
                else {
                    files = [fileBase64];
                }
                const uploadedFiles = [];
                for (const file of files) {
                    const splitDataURI = file.split(',');
                    const filename = (_d = (_c = splitDataURI.pop()) === null || _c === void 0 ? void 0 : _c.split(':')[1]) !== null && _d !== void 0 ? _d : '';
                    const bf = Buffer.from(splitDataURI.pop() || '', 'base64');
                    const filePath = path_1.default.join((0, utils_1.getUserHome)(), '.flowise', 'openai-assistant', filename);
                    if (!fs.existsSync(path_1.default.join((0, utils_1.getUserHome)(), '.flowise', 'openai-assistant'))) {
                        fs.mkdirSync(path_1.default.dirname(filePath), { recursive: true });
                    }
                    if (!fs.existsSync(filePath)) {
                        fs.writeFileSync(filePath, bf);
                    }
                    const createdFile = await openai.files.create({
                        file: fs.createReadStream(filePath),
                        purpose: 'assistants'
                    });
                    uploadedFiles.push(createdFile);
                    fs.unlinkSync(filePath);
                }
                assistantDetails.files = [...assistantDetails.files, ...uploadedFiles];
            }
            const retrievedAssistant = await openai.beta.assistants.retrieve(openAIAssistantId);
            let filteredTools = (0, lodash_1.uniqWith)([...retrievedAssistant.tools, ...tools], lodash_1.isEqual);
            filteredTools = filteredTools.filter((tool) => !(tool.type === 'function' && !tool.function));
            await openai.beta.assistants.update(openAIAssistantId, {
                name: assistantDetails.name,
                description: assistantDetails.description,
                instructions: assistantDetails.instructions,
                model: assistantDetails.model,
                tools: filteredTools,
                file_ids: (0, lodash_1.uniqWith)([...retrievedAssistant.file_ids, ...((_e = assistantDetails.files) !== null && _e !== void 0 ? _e : []).map((file) => file.id)], lodash_1.isEqual)
            });
            const newAssistantDetails = Object.assign(Object.assign({}, assistantDetails), { id: openAIAssistantId });
            if (newAssistantDetails.uploadFiles)
                delete newAssistantDetails.uploadFiles;
            const updateAssistant = new Assistant_1.Assistant();
            body.details = JSON.stringify(newAssistantDetails);
            Object.assign(updateAssistant, body);
            await appServer.AppDataSource.getRepository(Assistant_1.Assistant).merge(assistant, updateAssistant);
            const dbResponse = await appServer.AppDataSource.getRepository(Assistant_1.Assistant).save(assistant);
            return dbResponse;
        }
        catch (error) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error updating assistant - ${(0, utils_2.getErrorMessage)(error)}`);
        }
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: assistantsService.updateAssistant - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
exports.default = {
    createAssistant,
    deleteAssistant,
    getAllAssistants,
    getAssistantById,
    updateAssistant
};
//# sourceMappingURL=index.js.map