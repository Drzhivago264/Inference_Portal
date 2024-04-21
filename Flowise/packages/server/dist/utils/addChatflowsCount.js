"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addChatflowsCount = void 0;
const http_status_codes_1 = require("http-status-codes");
const ChatFlow_1 = require("../database/entities/ChatFlow");
const internalFlowiseError_1 = require("../errors/internalFlowiseError");
const getRunningExpressApp_1 = require("../utils/getRunningExpressApp");
const utils_1 = require("../errors/utils");
const addChatflowsCount = async (keys) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        let tmpResult = keys;
        if (typeof keys !== 'undefined' && keys.length > 0) {
            const updatedKeys = [];
            //iterate through keys and get chatflows
            for (const key of keys) {
                const chatflows = await appServer.AppDataSource.getRepository(ChatFlow_1.ChatFlow)
                    .createQueryBuilder('cf')
                    .where('cf.apikeyid = :apikeyid', { apikeyid: key.id })
                    .getMany();
                const linkedChatFlows = [];
                chatflows.map((cf) => {
                    linkedChatFlows.push({
                        flowName: cf.name,
                        category: cf.category,
                        updatedDate: cf.updatedDate
                    });
                });
                key.chatFlows = linkedChatFlows;
                updatedKeys.push(key);
            }
            tmpResult = updatedKeys;
        }
        return tmpResult;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: addChatflowsCount - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
exports.addChatflowsCount = addChatflowsCount;
//# sourceMappingURL=addChatflowsCount.js.map