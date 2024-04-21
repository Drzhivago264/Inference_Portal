"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const marketplaces_1 = __importDefault(require("../../services/marketplaces"));
// Get all templates for marketplaces
const getAllTemplates = async (req, res, next) => {
    try {
        const apiResponse = await marketplaces_1.default.getAllTemplates();
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    getAllTemplates
};
//# sourceMappingURL=index.js.map