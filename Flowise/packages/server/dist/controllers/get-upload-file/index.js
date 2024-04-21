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
const content_disposition_1 = __importDefault(require("content-disposition"));
const flowise_components_1 = require("flowise-components");
const fs = __importStar(require("fs"));
const streamUploadedImage = async (req, res, next) => {
    try {
        if (!req.query.chatflowId || !req.query.chatId || !req.query.fileName) {
            return res.status(500).send(`Invalid file path`);
        }
        const chatflowId = req.query.chatflowId;
        const chatId = req.query.chatId;
        const fileName = req.query.fileName;
        const filePath = path_1.default.join((0, flowise_components_1.getStoragePath)(), chatflowId, chatId, fileName);
        //raise error if file path is not absolute
        if (!path_1.default.isAbsolute(filePath))
            return res.status(500).send(`Invalid file path`);
        //raise error if file path contains '..'
        if (filePath.includes('..'))
            return res.status(500).send(`Invalid file path`);
        //only return from the storage folder
        if (!filePath.startsWith((0, flowise_components_1.getStoragePath)()))
            return res.status(500).send(`Invalid file path`);
        if (fs.existsSync(filePath)) {
            res.setHeader('Content-Disposition', (0, content_disposition_1.default)(path_1.default.basename(filePath)));
            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(res);
        }
        else {
            return res.status(404).send(`File ${fileName} not found`);
        }
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    streamUploadedImage
};
//# sourceMappingURL=index.js.map