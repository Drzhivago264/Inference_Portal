"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const upsert_history_1 = __importDefault(require("../../services/upsert-history"));
const getAllUpsertHistory = async (req, res, next) => {
    var _a, _b, _c, _d;
    try {
        const sortOrder = (_a = req.query) === null || _a === void 0 ? void 0 : _a.order;
        const chatflowid = (_b = req.params) === null || _b === void 0 ? void 0 : _b.id;
        const startDate = (_c = req.query) === null || _c === void 0 ? void 0 : _c.startDate;
        const endDate = (_d = req.query) === null || _d === void 0 ? void 0 : _d.endDate;
        const apiResponse = await upsert_history_1.default.getAllUpsertHistory(sortOrder, chatflowid, startDate, endDate);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
const patchDeleteUpsertHistory = async (req, res, next) => {
    var _a;
    try {
        const ids = (_a = req.body.ids) !== null && _a !== void 0 ? _a : [];
        const apiResponse = await upsert_history_1.default.patchDeleteUpsertHistory(ids);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    getAllUpsertHistory,
    patchDeleteUpsertHistory
};
//# sourceMappingURL=index.js.map