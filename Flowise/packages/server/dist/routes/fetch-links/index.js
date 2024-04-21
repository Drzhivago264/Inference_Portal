"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fetch_links_1 = __importDefault(require("../../controllers/fetch-links"));
const router = express_1.default.Router();
// READ
router.get('/', fetch_links_1.default.getAllLinks);
exports.default = router;
//# sourceMappingURL=index.js.map