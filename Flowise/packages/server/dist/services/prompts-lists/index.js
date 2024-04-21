"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const createPromptsList = async (requestBody) => {
    try {
        const tags = requestBody.tags ? `tags=${requestBody.tags}` : '';
        // Default to 100, TODO: add pagination and use offset & limit
        const url = `https://api.hub.langchain.com/repos/?limit=100&${tags}has_commits=true&sort_field=num_likes&sort_direction=desc&is_archived=false`;
        const resp = await axios_1.default.get(url);
        if (resp.data.repos) {
            return {
                status: 'OK',
                repos: resp.data.repos
            };
        }
    }
    catch (error) {
        return { status: 'ERROR', repos: [] };
    }
};
exports.default = {
    createPromptsList
};
//# sourceMappingURL=index.js.map