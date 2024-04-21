"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apikey_1 = __importDefault(require("../../controllers/apikey"));
const router = express_1.default.Router();
// READ
router.get(['/apikey/', '/apikey/:apikey'], apikey_1.default.verifyApiKey);
exports.default = router;
//# sourceMappingURL=index.js.map