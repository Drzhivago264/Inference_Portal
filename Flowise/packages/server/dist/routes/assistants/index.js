"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const assistants_1 = __importDefault(require("../../controllers/assistants"));
const router = express_1.default.Router();
// CREATE
router.post('/', assistants_1.default.createAssistant);
// READ
router.get('/', assistants_1.default.getAllAssistants);
router.get(['/', '/:id'], assistants_1.default.getAssistantById);
// UPDATE
router.put(['/', '/:id'], assistants_1.default.updateAssistant);
// DELETE
router.delete(['/', '/:id'], assistants_1.default.deleteAssistant);
exports.default = router;
//# sourceMappingURL=index.js.map