"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const get_upload_file_1 = __importDefault(require("../../controllers/get-upload-file"));
const router = express_1.default.Router();
// READ
router.get('/', get_upload_file_1.default.streamUploadedImage);
exports.default = router;
//# sourceMappingURL=index.js.map