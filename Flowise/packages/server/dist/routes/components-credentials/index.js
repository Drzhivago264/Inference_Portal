"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const components_credentials_1 = __importDefault(require("../../controllers/components-credentials"));
const router = express_1.default.Router();
// READ
router.get('/', components_credentials_1.default.getAllComponentsCredentials);
router.get(['/', '/:name'], components_credentials_1.default.getComponentByName);
exports.default = router;
//# sourceMappingURL=index.js.map