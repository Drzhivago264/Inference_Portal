"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const flow_configs_1 = __importDefault(require("../../services/flow-configs"));
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const http_status_codes_1 = require("http-status-codes");
const getSingleFlowConfig = async (req, res, next) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: flowConfigsController.getSingleFlowConfig - id not provided!`);
        }
        const apiResponse = await flow_configs_1.default.getSingleFlowConfig(req.params.id);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    getSingleFlowConfig
};
//# sourceMappingURL=index.js.map