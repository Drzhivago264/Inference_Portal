"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const variables_1 = __importDefault(require("../../controllers/variables"));
const router = express_1.default.Router();
// CREATE
router.post('/', variables_1.default.createVariable);
// READ
router.get('/', variables_1.default.getAllVariables);
// UPDATE
router.put(['/', '/:id'], variables_1.default.updateVariable);
// DELETE
router.delete(['/', '/:id'], variables_1.default.deleteVariable);
exports.default = router;
//# sourceMappingURL=index.js.map