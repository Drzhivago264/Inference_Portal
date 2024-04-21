"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trim = (str, char) => {
    return str.replace(new RegExp("^[" + char + "]+|[" + char + "]+$", "g"), "");
};
