"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const versions_1 = __importDefault(require("../../services/versions"));
const getVersion = async (req, res, next) => {
    try {
        const apiResponse = await versions_1.default.getVersion();
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    getVersion
};
//# sourceMappingURL=index.js.map