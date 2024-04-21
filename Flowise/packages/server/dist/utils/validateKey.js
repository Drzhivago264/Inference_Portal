"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilValidateKey = void 0;
const apiKey_1 = require("./apiKey");
/**
 * Validate API Key
 * @param {Request} req
 * @param {Response} res
 * @param {ChatFlow} chatflow
 */
const utilValidateKey = async (req, chatflow) => {
    var _a, _b, _c;
    const chatFlowApiKeyId = chatflow.apikeyid;
    if (!chatFlowApiKeyId)
        return true;
    const authorizationHeader = (_b = (_a = req.headers['Authorization']) !== null && _a !== void 0 ? _a : req.headers['authorization']) !== null && _b !== void 0 ? _b : '';
    if (chatFlowApiKeyId && !authorizationHeader)
        return false;
    const suppliedKey = authorizationHeader.split(`Bearer `).pop();
    if (suppliedKey) {
        const keys = await (0, apiKey_1.getAPIKeys)();
        const apiSecret = (_c = keys.find((key) => key.id === chatFlowApiKeyId)) === null || _c === void 0 ? void 0 : _c.apiSecret;
        if (!(0, apiKey_1.compareKeys)(apiSecret, suppliedKey))
            return false;
        return true;
    }
    return false;
};
exports.utilValidateKey = utilValidateKey;
//# sourceMappingURL=validateKey.js.map