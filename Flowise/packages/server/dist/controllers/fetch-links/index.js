"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_links_1 = __importDefault(require("../../services/fetch-links"));
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const http_status_codes_1 = require("http-status-codes");
const getAllLinks = async (req, res, next) => {
    try {
        if (typeof req.query === 'undefined' || !req.query.url) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: fetchLinksController.getAllLinks - url not provided!`);
        }
        if (typeof req.query === 'undefined' || !req.query.relativeLinksMethod) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: fetchLinksController.getAllLinks - relativeLinksMethod not provided!`);
        }
        if (typeof req.query === 'undefined' || !req.query.limit) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: fetchLinksController.getAllLinks - limit not provided!`);
        }
        const apiResponse = await fetch_links_1.default.getAllLinks(req.query.url, req.query.relativeLinksMethod, req.query.limit);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    getAllLinks
};
//# sourceMappingURL=index.js.map