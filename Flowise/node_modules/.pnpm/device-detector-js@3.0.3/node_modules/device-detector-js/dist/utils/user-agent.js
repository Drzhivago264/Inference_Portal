"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const memory_cache_1 = require("./memory-cache");
const cache = memory_cache_1.memoryCache();
const getRegexInstance = (rawRegex) => {
    const cachedRegexInstance = cache.get(rawRegex);
    if (cachedRegexInstance)
        return cachedRegexInstance.value;
    const regexInstance = RegExp(`(?:^|[^A-Z0-9\-_]|[^A-Z0-9\-]_|sprd-)(?:${rawRegex})`, "i");
    cache.set(rawRegex, {
        value: regexInstance
    });
    return regexInstance;
};
exports.userAgentParser = (rawRegex, userAgent) => {
    // TODO: find out why it fails in some browsers
    try {
        const regexInstance = getRegexInstance(rawRegex);
        const match = regexInstance.exec(userAgent);
        return match ? match.slice(1) : null;
    }
    catch (_a) {
        return null;
    }
};
