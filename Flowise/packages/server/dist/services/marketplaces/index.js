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
const http_status_codes_1 = require("http-status-codes");
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const utils_1 = require("../../errors/utils");
// Get all templates for marketplaces
const getAllTemplates = async () => {
    try {
        let marketplaceDir = path_1.default.join(__dirname, '..', '..', '..', 'marketplaces', 'chatflows');
        let jsonsInDir = fs.readdirSync(marketplaceDir).filter((file) => path_1.default.extname(file) === '.json');
        let templates = [];
        jsonsInDir.forEach((file, index) => {
            const filePath = path_1.default.join(__dirname, '..', '..', '..', 'marketplaces', 'chatflows', file);
            const fileData = fs.readFileSync(filePath);
            const fileDataObj = JSON.parse(fileData.toString());
            const template = {
                id: index,
                templateName: file.split('.json')[0],
                flowData: fileData.toString(),
                badge: fileDataObj === null || fileDataObj === void 0 ? void 0 : fileDataObj.badge,
                framework: fileDataObj === null || fileDataObj === void 0 ? void 0 : fileDataObj.framework,
                categories: fileDataObj === null || fileDataObj === void 0 ? void 0 : fileDataObj.categories,
                type: 'Chatflow',
                description: (fileDataObj === null || fileDataObj === void 0 ? void 0 : fileDataObj.description) || ''
            };
            templates.push(template);
        });
        marketplaceDir = path_1.default.join(__dirname, '..', '..', '..', 'marketplaces', 'tools');
        jsonsInDir = fs.readdirSync(marketplaceDir).filter((file) => path_1.default.extname(file) === '.json');
        jsonsInDir.forEach((file, index) => {
            const filePath = path_1.default.join(__dirname, '..', '..', '..', 'marketplaces', 'tools', file);
            const fileData = fs.readFileSync(filePath);
            const fileDataObj = JSON.parse(fileData.toString());
            const template = Object.assign(Object.assign({}, fileDataObj), { id: index, type: 'Tool', framework: fileDataObj === null || fileDataObj === void 0 ? void 0 : fileDataObj.framework, badge: fileDataObj === null || fileDataObj === void 0 ? void 0 : fileDataObj.badge, categories: '', templateName: file.split('.json')[0] });
            templates.push(template);
        });
        const sortedTemplates = templates.sort((a, b) => a.templateName.localeCompare(b.templateName));
        const FlowiseDocsQnAIndex = sortedTemplates.findIndex((tmp) => tmp.templateName === 'Flowise Docs QnA');
        if (FlowiseDocsQnAIndex > 0) {
            sortedTemplates.unshift(sortedTemplates.splice(FlowiseDocsQnAIndex, 1)[0]);
        }
        const dbResponse = sortedTemplates;
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: marketplacesService.getAllTemplates - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
exports.default = {
    getAllTemplates
};
//# sourceMappingURL=index.js.map