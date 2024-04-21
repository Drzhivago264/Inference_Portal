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
const getVersion = async () => {
    try {
        const getPackageJsonPath = () => {
            const checkPaths = [
                path_1.default.join(__dirname, '..', 'package.json'),
                path_1.default.join(__dirname, '..', '..', 'package.json'),
                path_1.default.join(__dirname, '..', '..', '..', 'package.json'),
                path_1.default.join(__dirname, '..', '..', '..', '..', 'package.json'),
                path_1.default.join(__dirname, '..', '..', '..', '..', '..', 'package.json')
            ];
            for (const checkPath of checkPaths) {
                if (fs.existsSync(checkPath)) {
                    return checkPath;
                }
            }
            return '';
        };
        const packagejsonPath = getPackageJsonPath();
        if (!packagejsonPath) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Version not found`);
        }
        try {
            const content = await fs.promises.readFile(packagejsonPath, 'utf8');
            const parsedContent = JSON.parse(content);
            return {
                version: parsedContent.version
            };
        }
        catch (error) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Version not found- ${(0, utils_1.getErrorMessage)(error)}`);
        }
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: versionService.getVersion - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
exports.default = {
    getVersion
};
//# sourceMappingURL=index.js.map