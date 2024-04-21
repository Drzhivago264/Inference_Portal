"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const load_prompts_1 = __importDefault(require("../../controllers/load-prompts"));
const router = express_1.default.Router();
// CREATE
router.post('/', load_prompts_1.default.createPrompt);
exports.default = router;
//# sourceMappingURL=index.js.map