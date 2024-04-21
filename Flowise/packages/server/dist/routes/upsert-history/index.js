"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upsert_history_1 = __importDefault(require("../../controllers/upsert-history"));
const router = express_1.default.Router();
// CREATE
// READ
router.get(['/', '/:id'], upsert_history_1.default.getAllUpsertHistory);
// PATCH
router.patch('/', upsert_history_1.default.patchDeleteUpsertHistory);
// DELETE
exports.default = router;
//# sourceMappingURL=index.js.map