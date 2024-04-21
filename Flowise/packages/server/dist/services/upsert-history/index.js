"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const http_status_codes_1 = require("http-status-codes");
const getRunningExpressApp_1 = require("../../utils/getRunningExpressApp");
const UpsertHistory_1 = require("../../database/entities/UpsertHistory");
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const utils_1 = require("../../errors/utils");
const getAllUpsertHistory = async (sortOrder, chatflowid, startDate, endDate) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const setDateToStartOrEndOfDay = (dateTimeStr, setHours) => {
            const date = new Date(dateTimeStr);
            if (isNaN(date.getTime())) {
                return undefined;
            }
            setHours === 'start' ? date.setHours(0, 0, 0, 0) : date.setHours(23, 59, 59, 999);
            return date;
        };
        let fromDate;
        if (startDate)
            fromDate = setDateToStartOrEndOfDay(startDate, 'start');
        let toDate;
        if (endDate)
            toDate = setDateToStartOrEndOfDay(endDate, 'end');
        let upsertHistory = await appServer.AppDataSource.getRepository(UpsertHistory_1.UpsertHistory).find({
            where: Object.assign(Object.assign({ chatflowid }, (fromDate && { date: (0, typeorm_1.MoreThanOrEqual)(fromDate) })), (toDate && { date: (0, typeorm_1.LessThanOrEqual)(toDate) })),
            order: {
                date: sortOrder === 'DESC' ? 'DESC' : 'ASC'
            }
        });
        upsertHistory = upsertHistory.map((hist) => {
            return Object.assign(Object.assign({}, hist), { result: hist.result ? JSON.parse(hist.result) : {}, flowData: hist.flowData ? JSON.parse(hist.flowData) : {} });
        });
        return upsertHistory;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: upsertHistoryServices.getAllUpsertHistory - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
const patchDeleteUpsertHistory = async (ids = []) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const dbResponse = await appServer.AppDataSource.getRepository(UpsertHistory_1.UpsertHistory).delete(ids);
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: upsertHistoryServices.patchDeleteUpsertHistory - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
exports.default = {
    getAllUpsertHistory,
    patchDeleteUpsertHistory
};
//# sourceMappingURL=index.js.map