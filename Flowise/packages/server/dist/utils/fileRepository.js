"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFlowDataWithFilePaths = exports.containsBase64File = void 0;
const path_1 = __importDefault(require("path"));
const flowise_components_1 = require("flowise-components");
const fs_1 = __importDefault(require("fs"));
const containsBase64File = (chatflow) => {
    const parsedFlowData = JSON.parse(chatflow.flowData);
    const re = new RegExp('^data.*;base64', 'i');
    let found = false;
    const nodes = parsedFlowData.nodes;
    for (const node of nodes) {
        if (node.data.category !== 'Document Loaders') {
            continue;
        }
        const inputs = node.data.inputs;
        if (inputs) {
            const keys = Object.getOwnPropertyNames(inputs);
            for (let i = 0; i < keys.length; i++) {
                const input = inputs[keys[i]];
                if (!input) {
                    continue;
                }
                if (typeof input !== 'string') {
                    continue;
                }
                if (input.startsWith('[')) {
                    try {
                        const files = JSON.parse(input);
                        for (let j = 0; j < files.length; j++) {
                            const file = files[j];
                            if (re.test(file)) {
                                found = true;
                                break;
                            }
                        }
                    }
                    catch (e) {
                        continue;
                    }
                }
                if (re.test(input)) {
                    found = true;
                    break;
                }
            }
        }
    }
    return found;
};
exports.containsBase64File = containsBase64File;
function addFileToStorage(file, chatflowid, fileNames) {
    var _a, _b;
    const dir = path_1.default.join((0, flowise_components_1.getStoragePath)(), chatflowid);
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
    const splitDataURI = file.split(',');
    const filename = (_b = (_a = splitDataURI.pop()) === null || _a === void 0 ? void 0 : _a.split(':')[1]) !== null && _b !== void 0 ? _b : '';
    const bf = Buffer.from(splitDataURI.pop() || '', 'base64');
    const filePath = path_1.default.join(dir, filename);
    fs_1.default.writeFileSync(filePath, bf);
    fileNames.push(filename);
    return 'FILE-STORAGE::' + JSON.stringify(fileNames);
}
const updateFlowDataWithFilePaths = (chatflowid, flowData) => {
    try {
        const parsedFlowData = JSON.parse(flowData);
        const re = new RegExp('^data.*;base64', 'i');
        const nodes = parsedFlowData.nodes;
        for (let j = 0; j < nodes.length; j++) {
            const node = nodes[j];
            if (node.data.category !== 'Document Loaders') {
                continue;
            }
            if (node.data.inputs) {
                const inputs = node.data.inputs;
                const keys = Object.getOwnPropertyNames(inputs);
                for (let i = 0; i < keys.length; i++) {
                    const fileNames = [];
                    const key = keys[i];
                    const input = inputs === null || inputs === void 0 ? void 0 : inputs[key];
                    if (!input) {
                        continue;
                    }
                    if (typeof input !== 'string') {
                        continue;
                    }
                    if (input.startsWith('[')) {
                        try {
                            const files = JSON.parse(input);
                            for (let j = 0; j < files.length; j++) {
                                const file = files[j];
                                if (re.test(file)) {
                                    node.data.inputs[key] = addFileToStorage(file, chatflowid, fileNames);
                                }
                            }
                        }
                        catch (e) {
                            continue;
                        }
                    }
                    else if (re.test(input)) {
                        node.data.inputs[key] = addFileToStorage(input, chatflowid, fileNames);
                    }
                }
            }
        }
        return JSON.stringify(parsedFlowData);
    }
    catch (e) {
        return '';
    }
};
exports.updateFlowDataWithFilePaths = updateFlowDataWithFilePaths;
//# sourceMappingURL=fileRepository.js.map