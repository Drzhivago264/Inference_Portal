"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const trim_1 = require("./trim");
exports.formatVersion = (version, versionTruncation) => {
    if (version === undefined)
        return "";
    const versionString = trim_1.trim(version, ". ").replace(new RegExp("_", "g"), ".");
    const versionParts = versionString.split(".");
    // Return if the string is not only digits once we removed the dots
    if (!/^\d+$/.test(versionParts.join(""))) {
        return versionString;
    }
    if (versionTruncation !== 0) {
        if (Number.isInteger(parseFloat(versionString))) {
            return parseInt(versionString, 10).toFixed(1);
        }
    }
    if (versionParts.length > 1) {
        if (versionTruncation !== null) {
            return versionParts.slice(0, versionTruncation + 1).join(".");
        }
    }
    return versionString;
};
exports.parseBrowserEngineVersion = (userAgent, engine) => {
    if (!engine)
        return "";
    if (engine === "Gecko") {
        const geckoVersionRegex = /[ ](?:rv[: ]([0-9\.]+)).*gecko\/[0-9]{8,10}/i;
        const match = userAgent.match(geckoVersionRegex);
        if (match) {
            return match.pop();
        }
    }
    const regex = new RegExp(`${engine}\\s*\\/?\\s*((?:(?=\\d+\\.\\d)\\d+[.\\d]*|\\d{1,7}(?=(?:\\D|$))))`, "i");
    const match = userAgent.match(regex);
    if (!match)
        return "";
    return match.pop();
};
