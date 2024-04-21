"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buildChatflow_1 = require("../../utils/buildChatflow");
// Send input message and get prediction result (Internal)
const createInternalPrediction = async (req, res, next) => {
    try {
        const apiResponse = await (0, buildChatflow_1.utilBuildChatflow)(req, req.io, true);
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    createInternalPrediction
};
//# sourceMappingURL=index.js.map