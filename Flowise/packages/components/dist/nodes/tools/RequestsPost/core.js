"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestsPostTool = exports.desc = void 0;
const tools_1 = require("@langchain/core/tools");
const node_fetch_1 = __importDefault(require("node-fetch"));
exports.desc = `Use this when you want to POST to a website.
Input should be a json string with two keys: "url" and "data".
The value of "url" should be a string, and the value of "data" should be a dictionary of 
key-value pairs you want to POST to the url as a JSON body.
Be careful to always use double quotes for strings in the json string
The output will be the text response of the POST request.`;
class RequestsPostTool extends tools_1.Tool {
    constructor(args) {
        super();
        this.name = 'requests_post';
        this.url = '';
        this.description = exports.desc;
        this.maxOutputLength = Infinity;
        this.headers = {};
        this.body = {};
        this.url = args?.url ?? this.url;
        this.headers = args?.headers ?? this.headers;
        this.body = args?.body ?? this.body;
        this.description = args?.description ?? this.description;
        this.maxOutputLength = args?.maxOutputLength ?? this.maxOutputLength;
    }
    /** @ignore */
    async _call(input) {
        try {
            let inputUrl = '';
            let inputBody = {};
            if (Object.keys(this.body).length || this.url) {
                if (this.url)
                    inputUrl = this.url;
                if (Object.keys(this.body).length)
                    inputBody = this.body;
            }
            else {
                const { url, data } = JSON.parse(input);
                inputUrl = url;
                inputBody = data;
            }
            if (process.env.DEBUG === 'true')
                console.info(`Making POST API call to ${inputUrl} with body ${JSON.stringify(inputBody)}`);
            const res = await (0, node_fetch_1.default)(inputUrl, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(inputBody)
            });
            const text = await res.text();
            return text.slice(0, this.maxOutputLength);
        }
        catch (error) {
            return `${error}`;
        }
    }
}
exports.RequestsPostTool = RequestsPostTool;
//# sourceMappingURL=core.js.map