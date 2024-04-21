"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apikey_1 = __importDefault(require("../../controllers/apikey"));
const router = express_1.default.Router();
// CREATE
router.post('/', apikey_1.default.createApiKey);
// READ
router.get('/', apikey_1.default.getAllApiKeys);
// UPDATE
router.put(['/', '/:id'], apikey_1.default.updateApiKey);
// DELETE
router.delete(['/', '/:id'], apikey_1.default.deleteApiKey);
exports.default = router;
//# sourceMappingURL=index.js.map