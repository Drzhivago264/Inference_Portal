"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const vectors_1 = __importDefault(require("../../controllers/vectors"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: `${path_1.default.join(__dirname, '..', '..', '..', 'uploads')}/` });
// CREATE
router.post(['/upsert/', '/upsert/:id'], upload.array('files'), vectors_1.default.getRateLimiterMiddleware, vectors_1.default.upsertVectorMiddleware);
router.post(['/internal-upsert/', '/internal-upsert/:id'], vectors_1.default.createInternalUpsert);
exports.default = router;
//# sourceMappingURL=index.js.map