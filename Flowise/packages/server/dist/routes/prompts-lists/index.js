"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prompts_lists_1 = __importDefault(require("../../controllers/prompts-lists"));
const router = express_1.default.Router();
// CREATE
router.post('/', prompts_lists_1.default.createPromptsList);
exports.default = router;
//# sourceMappingURL=index.js.map