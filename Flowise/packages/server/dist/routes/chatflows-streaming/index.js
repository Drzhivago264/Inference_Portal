"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatflows_1 = __importDefault(require("../../controllers/chatflows"));
const router = express_1.default.Router();
// READ
router.get(['/', '/:id'], chatflows_1.default.checkIfChatflowIsValidForStreaming);
exports.default = router;
//# sourceMappingURL=index.js.map