"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodesPool = void 0;
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
const fs_1 = require("fs");
const logger_1 = __importDefault(require("./utils/logger"));
class NodesPool {
    constructor() {
        this.componentNodes = {};
        this.componentCredentials = {};
        this.credentialIconPath = {};
    }
    /**
     * Initialize to get all nodes & credentials
     */
    async initialize() {
        await this.initializeNodes();
        await this.initializeCredentials();
    }
    /**
     * Initialize nodes
     */
    async initializeNodes() {
        const packagePath = (0, utils_1.getNodeModulesPackagePath)('flowise-components');
        const nodesPath = path_1.default.join(packagePath, 'dist', 'nodes');
        const nodeFiles = await this.getFiles(nodesPath);
        return Promise.all(nodeFiles.map(async (file) => {
            if (file.endsWith('.js')) {
                try {
                    const nodeModule = await require(file);
                    if (nodeModule.nodeClass) {
                        const newNodeInstance = new nodeModule.nodeClass();
                        newNodeInstance.filePath = file;
                        // Replace file icon with absolute path
                        if (newNodeInstance.icon &&
                            (newNodeInstance.icon.endsWith('.svg') ||
                                newNodeInstance.icon.endsWith('.png') ||
                                newNodeInstance.icon.endsWith('.jpg'))) {
                            const filePath = file.replace(/\\/g, '/').split('/');
                            filePath.pop();
                            const nodeIconAbsolutePath = `${filePath.join('/')}/${newNodeInstance.icon}`;
                            newNodeInstance.icon = nodeIconAbsolutePath;
                            // Store icon path for componentCredentials
                            if (newNodeInstance.credential) {
                                for (const credName of newNodeInstance.credential.credentialNames) {
                                    this.credentialIconPath[credName] = nodeIconAbsolutePath;
                                }
                            }
                        }
                        const skipCategories = ['Analytic', 'SpeechToText'];
                        if (!skipCategories.includes(newNodeInstance.category)) {
                            this.componentNodes[newNodeInstance.name] = newNodeInstance;
                        }
                    }
                }
                catch (err) {
                    logger_1.default.error(`❌ [server]: Error during initDatabase with file ${file}:`, err);
                }
            }
        }));
    }
    /**
     * Initialize credentials
     */
    async initializeCredentials() {
        const packagePath = (0, utils_1.getNodeModulesPackagePath)('flowise-components');
        const nodesPath = path_1.default.join(packagePath, 'dist', 'credentials');
        const nodeFiles = await this.getFiles(nodesPath);
        return Promise.all(nodeFiles.map(async (file) => {
            var _a;
            if (file.endsWith('.credential.js')) {
                const credentialModule = await require(file);
                if (credentialModule.credClass) {
                    const newCredInstance = new credentialModule.credClass();
                    newCredInstance.icon = (_a = this.credentialIconPath[newCredInstance.name]) !== null && _a !== void 0 ? _a : '';
                    this.componentCredentials[newCredInstance.name] = newCredInstance;
                }
            }
        }));
    }
    /**
     * Recursive function to get node files
     * @param {string} dir
     * @returns {string[]}
     */
    async getFiles(dir) {
        const dirents = await fs_1.promises.readdir(dir, { withFileTypes: true });
        const files = await Promise.all(dirents.map((dirent) => {
            const res = path_1.default.resolve(dir, dirent.name);
            return dirent.isDirectory() ? this.getFiles(res) : res;
        }));
        return Array.prototype.concat(...files);
    }
}
exports.NodesPool = NodesPool;
//# sourceMappingURL=NodesPool.js.map