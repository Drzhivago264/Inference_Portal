"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webbrowser_1 = require("langchain/tools/webbrowser");
const utils_1 = require("../../../src/utils");
class WebBrowser_Tools {
    constructor() {
        this.label = 'Web Browser';
        this.name = 'webBrowser';
        this.version = 1.0;
        this.type = 'WebBrowser';
        this.icon = 'webBrowser.svg';
        this.category = 'Tools';
        this.description = 'Gives agent the ability to visit a website and extract information';
        this.inputs = [
            {
                label: 'Language Model',
                name: 'model',
                type: 'BaseLanguageModel'
            },
            {
                label: 'Embeddings',
                name: 'embeddings',
                type: 'Embeddings'
            }
        ];
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(webbrowser_1.WebBrowser)];
    }
    async init(nodeData) {
        const model = nodeData.inputs?.model;
        const embeddings = nodeData.inputs?.embeddings;
        return new webbrowser_1.WebBrowser({ model, embeddings });
    }
}
module.exports = { nodeClass: WebBrowser_Tools };
//# sourceMappingURL=WebBrowser.js.map