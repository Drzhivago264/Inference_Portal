"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_configs_1 = __importDefault(require("../../services/node-configs"));
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const http_status_codes_1 = require("http-status-codes");
const getAllNodeConfigs = async (req, res, next) => {
    try {
        if (!req.body) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: nodeConfigsController.getAllNodeConfigs - body not provided!`);
        }
        const apiResponse = await node_configs_1.default.getAllNodeConfigs(req.body);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    getAllNodeConfigs
};
//# sourceMappingURL=index.js.map