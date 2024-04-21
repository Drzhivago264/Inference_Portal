"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.finalSystemPrompt = exports.systemPrompt = exports.LoadPyodide = void 0;
const path = __importStar(require("path"));
const utils_1 = require("../../../src/utils");
let pyodideInstance;
async function LoadPyodide() {
    if (pyodideInstance === undefined) {
        const { loadPyodide } = await Promise.resolve().then(() => __importStar(require('pyodide')));
        const obj = { packageCacheDir: path.join((0, utils_1.getUserHome)(), '.flowise', 'pyodideCacheDir') };
        pyodideInstance = await loadPyodide(obj);
        await pyodideInstance.loadPackage(['pandas', 'numpy']);
    }
    return pyodideInstance;
}
exports.LoadPyodide = LoadPyodide;
exports.systemPrompt = `You are working with a pandas dataframe in Python. The name of the dataframe is df.

The columns and data types of a dataframe are given below as a Python dictionary with keys showing column names and values showing the data types.
{dict}

I will ask question, and you will output the Python code using pandas dataframe to answer my question. Do not provide any explanations. Do not respond with anything except the output of the code.

Question: {question}
Output Code:`;
exports.finalSystemPrompt = `You are given the question: {question}. You have an answer to the question: {answer}. Rephrase the answer into a standalone answer.
Standalone Answer:`;
//# sourceMappingURL=core.js.map