"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestsGetTool = exports.desc = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const tools_1 = require("@langchain/core/tools");
exports.desc = `A portal to the internet. Use this when you need to get specific content from a website. 
Input should be a  url (i.e. https://www.google.com). The output will be the text response of the GET request.`;
class RequestsGetTool extends tools_1.Tool {
    constructor(args) {
        super();
        this.name = 'requests_get';
        this.url = '';
        this.description = exports.desc;
        this.maxOutputLength = 2000;
        this.headers = {};
        this.url = args?.url ?? this.url;
        this.headers = args?.headers ?? this.headers;
        this.description = args?.description ?? this.description;
        this.maxOutputLength = args?.maxOutputLength ?? this.maxOutputLength;
    }
    /** @ignore */
    async _call(input) {
        const inputUrl = !this.url ? input : this.url;
        if (process.env.DEBUG === 'true')
            console.info(`Making GET API call to ${inputUrl}`);
        const res = await (0, node_fetch_1.default)(inputUrl, {
            headers: this.headers
        });
        const text = await res.text();
        return text.slice(0, this.maxOutputLength);
    }
}
exports.RequestsGetTool = RequestsGetTool;
//# sourceMappingURL=core.js.map