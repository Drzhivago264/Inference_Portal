"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const stats_1 = __importDefault(require("../../services/stats"));
const Interface_1 = require("../../Interface");
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const utils_1 = require("../../errors/utils");
const getChatflowStats = async (req, res, next) => {
    var _a, _b, _c;
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: statsController.getChatflowStats - id not provided!`);
        }
        const chatflowid = req.params.id;
        let chatTypeFilter = (_a = req.query) === null || _a === void 0 ? void 0 : _a.chatType;
        const startDate = (_b = req.query) === null || _b === void 0 ? void 0 : _b.startDate;
        const endDate = (_c = req.query) === null || _c === void 0 ? void 0 : _c.endDate;
        if (chatTypeFilter) {
            try {
                const chatTypeFilterArray = JSON.parse(chatTypeFilter);
                if (chatTypeFilterArray.includes(Interface_1.chatType.EXTERNAL) && chatTypeFilterArray.includes(Interface_1.chatType.INTERNAL)) {
                    chatTypeFilter = undefined;
                }
                else if (chatTypeFilterArray.includes(Interface_1.chatType.EXTERNAL)) {
                    chatTypeFilter = Interface_1.chatType.EXTERNAL;
                }
                else if (chatTypeFilterArray.includes(Interface_1.chatType.INTERNAL)) {
                    chatTypeFilter = Interface_1.chatType.INTERNAL;
                }
            }
            catch (e) {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: statsController.getChatflowStats - ${(0, utils_1.getErrorMessage)(e)}`);
            }
        }
        const apiResponse = await stats_1.default.getChatflowStats(chatflowid, chatTypeFilter, startDate, endDate, '', true);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    getChatflowStats
};
//# sourceMappingURL=index.js.map