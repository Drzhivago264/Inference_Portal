"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flowise_components_1 = require("flowise-components");
const getPathForUploads = async (req, res, next) => {
    try {
        const apiResponse = {
            storagePath: (0, flowise_components_1.getStoragePath)()
        };
        return res.json(apiResponse);
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    getPathForUploads
};
//# sourceMappingURL=index.js.map