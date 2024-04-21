"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stats_1 = __importDefault(require("../../controllers/stats"));
const router = express_1.default.Router();
// READ
router.get(['/', '/:id'], stats_1.default.getChatflowStats);
exports.default = router;
//# sourceMappingURL=index.js.map