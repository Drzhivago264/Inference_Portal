"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nodes_1 = __importDefault(require("../../controllers/nodes"));
const router = express_1.default.Router();
// CREATE
// READ
router.get(['/', '/:name'], nodes_1.default.getSingleNodeIcon);
// UPDATE
// DELETE
exports.default = router;
//# sourceMappingURL=index.js.map