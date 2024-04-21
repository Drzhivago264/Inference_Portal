"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tools_1 = __importDefault(require("../../controllers/tools"));
const router = express_1.default.Router();
// CREATE
router.post('/', tools_1.default.createTool);
// READ
router.get('/', tools_1.default.getAllTools);
router.get(['/', '/:id'], tools_1.default.getToolById);
// UPDATE
router.put(['/', '/:id'], tools_1.default.updateTool);
// DELETE
router.delete(['/', '/:id'], tools_1.default.deleteTool);
exports.default = router;
//# sourceMappingURL=index.js.map