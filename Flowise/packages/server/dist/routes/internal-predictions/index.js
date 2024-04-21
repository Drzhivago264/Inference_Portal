"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const internal_predictions_1 = __importDefault(require("../../controllers/internal-predictions"));
const router = express_1.default.Router();
// CREATE
router.post(['/', '/:id'], internal_predictions_1.default.createInternalPrediction);
exports.default = router;
//# sourceMappingURL=index.js.map