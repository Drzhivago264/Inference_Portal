"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const feedback_1 = __importDefault(require("../../controllers/feedback"));
const router = express_1.default.Router();
// CREATE
router.post(['/', '/:id'], feedback_1.default.createChatMessageFeedbackForChatflow);
// READ
router.get(['/', '/:id'], feedback_1.default.getAllChatMessageFeedback);
// UPDATE
router.put(['/', '/:id'], feedback_1.default.updateChatMessageFeedbackForChatflow);
exports.default = router;
//# sourceMappingURL=index.js.map