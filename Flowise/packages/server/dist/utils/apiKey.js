"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceAllAPIKeys = exports.deleteAPIKey = exports.updateAPIKey = exports.getApiKey = exports.addAPIKey = exports.getAPIKeys = exports.compareKeys = exports.generateSecretHash = exports.generateAPIKey = exports.getAPIKeyPath = void 0;
const crypto_1 = require("crypto");
const moment_1 = __importDefault(require("moment"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("./logger"));
/**
 * Returns the api key path
 * @returns {string}
 */
const getAPIKeyPath = () => {
    return process.env.APIKEY_PATH ? path_1.default.join(process.env.APIKEY_PATH, 'api.json') : path_1.default.join(__dirname, '..', '..', 'api.json');
};
exports.getAPIKeyPath = getAPIKeyPath;
/**
 * Generate the api key
 * @returns {string}
 */
const generateAPIKey = () => {
    const buffer = (0, crypto_1.randomBytes)(32);
    return buffer.toString('base64');
};
exports.generateAPIKey = generateAPIKey;
/**
 * Generate the secret key
 * @param {string} apiKey
 * @returns {string}
 */
const generateSecretHash = (apiKey) => {
    const salt = (0, crypto_1.randomBytes)(8).toString('hex');
    const buffer = (0, crypto_1.scryptSync)(apiKey, salt, 64);
    return `${buffer.toString('hex')}.${salt}`;
};
exports.generateSecretHash = generateSecretHash;
/**
 * Verify valid keys
 * @param {string} storedKey
 * @param {string} suppliedKey
 * @returns {boolean}
 */
const compareKeys = (storedKey, suppliedKey) => {
    const [hashedPassword, salt] = storedKey.split('.');
    const buffer = (0, crypto_1.scryptSync)(suppliedKey, salt, 64);
    return (0, crypto_1.timingSafeEqual)(Buffer.from(hashedPassword, 'hex'), buffer);
};
exports.compareKeys = compareKeys;
/**
 * Get API keys
 * @returns {Promise<ICommonObject[]>}
 */
const getAPIKeys = async () => {
    try {
        const content = await fs_1.default.promises.readFile((0, exports.getAPIKeyPath)(), 'utf8');
        return JSON.parse(content);
    }
    catch (error) {
        const keyName = 'DefaultKey';
        const apiKey = (0, exports.generateAPIKey)();
        const apiSecret = (0, exports.generateSecretHash)(apiKey);
        const content = [
            {
                keyName,
                apiKey,
                apiSecret,
                createdAt: (0, moment_1.default)().format('DD-MMM-YY'),
                id: (0, crypto_1.randomBytes)(16).toString('hex')
            }
        ];
        await fs_1.default.promises.writeFile((0, exports.getAPIKeyPath)(), JSON.stringify(content), 'utf8');
        return content;
    }
};
exports.getAPIKeys = getAPIKeys;
/**
 * Add new API key
 * @param {string} keyName
 * @returns {Promise<ICommonObject[]>}
 */
const addAPIKey = async (keyName) => {
    const existingAPIKeys = await (0, exports.getAPIKeys)();
    const apiKey = (0, exports.generateAPIKey)();
    const apiSecret = (0, exports.generateSecretHash)(apiKey);
    const content = [
        ...existingAPIKeys,
        {
            keyName,
            apiKey,
            apiSecret,
            createdAt: (0, moment_1.default)().format('DD-MMM-YY'),
            id: (0, crypto_1.randomBytes)(16).toString('hex')
        }
    ];
    await fs_1.default.promises.writeFile((0, exports.getAPIKeyPath)(), JSON.stringify(content), 'utf8');
    return content;
};
exports.addAPIKey = addAPIKey;
/**
 * Get API Key details
 * @param {string} apiKey
 * @returns {Promise<ICommonObject[]>}
 */
const getApiKey = async (apiKey) => {
    const existingAPIKeys = await (0, exports.getAPIKeys)();
    const keyIndex = existingAPIKeys.findIndex((key) => key.apiKey === apiKey);
    if (keyIndex < 0)
        return undefined;
    return existingAPIKeys[keyIndex];
};
exports.getApiKey = getApiKey;
/**
 * Update existing API key
 * @param {string} keyIdToUpdate
 * @param {string} newKeyName
 * @returns {Promise<ICommonObject[]>}
 */
const updateAPIKey = async (keyIdToUpdate, newKeyName) => {
    const existingAPIKeys = await (0, exports.getAPIKeys)();
    const keyIndex = existingAPIKeys.findIndex((key) => key.id === keyIdToUpdate);
    if (keyIndex < 0)
        return [];
    existingAPIKeys[keyIndex].keyName = newKeyName;
    await fs_1.default.promises.writeFile((0, exports.getAPIKeyPath)(), JSON.stringify(existingAPIKeys), 'utf8');
    return existingAPIKeys;
};
exports.updateAPIKey = updateAPIKey;
/**
 * Delete API key
 * @param {string} keyIdToDelete
 * @returns {Promise<ICommonObject[]>}
 */
const deleteAPIKey = async (keyIdToDelete) => {
    const existingAPIKeys = await (0, exports.getAPIKeys)();
    const result = existingAPIKeys.filter((key) => key.id !== keyIdToDelete);
    await fs_1.default.promises.writeFile((0, exports.getAPIKeyPath)(), JSON.stringify(result), 'utf8');
    return result;
};
exports.deleteAPIKey = deleteAPIKey;
/**
 * Replace all api keys
 * @param {ICommonObject[]} content
 * @returns {Promise<void>}
 */
const replaceAllAPIKeys = async (content) => {
    try {
        await fs_1.default.promises.writeFile((0, exports.getAPIKeyPath)(), JSON.stringify(content), 'utf8');
    }
    catch (error) {
        logger_1.default.error(error);
    }
};
exports.replaceAllAPIKeys = replaceAllAPIKeys;
//# sourceMappingURL=apiKey.js.map