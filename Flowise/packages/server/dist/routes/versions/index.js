"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const versions_1 = __importDefault(require("../../controllers/versions"));
const router = express_1.default.Router();
// READ
router.get('/', versions_1.default.getVersion);
exports.default = router;
//# sourceMappingURL=index.js.map