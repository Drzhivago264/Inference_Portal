"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const flow_configs_1 = __importDefault(require("../../controllers/flow-configs"));
const router = express_1.default.Router();
// CREATE
// READ
router.get(['/', '/:id'], flow_configs_1.default.getSingleFlowConfig);
// UPDATE
// DELETE
exports.default = router;
//# sourceMappingURL=index.js.map