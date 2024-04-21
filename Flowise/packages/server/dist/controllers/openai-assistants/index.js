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
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs"));
const openai_assistants_1 = __importDefault(require("../../services/openai-assistants"));
const utils_1 = require("../../utils");
const content_disposition_1 = __importDefault(require("content-disposition"));
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const http_status_codes_1 = require("http-status-codes");
// List available assistants
const getAllOpenaiAssistants = async (req, res, next) => {
    try {
        if (typeof req.query === 'undefined' || !req.query.credential) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: openaiAssistantsController.getAllOpenaiAssistants - credential not provided!`);
        }
        const apiResponse = await openai_assistants_1.default.getAllOpenaiAssistants(req.query.credential);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
// Get assistant object
const getSingleOpenaiAssistant = async (req, res, next) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: openaiAssistantsController.getSingleOpenaiAssistant - id not provided!`);
        }
        if (typeof req.query === 'undefined' || !req.query.credential) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: openaiAssistantsController.getSingleOpenaiAssistant - credential not provided!`);
        }
        const apiResponse = await openai_assistants_1.default.getSingleOpenaiAssistant(req.query.credential, req.params.id);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
// Download file from assistant
const getFileFromAssistant = async (req, res, next) => {
    try {
        const filePath = path_1.default.join((0, utils_1.getUserHome)(), '.flowise', 'openai-assistant', req.body.fileName);
        //raise error if file path is not absolute
        if (!path_1.default.isAbsolute(filePath))
            return res.status(500).send(`Invalid file path`);
        //raise error if file path contains '..'
        if (filePath.includes('..'))
            return res.status(500).send(`Invalid file path`);
        //only return from the .flowise openai-assistant folder
        if (!(filePath.includes('.flowise') && filePath.includes('openai-assistant')))
            return res.status(500).send(`Invalid file path`);
        if (fs.existsSync(filePath)) {
            res.setHeader('Content-Disposition', (0, content_disposition_1.default)(path_1.default.basename(filePath)));
            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(res);
        }
        else {
            return res.status(404).send(`File ${req.body.fileName} not found`);
        }
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    getAllOpenaiAssistants,
    getSingleOpenaiAssistant,
    getFileFromAssistant
};
//# sourceMappingURL=index.js.map