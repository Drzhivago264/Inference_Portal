"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatflows_1 = __importDefault(require("../../controllers/chatflows"));
const router = express_1.default.Router();
// CREATE
router.post('/', chatflows_1.default.saveChatflow);
// READ
router.get('/', chatflows_1.default.getAllChatflows);
router.get(['/', '/:id'], chatflows_1.default.getChatflowById);
router.get(['/apikey/', '/apikey/:apikey'], chatflows_1.default.getChatflowByApiKey);
// UPDATE
router.put(['/', '/:id'], chatflows_1.default.updateChatflow);
// DELETE
router.delete(['/', '/:id'], chatflows_1.default.deleteChatflow);
exports.default = router;
//# sourceMappingURL=index.js.map