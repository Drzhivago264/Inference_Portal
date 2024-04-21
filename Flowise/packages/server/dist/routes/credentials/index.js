"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const credentials_1 = __importDefault(require("../../controllers/credentials"));
const router = express_1.default.Router();
// CREATE
router.post('/', credentials_1.default.createCredential);
// READ
router.get('/', credentials_1.default.getAllCredentials);
router.get(['/', '/:id'], credentials_1.default.getCredentialById);
// UPDATE
router.put(['/', '/:id'], credentials_1.default.updateCredential);
// DELETE
router.delete(['/', '/:id'], credentials_1.default.deleteCredentials);
exports.default = router;
//# sourceMappingURL=index.js.map