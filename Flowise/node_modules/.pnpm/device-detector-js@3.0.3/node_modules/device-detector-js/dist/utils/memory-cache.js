"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoryCache = () => {
    const memoryCacheBucket = {};
    const set = (key, value) => {
        memoryCacheBucket[key] = value;
    };
    const get = (key) => {
        if (memoryCacheBucket.hasOwnProperty(key)) {
            return memoryCacheBucket[key];
        }
    };
    return {
        set,
        get
    };
};
